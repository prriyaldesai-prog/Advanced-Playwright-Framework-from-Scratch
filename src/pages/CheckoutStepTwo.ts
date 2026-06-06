import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "@/pages/BasePage";

export class CheckoutStepTwo extends BasePage {
    private readonly finishBtn: Locator;
    private readonly cancelBtn: Locator;
    readonly subtotalLabel: Locator;
    readonly totalLabel: Locator;
    readonly cartItems: Locator;

    constructor(page: Page) {
        super(page, 'CheckoutStepTwo');
        this.finishBtn = page.locator('[data-test="finish"]');
        this.cancelBtn = page.locator('[data-test="cancel"]');
        this.subtotalLabel = page.locator('.summary_subtotal_label').or(page.locator('[data-test="subtotal-label"]'));
        this.totalLabel = page.locator('.summary_total_label').or(page.locator('[data-test="total-label"]'));
        this.cartItems = page.locator('.cart-row');
    }

    async finishCheckout() {
        this.log.debug('Finishing checkout on step two');
        await this.el.click(this.finishBtn);
    }

    async cancel() {
        this.log.debug('Cancelling checkout step two');
        await this.el.click(this.cancelBtn);
    }
}
