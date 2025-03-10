/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import ReusableDropdownField from "./ReusableDropDownField";
import { IDropdownOption } from "@fluentui/react";
import { validate } from "./Validations";
import { SelectLanguage } from './SelectLanguage';


export interface IPosterInfoProps {
  prefLang: string;
  handleDropDownItem: (event: any, item: any) => void;
  items: IDropdownOption[];
  userInfo: string;
  workEmail: string;
  currentPage: number;
  readOnly: boolean;
  jobOpportunityId: string;
  values: {
    department: any;
  };
  errorMessage?:(value: string | number) => string | undefined;
  fields: string[];
  inlineFieldErrors: any[];
}

export default class PosterInfo extends React.Component<IPosterInfoProps> {
  
  public strings = SelectLanguage(this.props.prefLang);
  
  public onChangeDropDownItem = (event: any, item: IDropdownOption): void => {
    const eventName = event.target.id;

    if (item) {
      this.props.handleDropDownItem(eventName, item);
    }
  };

  public render(): React.ReactElement<IPosterInfoProps> {
    const isReadOnly = this.props.currentPage === 0;

    return (
      <>
        <div>
          {this.props.currentPage === 0 && (
            <>
            <p>
              {this.strings.posterInformation_para1}
            </p>
            <p>
              {this.strings.asteriks}
            </p>
          </>
          )}
        </div>
        <div>
          <ReusableTextField
            id={"contactName"}
            name={"contactName"}
            title={this.strings.fullName}
            defaultValue={this.props.userInfo}
            readOnly={isReadOnly}
            disabled={this.props.currentPage === 3}
            ariaLabelRequired={'required'}
          />
          <ReusableDropdownField
            id={"department"}
            name={"department"}
            title={this.strings.department}
            options={[{key: "", text: `--${this.strings.select}--`},...this.props.items.sort()]}
            onChange={this.onChangeDropDownItem}
            disabled={this.props.currentPage === 3}
            selectedKey={ this.props.values.department.key}
            ariaLabelRequired={'required'}
          />
          {this.props.inlineFieldErrors.includes('department') &&( 
            <div>{validate(this.props.values.department.key)}</div>
          )}

          <ReusableTextField
            id={"workEmail"}
            name={"workEmail"}
            title={this.strings.workEmail}
            defaultValue={this.props.workEmail}
            readOnly={isReadOnly}
            disabled={this.props.currentPage === 3}
            ariaLabelRequired={'required'}
          />
        </div>
      </>
    );
  }
}
