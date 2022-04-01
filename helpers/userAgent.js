const puppeteer = require('puppeteer')

module.exports = (async () => {

    const browser = await puppeteer.launch({
        defaultViewport: null,
        headless: false,
        executablePath: "C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe",
        args: [
        '--user-data-dir=C:\\Users\\tarkungZ\\AppData\\Local\\Google\\Chrome\\User Data',
        '--profile-directory=Profile 4'],
        slowMo: 15
    })

    console.log(await browser.userAgent())

    await browser.close()
    
})()