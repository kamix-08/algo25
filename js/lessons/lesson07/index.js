import express from 'express'
import { engine } from 'express-handlebars'
import fs from 'node:fs/promises'
import cookieParser from 'cookie-parser'
import { v4 } from 'uuid'

const app = express()
const port = 3407

const file = '!users.json'
const file_sessions = '!sessions.json'

let countries = []
fetch('https://restcountries.com/v3.1/all?fields=name')
    .then(data => data.json())
    .then(data => {
        countries = data.map(e => e.name.common.toLowerCase())
    })

await fs.appendFile(file, '')
await fs.appendFile(file_sessions, '')

let db = await fs.readFile(file, { encoding: 'utf8' })
db = db ? JSON.parse(db) : []

let sessions = await fs.readFile(file_sessions, { encoding: 'utf8' })
sessions = sessions ? JSON.parse(sessions) : {}

app.engine('hbs', engine({extname: ".hbs"}))
app.set('view engine', 'hbs')
app.set('views', './templates')

app.use(express.static('public'))
app.use(express.json())
app.use(express.urlencoded())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/register', (req, res) => {
    res.render('register', {
        scripts: ['register']
    })
})

app.post('/register', async (req, res) => {
    const user = {
        login: req.body.email,
        password: req.body.pass,
        country: req.body.country
    }

    const id = db.findIndex(e => e.login == user.login)

    if (id != -1) db[id] = user
    else db.push(user)

    await fs.writeFile(file, JSON.stringify(db, null, 2))

    res.redirect(id == -1 ? '/login' : '/profile')
})

app.get('/login', (req, res) => {
    const err = req.query?.err
    res.render('login', {
        err: err
    })
})

app.post('/login', async (req, res) => {
    const user = db.find(e => e.login == req.body.email)
    if (!user || user.password != req.body.pass1) {
        res.redirect('/login?err=Nieprawidłowe dane')
        return
    }

    const session = v4()
    res.cookie('session_id', session, {
        httpOnly: true
    })

    res.cookie('usr', user.login)

    sessions[session] = user.login
    await fs.writeFile(file_sessions, JSON.stringify(sessions, null, 2))

    res.redirect('/')
})

app.get('/search/:term', (req, res) => {
    const term = req.params.term.toLowerCase()

    if (term.length < 2) {
        res.json([])
        return
    }

    res.json(countries.filter(e => e.includes(term)))
})

app.get('/lookup/:user', (req, res) => {
    const user = req.params.user

    if (db.findIndex(e => e.login == user) == -1) {
        res.sendStatus(200)
        return
    }

    res.sendStatus(409)
})

app.use((req, res, next) => {
    if (sessions[req.cookies.session_id]) {
        next()
        return
    }

    res.sendStatus(403)
})

app.get('/secret', (req, res) => {
    res.render('secret')
})

app.get('/profile', (req, res) => {
    res.render('profile', {
        scripts: ['register']
    })
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})