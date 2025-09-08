/* eslint-disable @rushstack/no-new-null */


export const createOpportunityConfig = {
  clientId: "ce84ae3b-5f99-4316-8c7e-135aa35f67ab",
  createJobApiUrl: " api/CreateJobOpportunity",
  editJobApiUrl:" api/UpdateJobOpportunity",
  jobTypeTermId: "45f37f08-3ff4-4d84-bf21-4a77ddffcf3e",
  programAreaTermId:"bd807536-d8e7-456b-aab0-fae3eecedd8a",
};

const baseJobOpportunityUrl = "https://devgcx.sharepoint.com/sites/CM-test/SitePages/Job-Opportunity.aspx?";

export const getJobOpportunityUrl = (jobOpportunityId: string | null ):string => {
  return `${baseJobOpportunityUrl}?JobOpportunityId=${jobOpportunityId}`
}