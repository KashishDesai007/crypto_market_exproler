import React from 'react';
import { render } from '@testing-library/react';
import Chart from '../components/Chart';

jest.mock('react-chartjs-2', () => ({
  Line: () => <div>Chart</div>,
}));

describe('Chart', () => {
  it('renders correctly', () => {
    const { getByText } = render(<Chart data={[]} />);
    expect(getByText('No data available')).toBeInTheDocument();
  });
});