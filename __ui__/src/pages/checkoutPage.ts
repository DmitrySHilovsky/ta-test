import { DeliveryStep } from '@Components/checkoutPage/deliveryStep/deliveryStep';
import { PaymentStep } from '@Components/checkoutPage/paymentStep/paymentStep';
import { Container } from '@Core/container';

export class CheckoutPage extends Container {
    protected LOCATORS = {
        buttonProceedToCheckout: this.page.locator('//div[@data-test-name="proceedToCheckoutBtn"]'),
        deliveryStep: this.page.locator('//div[@name="deliveryStep"]'),
        paymentStep: this.page.locator('//div[@name="paymentStep"]'),
        // buttonRevies: this.page.locator('//button[contains(@class,"reviewLinkBlock__reviews")]'),
    };
    public DeliveryStep = new DeliveryStep(this.LOCATORS.deliveryStep, this.page);
    public PaymentStep = new PaymentStep(this.LOCATORS.paymentStep, this.page);

    public async buttonProceedToCheckout(): Promise<void> {
        await Promise.all([
            this.LOCATORS.buttonProceedToCheckout.click(),
            this.page.waitForLoadState('domcontentloaded'),
        ]);
    }
}
