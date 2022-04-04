const puppeteer = require('puppeteer')
const { url4 } = require('../helpers/config')
const facebook = require('../models/fb_model')

module.exports = async (req, res) => {

    console.log(req.body)

    const { email, password, link } = req.body

    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: false,
        slowMo: 5
    })

    try {

        const page = (await browser.pages())[0]
        await page.goto(url4)
        await page.type('#email', email)
        await delay(1000)
        await page.type('#pass', password)
        await delay(1000)
        await page.click('#loginbutton')
        await delay(2000)
        await page.goto(link)

    } catch (err) {

        console.log(err)

        res.status(400).json({ message: err })

    }

    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        })
    }

}