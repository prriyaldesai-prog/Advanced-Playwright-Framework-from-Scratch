---
name: playwright-pom-creation
description: Guides the creation of Page Object Models (POMs) for Playwright testing, extracting robust locators and integrating them into spec files.
---

# Playwright POM Creation Skill

Follow these steps when tasked with creating a new Page Object Model in this framework:

## 1. Inspect the Live HTML
- Do not guess the selectors! If the HTML structure is unknown, write a short Node.js Playwright script (like `get_html.js`) to navigate to the target page, log in if necessary, and extract the page's HTML using `page.content()`.
- Save the HTML locally and inspect it to find exact IDs, classes, and `data-test` attributes.

## 2. Identify Robust Locators
- Prioritize `data-test` or `data-testid` attributes.
- Note that the TTA Cart application uses **dashed** attributes (e.g., `data-test="product-sort-container"`, NOT underscores).
- Combine selectors using `.or()` for robustness. Example: `page.locator('[data-test="shopping-cart-link"]').or(page.locator('#shopping_cart_container'))`.

## 3. Create the POM Class
- Create a new `.ts` file in `src/pages/` (e.g., `ItemDetailsPage.ts`).
- Export a class with a strongly-typed `page: Page` property and `readonly` properties for each Locator.
- Initialize all locators in the `constructor(page: Page)`.

## 4. Add Helper Methods
- Add async methods for common actions (e.g., `addToCart()`, `goToCheckout()`).
- **Mobile Compatibility**: When clicking elements that might be visually overlapping on mobile viewports (causing pointer interception errors), use `{ force: true }`. Example: `await this.addBtn.click({ force: true });`.

## 5. Integrate and Smoke Test
- Import the new POM into the relevant `spec.ts` file in `src/tests/`.
- Instantiate the POM using the current test `page` and call its helper methods.
- Run `npx playwright test` to verify the new page object works across all configured devices (Chromium, Firefox, WebKit, and Mobile Chrome).

---

## 6. Use DataGenerator for Test Data (Faker)
- The project has `@faker-js/faker` in `devDependencies` — use it, **never** hardcode values like `'Test'`, `'User'`, `'12345'` in specs.
- All faker data is centralised in `src/utils/DataGenerator.ts`. Add new data methods there when a new page introduces new fields.

### Adding data for a new page
1. Define a TypeScript interface for the data shape (e.g. `interface AddressData`).
2. Add a `static` factory method to `DataGenerator` that returns that interface.
3. For multi-step flows, add the new interface to `FullCheckoutData` and generate it inside `fullCheckoutFlow()`.

### Consuming data in a spec
```typescript
import { DataGenerator } from '@/utils/DataGenerator';

const testData = DataGenerator.fullCheckoutFlow();
// testData.customer.firstName, testData.login.username, etc.
```

### Coverage per page
| Page | DataGenerator method |
|---|---|
| `LoginPage` | `DataGenerator.loginData()` / `DataGenerator.invalidLoginData()` |
| `InventoryPage` | `DataGenerator.sortOption()` / `DataGenerator.randomProduct()` |
| `ItemDetailsPage` | `DataGenerator.productByKey(key)` |
| `CartPage` | (no dedicated data — driven by what was added in Inventory) |
| `CheckoutStepOne` | `DataGenerator.checkoutCustomer()` / `DataGenerator.checkoutCustomerMissing*()` |
| `CheckoutStepTwo` | (no dedicated data — asserts existing cart) |
| `CheckoutComplete` | (no dedicated data — asserts completion header) |
