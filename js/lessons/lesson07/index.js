import express from 'express'
import { engine } from 'express-handlebars'
import fs from 'node:fs/promises'

const app = express()
const port = 3407
const file = '!users.json'

let countries = []
fetch('https://restcountries.com/v3.1/all?fields=name')
    .then(data => data.json())
    .then(data => {
        countries = data.map(e => e.name.common.toLowerCase())
    })

await fs.appendFile(file, '')

let db = await fs.readFile(file, { encoding: 'utf8' })
db = JSON.parse(db || '[]')

app.engine('hbs', engine({extname: ".hbs"}))
app.set('view engine', 'hbs')
app.set('views', './templates')

app.use(express.static('public'))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/register', (req, res) => {
    res.render('register')
})

app.post('/register', async (req, res) => {
    const user = {
        login: req.body.email,
        password: req.body.pass,
        country: req.body.country
    }

    db.push(user)
    await fs.writeFile(file, JSON.stringify(db, null, 2))

    res.redirect('/register')
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

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})