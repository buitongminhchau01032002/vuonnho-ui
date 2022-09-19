export default function PriceFomater({ children }) {
    const priceString = children + '';
    let priceFomated = '';
    for (let i = 0; i < priceString.length; i++) {
        let backIndex = priceString.length - i;
        if (backIndex % 3 === 0 && i !== 0) {
            priceFomated += '\u00A0';
        }
        priceFomated += priceString[i];
    }
    priceFomated += '\u00A0₫';
    return <>{priceFomated}</>;
}
