/* eslint-disable @typescript-eslint/no-explicit-any */


export const toTitleCase = ( value: {key: string, value: string | number}[]): string[] => {
  console.log("ERROR VALUES",value)

  const properCaseValues: string[] = [];


  const convertString: string[] = value.map((item: {key: string, value: string | number}) => item.key.replace(/([A-Z])/g, ' $1').replace(/^ /, '').toLowerCase() );
 
  properCaseValues.push(...convertString);

  console.log("new",properCaseValues)
  return properCaseValues


}


export const isInvalid = (fieldName: string, inlineErrors:any): boolean | undefined => {
  return  inlineErrors?.includes(fieldName);
}

