import express from 'express'
import { engine } from 'express-handlebars'
import Handlebars from 'handlebars'
import cookieParser from 'cookie-parser'
import mysqli from 'mysql2/promise'
import { v4 } from 'uuid'
import bcrypt from 'bcrypt'

const app = express()
const port = 3407

app.engine('hbs', engine({extname: ".hbs"}))
app.set('view engine', 'hbs')
app.set('views', './templates')

Handlebars.registerPartial('header', '{{> header}}')
Handlebars.registerPartial('footer', '{{> footer}}')

app.use(express.urlencoded())
app.use(cookieParser())
app.use(express.static('public'))

const getData = req => {
    const msg = req.cookies.msg ? JSON.parse(req.cookies.msg) : null
    req.res.clearCookie('msg')

    const user = req.cookies.sessionId ? sessions[req.cookies.sessionId]?.login : null

    return { msg, user }
}

const db = await mysqli.createConnection({
    host: 'localhost',
    user: 'root',
    database: 'spr3',
})

let sessions = {}

app.get('/login', (req, res) => {
    const { msg, user } = getData(req)

    res.render('login', {
        title: 'Login',
        msg: msg,
        user: user,
    })
})

app.post('/login', async (req, res) => {
    const { username, password } = req.body

    const [user] = await db.execute('SELECT * from users where login = ?', [username])
    if (user.length == 0) {
        res.cookie('msg', JSON.stringify({'msg': 'Brak użytkownika', 'clr': 'red'}))
        return res.redirect('/login')
    }

    if (!await bcrypt.compare(password, user[0].pass)) {
        res.cookie('msg', JSON.stringify({'msg': 'Nieprawidłowe hasło', 'clr': 'red'}))
        return res.redirect('/login')
    }

    const sessionId = v4()
    sessions[sessionId] = user[0]
    res.cookie('sessionId', sessionId)

    res.cookie('msg', JSON.stringify({'msg': 'Logowanie udane!', 'clr': 'green'}))
    res.redirect('/bookmarks')
})

app.get('/register', (req, res) => {
    const { msg, user } = getData(req)

    res.render('register', {
        title: 'Register',
        msg: msg,
        user: user,
    })
})

app.post('/register', async (req, res) => {
    const { username, password, pass2 } = req.body
    const u = username.trim()

    if (password != pass2) {
        res.cookie('msg', JSON.stringify({'msg': 'Hasła nie są zgodne', 'clr': 'red'}))
        return res.redirect('/register')
    }

    if (password.length < 8) {
        res.cookie('msg', JSON.stringify({'msg': 'Hasło jest za krótkie', 'clr': 'red'}))
        res.redirect('/register')
    }

    if (u.length == '') {
        res.cookie('msg', JSON.stringify({'msg': 'Nazwa jest wymagana', 'clr': 'red'}))
        res.redirect('/register')
    }

    const [user] = await db.execute('SELECT * from users where login = ?', [u])
    if (user.length > 0) {
        res.cookie('msg', JSON.stringify({'msg': 'Nazwa zajęta', 'clr': 'red'}))
        res.redirect('/register')
    }

    await db.execute('INSERT into users (login, pass) values (?, ?)', [u, await bcrypt.hash(password, 10)])

    res.cookie('msg', JSON.stringify({'msg': 'Rejstracja przebiegła pomyślnie. Zaloguj się', 'clr': 'green'}))
    res.redirect('/login')
})

app.get('/logout', (req, res) => {
    delete sessions[req.cookies.sessionId]
    res.clearCookie('sessionId')
    res.cookie('msg', JSON.stringify({'msg': 'Wylogowano pomyślnie', 'clr': 'green'}))
    res.redirect('/login')
})

app.use((req, res, next) => {
    if (req.cookies.sessionId && sessions[req.cookies.sessionId])
        return next()
    res.redirect('/login')
})

app.post('/bookmarks', async (req, res) => {
    const { title, url, desc } = req.body
    const t = title.trim()
    let u = url.trim()

    if (t.length < 2) {
        res.cookie('msg', JSON.stringify({'msg': 'Tytuł jest za krótki', 'clr': 'red'}))
        return res.redirect('/bookmarks')
    }

    if (u.length < 3) {
        res.cookie('msg', JSON.stringify({'msg': 'URL jest za krótki', 'clr': 'red'}))
        return res.redirect('/bookmarks')
    }

    if (!u.startsWith('http://'))
        u = 'http://' + u

    await db.execute('INSERT into bookmarks (user_id, title, url, description) values (?, ?, ?, ?)', [sessions[req.cookies.sessionId].id, t, u, desc || null])

    res.cookie('msg', JSON.stringify({'msg': 'Zakładka dodana pomyślnie', 'clr': 'green'}))
    res.redirect('/bookmarks')
})

app.post('/delete/:id', async (req, res) => {
    const { id } = req.params
    
    const [bookmarks] = await db.execute('SELECT * from bookmarks where id = ?', [id])

    if (bookmarks.length == 0) {
        res.cookie('msg', JSON.stringify({'msg': 'Zakładka nie istnieje', 'clr': 'red'}))
        return res.redirect('/bookmarks')
    }

    if (bookmarks[0].user_id != sessions[req.cookies.sessionId].id) {
        res.cookie('msg', JSON.stringify({'msg': 'Nie masz uprawnień do usunięcia tej zakładki', 'clr': 'red'}))
        return res.redirect('/bookmarks')
    }

    await db.execute('DELETE from bookmarks where id = ?', [id])

    res.cookie('msg', JSON.stringify({'msg': 'Zakładka usunięta pomyślnie', 'clr': 'green'}))
    res.redirect('/bookmarks')
})

app.get('/bookmarks', async (req, res) => {
    const { msg, user } = getData(req)

    const [bookmarks] = await db.execute('SELECT * from bookmarks where user_id = ?', [sessions[req.cookies.sessionId].id])

    res.render('bookmarks', {
        title: 'Bookmarks',
        msg: msg,
        bookmarks: bookmarks,
        user: user,
    })
})

app.get('/', (req, res) => {
    res.redirect('/bookmarks')
})

app.listen(port, () => { console.log(`http://localhost:${port}`) })