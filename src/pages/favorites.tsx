import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Empty } from 'antd';
import { Button } from '@/components/Button';
import { useFavorites } from '@/context/FavoritesContext';
import { useQuery } from '@tanstack/react-query';
import { fetchCoins } from '@/services/coingeckoApi';
import { CoinCard } from '@/components/CoinCard';
import { useCoins } from 'src/queryModules/coingecko/queries';
import { useTheme } from 'src/providers/ThemeProvider';
import { ArrowLeftOutlined } from '@ant-design/icons';

export default function FavoritesPage() {
  const { favorites, clearFavorites, selectFavorite, deselectFavorite, selectAllFavorites, deselectAllFavorites, removeSelectedFavorites } = useFavorites();
  const { data } = useCoins({
    ...(favorites.ids.length > 0 && { ids: favorites.ids })
  });
  const {theme} = useTheme()
  const isDark = theme === 'dark';
  const hasSelected = favorites.selectedIds.length > 0;
  const allSelected = data && data.length > 0 && favorites.selectedIds.length === data.length;

  return (
    <>
      <Head>
        <title>Favorites – Crypto Market Explorer</title>
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div className='flex gap-2 items-center'>
           <Link href="/" className="text-blue hover:text-blue-400 transition-colors">
              <ArrowLeftOutlined />
            </Link>
          <h1 className="text-2xl font-semibold">Favorites</h1>
          </div>
          <div className="flex gap-3 items-center">
            {hasSelected && (
              <Button
                variant="destructive"
                customSize="sm"
                onClick={removeSelectedFavorites}
              >
                Remove Selected ({favorites.selectedIds.length})
              </Button>
            )}
            <Button
              variant="destructive"
              customSize="sm"
              disabled={!favorites.ids.length}
              onClick={clearFavorites}
            >
              Clear All
            </Button>
          </div>
        </div>

        {data && data.length > 0 && (
          <div className="flex items-center gap-3 mb-4 p-3 dark:bg-gray-800 rounded-lg">
            <input
              type="checkbox"
              checked={allSelected}
              onChange={() => allSelected ? deselectAllFavorites() : selectAllFavorites(data.map(coin => coin.id))}
              className="w-4 h-4 rounded border-gray-300"
            />
            <span className={`${isDark ? 'text-gray-200' : 'text-gray-600'} text-sm font-medium`}>
              {allSelected ? 'Deselect All' : 'Select All'}
            </span>
            {hasSelected && (
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                ({favorites.selectedIds.length} selected)
              </span>
            )}
          </div>
        )}

        {!data?.length ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Empty description="No favorites yet" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {data.map((coin: any) => (
              <CoinCard 
                key={coin.id} 
                coin={coin} 
                showCheckbox={true}
                isSelected={favorites.selectedIds.includes(coin.id)}
                onSelect={(id) => {
                  if (favorites.selectedIds.includes(id)) {
                    deselectFavorite(id);
                  } else {
                    selectFavorite(id);
                  }
                }}
              />
            ))}
          </div>
        )}
      </main>
    </>
  );
}


