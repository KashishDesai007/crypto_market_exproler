import React, { useState } from 'react';
import { Popover } from 'antd';
import { SortAscendingOutlined } from '@ant-design/icons';
import { Button } from './Button';
import { useTheme } from '../providers/ThemeProvider';

type SortKey = 'market_cap_desc' | 'market_cap_asc' | 'price_desc' | 'price_asc' | 'name_asc';

const sortOptions = [
  { label: 'Market Cap (High to Low)', value: 'market_cap_desc' },
  { label: 'Market Cap (Low to High)', value: 'market_cap_asc' },
  { label: 'Price (High to Low)', value: 'price_desc' },
  { label: 'Price (Low to High)', value: 'price_asc' },
  { label: 'Name (A–Z)', value: 'name_asc' }
] as const;

type Props = {
  value: SortKey;
  onChange: (value: SortKey) => void;
};

export const SortDropdown: React.FC<Props> = ({ value, onChange }) => {
  const [open, setOpen] = useState(false);
  const { theme } = useTheme();
  const isDark = theme === 'dark';

  const currentOption = sortOptions.find(opt => opt.value === value);

  const content = (
    <div className={`w-56 p-1 rounded-lg ${isDark ? 'bg-[#1a1a1a]' : 'bg-white'}`}>
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => {
            onChange(option.value);
            setOpen(false);
          }}
          className={`w-full text-left px-3 py-2 rounded-md transition-colors ${
            option.value === value
              ? (isDark ? 'bg-blue-500/20 text-blue-400' : 'bg-blue-50 text-blue-600')
              : 'hover:bg-gray-100 dark:hover:bg-gray-800'
          }`}
        >
          {option.label}
        </button>
      ))}
    </div>
  );

  return (
    <Popover
      content={content}
      trigger="click"
      open={open}
      onOpenChange={setOpen}
      placement="bottom"
      overlayClassName={isDark ? 'dark-theme' : ''}
    >
      <Button
        variant="ghost"
        customSize="sm"
        icon={<SortAscendingOutlined />}
        className="!text-current"
      >
        {currentOption?.label ?? 'Sort by'}
      </Button>
    </Popover>
  );
};


