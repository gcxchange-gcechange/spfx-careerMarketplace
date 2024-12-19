jest.mock("./ReusableTextField");
jest.mock("./ReusableDropDownField");
jest.mock("@fluentui/react", () => ({
  DatePicker: jest.fn().mockReturnValue(<div>DatePicker</div>),
}));

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Details, { IDetailsProps } from "./Details";

describe("Details Component", () => {
  const mockHandleOnChange = jest.fn();
  const mockHandleDropDownItem = jest.fn();
  const mockHandleOnDateChange = jest.fn();

  const defaultProps: IDetailsProps = {
    programArea: [{ key: "pa1", text: "Program A" }],
    classificationCode: [{ key: "cc1", text: "Code A" }],
    classificationLevel: [{ key: "cl1", text: "Level 1" }],
    jobType: [{ key: "jt1", text: "Full-Time" }],
    duration: [{ key: "d1", text: "1 year" }],
    currentPage: 1,
    handleDropDownItem: mockHandleDropDownItem,
    handleOnChange: mockHandleOnChange,
    handleOnDateChange: mockHandleOnDateChange,
    values: {
      jobTitleEn: "Software Developer",
      jobTitleFr: "Développeur logiciel",
      jobDescriptionEn: "Develop software",
      jobDescriptionFr: "Développer des logiciels",
      numOfOpps: "5",
      deadline: new Date(),
      jobType: { key: "jt1", text: "Full-Time" },
      programArea: { key: "pa1", text: "Program A" },
      classificationCode: { key: "cc1", text: "Code A" },
      classificationLevel: { key: "cl1", text: "Level 1" },
      duration: { key: "d1", text: "1 year" },
    },
  };

  it("renders all fields correctly", () => {
    const { getByLabelText, getByText } = render(<Details {...defaultProps} />);

    // Verify text fields
    expect(getByLabelText("Job Title (EN)")).toBeInTheDocument();
    expect(getByLabelText("Job Title (FR)")).toBeInTheDocument();
    expect(getByLabelText("Job Description (EN)")).toBeInTheDocument();
    expect(getByLabelText("Job Description (FR)")).toBeInTheDocument();
    expect(getByLabelText("Number of opportunities")).toBeInTheDocument();

    // Verify dropdown fields
    expect(getByText("Job Type")).toBeInTheDocument();
    expect(getByText("Program area")).toBeInTheDocument();
    expect(getByText("Classification")).toBeInTheDocument();
    expect(getByText("Clasification Level")).toBeInTheDocument();
    expect(getByText("Duration")).toBeInTheDocument();

    // Verify DatePicker
    expect(getByText("DatePicker")).toBeInTheDocument();
  });

  it("calls handleOnChange when text field changes", () => {
    const { getByLabelText } = render(<Details {...defaultProps} />);
    const input = getByLabelText("Job Title (EN)") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Web Developer" } });
    expect(mockHandleOnChange).toHaveBeenCalledWith("jobTitleEn", "Web Developer");
  });

  it("calls handleDropDownItem when dropdown value changes", () => {
    const { getByLabelText } = render(<Details {...defaultProps} />);
    const dropdown = getByLabelText("Job Type") as HTMLSelectElement;

    fireEvent.change(dropdown, { target: { value: "jt2" } });
    expect(mockHandleDropDownItem).toHaveBeenCalledWith("jobType", { key: "jt2", text: "Part-Time" });
  });

  it("calls handleOnDateChange when date is selected", () => {
    const { getByText } = render(<Details {...defaultProps} />);
    const datePicker = getByText("DatePicker");

    // Simulate date selection
    fireEvent.click(datePicker);
    expect(mockHandleOnDateChange).toHaveBeenCalled();
  });
});
