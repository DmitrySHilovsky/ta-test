import { Container } from '@Core/container';
import { CartItem } from '@Components/cartPage/cartItem';
import { MentionMe } from '@Components/cartPage/mentionMe';

export class CartPage extends Container {
    private LOCATORS = {
        cartItem: this.page.locator('//li[@data-test-name="cartItem"]'),
        mentionMe: this.page.locator('//div[@data-test-name="mentionMeContainer"]'),
        emptyCartTitle: this.page.locator('//h2[contains(.,"Shopping Cart is Empty")]'),
    };

    public CartItem = new CartItem(this.LOCATORS.cartItem, this.page);
    public MentionMe = new MentionMe(this.LOCATORS.mentionMe, this.page);

    public async getTextEmptyCartTitle(): Promise<string> {
        return (await this.LOCATORS.emptyCartTitle.innerText()).trim();
    }
}
