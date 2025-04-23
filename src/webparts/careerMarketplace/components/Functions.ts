/* eslint-disable @typescript-eslint/no-explicit-any */

import { SelectLanguage } from "./SelectLanguage";


export const toTitleCase = ( value: {key: string, value: string | number}[]): string[] => {
  console.log("ERROR VALUES",value)

  const properCaseValues: string[] = [];
  const convertString: string[] = value.map((item: {key: string, value: string | number}) => item.key.replace(/([A-Z])/g, ' $1').replace(/^ /, '').toLowerCase() );
  properCaseValues.push(...convertString);

  return properCaseValues
}


export const isInvalid = (fieldName: string, inlineErrors:any): boolean | undefined => {
  return  inlineErrors?.includes(fieldName);
}

export  const getLocalizedString = (fieldId: string, prefLang: string): string => {
  const strings = SelectLanguage(prefLang);
  const key = `${fieldId}` as keyof ICareerMarketplaceWebPartStrings;
  console.log(key);
  return  strings[key] || "";
}

