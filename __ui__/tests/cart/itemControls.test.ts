import { expect, test } from '@Test';
import { timeout } from '@Utils/timeout';

test.describe.only('Item controls on cart page', () => {
    test('?????????????????????????', async ({ categoryPage, productPage, cartPage }) => {
        // На странице обычных очков выбрать продукт,
        await categoryPage.open('eyeglasses-collection');
        await categoryPage.clickFirstProduct();
        // нажать Choose lenses.
        await productPage.clickChooseLensesButton();
        // Пройти визард выбирая варианты без дополнительной цены.
        await productPage.wizard.buttonNonPrescriptionClick();
        await productPage.wizard.buttonValueLensClick();
        await productPage.wizard.buttonContinueClick();
        await productPage.wizard.buttonClearLensClick();
        await productPage.wizard.buttonContinueClick();
        await productPage.wizard.buttonNoThanksClick();
        await productPage.wizard.buttonAddToCartClick();
        // На странице корзины проверить:
        // При увеличении количества цена меняется и отображается корректно в subtotal.
        await test.step('?????????????????????????', async () => {
            const expectedTotalPrice = (await cartPage.cartItem.getTotalPrice()) * 2;
            await cartPage.cartItem.buttonPlusQuantityClick();

            await timeout(5000); // нужон норм вэйтер!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            const subtotal = await cartPage.mentionMe.getSumarySubtotal();

            expect(expectedTotalPrice).toBe(subtotal);
        });
        // При уменьшении количества цена меняется и отображается корректно в subtotal.
        await test.step('?????????????????????????', async () => {
            const expectedTotalPrice = await cartPage.cartItem.getTotalPrice();
            await cartPage.cartItem.buttonMinusQuantityClick();

            await timeout(5000); // нужон норм вэйтер!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            const subtotal = await cartPage.mentionMe.getSumarySubtotal();

            expect(expectedTotalPrice).toBe(subtotal);
        });
        // При удалении корзины должна быть пустой.
        await test.step('?????????????????????????', async () => {
            await cartPage.cartItem.buttonRemoveClick();
            // кликнуть на кнопку да
            await cartPage.cartItem.buttonConfirmRemoveClick();

            await timeout(5000); // нужон норм вэйтер!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

            const expectText = await cartPage.getTextEmptyCartTitle();

            expect(expectText).toBe('Shopping Cart is Empty');
        });
    });
});
