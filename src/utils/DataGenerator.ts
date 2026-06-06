import { faker } from '@faker-js/faker';

/**
 * DataGenerator - Centralised fake-data factory for the TTACart E2E suite.
 *
 * Every method returns a fresh random value on each call so parallel test
 * workers never collide on the same data.
 */

// ─── Domain types ────────────────────────────────────────────────────────────

export interface LoginData {
    username: string;
    password: string;
}

export interface CheckoutCustomerData {
    firstName: string;
    lastName: string;
    postalCode: string;
}

export interface InventorySortOption {
    value: 'az' | 'za' | 'lohi' | 'hilo';
    label: string;
}

export interface ProductData {
    name: string;
    dataTestId: string;
    dataProduct: string;
}

export interface FullCheckoutData {
    login: LoginData;
    customer: CheckoutCustomerData;
    sortOption: InventorySortOption;
    itemToAddFromInventory: ProductData;
    itemToAddFromDetails: ProductData;
}

// ─── Static catalogue (kept in sync with the live TTACart inventory) ─────────

const TTACART_PRODUCTS: ProductData[] = [
    {
        name: 'TTA Practice Backpack',
        dataTestId: 'add-to-cart-tta-practice-backpack',
        dataProduct: 'tta-practice-backpack',
    },
    {
        name: 'TTA Bike Light',
        dataTestId: 'add-to-cart-tta-bike-light',
        dataProduct: 'tta-bike-light',
    },
    {
        name: 'TTA Bolt T-Shirt',
        dataTestId: 'add-to-cart-tta-bolt-tshirt',
        dataProduct: 'tta-bolt-tshirt',
    },
    {
        name: 'TTA Fleece Jacket',
        dataTestId: 'add-to-cart-tta-fleece-jacket',
        dataProduct: 'tta-fleece-jacket',
    },
    {
        name: 'TTA Junior Tester Onesie',
        dataTestId: 'add-to-cart-tta-junior-tester-onesie',
        dataProduct: 'tta-junior-tester-onesie',
    },
    {
        name: 'Test.allTheThings() T-Shirt (Red)',
        dataTestId: 'add-to-cart-test-allthethings-tshirt-red',
        dataProduct: 'test-allthethings-tshirt-red',
    },
];

const SORT_OPTIONS: InventorySortOption[] = [
    { value: 'az', label: 'Name (A to Z)' },
    { value: 'za', label: 'Name (Z to A)' },
    { value: 'lohi', label: 'Price (low to high)' },
    { value: 'hilo', label: 'Price (high to low)' },
];

// ─── Valid TTACart credentials (from .env / static users) ─────────────────────

const VALID_USERS: LoginData[] = [
    { username: 'standard_user', password: 'tta_secret' },
];

// ─── DataGenerator class ─────────────────────────────────────────────────────

export class DataGenerator {

    // ------ Login Page -------------------------------------------------------

    /** Returns a valid TTACart credential set (randomly picked). */
    static loginData(): LoginData {
        return faker.helpers.arrayElement(VALID_USERS);
    }

    /** Returns an invalid credential set for negative-path tests. */
    static invalidLoginData(): LoginData {
        return {
            username: faker.internet.username(),
            password: faker.internet.password({ length: 10 }),
        };
    }

    // ------ Inventory Page ---------------------------------------------------

    /** Returns a random sort option for the inventory dropdown. */
    static sortOption(): InventorySortOption {
        return faker.helpers.arrayElement(SORT_OPTIONS);
    }

    /** Returns a specific sort option by value. */
    static sortOptionByValue(value: InventorySortOption['value']): InventorySortOption {
        return SORT_OPTIONS.find(o => o.value === value)!;
    }

    /** Returns a random product from the catalogue. */
    static randomProduct(): ProductData {
        return faker.helpers.arrayElement(TTACART_PRODUCTS);
    }

    /** Returns two distinct random products (useful for multi-item cart tests). */
    static twoDistinctProducts(): [ProductData, ProductData] {
        const shuffled = faker.helpers.shuffle([...TTACART_PRODUCTS]);
        return [shuffled[0], shuffled[1]];
    }

    /** Returns a specific product by its dataProduct key. */
    static productByKey(dataProduct: string): ProductData {
        const found = TTACART_PRODUCTS.find(p => p.dataProduct === dataProduct);
        if (!found) throw new Error(`No product with key: ${dataProduct}`);
        return found;
    }

    // ------ Item Details / Cart Page ----------------------------------------

    /** Alias – semantically clearer when used in an item-details context. */
    static itemForDetailsPage(): ProductData {
        return DataGenerator.randomProduct();
    }

    // ------ Checkout Step One (customer info) --------------------------------

    /** Generates realistic customer info using faker. */
    static checkoutCustomer(): CheckoutCustomerData {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode(),
        };
    }

    /** Generates customer info with an empty firstName (for validation tests). */
    static checkoutCustomerMissingFirstName(): CheckoutCustomerData {
        return {
            firstName: '',
            lastName: faker.person.lastName(),
            postalCode: faker.location.zipCode(),
        };
    }

    /** Generates customer info with an empty lastName (for validation tests). */
    static checkoutCustomerMissingLastName(): CheckoutCustomerData {
        return {
            firstName: faker.person.firstName(),
            lastName: '',
            postalCode: faker.location.zipCode(),
        };
    }

    /** Generates customer info with an empty postalCode (for validation tests). */
    static checkoutCustomerMissingPostalCode(): CheckoutCustomerData {
        return {
            firstName: faker.person.firstName(),
            lastName: faker.person.lastName(),
            postalCode: '',
        };
    }

    // ------ Full E2E bundle --------------------------------------------------

    /**
     * Returns a complete data bundle for the happy-path E2E checkout flow,
     * covering every page from Login → Inventory → Item Details → Cart →
     * Checkout Step One → Checkout Step Two → Checkout Complete.
     */
    static fullCheckoutFlow(): FullCheckoutData {
        const [itemA, itemB] = DataGenerator.twoDistinctProducts();
        return {
            login: DataGenerator.loginData(),
            customer: DataGenerator.checkoutCustomer(),
            sortOption: DataGenerator.sortOption(),
            itemToAddFromInventory: itemA,
            itemToAddFromDetails: itemB,
        };
    }
}
