import express from 'express'
import cors from 'cors'
import fs from 'node:fs/promises'

const port = 3407
const file = '!db.json'
const notes = '!notes.json'

const app = express()

app.use(cors())
app.use(express.json())

await fs.appendFile(file, '')
await fs.appendFile(notes, '')

async function readFile(f) {
    const d = await fs.readFile(f)
    return d.length ? JSON.parse(d) : []
}

async function writeFile(f, db) {
    await fs.writeFile(f, JSON.stringify(db, null, 2))
}

const db = await readFile(file)
const db_notes = await readFile(notes)

app.use((req, res, next) => {
    console.log(req.path)
    next()
})

app.post('/login', async (req, res) => {
    const u = db.find(e => e.login == req.body.login)

    if (u?.pass == req.body.pass)
        return res.sendStatus(200)

    if (!u) {
        db.push({
            login: req.body.login,
            pass: req.body.pass
        })
        await writeFile(file, db)
        return res.sendStatus(200)
    }

    return res.sendStatus(403)
})

app.post('/notes', (req, res) => {
    if (req.body.session != 'valid')
        return res.status(403)

    res.status(200).json(db_notes)
})

function getRandColor() {
    return '#' + Math.floor(Math.random() * (0xffffff - 0x10000 + 1)).toString(16)
}

app.post('/add', async (req, res) => {
    db_notes.push({
        title: req.body.title,
        desc: req.body.desc,
        id: db_notes.reduce((a,b) => Math.max(a, b.id), 0) + 1,
        clr: getRandColor()
    })

    await writeFile(notes, db_notes)
})

app.listen(port, () => console.log(`http://127.0.0.1:${port}`))