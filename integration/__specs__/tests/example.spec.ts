import { Mock } from '@Core/mock';
import { GetCartProductsMock } from '@Mocks/products/get';
import { CartPageContainer } from '@Components/cartPage/cartPage';
import { checkDataLayerEvent } from '@Utils/checkDataLayerEvent';
import { formatPrice } from '@Utils/formatPrice';

describe('Cart page content', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();
    test('Check total price all products, check datalayer event after remove all items from cart, check for empty cart label, zero price & disabled "Proceed to Checkout" button, Check "Proceed to Checkout" event after create new item', async () => {
        mock.addMocks(new GetCartProductsMock());
        await cartPage.fulfill();

        const sideBar = cartPage.getSideBar();
        const cartList = await cartPage.getCartList();

        reporter.startStep(`Checking if the sum of the prices of all goods matches`);
        let totalPrice = await sideBar.getTotalPrice();
        const sumSubtotalPriceAllProducts = await cartList.getSumSubTotalPrice();

        expect(totalPrice).toBe(sumSubtotalPriceAllProducts);
        reporter.endStep();

        reporter.startStep(
            `Check 'Remove' event & check for empty cart label, zero price & disabled "Proceed to Checkout" button - after remove all items in cart`
        );
        await cartList.removeAllItemsAndCheckRemoveEvents();

        expect(cartPage.isEmpty()).toBe(true);

        totalPrice = await sideBar.getTotalPrice();

        expect(totalPrice).toBe(0);
        expect(sideBar.isDisabledButtonProccesToCheckOut()).toBe(true);
        reporter.endStep();

        reporter.startStep(`Check "Proceed to Checkout" event after create new item`);
        window.dataLayer = [];
        await sideBar.createNewItem();

        totalPrice = await sideBar.getTotalPrice();
        await sideBar.clickProceedToCheckOut();

        checkDataLayerEvent('Proceed to Checkout', formatPrice(totalPrice));
        reporter.endStep();
    });
});
