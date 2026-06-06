import { test, expect } from '@/fixtures/pomFixtures';
import { DataGenerator } from '@/utils/DataGenerator';

test.describe('TTA Cart Automation', () => {

    test('End to End Checkout Flow @e2e @p0', async ({ page, loginPage, inventoryPage, itemDetailsPage, cartPage, checkoutStepOne, checkoutStepTwo, checkoutComplete }) => {
        // Generate all test data upfront using DataGenerator
        const testData = DataGenerator.fullCheckoutFlow();

        // 1. Login — using valid credentials from DataGenerator
        await loginPage.goto();
        await loginPage.login(testData.login.username, testData.login.password);

        // 2. Inventory Page — sort using a faker-generated sort option
        await expect(inventoryPage.filterDropdown).toBeVisible();
        await inventoryPage.sortBy(testData.sortOption.value);

        // Navigate to the backpack detail page (fixed item for assertion clarity)
        const backpack = DataGenerator.productByKey('tta-practice-backpack');
        await page.click(`[data-test="item-${backpack.dataProduct}-title-link"]`);

        // 3. Item Details Page — assert item info and add to cart
        await expect(itemDetailsPage.itemName).toHaveText(backpack.name);
        await expect(itemDetailsPage.itemPrice).toContainText('$29.99');
        await itemDetailsPage.addToCart();
        await itemDetailsPage.goToCart();

        // 4. Cart Page — assert 1 item in cart, proceed to checkout
        await expect(page).toHaveURL(/.*cart/);
        await expect(cartPage.cartItems).toHaveCount(1);
        await cartPage.checkout();

        // 5. Checkout Step One — fill with faker-generated customer info
        await expect(page).toHaveURL(/.*checkout-step-one/);
        await checkoutStepOne.fillDetails(
            testData.customer.firstName,
            testData.customer.lastName,
            testData.customer.postalCode,
        );
        await checkoutStepOne.continue();

        // 6. Checkout Step Two — verify order summary and finish
        await expect(page).toHaveURL(/.*checkout-step-two/);
        await expect(checkoutStepTwo.cartItems).toHaveCount(1);
        await checkoutStepTwo.finishCheckout();

        // 7. Checkout Complete — assert thank you screen and navigate home
        await expect(page).toHaveURL(/.*checkout-complete/);
        await expect(checkoutComplete.thankYouHeader).toBeVisible();
        await checkoutComplete.goBackHome();
        await expect(page).toHaveURL(/.*inventory/);
    });
});
