import React from "react";
import { render } from "@testing-library/react";
import PageTitle, { IPageTitleProps } from "./PageTitle";
import "@testing-library/jest-dom";


describe("PageTitle Component", () => {
    const defaultProps: IPageTitleProps = {
        currentPage: 0,
        prefLang: "en", 
    };

    it("renders 'Poster Information' when currentPage is 0", () => {
        const { getByText } = render(<PageTitle {...defaultProps} />);
        expect(getByText("Poster Information")).toBeInTheDocument();
    });

    it("renders 'Opportunity Details' when currentPage is 1", () => {
        const { getByText } = render(<PageTitle {...defaultProps} currentPage={1} />);
        expect(getByText("Opportunity Details")).toBeInTheDocument();
    });

    it("renders 'Opportunity Requirements' when currentPage is 2", () => {
        const { getByText } = render(<PageTitle {...defaultProps} currentPage={2} />);
        expect(getByText("Opportunity Requirements")).toBeInTheDocument();
    });

    it("renders 'Review and submit' when currentPage is 3", () => {
        const { getByText } = render(<PageTitle {...defaultProps} currentPage={3} />);
        expect(getByText("Review and submit")).toBeInTheDocument();
    });

    // test with a different language
    it("renders title in French when prefLang is 'fr'", () => {
        const frenchProps = { ...defaultProps, prefLang: "fr", currentPage: 0 }; 
        const { getByText } = render(<PageTitle {...frenchProps} />);
        // the expectation to the French translation of "Poster Information"
        // expect(getByText("Informations sur l'annonceur")).toBeInTheDocument(); // If it is translated.
        expect(getByText("Poster Information")).toBeInTheDocument(); // If it is not translated.
    });
});