/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import ReusableDropdownField from "./ReusableDropDownField";
import { DatePicker, IDropdownOption  } from "@fluentui/react";
import * as moment from "moment";
import {  validate, validateEmpty } from "./Validations";


export interface IDetailsProps {
  programArea: any[];
  classificationCode: any[];
  classificationLevel: any[];
  jobType: any[];
  duration: any[];
  currentPage: number;
  handleDropDownItem: (event: any, item: any) => void;
  handleOnChange: (event: string, newValue?: string) => void;
  handleOnDateChange: (date: Date) => void
  jobTypeValues: string[];
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
  };
  isError?:any[];
}

export default class Details extends React.Component<IDetailsProps> {

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>, value: any): void => {
    const eventName = event.target.name;
    const inputValue = value;

      this.props.handleOnChange(eventName, inputValue)
    
  };

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



  public render(): React.ReactElement<IDetailsProps> {

    const isReadOnly = this.props.currentPage !== 1;
    const {jobTitleEn, jobTitleFr, jobDescriptionFr, jobDescriptionEn, numberOfOpportunities} = this.props.values;

    const reformatDate = ():string => {
      const formattedDate = moment(this.props.values.deadline).format("YYYY-MM-DD");
    
      return formattedDate
    }

    const today = new Date();

    const selectedItems = this.props.values.jobType.value;

    return (
      <>
        <div>
          {this.props.currentPage === 1 && (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.{" "}
            </p>
          )}
        </div>
        <div>
          <ReusableTextField
            id={"jobTitleEn"}
            name={"jobTitleEn"}
            title={"Job Title (EN)"}
            onChange={() => this.onChangeTextValue}
            defaultValue={this.props.values.jobTitleEn}
            readOnly={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobTitleEn, 'jobTitleEn')}
            //onBlur={() => validateEmpty(jobTitleEn)}
          />
          
          
          <ReusableTextField
            id={"jobTitleFr"}
            name={"jobTitleFr"}
            title={"Job Title (FR)"}
            onChange={() => this.onChangeTextValue}
            defaultValue={this.props.values.jobDescriptionFr}
            readOnly={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobTitleFr, 'jobTitleFr')}
          />

          <ReusableTextField
            id={"jobDescriptionEn"}
            name={"jobDescriptionEn"}
            title={"Job Description (EN)"}
            onChange={() => this.onChangeTextValue}
            defaultValue={this.props.values.jobDescriptionEn}
            multiline={true}
            readOnly={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobDescriptionEn, 'jobDescriptionEn')}
          />
          <ReusableTextField
            id={"jobDescriptionFr"}
            name={"jobDescriptionFr"}
            title={"Job Description (FR)"}
            onChange={() => this.onChangeTextValue}
            defaultValue={this.props.values.jobDescriptionFr}
            multiline={true}
            readOnly={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobDescriptionFr,'jobDescritpionFr')}
          />

          <div>
          <ReusableDropdownField
            id={"jobType"}
            name={"jobType"}
            title={"Job Type"}
            options={this.props.jobType}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKeys={selectedItems}
            multiselect
          />
          {
            this.props.isError?.includes('jobType') && (
              <div>{validate(selectedItems)}</div>
            )
          }
          </div>


          <ReusableDropdownField
            id={"programArea"}
            name={"programArea"}
            title={"Program area"}
            options={[{key:"", text: "--Select--"}, ...this.props.programArea]}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.programArea.key}
          />
            {
            this.props.isError?.includes('programArea') && (
              <div>{validate(this.props.values.programArea.key)}</div>
            )
          }

        
          <ReusableDropdownField
            id={"classificationCode"}
            name={"classificationCode"}
            title={"Classification"}
            options={[{key:"", text: "--Select--"}, ...this.props.classificationCode]}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.classificationCode.key}
          />

            {
            this.props.isError?.includes('classificationCode') && (
              <div>{validate(this.props.values.classificationCode.key)}</div>
            )
          }

          <ReusableDropdownField
            id={"classificationLevel"}
            name={"classificationLevel"}
            title={"Clasification Level"}
            options={[{key:"", text: "--Select--"}, ...this.props.classificationLevel]}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.classificationLevel.key}
          />

            {
            this.props.isError?.includes('classificationLevel') && (
              <div>{validate(this.props.values.classificationLevel.key)}</div>
            )
          }

          <ReusableTextField
            id={"numberOfOpportunities"}
            name={"numberOfOpportunities"}
            title={"Number of opportunities"}
            onChange={() => this.onChangeTextValue}
            defaultValue={this.props.values.numberOfOpportunities}
            readOnly={isReadOnly}
            onGetErrorMessage={() => validateEmpty(numberOfOpportunities, 'numberOfOpportunities')}
          />

          <ReusableDropdownField
            id={"duration"}
            name={"duration"}
            title={"Duration"}
            options={[{key:"", text: "--Select--"}, ...this.props.duration]}
            onChange={this.onChangeDropDownItem}
            selectedKey={this.props.values.duration.key}
            readOnly={isReadOnly}
          />

            {
            this.props.isError?.includes('duration') && (
              <div>{validate(this.props.values.duration.key)}</div>
            )
          }
 
            <DatePicker
            id={"deadline"}
            label={"Application deadline"}
            isRequired
            ariaLabel="Select a date"
            onSelectDate={() => this.onSelectedDate}
            disabled={isReadOnly}
            formatDate={reformatDate}
            value={this.props.values.deadline}
            minDate={today}
            
          />
        </div>
      </>
    );
  }
}
