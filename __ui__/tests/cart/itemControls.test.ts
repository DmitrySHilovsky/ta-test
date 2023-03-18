import { expect, test } from '@Test';

test.describe('Item controls on cart page', () => {
    test('Checking cart data after increasing, decreasing quantity. Checking deleting an item', async ({
        categoryPage,
        productPage,
        cartPage,
    }) => {
        await categoryPage.open('eyeglasses-collection');

        await categoryPage.clickFirstProduct();
        await productPage.clickChooseLensesButton();
        await productPage.Wizard.clickButtonNonPrescription();
        await productPage.Wizard.clickButtonValueLens();
        await productPage.Wizard.clickButtonContinue();
        await productPage.Wizard.clickButtonClearLens();
        await productPage.Wizard.clickButtonContinue();
        await productPage.Wizard.clickButtonNoThanks();
        await productPage.Wizard.clickButtonAddToCart();

        await test.step('Сhecking the change in the amount payable after the increase', async () => {
            const expectedTotalPrice = (await cartPage.CartItem.getTotalPrice()) * 2;

            await cartPage.CartItem.clickButtonPlusQuantity();

            const subtotal = await cartPage.MentionMe.getSummarySubtotal();

            expect(expectedTotalPrice).toBe(subtotal);
        });

        await test.step('Сhecking the change in the amount payable after the decreasing', async () => {
            const expectedTotalPrice = await cartPage.CartItem.getTotalPrice();

            await cartPage.CartItem.clickButtonMinusQuantity();

            const subtotal = await cartPage.MentionMe.getSummarySubtotal();

            expect(expectedTotalPrice).toBe(subtotal);
        });

        await test.step('Сhecking that the cart is empty after deleting an item', async () => {
            await cartPage.CartItem.clickButtonRemove();
            await cartPage.CartItem.clickButtonConfirmRemove();

            const expectedEmptyCartTitleText = await cartPage.getTextEmptyCartTitle();

            expect(expectedEmptyCartTitleText).toBe('Shopping Cart is Empty');
        });
    });
});
