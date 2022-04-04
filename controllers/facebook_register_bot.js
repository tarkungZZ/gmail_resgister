const puppeteer = require('puppeteer')
const { url2, url3 } = require('../helpers/config')
const insertFacebook = require('../models/fb_model')

module.exports = async (req, res) => {

    console.log(req.body)

    let processDone = false

    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: false,
        slowMo: 5
    })

    await facebookRegister(req.body)

    async function facebookRegister(data) {

        try {

            const page = (await browser.pages())[0]
            await page.goto(url2)
            const fname = await page.waitForSelector('input[type="text"][name="firstname"]')
            await fname.type(data.fname)
            await delay(1000)
            const lname = await page.waitForSelector('input[type="text"][name="lastname"]')
            await lname.type(data.lname)
            await delay(1000)
            const email = await page.waitForSelector('input[type="text"][name="reg_email__"]')
            await email.type(data.email)
            await delay(1000)
            const email2 = await page.waitForSelector('input[type="text"][name="reg_email_confirmation__"]')
            await email2.type(data.email)
            await delay(1000)
            const password = await page.waitForSelector('input[type="password"][name="reg_passwd__"]')
            await password.type(data.password)
            await delay(1000)
            await page.select('#day', data.day)
            await delay(1000)
            await page.select('#month', data.month)
            await delay(1000)
            await page.select('#year', data.year)
            const gender = await page.waitForSelector(`input[type="radio"][name="sex"][value="${data.gender}"]`)
            await gender.click()
            await delay(1000)
            const submit = await page.waitForSelector('button[type="submit"][name="websubmit"]')
            await submit.click()
            await delay(2000)
            await page.keyboard.press('F5')

            processDone = true

            await facebookConfirmation(data)

        } catch (err) {

            console.log(err)

            res.status(400).json({ message: err })

        }

    }

    async function facebookConfirmation(data) {

        try {

            if (processDone === false) {

                const page2 = await browser.newPage()
                await page2.goto(url3)
                await delay(1000)
                await page2.type('#identifierId', data.email)
                await delay(1000)
                await page2.click('#identifierNext > div > button > span')
                await delay(1000)
                await page2.type('#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input', data.password)
                await delay(1000)
                await page2.click('#passwordNext > div > button > span')
                await delay(2000)
                //await page2.click('#yDmH0d > c-wiz.yip5uc.SSPGKf > c-wiz > div > div.p9lFnc > div > div > div > div.ZRg0lb.Kn8Efe > div:nth-child(3) > div > div.yKBrKe > div > span > span')
                await delay(3000)
                const searchBar = await page2.waitForSelector('input[type="text"][class="gb_ef"]')
                await searchBar.type('fb-')
                await delay(3000)
                const divClick = await page2.waitForSelector('div[class="asor_b asor_f"][dir="ltr"]')
                await divClick.click()
                await delay(4000)

                const linkHandlers = await page2.$x("//a[contains(text(), 'Confirm')]")

                if (linkHandlers.length > 0) {
                    await linkHandlers[0].click()
                } else {
                    throw new Error("Link not found")
                }

                const newPagePromise = new Promise(x => browser.once('targetcreated', target => x(target.page())))
                const newTab = await newPagePromise

                await delay(5000)
                await newTab.type('#pass', data.password)
                await delay(1000)
                await newTab.click('#loginbutton')

                console.log('Register Facebook account for email', data.email, 'successful.')
                console.log('Closing bot.')
                await delay(3000)
                await browser.close()

                const obj = {
                    account: data.email,
                    password: data.password
                }

                const insert = new insertFacebook(obj)

                await insert.save()

                console.log('Register facebook :', data.email, 'successful.')

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