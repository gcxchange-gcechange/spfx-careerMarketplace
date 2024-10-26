import { Label, Stack, StackItem } from '@fluentui/react';
import * as React from 'react';

export interface IReusableTextFieldProps {
  id: string;
  name: string;
  title: string;
}


export default class ReusableTextField extends React.Component<IReusableTextFieldProps> {


  public render() {
    return (
      <div>
        <Stack  horizontal verticalAlign="center" >
          <StackItem >
            <Label htmlFor={this.props.id} >
                {this.props.title}
            </Label>
          </StackItem>
        </Stack>
      </div>
    )
  }
}