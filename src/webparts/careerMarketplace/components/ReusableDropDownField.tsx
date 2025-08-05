/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles, Label, Link, Stack, StackItem} from '@fluentui/react';
import styles from './CareerMarketplace.module.scss';
//import { validate } from './Validations';


export interface IReusableDropdownFieldProps {
  id: string;
  name: string;
  title?: string;
  options?: any[];
  onChange: (event: any, item: any) => void;
  readOnly?: boolean;
  disabled?: boolean;
  selectedKey?: string[];
  selectedKeys?: string[];
  multiselect?: boolean;
  defaultSelectedKeys?: string[];
  ariaLabelRequired: string;
  instruction?: string;
  instructionLink?: string;
  prefLang?: string;
  ariaInvalid?: boolean;
  inlineFieldErrors?: string[];
  errorMessage?: any;
 
}


export default class ReusableDropdownField extends React.Component<IReusableDropdownFieldProps> {


  public customLabel = (): JSX.Element => {

  

    return (
    <Stack  horizontal verticalAlign="center" >
      <StackItem>
        <Label  id={`${this.props.id}-label`} >
          <p className={styles.mrg0}>
          { this.props.id === 'duration' 
          ? 
           ""
          : 
           <>
          <span style={{ color: 'rgb(164, 38, 44)' }} aria-hidden="true">
            *
          </span>
          <span className={styles.visuallyHidden}>{this.props.ariaLabelRequired}</span>
          </>
          }
            {this.props.title}
          </p>
          {this.props.id === 'jobType' ? (<p className={styles.instruction}><Link underline={true} href="http://www.gcpedia.gc.ca/wiki/Jobs_Marketplace" target="_blank" rel="noreferrer">{this.props.instruction}</Link></p>) 
        : (<p className={styles.instruction}>{this.props.instruction}</p>)}
        </Label>
      </StackItem>
    </Stack>
    )
  }



  public render(): React.ReactElement<IReusableDropdownFieldProps> {
    



    const dropdownStyle: Partial<IDropdownStyles> = {
      dropdownOptionText: { overflow: 'visible', whiteSpace: 'normal' },
      dropdownItem: {
         selectors: {
          ':hover': {
            height: 'auto!important'
          }
        },
        whiteSpace: 'normal',
        wordBreak: 'break-word',
      },
      // dropdownItem: {
      //   whiteSpace: 'normal',
      //   wordBreak: 'break-word',
      // },
      errorMessage: {
        fontWeight: 700,
        borderLeft: '2px solid rgb(164, 38, 44)',
        paddingLeft: '5px',
        marginTop: '2px'
      },
      title: {
        color: 'black',
      }

    }

    const langDropdownStyle : Partial<IDropdownStyles>= {
      dropdown: {
        width: 200
      },
      errorMessage: {
        fontWeight: 700,
        borderLeft: '2px solid rgb(164, 38, 44)',
        paddingLeft: '5px',
        marginTop: '2px'
      },
      
    }
    
    const excludedIds = ['readingEN', 'writtenEN', 'oralEN','readingFR', 'writtenFR', 'oralFR'];
  

    return (
      <>      
        <Dropdown
          aria-labelledby={`${this.props.id}-label`}
          aria-invalid={this.props.ariaInvalid}
          options={this.props.options as IDropdownOption[]} 
          onRenderLabel={this.customLabel} 
          multiSelect={this.props.multiselect} 
          className={styles.labelStyle} 
          styles={!excludedIds.includes(this.props.id) ? dropdownStyle : langDropdownStyle} 
          {...this.props}
        />       
      </>

    )
  }
}