const http = require('http')
const express = require('express')
const path = require('path')
const bodyParser = require('body-parser')

const io = require('./io')
const index = require('./routes/index')

// open mongodb connect
const connect = require('./connect')

const app = express()
const server = http.createServer(app)
const port = process.env.PORT || 3000

io.attach(server)

app.set('view engine', 'pug')
app.set('view cache', false)

app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use(index)

server.listen(port)

server.on('listening', () => {
  console.log(`server multiple choice test is listening at port ${port}`)
})
