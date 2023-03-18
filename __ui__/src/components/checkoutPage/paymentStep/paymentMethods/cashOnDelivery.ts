import { Component } from '@Core/component';

export class CashOnDelivery extends Component {
    protected LOCATORS = {
        buttonRadio: this.locator.locator('//input[@type="radio"]'),
        buttonPlaceOrder: this.locator.locator('//button[contains(.,"Place Order")]'),
    };

    public async clickButtonRadio(): Promise<void> {
        await this.LOCATORS.buttonRadio.click();
    }

    public async clickButtonPlaceOrder(): Promise<void> {
        await Promise.all([this.LOCATORS.buttonPlaceOrder.click()]);
    }
}
