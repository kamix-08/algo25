import express from 'express'
import { engine } from 'express-handlebars'
import hbs from 'handlebars'
import { Readable } from 'node:stream'
import unzipper from 'unzipper'
import readLine from 'readline'
import nedb from 'nedb-promises'

const app = express()

app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './templates')

hbs.registerHelper("eq", (a, b) => a == b)

app.use(express.static('public'))
app.use(express.urlencoded())

const port = 3407

const dbUsers       = new nedb({filename: "./db/users.db"      , autoload: true})
const dbTournaments = new nedb({filename: "./db/tournaments.db", autoload: true})
const dbRatings     = new nedb({filename: "./db/ratings.db"    , autoload: true})

async function initDb() {
    const user = await dbUsers.findOne({_id: -1})
    if (!user)
        await dbUsers.insert({_id: -1})

    const count = await dbRatings.count({})
    if (count != 0)
        return

    const res = await fetch('https://ratings.fide.com/download/blitz_rating_list.zip')
    const rl = readLine.createInterface({
        input: Readable.fromWeb(res.body).pipe(unzipper.ParseOne()),
        terminal: false
    })

    const data = []
    for await (const line of rl) {
        if (line.startsWith('ID Number')) continue

        data.push({
            name:  line.slice(15,76).trim(),
            rating: +line.slice(113,117).trim()
        })
    }

    dbRatings.insert(data)
    await dbRatings.ensureIndex({fieldName: 'name'})
}
initDb()

const standardize = text => {
    const t = text.toLowerCase()
        .replaceAll('ą','a').replaceAll('ć','c').replaceAll('ę','e')
        .replaceAll('ł','l').replaceAll('ń','n').replaceAll('ó','o')
        .replaceAll('ś','s').replaceAll('ź','z').replaceAll('ż','z')

    return t.charAt(0).toUpperCase() + t.slice(1)
}

app.get('/', (req, res) => {
    res.render('home', {
        page: 'Home'
    })  
})

app.get('/players/add', (req, res) => {
    res.render('add-player', {
        page: 'Add Player',
        scripts: ['ratings']
    })
})

function createUser(req, id) {
    const name = req.body.name
    const surname = req.body.surname
    const country = req.body.country
    const age = +req.body.age
    const rating = +req.body.rating

    return {
        _id: id,
        name: name,
        surname: surname,
        country: country,
        age: age,
        rating: rating,
        date: new Date().toLocaleString("pl-PL").split(', ').reverse().join(' ')
    }
}

app.post('/players/add', async (req, res) => {
    const lastUser = await dbUsers.find({}).sort({_id: -1}).limit(1)
    const id = (lastUser.length > 0 && lastUser[0]._id != -1) ? lastUser[0]._id + 1 : 1
    
    await dbUsers.insert(createUser(req, id))
    res.redirect(`/players/${user._id}`)
})

app.get('/players/delete/:id', async (req, res) => {
    const id = +req.params.id
    await dbUsers.update(
        {_id: id},
        {$set: {deleted: true}}
    )
    res.redirect('/players')
})

app.get('/players/edit/:id', async (req, res) => {
    const id = +req.params.id
    const user = await dbUsers.findOne({_id: id})

    if (!user) {
        res.sendStatus(404)
        return
    }

    res.render('edit-player', {
        page: `Editing #${user._id}`,
        user: user,
        scripts: ['ratings']
    })
})

app.post('/players/edit/:id', async (req, res) => {
    const id = +req.params.id

    const user = createUser(req, id)
    delete user._id
    
    await dbUsers.update(
        {_id: id},
        {$set: user}
    )

    res.redirect(`/players/${id}`)
})

app.get('/players/:id', async (req, res) => {
    const id = +req.params.id
    const user = await dbUsers.findOne({_id: id})
    
    if (!user) {
        res.sendStatus(404)
        return
    }

    res.render('player', {
        page: `${user.name} ${user.surname}`,
        user: user
    })
})

app.get('/players', async (req, res) => {
    res.render('players', {
        page: 'Players',
        users: await dbUsers.find({})
    })
})

app.get('/tournaments', async (req, res) => {
    res.render('tournaments', {
        page: 'Tournaments',
        tournaments: await dbTournaments.find({})
    })
})

app.get('/tournaments/add', async (req, res) => {
    const users = await dbUsers.find({})
    res.render('add-tournament', {
        page: 'Add Tournament',
        users: users,
        scripts: ['selectAllPlayers']
    })
})

app.get('/tournaments/:id', async (req, res) => {
    const id = +req.params.id
    const tournament = await dbTournaments.findOne({_id: id})

    if (!tournament) {
        res.sendStatus(404)
        return
    }

    const players = {"-1": {_id: -1}}
    for (const player of tournament.players)
        players[player] = await dbUsers.findOne({_id: player})

    res.render('tournament', {
        page: tournament.name,
        tournament: tournament,
        players: players
    })
})

app.post('/tournaments/add', async (req, res) => {
    const name = req.body.name

    let sortFn
    switch (req.body.crit) {
        case 'name':
            sortFn = (a,b) => +(a.surname+a.name > b.surname+b.name) - .5
            break
        case 'rating':
            sortFn = (a,b) => b.rating - a.rating
            break
        case 'age':
            sortFn = (a,b) => b.age - a.age
            break
    }

    const playersPromises = await Promise.all(Object.keys(req.body)
        .filter(e => e.startsWith('p-'))
        .map(e => dbUsers.findOne({_id: +e.slice(2)})))

    const {players, round} = generateRound(playersPromises.toSorted(sortFn))

    const lastTournament = await dbTournaments.find({}).sort({_id: -1}).limit(1)

    const tournament = {
        _id: lastTournament.length > 0 ? lastTournament[0]._id + 1 : 1,
        name: name,
        players: players,
        rounds: [round]
    }

    await dbTournaments.insert(tournament)
    res.redirect(`/tournaments/${tournament._id}`)
})

app.post('/tournaments/:id', async (req, res) => {
    const id = +req.params.id
    const tournament = await dbTournaments.findOne({_id: id})

    Object.keys(req.body)
        .filter(e => e.startsWith("b-"))
        .forEach(e => {
            const [a,b] = e.split('-').slice(1)
            tournament.rounds[a][b].res = +req.body[e]
        })

    if (tournament.rounds[tournament.rounds.length - 1].every(e => e.res != -1)) {
        const winners = await Promise.all(tournament.rounds[tournament.rounds.length - 1].map(e => (e.res == 0 ? e.p1 : e.p2)).map(e => dbUsers.findOne({_id: e})))
        const r = generateRound(winners)

        if (r.round) tournament.rounds.push(r.round)
        else tournament.winner = r.winner
    }

    await dbTournaments.update(
        {_id: id},
        {$set: {rounds: tournament.rounds, winner: tournament.winner}}
    )

    res.redirect(`/tournaments/${id}`)
})

function generateRound(players) {
    if (players.length == 1)
        return {winner: players[0]._id}

    if (players.length % 2)
        players.push({_id:-1})

    const round = []
    for (let i=1; i<players.length; i+=2) {
        round.push({
            p1: players[i-1]._id,
            p2: players[i]._id,
            res: players[i]._id == -1 ? 0 : -1
        })
    }

    return {players: players.map(e => e._id), round: round}
}

app.get('/lookup-db', async (req, res) => {
    const name    = standardize(req.query.name)
    const surname = standardize(req.query.surname)

    const result = await dbRatings.findOne({
        name: new RegExp(`${name}.*${surname}|${surname}.*${name}`, 'i')
    })

    res.json([result])
})

app.listen(3407, () => console.log(`http://127.0.0.1:${port}`))