

export const toTitleCase = ( value: {key: string, value: string | number}[]): string[] => {

  const properCaseValues: any[] = [];


  const convertString = value.map((item: {key: string, value: string | number}) => item.key.replace(/([A-Z])/g, ' $1').replace(/^ /, '').toLowerCase() );
 
  properCaseValues.push(convertString);

  console.log("new",properCaseValues)
  return properCaseValues


}