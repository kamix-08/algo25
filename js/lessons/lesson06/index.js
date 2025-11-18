import express from 'express'
import { engine } from 'express-handlebars'

const app = express()
const port = 3407

app.engine('hbs', engine({extname: ".hbs"}))
app.set('view engine', 'hbs')
app.set('views', './templates')

app.use(express.static('public'))

app.get('/', (req, res) => {
    res.render('home', {
        user: 'Dexter Morgan',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT-dmbrOzywjfcFlGfZjNyzhvHk6BgX-n0R4Q&s'
    })
})

app.get('/ajax', (req, res) => {
    res.json(['a','b','c'])
})

app.get('/button', (req, res) => {
    res.render('button')
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})