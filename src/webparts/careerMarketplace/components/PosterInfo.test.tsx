import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import PosterInfo, { IPosterInfoProps } from "./PosterInfo";

jest.mock("./ReusableTextField", () => (props: any) => (
  <input
    data-testid={`textfield-${props.id}`}
    id={props.id}
    name={props.name}
    defaultValue={props.defaultValue}
    readOnly={props.readOnly}
    disabled={props.disabled}
    onChange={props.onChange}
  />
));

jest.mock("./ReusableDropDownField", () => (props: any) => (
  <select
    data-testid={`dropdown-${props.id}`}
    id={props.id}
    name={props.name}
    value={props.selectedKey}
    onChange={(e) => props.onChange(e, { key: e.target.value })}
    disabled={props.disabled}
  >
    {props.options.map((option: any) => (
      <option key={option.key} value={option.key}>
        {option.text}
      </option>
    ))}
  </select>
));

describe("PosterInfo Component", () => {
  const mockHandleOnChange = jest.fn();
  const mockHandleDropDownItem = jest.fn();

  const defaultProps: IPosterInfoProps = {
    handleOnChange: mockHandleOnChange,
    handleDropDownItem: mockHandleDropDownItem,
    items: [
      { key: "dept1", text: "Department 1" },
      { key: "dept2", text: "Department 2" },
    ],
    userInfo: "John Doe",
    workEmail: "john.doe@example.com",
    currentPage: 0,
    readOnly: false,
    values: {
      department: { key: "dept1" },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders text fields and dropdown", () => {
    render(<PosterInfo {...defaultProps} />);

    // Check for text fields
    expect(screen.getByTestId("textfield-contactName")).toBeInTheDocument();
    expect(screen.getByTestId("textfield-workEmail")).toBeInTheDocument();

    // Check for dropdown
    expect(screen.getByTestId("dropdown-department")).toBeInTheDocument();
  });

  test("calls handleOnChange when text field value changes", () => {
    render(<PosterInfo {...defaultProps} />);

    const contactNameField = screen.getByTestId("textfield-contactName");
    fireEvent.change(contactNameField, { target: { name: "contactName", value: "Jane Doe" } });

    expect(mockHandleOnChange).toHaveBeenCalledWith("contactName", "Jane Doe");
  });

  test("calls handleDropDownItem when dropdown value changes", () => {
    render(<PosterInfo {...defaultProps} />);

    const departmentDropdown = screen.getByTestId("dropdown-department");
    fireEvent.change(departmentDropdown, { target: { value: "dept2" } });

    expect(mockHandleDropDownItem).toHaveBeenCalledWith("department", { key: "dept2" });
  });

  test("disables fields when currentPage is not 0", () => {
    render(<PosterInfo {...defaultProps} currentPage={1} />);

    expect(screen.getByTestId("textfield-contactName")).toBeDisabled();
    expect(screen.getByTestId("textfield-workEmail")).toBeDisabled();
    expect(screen.getByTestId("dropdown-department")).toBeDisabled();
  });

  test("renders paragraph when currentPage is 0", () => {
    render(<PosterInfo {...defaultProps} />);

    const paragraph = screen.getByText(/lorem ipsum/i);
    expect(paragraph).toBeInTheDocument();
  });

  test("does not render paragraph when currentPage is not 0", () => {
    render(<PosterInfo {...defaultProps} currentPage={1} />);

    const paragraph = screen.queryByText(/lorem ipsum/i);
    expect(paragraph).not.toBeInTheDocument();
  });
});
