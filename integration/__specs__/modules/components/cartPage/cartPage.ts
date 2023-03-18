import { Container } from '@Core/container';
import { SideBar } from './sideBar';
import { CartList } from './carlList/cartList';

import type { CartStateType } from 'frontend/store/types';

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

    public isEmpty(): boolean {
        return Boolean(document.$x(SELECTORS.emptyCart));
    }
}
