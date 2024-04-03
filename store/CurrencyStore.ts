import { makeAutoObservable } from 'mobx';
import { getRates, mainCurrency, isObjectEmpty } from '../utils';
import { ParticularCurrencyRates } from '../models/CurrencyRates';

class CurrencyStore {
    currencies: ParticularCurrencyRates;
    isLoading: boolean;
    searchTerm: string;
    error: string | null;

    constructor() {
        makeAutoObservable(this);
        this.currencies = {};
        this.isLoading = false;
        this.searchTerm = '';
        this.error = null;
    }

    setSearchTerm(term: string): void {
        this.searchTerm = term;
    }
    setCurrencies(currencies: ParticularCurrencyRates): void {
        this.currencies = currencies;
    }
    setIsLoading(isLoading: boolean): void {
        this.isLoading = isLoading;
    }

    async fetchCurrencies(): Promise<void> {
        if (isObjectEmpty(this.currencies) && !this.isLoading) {
            this.isLoading = true;
            this.error = null;
            try {
                const response = await getRates();
                this.setCurrencies(response.data[mainCurrency]);
            } catch (e) {
                this.error = e instanceof Error ? e.message : 'An unexpected error occurred';
            } finally {
                this.setIsLoading(false);
            }
        }
    }

    get filteredCurrencies(): ParticularCurrencyRates {
        const lowerCaseTerm = this.searchTerm.toLowerCase();
        return Object.entries(this.currencies)
            .reduce((acc, [key, value]) =>
                    key.includes(lowerCaseTerm)
                        ? ({ ...acc, [key]: value })
                        : acc,
                {});
    }

}

export const currencyStore = new CurrencyStore();
