import { Locator } from '@playwright/test';
import { Component } from '@Core/component';

type AttributeType = 'card-number' | 'exp-date' | 'cvv';

export class CreditCard extends Component {
    private LOCATORS = {
        input: (attributeName: AttributeType) =>
            this.page.locator(`//input[@id="${attributeName}"]`),
        buttonPlaceOrder: this.locator.locator('//button[contains(.,"Place Order")]'),
    };

    public async clickButtonPlaceOrder() {
        await this.LOCATORS.buttonPlaceOrder.click();
        await this.page.waitForLoadState('domcontentloaded');
    }

    public async fillField(attributeName: AttributeType, data: string) {
        await this.getLocatorField(attributeName).fill(data);
    }

    private getLocatorField(attributeName: AttributeType): Locator {
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
