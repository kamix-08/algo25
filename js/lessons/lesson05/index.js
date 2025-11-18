import express from 'express'
import { engine } from 'express-handlebars'
import fs from 'node:fs/promises'

const app = express()
const port = 3407

const FILE = "./!wpisy.txt"

app.engine('hbs', engine({extname: ".hbs"}))
app.set('view engine', 'hbs')
app.set('views', './templates')

app.get('/', (req, res) => {
    res.render('home', {
        user: 'Kamil'
    })
})

app.get('/form', async (req, res) => {
    try {
        await fs.access(FILE, fs.constants.R_OK)
    } catch (err) {
        await fs.writeFile(FILE, "")
    }

    const content = await fs.readFile(FILE, {encoding: 'utf-8'})

    const matchPattern = (pattern, str) => {
        return str.split(`{{${pattern}}}`)[1]
    }

    const parsed = content.split("\n").filter(e => e.trim().length > 0).map(e => {
        return {
            b: matchPattern("bold", e),
            c: matchPattern("content", e),
            i: matchPattern("italics", e)
        }
    })

    res.render('form', {
        content: parsed
    })
})

app.use(express.urlencoded())

app.post('/form', async (req, res) => {
    let content = await fs.readFile(FILE, {encoding: 'utf-8'})

    content = `{{bold}}${req.body.nick}{{bold}} {{content}}${req.body.content}{{content}} {{italics}}(${new Date().toLocaleString()}){{italics}}\n` 
                + content

    fs.writeFile(FILE, content)

    res.redirect('/form')
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})