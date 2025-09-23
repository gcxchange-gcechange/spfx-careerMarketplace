/* eslint-disable @rushstack/no-new-null */


export const createOpportunityConfig = {
  clientId: "c121f403-ff41-4db3-8426-f3b9c5016cd4",
  createJobApiUrl: " api/CreateJobOpportunity",
  editJobApiUrl:" api/UpdateJobOpportunity",
  jobTypeTermId: "45f37f08-3ff4-4d84-bf21-4a77ddffcf3e",
  jobTypeDeploymentId: "2d309c8b-7b87-49ed-9e35-9b7fc3aa95ba",
  programAreaTermId:"bd807536-d8e7-456b-aab0-fae3eecedd8a",
};

const baseJobOpportunityUrl = "https://devgcx.sharepoint.com/sites/CM-test/SitePages/Job-Opportunity.aspx?";

export const getJobOpportunityUrl = (jobOpportunityId: string | null ):string => {
  return `${baseJobOpportunityUrl}?JobOpportunityId=${jobOpportunityId}`
}