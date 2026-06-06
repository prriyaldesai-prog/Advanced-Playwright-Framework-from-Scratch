import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "@/pages/BasePage";

export class InventoryPage extends BasePage {
    readonly filterDropdown: Locator;
    private readonly addBackpackBtn: Locator;
    private readonly addBikeLightBtn: Locator;
    private readonly cartIcon: Locator;

    constructor(page: Page) {
        super(page, 'InventoryPage');
        // Dropdown for filtering/sorting
        this.filterDropdown = page.locator('[data-test="product-sort-container"]').or(page.locator('#product-sort-container'));

        // Buttons to add items
        this.addBackpackBtn = page.locator('[data-test="add-to-cart-tta-practice-backpack"]').or(page.locator('button[data-product="tta-practice-backpack"]'));
        this.addBikeLightBtn = page.locator('[data-test="add-to-cart-tta-bike-light"]').or(page.locator('button[data-product="tta-bike-light"]'));

        // Cart Icon
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]').or(page.locator('#shopping_cart_container'));
    }

    async sortBy(option: string) {
        this.log.debug(`Sorting inventory by: ${option}`);
        await this.el.selectByValue(this.filterDropdown, option);
    }

    async addItemsToCart() {
        this.log.debug('Adding backpack and bike light to cart');
        await this.el.click(this.addBackpackBtn);
        await this.el.click(this.addBikeLightBtn);
    }

    async goToCart() {
        this.log.debug('Navigating to cart');
        await this.el.click(this.cartIcon);
    }
}
