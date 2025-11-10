import React, { useEffect, useState } from 'react';
import { Slider, InputNumber } from 'antd';
import { useTheme } from 'src/providers/ThemeProvider';

type Props = {
  onChange: (filters: { minPrice?: number; maxPrice?: number; minRank?: number; maxRank?: number }) => void;
};

export const FilterBar: React.FC<Props> = ({ onChange }) => {
  const [price, setPrice] = useState<[number, number]>([0, 100000]);
  const [rank, setRank] = useState<[number, number]>([1, 200]);
const { theme } = useTheme();
  const isDark = theme === 'dark';
  useEffect(() => {
    const id = setTimeout(() => {
      onChange({ minPrice: price[0], maxPrice: price[1], minRank: rank[0], maxRank: rank[1] });
    }, 300);
    return () => clearTimeout(id);
  }, [price, rank, onChange]);

  return (
    <div className="w-full grid md:grid-cols-2 gap-4">
      <div className="glass p-4 rounded-xl">
        <div className={`flex justify-between mb-2 text-sm ${ isDark ?"text-gray-300":"text-gray-700"}`}><span>Price Range ($)</span></div>
        <Slider range min={0} max={100000} step={100} value={price} onChange={(v) => setPrice(v as [number, number])} />
        <div className="flex gap-2">
          <InputNumber aria-label="Min Price" value={price[0]} onChange={(v) => setPrice([Number(v ?? 0), price[1]])} />
          <InputNumber aria-label="Max Price" value={price[1]} onChange={(v) => setPrice([price[0], Number(v ?? 0)])} />
        </div>
      </div>
      <div className="glass p-4 rounded-xl">
        <div className={`flex justify-between mb-2 text-sm ${ isDark ?"text-gray-300":"text-gray-700"}`}><span>Market Cap Rank</span></div>
        <Slider range min={1} max={200} step={1} value={rank} onChange={(v) => setRank(v as [number, number])} />
        <div className="flex gap-2">
          <InputNumber value={rank[0]} onChange={(v) => setRank([Number(v ?? 1), rank[1]])} />
          <InputNumber value={rank[1]} onChange={(v) => setRank([rank[0], Number(v ?? 1)])} />
        </div>
      </div>
    </div>
  );
};


