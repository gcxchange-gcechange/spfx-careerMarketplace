# Career Marketplace

## Summary

This project is a SharePoint web part featuring a multi-step form that allows users to create a job opportunity. The form supports bilingual functionality, enabling users to switch seamlessly between English and French.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.21.1-green.svg)
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

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.0     | October 1, 2025  | Initial release |


## Disclaimer

**THIS CODE IS PROVIDED _AS IS_ WITHOUT WARRANTY OF ANY KIND, EITHER EXPRESS OR IMPLIED, INCLUDING ANY IMPLIED WARRANTIES OF FITNESS FOR A PARTICULAR PURPOSE, MERCHANTABILITY, OR NON-INFRINGEMENT.**

---

## Minimal Path to Awesome

- Clone this repository
- Ensure that you are at the solution folder
- [sharepoint environment](https://learn.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-development-environment):
  - `npm install -g gulp-cli yo @microsoft/generator-sharepoint --global`
- generate the certificate; `gulp trust-dev-cert`
- in the command-line run:
  - **npm install**
  - **gulp serve**


