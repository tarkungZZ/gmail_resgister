const express = require("express")
const app = express()
const insertSMS = require('../controllers/insert_sms')
const insertEmail = require('../controllers/insert_email')
const gmailReg = require('../controllers/gmail_register_bot')
const fbReg = require('../controllers/facebook_register_bot')
const watchBot = require('../controllers/watch_live_bot')

app.post("/insert-sms", insertSMS)
app.post('/insert-email', insertEmail)
app.post('/gmail-register', gmailReg)
app.post('/fb-register', fbReg)
app.post('/watch', watchBot)

module.exports = app