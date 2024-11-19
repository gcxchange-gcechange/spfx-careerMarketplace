/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import ReusableTextField from './ReusableTextField';
import ReusableDropdownField from './ReusableDropDownField';


export interface IPosterInfoProps {
  handleOnChange: (event: string, newValue?: string) => void;
  handleDropDownItem: (event: any, item: any) => void;
  items: any[];
  userInfo: string;
  workEmail: string;
  currentPage: number;
  readOnly: boolean;
  values: [{}];
}


export default class PosterInfo extends React.Component<IPosterInfoProps> {

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(event.target.name);

    const eventName = event.target.name;
    const inputValue = event.target.value;

    this.props.handleOnChange(eventName, inputValue);

  }

  public onChangeDropDownItem = (event: any, item: any): void => {
    console.log("EVENTID", event.target.id);
    const eventId = event.target.id
    console.log("ITEM", item)
    if (item) {
      
      this.props.handleDropDownItem(eventId, item);
    }
  }


  public render(): React.ReactElement<IPosterInfoProps>{

    const isReadOnly = this.props.currentPage !== 0;

    console.log("Values", this.props.values)
    return (
      <>      
        <div>
          {
            this.props.currentPage === 0 && (
              <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
            )
          }
        </div>
        <div>
          <ReusableTextField id={"contactName"} name={"contactName"} title={"Full name"} defaultValue={this.props.userInfo} readOnly={isReadOnly}/>
          <ReusableDropdownField id={"department"} name={"department"} title={"Department"} options={this.props.items} onChange={this.onChangeDropDownItem} readOnly={isReadOnly} defaultValue={""}/>
          <ReusableTextField id={"workEmail"} name={"workEmail"} title={"Work Email"} defaultValue={this.props.workEmail} readOnly={isReadOnly}/>
        </div>
      </>
    )
  }
}