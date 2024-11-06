import { Label, Stack, StackItem, TextField } from '@fluentui/react';
import * as React from 'react';

export interface IReusableTextFieldProps {
  id: string;
  name: string;
  title: string;
  onChange?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
}


export default class ReusableTextField extends React.Component<IReusableTextFieldProps> {


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


  public render(): React.ReactElement<IReusableTextFieldProps> {
    return (
      <div>
        <TextField
          {...this.props} onRenderLabel={this.customLabel} 
        />
      </div>
    )
  }
}