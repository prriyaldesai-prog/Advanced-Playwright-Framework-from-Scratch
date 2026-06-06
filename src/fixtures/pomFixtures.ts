import { test as baseTest } from '@playwright/test';
import { Loginpage } from '@/pages/LoginPage';
import { InventoryPage } from '@/pages/InventoryPage';
import { ItemDetailsPage } from '@/pages/ItemDetailsPage';
import { CartPage } from '@/pages/CartPage';
import { CheckoutStepOne } from '@/pages/CheckoutStepOne';
import { CheckoutStepTwo } from '@/pages/CheckoutStepTwo';
import { CheckoutComplete } from '@/pages/CheckoutComplete';

type POMFixtures = {
    loginPage: Loginpage;
    inventoryPage: InventoryPage;
    itemDetailsPage: ItemDetailsPage;
    cartPage: CartPage;
    checkoutStepOne: CheckoutStepOne;
    checkoutStepTwo: CheckoutStepTwo;
    checkoutComplete: CheckoutComplete;
};

export const test = baseTest.extend<POMFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new Loginpage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    itemDetailsPage: async ({ page }, use) => {
        await use(new ItemDetailsPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutStepOne: async ({ page }, use) => {
        await use(new CheckoutStepOne(page));
    },
    checkoutStepTwo: async ({ page }, use) => {
        await use(new CheckoutStepTwo(page));
    },
    checkoutComplete: async ({ page }, use) => {
        await use(new CheckoutComplete(page));
    }
});

export { expect } from '@playwright/test';
