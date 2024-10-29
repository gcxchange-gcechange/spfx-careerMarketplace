import * as React from 'react';
import ReusableTextField from './ReusableTextField';
import ReusableDropdownField from './ReusableDropDownField';

export interface IRequirementsProps {

}


export default class Requirements extends React.Component<IRequirementsProps> {


  public render(): React.ReactElement<IRequirementsProps>{
    return (
      <div>
       <ReusableDropdownField id={"1"} name={"skill"} title={"Skill"} options={"skills"}/>
       <ReusableTextField id={"2"} name={"time"} title={"Time in hours"}/>
       <ReusableTextField id={"3"} name={"location"} title={"Location"}/>
       
      </div>
    )
  }
}