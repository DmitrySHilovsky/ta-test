import { Container } from '@Core/container';

export class ThankYouPage extends Container {
    private LOCATORS = {
        ModalReferrer: this.page.locator('//div[@id="mmModalReferrerStage1"]'),
    };

    public async waitModal(): Promise<void> {
        await this.LOCATORS.ModalReferrer.waitFor();
    }
}
