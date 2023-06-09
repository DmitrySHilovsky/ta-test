import { Container } from '@Core/container';

export class CategoryPage extends Container {
    private LOCATORS = {
        products: this.page.locator('[data-test-name="product"]'),
    };

    public async open(url: 'eyeglasses-collection' | 'sunglasses' | 'contact-lenses') {
        await this.page.goto(`/${url}`, {
            waitUntil: 'domcontentloaded',
        });
    }

    public async clickFirstProduct(): Promise<void> {
        const [arrayProducts] = await this.LOCATORS.products.all();
        await Promise.all([arrayProducts.click(), this.page.waitForLoadState('domcontentloaded')]);
    }
}
