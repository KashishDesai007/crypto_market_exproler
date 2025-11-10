import React, { createContext, useContext, useState } from 'react';

export type SortKey = 'market_cap_desc' | 'market_cap_asc' | 'price_desc' | 'price_asc' | 'name_asc';

export interface Filters {
  minPrice?: number;
  maxPrice?: number;
  minRank?: number;
  maxRank?: number;
}

interface QueryFiltersContextType {
  // Search query
  query: string;
  setQuery: (query: string) => void;
  
  // Sort state
  sort: SortKey;
  setSort: (sort: SortKey) => void;
  
  // Filter state
  filters: Filters;
  setFilters: (filters: Filters) => void;
  
  // Helpers
  clearAll: () => void;
  clearFilters: () => void;
}

const QueryFiltersContext = createContext<QueryFiltersContextType>({
  query: '',
  setQuery: () => {},
  sort: 'market_cap_desc',
  setSort: () => {},
  filters: {},
  setFilters: () => {},
  clearAll: () => {},
  clearFilters: () => {},
});

export const QueryFiltersProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  // Unified state for search, sort, and filters
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<SortKey>('market_cap_desc');
  const [filters, setFilters] = useState<Filters>({});

  const clearFilters = () => {
    setFilters({});
    setSort('market_cap_desc');
  };

  const clearAll = () => {
    setQuery('');
    clearFilters();
  };

  return (
    <QueryFiltersContext.Provider
      value={{
        query,
        setQuery,
        sort,
        setSort,
        filters,
        setFilters,
        clearAll,
        clearFilters,
      }}
    >
      {children}
    </QueryFiltersContext.Provider>
  );
};

export function useQueryFilters() {
  return useContext(QueryFiltersContext);
}

export default QueryFiltersProvider;