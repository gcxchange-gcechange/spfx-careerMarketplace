/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';


export const validateEmpty = (value: string, fieldName: string): JSX.Element  | undefined  | string=> {

    console.log(fieldName);
    console.log(value)
    const findErrorElement = document.getElementById('error');
    console.log(findErrorElement)

    if ( value.length === 0 || value === undefined  ) {

        return (
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', margin: '0px', paddingLeft: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700'}}>Field cannot be blank</p>
            </div>
        )
    } 
    else if (value.length < 5 && fieldName !== 'numberOfOpportunities' ) {
        return (
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', margin: '0px', paddingLeft: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700'}}>Minimum 5 characters required</p>
            </div>
        )
    }
    

}

export const validateDropdowns = (value: any) : string | undefined  => {
    const findErrorElement = document.getElementById('error');
    console.log(findErrorElement)
    if (value === '') {
        return ( "Please select an option")
    }
    
}

export const validate =(value: any) : string| JSX.Element | undefined => {

    const findErrorElement = document.getElementById('error');
    console.log(findErrorElement)
    
    if (value === undefined || value === '' || value.length === 1) {

        return ( 
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>Please select an option</p>
            </div>
        )
    }

}

