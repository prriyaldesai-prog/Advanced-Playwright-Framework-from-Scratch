const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    await page.goto("https://app.thetestingacademy.com/playwright/ttacart/");
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'tta_secret');
    await page.click('#login-button');
    await page.waitForURL('**/inventory*');
    const content = await page.content();
    fs.writeFileSync('inventory_html.txt', content);
    await browser.close();
})();
