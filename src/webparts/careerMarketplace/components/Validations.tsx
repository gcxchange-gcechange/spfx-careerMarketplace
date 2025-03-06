/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';


export const validateEmpty = (value: string, fieldName: string): JSX.Element  | undefined  | string=> {

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

    if (value === '' || value === 0) {
        return ( "Please select an option2")
    }
    
}

export const validate = (value: any ) : string| JSX.Element | undefined => {
    console.log("VALIDATE:", value)

    if (value === undefined || value === "" ||value.length === 0 || value.key === "false" || value.Guid === "0"|| value.key === "" || value === 0) {

        return ( 
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>Please select an option</p>
            </div>
        )
    }


}

export const validateDuration = (value: any) : string| JSX.Element | undefined => {

    const min: number = 0;
    const max:number = 36

    if (isNaN(value)) {
        return ( 
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>Value must be a number</p>
            </div>
        )
    }

    if (value === "" || undefined || null || value === "0") {
        return ( 
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>Field is required</p>
            </div>
        )
    }
    
    if (value < min) {
        return( 
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>Value can not be less than 1</p>
            </div>
        )
    }
    
    if (value > max) {
        return ( 
            <div id='error' style={{borderLeft: '2px solid rgb(164, 38, 44)', paddingLeft: '5px', marginTop: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700', color: 'rgb(164, 38, 44)', fontSize: '12px'}}>Field is required</p>
            </div>
        )
    }
    

}


  

