

export const toTitleCase = ( value: any): string[] => {

  const properCaseValues: any[] = [];


  const convertString = value.map((item: any) => item.key.replace(/([A-Z])/g, ' $1').replace(/^ /, '').toLowerCase() );
 
  properCaseValues.push(convertString);

  console.log("new",properCaseValues)
  return properCaseValues


}