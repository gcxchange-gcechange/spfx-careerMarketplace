/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import ReusableDropdownField from "./ReusableDropDownField";
import { IDropdownOption } from "@fluentui/react";
import { validate } from "./Validations";


export interface IPosterInfoProps {
   
  handleDropDownItem: (event: any, item: any) => void;
  items: IDropdownOption[];
  userInfo: string;
  workEmail: string;
  currentPage: number;
  readOnly: boolean;
  values: {
    department: any;
  };
  errorMessage?:(value: string | number) => string | undefined;
  fields: string[];
  inlineFieldErrors: any[];
}

export default class PosterInfo extends React.Component<IPosterInfoProps> {
  
  // public onChangeTextValue = ( event: React.ChangeEvent<HTMLInputElement>): void => {

  //   const eventName = event.target.name;
  //   const inputValue = event.target.value;

  //   this.props.handleOnChange(eventName, inputValue);
  // };

  public onChangeDropDownItem = (event: any, item: IDropdownOption): void => {
    const eventName = event.target.id;

    if (item) {
      this.props.handleDropDownItem(eventName, item);
    }
  };

  public render(): React.ReactElement<IPosterInfoProps> {
    const isReadOnly = this.props.currentPage !== 0;

    return (
      <>
        <div>
          {this.props.currentPage === 0 && (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          )}
        </div>
        <div>
          <ReusableTextField
            id={"contactName"}
            name={"contactName"}
            title={"Full name"}
            defaultValue={this.props.userInfo}
            readOnly={isReadOnly}
          />
          <ReusableDropdownField
            id={"department"}
            name={"department"}
            title={"Department"}
            options={[{key: "", text: "--Select--"},...this.props.items]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.department.key}
          />
          {this.props.inlineFieldErrors.includes('department') &&( 
            <div>{validate(this.props.values.department.key)}</div>
          )}

          <ReusableTextField
            id={"workEmail"}
            name={"workEmail"}
            title={"Work Email"}
            defaultValue={this.props.workEmail}
            readOnly={isReadOnly}
          />
        </div>
      </>
    );
  }
}
