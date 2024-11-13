/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles, Label, Stack, StackItem} from '@fluentui/react';
import styles from './CareerMarketplace.module.scss';

export interface IReusableDropdownFieldProps {
  id: string;
  name: string;
  title: string;
  options?: any[];
  onChange?: (item: IDropdownOption) => void;
}


export default class ReusableDropdownField extends React.Component<IReusableDropdownFieldProps> {


  public handleDropdownChange = (event: React.FormEvent<HTMLDivElement>, item: IDropdownOption): void => {
    console.log("item", item)
      
  };
  

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

    const dropdownStyle: Partial<IDropdownStyles> = {
      callout: {
        maxHeight:'500px'
      }
    }
   

    return (
      <div>
        <Dropdown
          options={this.props.options as IDropdownOption[]} onRenderLabel={this.customLabel} className={styles.labelStyle} styles={dropdownStyle} onChange={this.handleDropdownChange} />
      </div>
    )
  }
}