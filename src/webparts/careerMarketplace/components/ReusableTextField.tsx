import { Label, Stack, StackItem, TextField } from '@fluentui/react';
import * as React from 'react';
import styles from './CareerMarketplace.module.scss';

export interface IReusableTextFieldProps {
  id: string;
  name: string;
  title: string;
  onChange?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  defaultValue?: string;
  readOnly?: boolean;
  disabled?: boolean;
  multiline?: boolean;
  onGetErrorMessage?:(value: string | number) => string | JSX.Element | undefined;
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
          {...this.props} onRenderLabel={this.customLabel}  className={styles.labelStyle} 
        />
      </div>
    )
  }
}