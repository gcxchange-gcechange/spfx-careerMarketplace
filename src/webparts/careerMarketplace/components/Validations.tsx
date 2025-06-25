/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { SelectLanguage } from './SelectLanguage';
import styles from './CareerMarketplace.module.scss';
import { getLocalizedString } from './Functions';



export const validateEmpty = (value: string, fieldName: string, language:string): JSX.Element  | undefined  | string=> {
    const strings = SelectLanguage(language);
    const key = fieldName as keyof ICareerMarketplaceWebPartStrings;
    const minCharKey = `${fieldName}-minChar` as keyof ICareerMarketplaceWebPartStrings;
    const maxCharKey = `${fieldName}-maxChar` as keyof ICareerMarketplaceWebPartStrings;
    const localizedKey = strings[key] || fieldName;
    const localizedMinChar = strings[minCharKey] || `Minimum 5 characters for ${localizedKey}`;
    const localizedMaxChar = strings[maxCharKey] || `MAX`;
    const titleMaxCharFields = ["jobTitleEn", "jobTitleFr"];
    const descriptionMaxCharFields = ['jobDescriptionEn', 'jobDescriptionFr'];

    if ( value.length === 0 || value === undefined  ) {

        return (
            <div role="alert" id={`${fieldName}-error`} className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700'}}>{localizedKey}</p>
            </div>
        )
    } 
    else if (value.length < 5 && fieldName !== 'numberOfOpportunities' ) {
        return (
            <div role="alert" id={`${fieldName}-error`} className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700'}}>{localizedMinChar}</p>
            </div>
        )
    } else if (value.length > 255 && titleMaxCharFields.includes(fieldName)) {
        return (
             <div role="alert" id={`${fieldName}-error`} className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700'}}>{localizedMaxChar}</p>
            </div>
        )
    }
    else if (value.length > 10000 && descriptionMaxCharFields.includes(fieldName)) {
        return (
             <div role="alert" id={`${fieldName}-error`} className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700'}}>{localizedMaxChar}</p>
            </div>
        )
    }
    
    

}


export const validate = (value: any, language:any, fieldName?: string ) : string| JSX.Element | undefined => {

    if (value === undefined || value.key === undefined ||value === "" ||value.length === 0 || value.key === "false" || value === "0"|| value.key === "" || value === 0) {

        return ( 
            <div role="alert" id={`${fieldName}-error`} className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px', marginTop:'5px'}}> {getLocalizedString(`${fieldName}`, language)}</p>
            </div>
        )
    }


}

export const validateNumericField = (value: any, language:string, fieldName: string) : string| JSX.Element | undefined => {
    const min: number = 1;
    const max:number = 60;

    if (value === undefined || value === "" || value === null || value === 0 || value === '0') {

        return ( 
            <div role="alert" id={`${fieldName}-error`} className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{ getLocalizedString(`${fieldName}`, language)}</p>
            </div>
        )
    }

    if (value < min) {
        return( 
            <div role="alert" id={`${fieldName}-error`} className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{getLocalizedString(`${fieldName}`, language)}</p>
            </div>
        )
    }

    
    if (value > max) {
        return ( 
            <div role="alert" id={`${fieldName}-error`} className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{ getLocalizedString(`${fieldName}`, language)}</p>
            </div>
        )
    }
    

}



  

