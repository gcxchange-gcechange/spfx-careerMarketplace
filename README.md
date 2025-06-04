# career marketplace

## Summary

This project is a SharePoint web part featuring a multi-step form that allows users to create a job opportunity. The form supports bilingual functionality, enabling users to switch seamlessly between English and French.

## Used SharePoint Framework Version

![version](https://img.shields.io/badge/version-1.20.0-green.svg)

## Applies to

- [SharePoint Framework](https://aka.ms/spfx)
- [Microsoft 365 tenant](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)

> Get your own free development tenant by subscribing to [Microsoft 365 developer program](http://aka.ms/o365devprogram)

## ✅ Prerequisites

To successfully run this app, you **must update configuration values** in the following files:

---

## 1. `services.tsx` – API URL for Data Fetching

Ensure that your `services.tsx` file includes a **valid API base URL** for the `departmentSets` and `sets` functions.


const API_BASE_URL = "https://your-api-url.com"; // 🔁 Replace with your actual API URL

export async function departmentSets() {
  const response = await fetch(`${API_BASE_URL}/departments`);
  return response.json();
}

export async function sets() {
  const response = await fetch(`${API_BASE_URL}/sets`);
  return response.json();
}

export const createOpportunityConfig = {
  clientId: "your-client-id", // 🔁 Required
  createJobApiUrl: "https://your-api-url.com/create-job", // 🔁 Required
  editJobApiUrl: "https://your-api-url.com/edit-job",     // 🔁 Required
  jobTypeTermId: "job-type-guid",                         // 🔁 Required
  programAreaTermId: "program-area-guid",                 // 🔁 Required
};

const baseJobOpportunityUrl = "https://devgcx.sharepoint.com/sites/CM-test/SitePages/Job-Opportunity.aspx?";


## Solution

| Solution    | Author(s)                                               |
| ----------- | ------------------------------------------------------- |
| folder name | Author details (name, company, twitter alias with link) |

## Version history

| Version | Date             | Comments        |
| ------- | ---------------- | --------------- |
| 1.1     | March 10, 2021   | Update comment  |
| 1.0     | January 29, 2021 | Initial release |

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

> Include any additional steps as needed.

## Features

Description of the extension that expands upon high-level summary above.

This extension illustrates the following concepts:

- topic 1
- topic 2
- topic 3

> Notice that better pictures and documentation will increase the sample usage and the value you are providing for others. Thanks for your submissions advance.

> Share your web part with others through Microsoft 365 Patterns and Practices program to get visibility and exposure. More details on the community, open-source projects and other activities from http://aka.ms/m365pnp.

## References

- [Getting started with SharePoint Framework](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/set-up-your-developer-tenant)
- [Building for Microsoft teams](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/build-for-teams-overview)
- [Use Microsoft Graph in your solution](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/web-parts/get-started/using-microsoft-graph-apis)
- [Publish SharePoint Framework applications to the Marketplace](https://docs.microsoft.com/en-us/sharepoint/dev/spfx/publish-to-marketplace-overview)
- [Microsoft 365 Patterns and Practices](https://aka.ms/m365pnp) - Guidance, tooling, samples and open-source controls for your Microsoft 365 development
