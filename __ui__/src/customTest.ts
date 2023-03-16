import { test as base, expect } from '@playwright/test';
import { DataLayer } from '@Utils/dataLayer';
import { CartPage } from '@Pages/cartPage';
import { CategoryPage } from '@Pages/categoryPage';
import { CheckoutPage } from '@Pages/checkoutPage';
import { ProductPage } from '@Pages/productPage';
import { ThankYouPage } from '@Pages/thankYouPage';

// Добавить недоставющие страницы в фикстуры и типы

type Options = {
    dataLayer: DataLayer;
    cartPage: CartPage;
    categoryPage: CategoryPage;
    checkoutPage: CheckoutPage;
    productPage: ProductPage;
    thankYouPage: ThankYouPage;
};
const test = base.extend<Options>({
    dataLayer: async ({ page }, use) => {
        await use(new DataLayer(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    categoryPage: async ({ page }, use) => {
        await use(new CategoryPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    productPage: async ({ page }, use) => {
        await use(new ProductPage(page));
    },
    thankYouPage: async ({ page }, use) => {
        await use(new ThankYouPage(page));
    },
});

export { test, expect };
