import * as React from 'react';
import ReusableTextField from './ReusableTextField';

export interface IRequirementsProps {

}


export default class Requirements extends React.Component<IRequirementsProps> {


  public render(): React.ReactElement<IRequirementsProps>{
    return (
      <div>
       <ReusableTextField id={"1"} name={"skill"} title={"Skill"}/>
       <ReusableTextField id={"2"} name={"time"} title={"Time in hours"}/>
       <ReusableTextField id={"3"} name={"location"} title={"Location"}/>
       
      </div>
    )
  }
}