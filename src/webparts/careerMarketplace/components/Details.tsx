/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import ReusableDropdownField from "./ReusableDropDownField";
import { DatePicker, IDropdownOption  } from "@fluentui/react";
import * as moment from "moment";
import { validateEmpty } from "./Validations";


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
  values: {
    jobTitleEn: string;
    jobTitleFr: string;
    jobDescriptionEn: string;
    jobDescriptionFr: string;
    numOfOpps: string;
    deadline: Date |  undefined;
    //jobType: any[];
    programArea: any;
    classificationCode: any;
    classificationLevel: any;
    duration: any;
  };
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
    const {jobTitleEn, jobTitleFr, jobDescriptionFr, jobDescriptionEn, numOfOpps} = this.props.values;
    console.log("jobTypes", this.props.jobTypeValues)

    const reformatDate = ():string => {
      const formattedDate = moment(this.props.values.deadline).format("YYYY-MM-DD");
    
      return formattedDate
    }


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
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.jobTitleEn}
            readOnly={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobTitleEn)}
          />

          <ReusableTextField
            id={"jobTitleFr"}
            name={"jobTitleFr"}
            title={"Job Title (FR)"}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.jobDescriptionFr}
            readOnly={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobTitleFr)}
          />
          <ReusableDropdownField
            id={"jobType"}
            name={"jobType"}
            title={"Job Type"}
            options={this.props.jobType}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKeys={this.props.jobTypeValues}
            multiselect
          />

          <ReusableDropdownField
            id={"programArea"}
            name={"programArea"}
            title={"Program area"}
            options={[{key:"", text: "--Select--"}, ...this.props.programArea]}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.programArea.key}
          />
          <ReusableDropdownField
            id={"classificationCode"}
            name={"classificationCode"}
            title={"Classification"}
            options={[{key:"", text: "--Select--"}, ...this.props.classificationCode]}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.classificationCode.key}
          />
          <ReusableDropdownField
            id={"classificationLevel"}
            name={"classificationLevel"}
            title={"Clasification Level"}
            options={[{key:"", text: "--Select--"}, ...this.props.classificationLevel]}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.classificationLevel.key}
          />
          <ReusableTextField
            id={"numOfOpps"}
            name={"numOfOpps"}
            title={"Number of opportunities"}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.numOfOpps}
            readOnly={isReadOnly}
            onGetErrorMessage={() => validateEmpty(numOfOpps)}
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
 
            <DatePicker
            id={"deadline"}
            label={"Application deadline"}
            isRequired
            ariaLabel="Select a date"
            onSelectDate={this.onSelectedDate}
            disabled={isReadOnly}
            formatDate={reformatDate}
            value={this.props.values.deadline}
            
          />

          <ReusableTextField
            id={"jobDescriptionEn"}
            name={"jobDescriptionEn"}
            title={"Job Description (EN)"}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.jobDescriptionEn}
            multiline={true}
            readOnly={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobDescriptionEn)}
          />
          <ReusableTextField
            id={"jobDescriptionFr"}
            name={"jobDescriptionFr"}
            title={"Job Description (FR)"}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.jobDescriptionFr}
            multiline={true}
            readOnly={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobDescriptionFr)}
          />
        </div>
      </>
    );
  }
}
