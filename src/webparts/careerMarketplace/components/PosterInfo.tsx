/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import ReusableTextField from './ReusableTextField';
import ReusableDropdownField from './ReusableDropDownField';
import { IDropdownOption } from '@fluentui/react';
//import { IDropdownOption } from '@fluentui/react';

export interface IPosterInfoProps {
  handleOnChange: (event: string, newValue?: string) => void;
  handleDropDownItem: (item: IDropdownOption) => void;
  items: any[];
  userInfo: string;
  workEmail: string;
}


export default class PosterInfo extends React.Component<IPosterInfoProps> {

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(event.target.name);

    const eventName = event.target.name;
    const inputValue = event.target.value;

    this.props.handleOnChange(eventName, inputValue);

  }

  public onChangeDropDownItem = (item: IDropdownOption): void => {
    if (item) {
      
      this.props.handleDropDownItem(  item);
    }
  }


  public render(): React.ReactElement<IPosterInfoProps>{

    console.log("Items", this.props.userInfo)
    return (
      <>      
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
        </div>
        <div>
          <ReusableTextField id={"1"} name={"contactName"} title={"Full name"} defaultValue={this.props.userInfo}/>
          <ReusableDropdownField id={"2"} name={"department"} title={"Department"} options={this.props.items} onChange={this.onChangeDropDownItem}/>
          <ReusableTextField id={"3"} name={"workEmail"} title={"Work Email"} defaultValue={this.props.workEmail} />
        </div>
      </>
    )
  }
}