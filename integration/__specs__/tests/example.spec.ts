import { CartPageContainer } from '@Components/cartPage/cartPage';
import { Mock } from '@Core/mock';
import { GetCartProductsMock } from '@Mocks/products/get';

// Open cart page
// Check if all prices add up
// Remove all items from cart
// Check all 'Remove' events
// Check for empty cart label, zero price & disabled "Proceed to Checkout" button
// Create new item
// Click "Proceed to Checkout"
// Check "Proceed to Checkout" event

describe('Cart page content', () => {
    const cartPage = new CartPageContainer();
    const mock = Mock.getInstance();
    test('check total price', async () => {
        // Open cart page
        //     add mock
        mock.addMocks(new GetCartProductsMock());
        //     render cartPage
        await cartPage.fulfill();
        // Check if all prices add up Проверьте, все ли цены складываются
        // subTotal = totalPrice
        const sideBar = cartPage.getSideBar();
        const totalPrice = await sideBar.getTotalPrice();

        // Получаем компонент со всеми товарами в корзина
        const cartList = await cartPage.getCartList();

        // Получаем сумму всех Subtotal
        const subtotalPriceAllProducts = await cartList.getSumSubTotalPrice();

        expect(subtotalPriceAllProducts).toBe(totalPrice);
    });
    // test('Empty cart', async () => {
    //     // Open cart page
    //     //     add mock
    //     mock.addMocks(new GetCartProductsMock());
    //     //     render cartPage
    //     await cartPage.fulfill();

    //     expect(cartPage.isEmpty()).toBe(true);
    // });
});
