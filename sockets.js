let readyPlayerCount = 0

function listen(io) {
  const pingPongNamespace = io.of('/pingPong')
  pingPongNamespace.on('connect', (socket) => {
    console.log('User is connected:', socket.id)
    let room

    socket.on('ready', () => {
      room = 'room' + Math.floor(readyPlayerCount / 2)
      socket.join(room)
      console.log('Player ready:', socket.id, room)
      readyPlayerCount++

      if (readyPlayerCount % 2 === 0) {
        const refereeId = socket.id
        pingPongNamespace.in(room).emit('startGame', refereeId)
      }
    })

    socket.on('paddleMove', (paddleData) => {
      socket.to(room).emit('paddleMove', paddleData)
    })

    socket.on('ballMove', (ballData) => {
      socket.to(room).emit('ballMove', ballData)
    })

    socket.on('disconnect', (reason) => {
      console.log(`User disconnected ${socket.id}: ${reason}`)
      socket.leave(room)
    })
  })
}

module.exports = {
  listen
}