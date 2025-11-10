import React, { useMemo } from 'react';
import { useQueryFilters } from 'src/providers/QueryFiltersProvider';
import Head from 'next/head';
import { useInfiniteCoins } from 'src/queryModules/coingecko/queries';
import { CoinList } from '@/components/CoinList';

export default function HomePage() {
  const { query, sort, filters } = useQueryFilters();

  const params = useMemo(() => {
  let q: string | undefined = undefined;
  let min_price = filters.minPrice;
  let max_price = filters.maxPrice;
  let numericParsed = false

    const raw = query.trim();
    if (raw.length) {
      const lower = raw.toLowerCase();

      if (lower.startsWith('name:')) {
        q = raw.slice(5).trim();
      } else if (lower.startsWith('symbol:') || lower.startsWith('code:')) {
        q = raw.split(':')[1].trim();
      } else {
        const rangeMatch = raw.match(/^\s*(\d+(?:\.\d+)?)\s*-\s*(\d+(?:\.\d+)?)\s*$/);
        const leMatch = raw.match(/^\s*(?:<=|<)\s*(\d+(?:\.\d+)?)\s*$/);
        const geMatch = raw.match(/^\s*(?:>=|>)\s*(\d+(?:\.\d+)?)\s*$/);
        const numMatch = raw.match(/^\s*(\d+(?:\.\d+)?)\s*$/);

        if (rangeMatch) {
          min_price = Number(rangeMatch[1]);
          max_price = Number(rangeMatch[2]);
          numericParsed = true;
        } else if (leMatch) {
          max_price = Number(leMatch[1]);
          numericParsed = true;
        } else if (geMatch) {
          min_price = Number(geMatch[1]);
          numericParsed = true;
        } else if (numMatch) {
          max_price = Number(numMatch[1]);
          numericParsed = true;
        } else {
          q = raw;
        }
      }
    }

    const queryParam = q ?? (numericParsed ? undefined : query);

    return {
      query: queryParam,
      order: sort,
      min_price: min_price ?? filters.minPrice,
      max_price: max_price ?? filters.maxPrice,
      min_rank: filters.minRank,
      max_rank: filters.maxRank
    };
  }, [query, sort, filters]);

  const { data, isLoading, isError, hasNextPage, fetchNextPage } = useInfiniteCoins({
    ...params,
    per_page: 20
  });

  return (
    <>
      <Head>
        <title>Crypto Market Explorer – Web3 Dashboard</title>
        <meta name="description" content="Explore live cryptocurrency market data with search, filters, and favorites." />
      </Head>

      <main className="max-w-7xl mx-auto px-4 py-6 flex-1">
        <CoinList
          pages={data?.pages as any}
          isLoading={isLoading}
          isError={isError}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
        />
      </main>
    </>
  );
}


