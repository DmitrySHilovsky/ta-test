import { Container } from '@Core/container';
import { Wizard } from '@Components/productPage/wizard';

export class ProductPage extends Container {
    private LOCATORS = {
        wizard: this.page.locator('//section[contains(@class,"wizardContainer")]'),
        buttonAddToCart: this.page.locator('//button[@aria-label="add to cart"]'),
        buttonChooseLenses: this.page.locator('//button[contains(.,"Choose Lenses")]'),
        buttonReviews: this.page.locator('//button[contains(@class,"reviewLinkBlock__reviews")]'),
        countCart: this.page.locator('//span[contains(@class,"cartIcon__counts")]'),
    };

    public Wizard = new Wizard(this.LOCATORS.wizard, this.page);

    public async clickAddToCartButton(): Promise<void> {
        await this.LOCATORS.buttonReviews.waitFor();
        await this.LOCATORS.buttonAddToCart.click();
    }

    public async clickChooseLensesButton(): Promise<void> {
        await this.LOCATORS.buttonReviews.waitFor();
        await this.LOCATORS.buttonChooseLenses.click();
    }
}
