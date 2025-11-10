import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Card, Tooltip } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';
import { motion } from 'framer-motion';
import { useFavorites } from '@/context/FavoritesContext';
import type { Coin } from '@/types/coin';
import { useTheme } from 'src/providers/ThemeProvider';

type Props = {
  coin: Coin;
  showCheckbox?: boolean;
  isSelected?: boolean;
  onSelect?: (id: string) => void;
};

export const CoinCard: React.FC<Props> = ({ coin, showCheckbox = false, isSelected = false, onSelect }) => {
  const { favorites, toggleFavorite } = useFavorites();
  const isFav = favorites.ids.includes(coin.id);
const { theme } = useTheme();
  const isDark = theme === 'dark';
  return (
    <motion.div whileHover={{ scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
      <Card className="glass rounded-2xl border-0 overflow-hidden">
        <div className="flex items-center gap-3">
          {showCheckbox && (
            <input
              type="checkbox"
              checked={isSelected}
              onChange={() => onSelect?.(coin.id)}
              className="w-4 h-4 rounded border-gray-300"
            />
          )}
          <Image src={coin.image} alt={coin.name} width={36} height={36} className="rounded-full" />
          <div className="flex-1">
            <Link href={`/coin/${coin.id}`} className="font-semibold hover:underline">
              {coin.name} <span className="text-gray-400 text-sm">{coin.symbol.toUpperCase()}</span>
            </Link>
            <div className={`text-sm ${ isDark ?"text-gray-300":"text-gray-700"}`}>MCap: ${coin.market_cap.toLocaleString()}</div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold">${coin.current_price.toLocaleString()}</div>
            <div className={
              (coin.price_change_percentage_24h ?? 0) >= 0 ? 'text-emerald' : 'text-red-400'
            }>
              {(coin.price_change_percentage_24h ?? 0).toFixed(2)}%
            </div>
          </div>
          <Tooltip title={isFav ? 'Remove Favorite' : 'Add Favorite'}>
            <button aria-label="toggle-favorite" onClick={() => toggleFavorite(coin.id)} className="ml-2">
              {isFav ? <StarFilled style={{ color: '#FACC15', fontSize: 20 }} data-testid="star-filled" /> : <StarOutlined style={{ fontSize: 20 }} data-testid="star-outlined" />}
            </button>
          </Tooltip>
        </div>
      </Card>
    </motion.div>
  );
};


