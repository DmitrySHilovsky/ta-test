import { Locator } from '@playwright/test';

export const dollarsToNumber = async (locator: Locator): Promise<number> => {
    const priceString = (await locator.innerText()).trim();
    const numberString = priceString.replace(/\D/g, '');
    return parseInt(numberString);
};
