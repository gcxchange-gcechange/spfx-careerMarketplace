/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableDropdownField from "./ReusableDropDownField";
import { Checkbox, ComboBox, IComboBox,  IComboBoxOption,  IComboBoxStyles,  IDropdownOption, Label, Stack, StackItem } from "@fluentui/react";
import { validate  } from "./Validations";
import { SelectLanguage } from "./SelectLanguage";
//import * as strings from "CareerMarketplaceWebPartStrings";
import styles from './CareerMarketplace.module.scss';
import { getLocalizedString, isInvalid } from "./Functions";

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
  hasTouchedSkillCombo?: boolean;
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

public onChangeComboItem = (event: React.FormEvent<IComboBox>,  item?: IComboBoxOption, index?: number, value?: string): void => {

    const selectedValue = item ? item.key : "skills-input";
    const selectedText = item ? item.text : value;


    if (item) {
      this.props.handleDropDownItem("skills", { key: selectedValue, text: selectedText });
    }
  };

  

  public render(): React.ReactElement<IRequirementsProps> {

    
    // const customSpacingStackTokens: IStackTokens = {
    //   childrenGap: 20,
    // };

    const comboBoxStyles: Partial<IComboBoxStyles> = { errorMessage: { margin: '0px', fontWeight: '700' } };

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


    //const languageComprehension = ['readingEN', 'writtenEN', 'oralEN', 'readingFR', 'writtenFR', 'oralFR'];

   
    return (
      <>
        <div>
          {this.props.currentPage === 2 && (
            <>
            <p>
              {this.strings.opportunityRequirements_para1}
            </p>
            <p>
              {this.strings.asteriks}
            </p>
            </>
          )}
        </div>
        <div>
          
          <div>
            <Stack  horizontal verticalAlign="center" >
              <StackItem style={{padding:'5px 0px'}}>
                <Label htmlFor={'skills'} style={{fontWeight: '700'}}>
                  <p className={styles.mrg0}>
                    <span style={{color: 'rgb(164, 38, 44)'}} aria-hidden='true'>
                      *
                    </span>
                    <span className={styles.visuallyHidden}>{this.strings.required}</span>
                    {this.strings.skillsField}
                  </p>
                  <p className={styles.instruction}>{this.strings.skills_description} 
                    {
                    this.props.prefLang === "en-en" 
                    ? <a href="http://www.gcpedia.gc.ca/wiki/GCconnex_Skill_List_des_compténces_se_trouvant_sur_GCconnex?setlang=en&uselang=en" target="_blank" rel="noreferrer">{this.strings.skills_description_link}</a>
                    : <a href="http://www.gcpedia.gc.ca/wiki/GCconnex_Skill_List_des_compténces_se_trouvant_sur_GCconnex?setlang=fr&uselang=fr" target="_blank" rel="noreferrer">{this.strings.skills_description_link}</a>
                    }</p>
                </Label>
              </StackItem>
            </Stack>
            <ComboBox
                id={"skills"}
                options={this.props.skills}
                onChange={this.onChangeComboItem}
                disabled={this.props.currentPage === 3}
                selectedKey={selectedSkillItems}
                autoComplete="on"
                allowFreeform
                multiSelect
                errorMessage={selectedSkillItems.length < 1 && this.props.hasTouchedSkillCombo === true ? getLocalizedString("skills", this.props.prefLang) : undefined}
                styles={comboBoxStyles}
            />

          </div>
      
          <ReusableDropdownField
            id={"workSchedule"}
            name={"workSchedule"}
            title={this.strings.time_in_hours}
            options={[{key:"0", text: `--${this.strings.select}--`}, ...this.props.workSchedule]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.workSchedule.key}
            ariaLabelRequired={this.strings.required}
            ariaInvalid={isInvalid("workSchedule", this.props.inlineFieldErrors)}
            errorMessage={this.props.values.workSchedule.key === "0"  ? getLocalizedString("workSchedule", this.props.prefLang) : undefined}
          />


          <ReusableDropdownField
            id={"province"}
            name={"province"}
            title={this.strings.provinceField}
            options={[{key:"", text: `--${this.strings.select}--`}, ...this.props.province]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.province.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.provinceField_description}
            ariaInvalid={isInvalid("province", this.props.inlineFieldErrors)}
            errorMessage={this.props.values.province.key === ""  ? getLocalizedString("province", this.props.prefLang) : undefined}
          />

          <ReusableDropdownField
            id={"region"}
            name={"region"}
            title={this.strings.regionField}
            options={[{key:"", text: `--${this.strings.select}--`}, ...filteredRegions]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.region.key}
            ariaLabelRequired={this.strings.required}
            ariaInvalid={isInvalid("region", this.props.inlineFieldErrors)}
            errorMessage={this.props.values.region.key === ""  ? getLocalizedString("region", this.props.prefLang) : undefined}
          />

          <ReusableDropdownField
            id={"city"}
            name={"city"}
            title={this.strings.cityField}
            options={[{key:"", text: `--${this.strings.select}--`}, ...filteredCities]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.city.key}
            ariaLabelRequired={this.strings.required}
            ariaInvalid={isInvalid("city", this.props.inlineFieldErrors)}
            errorMessage={this.props.values.city.key === ""  ? getLocalizedString("city", this.props.prefLang) : undefined}
          />


          <ReusableDropdownField
            id={"security"}
            name={"security"}
            title={this.strings.security_level}
            options={[{key:"", text: `--${this.strings.select}--`}, ...this.props.security]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.security.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.security_level_description}
            ariaInvalid={isInvalid("security", this.props.inlineFieldErrors)}
            errorMessage={this.props.values.security.key === ""  ? getLocalizedString("security", this.props.prefLang) : undefined}
            
          />

          <ReusableDropdownField
            id={"language"}
            name={"language"}
            title={this.strings.language_requirements}
            options={this.props.language}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.languageRequirements[0].language.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.language_requirements_description}
            ariaInvalid={isInvalid("language", this.props.inlineFieldErrors)}
            errorMessage={this.props.values.languageRequirements[0].language.key === ""  ? getLocalizedString("language", this.props.prefLang) : undefined}
              
          />

         
            <ReusableDropdownField
              id={"readingEN"}
              name={"readingEN"}
              title={this.strings.readingEN}
              options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
              disabled={disabledField}
              onChange={this.onChangeDropDownItem}
              ariaLabelRequired={this.strings.required}
              selectedKey={this.props.values.languageRequirements[0].readingEN.key}
              errorMessage={this.props.values.languageRequirements[0].readingEN.key === ""  ? getLocalizedString("languageRequirements_readingEN", this.props.prefLang) : undefined}

            />

            <ReusableDropdownField
              id={"writtenEN"}
              name={"writtenEN"}
              title={this.strings.writtenEN}
              options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
              disabled={disabledField}
              ariaLabelRequired={this.strings.required}
              onChange={this.onChangeDropDownItem}
              selectedKey={this.props.values.languageRequirements[0].writtenEN.key}
              errorMessage={this.props.values.languageRequirements[0].writtenEN.key === ""  ? getLocalizedString("languageRequirements_writtenEN", this.props.prefLang) : undefined}
            />
        
           <ReusableDropdownField
              id={"oralEN"}
              name={"oralEN"}
              title= {this.strings.oralEN}
              options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
              ariaLabelRequired={this.strings.required}
              disabled={disabledField}
              onChange={this.onChangeDropDownItem}
              selectedKey={this.props.values.languageRequirements[0].oralEN.key}
              errorMessage={this.props.values.languageRequirements[0].oralEN.key === ""  ? getLocalizedString("languageRequirements_oralEN", this.props.prefLang) : undefined}
            />
          
            <ReusableDropdownField
              id={"readingFR"}
              name={"readingFR"}
              title={this.strings.readingFR}
              options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
              ariaLabelRequired={this.strings.required}
              disabled={disabledField}
              onChange={this.onChangeDropDownItem}
              selectedKey={this.props.values.languageRequirements[0].readingFR.key}
              errorMessage={this.props.values.languageRequirements[0].readingFR.key === ""  ? getLocalizedString("languageRequirements_readingFR", this.props.prefLang) : undefined}
            />

            <ReusableDropdownField
              id={"writtenFR"}
              name={"writtenFR"}
              title={this.strings.writtenFR}
              options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
              ariaLabelRequired={this.strings.required}
              disabled={disabledField}
              onChange={this.onChangeDropDownItem}
              selectedKey={this.props.values.languageRequirements[0].writtenFR.key}
              errorMessage={this.props.values.languageRequirements[0].writtenFR.key === ""  ? getLocalizedString("languageRequirements_writtenFR", this.props.prefLang) : undefined}
            />

            <ReusableDropdownField
              id={"oralFR"}
              name={"oralFR"}
              title={this.strings.oralFR}
              options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
              ariaLabelRequired={this.strings.required}
              disabled={disabledField}
              onChange={this.onChangeDropDownItem}
              selectedKey={this.props.values.languageRequirements[0].oralFR.key}
              errorMessage={this.props.values.languageRequirements[0].oralFR.key === ""  ? getLocalizedString("languageRequirements_oralFR", this.props.prefLang) : undefined}
              
            />
         

          <ReusableDropdownField
            id={"workArrangment"}
            name={"workArrangment"}
            title={this.strings.work_arrangment}
            options={[{key:"", text: `--${this.strings.select}--`}, ...this.props.workArrangment]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.workArrangment.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.work_arrangment_description}
            ariaInvalid={isInvalid("workArrangment", this.props.inlineFieldErrors)}
            errorMessage={this.props.values.workArrangment.key === "" ? getLocalizedString("workArrangment", this.props.prefLang) : undefined}
          />
            {/* { this.props.inlineFieldErrors?.includes('workArrangment') && (
                validate(this.props.values.workArrangment.key, this.props.prefLang, "workArrangment")
              )
            } */}

          <div style={{marginTop: '10px'}}>
            <Stack  horizontal verticalAlign="center" >
              <StackItem >
                <Label htmlFor={'deadline'} >
                  <span style={{color: 'rgb(164, 38, 44)'}} aria-label={this.strings.required}>
                    *
                  </span>
                  {this.strings.approved_staffing}
                </Label>
                <p className={styles.instruction}>{this.strings.approved_staffing_description}</p>
              </StackItem>
            </Stack>


            <Checkbox 
              id='1' 
              name={"approvedStaffing"} 
              label={this.strings.approved_staffing_checkbox} 
              onChange={ this.onChange } 
              defaultChecked={this.props.values.approvedStaffing.value} 
              disabled={isReadOnly}
              aria-invalid={isInvalid("approvedStaffing", this.props.inlineFieldErrors)}
            />

            { this.props.inlineFieldErrors?.includes('approvedStaffing') && (
                validate(this.props.values.approvedStaffing.key,  this.props.prefLang, 'deadline')
              )
            }
          </div>

        </div>
      </>
    );
  }
}
