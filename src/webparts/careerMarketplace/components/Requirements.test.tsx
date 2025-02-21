import { render, fireEvent } from "@testing-library/react";
import Requirements, { IRequirementsProps } from "./Requirements"; // Import your component and its props interface
import React from "react";

// Mock your components (if needed - depends on implementation)
jest.mock("./ReusableTextField"); // Adjust path if needed
jest.mock("./ReusableDropDownField"); // Adjust path if needed

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
                essential: "React",
                asset: "TypeScript",
            },
            approvedStaffing: "10",
            languageRequirements: [{ key: "en", text: "English" }],
            security: { key: "s1", text: "High" },
            city: { key: "1", text: "City1" },
            province: { key: "p1", text: "Province1" },
            region: { key: "r1", text: "Region1" },
            workArrangment: { key: "wa1", text: "Remote" },
            workSchedule: { key: "ws1", text: "Full-Time" },
        },
        prefLang: "",
        skills: [],
        checkedTerms: function (event: React.ChangeEvent<HTMLInputElement>, isChecked?: boolean): void {
            // If checkedTerms is not used in your tests, remove it entirely.
            // If you need to test it, mock it (see example below).
            throw new Error("checkedTerms function not yet implemented or mocked in tests.");
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
        // Add more assertions for other fields as needed
    });

    it("calls handleOnChange when text field changes", () => {
        const { getByLabelText } = render(<Requirements {...defaultProps} />);
        const input = getByLabelText("Essential Skill") as HTMLInputElement;

        fireEvent.change(input, { target: { value: "Redux" } });
        expect(mockHandleOnChange).toHaveBeenCalledWith("skills.essential", "Redux");
    });

    it("calls handleDropDownItem when dropdown value changes", () => {
        const { getByLabelText } = render(<Requirements {...defaultProps} />);
        const dropdown = getByLabelText("Province") as HTMLSelectElement;

        fireEvent.change(dropdown, { target: { value: "p2" } }); // Ensure "p2" exists in your province data
        expect(mockHandleDropDownItem).toHaveBeenCalledWith("province", { key: "p2", text: "Province2" }); // Ensure "Province2" corresponds to "p2"
    });

    it("calls checkedTerms when the terms checkbox is checked", () => {
        const mockCheckedTerms = jest.fn();
        const propsWithMock = { ...defaultProps, checkedTerms: mockCheckedTerms }; // Use a new object for props override
        const { getByRole } = render(<Requirements {...propsWithMock} />);
        const checkbox = getByRole('checkbox') as HTMLInputElement; //  Or use getByLabelText if you have a label

        fireEvent.click(checkbox); // Or fireEvent.change(checkbox, { target: { checked: true } });
        expect(mockCheckedTerms).toHaveBeenCalled();
    });
});