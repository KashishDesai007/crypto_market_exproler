import BaseService from "./BaseService";
import { FetchCoinsParams, Coin, CoinDetail } from "@/types/coin";
import { MarketChartData } from "../queryModules/coingecko/types";

export const fetchCoins = async (params: FetchCoinsParams = {}) => {
  try {
    const {
      page = 1,
      per_page = 20,
      vs_currency = 'usd',
      order = 'market_cap_desc',
      query,
      min_price,
      max_price,
      min_rank,
      max_rank
    } = params;

    const queryParams = {
      vs_currency,
      order,
      per_page: String(per_page),
      page: String(page),
      sparkline: 'false'
    };

    const response = await BaseService.get<Coin[]>('/coins/markets', { params: queryParams });
    let data = response.data;

    if (query) {
      const q = query.toLowerCase();
      data = data.filter((c) => 
        c.name.toLowerCase().includes(q) || 
        c.symbol.toLowerCase().includes(q)
      );
    }
    if (min_price != null) data = data.filter((c) => c.current_price >= min_price);
    if (max_price != null) data = data.filter((c) => c.current_price <= max_price);
    if (min_rank != null) data = data.filter((c) => (c.market_cap_rank ?? Infinity) >= min_rank);
    if (max_rank != null) data = data.filter((c) => (c.market_cap_rank ?? 0) <= max_rank);

    return data;
  } catch (error) {
    throw error;
  }
};

export const fetchCoinById = async (id: string) => {
  try {
    const response = await BaseService.get<CoinDetail>(`/coins/${id}`, {
      params: {
        localization: false,
        tickers: false,
        market_data: true,
        community_data: false,
        developer_data: false,
        sparkline: true
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const fetchCoinMarketChart = async (id: string, days: number = 7): Promise<MarketChartData> => {
  try {
    const response = await BaseService.get<MarketChartData>(`/coins/${id}/market_chart`, {
      params: {
        vs_currency: 'usd',
        days: String(days),
        interval: days <= 1 ? 'minute' : 'daily'
      }
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export default {
  fetchCoins,
  fetchCoinById,
  fetchCoinMarketChart,
};
