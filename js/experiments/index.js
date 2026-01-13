import express from 'express'
import path from 'node:path'

const app = express()
const PORT = 3407

const users = [
    {login: 'abc', pass: 'abc'},
    {login: 'bcd', pass: 'bcd'},
    {login: 'cde', pass: 'cde'}
]

app.use(express.json())
app.post('/users', (req, res) => {
    const login = req.body.login   
    res.json(users.find(e => e.login == login))
})

app.get('/login', (req, res) => {
    res.sendFile("login.html", {root: '/Users/kamilpawlowski/Desktop/algo25/js/experiments'})
})

app.listen(PORT, () => {
    console.log(`http://127.0.0.1:${PORT}`)
})