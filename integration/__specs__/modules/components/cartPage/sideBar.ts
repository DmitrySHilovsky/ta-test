import { Component } from '@Core/component';
import { delay } from '@Utils/delay';

const SELECTORS = {
    totalPrice: './/div[contains(@class,"summary")]/p',
    buttonProceedToCheckoutDisabled: './/button[@disabled and text()="Proceed to Checkout"]', //??????????????????????????????/
    buttonProceedToCheckOut: './/button[text()="Proceed to Checkout"]',
    inputFieldName: './/input[@placeholder="name"]',
    inputFiledPrice: './/input[@placeholder="price"]',
    inputFieldQuantity: './/input[@placeholder="quantity"]',
    buttonAddNewItem: '//button[text()="Add new item"]',
};

export class SideBar extends Component {
    public async getTotalPrice(): Promise<number> {
        const [totalPrice] = await this.element.waitForXpath(SELECTORS.totalPrice);
        const totalPriceString = totalPrice.textContent.trim().replace(/\D/g, '');
        return parseInt(totalPriceString);
    }

    public buttonProccesToCheckOutisDisabled(): boolean {
        return Boolean(document.$x(SELECTORS.buttonProceedToCheckoutDisabled));
    }

    public async createNewItem(): Promise<void> {
        await this.element.fillByXpath(SELECTORS.inputFieldName, 'Orange');
        await this.element.fillByXpath(SELECTORS.inputFiledPrice, '10');
        await this.element.fillByXpath(SELECTORS.inputFieldQuantity, '3');
        await this.element.clickByXpath(SELECTORS.buttonAddNewItem);
        await delay(100);
    }

    public async proceedToCheckOutClick(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonProceedToCheckOut);
    }
}
