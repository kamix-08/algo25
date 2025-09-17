const express = require('express')
const app = express()
const port = 3407

app.use(express.static('public'))

app.get('/', (req, res) => {
  res.sendFile('index.html', {root: `${__dirname}/public`})
})

app.get('/sub1', (req, res) => {
  res.sendFile('sub1.html', {root: `${__dirname}/public/sub`})
})

app.get('/sub2', (req, res) => {
  res.sendFile('sub2.html', {root: `${__dirname}/public/sub`})
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})