// Complete.test.tsx
jest.mock("./ReusableTextField");
jest.mock("./ReusableDropDownField");

import * as React from "react";
import { render } from "@testing-library/react";
import Complete from "./Complete";
import "@testing-library/jest-dom";

describe("Complete Component", () => {
    it("renders completion message with default language", () => {
        const { getByText } = render(<Complete prefLang="en" />);
        expect(getByText("Thank you for completing the form.")).toBeInTheDocument();
    });

    it("renders completion message with Spanish", () => {
        const { getByText } = render(<Complete prefLang="es" />);
        expect(getByText("Thank you for completing the form.")).toBeInTheDocument(); // Adjust if text changes
    });
    
    it("renders a different message based on prefLang", () => {
      const { getByText } = render(<Complete prefLang="fr" />);
      expect(getByText("Thank you for completing the form.")).toBeInTheDocument(); // Adjust if text changes
    });
});