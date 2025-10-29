// const express = require('express')
import express from 'express'

const app = express()
const port = 3407

const data = [
    {
        "id": "0001",
        "type": "donut",
        "name": "Cake",
        "ppu": 0.55,
        "batters":
        {
            "batter":
                [
                    { "id": "1001", "type": "Regular" },
                    { "id": "1002", "type": "Chocolate" },
                    { "id": "1003", "type": "Blueberry" },
                    { "id": "1004", "type": "Devil's Food" }
                ]
        },
        "topping":
            [
                { "id": "5001", "type": "None" },
                { "id": "5002", "type": "Glazed" },
                { "id": "5005", "type": "Sugar" },
                { "id": "5007", "type": "Powdered Sugar" },
                { "id": "5006", "type": "Chocolate with Sprinkles" },
                { "id": "5003", "type": "Chocolate" },
                { "id": "5004", "type": "Maple" }
            ]
    },
    {
        "id": "0002",
        "type": "donut",
        "name": "Raised",
        "ppu": 0.55,
        "batters":
        {
            "batter":
                [
                    { "id": "1001", "type": "Regular" }
                ]
        },
        "topping":
            [
                { "id": "5001", "type": "None" },
                { "id": "5002", "type": "Glazed" },
                { "id": "5005", "type": "Sugar" },
                { "id": "5003", "type": "Chocolate" },
                { "id": "5004", "type": "Maple" }
            ]
    },
    {
        "id": "0003",
        "type": "donut",
        "name": "Old Fashioned",
        "ppu": 0.55,
        "batters":
        {
            "batter":
                [
                    { "id": "1001", "type": "Regular" },
                    { "id": "1002", "type": "Chocolate" }
                ]
        },
        "topping":
            [
                { "id": "5001", "type": "None" },
                { "id": "5002", "type": "Glazed" },
                { "id": "5003", "type": "Chocolate" },
                { "id": "5004", "type": "Maple" }
            ]
    }
]

app.get('/sweets/:id', (req, res) => {
    const id = req.params.id

    const obj = data.filter(e => e.id == id)[0]

    res.send("<h1>"+obj.type+"</h1>")
})

app.get('/sweets/:id/:cat/', (req, res) => {
    const id  = req.params.id
    const cat = req.params.cat

    let obj = data.filter(e => e.id == id)[0][cat]

    if (cat == "batters")
        obj = obj["batter"]

    const final_data = obj.map(e => e.type)
    res.send("<h1>"+final_data.join(', ')+"</h1>")
})

app.get('/sweets/:id/:cat/:id2', (req, res) => {
    const id  = req.params.id
    const cat = req.params.cat
    const id2 = req.params.id2

    let obj = data.filter(e => e.id == id)[0][cat]

    if (cat == "batters")
        obj = obj["batter"]

    const final_data = obj.filter(e => e.id == id2)[0]
    res.send("<h1>"+final_data.type+"</h1>")
})

app.listen(port, () => {
    console.log(port)
})