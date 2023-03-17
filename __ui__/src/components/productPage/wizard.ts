import { Component } from '@Core/component';

export class Wizard extends Component {
    protected LOCATORS = {
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

    public async buttonNonPrescriptionClick(): Promise<void> {
        await this.LOCATORS.buttonNonPrescription.waitFor();
        await this.LOCATORS.buttonNonPrescription.click();
    }

    public async buttonValueLensClick(): Promise<void> {
        await this.LOCATORS.buttonValueLens.waitFor();
        await this.LOCATORS.buttonValueLens.click();
    }

    public async buttonContinueClick(): Promise<void> {
        await this.LOCATORS.buttonContinue.click();
    }

    public async buttonClearLensClick(): Promise<void> {
        await this.LOCATORS.buttonClearLens.waitFor();
        await this.LOCATORS.buttonClearLens.click();
    }

    public async buttonNoThanksClick() {
        await this.LOCATORS.buttonNoThanks.waitFor();
        await this.LOCATORS.buttonNoThanks.click();
    }

    public async buttonAddToCartClick() {
        await this.LOCATORS.buttonAddToCart.waitFor();
        await this.LOCATORS.buttonAddToCart.click();
        await this.page.waitForLoadState();
    }
}
