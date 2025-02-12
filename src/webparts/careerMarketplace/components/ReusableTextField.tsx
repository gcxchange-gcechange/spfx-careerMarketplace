import { ITextFieldStyles, Label, Stack, StackItem, TextField } from '@fluentui/react';
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
  validateonLoad?: boolean;
  validateOnFocusOut?: boolean;
  onGetErrorMessage?:(value: string | number) => string | JSX.Element | undefined;
  onBlur?: (event: React.FormEvent<HTMLInputElement | HTMLTextAreaElement>, newValue?: string) => void;
  ariaLabelRequired: string;
}


export default class ReusableTextField extends React.Component<IReusableTextFieldProps> {


  public customLabel = (): JSX.Element => {

    return (
    <Stack  horizontal verticalAlign="center" >
      <StackItem >
        <Label htmlFor={this.props.id} >
          <span style={{color: 'rgb(164, 38, 44)'}} aria-label={'required'}>
            *
          </span>
            {this.props.title}
        </Label>
      </StackItem>
    </Stack>
    )
  }


  public render(): React.ReactElement<IReusableTextFieldProps> {

    const disabledStyle : Partial<ITextFieldStyles>= {
      field: {
        color: 'black'
      }
    }

    return (
      <div>
        <TextField
          className={styles.labelStyle}
          styles={disabledStyle}
          onRenderLabel={this.customLabel}  
          validateOnLoad={false} 
          validateOnFocusOut={true}
          {...this.props} 
          onBlur={this.props.onBlur}
        />
      </div>
    )
  }
}