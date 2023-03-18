import { Component } from '@Core/component';
import { dollarsToNumber } from '@Utils/converter';

export class MentionMe extends Component {
    protected LOCATORS = {
        summarySubtotal: this.locator.locator('//div[@id="summary_subtotal"]'),
    };

    public async getSummarySubtotal(): Promise<Number> {
        return await dollarsToNumber(this.LOCATORS.summarySubtotal);
    }
}
