/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';


export const validateEmpty = (value: string): JSX.Element  | undefined  | string=> {

    console.log("valueVal", value)

    if ( value.length === 0 || value === undefined ) {

        return (
            <div style={{borderLeft: '2px solid rgb(164, 38, 44)', margin: '0px', paddingLeft: '5px'}}>
                <p style={{margin: '0px', fontWeight: '700'}}>Field cannot be blank</p>
            </div>
        )
    } 

}

export const validateDropdowns = (value: any) : string | undefined  => {
    console.log("val", value)

    if (value === '') {
        return ( "Please select an option")
    }
    
}

export const validate =(value: any) : string | undefined => {
    
    if (value === undefined) {

        return (
            "ERROR"
        )
    }

    // const getJobType = document.getElementById('jobType');

    // let validationMessage: string | undefined =  undefined;

    // if (getJobType) {
    //    getJobType.addEventListener("keydown", function (event) {
    //         if (event.key === "Tab"  && value === undefined) {
    //                 validationMessage = "Please";
    //         }
    //    }) 
    // } 
    // console.log(validationMessage)
    // return (
    //     validationMessage
    // )
}

