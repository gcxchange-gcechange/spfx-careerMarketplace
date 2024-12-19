import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Complete from './Complete';

jest.mock('../assets/complete.png', () => 'mockCompleteImage.png');

describe('Complete Component', () => {
  test('renders the Complete component with all elements', () => {
    render(<Complete />);

    // Check if the heading is rendered
    const heading = screen.getByRole('heading', { name: /complete/i });
    expect(heading).toBeInTheDocument();

    // Check if the image is rendered with correct attributes
    const image = screen.getByAltText(/people high five/i);
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute('src', 'mockCompleteImage.png');
    expect(image).toHaveAttribute('width', '400');

    // Check if the congratulatory message is rendered
    const congratulatoryText = screen.getByText(/congratulations! you have created a new opportunity/i);
    expect(congratulatoryText).toBeInTheDocument();

    // Check if the lorem ipsum paragraph is rendered
    const loremText = screen.getByText(/lorem ipsum dolor sit amet, consectetur adipiscing elit/i);
    expect(loremText).toBeInTheDocument();
  });
});
