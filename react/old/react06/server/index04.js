import express from "express"
import cors from "cors"

import data from './data/zones.json' with { type: "json" }
let savedZones = "[]"

const app = express()

app.use(cors())
app.use(express.json())

app.get("/zones", (req, res) => {
    res.json(data)
})

app.get("/zones/:id", (req, res) => {
    const id = req.params.id
    res.json(data.find(e => e.value == id))
})

app.post("/zones", (req, res) => {
    savedZones = req.body.zones
    res.sendStatus(200)
})

app.get("/toggled", (req, res) => {
    res.json(savedZones)
})

app.listen(3000, () => {
    console.log(3000)
})