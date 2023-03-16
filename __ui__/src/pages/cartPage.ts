import { CartItem } from '@Components/cartPage/cartItem';
import { MentionMe } from '@Components/cartPage/mentionMe';
import { Container } from '@Core/container';

export class CartPage extends Container {
    LOCATORS = {
        cartItem: this.page.locator('//li[@data-test-name="cartItem"]'),
        mentionMe: this.page.locator('//div[@data-test-name="mentionMeContainer"]'),
    };

    public cartItem = new CartItem(this.LOCATORS.cartItem, this.page);
    public mentionMe = new MentionMe(this.LOCATORS.mentionMe, this.page);
}
