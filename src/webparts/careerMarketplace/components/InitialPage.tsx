/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { SelectLanguage } from './SelectLanguage';
import { Checkbox} from '@fluentui/react';


export interface IInitialPageProps {
currentPage: number;
prefLang:string;
checkedField:(event:any, isChecked?: boolean) => void;
}

export default class InitialPage extends React.Component<IInitialPageProps> {
    public strings = SelectLanguage(this.props.prefLang)

    public _onChange = ( event: any, isChecked:boolean ): void => {
      const eventName = event.target.id;
      
      if(isChecked === true) {
        this.props.checkedField( eventName, isChecked) 
      }
    }



  public render(): React.ReactElement<IInitialPageProps>{


    return (
      <>      
        <h2>{this.strings.InitialPage_title1}</h2>
        <p>{this.strings.InitialPage_para1}<strong>{this.strings.InitialPage_para1_a}</strong>{this.strings.InitialPage_para1_b}</p>
        <p><strong>{this.strings.InitialPage_para2}</strong></p>

        <Checkbox 
            id={"nonJobSeeking"} 
            name={"nonJobSeeking"} 
            label={this.strings.InitalPage_checkbox_txt} 
            onChange={this._onChange} 
            ariaLabelledBy={"nonJobSeeking"}
        />


         
      </>
    )
  }

}
