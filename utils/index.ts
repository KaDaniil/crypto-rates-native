import axios, { AxiosResponse } from 'axios';
import { CurrencyRatesResponse } from '../models/CurrencyRates';

export const mainCurrency = 'usd';

export const getRates = (): Promise<AxiosResponse<CurrencyRatesResponse>> => {
    return axios.get('https://app.youhodler.com/api/v3/rates/extended');
};

export const isObjectEmpty = (obj: object): boolean => Object.keys(obj).length === 0;

