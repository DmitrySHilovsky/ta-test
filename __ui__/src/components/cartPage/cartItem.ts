import { Component } from '@Core/component';
import { dollarsToNumber } from '@Utils/converter';

const ENDPOINT_GET_QUOTE = '/backend/optimaxcart/react/getQuote?version=v2.0';

export class CartItem extends Component {
    private LOCATORS = {
        totalPrice: this.locator.locator(
            '//div[@data-test-name="frameInfo"]//span[@data-test-name="totalPrice"]'
        ),
        quantity: this.locator.locator('//div[contains(@class,"counter__value")]'),
        buttonPlusQuantity: this.locator.locator('//button[text()="+"]'),
        buttonMinusQuantity: this.locator.locator('//button[text()="-"]'),
        buttonRemove: this.locator.locator('//button[text()="Remove"]'),
        buttonConfirmRemove: this.locator.locator('//button[text()="Yes"]'),
    };

    public async clickButtonPlusQuantity(): Promise<void> {
        await this.LOCATORS.buttonPlusQuantity.click();
        await this.page.waitForResponse(
            (resp) => resp.url().includes(ENDPOINT_GET_QUOTE) && resp.status() === 200
        );
    }

    public async clickButtonMinusQuantity(): Promise<void> {
        await this.LOCATORS.buttonMinusQuantity.click();
        await this.page.waitForResponse(
            (resp) => resp.url().includes(ENDPOINT_GET_QUOTE) && resp.status() === 200
        );
    }

    public async clickButtonRemove(): Promise<void> {
        await this.LOCATORS.buttonRemove.click();
        await this.page.waitForLoadState();
    }

    public async clickButtonConfirmRemove(): Promise<void> {
        await this.LOCATORS.buttonConfirmRemove.click();
        await this.page.waitForLoadState();
    }

    public async getTotalPrice(): Promise<number> {
        return await dollarsToNumber(this.LOCATORS.totalPrice);
    }
}
