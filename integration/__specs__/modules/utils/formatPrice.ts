export function formatPrice(price: number) {
    const dollars = (price / 100).toFixed(2);
    const priceString = `$${dollars}`;
    return priceString;
}
