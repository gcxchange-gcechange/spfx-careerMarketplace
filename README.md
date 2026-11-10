# Career Marketplace

## Summary

This project is a SharePoint web part featuring a multi-step form that allows users to create a job opportunity. The form supports bilingual functionality, enabling users to switch seamlessly between English and French.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.22.2-green.svg)
![Node.js](https://img.shields.io/badge/Node.js-v122+-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## ✅ Prerequisites
This web part connects to this [this function app](https://github.com/gcxchange-gcechange/appsvc-function-dev-cm-listmgmt-dotnet001).
To successfully run this app, you **must update configuration values** in the following files:

---

## 1. `services.tsx` –  MsGraph API URL for data fetching

Ensure that your `services.tsx` file includes a **valid API base URL** for the `departmentSets` and `sets` functions.

```tsx

const API_BASE_URL = "https://your-api-url.com"; // 🔁 Replace with your actual API URL

export async function departmentSets() {
  const response = await fetch(`${API_BASE_URL}/departments`);
  return response.json();
}

export async function sets() {
  const response = await fetch(`${API_BASE_URL}/sets`);
  return response.json();
}
```
## 2. `servicesConfig.ts` 
```ts
export const createOpportunityConfig = {
  clientId: "your-client-id",                             // 🔁 Required
  createJobApiUrl: "https://your-api-url.com/create-job", // 🔁 Required
  editJobApiUrl: "https://your-api-url.com/edit-job",     // 🔁 Required
  jobTypeTermId: "job-type-guid",                         // 🔁 Required
  jobTypeDeploymentId: "jobTypeTerms-Guid",               // 🔁 Required
  programAreaTermId: "program-area-guid",                 // 🔁 Required
};

const baseJobOpportunityUrl = "https://devgcx.sharepoint.com/sites/your-site.aspx?"; // 🔁 Required
```

## Version history

| Version | Date             | Comments            |
| ------- | ---------------- | --------------------|
| 1.0     | October 1, 2025  | Initial release     |
| 1.1     | November 5, 2026 | SPFX Upgrade 1.22.2 |


## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome
- Clone this repository
- Ensure that you are at the solution folder
- To install the dependencies, in the command-line run:
  - `npm install -g @rushstack/heft`
  - `npm install`
- To debug in the front end:
  - go to the `serve.json` file and update `initialPage` to `https://your-domain-name.sharepoint.com/_layouts/15/workbench.aspx`
  - In the command-line run:
    - `npm run start`
    - You will need to add your client id and azure function to the clientId and url classs members in the SCW.tsx file.
- To deploy:
  - In the command-line run:
    - `npm run  build `
  - Add the webpart to your tenant app store
- Approve the web API permissions
- Add the Webpart to a page
- Modify the property pane according to your requirements



