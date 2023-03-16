import { Component } from '@Core/component';
import { Form } from './form/form';

export class DeliveryStep extends Component {
    protected LOCATORS = {
        form: this.locator.locator(
            '//form[@name="CheckoutDeliveryForm"]/div/div[@aria-hidden="false"]'
        ),
        buttonContinue: this.locator.locator('//button[contains(.,"Continue")]'),
    };

    public Form = new Form(this.LOCATORS.form, this.page);

    public async buttonContinueClick(): Promise<void> {
        await Promise.all([
            this.LOCATORS.buttonContinue.click(),
            this.page.waitForLoadState('domcontentloaded'),
        ]);
    }
}
