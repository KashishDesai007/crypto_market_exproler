import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import FilterModal from '../components/FilterModal';
import { FilterProvider } from '../providers/FilterProvider';
import { QueryFiltersProvider } from '../providers/QueryFiltersProvider';

describe('FilterModal', () => {
  it('renders correctly and handles form input', async () => {
    const onApplyFilters = jest.fn();
    const { getByLabelText } = render(
      <QueryFiltersProvider>
        <FilterProvider>
          <FilterModal
            isOpen={true}
            onClose={jest.fn()}
            onApplyFilters={onApplyFilters}
          />
        </FilterProvider>
      </QueryFiltersProvider>
    );

    const minPriceInput = getByLabelText('Min Price');
    const maxPriceInput = getByLabelText('Max Price');

    fireEvent.change(minPriceInput, { target: { value: '100' } });
    fireEvent.change(maxPriceInput, { target: { value: '1000' } });

    await waitFor(() => {
      expect(onApplyFilters).toHaveBeenCalledWith({ minPrice: 100, maxPrice: 1000, minRank: 1, maxRank: 200 });
    });
  });
});