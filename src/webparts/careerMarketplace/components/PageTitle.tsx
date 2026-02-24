import * as React from 'react';
import { SelectLanguage } from './SelectLanguage';


export interface IPageTitleProps {
currentPage: number;
prefLang:string;
}


export default class PageTitle extends React.Component<IPageTitleProps> {
  public strings = SelectLanguage(this.props.prefLang)



  public render(): React.ReactElement<IPageTitleProps>{


    return (
      <>      
          <div>
            {this.props.currentPage === 1 && (
              <h2 id={`${this.strings.posterInformation_title}`}>{this.strings.posterInformation_title}</h2>
            )}
            {this.props.currentPage === 2 && (
              <h2>{this.strings.oppotunityDetails_Title}</h2>
            )}
            {this.props.currentPage === 3 && (
              <h2>{this.strings.opportunityRequirements_title}</h2>
            )}
            {this.props.currentPage === 4 && (
              <h2>{this.strings.reviewSubmit_title}</h2>
            )}
          </div>
         
      </>
    )
  }

}
