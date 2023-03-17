import { Component } from '@Core/component';
import { dollarsToNumber } from '@Utils/converter';

export class MentionMe extends Component {
    protected LOCATORS = {
        sumarySubtotal: this.locator.locator('//div[@id="summary_subtotal"]'),
        sumaryDiscount: this.locator.locator('//div[@id="summary_discount"]'),
        sumaryShipingPrice: this.locator.locator('//div[@id="summary_shipping_price"]'),
        grandTotalPrice: this.locator.locator('//span[@id="summary_grand_total"]'),
    };

    public async getSumarySubtotal(): Promise<Number> {
        return dollarsToNumber(this.LOCATORS.sumarySubtotal);
    }
}
