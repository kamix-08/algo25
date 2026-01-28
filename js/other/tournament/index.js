import express from 'express'
import { engine } from 'express-handlebars'
import hbs from 'handlebars'
import fs from 'node:fs/promises'
import { createWriteStream, existsSync } from 'node:fs'
import { Readable } from 'node:stream'
import unzipper from 'unzipper'
import readLine from 'readline'

const app = express()

app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './templates')

hbs.registerHelper("player", (context, options) => options.fn(getPlayer(context)))
hbs.registerHelper("eq", (a, b) => a == b)

app.use(express.static('public'))
app.use(express.urlencoded())

const port = 3407
const users_file = './!users.json'
const tournaments_file = './!tournaments.json'
const ratings_file = './!ratings.json'

async function readFile(file) {
    await fs.appendFile(file, '')

    const f = await fs.readFile(file, {encoding: 'utf8'})
    return f ? JSON.parse(f) : []
}

async function writeFile(file, content) {
    await fs.writeFile(file, JSON.stringify(content, null, 2), {encoding: 'utf8'})
}

const users = await readFile(users_file)
const tournaments = await readFile(tournaments_file)

if (!getPlayer(-1)) {
    users.push({id:-1})
    writeFile(users_file, users)
}

if (!existsSync(ratings_file)) {
    const res = await fetch('https://ratings.fide.com/download/blitz_rating_list.zip')

    const out = createWriteStream(ratings_file)
    const rl = readLine.createInterface({
        input: Readable.fromWeb(res.body).pipe(unzipper.ParseOne()),
        terminal: false
    })

    out.write('[')
    let first = true

    for await (const line of rl) {
        if (line.startsWith('ID Number')) continue

        const record = {
            name:  line.slice(15,76).trim(),
            rating: +line.slice(113,117).trim()
        }

        out.write((first ? '' : ',') + '\n' + JSON.stringify(record))
        first = false
    }

    out.write('\n]')
}

const ratings = await readFile(ratings_file)

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

app.post('/players/add', (req, res) => {
    const name = req.body.name
    const surname = req.body.surname
    const country = req.body.country
    const age = +req.body.age
    const rating = +req.body.rating

    const user = {
        id: users.reduce((a, b) => Math.max(a, b.id), 0) + 1,
        name: name,
        surname: surname,
        country: country,
        age: age,
        rating: rating,
        date: new Date().toLocaleString("pl-PL").split(', ').reverse().join(' ')
    }

    users.push(user)
    writeFile(users_file, users)

    res.redirect(`/players/${user.id}`)
})

app.get('/players/:id', (req, res) => {
    const id = req.params.id
    const user = users.find(u => u.id == id)

    if (!user) {
        res.sendStatus(404)
        return
    }

    res.render('player', {
        page: `${user.name} ${user.surname}`,
        user: user
    })
})

app.get('/players', (req, res) => {
    res.render('players', {
        page: 'Players',
        users: users
    })
})

app.get('/tournaments', (req, res) => {
    res.render('tournaments', {
        page: 'Tournaments',
        tournaments: tournaments
    })
})

app.get('/tournaments/add', (req, res) => {
    res.render('add-tournament', {
        page: 'Add Tournament',
        users: users,
        scripts: ['selectAllPlayers']
    })
})

app.get('/tournaments/:id', (req, res) => {
    const id = req.params.id
    const tournament = tournaments.find(e => e.id == id)

    if (!tournament) {
        res.sendStatus(404)
        return
    }

    const players = {}
    tournament.players.forEach(player => {
        players[player] = getPlayer(player)
    })

    res.render('tournament', {
        page: tournament.name,
        tournament: tournament,
        players: players
    })
})

app.post('/tournaments/add', (req, res) => {
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

    const {players, round} = generateRound(Object.keys(req.body)
        .filter(e => e.startsWith('p-'))
        .map(e => getPlayer(+e.slice(2)))
        .toSorted(sortFn))

    const tournament = {
        id: tournaments.reduce((a, b) => Math.max(a, b.id), 0) + 1,
        name: name,
        players: players,
        rounds: [round]
    }

    tournaments.push(tournament)
    writeFile(tournaments_file, tournaments)

    res.redirect(`/tournaments/${tournament.id}`)
})

app.post('/tournaments/:id', (req, res) => {
    const id = req.params.id
    const idx = tournaments.findIndex(e => e.id == id)

    const rounds = tournaments[idx].rounds

    Object.keys(req.body)
        .filter(e => e.startsWith("b-"))
        .forEach(e => {
            const [a,b] = e.split('-').slice(1)
            tournaments[idx].rounds[a][b].res = +req.body[e]
        })

    if (rounds[rounds.length - 1].every(e => e.res != -1)) {
        const r = generateRound(rounds[rounds.length - 1].map(e => (e.res == 0 ? e.p1 : e.p2)).map(getPlayer))

        if (r.round) tournaments[idx].rounds.push(r.round)
        else tournaments[idx].winner = r.winner
    }

    writeFile(tournaments_file, tournaments)
    res.redirect(`/tournaments/${id}`)
})

function getPlayer(id) {
    return users.find(e => e.id == id)
}

function generateRound(players) {
    if (players.length == 1)
        return {winner: players[0].id}

    if (players.length % 2)
        players.push({id:-1})

    const round = []
    for (let i=1; i<players.length; i+=2) {
        round.push({
            p1: players[i-1].id,
            p2: players[i].id,
            res: players[i].id == -1 ? 0 : -1
        })
    }

    return {players: players.map(e => e.id), round: round}
}

app.get('/lookup-db', (req, res) => {
    const name = standardize(req.query.name)
    const surname = standardize(req.query.surname)

    res.json(ratings.filter(u => u.name.includes(surname) && u.name.includes(name)))
})

app.listen(3407, () => console.log(`http://127.0.0.1:${port}`))