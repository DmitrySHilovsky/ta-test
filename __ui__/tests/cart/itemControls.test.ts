import { test } from '@Test';

test.describe.only('Item controls on cart page', () => {
    test('?????????????????????????', async ({ categoryPage, productPage }) => {
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
        // На странице корзины проверить:
        // При увеличении количества цена меняется и отображается корректно в subtotal.
        // При уменьшении количества цена меняется и отображается корректно в subtotal.
        // При удалении корзины должна быть пустой.
    });
});
