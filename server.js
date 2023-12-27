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

io.on('connect', (socket) => {
  console.log('user is connected.', socket.id)
})