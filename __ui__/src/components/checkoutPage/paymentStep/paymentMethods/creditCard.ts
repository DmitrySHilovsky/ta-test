import { Component } from '@Core/component';
import { Locator } from '@playwright/test';

type attributeType = 'card-number' | 'exp-date' | 'cvv';

export class CreditCard extends Component {
    protected LOCATORS = {
        input: (attributeName: attributeType) =>
            this.page.locator(`//input[@id="${attributeName}"]`),
        buttonPlaceOrder: this.locator.locator('//button[contains(.,"Place Order")]'),
        fieldCardNumber: this.locator.locator('//*[@id="pan"]'),
    };

    public async fillField(attributeName: attributeType, data: string) {
        await this.getLocatorField(attributeName).fill(data);
    }

    public async clickButtonPlaceOrder() {
        await this.LOCATORS.buttonPlaceOrder.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    private getLocatorField(attributeName: attributeType): Locator {
        let iFrameLocator: string;
        switch (attributeName) {
            case 'card-number': {
                iFrameLocator = 'pan';
                break;
            }
            case 'exp-date': {
                iFrameLocator = 'expiration_date';
                break;
            }
            case 'cvv': {
                iFrameLocator = 'cvv';
                break;
            }
        }
        return this.page
            .frameLocator(`//div[@id="${attributeName}"]/iframe`)
            .locator(`//input[@id="${iFrameLocator}"]`);
    }
}
