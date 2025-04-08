/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import ReusableDropdownField from "./ReusableDropDownField";
import { ComboBox, DatePicker, IComboBox, IComboBoxOption, IDropdownOption, IStackTokens, Label, Stack, StackItem  } from "@fluentui/react";
import * as moment from "moment";
import {  validate,  validateDuration,  validateEmpty } from "./Validations";
import styles from './CareerMarketplace.module.scss';
import { SelectLanguage } from "./SelectLanguage";



export interface IDetailsProps {
  prefLang: string;
  programArea: any[];
  classificationCode: any[];
  classificationLevel: any[];
  jobType: any[];
  duration: any[];
  currentPage: number;
  handleDropDownItem: (event: any, item: any) => void;
  handleOnChange: (event: string, newValue?: string) => void;
  handleOnDateChange: (date: Date) => void
  handleDurationLength: ( value: string)=> void;
  hasError:  {key: string, value: any}[] 
  onBlur?:(value: any) => void;
  fields: string[];
  values: {
    jobType:any;
    jobTitleEn: string;
    jobTitleFr: string;
    jobDescriptionEn: string;
    jobDescriptionFr: string;
    numberOfOpportunities: string;
    deadline: Date |  undefined;
    programArea: any;
    classificationCode: any;
    classificationLevel: any;
    duration: any;
    durationLength: any;
  };
  inlineFieldErrors?:any[];
  jobOppId : string;
}

export default class Details extends React.Component<IDetailsProps> {
  public strings = SelectLanguage(this.props.prefLang);

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>, value: any): void => {
    const eventName = event.target.name;
    const inputValue = value;

      this.props.handleOnChange(eventName, inputValue)
    
  };

  public onChangeSpinButton = (event: any, item: string):void => {

    if(item) {
      this.props.handleDurationLength( item)
    }

  }

  public onChangeDropDownItem = (event: any, item: IDropdownOption): void => {
    const eventId = event.target.id;

    if (item) {
      this.props.handleDropDownItem(eventId, item);
    }
  };

  public onSelectedDate = (date: Date |  undefined) :void => {

    if(date) {
      this.props.handleOnDateChange(date)
    }

  }

   public onChangeComboItem = (event: React.FormEvent<IComboBox>,  item?: IComboBoxOption, index?: number, value?: string): void => {
  
      const selectedValue = item ? item.key : "classificationCode-input";
      const selectedText = item ? item.text : value;
  
  
      if (item) {
        this.props.handleDropDownItem("classificationCode", { key: selectedValue, text: selectedText });
      }
    };

  public render(): React.ReactElement<IDetailsProps> {

    const disableDuration = this.props.values.jobType.Label === "Deployments" || this.props.values.jobType.Label === "Mutations"
 
    const customSpacingStackTokens: IStackTokens = {
      childrenGap: '10%',
    };

    const isReadOnly = this.props.currentPage === 3;
    const durationDisabled = this.props.currentPage === 3 || disableDuration;
    const {jobTitleEn, jobTitleFr, jobDescriptionFr, jobDescriptionEn, numberOfOpportunities, deadline} = this.props.values;

    const reformatDate = ():string => {
      const formattedDate = moment(deadline).format("YYYY-MM-DD");
    
      return formattedDate
    }

    const today = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);

    //const selectedItems =  jobType.map((item: any) => item.value).filter((item: any) => item !== undefined);

    const getDisabledElement = document.getElementsByName('durationLength')[0];

    if(getDisabledElement) {
      if (durationDisabled) {
        getDisabledElement.style.backgroundColor = 'rgb(243, 242, 241)'
        getDisabledElement.style.borderColor = 'rgb(243, 242, 241)'
    } else {
      getDisabledElement.style.backgroundColor = 'rgb(255, 255, 255)'
      getDisabledElement.style.borderColor = 'rgb(96, 94, 92)'
    }
  }

  const classificationCodeItems = this.props.classificationCode.sort();


    return (
      <>
        <div>
          {this.props.currentPage === 1 && (
            <>
            <p>
              {this.strings.oppotunityDetails_para1}
            </p>
            <p>
              {this.strings.asteriks}
            </p>
            </>
          )}
        </div>
        <div>
          <Stack>
          <ReusableTextField
            id={"jobTitleEn"}
            name={"jobTitleEn"}
            title={`${this.strings.job_Title} ${this.strings.english}`}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.jobTitleEn}
            disabled={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobTitleEn, 'jobTitleEn',this.props.prefLang)}
            ariaLabelRequired={this.strings.required}
          />
          
          
          <ReusableTextField
            id={"jobTitleFr"}
            name={"jobTitleFr"}
            title={`${this.strings.job_Title} ${this.strings.french}`}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.jobDescriptionFr}
            disabled={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobTitleFr, 'jobTitleFr',this.props.prefLang)}
            ariaLabelRequired={this.strings.required}
          />

          <ReusableTextField
            id={"jobDescriptionEn"}
            name={"jobDescriptionEn"}
            title={`${this.strings.job_Description} ${this.strings.english}`}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.jobDescriptionEn}
            multiline={true}
            disabled={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobDescriptionEn, 'jobDescriptionEn',this.props.prefLang)}
            ariaLabelRequired={this.strings.required}
          />
          <ReusableTextField
            id={"jobDescriptionFr"}
            name={"jobDescriptionFr"}
            title={`${this.strings.job_Description} ${this.strings.french}`}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.jobDescriptionFr}
            multiline={true}
            disabled={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobDescriptionFr,'jobDescritpionFr',this.props.prefLang)}
            ariaLabelRequired={this.strings.required}
          />

          <div>
          <ReusableDropdownField
            id={"jobType"}
            name={"jobType"}
            title={this.strings.job_Type}
            options={[{key:"0", text: `--${this.strings.select}--`}, ...this.props.jobType]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.jobType.Guid}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.job_Type_description}
            prefLang={this.props.prefLang}
          />
          {
            this.props.inlineFieldErrors?.includes('jobType') && (
              <div>{validate(this.props.values.jobType.Guid, this.props.prefLang)}</div>
            )
          }
          </div>


          <ReusableDropdownField
            id={"programArea"}
            name={"programArea"}
            title={this.strings.program_Area}
            options={[{key:"0", text: `--${this.strings.select}--`}, ...this.props.programArea]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.programArea.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.programArea_description}
          />
            {
            this.props.inlineFieldErrors?.includes('programArea') && (
              <div>{validate(this.props.values.programArea.key, this.props.prefLang)}</div>
            )
          }

          <div>
            <Stack  horizontal verticalAlign="center" >
              <StackItem >
                <Label htmlFor={'classificationCode'} style={{padding:'5px 0px', fontWeight: '700'}}>
                  <span style={{color: 'rgb(164, 38, 44)'}} aria-label={this.strings.required}>
                    *
                  </span>
                  {this.strings.classification_Code}
                </Label>
                <p className={styles.instruction}>{this.strings.classification_Code_description}</p>
              </StackItem>
            </Stack>
            <ComboBox
                id={"classificationCode"}
                options={[{key: "", text: `--${this.strings.select}--`},...classificationCodeItems]}
                onChange={this.onChangeComboItem}
                disabled={this.props.currentPage === 3}
                selectedKey={ this.props.values.classificationCode.key}
                autoComplete="on"
                allowFreeform
            />
              {this.props.inlineFieldErrors?.includes('classificationCode') &&( 
              <div>{validate(this.props.values.classificationCode.key, this.props.prefLang)}</div>
            )} 
          </div>


          <ReusableDropdownField
            id={"classificationLevel"}
            name={"classificationLevel"}
            title={this.strings.classification_Level}
            options={[{key:"", text: `--${this.strings.select}--`}, ...this.props.classificationLevel]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.classificationLevel.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.classification_Level_description}
          />

            {
            this.props.inlineFieldErrors?.includes('classificationLevel') && (
              <div>{validate(this.props.values.classificationLevel.key,  this.props.prefLang)}</div>
            )
          }

          <ReusableTextField
            id={"numberOfOpportunities"}
            name={"numberOfOpportunities"}
            title={this.strings.number_of_Opportunities}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.numberOfOpportunities}
            disabled={isReadOnly}
            onGetErrorMessage={() => validateEmpty(numberOfOpportunities, 'numberOfOpportunities', this.props.prefLang)}
            ariaLabelRequired={this.strings.required}
          />
          
          </Stack>

          <div >

          <Stack  horizontal verticalAlign="center" >
                <StackItem >
                  <Label htmlFor={'duration'} style={{padding:'5px 0px', fontWeight: '700'}}>
                    <span style={{color: 'rgb(164, 38, 44)'}} aria-label={this.strings.required}>
                      *
                    </span>
                      {this.strings.durationField}
                  </Label>
                  <p className={styles.instruction}>{this.strings.durationDescription}</p>
                </StackItem>
            </Stack>

          <Stack horizontal tokens={customSpacingStackTokens} >
            <StackItem align='baseline'>
              <Stack>
                <label htmlFor={"durationLength"} style={{padding:'5px 0px', fontWeight: '700'}}>{this.strings.length}</label>
                <input 
                  type="number"
                  id={"durationLength"}
                  name={"durationLength"}
                  min={1}
                  max={36}
                  onChange = {e => this.props.handleDurationLength(e.target.value)}
                  value={this.props.values.durationLength.value}
                  required
                  className={styles.durationLengthInput}
                  disabled={durationDisabled}
                />
              </Stack>
              {
                  this.props.inlineFieldErrors?.includes('durationLength') && (
                    <div>{validateDuration(this.props.values.durationLength.value, this.props.prefLang)}</div>
                  )
                }
              
            </StackItem>

            <StackItem>
              <ReusableDropdownField
                id={"duration"}
                name={"duration"}
                title={this.strings.time_period}
                options={[{key:"", text: `--${this.strings.select}--`}, ...this.props.duration]}
                onChange={this.onChangeDropDownItem}
                selectedKey={this.props.values.duration.key}
                disabled={durationDisabled}
                ariaLabelRequired={this.strings.required}
              />

                {
                  this.props.inlineFieldErrors?.includes('duration') && (
                    <div>{validate(this.props.values.duration.key, this.props.prefLang)}</div>
                  )
                }
            </StackItem>
          </Stack>
          </div>

          <Stack  horizontal verticalAlign="center" >
            <StackItem >
              <Label htmlFor={'deadline'} >
                <span style={{color: 'rgb(164, 38, 44)'}} aria-label={this.strings.required}>
                  *
                </span>
                {this.strings.application_deadline}
              </Label>
              <p className={styles.instruction}>{this.strings.application_deadline_description}</p>
            </StackItem>
          </Stack>

            <DatePicker
            id={"deadline"}
            className={styles.labelStyle}     
            ariaLabel="Select a date"
            onSelectDate={this.onSelectedDate}
            disabled={isReadOnly}
            formatDate={reformatDate}
            value={this.props.values.deadline}
            minDate={this.props.jobOppId ? undefined : oneMonthLater}
            
          />
        </div>
      </>
    );
  }
}
