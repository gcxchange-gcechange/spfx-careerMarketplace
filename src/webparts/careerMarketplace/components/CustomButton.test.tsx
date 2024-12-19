import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import CustomButton, { ICustomButtonProps } from './CustomButton';

describe('CustomButton Component', () => {
  const mockOnClick = jest.fn();

  const defaultProps: ICustomButtonProps = {
    id: 'test-button',
    name: 'Click Me',
    buttonType: 'primary',
    onClick: mockOnClick,
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders a PrimaryButton when buttonType is "primary"', () => {
    render(<CustomButton {...defaultProps} />);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('ms-Button--primary'); // Fluent UI's primary button class
  });

  test('renders a DefaultButton when buttonType is "secondary"', () => {
    render(<CustomButton {...defaultProps} buttonType="secondary" />);

    const button = screen.getByRole('button', { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).not.toHaveClass('ms-Button--primary');
    expect(button).toHaveStyle({ color: '#03787c' });
  });

  test('calls onClick with the correct argument when the button is clicked', () => {
    render(<CustomButton {...defaultProps} />);

    const button = screen.getByRole('button', { name: /click me/i });
    fireEvent.click(button);

    expect(mockOnClick).toHaveBeenCalledTimes(1);
    expect(mockOnClick).toHaveBeenCalledWith(button); // Ensures the `onClick` handler receives the correct target
  });
});
