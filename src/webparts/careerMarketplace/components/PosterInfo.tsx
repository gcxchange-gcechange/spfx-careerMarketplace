/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import { ComboBox, IComboBox, IComboBoxOption,  IComboBoxStyles,   IDropdownOption, Label, Stack, StackItem } from "@fluentui/react";
import { SelectLanguage } from './SelectLanguage';
import styles from './CareerMarketplace.module.scss';
import { getLocalizedString, isInvalid } from "./Functions";


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

  public onChangeComboItem = (event: React.FormEvent<IComboBox>,  item?: IComboBoxOption, index?: number, value?: string): void => {

    const selectedValue = item ? item.key : "department-input";
    const selectedText = item ? item.text : value;


    if (item) {
      this.props.handleDropDownItem("department", { key: selectedValue, text: selectedText });
    }
  };



  public render(): React.ReactElement<IPosterInfoProps> {


    const comboBoxStyles: Partial<IComboBoxStyles> = { 
      errorMessage: { margin: '0px', fontWeight: '700', borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px' },
      callout: {vh: "50%"}
    }

    const isReadOnly = this.props.currentPage === 0;


    const comboBoxOptions: IComboBoxOption[] = this.props.items.map((item:any) => ({
      ...item,
      styles: {
        optionText: {
          overflow: 'visible',
          whiteSpace: 'normal',
        },
      },
    }))


    return (
      <>
        
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
     
     
          <ReusableTextField
            id={"contactName"}
            name={"contactName"}
            title={this.strings.fullName}
            defaultValue={this.props.userInfo}
            readOnly={isReadOnly}
            disabled={this.props.currentPage === 3}
            ariaLabelRequired={'required'}
          />

     
          <Stack  horizontal verticalAlign="center" >
            <StackItem >
              <Label id={"department-label"} htmlFor={'department'} style={{padding:'5px 0px', fontWeight: '700'}} >
                <p className={styles.mrg0}>
                  <span aria-hidden="true" style={{color: 'rgb(164, 38, 44)'}}>*</span>
                  <span className={styles.visuallyHidden}>{this.strings.required}</span>
                  {this.strings.departmentField}
                </p>
              </Label>
            </StackItem>
          </Stack>
          <ComboBox
              id={"department"}
              aria-labelledby={"department-label"}
              options={[{key: "0", text: `--${this.strings.select}--`}, ...comboBoxOptions.sort()] }
              onChange={this.onChangeComboItem}
              disabled={this.props.currentPage === 3}
              selectedKey={ this.props.values.department.key}
              autoComplete="on"
              allowFreeform
              errorMessage={this.props.values.department.key === "0"  ? getLocalizedString("department", this.props.prefLang): undefined}
              styles={comboBoxStyles}
              aria-invalid = {isInvalid("department", this.props.inlineFieldErrors)}
              useComboBoxAsMenuWidth={true}
          />
      
          <ReusableTextField
            id={"workEmail"}
            name={"workEmail"}
            title={this.strings.workEmail}
            defaultValue={this.props.workEmail}
            readOnly={isReadOnly}
            disabled={this.props.currentPage === 3}
            ariaLabelRequired={'required'}
          />
       
      </>
    );
  }
}
