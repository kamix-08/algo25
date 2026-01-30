import express from 'express'
import cors from 'cors'

import data from './data.json' with {type: 'json'}

const port = 3407

const app = express()

app.use(cors())
app.use(express.json())

const data_ = data.map((e, i) => {
    return {
        ...e,
        idx: i
    }
})

let saved = []

app.get('/zones', (req, res) => {
    res.json(data_)
})

app.post('/save', (req, res) => {
    console.log(req.body)
    saved.push(...req.body.saved)
    res.sendStatus(200)
})

app.get('/zones/saved', (req, res) => {
    res.json(saved)
})

app.listen(port, () => console.log(`http://127.0.0.1:${port}`))