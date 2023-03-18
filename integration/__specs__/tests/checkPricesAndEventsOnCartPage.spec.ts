import { Mock } from '@Core/mock';
import { GetCartProductsMock } from '@Mocks/products/get';
import { CartPageContainer } from '@Components/cartPage/cartPage';
import { checkDataLayerEvent } from '@Utils/checkDataLayerEvent';
import { formatPrice } from '@Utils/formatPrice';

describe('Cart page content', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();
    test('Checking total price all products, removing all items from cart and checking datalayer events after remove products', async () => {
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
            `Checking 'Remove' event & checking for empty cart label, zero price & disabled "Proceed to Checkout" button - after remove all items in cart`
        );
        await cartList.removeAllItemsAndCheckRemoveEvents();

        expect(cartPage.isEmpty()).toBe(true);

        totalPrice = await sideBar.getTotalPrice();

        expect(totalPrice).toBe(0);
        expect(sideBar.isDisabledButtonProccesToCheckOut()).toBe(true);
        reporter.endStep();

        reporter.startStep(`Checking "Proceed to Checkout" event after create new item`);
        window.dataLayer = [];
        await sideBar.createNewItem();

        totalPrice = await sideBar.getTotalPrice();
        await sideBar.clickProceedToCheckOut();

        checkDataLayerEvent('Proceed to Checkout', formatPrice(totalPrice));
        reporter.endStep();
    });
});
