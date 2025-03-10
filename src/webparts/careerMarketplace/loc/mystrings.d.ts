declare interface ICareerMarketplaceWebPartStrings {
  "PropertyPaneDescription": string;
  "BasicGroupName": string;
  //Page1 - Poster Information
  "posterInformation_title": string;
  "posterInformation_para1": string;
  "fullName": string;
  "department": string;
  "workEmail": string;

  //Page 2 - Opportunity Details
  "oppotunityDetails_Title": string;
  "oppotunityDetails_para1": string;
  "job_Title": string;
  "number_of_Opportunities": string;
  "job_Description": string;
  "job_Type":string;
  "program_Area": string;
  "classification_Code": string;
  "classification_Level": string;
  "duration": string;
  "length": string;
  "time_period": string;
  "application_deadline": string;
  

  //Page 3 - Opportunity Requirements
  "opportunityRequirements_title": string;
  "opportunityRequirements_para1": string;
  "skills":string;
  "time_in_hours": string;
  "province": string;
  "region": string;
  "city": string;
  "security_level": string;
  "language_requirements": string;
  "writtenEN": string;
  "readingEN": string;
  "oralEN": string;
  "writtenFR": string;
  "readingFR": string;
  "oralFR": string;
  "work_arrangment": string;
  "approved_staffing": string;


 
  //Page 4 - Review and Submit
  "reviewSubmit_title": string;
  "reviewSubmit_para1": string;

  //complete
  "complete_title": string;
  "complete_para1": string;
  "view": string;
  "complete_para2": string;

  //update
  "update_para1":string;


  //buttons
  "prev_btn":string;
  "next_btn":string;

  //accessibility
  'required':string;
  'asteriks':string;

  //languages
  "english":string;
  "french":string;
  "select":string;
  "submit_btn": string;
  "complete_button": string;

}

declare module 'CareerMarketplaceWebPartStrings' {
  const strings: ICareerMarketplaceWebPartStrings;
  export = strings;
}
