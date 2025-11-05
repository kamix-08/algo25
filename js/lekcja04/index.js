import express from 'express'
import { engine } from 'express-handlebars'

const app = express()
const port = 3407

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', './templates')

app.get('/', (req, res) => {
    res.render('home', {
        user: 'Kamil'
    })
})

app.get('/sub1', (req, res) => {
    res.render('subpage', {
        text: 'Subpage #1'
    })
})

// tu wchodzimy normalnie na /form
app.get('/form', (req, res) => {
    res.render('form')
})

app.use(express.urlencoded())

// to się wykona po przesłaniu formularza,
// bo jest method=post
app.post('/form', (req, res) => {
    console.log(req.body)

    // to już pójdzie po get
    res.redirect('/form')
})

app.listen(port, () => {
    console.log(`http://127.0.0.1:${port}`)
})