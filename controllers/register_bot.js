const puppeteer = require('puppeteer')
const io = require('socket.io-client')
const { uniqueNamesGenerator, adjectives, colors, animals } = require('unique-names-generator');
const { url, LOCAL_SOCKET_IP, LOCAL_SOCKET_PORT } = require('../helpers/config')
const local = io.connect(`http://${LOCAL_SOCKET_IP}:${LOCAL_SOCKET_PORT}`)

module.exports = async (req, res) => {

    //console.log(req.body)

    const { loop, email, password, phone } = req.body

    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: false,
        slowMo: 5
    })

    const page = (await browser.pages())[0]
    await page.setDefaultNavigationTimeout(60000)
    await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/99.0.4844.84 Safari/537.36')

    for (let i = 0; i < loop; i++) {

        const obj = {
            fname: uniqueNamesGenerator({
                dictionaries: [adjectives],
                length: 1
            }),
            lname: uniqueNamesGenerator({
                dictionaries: [animals],
                length: 1
            }),
            email: email + String(i + 5),
            password: password,
            phone: phone,
            day: String(Math.ceil(Math.random() * 30)),
            month: String(Math.ceil(Math.random() * 12)),
            year: String(Math.ceil(Math.random() * (2000 - 1990) + 1990)),
            gender: String(Math.ceil(Math.random() * 2)),
        }

        await register(obj)

    }

    // console.log('Operation is done , closing bot.')
    // await delay(3000)
    // await browser.close()

    //////////////////////////////////// function ////////////////////////////////////////

    async function register(data) {

        console.log(data)

        try {

            await page.goto(url, { waitUntil: 'networkidle2' })
            await page.click('body > header > div > div > div > a:nth-child(3) > span.laptop-desktop-only')
            await delay(1000)
            await page.type('#firstName', data.fname)
            await delay(1000)
            await page.type('#lastName', data.lname)
            await delay(1000)
            await page.type('#username', data.email)
            await delay(1000)
            await page.type('#passwd > div.aCsJod.oJeWuf > div > div.Xb9hP > input', data.password)
            await delay(1000)
            await page.type('#confirm-passwd > div.aCsJod.oJeWuf > div > div.Xb9hP > input', data.password)
            await delay(1000)
            await page.click('#accountDetailsNext > div > button > span')
            await delay(2000)
            await page.type('#phoneNumberId', data.phone)
            await delay(1000)
            await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button > span')

            await delay(1000)
            local.on('sms-confirm', (body) => { confirmSMS(body, data) })

        } catch (err) {

            console.log(err)

            res.status(400).json({ message: err })

        }

    }

    async function confirmSMS(body, data) {

        try {

            console.log(body)

            await page.type('#code', body)
            await delay(1000)
            await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div.dG5hZc > div.qhFLie > div > div > button > span')
            await delay(1000)
            await page.click('#phoneNumberId', { clickCount: 3 })
            await delay(1000)
            await page.keyboard.press('Backspace')
            await delay(1000)
            await page.type('#day', data.day)
            await delay(1000)
            await page.select('#month', data.month)
            await delay(1000)
            await page.type('#year', data.year)
            await delay(1000)
            await page.select('#gender', data.gender)
            await delay(1000)
            await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button > span')
            await delay(2000)
            await page.click('#view_container > div > div > div.pwWryf.bxPAYd > div > div.zQJV3 > div > div.qhFLie > div > div > button > span')

            process = true

            await delay(1000)

            if (process === true) {

                const obj = {
                    email: data.email+'@gmail.com',
                    password: data.password,
                    fname: data.fname,
                    lname: data.lname,
                    phone: data.phone,
                    day: data.day,
                    month: data.month,
                    year: data.year,
                    gender: data.gender
                }

                local.emit('register-result', obj)

                console.log('Register email :', data.email, 'successful.')

                res.status(201).json({ message: 'Success' })

            }

        } catch (err) {

            console.log(err)

            res.status(400).json({ message: err })

        }

    }

    function delay(time) {
        return new Promise(function (resolve) {
            setTimeout(resolve, time)
        })
    }

}