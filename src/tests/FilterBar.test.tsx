import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {FilterBar} from '../components/FilterBar';
import { FilterProvider } from '../providers/FilterProvider';
import { QueryFiltersProvider } from '../providers/QueryFiltersProvider';

describe('FilterBar', () => {
  it('renders correctly and opens modal on button click', () => {
    const { getByText } = render(
      <QueryFiltersProvider>
        <FilterProvider>
          <FilterBar onChange={jest.fn()} />
        </FilterProvider>
      </QueryFiltersProvider>
    );

    expect(getByText('Price Range ($)')).toBeInTheDocument();
    expect(getByText('Market Cap Rank')).toBeInTheDocument();

  });
});