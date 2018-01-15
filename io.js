const socket = require('socket.io')
const io = socket()

io.on('connection', (socket) => {
  console.log(`${socket.id} connected`)

  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`)
  })
})

module.exports = io
