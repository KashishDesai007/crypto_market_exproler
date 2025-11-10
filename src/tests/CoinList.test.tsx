import React from 'react';
import { render } from '@testing-library/react';
import { CoinList } from '@/components/CoinList';
import { Coin } from '@/types/coin';

// Mock child components to isolate CoinList
jest.mock('@/components/CoinCard', () => ({
  CoinCard: (props: { coin: Coin }) => <div>{props.coin.name}</div>,
}));
jest.mock('@/components/CoinTable', () => () => <div>CoinTable</div>);
jest.mock('@/components/ViewToggle', () => () => <div>ViewToggle</div>);
jest.mock('@/hooks/useIntersectionObserver', () => ({
  useIntersectionObserver: () => [null, false],
}));


describe('CoinList', () => {
  it('renders a list of coins', () => {
    const coins: Coin[] = [
      { id: 'bitcoin', name: 'Bitcoin', symbol: 'btc', image: '', current_price: 0, price_change_percentage_24h: 0, market_cap: 0, total_volume: 0, market_cap_rank: 1, circulating_supply: 0, total_supply: 0, high_24h: 0, low_24h: 0, last_updated: '' },
      { id: 'ethereum', name: 'Ethereum', symbol: 'eth', image: '', current_price: 0, price_change_percentage_24h: 0, market_cap: 0, total_volume: 0, market_cap_rank: 2, circulating_supply: 0, total_supply: 0, high_24h: 0, low_24h: 0,last_updated: '' },
    ];
    const { getByText } = render(<CoinList pages={[coins] as any} isLoading={false} isError={false} />);
    expect(getByText('Bitcoin')).toBeTruthy();
    expect(getByText('Ethereum')).toBeTruthy();
  });
});