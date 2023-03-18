import { Component } from '@Core/component';
import { delay } from '@Utils/delay';

const DELAY_RENDERING = 100;

const SELECTORS = {
    totalPrice: './/div[contains(@class,"summary")]/p',
    buttonProceedToCheckoutDisabled: './/button[@disabled and text()="Proceed to Checkout"]',
    buttonProceedToCheckOut: './/button[text()="Proceed to Checkout"]',
    buttonAddNewItem: './/button[text()="Add new item"]',
    inputFieldName: './/input[@placeholder="name"]',
    inputFiledPrice: './/input[@placeholder="price"]',
    inputFieldQuantity: './/input[@placeholder="quantity"]',
};

export class SideBar extends Component {
    public async getTotalPrice(): Promise<number> {
        const [totalPrice] = await this.element.waitForXpath(SELECTORS.totalPrice);
        const totalPriceString = totalPrice.textContent.trim().replace(/\D/g, '');
        return parseInt(totalPriceString);
    }

    public isDisabledButtonProccesToCheckOut(): boolean {
        return Boolean(document.$x(SELECTORS.buttonProceedToCheckoutDisabled));
    }

    public async createNewItem(): Promise<void> {
        await this.element.fillByXpath(SELECTORS.inputFieldName, 'Orange');
        await this.element.fillByXpath(SELECTORS.inputFiledPrice, '10');
        await this.element.fillByXpath(SELECTORS.inputFieldQuantity, '3');

        await this.element.clickByXpath(SELECTORS.buttonAddNewItem);
        await delay(DELAY_RENDERING);
    }

    public async clickProceedToCheckOut(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonProceedToCheckOut);
    }
}
