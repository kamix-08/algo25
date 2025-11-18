import express from 'express'
import { engine } from 'express-handlebars'
import fs from 'node:fs/promises'

const PORT = 3407
const FILE = './!tasks.json'

const app = express()

app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './templates')

app.use(express.static('public'))
app.use(express.urlencoded())

async function readFile() {
    const resp = await fs.readFile(FILE, {encoding: 'utf8'})
    return JSON.parse(resp)
}

async function saveFile(data) {
    return await fs.writeFile(FILE, JSON.stringify(data), {encoding: 'utf8'})
}

app.get('/', async (req, res) => {
    try   { await fs.readFile (FILE, {encoding: 'utf8'}) } 
    catch { await fs.writeFile(FILE, '[]') }

    const data = await readFile()

    res.render('home', {
        title: 'Home',
        tasks: data,
        date: new Date().toLocaleTimeString('en-GB')
    })
})

app.post('/', async (req, res) => {
    const name = req.body['t-name']
    const desc = req.body['t-desc']

    const data = await readFile()
    const id   = data.reduce((acc, cur) => Math.max(acc, cur.id), -1) + 1

    const task = {
        id  : id  ,
        name: name,
        desc: desc,
        date: new Date().valueOf()
    }
    data.push(task)

    await saveFile(data)
    res.redirect('/')
})

app.get('/delete/:id', async (req, res) => {
    const id = req.params.id

    let data = await readFile()
    data = data.filter(e => e.id != id)

    await saveFile(data)
    res.redirect('/')
})

app.get('/task/:id', async (req, res) => {
    const id = req.params.id

    const data = await readFile()
    const task = data.find(e => e.id == id)

    const elapsed = new Date(new Date().valueOf() - task.date)
    task.date = Math.floor(elapsed.getTime() / 1000)

    res.render('task', {
        task: task,
        title: `Task #${id}`
    })
})

app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`)
})