import { Component } from '@Core/component';

const SELECTORS = {
    totalPrice: '//div[contains(@class,"summary")]/p',
};

export class SideBar extends Component {
    public async getTotalPrice(): Promise<number> {
        const [totalPrice] = await this.element.waitForXpath(SELECTORS.totalPrice);
        const totalPriceString = totalPrice.textContent.trim().replace(/\D/g, '');
        return parseInt(totalPriceString);
    }
}
