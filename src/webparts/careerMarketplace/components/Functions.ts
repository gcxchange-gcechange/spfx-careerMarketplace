/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable@typescript-eslint/explicit-function-return-type */

import { SelectLanguage } from "./SelectLanguage";

export interface IEnvConfig {
  clientId: string;
  createJobApiUrl: string;
  editJobApiUrl: string;
  jobTypeTermId: string;
  jobTypeDeploymentId: string;
  programAreaTermId: string;
}



export const toTitleCase = ( value: any): string[] => {
  const properCaseValues: string[] = [];
  const convertString: string[] = value.map((item: any) => item.key.replace(/([A-Z])/g, ' $1').replace(/^ /, '').toLowerCase() );
  properCaseValues.push(...convertString);

  return properCaseValues
}


export const isInvalid = (fieldName: string, inlineErrors:any): boolean | undefined => {
  return  inlineErrors?.includes(fieldName);
}

export  const getLocalizedString = (fieldId: string, prefLang: string): string => {
  const strings = SelectLanguage(prefLang);
  const key = `${fieldId}` as keyof ICareerMarketplaceWebPartStrings;
  return  strings[key] || "";
}


export const getEnvConfig = (environment: string, props: any): IEnvConfig => {
  const configs: Record<string, IEnvConfig> = {
     dev: {
      clientId: props.devClientId,
      createJobApiUrl: props.devCreateJobApiUrl,
      editJobApiUrl: props.devEditJobApiUrl,
      jobTypeTermId: props.devJobTypeTermId,
      jobTypeDeploymentId: props.devJobTypeDeploymentId,
      programAreaTermId: props.devProgramAreaTermId
    },
    uat: {
      clientId: props.uatClientId,
      createJobApiUrl: props.uatCreateJobApiUrl,
      editJobApiUrl: props.uatEditJobApiUrl,
      jobTypeTermId: props.uatJobTypeTermId,
      jobTypeDeploymentId: props.uatJobTypeDeploymentId,
      programAreaTermId: props.uatProgramAreaTermId
    },
   prod:{
      clientId: props.prodClientId,
      createJobApiUrl: props.prodCreateJobApiUrl,
      editJobApiUrl: props.prodEditJobApiUrl, 
      jobTypeTermId: props.prodJobTypeTermId,
      jobTypeDeploymentId: props.prodJobTypeDeploymentId,
      programAreaTermId: props.prodProgramAreaTermId
   }
  };

  const config = configs[environment || 'dev']; // Default to 'dev' if environment is not specified

  if (!config) {
    throw new Error(`Unknown environment: ${environment}, defaulting to Dev`);
  }

  return config;
};

const baseJobOpportunityUrl = "https://devgcx.sharepoint.com/sites/CM-test/SitePages/Job-Opportunity.aspx?";

export const getJobOpportunityUrl = (jobOpportunityId: string | undefined ):string => {
  return `${baseJobOpportunityUrl}?JobOpportunityId=${jobOpportunityId}`
}

