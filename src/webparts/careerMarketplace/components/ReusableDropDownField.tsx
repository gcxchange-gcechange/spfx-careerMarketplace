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
  instruction?: string;
  instructionLink?: string;
  prefLang?: string;
  
}


export default class ReusableDropdownField extends React.Component<IReusableDropdownFieldProps> {

 

  public customLabel = (): JSX.Element => {


    const excludedIds = ['readingEN', 'writtenEN', 'oralEN','readingFr', 'writtenFr', 'oralFr' ];

    return (
    <Stack  horizontal verticalAlign="center" >
      <StackItem >
        <Label  id={`${this.props.id}-label`} htmlFor={this.props.id} className={!excludedIds.includes(this.props.id) ? styles.width200 : ''} >
          <span>
          { this.props.id !== 'duration' 
          ? 
            <>
              <span style={{ color: 'rgb(164, 38, 44)' }} aria-hidden="true">
                *
              </span>
              <span className={styles.visuallyHidden}>{this.props.ariaLabelRequired}</span>
            </>
          : ''
          }
            {this.props.title}
          </span>
          {this.props.id === 'jobType' ? (<p className={styles.instruction}><a href="http://www.gcpedia.gc.ca/wiki/Jobs_Marketplace">{this.props.instruction}</a></p>) 
        : this.props.id === 'skills' ?
         (<p className={styles.instruction}>{this.props.instruction} 
        {
        this.props.prefLang === "en-en" 
        ? <a href="http://www.gcpedia.gc.ca/wiki/GCconnex_Skill_List_des_compténces_se_trouvant_sur_GCconnex?setlang=en&uselang=en">{this.props.instructionLink}</a>
        : <a href="http://www.gcpedia.gc.ca/wiki/GCconnex_Skill_List_des_compténces_se_trouvant_sur_GCconnex?setlang=fr&uselang=fr">{this.props.instructionLink}</a>
        }</p>) 
        : (<p className={styles.instruction}>{this.props.instruction}</p>)}
        </Label>
       
        
      </StackItem>
    </Stack>
    )
  }


  public render(): React.ReactElement<IReusableDropdownFieldProps> {


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
        width: 50
      }
      
    }
    
    const excludedIds = ['readingEN', 'writtenEN', 'oralEN','readingFr', 'writtenFr', 'oralFr'];

   

    return (
      <>      
      <div>
        <Dropdown
          aria-labelledby={`${this.props.id}-label`}
          options={this.props.options as IDropdownOption[]} 
          onRenderLabel={this.customLabel} 
          multiSelect={this.props.multiselect} 
          className={!excludedIds.includes(this.props.id) ? styles.labelStyle : styles.languageLabels} 
          styles={!excludedIds.includes(this.props.id) ? dropdownStyle : langDropdownStyle} 
          {...this.props}
        />        
      </div>

      </>

    )
  }
}