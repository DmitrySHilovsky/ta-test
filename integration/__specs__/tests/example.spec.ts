import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartProductsMock } from '@Mocks/products/get';
import { checkDataLayerEvent } from '@Utils/checkDataLayerEvent';
import { formatPrice } from '@Utils/formatPrice';

describe('Cart page content', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();
    test('Check if all prices add up Check all Remove events Check for empty cart label, zero price & disabled "Proceed to Checkout" button', async () => {
        mock.addMocks(new GetCartProductsMock());
        await cartPage.fulfill();

        const sideBar = cartPage.getSideBar();
        const cartList = await cartPage.getCartList();

        let totalPrice = await sideBar.getTotalPrice();
        const sumSubtotalPriceAllProducts = await cartList.getSumSubTotalPrice();

        expect(totalPrice).toBe(sumSubtotalPriceAllProducts);

        await cartList.removeAllItemsAndCheckRemoveEvents();

        expect(cartPage.isEmpty()).toBe(true);

        totalPrice = await sideBar.getTotalPrice();

        expect(totalPrice).toBe(0);
        expect(sideBar.buttonProccesToCheckOutisDisabled()).toBe(true);

        window.dataLayer = [];
        await sideBar.createNewItem();

        totalPrice = await sideBar.getTotalPrice();
        await sideBar.proceedToCheckOutClick();

        checkDataLayerEvent('Proceed to Checkout', formatPrice(totalPrice));
    });
});
