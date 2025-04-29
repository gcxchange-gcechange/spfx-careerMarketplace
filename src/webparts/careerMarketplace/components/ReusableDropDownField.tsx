/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { Dropdown, IDropdownOption, IDropdownStyles,  Label, Stack, StackItem} from '@fluentui/react';
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


    //const excludedIds = ['readingEN', 'writtenEN', 'oralEN','readingFr', 'writtenFr', 'oralFr' ];

    return (
    <Stack  horizontal verticalAlign="center" >
      <StackItem >
        <Label  id={`${this.props.id}-label`} htmlFor={this.props.id} >
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
          {this.props.id === 'jobType' ? (<p className={styles.instruction}><a href="http://www.gcpedia.gc.ca/wiki/Jobs_Marketplace" target="_blank" rel="noreferrer">{this.props.instruction}</a></p>) 
        : this.props.id === 'skills' ?
         (<p className={styles.instruction}>{this.props.instruction} 
        {
        this.props.prefLang === "en-en" 
        ? <a href="http://www.gcpedia.gc.ca/wiki/GCconnex_Skill_List_des_compténces_se_trouvant_sur_GCconnex?setlang=en&uselang=en" target="_blank" rel="noreferrer">{this.props.instructionLink}</a>
        : <a href="http://www.gcpedia.gc.ca/wiki/GCconnex_Skill_List_des_compténces_se_trouvant_sur_GCconnex?setlang=fr&uselang=fr" target="_blank" rel="noreferrer">{this.props.instructionLink}</a>
        }</p>) 
        : (<p className={styles.instruction}>{this.props.instruction}</p>)}
        </Label>
       
        
      </StackItem>
    </Stack>
    )
  }


  public render(): React.ReactElement<IReusableDropdownFieldProps> {

    console.log("selected", this.props.title)
    const dropdownStyle: Partial<IDropdownStyles> = {
   
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
      <div>
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

         {/* {
             this.props.inlineFieldErrors?.includes(this.props.id) && (
              validate(this.props.selectedKey, this.props.prefLang,  this.props.id)
            )
          }  */}
      </div>

      </>

    )
  }
}