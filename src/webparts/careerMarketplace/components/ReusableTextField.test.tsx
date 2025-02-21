import React from "react";
import { render, fireEvent } from "@testing-library/react";
import ReusableTextField, { IReusableTextFieldProps } from "./ReusableTextField";
import "@testing-library/jest-dom";


describe("ReusableTextField Component", () => {
  const mockOnChange = jest.fn();
  const mockOnBlur = jest.fn();

  const defaultProps: IReusableTextFieldProps = {
    id: "testTextField",
    name: "testTextField",
    title: "Test Text Field",
    onChange: mockOnChange,
    onBlur: mockOnBlur,
    defaultValue: "Initial Value",
    readOnly: false,
    disabled: false,
    multiline: false,
    validateonLoad: false,
    validateOnFocusOut: true,
    ariaLabelRequired: "required",
  };

  it("renders text field with given title", () => {
    const { getByText } = render(<ReusableTextField {...defaultProps} />);
    expect(getByText("Test Text Field")).toBeInTheDocument();
  });

  it("calls onChange when text is entered", () => {
    const { getByRole } = render(<ReusableTextField {...defaultProps} />);
    const input = getByRole("textbox") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "New Value" } });
    expect(mockOnChange).toHaveBeenCalledWith(expect.anything(), "New Value");
  });

  it("calls onBlur when the text field loses focus", () => {
    const { getByRole } = render(<ReusableTextField {...defaultProps} />);
    const input = getByRole("textbox");

    fireEvent.blur(input, { target: { value: "Blurred Value" } });
    expect(mockOnBlur).toHaveBeenCalledWith(expect.anything(), "Blurred Value");
  });

  it("disables the text field when disabled prop is true", () => {
    const { getByRole } = render(<ReusableTextField {...defaultProps} disabled={true} />);
    const input = getByRole("textbox");
    expect(input).toBeDisabled();
  });

  it("renders multiline text field when multiline prop is true", () => {
    const { getByRole } = render(<ReusableTextField {...defaultProps} multiline={true} />);
    const textarea = getByRole("textbox");
    expect(textarea).toHaveAttribute("aria-multiline", "true");
  });
});
