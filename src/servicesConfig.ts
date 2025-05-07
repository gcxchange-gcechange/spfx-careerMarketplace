/* eslint-disable @rushstack/no-new-null */


export const createOpportunityConfig = {
  clientId: "c121f403",
  createJobApiUrl: "api/CreateJobOpportunity",
  editJobApiUrl:"api/UpdateJobOpportunity",
  jobTypeTermId: "45f37f08-3ff4-4d84-bf21-4a77ddffcf3e",
  programAreaTermId:"bd807536-d8e7-456b-aab0-fae3eecedd8a",
};

const baseJobOpportunityUrl = "";

export const getJobOpportunityUrl = (jobOpportunityId: string | null ):string => {
  return `${baseJobOpportunityUrl}?JobOpportunityId=${jobOpportunityId}`
}