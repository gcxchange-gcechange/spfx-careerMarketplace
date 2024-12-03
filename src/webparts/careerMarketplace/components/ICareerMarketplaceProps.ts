/* eslint-disable @typescript-eslint/no-explicit-any */
import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICareerMarketplaceProps {
  description: string;
  context: WebPartContext;
  userDisplayName: string;
  workEmail: string;
  url: string;

}
