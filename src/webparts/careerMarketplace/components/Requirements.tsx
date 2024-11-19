/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import ReusableTextField from './ReusableTextField';
import ReusableDropdownField from './ReusableDropDownField';

export interface IRequirementsProps {
  language: any[];
  location: any[];
  city: any[];
  province: any[];
  region:any[];
  security: any[];
  workArrangment: any[];
  wrkSchedule: any[];
  currentPage: number;
  handleDropDownItem: (event: any, item: any) => void;
}


export default class Requirements extends React.Component<IRequirementsProps> {

  // public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>):void => {
  //   console.log("eventTarget", event.target.name);
  // }
  


  public render(): React.ReactElement<IRequirementsProps>{
    return (
      <>      
        <div>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
        </div>
        <div>
          <ReusableTextField id={"essentialSkill"} name={"essentialSkill"} title={"Essential Skill"} />
          <ReusableTextField id={"assetSkill"} name={"assetSkill"} title={"Asset Skill"} />
          <ReusableDropdownField id={"time"} name={"time"} title={"Time in hours"} onChange={this.props.handleDropDownItem} />
          <ReusableDropdownField id={"region"} name={"region"} title={"Region"} options={this.props.region} onChange={this.props.handleDropDownItem} />
          <ReusableDropdownField id={"province"} name={"province"} title={"Province"} options={this.props.province} onChange={this.props.handleDropDownItem} />
          <ReusableDropdownField id={"city"} name={"city"} title={"City"} options={this.props.city} onChange={this.props.handleDropDownItem} />
          <ReusableDropdownField id={"location"} name={"location"} title={"Location"} options={this.props.location} onChange={this.props.handleDropDownItem} />
          <ReusableDropdownField id={"security"} name={"security"} title={"Security Level"} options={this.props.security} onChange={this.props.handleDropDownItem} />
          <ReusableDropdownField id={"language"} name={"language"} title={"Language requirements"} options={this.props.language} onChange={this.props.handleDropDownItem} />
          <ReusableDropdownField id={"wrkArrangment"} name={"wrkArrangment"} title={"Work arrangement"} options={this.props.workArrangment} onChange={this.props.handleDropDownItem} />
          <ReusableTextField id={"approvedStaffing"} name={"approvedStaffing"} title={"Approved Staffing"}/>
        </div>
      </>

    )
  }
}