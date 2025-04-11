/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { SelectLanguage } from './SelectLanguage';
import styles from './CareerMarketplace.module.scss';



export const validateEmpty = (value: string, fieldName: string, language:string): JSX.Element  | undefined  | string=> {
    const strings = SelectLanguage(language);


    const key = fieldName as keyof ICareerMarketplaceWebPartStrings;
    const localizedKey = strings[key] || fieldName;

    if ( value.length === 0 || value === undefined  ) {

        return (
            <div id='error' className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700'}}>{localizedKey}</p>
            </div>
        )
    } 
    else if (value.length < 5 && fieldName !== 'numberOfOpportunities' ) {
        return (
            <div id='error' className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700'}}>{strings.minChar}</p>
            </div>
        )
    }
    

}

// export const validateDropdowns = (value: any) : string | undefined  => {

//     if (value === '' || value === 0) {
//         return ( "Please select an option2")
//     }
    
// }

export const validate = (value: any, language:string, fieldName?: string ) : string| JSX.Element | undefined => {
    const strings = SelectLanguage(language);
    const key = fieldName as keyof ICareerMarketplaceWebPartStrings;
    const localizedKey = strings[key] || fieldName;

    if (value === undefined || value === "" ||value.length === 0 || value.key === "false" || value === "0"|| value.key === "" || value === 0) {

        return ( 
            <div id={`${fieldName}-error`} className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px', marginTop:'5px'}}> {localizedKey}</p>
            </div>
        )
    }


}

export const validateNumericField = (value: any, language:string, fieldName: string) : string| JSX.Element | undefined => {
    const strings = SelectLanguage(language);
    const key = fieldName as keyof ICareerMarketplaceWebPartStrings;
    const localizedKey = strings[key] || fieldName;
    const min: number = 0;
    const max:number = 36

    // if (isNaN(value)) {
    //     return ( 
    //         <div id='error'className={styles.errorLine}>
    //             <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{strings.numberValue}</p>
    //         </div>
    //     )
    // }

    if (value === "" || undefined || null || value === "0") {
        return ( 
            <div id='error' className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{localizedKey}</p>
            </div>
        )
    }
    
    if (value < min) {
        return( 
            <div id='error' className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{strings.lessThanOne}</p>
            </div>
        )
    }
    
    if (value > max) {
        return ( 
            <div id='error' className={styles.errorLine}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{localizedKey}</p>
            </div>
        )
    }
    

}


  

