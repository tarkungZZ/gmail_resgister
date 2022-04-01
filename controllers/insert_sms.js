const io = require('socket.io-client')
const { LOCAL_SOCKET_IP, LOCAL_SOCKET_PORT } = require('../helpers/config')
const local = io.connect(`http://${LOCAL_SOCKET_IP}:${LOCAL_SOCKET_PORT}`)
const insertSMS = require('../models/sms_model')

module.exports = async (req, res) => {

    try {

        let sms = Object.keys(req.body)
        sms = String(sms)
        sms = sms.slice(2, 8)

        // const { sms } = req.body

        //console.log(sms)

        const insert = new insertSMS({ sms })

        await insert.save()

        local.emit('sms-code', sms)

        res.status(201).json({ message: 'Success' })

    } catch (err) {

        console.log(err)

        res.status(400).json({ message: 'error' })

    }

}