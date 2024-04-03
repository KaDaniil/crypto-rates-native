export interface CoinProps {
    rate: number;
    ask: number;
    bid: number;
    diff24h: number;
}

export interface ParticularCurrencyRates extends Record<string, CoinProps> {}
export interface CurrencyRatesResponse extends Record<string, ParticularCurrencyRates> {}
