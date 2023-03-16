import { test } from '@Test';
import { timeout } from '@Utils/timeout';

test.describe('"CheckoutNonInteraction" "Error" events', () => {
    const expectedEventCreditCard = {
        event: 'CheckoutNonInteraction',
        eventAction: 'Step 2 - Credit card',
        eventCategory: 'Checkout - D',
    };

    const expectedEventPayment = {
        event: 'CheckoutInteraction',
        eventCategory: 'Checkout - D',
        eventAction: 'Step 2 - Payment',
    };

    test('checking for incorrect and correct data', async ({
        dataLayer,
        categoryPage,
        productPage,
        checkoutPage,
        thankYouPage,
    }) => {
        // Перейти со страницы солнцезащитных очков на продукт.
        await categoryPage.open('sunglasses');
        await categoryPage.clickFirstProduct();
        // Нажать Add To Cart.
        await productPage.clickAddToCartButton();
        // На странице корзины нажать Proceed to Checkout.
        await checkoutPage.buttonProceedToCheckout();
        // И пройти до шага оплаты.
        await checkoutPage.DeliveryStep.Form.fillForm();
        await checkoutPage.DeliveryStep.buttonContinueClick();

        // await test.step('Wrong credit card number', async () => {
        //     const verifyEvent = dataLayer.createEventVerifier(expectedEventCreditCard);
        //     //Ввести неправильный номер карты(4222 2222 2222 2222) или оставить поле пустым.
        //     await checkoutPage.PaymentStep.creditCard.fillField(
        //         'card-number',
        //         '4222 2222 2222 2222'
        //     );
        //     await checkoutPage.PaymentStep.creditCard.buttonPlaceOrderClick();
        //     // Поймать эвент:
        //     // eventLabel: "Error – Please enter a valid credit card number"
        //     await verifyEvent('Error – Please enter a valid credit card number');
        // });

        // await test.step('Correct credit card number, leaving the date field and cvv empty', async () => {
        //     const verifyEvent = dataLayer.createEventVerifier(expectedEventCreditCard);
        //     // Ввести корректный номер карты(4111 1111 1111 1111), оставив поле ММ/ГГ пустым.
        //     await checkoutPage.PaymentStep.creditCard.fillField(
        //         'card-number',
        //         '4111 1111 1111 1111'
        //     );
        //     await checkoutPage.PaymentStep.creditCard.buttonPlaceOrderClick();
        //     // Поймать эвент:
        //     // eventLabel: "Error – Please enter a valid expiration date"
        //     await verifyEvent('Error – Please enter a valid expiration date');
        // });

        // await test.step('Correct credit card number and date, leaving the field "CVV" empty', async () => {
        //     const verifyEvent = dataLayer.createEventVerifier(expectedEventCreditCard);
        //     // Ввести корректные ММ/ГГ, CVV оставить пустым.
        //     await checkoutPage.PaymentStep.creditCard.fillField('exp-date', '1224');
        //     await checkoutPage.PaymentStep.creditCard.buttonPlaceOrderClick();
        //     // Поймать эвент:
        //     // eventLabel: "Error – Please enter your card's security code (CVV/CID)"
        //     await verifyEvent(`Error – Please enter your card's security code (CVV/CID)`);
        // });

        await test.step('Without filling in CVV choose Cash on delivery', async () => {
            const verifyEvent = dataLayer.createEventVerifier(expectedEventPayment);
            //===================================
            await checkoutPage.PaymentStep.creditCard.fillField(
                'card-number',
                '4111 1111 1111 1111'
            );
            await checkoutPage.PaymentStep.creditCard.fillField('exp-date', '1224');
            //================================
            // Не заполняя CVV выбрать Cash on delivery.
            await checkoutPage.PaymentStep.cachOnDelivery.buttonRadioClick();
            await checkoutPage.PaymentStep.cachOnDelivery.buttonPlaceOrderClick();
            // На TY Page поймать эвент:
            // "eventLabel": "CTA - Place Order - Cash On Delivery"
            await thankYouPage.waitModal();
            await verifyEvent(`eventLabel": "CTA - Place Order - Cash On Delivery`);
        });
    });
});
