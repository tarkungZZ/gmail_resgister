const insertEmail = require('../models/email_model')

module.exports = async (req, res) => {

    try {

        const body = req.body

        const insert = new insertEmail(body)

        await insert.save()

        console.log('Add email into database successful.')

        res.status(201).json({ message: 'Success' })

    } catch (err) {

        console.log(err)

        res.status(400).json({ message: 'Error', err })

    }

}