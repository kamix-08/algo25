import express from 'express'
import { engine } from 'express-handlebars'
import fs from 'node:fs/promises'

const app = express()

app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './templates')

app.use(express.urlencoded())

const port = 3407
const users_file = './!users.json'
const tournaments_file = './!tournaments.json'

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

app.get('/', (req, res) => {
    res.render('home', {
        page: 'Home'
    })  
})

app.get('/players/add', (req, res) => {
    res.render('add-player', {
        page: 'Add Player'
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

app.listen(3407, () => console.log(`http://127.0.0.1:${port}`))