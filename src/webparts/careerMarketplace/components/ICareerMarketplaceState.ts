/* eslint-disable @typescript-eslint/no-explicit-any */
export interface ICareerMarketplaceState {
    currentPage: number;
    departmentList: { key: string; text: string; pageNumber: number; }[];
    jobType: string[];
    city: { key: string; text: string; regionID: string; }[];
    programArea: string[];
    classificationCode: { key: string; text: string; classificationLevelIds: string }[];
    classificationLevel: { key: string; text: string; }[];
    security: { key: string; text: string; }[];
    language: { key: string; text: string; }[];
    wrkArrangement: { key: string; text: string; }[];
    duration: { key: string; text: string; }[];
    wrkSchedule:{ key: string; text: string; }[];
    province: { key: string; text: string; }[];
    region:{ key: string; text: string; }[];
    validationStatus: number;
    userId: string | number;
    hasError:  {key: string, value: string}[] ;
    fieldErrorTitles :string[];
    disableButton: boolean;
    inlineFieldErrors: string[];
    dropdownFields: string[];
    skillsList: { key: string; text: string; }[];
    jobOpportunityId: string;
    jobOpportunityOwner: boolean;
    isLoading: boolean;
    hasTouchedSkillCombo: boolean, 
    postDetails: any;
    isNonJobSeeker: boolean;
    approvedStaffing: boolean;
    workEmail:string;
      
    values: {
      applyEmail: {value: any, pageNumber: number};
      department: { key: string; text: string; pageNumber: number };
      jobTitleEn: {value: string, pageNumber: number};
      jobTitleFr: {value: string, pageNumber: number};
      jobDescriptionEn: {value: string, pageNumber: number};
      jobDescriptionFr: {value: string, pageNumber: number};
      numberOfOpportunities: any;
      deadline: Date | undefined;
      skills: any[],
      jobType: { Label: string; Guid: string; pageNumber: number };
      programArea: any,
      classificationCode: any,
      classificationLevel: any,
      classificationLevelIds: any,
      durationLength:any,
      duration: { key: string; text: string; pageNumber: number };
      security: any,
      city: any, 
      province: any,
      region: any, 
      workArrangment: any, 
      workSchedule: any, 
      languageRequirements:[
        {
          pageNumber: number,
          language: any,
          readingEN: any,
          readingFR: any,
          writtenEN: any,
          writtenFR: any,
          oralEN: any,
          oralFR: any,
        },
      ]
    }
  
  }