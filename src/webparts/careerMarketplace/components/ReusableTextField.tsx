import { ILabelStyles, ITextFieldStyles,  Label,  Stack, StackItem, TextField } from '@fluentui/react';
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
  ariaInvalid?: boolean;
  maxLength?: number;
  instruction?: string;
  placeholder?: string;
}


export default class ReusableTextField extends React.Component<IReusableTextFieldProps> {


  public customLabel = (): JSX.Element => {

    const labelSpacing: Partial<ILabelStyles> = {
      root:{
        padding:'0px 0px 4px 0px'
      }
    }

    return (
    <Stack  horizontal verticalAlign="center" >
      <StackItem>
        <Label id={`${this.props.id}-label`} styles={labelSpacing}>
          <p className={styles.mrg0} style={{paddingBottom:'8px'}}>
            <span  aria-hidden="true" style={{color: 'rgb(164, 38, 44)'}} >
              *
            </span>
             <span className={styles.visuallyHidden}>{this.props.ariaLabelRequired}</span>
            {this.props.title}
          </p>
          <p className={styles.instruction}>{this.props.instruction}</p>
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
      <div style={{marginTop: '16px'}}>
        <TextField
          aria-labelledby={`${this.props.id}-label`}
          aria-invalid={this.props.ariaInvalid}
          className={styles.labelStyle}
          styles={disabledStyle}
          onRenderLabel={this.customLabel}  
          validateOnLoad={false} 
          validateOnFocusOut={true}
          autoComplete='off'
          {...this.props} 
          onBlur={this.props.onBlur}
        />
      </div>
    )
  }
}