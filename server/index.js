const express = require('express')
const app = express()
const path = require('path')

app.use(express.static('build'))
app.get('/*', (_, res) => {
  const index = path.join(__dirname, '..', 'build', 'index.html')
  res.sendFile(index)
})

module.exports = app;
