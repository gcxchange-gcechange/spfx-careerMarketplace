/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICareerMarketplaceProps {
  prefLang: string;
  context: WebPartContext; 
  userDisplayName: string;
  workEmail: string;
  url: string;
  edit: boolean;
  jobOpportunityId: string;
  jobOppOwner: string | undefined;
  clientId: string,
  createJobApiUrl: string,
  editJobApiUrl: string,
  jobTypeTermId: string,
  programAreaTermId: string,
  jobOpportunityListUrl: string;
  jobTypeDeploymentTerms: any[],
  list: string;
  multiColumn: string;

}
