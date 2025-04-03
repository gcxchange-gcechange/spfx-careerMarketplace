/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
//import ReusableDropdownField from "./ReusableDropDownField";
import { ComboBox, IComboBox, IComboBoxOption, IDropdownOption, Label, Stack, StackItem } from "@fluentui/react";
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
    console.log("ITEM:",item)
    const eventName = event.target.id;

    if (item) {
      this.props.handleDropDownItem(eventName, item);
    }
  };

  public onChangeComboItem = (event: React.FormEvent<IComboBox>,  item?: IComboBoxOption, index?: number, value?: string): void => {

    const selectedValue = item ? item.key : "department-input";
    const selectedText = item ? item.text : value;


    if (item) {
      this.props.handleDropDownItem("department", { key: selectedValue, text: selectedText });
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

        <div>
          <Stack  horizontal verticalAlign="center" >
            <StackItem >
              <Label htmlFor={'duration'} style={{padding:'5px 0px', fontWeight: '700'}}>
                <span style={{color: 'rgb(164, 38, 44)'}} aria-label={this.strings.required}>
                  *
                </span>
                {this.strings.departmentField}
              </Label>
            </StackItem>
          </Stack>
          <ComboBox
              id={"department"}
              options={[{key: "", text: `--${this.strings.select}--`},...this.props.items.sort()]}
              onChange={this.onChangeComboItem}
              disabled={this.props.currentPage === 3}
              selectedKey={ this.props.values.department.key}
              autoComplete="on"
              allowFreeform
          />
           {this.props.inlineFieldErrors.includes('department') &&( 
            <div>{validate(this.props.values.department.key, this.props.prefLang)}</div>
          )} 
          </div>
          {/* <ReusableDropdownField
            id={"department"}
            name={"department"}
            title={this.strings.departmentField}
            options={[{key: "", text: `--${this.strings.select}--`},...this.props.items.sort()]}
            onChange={this.onChangeDropDownItem}
            disabled={this.props.currentPage === 3}
            selectedKey={ this.props.values.department.key}
            ariaLabelRequired={'required'}
          />
          {this.props.inlineFieldErrors.includes('department') &&( 
            <div>{validate(this.props.values.department.key, this.props.prefLang)}</div>
          )} */}

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
