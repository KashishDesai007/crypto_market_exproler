import React from 'react';
import { Input } from 'antd';
import { useEffect, useState } from 'react';

type Props = {
  onSearch: (value: string) => void;
  placeholder?: string;
};

export const SearchBar: React.FC<Props> = ({ onSearch, placeholder }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const id = setTimeout(() => onSearch(value?.trim()), 300);
    return () => clearTimeout(id);
  }, [value, onSearch]);

  return (
    <Input
      allowClear
      size="middle"
      placeholder={placeholder ?? 'Search by name or symbol...'}
      value={value}
      onChange={(e) => setValue(e?.target?.value)}
      className="bg-transparent text-black"
    />
  );
};
