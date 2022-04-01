const express = require("express")
const app = express()
const insertSMS = require('../controllers/insert_sms')
const insertEmail = require('../controllers/insert_email')
const registerBot = require('../controllers/register_bot')

app.post("/insert-sms", insertSMS)
app.post('/insert-email', insertEmail)
app.post('/register', registerBot)

module.exports = app