export default class CurrencyFormat {
    private readonly _currency: string;
    private readonly _locales: string;

    constructor(currency: string, locales: string) {
        this._currency = currency;
        this._locales = locales;
    }

    public formatCurrency (price: number){
        const formatter = new Intl.NumberFormat(this._locales, {
            style: 'currency',
            currency: this._currency,
        });

        return formatter.format(price);
    }

}