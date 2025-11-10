export interface Coin {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  market_cap: number;
  market_cap_rank: number;
  price_change_percentage_24h: number | null;
  total_volume: number;
  circulating_supply: number | null;
  total_supply: number | null;
  high_24h: number | null;
  low_24h: number | null;
  last_updated: string;
}

export interface CoinDetail extends Coin {
  description?: { en?: string };
  market_data?: {
    market_cap?: { [currency: string]: number };
    circulating_supply?: number;
    total_supply?: number | null;
    high_24h?: { [currency: string]: number };
    low_24h?: { [currency: string]: number };
    price_change_percentage_24h?: number | null;
  };
}

export interface FetchCoinsParams {
  page?: number;
  per_page?: number;
  vs_currency?: 'usd';
  order?: 'market_cap_desc' | 'market_cap_asc' | 'name_asc' | 'name_desc' | 'price_asc' | 'price_desc';
  query?: string;
  min_price?: number;
  max_price?: number;
  min_rank?: number;
  max_rank?: number;
  ids?: string[]; // For filtering by specific coin IDs (used in favorites)
}


