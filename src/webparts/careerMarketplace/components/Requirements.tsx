/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableDropdownField from "./ReusableDropDownField";
import { Checkbox, Dropdown,  IDropdownOption, IDropdownStyles, IStackTokens, Label, Stack, StackItem } from "@fluentui/react";
import { validate  } from "./Validations";
import { SelectLanguage } from "./SelectLanguage";
import * as strings from "CareerMarketplaceWebPartStrings";


export interface IRequirementsProps {
  prefLang: string;
  language: any[];
  city: any[];
  province: any[];
  region: any[];
  security: any[];
  workArrangment: any[];
  workSchedule: any[];
  skills: any[];
  currentPage: number;
  handleDropDownItem: (event: any, item: any) => void;
  handleOnChange: (event: string, newValue?: string) => void;
  checkedTerms:(event:any, isChecked?: boolean) => void;
  values: {
    skills: any;
    approvedStaffing: any;
    security: any;
    city: any;
    province: any;
    region: any;
    workArrangment: any;
    workSchedule: any;
    languageRequirements: any[];
  };

  inlineFieldErrors?:string[];
}

export default class Requirements extends React.Component<IRequirementsProps> {

  public strings = SelectLanguage(this.props.prefLang);

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>, value: any): void => {
    const eventName = event.target.name;

      this.props.handleOnChange(eventName, value)
    
  };

  public onChangeDropDownItem = (event: any, item: any): void => {
    const eventName = event.target.id;

    if (item) {
      this.props.handleDropDownItem(eventName, item);
    }
  };

  public onChange = ( event: React.ChangeEvent<HTMLInputElement>, isChecked:boolean ): void => {
    const eventName = event.target.id;
    
    if(isChecked === true) {
      this.props.checkedTerms( eventName, isChecked) 
    }
}

  

  public render(): React.ReactElement<IRequirementsProps> {

    const customSpacingStackTokens: IStackTokens = {
      childrenGap: 20,
    };

    const isReadOnly = this.props.currentPage === 3;
    const filteredRegions = this.props.region.filter ((item) => item.provinceId === this.props.values.province.key);
    const filteredCities = this.props.city.filter((item) => item.regionID === this.props.values.region.key);
    const disabledField = this.props.values.languageRequirements[0].language.key !== 3  || this.props.currentPage === 3;
    const selectedSkillItems =  this.props.values.skills.map((item: any) => item.value).filter((item: any) => item !== undefined)


    const languageEvaluationOptions : IDropdownOption[] = [
      {key: 0, text: 'A'},
      {key: 1, text: 'B'},
      {key: 2, text: 'C'},
      {key: 3, text: 'E'}
    ]

    const langDropdownStyle : Partial<IDropdownStyles>= {
      dropdown: {
        width: 100,
        paddingBottom: '5px',
      },
      root: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      },
    }

    const languageComprehension = ['readingEN', 'writtenEN', 'oralEN', 'readingFR', 'writtenFR', 'oralFR'];

    console.log("values-3", this.props.values)
    return (
      <>
        <div>
          {this.props.currentPage === 2 && (
            <p>
              {this.strings.opportunityRequirements_para1}
            </p>
          )}
        </div>
        <div>
          
          <ReusableDropdownField
            id={"skills"}
            name={"skills"}
            title={this.strings.skills}
            onChange={this.onChangeDropDownItem}
            options={this.props.skills}
            selectedKeys={selectedSkillItems}
            disabled={isReadOnly}
            multiselect
            ariaLabelRequired={'required'}
          />

          { this.props.inlineFieldErrors?.includes('skills') && (
                <div>{validate(selectedSkillItems)}</div>
              )
            }
      
          <ReusableDropdownField
            id={"workSchedule"}
            name={"workSchedule"}
            title={this.strings.time_in_hours}
            options={[{key:"", text: `--${this.strings.select}--`}, ...this.props.workSchedule]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.workSchedule.key}
            ariaLabelRequired={this.strings.required}
          />

            { this.props.inlineFieldErrors?.includes('workSchedule') && (
                <div>{validate(this.props.values.workSchedule.key)}</div>
              )
            }
          <ReusableDropdownField
            id={"province"}
            name={"province"}
            title={this.strings.province}
            options={[{key:"", text: `--${this.strings.select}--`}, ...this.props.province]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.province.key}
            ariaLabelRequired={this.strings.required}
          />

           { this.props.inlineFieldErrors?.includes('province') && (
                <div>{validate(this.props.values.province.key)}</div>
              )
            }

          <ReusableDropdownField
            id={"region"}
            name={"region"}
            title={this.strings.region}
            options={[{key:"", text: `--${this.strings.select}--`}, ...filteredRegions]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.region.key}
            ariaLabelRequired={this.strings.required}
          />

          { this.props.inlineFieldErrors?.includes('region') && (
                <div>{validate(this.props.values.region.key)}</div>
              )
          }

          <ReusableDropdownField
            id={"city"}
            name={"city"}
            title={this.strings.city}
            options={[{key:"", text: `--${this.strings.select}--`}, ...filteredCities]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.city.key}
            ariaLabelRequired={this.strings.required}
          />

           { this.props.inlineFieldErrors?.includes('city') && (
                <div>{validate(this.props.values.city.key)}</div>
              )
            }

          <ReusableDropdownField
            id={"security"}
            name={"security"}
            title={this.strings.security_level}
            options={[{key:"", text: `--${this.strings.select}--`}, ...this.props.security]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.security.key}
            ariaLabelRequired={this.strings.required}
          />

           { this.props.inlineFieldErrors?.includes('security') && (
                <div>{validate(this.props.values.security.key)}</div>
              )
            }
          <Stack tokens={customSpacingStackTokens}>
            <StackItem>
              <ReusableDropdownField
                id={"language"}
                name={"language"}
                title={this.strings.language_requirements}
                options={this.props.language}
                onChange={this.onChangeDropDownItem}
                disabled={isReadOnly}
                selectedKey={this.props.values.languageRequirements[0].language.key}
                ariaLabelRequired={this.strings.required}
              />
               { this.props.inlineFieldErrors?.includes('language') && (
                <div>{validate(this.props.values.languageRequirements[0].language.key)}</div>
              )
            }
            </StackItem>

            <StackItem>
              <Stack horizontal tokens={customSpacingStackTokens}>
                    
                  <StackItem>
                    <Stack horizontal verticalAlign="end">
                      <Label htmlFor={'readingEn'} style={{width:'200px'}} >{this.props.prefLang === 'fr-fr' ? this.strings.readingEN.replace(/\s\w+$/, "") : this.strings.readingEN.replace(/^\w+\s/, "")}</Label>
                      <Dropdown
                        id={"readingEN"}
                        title={"Reading comprehension"}
                        label={this.strings.english.replace(/[()]/g, "").replace(/^./, c => c.toUpperCase())}
                        options={languageEvaluationOptions}
                        styles={langDropdownStyle}
                        disabled={disabledField}
                        onChange={this.onChangeDropDownItem}
                        selectedKey={this.props.values.languageRequirements[0].readingEN.key}
                      />
                    </Stack>
                    <Stack horizontal>
                      <Label style={{width:'200px'}}>{this.props.prefLang === 'fr-fr' ? this.strings.writtenEN.replace(/\s\w+$/, "") : this.strings.writtenEN.replace(/^\w+\s/, "")}</Label>
                      <Dropdown
                        id={"writtenEN"}
                        title={this.strings.writtenEN}
                        options={languageEvaluationOptions}
                        styles={langDropdownStyle}
                        disabled={disabledField}
                        onChange={this.onChangeDropDownItem}
                        selectedKey={this.props.values.languageRequirements[0].writtenEN.key}
                      />
                    </Stack>
                    <Stack horizontal>
                      <Label style={{width:'200px'}}>{this.props.prefLang === 'fr-fr' ? this.strings.oralEN.replace(/\s\w+$/, "") : this.strings.oralEN.replace(/^\w+\s/, "")}</Label>
                      <Dropdown
                        id={"oralEN"}
                        title = {"Oral expression"}
                        options={languageEvaluationOptions}
                        styles={langDropdownStyle}
                        disabled={disabledField}
                        onChange={this.onChangeDropDownItem}
                        selectedKey={this.props.values.languageRequirements[0].oralEN.key}
                      />
                    </Stack>
                  </StackItem>

                  <StackItem>
                    {/* <Label>French</Label> */}
                    <Dropdown
                        id={"readingFR"}
                        options={languageEvaluationOptions}
                        //title={this.strings.readingFR}
                        label={this.strings.french.replace(/[()]/g, "").replace(/^./, c => c.toUpperCase())}
                        styles={langDropdownStyle}
                        ariaLabel={this.strings.readingFR}
                        disabled={disabledField}
                        onChange={this.onChangeDropDownItem}
                        selectedKey={this.props.values.languageRequirements[0].readingFR.key}
                    />
                    <Dropdown
                        id={"writtenFR"}
                        options={languageEvaluationOptions}
                        styles={langDropdownStyle}
                        ariaLabel={strings.writtenFR}
                        disabled={disabledField}
                        onChange={this.onChangeDropDownItem}
                        selectedKey={this.props.values.languageRequirements[0].writtenFR.key}
                    />
                    <Dropdown
                        id={"oralFR"}
                        options={languageEvaluationOptions}
                        styles={langDropdownStyle}
                        ariaLabel={strings.oralFR}
                        disabled={disabledField}
                        onChange={this.onChangeDropDownItem}
                        selectedKey={this.props.values.languageRequirements[0].oralFR.key}
                    />
                    
                  </StackItem>
              </Stack>
            {
              languageComprehension
                .filter((lang) => this.props.inlineFieldErrors?.includes(lang))
                .some((field) => validate(this.props.values.languageRequirements[0]?.[field].text)) && (
                  <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                      <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>Please select an option</p>
                   </div>
                )
            }

            </StackItem>    
          </Stack>
         

          <ReusableDropdownField
            id={"workArrangment"}
            name={"workArrangment"}
            title={this.strings.work_arrangment}
            options={[{key:"", text: `--${this.strings.select}--`}, ...this.props.workArrangment]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.workArrangment.key}
            ariaLabelRequired={this.strings.required}
          />
            { this.props.inlineFieldErrors?.includes('workArrangment') && (
                <div>{validate(this.props.values.workArrangment.key)}</div>
              )
            }

          <div style={{marginTop: '10px'}}>
            <Stack  horizontal verticalAlign="center" >
              <StackItem >
                <Label htmlFor={'deadline'} >
                  <span style={{color: 'rgb(164, 38, 44)'}} aria-label={this.strings.required}>
                    *
                  </span>
                  {this.strings.approved_staffing}
                </Label>
              </StackItem>
            </Stack>


             <Checkbox id='1' name={"approvedStaffing"} label={"Yes"} onChange={ this.onChange } defaultChecked={this.props.values.approvedStaffing.value} disabled={isReadOnly}/>

            { this.props.inlineFieldErrors?.includes('approvedStaffing') && (
                <div>{validate(this.props.values.approvedStaffing.key)}</div>
              )
            }
          </div>

        </div>
      </>
    );
  }
}
