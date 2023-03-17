import { Component } from '@Core/component';

const SELECTORS = {
    totalPrice: './/div[contains(@class,"summary")]/p',
    buttonProceedToCheckoutDisabled: './/button[@disabled and text()="Proceed to Checkout"]', //??????????????????????????????/
    buttonProceedToCheckOut: './/button[text()="Proceed to Checkout"]',
};

export class SideBar extends Component {
    public async getTotalPrice(): Promise<number> {
        const [totalPrice] = await this.element.waitForXpath(SELECTORS.totalPrice);
        const totalPriceString = totalPrice.textContent.trim().replace(/\D/g, '');
        return parseInt(totalPriceString);
    }
}
