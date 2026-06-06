import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "@/pages/BasePage";

export class CheckoutStepOne extends BasePage {
    private readonly firstNameInput: Locator;
    private readonly lastNameInput: Locator;
    private readonly postalCodeInput: Locator;
    private readonly continueBtn: Locator;
    private readonly cancelBtn: Locator;

    constructor(page: Page) {
        super(page, 'CheckoutStepOne');
        this.firstNameInput = page.locator('[data-test="firstName"]');
        this.lastNameInput = page.locator('[data-test="lastName"]');
        this.postalCodeInput = page.locator('[data-test="postalCode"]');
        this.continueBtn = page.locator('[data-test="continue"]');
        this.cancelBtn = page.locator('[data-test="cancel"]');
    }

    async fillDetails(firstName: string, lastName: string, postalCode: string) {
        this.log.debug(`Filling checkout info: ${firstName} ${lastName}, ${postalCode}`);
        await this.el.fill(this.firstNameInput, firstName);
        await this.el.fill(this.lastNameInput, lastName);
        await this.el.fill(this.postalCodeInput, postalCode);
    }

    async continue() {
        this.log.debug('Clicking Continue on checkout step one');
        await this.el.click(this.continueBtn);
    }

    async cancel() {
        this.log.debug('Cancelling checkout step one');
        await this.el.click(this.cancelBtn);
    }
}
