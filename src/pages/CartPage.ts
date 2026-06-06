import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "@/pages/BasePage";

export class CartPage extends BasePage {
    readonly cartItems: Locator;
    private readonly checkoutBtn: Locator;
    private readonly continueShoppingBtn: Locator;

    constructor(page: Page) {
        super(page, 'CartPage');
        this.cartItems = page.locator('.cart-row');
        this.checkoutBtn = page.locator('[data-test="checkout"]');
        this.continueShoppingBtn = page.locator('[data-test="continue-shopping"]');
    }

    async checkout() {
        this.log.debug('Proceeding to checkout');
        await this.el.click(this.checkoutBtn);
    }

    async continueShopping() {
        this.log.debug('Continuing shopping');
        await this.el.click(this.continueShoppingBtn);
    }
}
