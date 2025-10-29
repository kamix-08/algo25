// const express = require('express')
import express from 'express'

const app = express()
const port = 3407

app.use((req, res, next) => {
    console.log((new Date()).toLocaleString(), req.path)
    next()
})

app.use((req, res, next) => {
    if (Math.floor(Math.random() * 10) < 5) {
        res.sendStatus(403)
        return
    }
    
    next()
})

app.use(express.static('public'))

app.listen(port, () => {
  	console.log(`Example app listening on port ${port}`)
})