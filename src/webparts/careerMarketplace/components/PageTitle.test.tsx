import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import PageTitle from './PageTitle';

describe('PageTitle Component', () => {
  test('renders "Poster Information" when currentPage is 0', () => {
    render(<PageTitle currentPage={0} />);
    const title = screen.getByRole('heading', { name: /poster information/i });
    expect(title).toBeInTheDocument();
  });

  test('renders "Opportunity Details" when currentPage is 1', () => {
    render(<PageTitle currentPage={1} />);
    const title = screen.getByRole('heading', { name: /opportunity details/i });
    expect(title).toBeInTheDocument();
  });

  test('renders "Opportunity Requirements" when currentPage is 2', () => {
    render(<PageTitle currentPage={2} />);
    const title = screen.getByRole('heading', { name: /opportunity requirements/i });
    expect(title).toBeInTheDocument();
  });

  test('renders "Review and submit" when currentPage is 3', () => {
    render(<PageTitle currentPage={3} />);
    const title = screen.getByRole('heading', { name: /review and submit/i });
    expect(title).toBeInTheDocument();
  });

  test('renders nothing when currentPage is an invalid value', () => {
    render(<PageTitle currentPage={999} />);
    const heading = screen.queryByRole('heading');
    expect(heading).not.toBeInTheDocument();
  });
});
