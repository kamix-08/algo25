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

app.listen(port, () => {
    console.log(port)
})