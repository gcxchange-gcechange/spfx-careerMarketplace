/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable no-prototype-builtins */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import { ComboBox, IComboBox, IComboBoxOption,  IComboBoxStyles,   IDropdownOption, Label, Stack, StackItem } from "@fluentui/react";
import { SelectLanguage } from './SelectLanguage';
import styles from './CareerMarketplace.module.scss';
import { getLocalizedString, isInvalid } from "./Functions";
//import Downshift from 'downshift';


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

  //private textareaRef = React.createRef<HTMLTextAreaElement>();
  
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

    // const resizeTextarea = ():void => {
    //   const el = this.textareaRef.current;
    //   if (el) {
    //     el.style.height = 'auto';
    //     el.style.height = el.scrollHeight + 'px';
    //   }
    // };

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
          />
{/* 
      <Downshift
        inputValue={this.props.values.department.text}
        onChange={(selectedItem) => {
          if(selectedItem) {
            this.props.handleDropDownItem('department', selectedItem)
          }
        }}
      >
        {({
          getInputProps,
          getItemProps,
          getMenuProps,
          getLabelProps,
          getRootProps,
          isOpen,
          highlightedIndex,
           getToggleButtonProps,
        }) => (
          <div {...getRootProps({}, { suppressRefError: true })} style={{ position: 'relative' }}>
            <Stack horizontal verticalAlign="center">
              <StackItem>
                <Label
                  id="department-label"
                  htmlFor="department"
                  style={{ padding: '5px 0px', fontWeight: '700' }}
                  {...getLabelProps()}
                >
                  <p className={styles.mrg0}>
                    <span aria-hidden="true" style={{ color: 'rgb(164, 38, 44)' }}>*</span>
                    <span className={styles.visuallyHidden}>{this.strings.required}</span>
                    {this.strings.departmentField}
                  </p>
                </Label>
              </StackItem>
            </Stack>

          <div style={{ position: 'relative' }}>
            <div style={{ position: 'relative' }}>
              <textarea
                ref={this.textareaRef}
                {...getInputProps({
                  onInput: resizeTextarea,
                  onFocus: resizeTextarea,
                  disabled: this.props.currentPage === 3,
                  rows: 1,
                })}
                aria-labelledby="department-label"
                aria-invalid={this.props.values.department.key === '0'}
                style={{
                  width: '100%',
                  resize: 'none',
                  padding: '8px 0px',
                  fontSize: '14px',
                  textIndent: '8px',
                  borderRadius: '2px',
                  border: '1px solid light-dark(rgb(118, 118, 118),',
                  whiteSpace: 'pre-wrap',
                  wordBreak: 'break-word',
                  overflow: 'hidden',
                }}
              />
              <div style={{ position: 'absolute', right: 4, top: 4 }}>
                  <IconButton
                    iconProps={{ iconName: 'ChevronDown' }}
                    {...getToggleButtonProps()}
                    ariaLabel="Show options"
                    styles={{ root: { padding: 4, height: 24, width: 24, fontSize: 12, color: 'rgb(96, 94, 92)' } }}
                  />
              </div>
            </div>

            {this.props.values.department.key === '0' && (
              <div style={{ color: 'rgb(164, 38, 44)', fontSize: '12px', marginTop: '4px' }}>
                {getLocalizedString('department', this.props.prefLang)}
              </div>
            )}

          </div>
            <ul
              {...getMenuProps()}
              style={{
                listStyle: 'none',
                padding: 0,
                margin: 0,
                
                maxHeight: 150,
                overflowY: 'auto',
                backgroundColor: 'white',
                position: 'absolute',
                width: '100%',
                zIndex: 10,
              }}
            >
              {isOpen &&
                this.props.items.map((item, index) => (
                  <li
                    key={item.key}
                    {...getItemProps({ item, index })}
                    style={{
                      padding: '8px',
                      backgroundColor:
                      highlightedIndex === index ? '#eaeaea' : 'white',
                      cursor: 'pointer',
                    }}
                  >
                    {item.text}
                  </li>
                ))}
            </ul>
          </div>
        )}
      </Downshift> */}
      
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
