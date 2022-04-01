const app = require('express')()
const http = require('http').createServer(app)
const io = require('socket.io')(http)
const { LOCAL_SOCKET_PORT, LOCAL_SOCKET_IP, port } = require('./helpers/config')
const request = require('request')

io.on('connection', (socket) => {

    socket.on('sms-code', (data) => {
        console.log('sms :', data)
        io.emit('sms-confirm', data)
    })

    socket.on('register-result', (data) => {
        console.log('regis-result :', data)
        request.post({ url: `http://${LOCAL_SOCKET_IP}:${port}/insert-email`, json: data }, (err) => {
            if (err) console.error(err)
        })
    })

    socket.on('disconnect', () => {
        console.log('socket is disconnected.')
    })

})

http.listen(LOCAL_SOCKET_PORT, () => {
    console.log(`Socket listening on : ${LOCAL_SOCKET_PORT}`)
})