import { useInfiniteQuery } from '@tanstack/react-query';
import { coingeckoApi } from '@/services/coingeckoApi';
import type { Coin } from '@/types/coin';

const fetchCoins = async ({ pageParam = 1, queryKey }: any): Promise<Coin[]> => {
  const [, { sortBy, order, minPrice, maxPrice, minMarketCap, maxMarketCap }] = queryKey;
  const response = await coingeckoApi.get('/coins/markets', {
    params: {
      vs_currency: 'usd',
      order: `${sortBy}_${order}`,
      per_page: 50,
      page: pageParam,
      price_change_percentage: '24h',
      sparkline: false,
    },
  });

  let filteredData = response.data;

  if (minPrice !== undefined && maxPrice !== undefined) {
    filteredData = filteredData.filter(
      (coin: Coin) => coin.current_price >= minPrice && coin.current_price <= maxPrice
    );
  }

  if (minMarketCap !== undefined && maxMarketCap !== undefined) {
    filteredData = filteredData.filter(
      (coin: Coin) => coin.market_cap >= minMarketCap && coin.market_cap <= maxMarketCap
    );
  }

  return filteredData;
};

export const useFetchCoins = (filters: any) => {
  return useInfiniteQuery<Coin[], Error>(
    ['coins', filters], 
    fetchCoins,
    {
      getNextPageParam: (lastPage, pages) => {
        return lastPage.length > 0 ? pages.length + 1 : undefined;
      },
    }
  );
};