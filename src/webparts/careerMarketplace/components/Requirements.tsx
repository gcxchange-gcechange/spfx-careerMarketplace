/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import ReusableDropdownField from "./ReusableDropDownField";

export interface IRequirementsProps {
  language: any[];
  city: any[];
  province: any[];
  region: any[];
  security: any[];
  wrkArrangment: any[];
  wrkSchedule: any[];
  currentPage: number;
  handleDropDownItem: (event: any, item: any) => void;
  handleOnChange: (event: string, newValue?: string) => void;
  values: {
    essentialSkill: string;
    assetSkill: string;
    approvedStaffing: string;
    language: any;
    location: any;
    security: any;
    city: any;
    province: any;
    region: any;
    wrkArrangment: any, 
    wrkSchedule: any, 

  };
}

export default class Requirements extends React.Component<IRequirementsProps> {

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>, value: any): void => {
    const eventName = event.target.name;
    console.log(event.target.name);
    if (value) {
      this.props.handleOnChange(eventName, value)
    }
  };

  public onChangeDropDownItem = (event: any, item: any): void => {
    const eventName = event.target.id;
    if (item) {
      this.props.handleDropDownItem(eventName, item);
    }
  };

  

  public render(): React.ReactElement<IRequirementsProps> {

    const isReadOnly = this.props.currentPage !== 2;

    const filteredRegions = this.props.region.filter ((item) => item.provinceId === this.props.values.province.key);
    const filteredCities = this.props.city.filter((item) => item.regionID === this.props.values.region.key);

    return (
      <>
        <div>
          {this.props.currentPage === 2 && (
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
            </p>
          )}
        </div>
        <div>
          <ReusableTextField
            id={"essentialSkill"}
            name={"essentialSkill"}
            title={"Essential Skill"}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.essentialSkill}
            multiline={true}
            readOnly={isReadOnly}
          />
          <ReusableTextField
            id={"assetSkill"}
            name={"assetSkill"}
            title={"Asset Skill"}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.assetSkill}
            multiline={true}
            readOnly={isReadOnly}
          />
          <ReusableDropdownField
            id={"wrkSchedule"}
            name={"wrkSchedule"}
            title={"Time in hours"}
            options={this.props.wrkSchedule}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.wrkSchedule.key}
          />
          <ReusableDropdownField
            id={"province"}
            name={"province"}
            title={"Province"}
            options={this.props.province}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.province.key}
          />
          <ReusableDropdownField
            id={"region"}
            name={"region"}
            title={"Region"}
            options={filteredRegions}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.region.key}
          />
          <ReusableDropdownField
            id={"city"}
            name={"city"}
            title={"City"}
            options={filteredCities}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.city.key}
          />
 
          <ReusableDropdownField
            id={"security"}
            name={"security"}
            title={"Security Level"}
            options={this.props.security}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.security.key}
          />
          <ReusableDropdownField
            id={"language"}
            name={"language"}
            title={"Language requirements"}
            options={this.props.language}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.language.key}
          />
          <ReusableDropdownField
            id={"wrkArrangment"}
            name={"wrkArrangment"}
            title={"Work arrangement"}
            options={this.props.wrkArrangment}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.wrkArrangment.key}
          />
          <ReusableTextField
            id={"approvedStaffing"}
            name={"approvedStaffing"}
            title={"Approved Staffing"}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.approvedStaffing}
            readOnly={isReadOnly}
          />
        </div>
      </>
    );
  }
}
