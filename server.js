const http = require('http').createServer()
const io = require('socket.io')(http)

const PORT = 3000
http.listen(PORT, ()=>{
  console.log(`Listening on port ${PORT}...`)
})

io.on('connection', (socket) => {
  console.log('user is connected.')
})