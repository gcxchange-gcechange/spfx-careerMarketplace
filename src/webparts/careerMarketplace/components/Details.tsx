import * as React from 'react';
import ReusableTextField from './ReusableTextField';
import ReusableDropdownField from './ReusableDropDownField';

export interface IDetailsProps {

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
       <ReusableTextField id={"5"} name={"jobTitleEn"} title={"Job Title (EN)"} onChange={this.onChangeTextValue}/>
       <ReusableTextField id={"6"} name={"jobTitleFr"} title={"Job Title (FR)"} onChange={this.onChangeTextValue}/>
       <ReusableTextField id={"7"} name={"jobType"} title={"Job Type"} onChange={this.onChangeTextValue}/>
       <ReusableDropdownField id={"8"} name={"programArea"} title={"Program area"} options={"programs"} />
       <ReusableDropdownField id={"9"} name={"classification"} title={"Classification"} options={"classifications"}/>
       <ReusableTextField id={"10"} name={"level"} title={"Level"} onChange={this.onChangeTextValue} />
       <ReusableTextField id={"11"} name={"numOfOpps"} title={"Number of opportunities"} onChange={this.onChangeTextValue} />
       <ReusableTextField id={"12"} name={"duration"} title={"Duration"} onChange={this.onChangeTextValue} />
       <ReusableTextField id={"13"} name={"deadline"} title={"Application deadline"} onChange={this.onChangeTextValue} />
       <ReusableTextField id={"14"} name={"jobDescriptionEn"} title={"Job Description (EN)"} onChange={this.onChangeTextValue}/>
       <ReusableTextField id={"15"} name={"jobDescriptionFr"} title={"Job Description (FR)"} onChange={this.onChangeTextValue}/>
      </div>
      </>
    )
  }
}