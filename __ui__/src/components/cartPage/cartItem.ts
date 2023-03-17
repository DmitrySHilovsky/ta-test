import { Component } from '@Core/component';
import { dollarsToNumber } from '@Utils/converter';

export class CartItem extends Component {
    protected LOCATORS = {
        totalPrice: this.locator.locator(
            '//div[@data-test-name="frameInfo"]//span[@data-test-name="totalPrice"]'
        ),
        quantity: this.locator.locator('//div[contains(@class,"counter__value")]'),
        buttonPlusQuantity: this.locator.locator('//button[contains(.,"+")]'),
        buttonMinusQuantity: this.locator.locator('//button[contains(.,"-")]'),
        buttonRemove: this.locator.locator('//button[contains(.,"Remove")]'),
    };

    public async buttonPlusQuantityClick() {
        await this.LOCATORS.buttonPlusQuantity.click();
        await this.page.waitForLoadState();
    }

    public async buttonMinusQuantityClick() {
        await this.LOCATORS.buttonMinusQuantity.click();
        await this.page.waitForLoadState();
    }

    public async buttonRemoveClick() {
        await this.LOCATORS.buttonRemove.click();
        await this.page.waitForLoadState();
    }

    public async getTotalPrice(): Promise<number> {
        return dollarsToNumber(this.LOCATORS.totalPrice);
    }
}
