const { chromium } = require('playwright');
const fs = require('fs');

(async () => {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    
    // Login
    await page.goto("https://app.thetestingacademy.com/playwright/ttacart/");
    await page.fill('#user-name', 'standard_user');
    await page.fill('#password', 'tta_secret');
    await page.click('#login-button');
    await page.waitForURL('**/inventory*');
    
    // Item details
    await page.click('[data-test="item-tta-practice-backpack-title-link"]');
    await page.waitForTimeout(500);
    fs.writeFileSync('item_html.txt', await page.content());
    
    // Add to cart and go to cart
    await page.click('[data-test="add-to-cart-tta-practice-backpack"]');
    await page.click('[data-test="shopping-cart-link"]');
    await page.waitForURL('**/cart*');
    fs.writeFileSync('cart_html.txt', await page.content());
    
    // Checkout Step 1
    await page.click('[data-test="checkout"]');
    await page.waitForURL('**/checkout-step-one*');
    fs.writeFileSync('step1_html.txt', await page.content());
    
    // Checkout Step 2
    await page.fill('[data-test="firstName"]', 'Test');
    await page.fill('[data-test="lastName"]', 'User');
    await page.fill('[data-test="postalCode"]', '12345');
    await page.click('[data-test="continue"]');
    await page.waitForURL('**/checkout-step-two*');
    fs.writeFileSync('step2_html.txt', await page.content());
    
    // Checkout Complete
    await page.click('[data-test="finish"]');
    await page.waitForURL('**/checkout-complete*');
    fs.writeFileSync('complete_html.txt', await page.content());

    await browser.close();
})();
