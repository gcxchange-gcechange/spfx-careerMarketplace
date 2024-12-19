import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Requirements, { IRequirementsProps } from "./Requirements";

jest.mock("./ReusableTextField", () => (props: any) => (
  <input
    data-testid={`textfield-${props.id}`}
    id={props.id}
    name={props.name}
    value={props.defaultValue}
    readOnly={props.readOnly}
    onChange={(e) => props.onChange(e, e.target.value)}
    // multiline - skipped seems to be an issue
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

describe("Requirements Component", () => {
  const mockHandleOnChange = jest.fn();
  const mockHandleDropDownItem = jest.fn();

  const defaultProps: IRequirementsProps = {
    handleOnChange: mockHandleOnChange,
    handleDropDownItem: mockHandleDropDownItem,
    language: [{ key: "en", text: "English" }],
    city: [
      { key: "city1", text: "City 1", regionID: "region1" },
      { key: "city2", text: "City 2", regionID: "region2" },
    ],
    province: [{ key: "province1", text: "Province 1" }],
    region: [
      { key: "region1", text: "Region 1", provinceId: "province1" },
      { key: "region2", text: "Region 2", provinceId: "province1" },
    ],
    security: [{ key: "low", text: "Low" }],
    wrkArrangment: [{ key: "remote", text: "Remote" }],
    wrkSchedule: [{ key: "full-time", text: "Full-Time" }],
    currentPage: 2,
    values: {
      essentialSkill: "Problem Solving",
      assetSkill: "Communication",
      approvedStaffing: "5",
      language: { key: "en" },
      location: null,
      security: { key: "low" },
      city: { key: "city1" },
      province: { key: "province1" },
      region: { key: "region1" },
      wrkArrangment: { key: "remote" },
      wrkSchedule: { key: "full-time" },
    },
  };

  afterEach(() => {
    jest.clearAllMocks();
  });

  test("renders text fields and dropdowns", () => {
    render(<Requirements {...defaultProps} />);

    expect(screen.getByTestId("textfield-essentialSkill")).toBeInTheDocument();
    expect(screen.getByTestId("textfield-assetSkill")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-wrkSchedule")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-province")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-region")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-city")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-security")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-language")).toBeInTheDocument();
    expect(screen.getByTestId("dropdown-wrkArrangment")).toBeInTheDocument();
    expect(screen.getByTestId("textfield-approvedStaffing")).toBeInTheDocument();
  });

  test("calls handleOnChange when a text field value changes", () => {
    render(<Requirements {...defaultProps} />);

    const essentialSkillField = screen.getByTestId("textfield-essentialSkill");
    fireEvent.change(essentialSkillField, { target: { name: "essentialSkill", value: "Critical Thinking" } });

    expect(mockHandleOnChange).toHaveBeenCalledWith("essentialSkill", "Critical Thinking");
  });

  test("calls handleDropDownItem when a dropdown value changes", () => {
    render(<Requirements {...defaultProps} />);

    const wrkScheduleDropdown = screen.getByTestId("dropdown-wrkSchedule");
    fireEvent.change(wrkScheduleDropdown, { target: { value: "part-time" } });

    expect(mockHandleDropDownItem).toHaveBeenCalledWith("wrkSchedule", { key: "part-time" });
  });

  test("renders filtered regions and cities", () => {
    render(<Requirements {...defaultProps} />);

    const regionDropdown = screen.getByTestId("dropdown-region");
    const cityDropdown = screen.getByTestId("dropdown-city");

    expect(regionDropdown).toHaveValue("region1");
    expect(screen.getByText("Region 1")).toBeInTheDocument();
    expect(screen.queryByText("Region 2")).not.toBeInTheDocument();

    expect(cityDropdown).toHaveValue("city1");
    expect(screen.getByText("City 1")).toBeInTheDocument();
    expect(screen.queryByText("City 2")).not.toBeInTheDocument();
  });

  test("disables fields when currentPage is not 2", () => {
    render(<Requirements {...defaultProps} currentPage={1} />);

    expect(screen.getByTestId("textfield-essentialSkill")).toBeDisabled();
    expect(screen.getByTestId("dropdown-wrkSchedule")).toBeDisabled();
  });

  test("renders paragraph only when currentPage is 2", () => {
    const { rerender } = render(<Requirements {...defaultProps} currentPage={2} />);
    expect(screen.getByText(/lorem ipsum/i)).toBeInTheDocument();

    rerender(<Requirements {...defaultProps} currentPage={1} />);
    expect(screen.queryByText(/lorem ipsum/i)).not.toBeInTheDocument();
  });
});
