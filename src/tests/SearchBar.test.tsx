import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import {SearchBar} from '../components/SearchBar';
import { SearchProvider } from '../providers/SearchProvider';

describe('SearchBar', () => {
  it('updates search query on input change', () => {
    const { getByPlaceholderText } = render(
      <SearchProvider>
        <SearchBar onSearch={jest.fn()}/>
      </SearchProvider>
    );

    const searchInput = getByPlaceholderText('Search by name or symbol...');
    fireEvent.change(searchInput, { target: { value: 'bitcoin' } });

    expect(searchInput).toHaveValue('bitcoin');
  });
});