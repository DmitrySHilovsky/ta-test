import { test } from '@Test';

test.describe('"CheckoutNonInteraction" "Error" events', () => {
    const expectedEventActionCreditCard = {
        event: 'CheckoutNonInteraction',
        eventAction: 'Step 2 - Credit card',
        eventCategory: 'Checkout - D',
    };

    const expectedEventActionPayment = {
        event: 'CheckoutInteraction',
        eventCategory: 'Checkout - D',
        eventAction: 'Step 2 - Payment',
    };

    test('Checking datalayer event for incorrect and correct data', async ({
        dataLayer,
        categoryPage,
        productPage,
        checkoutPage,
        thankYouPage,
    }) => {
        await categoryPage.open('sunglasses');

        await categoryPage.clickFirstProduct();
        await productPage.clickAddToCartButton();
        await checkoutPage.clickButtonProceedToCheckout();
        await checkoutPage.DeliveryStep.Form.fillForm();
        await checkoutPage.DeliveryStep.clickButtonContinue();

        await test.step('Checking event after fill wrong credit card number', async () => {
            const verifyEvent = dataLayer.createEventVerifier(expectedEventActionCreditCard);

            await checkoutPage.PaymentStep.CreditCard.fillField(
                'card-number',
                '4222 2222 2222 2222'
            );
            await checkoutPage.PaymentStep.CreditCard.clickButtonPlaceOrder();

            await verifyEvent('Error – Please enter a valid credit card number');
        });

        await test.step('Checking event after fill correct credit card number, leaving the date field and cvv empty', async () => {
            const verifyEvent = dataLayer.createEventVerifier(expectedEventActionCreditCard);

            await checkoutPage.PaymentStep.CreditCard.fillField(
                'card-number',
                '4111 1111 1111 1111'
            );
            await checkoutPage.PaymentStep.CreditCard.clickButtonPlaceOrder();

            await verifyEvent('Error – Please enter a valid expiration date');
        });

        await test.step('Correct credit card number and date, leaving the field "CVV" empty', async () => {
            const verifyEvent = dataLayer.createEventVerifier(expectedEventActionCreditCard);

            await checkoutPage.PaymentStep.CreditCard.fillField('exp-date', '1224');
            await checkoutPage.PaymentStep.CreditCard.clickButtonPlaceOrder();

            await verifyEvent(`Error – Please enter your card's security code (CVV/CID)`);
        });

        await test.step('Without filling in CVV choose Cash on delivery', async () => {
            const verifyEvent = dataLayer.createEventVerifier(expectedEventActionPayment);

            await checkoutPage.PaymentStep.CachOnDelivery.clickButtonRadio();
            await checkoutPage.PaymentStep.CachOnDelivery.clickButtonPlaceOrder();

            await thankYouPage.waitModal();
            await verifyEvent('CTA - Place Order - Cash On Delivery');
        });
    });
});
