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
        buttonConfirmRemove: this.locator.locator('//button[contains(.,"Yes")]'),
    };

    public async buttonPlusQuantityClick(): Promise<void> {
        await this.LOCATORS.buttonPlusQuantity.click();
        await this.page.waitForResponse(
            (resp) =>
                resp.url().includes('/backend/optimaxcart/react/getQuote?version=v2.0') &&
                resp.status() === 200
        );
    }

    public async buttonMinusQuantityClick(): Promise<void> {
        await this.LOCATORS.buttonMinusQuantity.click();
        await this.page.waitForResponse(
            (resp) =>
                resp.url().includes('/backend/optimaxcart/react/getQuote?version=v2.0') &&
                resp.status() === 200
        );
    }

    public async buttonRemoveClick(): Promise<void> {
        await this.LOCATORS.buttonRemove.click();
        await this.page.waitForLoadState();
    }

    public async buttonConfirmRemoveClick(): Promise<void> {
        await this.LOCATORS.buttonConfirmRemove.click();
        await this.page.waitForLoadState();
    }

    public async getTotalPrice(): Promise<number> {
        return await dollarsToNumber(this.LOCATORS.totalPrice);
    }
}
