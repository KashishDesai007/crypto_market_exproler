import React, { createContext, useContext, useState } from 'react';

const SearchContext = createContext({ query: '', setQuery: (q: string) => {} });

export const SearchProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [query, setQuery] = useState('');
  return <SearchContext.Provider value={{ query, setQuery }}>{children}</SearchContext.Provider>;
};

export function useSearch() {
  return useContext(SearchContext);
}

export default SearchProvider;
