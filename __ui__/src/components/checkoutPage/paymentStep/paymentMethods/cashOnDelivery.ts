import { Component } from '@Core/component';

export class CashOnDelivery extends Component {
    protected LOCATORS = {
        buttonRadio: this.locator.locator('//input[@type="radio"]'),
        buttonPlaceOrder: this.locator.locator('//button[contains(.,"Place Order")]'),
    };

    public async buttonRadioClick(): Promise<void> {
        await this.LOCATORS.buttonRadio.click();
    }

    public async buttonPlaceOrderClick(): Promise<void> {
        await Promise.all([
            this.LOCATORS.buttonPlaceOrder.click(),
            this.page.waitForLoadState('networkidle'),
        ]);
    }
}
