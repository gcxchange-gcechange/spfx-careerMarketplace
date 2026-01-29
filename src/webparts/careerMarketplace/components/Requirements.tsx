/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableDropdownField from "./ReusableDropDownField";
import { ComboBox, IComboBox,  IComboBoxOption,  IComboBoxStyles,  IDropdownOption, Label, Link, Stack, StackItem } from "@fluentui/react";
import { validate  } from "./Validations";
import { SelectLanguage } from "./SelectLanguage";
import styles from './CareerMarketplace.module.scss';
import { getLocalizedString  } from "./Functions";

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
  checkedField:(event:any, isChecked?: boolean) => void;
  values: {
    skills: any;
    // approvedStaffing: any;
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

  // public onChange = ( event: React.ChangeEvent<HTMLInputElement>, isChecked:boolean ): void => {
  //   const eventName = event.target.id;
    
  //   if(isChecked === true) {
  //     this.props.checkedField( eventName, isChecked) 
  //   }
  // }

  public onChangeComboItem = (event: React.FormEvent<IComboBox>,  item?: IComboBoxOption, index?: number, value?: string): void => {

    const selectedValue = item ? item.key : "skills-input";
    const selectedText = item ? item.text : value;

    if (item) {
      this.props.handleDropDownItem("skills", { key: selectedValue, text: selectedText });
    }
  };

  

  public render(): React.ReactElement<IRequirementsProps> {


    const comboBoxStyles: Partial<IComboBoxStyles> = { 
      errorMessage: { margin: '0px', fontWeight: '700', borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px' }, 
       callout: {
        '@media only screen and (min-width: 480px)': {
            maxHeight: 'calc(100vh - 500px) !important'
        }
      }, 
      input:{color: "black"}
    };

    
    const filteredRegions = this.props.region.filter ((item) => item.provinceId === this.props.values.province.key);
    const filteredCities = this.props.city.filter((item) => item.regionID === this.props.values.region.key);
    const disabledField = this.props.values.languageRequirements[0].language.key !== 3  || this.props.currentPage === 4;
    const selectedSkillItems =  this.props.values.skills.map((item: any) => item.value).filter((item: any) => item !== undefined);

    const skillItems = this.props.skills.map((item: any) => ({
      ...item,
      styles: {
        optionText: { overflow: 'visible', whiteSpace: 'normal' },
      }
    })); 


    const languageEvaluationOptions : IDropdownOption[] = [
      {key: 0, text: 'A'},
      {key: 1, text: 'B'},
      {key: 2, text: 'C'},
      {key: 3, text: 'E'}
    ]

    return (
      <>
        <div>
          {this.props.currentPage === 3 && (
            <>
            <p>
              {this.strings.careerOpportunitiesOnly_1}<strong>{this.strings.careerOpportunitiesOnly_2}</strong>{this.strings.careerOpportunitiesOnly_3}
            </p>
            <p>
              {this.strings.opportunityRequirements_para1}
            </p>
            <p>
              {this.strings.asteriks}
            </p>
            </>
          )}
        </div>
        <form>
          
          <div>
            <Stack  horizontal verticalAlign="center" >
              <StackItem style={{padding:'5px 0px'}}>
                <Label htmlFor={'skills'} id={"skills-label"} style={{fontWeight: '700'}}>
                  <p className={styles.mrg0}>
                    <span style={{color: 'rgb(164, 38, 44)'}} aria-hidden='true'>
                      *
                    </span>
                    <span className={styles.visuallyHidden}>{this.strings.required}</span>
                    {this.strings.skillsField}
                  </p>
                  <p className={styles.instruction}>{this.strings.skills_description} 
                    {
                    <Link underline={true} href="https://www.gcpedia.gc.ca/wiki/GCconnex_Skill_List_-_Liste_des_comp%C3%A9tences_se_trouvant_sur_GCconnex" target="_blank" rel="noreferrer">
                      {this.strings.skills_description_link}
                    </Link>
                    }</p>
                </Label>
              </StackItem>
            </Stack>
            <ComboBox
                id={"skills"}
                aria-labelledby={"skills-label"}
                options={skillItems}
                onChange={this.onChangeComboItem}
                disabled={this.props.currentPage === 4}
                selectedKey={selectedSkillItems}
                autoComplete="on"
                allowFreeform
                multiSelect
                errorMessage={selectedSkillItems.length < 1 && this.props.hasTouchedSkillCombo === true ? getLocalizedString("skills", this.props.prefLang) : undefined}
                styles={comboBoxStyles}
                placeholder={this.strings.selectOrType}
                useComboBoxAsMenuWidth={true}

            />
               {
                this.props.inlineFieldErrors?.includes('skills') && (
                  validate(selectedSkillItems, this.props.prefLang,"skills")
                )
                
              }

          </div>
      
          <ReusableDropdownField
            id={"workSchedule"}
            name={"workSchedule"}
            title={this.strings.time_in_hours}
            options={[{key:"0", text: `--${this.strings.select}--`}, ...this.props.workSchedule]}
            onChange={this.onChangeDropDownItem}
            disabled={this.props.currentPage === 4}
            selectedKey={this.props.values.workSchedule.key}
            ariaLabelRequired={this.strings.required}
            errorMessage={this.props.values.workSchedule.key === "0"  ? getLocalizedString("workSchedule", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
          />

          <ReusableDropdownField
            id={"workArrangment"}
            name={"workArrangment"}
            title={this.strings.work_arrangment}
            options={[{key:"", text: `--${this.strings.select}--`}, ...this.props.workArrangment]}
            onChange={this.onChangeDropDownItem}
            disabled={this.props.currentPage === 4}
            selectedKey={this.props.values.workArrangment.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.work_arrangment_description}
            errorMessage={this.props.values.workArrangment.key === "" ? getLocalizedString("workArrangment", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
          />


          <ReusableDropdownField
            id={"province"}
            name={"province"}
            title={this.strings.provinceField}
            options={[{key:"0", text: `--${this.strings.select}--`}, ...this.props.province]}
            onChange={this.onChangeDropDownItem}
            disabled={this.props.currentPage === 4}
            selectedKey={this.props.values.province.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.provinceField_description}
            errorMessage={this.props.values.province.key === "0"  ? getLocalizedString("province", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
          />

          <ReusableDropdownField
            id={"region"}
            name={"region"}
            title={this.strings.regionField}
            options={[{key:"0", text: `--${this.strings.select}--`}, ...filteredRegions]}
            onChange={this.onChangeDropDownItem}
            disabled={this.props.currentPage === 4}
            selectedKey={this.props.values.region.key}
            ariaLabelRequired={this.strings.required}
            errorMessage={this.props.values.region.key === "0"  ? getLocalizedString("region", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
          />

          <ReusableDropdownField
            id={"city"}
            name={"city"}
            title={this.strings.cityField}
            options={[{key:"0", text: `--${this.strings.select}--`}, ...filteredCities]}
            onChange={this.onChangeDropDownItem}
            disabled={this.props.currentPage === 4}
            selectedKey={this.props.values.city.key}
            ariaLabelRequired={this.strings.required}
            errorMessage={this.props.values.city.key === "0"  ? getLocalizedString("city", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
          />

          <ReusableDropdownField
            id={"security"}
            name={"security"}
            title={this.strings.security_level}
            options={[{key:"0", text: `--${this.strings.select}--`}, ...this.props.security]}
            onChange={this.onChangeDropDownItem}
            disabled={this.props.currentPage === 4}
            selectedKey={this.props.values.security.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.security_level_description}
            errorMessage={this.props.values.security.key === "0"  ? getLocalizedString("security", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
          />

          <ReusableDropdownField
            id={"language"}
            name={"language"}
            title={this.strings.language_requirements}
            options={this.props.language}
            onChange={this.onChangeDropDownItem}
            disabled={this.props.currentPage === 4}
            selectedKey={this.props.values.languageRequirements[0].language.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.language_requirements_description}
            errorMessage={this.props.values.languageRequirements[0].language.key === ""  ? getLocalizedString("language", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
          />
         
          <ReusableDropdownField
            id={"readingEN"}
            name={"readingEN"}
            title={this.strings.readingENField}
            options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
            disabled={disabledField}
            onChange={this.onChangeDropDownItem}
            ariaLabelRequired={this.strings.required}
            selectedKey={this.props.values.languageRequirements[0].readingEN.key}
            errorMessage={this.props.values.languageRequirements[0].readingEN.key === ""  ? getLocalizedString("readingEN", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
          />

          <ReusableDropdownField
            id={"writtenEN"}
            name={"writtenEN"}
            title={this.strings.writtenENField}
            options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
            disabled={disabledField}
            ariaLabelRequired={this.strings.required}
            onChange={this.onChangeDropDownItem}
            selectedKey={this.props.values.languageRequirements[0].writtenEN.key}
            errorMessage={this.props.values.languageRequirements[0].writtenEN.key === ""  ? getLocalizedString("writtenEN", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
          />
        
          <ReusableDropdownField
            id={"oralEN"}
            name={"oralEN"}
            title= {this.strings.oralENField}
            options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
            ariaLabelRequired={this.strings.required}
            disabled={disabledField}
            onChange={this.onChangeDropDownItem}
            selectedKey={this.props.values.languageRequirements[0].oralEN.key}
            errorMessage={this.props.values.languageRequirements[0].oralEN.key === ""  ? getLocalizedString("oralEN", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
          />
          
          <ReusableDropdownField
            id={"readingFR"}
            name={"readingFR"}
            title={this.strings.readingFRField}
            options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
            ariaLabelRequired={this.strings.required}
            disabled={disabledField}
            onChange={this.onChangeDropDownItem}
            selectedKey={this.props.values.languageRequirements[0].readingFR.key}
            errorMessage={this.props.values.languageRequirements[0].readingFR.key === ""  ? getLocalizedString("readingFR", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
 
          />

          <ReusableDropdownField
            id={"writtenFR"}
            name={"writtenFR"}
            title={this.strings.writtenFRField}
            options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
            ariaLabelRequired={this.strings.required}
            disabled={disabledField}
            onChange={this.onChangeDropDownItem}
            selectedKey={this.props.values.languageRequirements[0].writtenFR.key}
            errorMessage={this.props.values.languageRequirements[0].writtenFR.key === ""  ? getLocalizedString("writtenFR", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
 
          />

          <ReusableDropdownField
            id={"oralFR"}
            name={"oralFR"}
            title={this.strings.oralFRField}
            options={[{key:"", text: `--${this.strings.select}--`}, ...languageEvaluationOptions]}
            ariaLabelRequired={this.strings.required}
            disabled={disabledField}
            onChange={this.onChangeDropDownItem}
            selectedKey={this.props.values.languageRequirements[0].oralFR.key}
            errorMessage={this.props.values.languageRequirements[0].oralFR.key === ""  ? getLocalizedString("oralFR", this.props.prefLang) : undefined}
            placeholder={this.strings.selectOption}
 

          />
         
       

      
        </form>
      </>
    );
  }
}
