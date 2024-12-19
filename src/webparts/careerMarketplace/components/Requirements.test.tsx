jest.mock("./ReusableTextField");
jest.mock("./ReusableDropDownField");

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Requirements, { IRequirementsProps } from "./Requirements";

describe("Requirements Component", () => {
  const mockHandleOnChange = jest.fn();
  const mockHandleDropDownItem = jest.fn();

  const defaultProps: IRequirementsProps = {
    language: [{ key: "en", text: "English" }],
    city: [{ key: "1", text: "City1", regionID: "r1" }],
    province: [{ key: "p1", text: "Province1" }],
    region: [{ key: "r1", text: "Region1", provinceId: "p1" }],
    security: [{ key: "s1", text: "High" }],
    wrkArrangment: [{ key: "wa1", text: "Remote" }],
    wrkSchedule: [{ key: "ws1", text: "Full-Time" }],
    currentPage: 2,
    handleDropDownItem: mockHandleDropDownItem,
    handleOnChange: mockHandleOnChange,
    values: {
      essentialSkill: "React",
      assetSkill: "TypeScript",
      approvedStaffing: "10",
      language: { key: "en", text: "English" },
      location: { key: "loc1", text: "Location1" },
      security: { key: "s1", text: "High" },
      city: { key: "1", text: "City1" },
      province: { key: "p1", text: "Province1" },
      region: { key: "r1", text: "Region1" },
      wrkArrangment: { key: "wa1", text: "Remote" },
      wrkSchedule: { key: "ws1", text: "Full-Time" },
    },
  };

  it("renders all fields correctly", () => {
    const { getByText, getByLabelText } = render(<Requirements {...defaultProps} />);

    // Verify text fields
    expect(getByLabelText("Essential Skill")).toBeInTheDocument();
    expect(getByLabelText("Asset Skill")).toBeInTheDocument();

    // Verify dropdown fields
    expect(getByText("Province")).toBeInTheDocument();
    expect(getByText("City")).toBeInTheDocument();
    expect(getByText("Region")).toBeInTheDocument();
    expect(getByText("Language requirements")).toBeInTheDocument();
  });

  it("calls handleOnChange when text field changes", () => {
    const { getByLabelText } = render(<Requirements {...defaultProps} />);
    const input = getByLabelText("Essential Skill") as HTMLInputElement;

    fireEvent.change(input, { target: { value: "Redux" } });
    expect(mockHandleOnChange).toHaveBeenCalledWith("essentialSkill", "Redux");
  });

  it("calls handleDropDownItem when dropdown value changes", () => {
    const { getByLabelText } = render(<Requirements {...defaultProps} />);
    const dropdown = getByLabelText("Province") as HTMLSelectElement;

    fireEvent.change(dropdown, { target: { value: "p2" } });
    expect(mockHandleDropDownItem).toHaveBeenCalledWith("province", { key: "p2", text: "Province2" });
  });
});
