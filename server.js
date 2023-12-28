const http = require('http')
const io = require('socket.io')

const sockets = require('./sockets')
const apiSever = require('./api')

const httpServer = http.createServer(apiSever)
const socketServer = io(httpServer, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
})

const PORT = 3000
httpServer.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}...`)
})

sockets.listen(socketServer)