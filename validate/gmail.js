const Joi = require('joi')

module.exports = (req, res, next) => {
    Joi.validate(req.body, {
        loop: Joi.number().required(),
        email: Joi.string().required(),
        password: Joi.string().regex(/^[0-9a-zA-Z]+$/).min(6).required(),
        phone: Joi.string().regex(/^[0-9]/).min(10).required(),
    }, { abortEarly: false }, (err) => {
        if (err) {
            res.status(400).json({
                code: 400,
                message: err.details.map(d => d.message.replace(/"|\\/g, ''))
            })
        } else {
            next()
        }
    })
}