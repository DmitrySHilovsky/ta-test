import { Container } from '@Core/container';
import { DeliveryStep } from '@Components/checkoutPage/deliveryStep/deliveryStep';
import { PaymentStep } from '@Components/checkoutPage/paymentStep/paymentStep';

export class CheckoutPage extends Container {
    private LOCATORS = {
        buttonProceedToCheckout: this.page.locator('//div[@data-test-name="proceedToCheckoutBtn"]'),
        deliveryStep: this.page.locator('//div[@name="deliveryStep"]'),
        paymentStep: this.page.locator('//div[@name="paymentStep"]'),
    };

    public DeliveryStep = new DeliveryStep(this.LOCATORS.deliveryStep, this.page);
    public PaymentStep = new PaymentStep(this.LOCATORS.paymentStep, this.page);

    public async clickButtonProceedToCheckout(): Promise<void> {
        await Promise.all([
            this.LOCATORS.buttonProceedToCheckout.click(),
            this.page.waitForLoadState('domcontentloaded'),
        ]);
    }
}
