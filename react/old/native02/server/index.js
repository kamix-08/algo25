import express from 'express'
import cors from 'cors'
import fs from 'node:fs/promises'

const app = express()
const PORT = 3407
const DB_FILE = "!db.json"

try {
    await fs.readFile(DB_FILE)
} catch {
    await fs.writeFile(DB_FILE, "[]")
}

let db
await fs.readFile(DB_FILE)
    .then(data => { db = JSON.parse(data) ?? [] })

app.use(cors())
app.use(express.json())

app.post('/login', async (req, res) => {
    const login = req.body.login
    const password = req.body.password    

    const user = db.find(e => e.login == login)

    if (!user) {
        if (!login || !password) {
            res.sendStatus(403)
            return
        }

        const d = new Date()

        db.push({
            login: login,
            password: password,
            date: `${d.getFullYear()}-${d.getMonth()}-${d.getDate()} ${d.toLocaleTimeString('en-GB')}`
        })

        await fs.writeFile(DB_FILE, JSON.stringify(db, null, 2))

        res.sendStatus(200)
        return
    }

    if (user.password == password) {
        res.sendStatus(200)
        return
    }

    res.sendStatus(403)
})

app.get('/users', (req, res) => {
    res.json(db)
})

app.get('/delete/:login', (req, res) => {
    const login = req.params.login

    db = db.filter(e => e.login != login)
    fs.writeFile(DB_FILE, JSON.stringify(db, null, 2))
    
    res.sendStatus(200)
})

app.listen(PORT, () => { console.log(`http://127.0.0.1:${PORT}`) })