jest.mock("./ReusableTextField");
jest.mock("./ReusableDropDownField");

import React from "react";
import { render } from "@testing-library/react";
import Complete from "./Complete";
import "@testing-library/jest-dom";


describe("Complete Component", () => {
  it("renders completion message correctly", () => {
    const { getByText } = render(<Complete />);
    expect(getByText("Thank you for completing the form.")).toBeInTheDocument();
  });
});
