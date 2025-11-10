import type { AxiosResponse } from 'axios';
import { Coin, CoinDetail } from '@/types/coin';

export interface CoinGeckoResponse<T> extends AxiosResponse<T> {
  data: T;
}

export interface MarketChartData {
  prices: [number, number][];
  market_caps: [number, number][];
  total_volumes: [number, number][];
}

export type CoinsResponse = CoinGeckoResponse<Coin[]>;
export type CoinDetailResponse = CoinGeckoResponse<CoinDetail>;
export type MarketChartResponse = CoinGeckoResponse<MarketChartData>;