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
  

  public onChangeDropDownItem = (event: any, item: IDropdownOption): void => {
    const eventName = event.target.id;

    if (item) {
      this.props.handleDropDownItem(eventName, item);
    }
  };

  public render(): React.ReactElement<IPosterInfoProps> {
    const isReadOnly = this.props.currentPage === 0 || this.props.currentPage === 3;

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
            ariaLabelRequired={'required'}
          />
          <ReusableDropdownField
            id={"department"}
            name={"department"}
            title={"Department"}
            options={[{key: "", text: "--Select--"},...this.props.items.sort()]}
            onChange={this.onChangeDropDownItem}
            disabled={this.props.currentPage === 3}
            selectedKey={this.props.values.department.key}
            ariaLabelRequired={'required'}
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
            ariaLabelRequired={'required'}
          />
        </div>
      </>
    );
  }
}
