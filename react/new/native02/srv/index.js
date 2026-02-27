import express from 'express'
import cors from 'cors'

const port = 3407

const app = express()

app.use(cors())
app.use(express.json())

let db = []

app.post('/register', (req, res) => {
    const usr = req.body

    if (db.findIndex(e => e.login == usr.login) != -1) {
        return res.sendStatus(467)
    }

    db.push(usr)
    res.sendStatus(200)
})

app.get('/delete/:login', (req, res) => {
    db = db.filter(e => e.login != req.params.login)
})

app.get('/db', (req, res) => {
    res.json(db)
})

app.listen(port, () => console.log(`http://127.0.0.1:${port}`))