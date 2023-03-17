import { Container } from '@Core/container';
import type { CartStateType } from 'frontend/store/types';
import { SideBar } from './sideBar';
import { CartList } from './carlList/cartList';

const SELECTORS = {
    title: '//h1[contains(.,"Shopping cart")]',
    cartList: '//div[./div[contains(@class,"CartItemCard")]]',
    emptyCart: '//h2[text()="Cart is empty, please add items"]',
    sideBar: '//div[contains(@class,"totalAndForm")]',
};

export class CartPageContainer extends Container {
    public async fulfill(initialState?: CartStateType): Promise<void> {
        await super.fulfill(initialState);
    }

    public getSideBar(): SideBar {
        const sideBar = document.$x(SELECTORS.sideBar);
        return new SideBar(sideBar);
    }

    public async getCartList(): Promise<CartList> {
        const [cartList] = await document.waitForXpath(SELECTORS.cartList);
        return new CartList(cartList);
    }

    public isEmpty() {
        return Boolean(document.$x(SELECTORS.emptyCart));
    }

    // public async openNewCartPopUp(): Promise<NewCartPopUp> {
    //     await document.clickByXpath(SELECTORS.buttonAddCartItem);
    //     const popUpElement = document.$x(SELECTORS.newCartPopUp);
    //     return new NewCartPopUp(popUpElement);
    // }

    // public async getItemQuantity(): Promise<number> {
    //     const [itemQuantity] = await this.element.waitForXpath(SELECTORS.itemQuantity);
    //     return Number(itemQuantity.textContent);
    // }
}
