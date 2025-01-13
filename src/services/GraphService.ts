/* eslint-disable promise/param-names */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { MSGraphClientV3 } from "@microsoft/sp-http";
import { WebPartContext } from "@microsoft/sp-webpart-base";


export class GraphService {

    static context: WebPartContext;


    public static setup(context: WebPartContext): void {
        this.context = context;
    }

    
    public static _departmentSets(termSetId: string): Promise<void> {
        return new Promise<void>((resolve, reject) => {
          try {
            this.context.msGraphClientFactory
              .getClient("3")
              .then((client: MSGraphClientV3) => {
                client
                  .api(`/sites/devgcx.sharepoint.com/termStore/groups/656c725c-def6-46cd-86df-b51f1b22383e/sets/${termSetId}/terms`) 
                  .get((error: any, response: any, rawResponse: any) => {
                     console.log("RESPONSE",response.value)
                   
                    resolve(response);
                  })
                  .catch((error: any) => {
                    console.error("ERROR", error);
                    reject(error)
                  })
              });
          } catch (error) {
            console.error("ERROR-" + error);
          }
        });
      }

      public static _sets(termSetId: any): Promise<any[]> {
        return Promise.all(
          termSetId.map((id: any) => {
            return new Promise<any>((resolve, reject) => {
              try {
                this.context.msGraphClientFactory
                  .getClient("3")
                  .then((client: MSGraphClientV3) => {
                    client
                      .api(`/sites/devgcx.sharepoint.com/termStore/groups/656c725c-def6-46cd-86df-b51f1b22383e/sets/${id}/terms`)
                      .get((error: any, response: any, rawResponse: any) => {
                        if (error) {
                          console.error("ERROR", error);
                          reject(error);
                        } else {
                          console.log("RESPONSE", response.value);
                          resolve(response.value); // Return the data
                        }
                      });
                  });
              } catch (error) {
                console.error("ERROR-" + error);
                reject(error);
              }
            });
          })
        );
      }


       
}
      
 
export default GraphService;