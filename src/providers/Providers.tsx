import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { FavoritesProvider } from '@/context/FavoritesContext';
import { ThemeProvider } from './ThemeProvider';
import { QueryFiltersProvider } from './QueryFiltersProvider';

const queryClient = new QueryClient();

export const Providers: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <QueryFiltersProvider>
          <FavoritesProvider>{children}</FavoritesProvider>
        </QueryFiltersProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default Providers;
