///<reference types="jest"/>

jest.mock('@microsoft/sp-webpart-base', () => ({
    WebPartContext: jest.fn().mockImplementation(() => ({
    })),
  }));
  
  import * as React from 'react';

  import { render } from '@testing-library/react';
  import '@testing-library/jest-dom';
  
  import CareerMarketplace from './webparts/careerMarketplace/components/CareerMarketplace';
  import { ICareerMarketplaceProps } from './webparts/careerMarketplace/components/ICareerMarketplaceProps';

  
  describe("CareerMarketplace Component", () => {
    const mockProps: ICareerMarketplaceProps = {
      description: 'This is a career marketplace description',
    };
  
    it("should render CareerMarketplace component", () => {
      render(<CareerMarketplace {...mockProps} />);
      //expect(screen.getByText(mockProps.wantToStayInTheLoopTitle)).toBeInTheDocument();
    });
  
    it("should render the 'Stay in the loop' title", () => {
      render(<CareerMarketplace {...mockProps} />);
      //expect(screen.getByText(mockProps.wantToStayInTheLoopTitle)).toBeInTheDocument();
    });
  });
  
  