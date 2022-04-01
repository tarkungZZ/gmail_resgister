const mongoose = require("mongoose")

const smsSchema = new mongoose.Schema({
  sms: {
    type: String,
    required: true
  }
})

const sms = mongoose.model("sms", smsSchema)

module.exports = sms