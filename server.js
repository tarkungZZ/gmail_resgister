const mongoose = require('mongoose')
const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const { username, password, cluster, db_name, port } = require('./helpers/config')
const Router = require('./routes/route')

mongoose.connect(`mongodb+srv://${username}:${password}@${cluster}.loawe.mongodb.net/${db_name}`)

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "))
db.once("open", function () {
    console.log("Connected successfully")
})

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(Router)

app.listen(port, () => {
    console.log('Server is running at port 3000')
})

