declare interface ICareerMarketplaceWebPartStrings {
  "PropertyPaneDescription": string;
  "BasicGroupName": string;

  //Initial Page
  "InitialPage_title1":string;
  "InitialPage_para1":string;
  "InitialPage_para1_a":string;
  "InitialPage_para1_b":string;
  "InitialPage_para2":string;
  "InitalPage_checkbox_txt":string;  
  "InitialPage_next_btn":string;
  
  //Page1 - Poster Information
  "posterInformation_title": string;
  "posterInformation_para1": string;
  "fullName": string;
  "departmentField": string;
  "workEmail": string;

  //Page 2 - Opportunity Details
  "oppotunityDetails_Title": string;
  "oppotunityDetails_para1": string;
  "job_Title": string;
  "jobTitle_Instructions":string;
  "number_of_Opportunities": string;
  "job_Description": string;
  "jobDescription_Instructions": string;
  "job_Type":string;
  "job_Type_description": string;
  "program_Area": string;
  "programArea_description": string,
  "classification_Code": string;
  "classification_Code_description":string,
  "classification_Level": string;
  "classification_Level_description":string;
  "durationField": string;
  "durationDescription":string;
  "length": string;
  "time_period": string;
  "application_deadline": string;
  "application_deadline_description": string;
  

  //Page 3 - Opportunity Requirements
  "opportunityRequirements_title": string;
  "opportunityRequirements_para1": string;
  "skillsField":string;
  "skills_description": string;
  "skills_description_link":string;
  "time_in_hours": string;
  "provinceField": string;
  "provinceField_description":string;
  "regionField": string;
  "cityField": string;
  "security_level": string;
  "security_level_description": string;
  "language_requirements": string;
  "language_requirements_description": string;
  "writtenENField": string;
  "readingENField": string;
  "oralENField": string;
  "writtenFRField": string;
  "readingFRField": string;
  "oralFRField": string;
  "work_arrangment": string;
  "work_arrangment_description": string;
  "approved_staffing": string;
  "approved_staffing_description":string,
  "approved_staffing_checkbox": string,



 
  //Page 4 - Review and Submit
  "reviewSubmit_title": string;
  "reviewSubmit_para1": string;
  "duration_length": string;
  "duration_time_period": string;

  //complete
  "complete_title": string;
  "complete_para1": string;
  "complete_para2": string;
  "complete_para2_bold":string;
  "complete_para2_b": string;
  "view": string;
  "complete_para3": string;
  "complete_para4": string;


  //errorPage

  "server_error_title": string;
  "error_p1": string;
  "error_p2": string;
  "error_list_1": string;
  "error_list_2": string;
  "error_list_3": string;
  "error_list_3b": string;
  "error_p3": string;
  "postDetails_btn": string;
  "contact_btn": string;
  "email_subject": string;
  "email_body": string;

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
  "save_chng_btn": string;
  "complete_button": string;


  //errors
  "fixErrors":string;
  "requiredField":string;
  "numberValue":string;
  "DepFieldError":string;
  "selectOption": string;
  "minChar": string;
  "cannotBeBlank": string;
  "lessThanOne": string;
  "shouldBeYes":string;
  "requiredAndshouldBeYes": string;

  //fieldErrors
  "department":string;
  "jobTitleEn":string;
  "jobTitleFr":string;
  "jobDescriptionEn":string;
  "jobDescriptionFr":string;
  "jobType":string;
  "programArea":string;
  "classigicationCode":string;
  "classificationLevel":string;
  "numberOfOpportunities": string;
  "durationLength":string;
  "duration":string;
  "skills":string;
  "workSchedule":string;
  "province":string;
  "region":string;
  "city":string;
  "security":string;
  "workArrangment":string;
  "approvedStaffing":string;
  "language":string;
  "languageRequirements":string;
  "writtenEN": string;
  "readingEN": string;
  "oralEN": string;
  "writtenFR": string;
  "readingFR": string;
  "oralFR": string;

  //loader
  "submitting_your_information": string; 

  //dropdown placeholders
  "selectOrType": string;
  "enter_jobTitleEn": string;
  "enter_jobTitleFr": string;
  "enter_jobDescEn": string;
  "enter_jobDescFr": string;


}

declare module 'CareerMarketplaceWebPartStrings' {
  const strings: ICareerMarketplaceWebPartStrings;
  export = strings;
}
