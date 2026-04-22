/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import { ComboBox, IComboBox, IComboBoxOption,  IComboBoxStyles,   IDropdownOption, ILabelStyles, Label, Stack, StackItem } from "@fluentui/react";
import { SelectLanguage } from './SelectLanguage';
import styles from './CareerMarketplace.module.scss';
import { getLocalizedString, isInvalid } from "./Functions";
import { validateEmail  } from "./Validations";


export interface IPosterInfoProps {
  prefLang: string;
  handleDropDownItem: (event: any, item: any) => void;
  handleOnChange: (event: string, newValue?: string) => void;
  items: IDropdownOption[];
  userInfo: string;
  currentPage: number;
  readOnly: boolean;
  jobOpportunityId: string | undefined;
  values: {
    applyEmail: {value: string, pageNumber: number};
    department: {key: string, text: string, pageNumber: number};
  };
  errorMessage?:(value: string | number) => string | undefined;
  fields: string[];
  inlineFieldErrors: any[];
  workEmail: string;
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

    public  onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>, value: any): void => {
      const eventName = event.target.name;
      const inputValue = value;

        this.props.handleOnChange(eventName, inputValue);
      
    }
  
    

  public render(): React.ReactElement<IPosterInfoProps> {


    const comboBoxStyles: Partial<IComboBoxStyles> = { 
      errorMessage: { margin: "0px", fontWeight: "700", paddingLeft: '5px', marginTop: "4px", borderLeft: "2px solid rgb(164, 38, 44)", },
      callout: {vh: "50%"}
    }


    const comboBoxOptions: IComboBoxOption[] = this.props.items.map((item:any) => ({
      ...item,
      styles: {
        optionText: {
          overflow: 'visible',
          whiteSpace: 'normal',
        },
      },
    }))

    const labelSpacing: Partial<ILabelStyles> = {
      root:{
        padding:'0px 0px 8px 0px'
      }
    }

    const onRenderAppEmailDescription = ( ): JSX.Element => {

      return (
         <> {this.strings.apply_Email_Instructions}<span><strong>{this.strings.apply_Email_Instructions_bold}</strong></span>{this.strings.apply_Email_Instructions_b}  </> 
      );
    };


    return (
      <>
          {this.props.currentPage === 1 && (
            <>
            <p>
              {this.strings.careerOpportunitiesOnly_1}<strong>{this.strings.careerOpportunitiesOnly_2}</strong>{this.strings.careerOpportunitiesOnly_3}
            </p>
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
            readOnly={true}
            ariaLabelRequired={'required'}
          />

     
          <Stack  horizontal verticalAlign="center" style={{marginTop:'16px'}}>
            <StackItem >
              <Label id={"department-label"} htmlFor={'department'} style={{ fontWeight: '700'}} styles={labelSpacing}>
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
            placeholder={this.strings.selectOrType}
            useComboBoxAsMenuWidth={true}
          />

            <ReusableTextField
            id={"workEmail"}
            name={"workEmail"}
            title={this.strings.workEmail}
            defaultValue={this.props.workEmail}
            readOnly={true}
            disabled={this.props.currentPage === 3}
            ariaLabelRequired={'required'}
          />
       

          <ReusableTextField
            id={"applyEmail"}
            name={"applyEmail"}
            title={this.strings.apply_Email}
            defaultValue={this.props.workEmail}
            disabled={this.props.currentPage === 3}
            ariaLabelRequired={'required'}
            onChange={this.onChangeEmail}
            onRenderInstruction = {onRenderAppEmailDescription}
            onGetErrorMessage={() => validateEmail(this.props.values.applyEmail.value, this.props.prefLang, "applyEmail" )}
          />
       
      </>
    );
  }
}
