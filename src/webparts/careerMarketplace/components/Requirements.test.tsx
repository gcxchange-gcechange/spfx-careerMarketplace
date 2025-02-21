jest.mock("./ReusableTextField");
jest.mock("./ReusableDropDownField");

import { render, fireEvent } from "@testing-library/react";
import Requirements, { IRequirementsProps } from "./Requirements";
import React from "react";

describe("Requirements Component", () => {
    const mockHandleOnChange = jest.fn();
    const mockHandleDropDownItem = jest.fn();

    const defaultProps: IRequirementsProps = {
      language: [{ key: "en", text: "English" }],
      city: [{ key: "1", text: "City1", regionID: "r1" }],
      province: [{ key: "p1", text: "Province1" }],
      region: [{ key: "r1", text: "Region1", provinceId: "p1" }],
      security: [{ key: "s1", text: "High" }],
      workArrangment: [{ key: "wa1", text: "Remote" }],
      workSchedule: [{ key: "ws1", text: "Full-Time" }],
      currentPage: 2,
      handleDropDownItem: mockHandleDropDownItem,
      handleOnChange: mockHandleOnChange,
      values: {
        skills: {
          essential: "React", // Use "essential" and "asset" inside skills
          asset: "TypeScript",
        },
        approvedStaffing: "10",
        languageRequirements: [{ key: "en", text: "English" }], //  <-- Corrected: Use "languageRequirements" array
        security: { key: "s1", text: "High" },
        city: { key: "1", text: "City1" },
        province: { key: "p1", text: "Province1" },
        region: { key: "r1", text: "Region1" },
        workArrangment: { key: "wa1", text: "Remote" },
        workSchedule: { key: "ws1", text: "Full-Time" },
      },
      prefLang: "",
      skills: [],
      checkedTerms: function (event: any, isChecked?: boolean): void {
        throw new Error("Function not implemented.");
      }
    };

    it("renders all fields correctly", () => {
        const { getByText, getByLabelText } = render(<Requirements {...defaultProps} />);

        expect(getByLabelText("Essential Skill")).toBeInTheDocument();
        expect(getByLabelText("Asset Skill")).toBeInTheDocument();

        expect(getByText("Province")).toBeInTheDocument();
        expect(getByText("City")).toBeInTheDocument();
        expect(getByText("Region")).toBeInTheDocument();
        expect(getByText("Language requirements")).toBeInTheDocument();
    });

    it("calls handleOnChange when text field changes", () => {
        const { getByLabelText } = render(<Requirements {...defaultProps} />);
        const input = getByLabelText("Essential Skill") as HTMLInputElement;

        fireEvent.change(input, { target: { value: "Redux" } });
        expect(mockHandleOnChange).toHaveBeenCalledWith("skills.essential", "Redux"); // Updated to skills.essential
    });

    it("calls handleDropDownItem when dropdown value changes", () => {
        const { getByLabelText } = render(<Requirements {...defaultProps} />);
        const dropdown = getByLabelText("Province") as HTMLSelectElement;

        fireEvent.change(dropdown, { target: { value: "p2" } });
        expect(mockHandleDropDownItem).toHaveBeenCalledWith("province", { key: "p2", text: "Province2" });
    });
});