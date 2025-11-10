import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { CoinCard } from '@/components/CoinCard';
import { FavoritesProvider } from '@/context/FavoritesContext';

import { Coin } from '@/types/coin';

const coin: Coin = {
  id: 'bitcoin',
  symbol: 'btc',
  name: 'Bitcoin',
  image: 'https://assets.coingecko.com/coins/images/1/large/bitcoin.png',
  current_price: 60000,
  market_cap: 1000000,
  market_cap_rank: 1,
  price_change_percentage_24h: 2,
  total_volume: 0,
  circulating_supply: 0,
  total_supply: 0,
  high_24h: 0,
  low_24h: 0,
  last_updated: ''
};

describe('CoinCard', () => {
  it('toggles favorite', () => {
    const { getByLabelText, getByTestId } = render(
      <FavoritesProvider>
        <CoinCard coin={coin} />
      </FavoritesProvider>
    );
    const btn = getByLabelText('toggle-favorite');
    expect(getByTestId('star-outlined')).toBeTruthy();
    fireEvent.click(btn);
    expect(getByTestId('star-filled')).toBeTruthy();
    fireEvent.click(btn);
    expect(getByTestId('star-outlined')).toBeTruthy();
  });
});


