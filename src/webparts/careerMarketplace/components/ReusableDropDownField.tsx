/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles, Label, Stack, StackItem} from '@fluentui/react';
import styles from './CareerMarketplace.module.scss';
import { validateDropdowns} from './Validations';

export interface IReusableDropdownFieldProps {
  id: string;
  name: string;
  title: string;
  options?: any[];
  onChange: (event: any, item: any) => void;
  readOnly?: boolean;
  disabled?: boolean;
  selectedKey?: string[];
  selectedKeys?: string[];
  multiselect?: boolean;

  
}


export default class ReusableDropdownField extends React.Component<IReusableDropdownFieldProps> {



  public customLabel = (): JSX.Element => {
    return (
    <Stack  horizontal verticalAlign="center" >
      <StackItem >
        <Label htmlFor={this.props.id} required aria-required>
            {this.props.title}
        </Label>
      </StackItem>
    </Stack>
    )
  }


  public render(): React.ReactElement<IReusableDropdownFieldProps> {

    const {selectedKey} = this.props

    const dropdownStyle: Partial<IDropdownStyles> = {
      callout: {
        maxHeight:'500px'
      }
    }
   

    return (
      <div>
        <Dropdown
          options={this.props.options as IDropdownOption[]} 
          onRenderLabel={this.customLabel} 
          className={styles.labelStyle} 
          multiSelect={this.props.multiselect} 
          styles={dropdownStyle} 
          errorMessage={validateDropdowns(selectedKey)} 
          {...this.props}
        />
        
      </div>
    )
  }
}