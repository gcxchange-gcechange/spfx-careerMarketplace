import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Details, { IDetailsProps } from "./Details";

jest.mock("./ReusableTextField", () => (props: any) => (
  <input
    data-testid={`textfield-${props.id}`}
    id={props.id}
    name={props.name}
    defaultValue={props.defaultValue}
    readOnly={props.readOnly}
    onChange={(e) => props.onChange(e, e.target.value)}
  />
));

jest.mock("./ReusableDropDownField", () => (props: any) => (
  <select
    data-testid={`dropdown-${props.id}`}
    id={props.id}
    name={props.name}
    value={props.selectedKey}
    onChange={(e) => props.onChange(e, { key: e.target.value })}
    disabled={props.readOnly}
  >
    {props.options.map((option: any) => (
      <option key={option.key} value={option.key}>
        {option.text}
      </option>
    ))}
  </select>
));

jest.mock("@fluentui/react", () => ({
  DatePicker: (props: any) => (
    <input
      data-testid="datepicker"
      type="date"
      id={props.id}
      onChange={(e) => props.onSelectDate(new Date(e.target.value))}
      disabled={props.disabled}
    />
  ),
}));

describe("Details Component", () => {
  const mockHandleOnChange = jest.fn();
  const mockHandleDropDownItem = jest.fn();
  const mockHandleOnDateChange = jest.fn();

  const defaultProps: IDetailsProps = {
    programArea: [{ key: "area1", text: "Area 1" }],
    classificationCode: [{ key: "code1", text: "Code 1" }],
    classificationLevel: [{ key: "level1", text: "Level 1" }],
    jobType: [{ key: "type1", text: "Type 1" }],
    duration: [{ key: "dur1", text: "1 Year" }],
    currentPage: 1,
    handleDropDownItem: mockHandleDropDownItem,
    handleOnChange: mockHandleOnChange,
    handleOnDateChange: mockHandleOnDateChange,
    values: {
      jobTitleEn: "Software Engineer",
      jobTitleFr: "Ingénieur Logiciel",
      jobDescriptionEn: "Develop and maintain software.",
      jobDescriptionFr: "Développer et maintenir des logiciels.",
      numOfOpps: "5",
      deadline: null,
      jobType: { key: "type1" },
      programArea: { key: "area1" },
      classificationCode: { key: "code1" },
      classificationLevel: { key: "level1" },
      duration: { key: "dur1" },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders all input fields and dropdowns", () => {
    render(<Details {...defaultProps} />);

    // Check for text fields
    expect(screen.getByTestId("textfield-jobTitleEn")).toBeInTheDocument();
    expect(screen.getByTestId("textfield-jobTitleFr")).toBeInTheDocument();
    expect(screen.getByTestId("textfield-numOfOpps")).toBeInTheDocument();
    expect(screen.getByTestId("textfield-jobDescriptionEn")).toBeInTheDocument();
    expect(screen.getByTestId("textfield-jobDescriptionFr")).toBeInTheDocument();

    // Check for dropdowns
    expect(screen.getByTestId("dropdown-jobType")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-programArea")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-classificationCode")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-classificationLevel")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-duration")).toBeInTheDocument();

    // Check for date picker
    expect(screen.getByTestId("datepicker")).toBeInTheDocument();
  });

  test("calls handleOnChange when a text field value changes", () => {
    render(<Details {...defaultProps} />);

    const jobTitleField = screen.getByTestId("textfield-jobTitleEn");
    fireEvent.change(jobTitleField, { target: { value: "New Job Title" } });

    expect(mockHandleOnChange).toHaveBeenCalledWith("jobTitleEn", "New Job Title");
  });

  test("calls handleDropDownItem when a dropdown value changes", () => {
    render(<Details {...defaultProps} />);

    const jobTypeDropdown = screen.getByTestId("dropdown-jobType");
    fireEvent.change(jobTypeDropdown, { target: { value: "type2" } });

    expect(mockHandleDropDownItem).toHaveBeenCalledWith("jobType", { key: "type2" });
  });

  test("calls handleOnDateChange when a date is selected", () => {
    render(<Details {...defaultProps} />);

    const datePicker = screen.getByTestId("datepicker");
    fireEvent.change(datePicker, { target: { value: "2023-12-31" } });

    expect(mockHandleOnDateChange).toHaveBeenCalledWith(new Date("2023-12-31"));
  });
});
