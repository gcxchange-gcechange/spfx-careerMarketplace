import * as React from 'react';
import { Dropdown, IDropdownOption, Label, Stack, StackItem} from '@fluentui/react';

export interface IReusableDropdownFieldProps {
  id: string;
  name: string;
  title: string;
  options: 'classifications'| 'programs' | 'skills';
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

    const classifications: IDropdownOption[] = [
      {key: '1', text: "1"},
      {key: '2', text: "2"},
    ]

    const programs: IDropdownOption[] = [
      {key: 'p1', text: "p1"},
      {key: 'p2', text: "p2"},
    ]

    const skills: IDropdownOption[] = [
      {key: 's1', text: "s1"},
      {key: 's2', text: "s2"}, 
    ]

    let dropdownOptions: IDropdownOption[] = [];

    switch (this.props.options) {
      case 'classifications':
        dropdownOptions = classifications;
        break;
      case 'programs':
        dropdownOptions = programs;
        break;
      case 'skills':
        dropdownOptions = skills;
        break;
      default:
       
    }


    return (
      <div>
        <Dropdown
          options={dropdownOptions} onRenderLabel={this.customLabel}/>
      </div>
    )
  }
}