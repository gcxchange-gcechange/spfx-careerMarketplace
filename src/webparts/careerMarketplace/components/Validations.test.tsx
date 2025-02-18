import React from "react";
import { render } from "@testing-library/react";
import { validateEmpty, validateDropdowns, validate } from "./Validations"; 

describe("Validation Functions", () => {
  describe("validateEmpty", () => {
    it("returns error message when value is empty", () => {
      const error = validateEmpty("", "testField");
      const { getByText } = render(<>{error}</>);
      expect(getByText("Field cannot be blank")).toBeInTheDocument();
    });

    it("returns error message when value is undefined", () => {
      const error = validateEmpty(undefined as unknown as string, "testField");
      const { getByText } = render(<>{error}</>);
      expect(getByText("Field cannot be blank")).toBeInTheDocument();
    });

    it("returns minimum characters error for short values (not 'numberOfOpportunities')", () => {
      const error = validateEmpty("1234", "testField");
      const { getByText } = render(<>{error}</>);
      expect(getByText("Minimum 5 characters required")).toBeInTheDocument();
    });

    it("does not return an error when value is valid", () => {
      expect(validateEmpty("ValidInput", "testField")).toBeUndefined();
    });

    it("does not return a length error for 'numberOfOpportunities'", () => {
      expect(validateEmpty("1234", "numberOfOpportunities")).toBeUndefined();
    });
  });

  describe("validateDropdowns", () => {
    it("returns an error message when value is empty", () => {
      expect(validateDropdowns("")).toBe("Please select an option");
    });

    it("returns undefined when value is valid", () => {
      expect(validateDropdowns("ValidOption")).toBeUndefined();
    });
  });

  describe("validate", () => {
    it("returns an error message when value is empty", () => {
      const error = validate("");
      const { getByText } = render(<>{error}</>);
      expect(getByText("Please select an option")).toBeInTheDocument();
    });

    it("returns an error message when value is undefined", () => {
      const error = validate(undefined);
      const { getByText } = render(<>{error}</>);
      expect(getByText("Please select an option")).toBeInTheDocument();
    });

    it("returns an error message when value length is 1", () => {
      const error = validate("A");
      const { getByText } = render(<>{error}</>);
      expect(getByText("Please select an option")).toBeInTheDocument();
    });

    it("returns an error message when value key is 'false'", () => {
      const error = validate({ key: "false" });
      const { getByText } = render(<>{error}</>);
      expect(getByText("Please select an option")).toBeInTheDocument();
    });

    it("returns undefined when value is valid", () => {
      expect(validate("ValidInput")).toBeUndefined();
    });
  });
});
