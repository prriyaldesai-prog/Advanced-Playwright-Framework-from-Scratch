import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "@/pages/BasePage";

export class ItemDetailsPage extends BasePage {
    readonly itemName: Locator;
    readonly itemDesc: Locator;
    readonly itemPrice: Locator;
    private readonly addToCartBtn: Locator;
    private readonly backBtn: Locator;
    private readonly cartIcon: Locator;

    constructor(page: Page) {
        super(page, 'ItemDetailsPage');
        this.itemName = page.locator('[data-test="inventory-item-name"]');
        this.itemDesc = page.locator('[data-test="inventory-item-desc"]');
        this.itemPrice = page.locator('[data-test="inventory-item-price"]');
        this.addToCartBtn = page.locator('[data-test="add-to-cart"]').or(page.locator('#add-to-cart'));
        this.backBtn = page.locator('[data-test="back-to-products"]');
        this.cartIcon = page.locator('[data-test="shopping-cart-link"]');
    }

    async addToCart() {
        this.log.debug('Adding item to cart from details page');
        await this.el.click(this.addToCartBtn);
    }

    async goToCart() {
        this.log.debug('Navigating to cart from details page');
        await this.el.click(this.cartIcon);
    }

    async goBack() {
        this.log.debug('Going back to products');
        await this.el.click(this.backBtn);
    }
}
