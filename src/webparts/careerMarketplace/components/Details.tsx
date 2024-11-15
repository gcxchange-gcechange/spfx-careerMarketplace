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

}


export default class Details extends React.Component<IDetailsProps> {

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(event.target.name);
  }


  public render(): React.ReactElement<IDetailsProps>{
    return (
      <>
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      </div>
      <div>
       <ReusableTextField id={"4"} name={"jobTitleEn"} title={"Job Title (EN)"} onChange={this.onChangeTextValue}/>
       <ReusableTextField id={"5"} name={"jobTitleFr"} title={"Job Title (FR)"} onChange={this.onChangeTextValue}/>
       <ReusableDropdownField id={"6"} name={"jobType"} title={"Job Type"} options={this.props.jobType} />
       <ReusableDropdownField id={"7"} name={"programArea"} title={"Program area"} options={this.props.programArea} />
       <ReusableDropdownField id={"8"} name={"classification"} title={"Classification"} options={this.props.classificationCode}/>
       <ReusableDropdownField id={"9"} name={"level"} title={"Clasification Level"} options={this.props.classificationLevel}/>
       <ReusableTextField id={"10"} name={"numOfOpps"} title={"Number of opportunities"} onChange={this.onChangeTextValue} />
       <ReusableDropdownField id={"11"} name={"duration"} title={"Duration"}  options={this.props.duration} />
       <ReusableTextField id={"12"} name={"deadline"} title={"Application deadline"} onChange={this.onChangeTextValue} />
       <ReusableTextField id={"13"} name={"jobDescriptionEn"} title={"Job Description (EN)"} onChange={this.onChangeTextValue}/>
       <ReusableTextField id={"14"} name={"jobDescriptionFr"} title={"Job Description (FR)"} onChange={this.onChangeTextValue}/>
      </div>
      </>
    )
  }
}