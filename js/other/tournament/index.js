import express from 'express'
import { engine } from 'express-handlebars'

app.engine('hbs', engine({extname: '.hbs'}))
app.set('view engine', 'hbs')
app.set('views', './templates')

const app = express()

const port = 3407

app.get('/', (req, res) => {
    
})

app.listen(3407, () => console.log(`http://127.0.0.1:${port}`))