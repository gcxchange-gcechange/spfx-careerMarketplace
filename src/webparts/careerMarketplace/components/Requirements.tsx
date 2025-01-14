/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import ReusableDropdownField from "./ReusableDropDownField";
import { ChoiceGroup, IChoiceGroupOption, Label, Stack, StackItem } from "@fluentui/react";
import { validate, validateEmpty } from "./Validations";

export interface IRequirementsProps {
  language: any[];
  city: any[];
  province: any[];
  region: any[];
  security: any[];
  workArrangment: any[];
  workSchedule: any[];
  currentPage: number;
  handleDropDownItem: (event: any, item: any) => void;
  handleOnChange: (event: string, newValue?: string) => void;
  values: {
    essentialSkill: string;
    assetSkill: string;
    approvedStaffing: any;
    language: any;
    security: any;
    city: any;
    province: any;
    region: any;
    workArrangment: any, 
    workSchedule: any, 

  };
  inlineFieldErrors?:string[];
}

export default class Requirements extends React.Component<IRequirementsProps> {

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>, value: any): void => {
    const eventName = event.target.name;

      this.props.handleOnChange(eventName, value)
    
  };

  public onChangeDropDownItem = (event: any, item: any): void => {
    const eventName = event.target.id;
    if (item) {
      this.props.handleDropDownItem(eventName, item);
    }
  };

  public onChoiceChange = (ev: React.ChangeEvent<HTMLFormElement>, option: IChoiceGroupOption):void => {

    const eventName = ev.target.name;

    if(option) {
      this.props.handleDropDownItem(eventName, option);
    }
  }

  

  public render(): React.ReactElement<IRequirementsProps> {

    const {essentialSkill, assetSkill }=this.props.values

    const isReadOnly = this.props.currentPage !== 2;
    const filteredRegions = this.props.region.filter ((item) => item.provinceId === this.props.values.province.key);
    const filteredCities = this.props.city.filter((item) => item.regionID === this.props.values.region.key);

    const options: IChoiceGroupOption[] = [
      { key: 'true', text: 'Yes' },
      { key: 'false', text: 'No' },
    ];



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
            onGetErrorMessage={() => validateEmpty(essentialSkill, 'essentialSkill')}
            ariaLabelRequired={'required'}
          />
          <ReusableTextField
            id={"assetSkill"}
            name={"assetSkill"}
            title={"Asset Skill"}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.assetSkill}
            multiline={true}
            readOnly={isReadOnly}
            onGetErrorMessage={() => validateEmpty(assetSkill, 'assetSkill')}
            ariaLabelRequired={'required'}
          />
          <ReusableDropdownField
            id={"workSchedule"}
            name={"workSchedule"}
            title={"Time in hours"}
            options={this.props.workSchedule}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.workSchedule.key}
            ariaLabelRequired={'required'}
          />

            { this.props.inlineFieldErrors?.includes('workSchedule') && (
                <div>{validate(this.props.values.workSchedule.key)}</div>
              )
            }
          <ReusableDropdownField
            id={"province"}
            name={"province"}
            title={"Province"}
            options={this.props.province}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.province.key}
            ariaLabelRequired={'required'}
          />

           { this.props.inlineFieldErrors?.includes('province') && (
                <div>{validate(this.props.values.province.key)}</div>
              )
            }

          <ReusableDropdownField
            id={"region"}
            name={"region"}
            title={"Region"}
            options={filteredRegions}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.region.key}
            ariaLabelRequired={'required'}
          />

          { this.props.inlineFieldErrors?.includes('region') && (
                <div>{validate(this.props.values.region.key)}</div>
              )
          }

          <ReusableDropdownField
            id={"city"}
            name={"city"}
            title={"City"}
            options={filteredCities}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.city.key}
            ariaLabelRequired={'required'}
          />

           { this.props.inlineFieldErrors?.includes('city') && (
                <div>{validate(this.props.values.city.key)}</div>
              )
            }

          <ReusableDropdownField
            id={"security"}
            name={"security"}
            title={"Security Level"}
            options={this.props.security}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.security.key}
            ariaLabelRequired={'required'}
          />

           { this.props.inlineFieldErrors?.includes('security') && (
                <div>{validate(this.props.values.security.key)}</div>
              )
            }
          <Stack horizontal>
            <ReusableDropdownField
              id={"language"}
              name={"language"}
              title={"Language requirements"}
               
              onChange={this.onChangeDropDownItem}
              readOnly={isReadOnly}
              ariaLabelRequired={'required'}
            />

            
        
          </Stack>
         

          <ReusableDropdownField
            id={"language"}
            name={"language"}
            title={"Language requirements"}
            options={this.props.language}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.language.key}
            ariaLabelRequired={'required'}
          />
           { this.props.inlineFieldErrors?.includes('language') && (
                <div>{validate(this.props.values.language.key)}</div>
              )
            }
          <ReusableDropdownField
            id={"workArrangment"}
            name={"workArrangment"}
            title={"Work arrangement"}
            options={this.props.workArrangment}
            onChange={this.onChangeDropDownItem}
            readOnly={isReadOnly}
            selectedKey={this.props.values.workArrangment.key}
            ariaLabelRequired={'required'}
          />
            { this.props.inlineFieldErrors?.includes('workArrangment') && (
                <div>{validate(this.props.values.workArrangment.key)}</div>
              )
            }

          <div style={{marginTop: '10px'}}>
            <Stack  horizontal verticalAlign="center" >
              <StackItem >
                <Label htmlFor={'deadline'} >
                  <span style={{color: 'rgb(164, 38, 44)'}} aria-label={'required'}>
                    *
                  </span>
                  Approved Staffing
                </Label>
              </StackItem>
            </Stack>

            <ChoiceGroup
              id={"approvedStaffing"}
              name={"approvedStaffing"}
              options={options}
              onChange={this.onChoiceChange}
              readOnly={isReadOnly}
              selectedKey={this.props.values.approvedStaffing.key}
            />
            { this.props.inlineFieldErrors?.includes('approvedStaffing') && (
                <div>{validate(this.props.values.approvedStaffing.key)}</div>
              )
            }
          </div>

        </div>
      </>
    );
  }
}
