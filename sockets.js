let readyPlayerCount = 0

function listen(io) {
  io.on('connect', (socket) => {
    console.log('User is connected:', socket.id)

    socket.on('ready', () => {
      console.log('Player ready:', socket.id)
      readyPlayerCount++

      if (readyPlayerCount === 2) {
        const refereeId = socket.id
        io.emit('startGame', refereeId)
      }
    })

    socket.on('paddleMove', (paddleData) => {
      socket.broadcast.emit('paddleMove', paddleData)
    })

    socket.on('ballMove', (ballData) => {
      socket.broadcast.emit('ballMove', ballData)
    })

    socket.on('disconnect', (reason) => {
      console.log(`User disconnected ${socket.id}: ${reason}`)
    })
  })
}

module.exports = {
  listen
}