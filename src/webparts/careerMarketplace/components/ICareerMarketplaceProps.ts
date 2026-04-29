/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICareerMarketplaceProps {
  prefLang: string;
  context: WebPartContext; 
  userDisplayName: string;
  workEmail: string;
  url: string;
  jobOpportunityId: string | undefined;
  jobOppOwner: string | undefined;
  environment: string;
  list: string;
  list_Columns: string[];


  // clientId: string,
  // createJobApiUrl: string,
  // editJobApiUrl: string,
  // jobTypeTermId: string,
  // programAreaTermId: string,

  devClientId: string,
  devCreateJobApiUrl: string,
  devEditJobApiUrl: string,
  devJobTypeTermId: string,
  devProgramAreaTermId: string,

  uatClientId: string,
  uatCreateJobApiUrl: string,
  uatEditJobApiUrl: string,
  uatJobTypeTermId: string,
  uatProgramAreaTermId: string,

  prodClientId: string,
  prodCreateJobApiUrl: string,
  prodEditJobApiUrl: string,
  prodJobTypeTermId: string,
  prodProgramAreaTermId: string,

  jobTypeDeploymentId: string,
  jobOpportunityListUrl: string;
  jobTypeDeploymentTerms: any[],

  baseUrl: string;
  //domain: string;
  graphId: string;

}
