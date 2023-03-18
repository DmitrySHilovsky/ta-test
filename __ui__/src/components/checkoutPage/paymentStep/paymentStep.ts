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

    public CreditCard = new CreditCard(this.LOCATORS.creditCard, this.page);
    public CachOnDelivery = new CashOnDelivery(this.LOCATORS.cachOnDelivery, this.page);
}
