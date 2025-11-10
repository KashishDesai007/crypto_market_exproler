import React, { createContext, useContext, useState } from 'react';

export type SortKey = 'market_cap_desc' | 'market_cap_asc' | 'price_desc' | 'price_asc' | 'name_asc';

export interface Filters {
  minPrice?: number;
  maxPrice?: number;
  minRank?: number;
  maxRank?: number;
}

interface FilterContextType {
  // Sort state
  sort: SortKey;
  setSort: (sort: SortKey) => void;
  
  // Filter state
  filters: Filters;
  setFilters: (filters: Filters) => void;
  
  // Helpers
  clearFilters: () => void;
}

const FilterContext = createContext<FilterContextType>({
  sort: 'market_cap_desc',
  setSort: () => {},
  filters: {},
  setFilters: () => {},
  clearFilters: () => {},
});

export const FilterProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [sort, setSort] = useState<SortKey>('market_cap_desc');
  const [filters, setFilters] = useState<Filters>({});

  const clearFilters = () => {
    setFilters({});
    setSort('market_cap_desc');
  };

  return (
    <FilterContext.Provider
      value={{
        sort,
        setSort,
        filters,
        setFilters,
        clearFilters,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};

export function useFilter() {
  return useContext(FilterContext);
}

export default FilterProvider;