const mongoose = require("mongoose")

const emailSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
    },
    lname: {
        type: String,
    },
    phone: {
        type: String,
    },
    day: {
        type: String,
    },
    month: {
        type: String,
    },
    year: {
        type: String,
    },
    gender: {
        type: String,
    },
})

const email = mongoose.model("email", emailSchema)

module.exports = email