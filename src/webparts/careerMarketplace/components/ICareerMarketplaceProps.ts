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
  apiUrl: string,
  clientId: string,
  apiUrlEdit: string,

}
