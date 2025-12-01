import express from "express"
import cors from "cors"

import data from './data/avatars.json' with { type: "json" }
const app = express()

app.use(cors())

app.get("/data", (req, res) => {
    res.json(data)
})

app.listen(3000, () => {
    console.log(3000)
})