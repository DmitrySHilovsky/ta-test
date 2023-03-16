import { Component } from '@Core/component';
import { CashOnDelivery } from './paymentMethods/cashOnDelivery';
import { CreditCard } from './paymentMethods/creditCard';

export class PaymentStep extends Component {
    protected LOCATORS = {
        creditCard: this.locator.locator(
            '//div[contains(@class,"paymentCreditCardWrapper__container")]'
        ),
        cachOnDelivery: this.locator.locator(
            '//div[contains(@class,"paymentWrapper__wrapper") and .//div/text()="Cash On Delivery"]'
        ),
    };

    public creditCard = new CreditCard(this.LOCATORS.creditCard, this.page);
    public cachOnDelivery = new CashOnDelivery(this.LOCATORS.cachOnDelivery, this.page);
}
