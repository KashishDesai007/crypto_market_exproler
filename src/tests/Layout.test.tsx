import React from 'react';
import { render } from '@testing-library/react';
import Layout from '../components/Layout';

jest.mock('../components/Header', () => () => <div>Header</div>);

describe('Layout', () => {
  it('renders correctly with children', () => {
    const { getByText } = render(
      <Layout>
        <div>Child content</div>
      </Layout>
    );

    expect(getByText('Header')).toBeInTheDocument();
    expect(getByText('Child content')).toBeInTheDocument();
  });
});