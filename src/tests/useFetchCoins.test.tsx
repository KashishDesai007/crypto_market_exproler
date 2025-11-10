import React from 'react';
import { renderHook, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useFetchCoins } from '@/hooks/useFetchCoins';

const createWrapper = () => {
  const queryClient = new QueryClient();
  return ({ children }: any) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

describe('useFetchCoins', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve([
        { id: 'bitcoin', symbol: 'btc', name: 'Bitcoin', image: '', current_price: 1, market_cap: 1, market_cap_rank: 1, price_change_percentage_24h: 0, total_volume: 0, circulating_supply: 0, total_supply: 0, high_24h: 0, low_24h: 0, last_updated: '' }
      ])
    }) as any;
  });

  it('fetches first page of coins', async () => {
    const { result } = renderHook(() => useFetchCoins({ sortBy: 'market_cap', order: 'desc' }), { wrapper: createWrapper() });
    await waitFor(() => expect(result.current.isSuccess).toBe(true));
    expect(result.current.data?.pages[0][0].id).toBe('bitcoin');
  });
});


