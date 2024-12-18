import React from 'react';
import { render, screen } from '@testing-library/react';
import Complete from '../Complete'; // Assuming the component file is named Complete.tsx

describe('Complete Component', () => {
  test('renders the component with the expected elements', () => {
    render(<Complete />);

    // Check if the main heading is rendered
    expect(screen.getByRole('heading', { level: 2, name: /Complete/i })).toBeInTheDocument();

    // Check if the image is rendered with the correct alt text
    expect(screen.getByRole('img', { name: /people high five/i })).toHaveAttribute('src', expect.stringContaining('complete.png'));

    // Check if the congratulatory message is rendered
    expect(screen.getByText(/Congratualtions! You have created a new opportunity/i)).toBeInTheDocument();

    // Check if the Lorem ipsum paragraph is rendered
    expect(screen.getByText(/Lorem ipsum dolor sit amet/i)).toBeInTheDocument();
  });
});