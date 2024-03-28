const express = require('express')
const app = express()
const port = process.env.PORT || 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/modal', (req, res) => {
  console.log('GET /modal')
  res.status(200).json({ title: 'Hello Modal!' })
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})