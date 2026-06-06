import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "@/pages/BasePage";

export class CheckoutComplete extends BasePage {
    readonly thankYouHeader: Locator;
    private readonly backHomeBtn: Locator;

    constructor(page: Page) {
        super(page, 'CheckoutComplete');
        this.thankYouHeader = page.locator('.complete-header').or(page.locator('[data-test="complete-header"]'));
        this.backHomeBtn = page.locator('[data-test="back-to-products"]');
    }

    async goBackHome() {
        this.log.debug('Navigating back to products from checkout complete');
        await this.el.click(this.backHomeBtn);
    }
}
