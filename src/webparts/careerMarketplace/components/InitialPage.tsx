/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { SelectLanguage } from './SelectLanguage';
import { Checkbox, ICheckboxProps, IRenderFunction, Label, Stack, StackItem} from '@fluentui/react';
import styles from './CareerMarketplace.module.scss';


export interface IInitialPageProps {
currentPage: number;
prefLang:string;
checkedField:(event:any, isChecked?: boolean) => void;
checkedApprovedStaffing:(event: any, isChecked: boolean) => void;
approvedStaffing: boolean;
nonJobSeeker: boolean;
}

export default class InitialPage extends React.Component<IInitialPageProps> {
    public strings = SelectLanguage(this.props.prefLang)

    public _onChange = ( event: any, isChecked:boolean ): void => {
        const eventName = event.target.id;
      
        this.props.checkedField( eventName, isChecked) 
    }


    public _onCheckedApprovedStaffing = (event: any, isChecked: boolean): void => {
      const eventName = event.target.id;
      this.props.checkedApprovedStaffing(eventName, isChecked);
    }


  public render(): React.ReactElement<IInitialPageProps>{

    const _renderLabel = ():IRenderFunction<ICheckboxProps> => {
      return (props?: ICheckboxProps) => (
          <p>
           <strong>{this.strings.approved_staffing_checkbox}</strong> {this.strings.approved_staffing_label_description}
          </p>
      );
    }



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
            defaultChecked={this.props.nonJobSeeker}
        />

        <div style={{marginTop: '10px'}}>
            <Stack  horizontal verticalAlign="center" >
              <StackItem >
                <Label htmlFor={'approvedStaffing'} id={'approvedStaffing_label'}>
                  <p>
                    <strong>{this.strings.approved_staffing}</strong>
                  </p>
                  <p className={styles.instruction}>{this.strings.approved_staffing_description}</p>                
                </Label>
              </StackItem>
            </Stack>


            <Checkbox 
              id={"approvedStafffing"} 
              name={"approvedStaffing"} 
              onRenderLabel={_renderLabel()} 
              onChange={this._onCheckedApprovedStaffing} 
              ariaLabelledBy={"approvedStaffing_label"}
              defaultChecked={this.props.approvedStaffing}
        
            />

          </div>


         
      </>
    )
  }

}
