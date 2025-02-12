/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles,  Label, Stack, StackItem} from '@fluentui/react';
import styles from './CareerMarketplace.module.scss';


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
  defaultSelectedKeys?: string[];
  ariaLabelRequired: string;
  
}


export default class ReusableDropdownField extends React.Component<IReusableDropdownFieldProps> {

 

  public customLabel = (): JSX.Element => {

    const excludedIds = ['readingEN', 'writtenEN', 'oralEN','readingFr', 'writtenFr', 'oralFr' ];

    return (
    <Stack  horizontal verticalAlign="center" >
      <StackItem >
        <Label htmlFor={this.props.id} className={!excludedIds.includes(this.props.id) ? styles.width200 : ''} >
          { this.props.id !== 'duration' ? <span style={{color: 'rgb(164, 38, 44)'}} aria-label={'required'}>
            *
          </span>
          : ''
          }
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
      },
      errorMessage: {
        fontWeight: 700,
        borderLeft: '2px solid rgb(164, 38, 44)',
        paddingLeft: '5px',
        marginTop: '2px'
      },
      dropdownItemDisabled: {
        color: 'black',
      }
    }

    const langDropdownStyle : Partial<IDropdownStyles>= {
      dropdown: {
        width: 50
      }
    }


    const excludedIds = ['readingEN', 'writtenEN', 'oralEN','readingFr', 'writtenFr', 'oralFr'];

   

    return (
      <>      
      <div>
        <Dropdown
          options={this.props.options as IDropdownOption[]} 
          onRenderLabel={this.customLabel} 
          className={ !excludedIds.includes(this.props.id) ? styles.labelStyle : styles.languageLabels} 
          multiSelect={this.props.multiselect} 
          styles={!excludedIds.includes(this.props.id) ? dropdownStyle : langDropdownStyle} 
          {...this.props}
        />        
      </div>

      </>

    )
  }
}