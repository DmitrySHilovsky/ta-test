import { Component } from '@Core/component';
import { CartItem } from './cartItem/cartItem';
import { forEachSeries } from 'p-iteration';

const SELECTORS = {
    cartItem: './/div[contains(@class,"CartItemCard")]',
};

export class CartList extends Component {
    public async getCartItems(): Promise<CartItem[]> {
        const cartItems = await this.element.waitForXpath(SELECTORS.cartItem);
        return cartItems.map(item => new CartItem(item));
    }

    public async getSumSubTotalPrice(): Promise<number> {
        const cartItemList = await this.getCartItems();
        let sum: number = 0;
        await forEachSeries(cartItemList, async item => {
            sum += await item.getSubTotalPrice();
        });
        return sum;
    }
}
