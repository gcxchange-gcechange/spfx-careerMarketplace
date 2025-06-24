/* eslint-disable @rushstack/no-new-null */
import { WebPartContext } from "@microsoft/sp-webpart-base";

// import pnp and pnp logging system
import { ISPFXContext, spfi, SPFI, SPFx } from "@pnp/sp";
import { LogLevel, PnPLogging } from "@pnp/logging";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import "@pnp/sp/batching";
import "@pnp/sp/site-users/web";
import "@pnp/sp/sites"

let _sp: SPFI | null = null;

export const getSP = (context?: WebPartContext): SPFI => {
  if (!!context) {
    //You must add the @pnp/logging package to include the PnPLogging behavior it is no longer a peer dependency
    // The LogLevel set's at what level a message will be written to the console
    _sp = spfi().using(SPFx(context as ISPFXContext)).using(PnPLogging(LogLevel.Warning));
  }
  return _sp!;
};