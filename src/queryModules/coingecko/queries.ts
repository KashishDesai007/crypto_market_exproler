import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { FetchCoinsParams } from "@/types/coin";
import { fetchCoins, fetchCoinById, fetchCoinMarketChart } from "@/services/coingeckoApi";

export const useCoins = (params: Omit<FetchCoinsParams, 'page' | 'per_page'> = {}) => {
  return useQuery({
    queryKey: ["coins", params],
    queryFn: () => fetchCoins({ ...params, page: 1, per_page: 20 }),
    staleTime: 30 * 1000, // 30 seconds
    refetchOnMount: true,
    refetchOnWindowFocus: true,
  });
};

export const useInfiniteCoins = (params: Omit<FetchCoinsParams, 'page'> = {}) => {
  const perPage = params.per_page ?? 20;
  
  return useInfiniteQuery({
    queryKey: ["infiniteCoins", params],
    queryFn: ({ pageParam = 1 }) => 
      fetchCoins({ ...params, page: pageParam, per_page: perPage }),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => 
      lastPage.length === perPage ? allPages.length + 1 : undefined,
    staleTime: 30 * 1000, // 30 seconds
    gcTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useCoinById = (id: string) => {
  return useQuery({
    queryKey: ["coin", id],
    queryFn: () => fetchCoinById(id),
    enabled: !!id,
    staleTime: 30 * 1000, // 30 seconds
  });
};

export const useCoinMarketChart = (id: string, days: number = 7) => {
  return useQuery({
    queryKey: ["coinMarketChart", id, days],
    queryFn: () => fetchCoinMarketChart(id, days),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export default {
  useCoins,
  useInfiniteCoins,
  useCoinById,
  useCoinMarketChart,
};