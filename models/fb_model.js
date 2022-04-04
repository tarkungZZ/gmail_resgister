const mongoose = require("mongoose")

const facebookSchema = new mongoose.Schema({
    account: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    watch: {
        type: Number,
        default: 0
    },
    verify: {
        type: Boolean,
        default: false
    }
})

const facebook = mongoose.model("facebook", facebookSchema)

module.exports = facebook