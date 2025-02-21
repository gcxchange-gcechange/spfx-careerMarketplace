jest.mock("./ReusableTextField");
jest.mock("./ReusableDropDownField");

import React from "react";
import { render, fireEvent } from "@testing-library/react";
import PosterInfo, { IPosterInfoProps } from "./PosterInfo";
import "@testing-library/jest-dom";


describe("PosterInfo Component", () => {
    const mockHandleOnChange = jest.fn();
    const mockHandleDropDownItem = jest.fn();

    const defaultProps: IPosterInfoProps = {
        items: [{ key: "d1", text: "Department 1" }],
        userInfo: "John Doe",
        workEmail: "john.doe@example.com",
        currentPage: 0,
        handleDropDownItem: mockHandleDropDownItem,
        readOnly: false,
        values: {
            department: { key: "d1", text: "Department 1" },
        },
        fields: [],
        inlineFieldErrors: [],
        prefLang: "en",       //  <-- Added prefLang
        jobOpportunityId: "123" //  <-- Added jobOpportunityId (or a suitable default value)
    };

    it("renders all fields correctly", () => {
        const { getByLabelText, getByText } = render(<PosterInfo {...defaultProps} />);

        expect(getByLabelText("Full name")).toBeInTheDocument();
        expect(getByLabelText("Work Email")).toBeInTheDocument();
        expect(getByText("Department")).toBeInTheDocument();
    });

    it("calls handleOnChange when text field changes", () => {
        const { getByLabelText } = render(<PosterInfo {...defaultProps} />);
        const input = getByLabelText("Full name") as HTMLInputElement;

        fireEvent.change(input, { target: { value: "Jane Smith" } });
        expect(mockHandleOnChange).toHaveBeenCalledWith("contactName", "Jane Smith");
    });

    it("calls handleDropDownItem when dropdown value changes", () => {
        const { getByLabelText } = render(<PosterInfo {...defaultProps} />);
        const dropdown = getByLabelText("Department") as HTMLSelectElement;

        fireEvent.change(dropdown, { target: { value: "d2" } });
        expect(mockHandleDropDownItem).toHaveBeenCalledWith("department", { key: "d2", text: "Department 2" });
    });

    it("does not call handleOnChange or handleDropDownItem when fields are read-only", () => {
        const readOnlyProps = { ...defaultProps, currentPage: 1 };
        const { getByLabelText } = render(<PosterInfo {...readOnlyProps} />);

        const input = getByLabelText("Full name") as HTMLInputElement;
        const dropdown = getByLabelText("Department") as HTMLSelectElement;

        fireEvent.change(input, { target: { value: "Jane Smith" } });
        fireEvent.change(dropdown, { target: { value: "d2" } });

        expect(mockHandleOnChange).not.toHaveBeenCalled();
        expect(mockHandleDropDownItem).not.toHaveBeenCalled();
    });
});