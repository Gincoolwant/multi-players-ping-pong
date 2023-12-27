const server = require('http').createServer()
const io = require('socket.io')(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const PORT = 3000
server.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}...`)
})

let readyPlayerCount = 0

io.on('connect', (socket) => {
  console.log('User is connected:', socket.id)
  
  socket.on('ready', ()=>{
    console.log('Player ready:', socket.id)
    readyPlayerCount++

    if (readyPlayerCount === 2){
      const refereeId = socket.id
      io.emit('startGame', refereeId)
    }
  })

  socket.on('paddleMove', (paddleData) => {
    socket.broadcast.emit('paddleMove', paddleData)
  })
})