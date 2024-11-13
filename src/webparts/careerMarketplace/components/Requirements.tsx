import * as React from 'react';
import ReusableTextField from './ReusableTextField';
import ReusableDropdownField from './ReusableDropDownField';

export interface IRequirementsProps {

}


export default class Requirements extends React.Component<IRequirementsProps> {

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(event.target.name);
  }


  public render(): React.ReactElement<IRequirementsProps>{
    return (
      <>      
      <div>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
      </div>
      <div>
        <ReusableDropdownField id={"16"} name={"skill"} title={"Skill"} />
        <ReusableTextField id={"17"} name={"time"} title={"Time in hours"}/>
        <ReusableTextField id={"18"} name={"location"} title={"Location"}/>
        <ReusableTextField id={"19"} name={"language"} title={"Language requirements"}/>
        <ReusableTextField id={"20"} name={"wrkArrangment"} title={"Work arrangement"}/>
        <ReusableTextField id={"21"} name={"approvedStaffing"} title={"Approved Staffing"}/>
      </div>
      </>

    )
  }
}