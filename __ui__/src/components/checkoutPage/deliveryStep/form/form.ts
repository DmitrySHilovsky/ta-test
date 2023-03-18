import { Component } from '@Core/component';
import { forEachSeries } from 'p-iteration';
import faker from 'faker';

export class Form extends Component {
    private LOCATORS = {
        input: (attributeName: string) => this.locator.locator(`//input[@name="${attributeName}"]`),
        selectState: this.locator.locator('//select[@name="state"]'),
        selectCountry: this.locator.locator('//select[@name="country"]'),
        loadingOverlay: this.page.locator('//div[contains(@class,"deliveryStep__loadingOverlay")]'),
    };

    private ShippingAddressData = [
        { locator: 'firstName', value: faker.name.firstName() },
        { locator: 'lastName', value: faker.name.lastName() },
        { locator: 'email', value: faker.internet.email() },
        { locator: 'phone', value: faker.phone.phoneNumber() },
        { locator: 'address', value: faker.address.streetAddress() },
        { locator: 'city', value: faker.address.city() },
        { locator: 'postal', value: '35242' },
    ];

    public async fillForm(): Promise<void> {
        await this.LOCATORS.loadingOverlay.waitFor();
        await this.LOCATORS.loadingOverlay.waitFor({ state: 'detached' });

        await forEachSeries(this.ShippingAddressData, async (element) => {
            await this.LOCATORS.input(element.locator).fill(element.value);
        });
        await this.LOCATORS.selectState.selectOption({ value: 'Alabama' });
    }
}
