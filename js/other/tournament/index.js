import express from 'express'
import { engine } from 'express-handlebars'
import fs from 'node:fs/promises'
import { createWriteStream, existsSync } from 'node:fs'
import { Readable } from 'node:stream'
import unzipper from 'unzipper'
import readLine from 'readline'

const app = express()

app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './templates')

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
    const age = req.body.age

    const user = {
        id: users.reduce((a, b) => Math.max(a, b.id), 0) + 1,
        name: name,
        surname: surname,
        country: country,
        age: age,
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
        users: users
    })
})

app.get('/tournaments/:id', (req, res) => {
    const id = req.params.id
    const tournament = tournaments.find(e => e.id == id)

    if (!tournament) {
        res.sendStatus(404)
        return
    }

    res.render('tournament', {
        page: tournament.name,
        tournament: tournament
    })
})

app.post('/tournaments/add', (req, res) => {

})

app.get('/lookup-db', (req, res) => {
    const name = standardize(req.query.name)
    const surname = standardize(req.query.surname)

    res.json(ratings.filter(u => u.name.includes(surname) && u.name.includes(name)))
})

app.listen(3407, () => console.log(`http://127.0.0.1:${port}`))