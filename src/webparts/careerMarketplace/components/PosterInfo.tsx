/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import ReusableDropdownField from "./ReusableDropDownField";
import { IDropdownOption } from "@fluentui/react";


export interface IPosterInfoProps {
  handleOnChange: (event: string, newValue?: string) => void;
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
}

export default class PosterInfo extends React.Component<IPosterInfoProps> {
  
  public onChangeTextValue = ( event: React.ChangeEvent<HTMLInputElement>): void => {

    const eventName = event.target.name;
    const inputValue = event.target.value;

    this.props.handleOnChange(eventName, inputValue);
  };

  public onChangeDropDownItem = (event: any, item: IDropdownOption): void => {
    const eventName = event.target.id;
    if (item) {
      this.props.handleDropDownItem(eventName, item);
    }
  };

  public render(): React.ReactElement<IPosterInfoProps> {
    const isReadOnly = this.props.currentPage !== 0;
    // const optionsWithSelect = (): IDropdownOption[] => {
    //   return [{key:"", text: "--Select--"}, ...this.props.items]
    // }



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
            disabled={isReadOnly}
          />
          <ReusableDropdownField
            id={"department"}
            name={"department"}
            title={"Department"}
            options={this.props.items}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.department.key}
          />

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
