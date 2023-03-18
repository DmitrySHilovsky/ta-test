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
        await productPage.wizard.buttonNonPrescriptionClick();
        await productPage.wizard.buttonValueLensClick();
        await productPage.wizard.buttonContinueClick();
        await productPage.wizard.buttonClearLensClick();
        await productPage.wizard.buttonContinueClick();
        await productPage.wizard.buttonNoThanksClick();
        await productPage.wizard.buttonAddToCartClick();

        await test.step('Сhecking the change in the amount payable after the increase', async () => {
            const expectedTotalPrice = (await cartPage.cartItem.getTotalPrice()) * 2;

            await cartPage.cartItem.buttonPlusQuantityClick();

            const subtotal = await cartPage.mentionMe.getSumarySubtotal();

            expect(expectedTotalPrice).toBe(subtotal);
        });

        await test.step('Сhecking the change in the amount payable after the decreasing', async () => {
            const expectedTotalPrice = await cartPage.cartItem.getTotalPrice();

            await cartPage.cartItem.buttonMinusQuantityClick();

            const subtotal = await cartPage.mentionMe.getSumarySubtotal();

            expect(expectedTotalPrice).toBe(subtotal);
        });
        // При удалении корзины должна быть пустой.
        await test.step('Сhecking that the cart is empty after deleting an item', async () => {
            await cartPage.cartItem.buttonRemoveClick();
            await cartPage.cartItem.buttonConfirmRemoveClick();

            const expectText = await cartPage.getTextEmptyCartTitle();

            expect(expectText).toBe('Shopping Cart is Empty');
        });
    });
});
