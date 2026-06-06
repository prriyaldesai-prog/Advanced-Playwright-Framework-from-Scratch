import asyncio
from playwright.async_api import async_playwright

async def main():
    async with async_playwright() as p:
        browser = await p.chromium.launch()
        page = await browser.new_page()
        await page.goto("https://app.thetestingacademy.com/playwright/ttacart/")
        await page.fill('#user-name', 'standard_user')
        await page.fill('#password', 'tta_secret')
        await page.click('#login-button')
        await page.wait_for_url('**/inventory*')
        content = await page.content()
        with open('inventory_html.txt', 'w', encoding='utf-8') as f:
            f.write(content)
        await browser.close()

asyncio.run(main())
