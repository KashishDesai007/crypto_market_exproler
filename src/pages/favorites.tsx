import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import { Empty, Checkbox } from 'antd'; // <-- import Checkbox from antd
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
  const {theme} = useTheme()
  const isDark = theme === 'dark';
  const hasSelected = favorites.selectedIds.length > 0;

  const { data } = useCoins({ ids: favorites.ids });
  // Filter data to only include coins whose IDs are in favorites.ids
  const filteredData = data?.filter((coin: any) => favorites.ids.includes(coin.id)) ?? [];
  const filteredSelectedIds = favorites.selectedIds.filter(id => filteredData.some((coin: any) => coin.id === id));
  const allSelected = filteredData.length > 0 && filteredSelectedIds.length === filteredData.length;
  const isIndeterminate = filteredSelectedIds.length > 0 && !allSelected;

  return (
    <>
      <Head>
        <title>Favorites – Crypto Market Explorer</title>
      </Head>
      <main className="max-w-7xl mx-auto px-4 py-6 flex-1">
        <div className="flex items-center justify-between mb-6">
          <div className='flex gap-2 items-center'>
           <Link href="/" className="text-blue hover:text-blue-400 transition-colors">
              <ArrowLeftOutlined className={  isDark ? 'text-gray-300 hover:text-gray-100' : 'text-gray-700 hover:text-gray-900'}/>
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
          </div>
        </div>

        {data && data.length > 0 && (
          <div className="flex items-center gap-3 mb-4 p-3 dark:bg-gray-800 rounded-lg">
            <Checkbox
              checked={allSelected}
              indeterminate={isIndeterminate}
              onChange={() => {
                if (allSelected) {
                  deselectAllFavorites(filteredData.map((coin: any) => coin.id));
                } else {
                  selectAllFavorites(filteredData.map((coin: any) => coin.id));
                }
              }}
            />
            <span className={`${isDark ? 'text-gray-200' : 'text-gray-600'} text-sm font-medium`}>
              {allSelected ? 'Deselect All' : 'Select All'}
            </span>
            {hasSelected && (
              <span className={isDark ? 'text-gray-400' : 'text-gray-600'}>
                ({filteredSelectedIds.length} selected)
              </span>
            )}
          </div>
        )}

        {!filteredData.length ? (
          <div className="flex items-center justify-center h-[50vh]">
            <Empty description="No favorites yet" />
          </div>
        ) : (
          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-4">
            {filteredData.map((coin: any) => (
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