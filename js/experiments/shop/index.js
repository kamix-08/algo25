import express from 'express'
import { engine } from 'express-handlebars'
import fs from 'node:fs/promises'
import cookieParser from 'cookie-parser'

const app = express()
app.engine('hbs', engine({extname: 'hbs'}))
app.set('view engine', 'hbs')
app.set('views', './templates')

const port = 3407
const db_path = './!db.json'

await fs.appendFile(db_path, '')

async function readFile(file) {
    const data = await fs.readFile(file, {encoding: 'utf-8'})
    return data ? JSON.parse(data) : []
}

const db = await readFile(db_path)

app.use(express.static('assets'))
app.use(express.json())
app.use(cookieParser())

app.get('/', (req, res) => {
    res.render('home', {
        scripts: ['form']
    })
})

app.post('/add', (req, res) => {
    const item = db.find(e => e.name == req.body.name && e.price == req.body.price)
    
    if (!item) {
        const id = db.reduce((a,b) => Math.max(a, b.id), -1) + 1

        const product = {
            id,
            name: req.body.name,
            price: +req.body.price
        }

        db.push(product)
        res.cookie(id, req.body.count)

        res.sendStatus(200)
        return
    }

    res.cookie(item.id, (+req.cookies[item.id]) + (+req.body.count))
    res.sendStatus(200)
})

app.get('/name/:name', (req, res) => {
    res.json([db.find(e => e.name.includes(req.params.name))])
})

app.get('/item/:id', (req, res) => {
    if ((+req.params.id) > db.length) return res.sendStatus(404)
    res.json([db.find(e => e.id == +req.params.id)])
})

app.listen(port, () => console.log(`http://127.0.0.1:${port}`))