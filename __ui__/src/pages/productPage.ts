import { Wizard } from '@Components/productPage/wizard';
import { Container } from '@Core/container';

export class ProductPage extends Container {
    protected LOCATORS = {
        wizard: this.page.locator('//section[contains(@class,"wizardContainer")]'),
        buttonAddToCart: this.page.locator('//button[@aria-label="add to cart"]'),
        buttonChooseLenses: this.page.locator('//button[contains(.,"Choose Lenses")]'),
        buttonRevies: this.page.locator('//button[contains(@class,"reviewLinkBlock__reviews")]'),
        countCart: this.page.locator('//span[contains(@class,"cartIcon__counts")]'),
    };

    public wizard = new Wizard(this.LOCATORS.wizard, this.page);

    public async clickAddToCartButton(): Promise<void> {
        await this.LOCATORS.buttonRevies.waitFor();
        await this.LOCATORS.buttonAddToCart.click();
    }

    public async clickChooseLensesButton(): Promise<void> {
        await this.LOCATORS.buttonRevies.waitFor();
        await this.LOCATORS.buttonChooseLenses.click();
    }
}
