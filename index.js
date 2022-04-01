const { LOCAL_SERVER_PORT } = require('./helpers/config')
const http = require('http')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/insert-sms', require('./controllers/insert_sms'))

http.createServer(app).listen(LOCAL_SERVER_PORT, () => {
    console.log(`Local server is running at port ${LOCAL_SERVER_PORT}`)
})

