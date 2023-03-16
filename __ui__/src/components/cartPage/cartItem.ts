import { Component } from '@Core/component';

export class CartItem extends Component {
    protected LOCATORS = {
        totalPrice: this.locator.locator(
            '//div[@data-test-name="frameInfo"]//span[@data-test-name="totalPrice"]'
        ),
    };

    // public async fulfill(initialState = {}): Promise<void> {
    //     await super.fulfill(initialState);
    // }
}
