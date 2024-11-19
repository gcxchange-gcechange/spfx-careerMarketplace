/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import ReusableTextField from './ReusableTextField';
import ReusableDropdownField from './ReusableDropDownField';

export interface IDetailsProps {
  programArea: any[],
  classificationCode: any[],
  classificationLevel: any[],
  jobType: any[],
  duration: any[]
  currentPage: number;
  handleDropDownItem: (event: any, item: any) => void;

}


export default class Details extends React.Component<IDetailsProps> {

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(event.target.name);
  }

  public onChangeDropDownItem = (event: any, item: any): void => {
    console.log("EVENTID", event.target.id);
    const eventId = event.target.id
    console.log("ITEM", item)
    if (item) {
      this.props.handleDropDownItem(eventId, item);
    }
  }


  public render(): React.ReactElement<IDetailsProps>{
    console.log("JOBTYPE", this.props.jobType)

    const isReadOnly =  this.props.currentPage !== 1;

    return (
      <>
      <div>
        {
          this.props.currentPage === 1 &&  (
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
          )
        }
      </div>
      <div>
       <ReusableTextField id={"jobTitleEn"} name={"jobTitleEn"} title={"Job Title (EN)"} onChange={this.onChangeTextValue} readOnly={isReadOnly}/>
       <ReusableTextField id={"jobTitleFr"} name={"jobTitleFr"} title={"Job Title (FR)"} onChange={this.onChangeTextValue} readOnly={isReadOnly}/>
       <ReusableDropdownField id={"jobType"} name={"jobType"} title={"Job Type"} options={this.props.jobType} onChange={this.onChangeDropDownItem} readOnly={isReadOnly}/>
       <ReusableDropdownField id={"programArea"} name={"programArea"} title={"Program area"} options={this.props.programArea} onChange={this.onChangeDropDownItem}  readOnly={isReadOnly}/>
       <ReusableDropdownField id={"classification"} name={"classification"} title={"Classification"} options={this.props.classificationCode} onChange={this.onChangeDropDownItem} readOnly={isReadOnly}/>
       <ReusableDropdownField id={"level"} name={"level"} title={"Clasification Level"} options={this.props.classificationLevel} onChange={this.onChangeDropDownItem} readOnly={isReadOnly}/>
       <ReusableTextField id={"numOfOpps"} name={"numOfOpps"} title={"Number of opportunities"} onChange={this.onChangeTextValue} readOnly={isReadOnly} />
       <ReusableDropdownField id={"duration"} name={"duration"} title={"Duration"}  options={this.props.duration} onChange={this.onChangeDropDownItem} readOnly={isReadOnly} />
       <ReusableTextField id={"deadline"} name={"deadline"} title={"Application deadline"} onChange={this.onChangeTextValue} readOnly={isReadOnly} />
       <ReusableTextField id={"jobDescriptionEn"} name={"jobDescriptionEn"} title={"Job Description (EN)"} onChange={this.onChangeTextValue} readOnly={isReadOnly} />
       <ReusableTextField id={"jobDescriptionFr"} name={"jobDescriptionFr"} title={"Job Description (FR)"} onChange={this.onChangeTextValue} readOnly={isReadOnly} />
      </div>
      </>
    )
  }
}