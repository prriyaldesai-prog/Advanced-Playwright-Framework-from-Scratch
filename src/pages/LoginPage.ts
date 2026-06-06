import { type Locator, type Page } from "@playwright/test";
import { BasePage } from "@/pages/BasePage";

export class Loginpage extends BasePage {
    private readonly username: Locator;
    private readonly password: Locator;
    private readonly submitButton: Locator;

    constructor(page: Page) {
        super(page, 'Loginpage');
        this.username = page.getByRole("textbox", { name: "Username" }).or(page.getByTestId("username")).or(page.locator("#user-name"));
        this.password = page.getByTestId("password").or(page.getByRole("textbox", { name: "Password" })).or(page.locator("#password"));
        this.submitButton = page.getByTestId("login-button").or(page.getByRole("button", { name: "Login" })).or(page.locator("#login-button"));
    }

    async goto() {
        await super.goto("https://app.thetestingacademy.com/playwright/ttacart/");
    }

    async login(uname: string, pword: string) {
        this.log.debug(`Logging in as ${uname}`);
        await this.el.fill(this.username, uname);
        await this.el.fill(this.password, pword);
        await this.el.click(this.submitButton);
    }
}