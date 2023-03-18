import { Component } from '@Core/component';

const SELECTORS = {
    buttonAdd: './/button[text()="+"]',
    buttonRemove: './/button[text()="Remove"]',
    itemQuantity: './/div[@data-testid="quantity-current"]',
    itemName: './/h3[contains(@class,"HeaderTitle")]',
    subTotalPrice: './/p[contains(.,"Subtotal")]',
};

export class CartItem extends Component {
    public async add(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonAdd);
    }

    public async getItemQuantity(): Promise<number> {
        const [itemQuantity] = await this.element.waitForXpath(SELECTORS.itemQuantity);
        return Number(itemQuantity.textContent);
    }

    public async getSubTotalPrice(): Promise<number> {
        const [subTotalPrice] = await this.element.waitForXpath(SELECTORS.subTotalPrice);
        const subTotalPriceString = subTotalPrice.textContent.trim().replace(/\D/g, '');
        return parseInt(subTotalPriceString);
    }

    public async getItemName(): Promise<string> {
        const [name] = await this.element.waitForXpath(SELECTORS.itemName);
        return name.textContent.trim();
    }

    public async clickButtonRemove(): Promise<void> {
        await this.element.clickByXpath(SELECTORS.buttonRemove);
    }
}
