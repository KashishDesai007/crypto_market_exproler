import React from 'react';
import { Table } from 'antd';
import type { TableProps } from 'antd';
import { Coin } from '@/types/coin';
import Image from 'next/image';
import { useFavorites } from '@/context/FavoritesContext';
import { Star, TrendingUp, TrendingDown } from 'lucide-react';
import { useTheme } from 'src/providers/ThemeProvider';

interface CoinTableProps {
  data: Coin[];
  loading?: boolean;
  /** visible height for the scrollable tbody (px) */
  height?: number;
}

const CoinTable: React.FC<CoinTableProps> = ({ data, loading, height }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  // Normalize favorite ids to a string[] to satisfy TS checks
  const favoriteIds: string[] = (favorites as { ids?: string[] } | undefined)?.ids ?? [];

  const columns: TableProps<Coin>['columns'] = [
    {
      title: 'Favorite',
      dataIndex: 'id',
      key: 'favorite',
      width: 100,
      render: (_: any, record: Coin) => (
        <button
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            toggleFavorite(record.id);
          }}
          className="p-2 hover:bg-blue-50 dark:hover:bg-gray-800 rounded-full transition-all duration-200 hover:scale-110"
        >
          <Star size={18} className={favoriteIds.includes(record.id) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-400 hover:text-yellow-400'} />
        </button>
      ),
    },
    {
      title: 'Coin',
      dataIndex: 'name',
      key: 'name',
      render: (_: any, coin: Coin) => (
        <div className="flex items-center gap-4">
          <div className="relative w-10 h-10 flex-shrink-0">
            <Image src={coin.image} alt={coin.name} fill className="rounded-full object-contain shadow-sm " />
          </div>
          <div className="min-w-0">
            <div className={isDark ? 'text-white' : 'text-gray-900'}>{coin.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400 uppercase font-medium">{coin.symbol}</div>
          </div>
        </div>
      ),
    },
    {
      title: 'Price',
      dataIndex: 'current_price',
      key: 'price',
      sorter: (a: Coin, b: Coin) => (a.current_price ?? 0) - (b.current_price ?? 0),
      render: (price: number) => (
        <div className={isDark ? 'text-white' : 'text-gray-900'}>
          ${price.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
      ),
    },
    {
      title: '24h Change',
      dataIndex: 'price_change_percentage_24h',
      key: 'change',
      sorter: (a: Coin, b: Coin) => ((a.price_change_percentage_24h ?? 0) - (b.price_change_percentage_24h ?? 0)),
      render: (change: number | null) => {
        if (change == null) return <div className="text-gray-400">N/A</div>;
        const isPositive = change > 0;
        const isNegative = change < 0;
        
        return (
          <div className={`flex items-center gap-1 font-semibold ${
            isPositive 
              ? 'text-green-600 dark:text-green-400' 
              : isNegative 
                ? 'text-red-600 dark:text-red-400' 
                : 'text-gray-600 dark:text-gray-400'
          }`}>
            {isPositive && <TrendingUp size={16} className="text-green-500" />}
            {isNegative && <TrendingDown size={16} className="text-red-500" />}
            <span className={isPositive ? 'bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent' : ''}>
              {change > 0 ? '+' : ''}{change.toFixed(2)}%
            </span>
          </div>
        );
      },
    },
    {
      title: 'Market Cap',
      dataIndex: 'market_cap',
      key: 'marketCap',
      sorter: (a: Coin, b: Coin) => (a.market_cap ?? 0) - (b.market_cap ?? 0),
      render: (marketCap: number) => (
        <div className={isDark ? 'text-white' : 'text-gray-900'}>
          ${marketCap.toLocaleString()}
        </div>
      ),
    },
    {
      title: 'Volume (24h)',
      dataIndex: 'total_volume',
      key: 'volume',
      sorter: (a: Coin, b: Coin) => (a.total_volume ?? 0) - (b.total_volume ?? 0),
      render: (volume: number) => (
        <div className={isDark ? 'text-white' : 'text-gray-900'}>
          ${volume.toLocaleString()}
        </div>
      ),
    },
  ];

  return (
    <div className={`w-full rounded-2xl overflow-hidden ${
      isDark 
        ? 'glass' 
        : 'crypto-table-enhanced border border-blue-700 shadow-lg shadow-blue-500/20 border-[2px] '
    }`}>
        <Table<Coin>
          columns={columns}
          dataSource={data}
          loading={loading}
          rowKey="id"
          pagination={false}
          onRow={(record, rowIndex) => ({
            onClick: () => {
              window.location.href = `/coin/${record.id}`;
            },
            className: `
              cursor-pointer transition-all duration-300 ease-in-out
              hover:bg-blue-50/80 hover:shadow-md
              dark:hover:bg-gray-800/60 dark:hover:shadow-lg
              border-b border-gray-100 dark:border-gray-700/50
              group
            `,
          })}
          scroll={{ y: height ?? 480 }}
          sticky={{ offsetHeader: 0 } as any}
          style={{ width: '100%' }}
 className="crypto-table-enhanced"
        />
    </div>
  );
};

export default CoinTable;