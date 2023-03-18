import { Component } from '@Core/component';

export class Wizard extends Component {
    private LOCATORS = {
        buttonNonPrescription: this.locator.locator(
            '//div[@role="button" and contains(., "Non-prescription")]'
        ),
        buttonValueLens: this.locator.locator(
            '//div[contains(@class,"eyeglassesPackages__packageItem") and .//h2[contains(.,"Value")]]'
        ),
        buttonClearLens: this.locator.locator(
            '//div[contains(@class,"wizardSelectBox__container") and .//h3[contains(.,"Clear")]]'
        ),
        buttonContinue: this.locator.locator('//button[contains(., "Continue")]'),
        buttonNoThanks: this.locator.locator('//button[contains(.,"No Thanks")]'),
        buttonAddToCart: this.locator.locator('//button[contains(.,"Add to Cart")]'),
    };

    public async clickButtonNonPrescription(): Promise<void> {
        await this.LOCATORS.buttonNonPrescription.click();
    }

    public async clickButtonValueLens(): Promise<void> {
        await this.LOCATORS.buttonValueLens.click();
    }

    public async clickButtonContinue(): Promise<void> {
        await this.LOCATORS.buttonContinue.click();
    }

    public async clickButtonClearLens(): Promise<void> {
        await this.LOCATORS.buttonClearLens.click();
    }

    public async clickButtonNoThanks(): Promise<void> {
        await this.LOCATORS.buttonNoThanks.click();
    }

    public async clickButtonAddToCart(): Promise<void> {
        await this.LOCATORS.buttonAddToCart.click();
        await this.page.waitForLoadState();
    }
}
