import { WebPartContext } from "@microsoft/sp-webpart-base";

export interface ICareerMarketplaceProps {
  description: string;
  context: WebPartContext;
  list: string[];

}
