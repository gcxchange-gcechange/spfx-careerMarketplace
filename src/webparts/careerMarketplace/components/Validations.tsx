/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { SelectLanguage } from './SelectLanguage';



export const validateEmpty = (value: string, fieldName: string, language:string): JSX.Element  | undefined  | string=> {
    const strings = SelectLanguage(language);

    if ( value.length === 0 || value === undefined  ) {

        return (
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', margin: '0px', paddingLeft: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700'}}>{strings.cannotBeBlank}</p>
            </div>
        )
    } 
    else if (value.length < 5 && fieldName !== 'numberOfOpportunities' ) {
        return (
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', margin: '0px', paddingLeft: '5px'}}>
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

export const validate = (value: any, language:string ) : string| JSX.Element | undefined => {
    const strings = SelectLanguage(language);
    console.log("VALIDATE:", value)

    if (value === undefined || value === "" ||value.length === 0 || value.key === "false" || value === "0"|| value.key === "" || value === 0) {

        return ( 
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{strings.selectOption}</p>
            </div>
        )
    }


}

export const validateDuration = (value: any, language:string) : string| JSX.Element | undefined => {
    const strings = SelectLanguage(language);
    const min: number = 0;
    const max:number = 36

    if (isNaN(value)) {
        return ( 
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{strings.numberValue}</p>
            </div>
        )
    }

    if (value === "" || undefined || null || value === "0") {
        return ( 
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{strings.cannotBeBlank}</p>
            </div>
        )
    }
    
    if (value < min) {
        return( 
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{strings.lessThanOne}</p>
            </div>
        )
    }
    
    if (value > max) {
        return ( 
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>{strings.requiredField}</p>
            </div>
        )
    }
    

}


  

