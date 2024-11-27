import * as React from 'react';


export interface IPageTitleProps {
currentPage: number;
}


export default class PageTitle extends React.Component<IPageTitleProps> {



  public render(): React.ReactElement<IPageTitleProps>{


    return (
      <>      
          <div>

            {this.props.currentPage === 0 && (
              <h2>Poster Information </h2>
            )}
            {this.props.currentPage === 1 && (
              <h2>Opportunity Details</h2>
            )}
            {this.props.currentPage === 2 && (
              <h2>Opportunity Requirements</h2>
            )}
            {this.props.currentPage === 3 && (
              <h2>Review and submit</h2>
            )}
          </div>
         
      </>
    )
  }

}
