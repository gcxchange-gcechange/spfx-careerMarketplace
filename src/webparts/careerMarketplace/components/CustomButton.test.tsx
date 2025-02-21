jest.mock('@fluentui/react', () => ({
    DefaultButton: jest.fn().mockImplementation(({ text, onClick }) => (
      <button onClick={onClick}>{text}</button>
    )),
    PrimaryButton: jest.fn().mockImplementation(({ text, onClick }) => (
      <button onClick={onClick}>{text}</button>
    )),
    ThemeProvider: ({ children }: React.PropsWithChildren<{}>) => <div>{children}</div>,
  }));
  
  import React from "react";
  import { render, fireEvent } from "@testing-library/react";
  import CustomButton, { ICustomButtonProps } from "./CustomButton";
  import "@testing-library/jest-dom";

  
  describe("CustomButton Component", () => {
    const mockOnClick = jest.fn();
  
    const defaultProps: ICustomButtonProps = {
      id: "btn1",
      name: "Click Me",
      buttonType: "primary",
      onClick: mockOnClick,
    };
  
    it("renders the primary button correctly", () => {
      const { getByText } = render(<CustomButton {...defaultProps} />);
  
      // Verify that the PrimaryButton is rendered with the correct text
      expect(getByText("Click Me")).toBeInTheDocument();
    });
  
    it("renders the secondary button correctly", () => {
      const secondaryProps: ICustomButtonProps = {
        ...defaultProps,
        buttonType: "secondary",
      };
      const { getByText } = render(<CustomButton {...secondaryProps} />);
  
      // Verify that the DefaultButton is rendered with the correct text
      expect(getByText("Click Me")).toBeInTheDocument();
    });
  
    it("calls onClick when the primary button is clicked", () => {
      const { getByText } = render(<CustomButton {...defaultProps} />);
      const button = getByText("Click Me");
  
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledWith(button);
    });
  
    it("calls onClick when the secondary button is clicked", () => {
      const secondaryProps: ICustomButtonProps = {
        ...defaultProps,
        buttonType: "secondary",
      };
      const { getByText } = render(<CustomButton {...secondaryProps} />);
      const button = getByText("Click Me");
  
      fireEvent.click(button);
      expect(mockOnClick).toHaveBeenCalledWith(button);
    });
  });
  