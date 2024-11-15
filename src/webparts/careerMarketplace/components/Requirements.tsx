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
        <ReusableTextField id={"15"} name={"essentialSkill"} title={"Essential Skill"} />
        <ReusableTextField id={"16"} name={"assetSkill"} title={"Asset Skill"} />
        <ReusableDropdownField id={"17"} name={"time"} title={"Time in hours"}/>
        <ReusableDropdownField id={"18"} name={"location"} title={"Location"}/>
        <ReusableDropdownField id={"19"} name={"city"} title={"City"}/>
        <ReusableDropdownField id={"20"} name={"security"} title={"Security Level"}/>
        <ReusableDropdownField id={"21"} name={"language"} title={"Language requirements"} />
        <ReusableDropdownField  id={"22"} name={"wrkArrangment"} title={"Work arrangement"}/>
        <ReusableTextField id={"23"} name={"approvedStaffing"} title={"Approved Staffing"}/>
      </div>
      </>

    )
  }
}