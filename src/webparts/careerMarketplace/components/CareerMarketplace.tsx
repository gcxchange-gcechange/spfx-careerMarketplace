/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './CareerMarketplace.module.scss';
import type { ICareerMarketplaceProps } from './ICareerMarketplaceProps';
import { Steps } from"antd";
import CustomButton from './CustomButton';
import PosterInfo from './PosterInfo';
import {   Link, Spinner, SpinnerSize, Stack,   ThemeProvider, createTheme } from '@fluentui/react';
import Details from './Details';
import Requirements from './Requirements';
import {AadHttpClient, IHttpClientOptions, HttpClientResponse} from '@microsoft/sp-http';
import { getSP } from '../../../pnpConfig';
import { SPFI } from '@pnp/sp';
import PageTitle from './PageTitle';
import * as moment from 'moment';
import Complete from './Complete';
import { toTitleCase } from './Functions';
import { RefObject } from 'react';
import GraphService from '../../../services/GraphService';
import { SelectLanguage } from './SelectLanguage';
import { ICareerMarketplaceState } from './ICareerMarketplaceState';
import ErrorPage from './ErrorPage';
import ReviewPage from './ReviewPage';
 
 



export default class CareerMarketplace extends React.Component<ICareerMarketplaceProps, ICareerMarketplaceState> {

  private alertRef: RefObject<HTMLDivElement>;
  private titleRef: RefObject<HTMLDivElement>;
  private prevtitleRef: RefObject<HTMLDivElement>;
  private navigationDirection = 'next';
  public strings = SelectLanguage(this.props.prefLang);
  private _sp: SPFI;
  
 


  constructor(props: ICareerMarketplaceProps, state: ICareerMarketplaceState) {
    
    const today = new Date();
    const threeMonthsLater = new Date();
    threeMonthsLater.setMonth(today.getMonth() + 3);
    
    super(props);

 
    this.state = {
      currentPage: 0,
      departmentList: [],
      jobType: [],
      city: [],
      programArea:[],
      classificationCode: [],
      classificationLevel: [],
      security: [],
      language: [],
      wrkArrangement: [],
      duration: [],
      wrkSchedule: [],
      province: [],
      region:[],
      validationStatus: 0,
      userId: '',
      hasError: [],
      fieldErrorTitles: [],
      disableButton: false,
      inlineFieldErrors: [],
      dropdownFields: [],
      skillsList: [],
      jobOpportunityId: "",
      jobOpportunityOwner: true,
      isLoading: false,
      hasTouchedSkillCombo: false,
      postDetails: "",


      values: {
        department: {value: "" , pageNumber: 0},
        jobTitleEn: "",
        jobTitleFr: "",
        jobDescriptionEn: "",
        jobDescriptionFr: "",
        jobType: {pageNumber: 1, Label:"", Guid:""},
        programArea:{value: "" , pageNumber: 1},
        classificationCode: {value: "" , pageNumber: 1},
        classificationLevel: {value: "" , pageNumber: 1},
        classificationLevelIds: "",
        numberOfOpportunities: {value: 0, pageNumber: 1},
        durationLength: {value: 0, pageNumber: 1},
        duration: {value: "" , pageNumber: 1},
        deadline: threeMonthsLater,
        skills:[{pageNumber: 2}],
        workSchedule: {value: "" , pageNumber: 2},
        province: {value: "" , pageNumber: 2},
        region: {value: "" , pageNumber: 2},
        city: {value: "" , pageNumber: 2},
        security: {value: "" , pageNumber: 2},
        languageRequirements: [
          {
            pageNumber: 2,
            language: {value: ""},
            readingEN: {value: ""},
            writtenEN: {value: ""},
            oralEN: {value: ""},
            readingFR: {value: ""},
            writtenFR: {value: ""},
            oralFR: {value: ""},
          },
        ],
        workArrangment: {value: "" , pageNumber: 2}, 
        approvedStaffing:{value:"", pageNumber: 2},

      },

    };
    this.alertRef = React.createRef();
    this.titleRef = React.createRef();
    this.prevtitleRef = React.createRef();
    this._sp = getSP(this.props.context);
 
  }

 
  private next = async (): Promise<void > => {

    const { values, currentPage } = this.state;

    const checkValues: {key: string, value: any}[] = [];

    const  currentPgFields = Object.entries(values).filter(([field, fieldData]) => {
      if ( Array.isArray(fieldData) && field !== "languageRequirements") {
        return fieldData.some(item => item.pageNumber === currentPage);
      }
      return fieldData.pageNumber === currentPage;
    }).map(([field]) => field)

    const stringValues = Object.entries(values).filter(([key, value]) => typeof value === "string" && document.getElementById(key)).map(([value]) => value);

    for (const [key,value] of Object.entries(values)) {

      const jobTypeIncludesDeployment = values.jobType.Label === 'Deployment - permanent' || values.jobType.Label === 'Mutation - permanente';

      //const jobTypeIncludesDeployment = values.jobType?.some((item: any) => item.label === 'Deployment');

      if (jobTypeIncludesDeployment && (key === 'duration' || key === 'durationLength')) {
          continue;
      }



      if ((currentPgFields.includes(key) && value.value === "" )
          || (currentPgFields.includes(key) && value.value === '0') 
          || (currentPgFields.includes(key) && value.value === 0) 
          || (currentPgFields.includes(key) && value === undefined) 
          || (currentPgFields.includes(key) && value.Guid === '') 
          || (currentPgFields.includes(key) && value.Guid === '0') 
          || (currentPgFields.includes(key) && value.length === 1) 
          || (stringValues.includes(key) && value === "")
          || (stringValues.includes(key) && value.length < 5)
          || value.text === `--${this.strings.select}--` 
          || value.text === 'No' 
  

        ){
        
        checkValues.push({key, value })
      }

    }


    if (currentPage === 2) {   
 
      const { values } = this.state;
      const langReq =  values.languageRequirements[0];

      if (langReq.language.value === "" || langReq.language.key === ""){
        checkValues.push({key:"language", value:""})
      }
      else if (langReq.language.key === 3) {
        if (langReq.readingEN.value === "" || langReq.readingEN.key === "" ) {
          checkValues.push({ key: "readingEN", value: "" });
        }
        if (langReq.readingFR.value === "" || langReq.readingFR.key === "") {
          checkValues.push({ key: "readingFR", value: "" });
        }
        if (langReq.writtenEN.value === "") {
          checkValues.push({ key: "writtenEN", value: "" });
        }
        if (langReq.writtenFR.value === "") {
          checkValues.push({ key: "writtenFR", value: "" });
        }
        if (langReq.oralEN.value === "") {
          checkValues.push({ key: "oralEN", value: "" });
        }
        if (langReq.oralFR.value === "") {
          checkValues.push({ key: "oralFR", value: "" });
        }
      }
    }
    
    const newArray = toTitleCase(checkValues)
    const reorderArray = this.reorderLanguage(checkValues)
    const nextPage = this.state.currentPage + 1;
    this.navigationDirection = 'next';

    if (this.state.currentPage < 4 ) {

      if (checkValues.length !== 0 ) {
        await this.setState({
          hasError: reorderArray,
          fieldErrorTitles: newArray
        })
      } else {
        this.setState({
          currentPage: nextPage,
          hasError: []
         })
      }  
    }

    //focus on the title when selecting next but only if no errors
    if (this.titleRef.current && this.state.hasError.length === 0) {
      this.titleRef.current.focus();
    }

  }

  public reorderLanguage(arr: { key: string; value: string; }[]): { key: string; value: string; }[] {

  const languageReq = ['readingEN', 'writtenEN', 'oralEN', 'readingFR', 'writtenFR', 'oralFR'];
  const langIndex = arr.findIndex((item) => item.key === "language");
  const securityIndex = arr.findIndex((item) => item.key === "security");
  const workArrIndex = arr.findIndex((item) => item.key === "workArrangment");

  if (langIndex === -1) return arr; 

  // Only move "language" if at least one of "security" or "work arrangment" exists
  if (securityIndex === -1 && workArrIndex === -1) return arr;

  // Remove "language" from its current position
  const [languageItem] = arr.splice(langIndex, 1);

  // Determine the new position (after "security", before "work arrangment")
  let newIndex = securityIndex !== -1 ? securityIndex + 1 : langIndex;
  if (workArrIndex !== -1) newIndex = Math.min(newIndex, workArrIndex);

  // Insert "language" at the correct position
  arr.splice(newIndex, 0, languageItem);

  //Filter the lang req to see if they exist
  const langReqItems = arr.filter((item:any) => item.languageReq?.includes(item.key));
    if(langReqItems.length === 0 ) return arr;

  arr = arr.filter(item => !languageReq.includes(item.key));

  // Determine the new index (before workArrangment or security, whichever comes first)
  const indices = [securityIndex, workArrIndex].filter(i => i !== -1);
  const insertIndex = indices.length ? Math.min(...indices) : arr.length;

  // Insert them at the new position
  arr.splice(insertIndex, 0, ...langReqItems);

  return arr;
  }
  


  private prev = (): void => {
    const prevPage = this.state.currentPage -1 ;
    this.navigationDirection = 'prev';

    if (this.state.currentPage > 0 ) {
      this.setState({
        currentPage: prevPage
      })
    }

    //focus on the title when selecting next but only if no errors
    if (this.prevtitleRef.current && this.state.hasError.length === 0) {
      this.prevtitleRef.current.focus();
    }
  }



  private submit = (): void => {
    const dateStr = this.state.values.deadline;  
    const momentDate = moment(dateStr, "YYYY-MM-DD");  
    const isoString = momentDate.toISOString(); 
    const newJoBTypeFormat = [{Label: this.state.values.jobType.Label, Guid: this.state.values.jobType.Guid}]
    const programArea = this.state.values.programArea;
    const programAreaFormat= {Label: programArea.text, Guid: programArea.key };
    //const newJoBTypeFormat = this.state.values.jobType.map((item:any) => ({ Label: item.label, Guid: item.value }));

    let langCompText = "";

    langCompText = this.state.values.languageRequirements[0].readingEN.text + 
    this.state.values.languageRequirements[0].writtenEN.text + 
    this.state.values.languageRequirements[0].oralEN.text + '-' +
    this.state.values.languageRequirements[0].readingFR.text +
    this.state.values.languageRequirements[0].writtenFR.text +
    this.state.values.languageRequirements[0].oralFR.text;
 
 
    const skills = this.state.values.skills.filter(item => Object.keys(item).includes('value')).map(item => (item.value.toString()));
    const errorPageSkills = this.state.values.skills.filter(item => Object.keys(item).includes('text')).map(item => (item.text));

    const postDetailsObject = {
      [this.strings.fullName]: this.props.userDisplayName,
      [this.strings.departmentField]: this.state.values.department.text,
      [this.strings.workEmail]: this.props.workEmail,
      [this.strings.job_Title]: this.state.values.jobTitleEn,
      [this.strings.job_Title]: this.state.values.jobTitleFr,
      [this.strings.job_Description]: this.state.values.jobDescriptionEn,
      [this.strings.job_Description]: this.state.values.jobDescriptionFr,
      [this.strings.job_Type]: this.state.values.jobType.Label,
      [this.strings.program_Area]: programArea.text,
      [this.strings.classification_Code]: this.state.values.classificationCode.text,
      [this.strings.classification_Level]: this.state.values.classificationLevel.text,
      [this.strings.number_of_Opportunities]: this.state.values.numberOfOpportunities.value,
      [this.strings.time_period]: this.state.values.duration.text,
      [this.strings.length]: this.state.values.durationLength.value,
      [this.strings.application_deadline]: isoString,
      [this.strings.skillsField]: errorPageSkills,
      [this.strings.provinceField]: this.state.values.province.text,
      [this.strings.regionField]: this.state.values.region.text,
      [this.strings.cityField]: this.state.values.city.text,
      [this.strings.time_in_hours]: this.state.values.workSchedule.text,
      [this.strings.security_level]: this.state.values.security.text,
      [this.strings.language_requirements]: this.state.values.languageRequirements[0].language.text,
      ...(this.state.values.languageRequirements[0].language.key === 3 && {
        [this.strings.language_requirements]: langCompText
      }),
      [this.strings.work_arrangment]: this.state.values.workArrangment.text,
      [this.strings.approved_staffing]: this.state.values.approvedStaffing.value,
    };
  
    
   
  
      const requestHeaders: Headers = new Headers();
      requestHeaders.append("Content-type", "application/json");
      requestHeaders.append("Cache-Control", "no-cache");
      let responseText: string = "";
      
      const postOptions: IHttpClientOptions= {
        headers: requestHeaders,
        body: `{

              "ContactObjectId": "${this.state.userId}",
              "ContactName": "${this.props.userDisplayName}",
              "DepartmentId": "${this.state.values.department.key}",
              "ContactEmail": "${this.props.workEmail}",
              "JobTitleEn": "${this.state.values.jobTitleEn}",
              "JobTitleFr": "${this.state.values.jobTitleFr}",
              "JobType": ${JSON.stringify(newJoBTypeFormat)},
              "ProgramArea": ${JSON.stringify(programAreaFormat, null, 2)},
              "ClassificationCodeId": "${this.state.values.classificationCode.key}",
              "ClassificationLevelId": "${this.state.values.classificationLevel.key}",
              "NumberOfOpportunities": "${this.state.values.numberOfOpportunities.value}",
              "DurationId": "${this.state.values.duration.key}",
              "ApplicationDeadlineDate": "${isoString}",
              "JobDescriptionEn": "${this.state.values.jobDescriptionEn}",
              "JobDescriptionFr": "${this.state.values.jobDescriptionFr}",
              "WorkScheduleId": "${this.state.values.workSchedule.key}",
              "SecurityClearanceId": "${this.state.values.security.key}",
              "LanguageRequirementId": "${this.state.values.languageRequirements[0].language.key}",
              "LanguageComprehension":"${this.state.values.languageRequirements[0].language.key === 3 ? langCompText : ""}",
              "WorkArrangementId": "${this.state.values.workArrangment.key}",
              "ApprovedStaffing": ${this.state.values.approvedStaffing.value},
              "SkillIds": ${JSON.stringify(skills)},
              "CityId": "${this.state.values.city.key}",
              "DurationQuantity":"${this.state.values.durationLength.value}",
              "ItemId":"${this.props.jobOpportunityId !== null && (this.props.jobOpportunityId)}"
        }`,
      };

      console.log("BODY", postOptions.body)
      try {
        this.setState({isLoading: true, postDetails: postDetailsObject}, () => {
        this.props.context.aadHttpClientFactory
        .getClient(this.props.clientId)
        .then((client: AadHttpClient): void => {
          client
          .post(this.props.jobOpportunityId ? this.props. editJobApiUrl : this.props.createJobApiUrl, AadHttpClient.configurations.v1, postOptions)
          .then((response: HttpClientResponse) => {
            console.log("response", response)
            if (response.status) {
              this.setState({
                validationStatus: response.status,
                isLoading: false
              })
            }
            response
                  .json()
                  .then((responseJSON: JSON) => {
                    responseText = JSON.stringify(responseJSON);
                    this.setState({
                      jobOpportunityId: responseText
                    })
                  })
                  .catch((response: any) => {
                    const errMsg: string = `WARNING - error when calling URL. Error = ${response.message}`;
                    console.log("err is ", errMsg);
                  });
          }) 
        })
        }) 
      }
      catch(error){
        console.log("ERROR",error)
      }    

  };


  public handleOnChangeTextField = (event: any, value: string): void => {
    const eventName = event;
    const trimmedInputValue = value.trim();
  
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          [eventName]: trimmedInputValue
  
        }
      }))
  }

  public handleDurationLength = (value: string) :void => {
     
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        durationLength: {...prevState.values.durationLength, value}

      }
    }))
  }

  public handleNumberofOpp = (value: string) :void => {
    
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        numberOfOpportunities: {...prevState.values.numberOfOpportunities, value}

      }
    }))
  }

  public handleDropDownItem = (valueName: any, value: any):void => {
  
    const langEvaluationdIds = ['readingEN', 'writtenEN', 'oralEN','readingFR', 'writtenFR', 'oralFR'];

      if (valueName === "language") {
        this.setState((prevState) => ({
          values: {
            ...prevState.values,
            languageRequirements: [
              {
                ...prevState.values.languageRequirements[0], 
                language: value,
              },
            ],
          },
        }));

      }

      else if (langEvaluationdIds.includes(valueName)) {

          if (valueName === 'readingEN' ) {
            this.setState((prevState) => ({
              values: {
                ...prevState.values,
                languageRequirements: [
                  {
                    ...prevState.values.languageRequirements[0], 
                    readingEN: value,
                  },
                ],
  
              },
            }));
          } else if (valueName === 'writtenEN') {
            
            this.setState((prevState) => ({
              values: {
                ...prevState.values,
                languageRequirements: [
                  {
                    ...prevState.values.languageRequirements[0], 
                    writtenEN: value,
                  },
                ],

              },
            }));
          }
          else if (valueName === 'oralEN') {
            this.setState((prevState) => ({
              values: {
                ...prevState.values,
                languageRequirements: [
                  {
                    ...prevState.values.languageRequirements[0], 
                    oralEN: value,
                  },
                ],
              },
            }));
          }
          else if (valueName === 'readingFR' ) {
            this.setState((prevState) => ({
              values: {
                ...prevState.values,
                languageRequirements: [
                  {
                    ...prevState.values.languageRequirements[0], 
                    readingFR: value,
                  },
                ],
              },
            }));
          } else if (valueName === 'writtenFR') {
            this.setState((prevState) => ({
              values: {
                ...prevState.values,
                languageRequirements: [
                  {
                    ...prevState.values.languageRequirements[0], 
                    writtenFR: value,
                  },
                ],
              },
            }));
          }
          else if (valueName === 'oralFR') {
            this.setState((prevState) => ({
              values: {
                ...prevState.values,
                languageRequirements: [
                  {
                    ...prevState.values.languageRequirements[0], 
                    oralFR: value,
                  },
                ],
              },
            }));
          }
    
      }  
    else  if (valueName === "jobType") {

      if(value.text === "Deployment - permanent" || value.text === "Mutation – permanente") {
        this.setState((prevState) => ({
          values: {
            ...prevState.values,
            jobType: {...prevState.values.jobType, Guid: value.key, Label: value.text} , 
            durationLength: {...prevState.values.durationLength, value:'0'},
              
          },    
        }));
      }

     this.setState((prevState) => ({
      values: {
        ...prevState.values,
        jobType: {...prevState.values.jobType, Guid: value.key, Label: value.text} , 
          
      },    
    }));
    
    }

    else if( valueName === "skills") {
      console.log("skills", value)
      const findSkillItem = [...this.state.values.skills];
      const skillExists = findSkillItem.some((item: any) => item.value === value.key);
      this.setState((prevState) => ({
        hasTouchedSkillCombo: true,
        values: {
          ...prevState.values,
          skills: skillExists
            ? prevState.values.skills.filter((item) => item.value !== value.key) 
            : [...prevState.values.skills, {value: value.key, text:value.text}],  
        },
      }));
    }    
    else {
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          [valueName]: value,
        }
      }));
    }
  }


  public handleOnDateChange=(date: Date |undefined):void => {

    if (date) {
        this.setState((prevState) => ({
          values: {
            ...prevState.values,
            deadline:  date
          }
        }))
    }
  }

  public checkedTerms = (event: any, isChecked?: boolean):void => {

    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        approvedStaffing:  { ...prevState.values.approvedStaffing, value: isChecked}
      }
    }))
  }

  public handleCopyBtn = (value: any):void  => {
   console.log("txt", value)

  }

  public async _populateEditableFields(): Promise<void> {
    const item = await this._sp.web.lists.getByTitle("JobOpportunity").items.getById(Number(this.props.jobOpportunityId))
    .select(
      "Department",  "Department/NameEn",  "Department/NameFr", "Department/ID", 
      "JobTitleFr", 
      "JobTitleEn", 
      "JobDescriptionEn", 
      "JobDescriptionFr", 
      "JobType", 
      "ProgramArea",
      "ClassificationCode", "ClassificationCode/ID", "ClassificationCode/NameEn", "ClassificationCode/NameFr",
      "ClassificationLevel/ID","ClassificationLevel/NameFr",
      "Duration/ID","DurationQuantity","Duration/NameEn","Duration/NameFr",
      "NumberOfOpportunities",
      "ApplicationDeadlineDate",
      "WorkArrangement/ID", "WorkArrangement/NameEn", "WorkArrangement/NameFr", 
      "City/ID", "City/NameEn", "City/NameFr", 
      "SecurityClearance/ID", 
      "WorkSchedule/ID","WorkSchedule/NameEn", "WorkSchedule/NameFr",
      "LanguageRequirement/ID", "LanguageRequirement/NameEn", "LanguageRequirement/NameFr", "LanguageComprehension",
      "Skills/ID"
   
    )
    .expand("Department", "ClassificationCode", "ClassificationLevel", "Duration", "WorkArrangement", "City", "SecurityClearance", "WorkSchedule","LanguageRequirement", "Skills")();
    const cityId = item.City.ID;
    //console.log("item", item)
 
    const cityData = await this._sp.web.lists.getByTitle("City").items.getById(cityId)();
 
    const regionDetails = await this._sp.web.lists.getByTitle("Region").items.getById(cityData.RegionId)();

    const provinceData = await this._sp.web.lists.getByTitle("Province").items.getById(regionDetails.ProvinceId)(); 
    const getIndex: any[] =  [];
    const classificationCode = await  this._sp.web.lists.getByTitle('ClassificationCode').items();
    //console.log(classificationCode);
    const getClassificationCodeList = classificationCode.filter((levelItem:any) => levelItem.ID === item.ClassificationCode.ID);
    //console.log("getClassificationCodeList", getClassificationCodeList);

   
    if (item.LanguageRequirement.ID === 3) {

      const languageComprehensionArray= item.LanguageComprehension?.split("") 
 
      if(languageComprehensionArray.length !== 0) {
       
         getIndex.push ( languageComprehensionArray.map((letter:string) => {
          if (letter === 'A') {
            return {key: 0, text: letter}
          }
          else if (letter === "B") {
            return {key: 1, text: letter}
          }
          else if (letter === "C") {
            return {key: 2, text: letter}
          }
        }))
      }
    }

    const skills = item.Skills.map((item:any) => ({ value: item.ID}));

    const timeZone = require('moment-timezone');

    const isoString = item.ApplicationDeadlineDate;

    const formattedDate = timeZone(isoString)
      .tz("America/New_York")
      .format("ddd MMM DD YYYY HH:mm:ss [GMT]ZZ (z)");

    const evaluateLanguage = (languageValue: string, value: { NameFr: string; NameEn: string }):string => {
      return languageValue === 'fr-fr' ? value.NameFr : value.NameEn
    }
 

    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        department: { key: item.Department.ID, text: evaluateLanguage(this.props.prefLang, item.Department) },
        jobTitleEn: item.JobTitleEn,
        jobTitleFr: item.JobTitleFr,
        jobDescriptionEn: item.JobDescriptionEn,
        jobDescriptionFr: item.JobDescriptionFr,
        jobType: {...prevState.jobType, Guid: item.JobType[0].TermGuid, Label: item.JobType[0].Label},
        programArea : {...prevState.programArea, key: item.ProgramArea[0].TermGuid},
        classificationCode: {key:item.ClassificationCode.ID , text: evaluateLanguage(this.props.prefLang, item.ClassificationCode)},
        classificationLevel:{key:item.ClassificationLevel.ID},
        classificationLevelIds: getClassificationCodeList.length !== 0 ? getClassificationCodeList[0].ClassificationLevelIds : "",
        numberOfOpportunities: {value: item.NumberOfOpportunities, pageNumber: 1},
        duration:{...prevState.duration, key: item.Duration.ID, text: evaluateLanguage(this.props.prefLang, item.Duration)},
        durationLength: {...prevState.values.durationLength, value:item.DurationQuantity},
        deadline: new Date(formattedDate),
        skills: skills,
        province: {key:provinceData.ID, text: evaluateLanguage(this.props.prefLang, provinceData)},
        region: {key: regionDetails.Id, text: evaluateLanguage(this.props.prefLang, regionDetails) , provinceId:regionDetails.ProvinceId},
        city:{ key: cityData.ID, text: evaluateLanguage(this.props.prefLang, cityData), regionID: cityData.RegionId},
        workSchedule: { key: item.WorkSchedule.ID},
        workArrangment: {key: item.WorkArrangement.ID},
        security:{key: item.SecurityClearance.ID},

        languageRequirements: [
          {
            ...prevState.values.languageRequirements[0],
            language: {
              key: item.LanguageRequirement.ID,
              text: item.LanguageRequirement.NameEn,
            },
            readingEN: getIndex.length !== 0 ? getIndex[0][0] : { ...prevState.values.languageRequirements[0].readingEN },
            writtenEN: getIndex.length !== 0 ? getIndex[0][1] : { ...prevState.values.languageRequirements[0].writtenEN },
            oralEN: getIndex.length !== 0 ? getIndex[0][2] : { ...prevState.values.languageRequirements[0].oralEN },
            readingFR: getIndex.length !== 0 ? getIndex[0][4] : { ...prevState.values.languageRequirements[0].readingFR },
            writtenFR: getIndex.length !== 0 ? getIndex[0][5] : { ...prevState.values.languageRequirements[0].writtenFR },
            oralFR: getIndex.length !== 0 ? getIndex[0][6] : { ...prevState.values.languageRequirements[0].oralFR },
          },
        ],
        approvedStaffing: {...prevState.values.approvedStaffing, value: true}
        
       
      }

    }))
  }

  public async _populateDropDowns(): Promise<void> {
    
    const {currentPage} = this.state;
    const parameters = [
      [
        this.props.jobTypeTermId,
        this.props.programAreaTermId,
      ]  
    ];
  
    if (currentPage === 0  ) {
      const departments = await this._sp.web.lists.getByTitle('Department').items();
      if ( departments) {
        const dataArray = departments.map((data:any) => ({ key: data.Id, text: this.props.prefLang === 'fr-fr' ? data.NameFr: data.NameEn, pageNumber: 0 })) .sort((a, b) => (a.text > b.text ? 1 : a.text < b.text ? -1 : 0));
          this.setState({
            departmentList: dataArray
          }) 
      } else {
        console.log('List Department not found')
      }

    } else if (currentPage === 1) {
      const classificationLevel = await this._sp.web.lists.getByTitle('ClassificationLevel').items();

      const classificationCode = await  this._sp.web.lists.getByTitle('ClassificationCode').items();

      const duration = await this._sp.web.lists.getByTitle('Duration').items();

      const classLevelResults = classificationLevel.map((data:any) => ({ key: data.Id, text: this.props.prefLang === 'fr-fr' ? data.NameFr: data.NameEn }));
      const classificationCodeResults = classificationCode.map((data:any) => ({ key: data.Id, text: this.props.prefLang === 'fr-fr' ? data.NameFr: data.NameEn, classificationLevelIds: data.ClassificationLevelIds }));
      const durationData = duration.map((data: any) => ({key: data.Id, text: this.props.prefLang === 'fr-fr' ? data.NameFr: data.NameEn}))

      GraphService._sets(parameters[0]).then(async (data: any) => {

        const processLabels = (dataIndex: number):any[] => {
            return data[dataIndex].flatMap((items: any) =>
            items.labels.map((item: any) => ({
              key: items.id,
              text: item.name,
              language: item.languageTag,
              pageNumber: 1
            }))
          );
        }
      
        const filterByLanguage = (labels: any[]):any[] => {
          const preferredLang = this.props.prefLang === 'fr-fr' ? 'fr-FR' : 'en-US';
          return labels.filter((item: any) => item.language === preferredLang);
        };

        const getJobTypeLabels = processLabels(0);
        const getProgramAreaLabels = processLabels(1);
    
        this.setState({
          jobType: filterByLanguage(getJobTypeLabels),
          programArea: filterByLanguage(getProgramAreaLabels),
        });
      });

      this.setState({
        classificationCode: classificationCodeResults,
        classificationLevel: classLevelResults,
        duration: durationData
      })

    } else 
    if (currentPage === 2) {
      const skillsData = [];
      const skills = await this._sp.web.lists.getByTitle('Skills').items.top(700)();
      const skillItemData = skills.map((items) => ({key: items.Id,  text: this.props.prefLang === 'fr-fr' ? items.TitleFr: items.TitleEN, pageNumber: 2}))
      skillsData.push(...skillItemData)


      const languageReq = await this._sp.web.lists.getByTitle('LanguageRequirement').items();
      const securityClearance = await this._sp.web.lists.getByTitle('SecurityClearance').items();
      const workArrangment = await this._sp.web.lists.getByTitle('WorkArrangement').items();
      const wrkSchedule = await this._sp.web.lists.getByTitle('WorkSchedule').items();
      const city =  await this._sp.web.lists.getByTitle('City').items.top(1300)();
      const province =  await this._sp.web.lists.getByTitle('Province').items();
      const region =  await this._sp.web.lists.getByTitle('Region').items();

 
      

      if (skillsData.length !== 0) {
        this.setState({
          skillsList: skillsData
        })
      } else {
        console.log("Skills list does not exist")
      }
    

      if (languageReq) {
        const dataResult = languageReq.map((data:any) => ({ key: data.Id,  text: this.props.prefLang === 'fr-fr' ? data.NameFr: data.NameEn, pageNumber: 2}));
          this.setState({
            language: dataResult
          }) 
      
      } else {
         console.log("Language list does not exist")
      }
            
            
      if (securityClearance) {
        const dataResult = securityClearance.map((data:any) => ({key: data.Id,  text: this.props.prefLang === 'fr-fr' ? data.NameFr: data.NameEn, pageNumber: 2}))
          this.setState({
            security: dataResult
          })

      } else {
        console.log("Security Clearance list does not exist")
      }
            
      if (workArrangment) {
        const dataResult = workArrangment.map((data:any) => ({key: data.Id,  text: this.props.prefLang === 'fr-fr' ? data.NameFr: data.NameEn}))
        this.setState({
          wrkArrangement: dataResult
        })
      } else {
        console.log(" Work Arrangment list does not exist")
      }
      
      if (wrkSchedule) {
        const dataResult = wrkSchedule.map((data:any) => ({key: data.Id,  text: this.props.prefLang === 'fr-fr' ? data.NameFr: data.NameEn}))
        this.setState({
          wrkSchedule: dataResult
        })
      } else {
        console.log("Work Schedule list does not exist")
      }
      if (city) {
        const dataResult = city.map((data:any) => ({key: data.Id,  text: this.props.prefLang === 'fr-fr' ? data.NameFr: data.NameEn, regionID: data.RegionId}))
        this.setState({
          city: dataResult
        })
      } else {
        console.log("City list does not exist")
      }
      if (province) {
        const dataResult = province.map((data:any) => ({key: data.Id,  text: this.props.prefLang === 'fr-fr' ? data.NameFr: data.NameEn}))
        this.setState({
          province: dataResult
        })
      } else {
        console.log("Province list does not exist")
      }
      if (region) {
        console.log("Region List",region)
        const dataResult = region.map((data:any) => ({key: data.Id,  text: this.props.prefLang === 'fr-fr' ? data.NameFr : data.NameEn, provinceId: data.ProvinceId}))
        this.setState({
          region: dataResult
        })
      } else {
        console.log("Region list does not exist")
      }
    }
  }

  public _getUser = async ():Promise<void> => {
    const user = await  this._sp.web.currentUser();
    const userID = user.UserId.NameId

    this.setState({
      userId: userID
    })
  }



  public getDropdownElements =(): void => {
    const elementId :any[] = [];
    const getElements = document.querySelectorAll('div[class^="ms-Dropdown"]');
    const getComboBox = document.querySelectorAll('div[class^="ms-ComboBox"]');
    const getInputElement = document.querySelectorAll('[class^="durationLength"]');

   
    if(getElements ) {
      getElements.forEach(element => {
        elementId.push(element.id)
      });
    }

    if(getComboBox) {
      getElements.forEach(combo => {
        elementId.push(combo.id || combo)

      });
    }


    if(getInputElement) {
      getInputElement.forEach(el => {
        elementId.push(el.id);
      })
    }


    this.setState({
      dropdownFields: elementId
    });

    const cleanUpDropDownFields = this.state.dropdownFields.filter((n) => n)

    this.onBlur(cleanUpDropDownFields);

  }

  public onBlur = (fields: string[]): void => {

    fields.forEach((fieldId) => {
      const dropdownElement = document.getElementById(fieldId);
      //console.log("dropdownEl",dropdownElement)
  
      if (dropdownElement) {
        let tab: boolean = false;
  
        // Add the event listener for keydown
        dropdownElement.addEventListener("keydown", (event) => {
          if (event.key === "Tab") {
            tab = true;
          }
        });
  
        dropdownElement.addEventListener("blur", () => {

          if (tab === true) {
            if (!this.state.inlineFieldErrors.includes(fieldId)) {
              this.setState({
                inlineFieldErrors: [...this.state.inlineFieldErrors, fieldId]
              })
            }
          }
          else {
            this.setState({
              inlineFieldErrors: [...this.state.inlineFieldErrors]
            })
          }
          
          tab = false;

        });
      }
    });
  };

 



  public async componentDidMount(): Promise<void> {

    
    await this._populateDropDowns();
    await this._getUser();
    await this.getDropdownElements();
    
    const checkUser =  this.props.jobOppOwner === this.props.workEmail;

    if (this.context.application?.navigatedEvent !== undefined) {
      this.context.application?.navigatedEvent.add(this, this.getDropdownElements());
    }

    if (this.props.jobOpportunityId && checkUser === true) {
      await this._populateEditableFields();

    } else {
      this.setState({
        jobOpportunityOwner: checkUser
      })
    }

  }

  public async componentDidUpdate(prevProps: ICareerMarketplaceProps , prevState: ICareerMarketplaceState): Promise<void> {

    if (this.state.hasError.length !== 0 && prevState.hasError.length === 0) {
      // Focus the dialog when errors exist
      if (this.alertRef.current) {
        this.alertRef.current.focus();
      }
    }

    if(this.state.currentPage !== prevState.currentPage && this.state.hasError.length === 0 ) {
      if (this.navigationDirection === 'prev' && this.prevtitleRef?.current) {
        this.prevtitleRef.current.focus();
      } else if (this.navigationDirection === 'next' && this.titleRef?.current) {
        this.titleRef.current.focus();
      }
    }

    if (this.state.currentPage !== prevState.currentPage) {

        this.setState({
          inlineFieldErrors: [],
          hasError: []
        });

        await this._populateDropDowns();
        await this.getDropdownElements();   

    }

    
    if (this.state.values.skills.length > 1 && prevState.values.skills.length === 0 ) {
      this.setState({
        hasTouchedSkillCombo: true
      })

    }

    if (this.state.values.jobType.Label === "Deployment - permanent" && prevState.values.jobType.Label !== "Deployment - permanent") {
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          durationLength: {...prevState.values.durationLength, value:0},
          duration: {...prevState.values.duration, key:"", text: ""},
        }   
      }))

    }
    if (this.state.values.jobType.Label === "Mutation – permanente" && prevState.values.jobType.Label !== "Mutation – permanente") {
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          durationLength:{...prevState.values.durationLength, value: 0},
          duration: {...prevState.values.duration, key:"", text: ""},
        }
      }))
    }

    // if (this.state.jobOpportunityId !== prevState.jobOpportunityId) {
    //   console.log("Ihave updated")
    // }
  }

  public componentWillUnmount():void {
    this.context.application?.navigatedEvent.remove(this, this.getDropdownElements);
  }


  public changeFieldNameFormat = (): JSX.Element => {
    const properCaseValues: any[] = [];
  
    const convertString = this.state.hasError.map((item: any) => {
    
      const properCase = item.key
        .replace(/([A-Z])/g, " $1")
        .replace(/^ /, "")
        .toLowerCase();
        const key = item.key as keyof ICareerMarketplaceWebPartStrings;
        const localizedKey = this.strings[key] || item.key;

      return {
        key: item.key,
        properCase: properCase,
        localizedKey: localizedKey,
        errorMessage : `${localizedKey}`
    
      };
    });
  
    properCaseValues.push(...convertString);
  
    return (
      <>
        <div id="alertText">
          {properCaseValues.map((item, index) => (
            <ul key={index}>
              <li>
                <Link href={`#${item.key}`}>{item.errorMessage}</Link>
              </li>
            </ul>
          ))}
        </div>
      </>
    );
  };




  public render(): React.ReactElement<ICareerMarketplaceProps> {

    // const customSpacingStackTokens: IStackTokens = {
    //   childrenGap: '3%',
    // };

    const myTheme = createTheme({
      palette: {
        themePrimary: '#03787c',
        themeLighterAlt: '#f0f9fa',
        themeLighter: '#c5e9ea',
        themeLight: '#98d6d8',
        themeTertiary: '#49aeb1',
        themeSecondary: '#13898d',
        themeDarkAlt: '#026d70',
        themeDark: '#025c5f',
        themeDarker: '#014446',
        neutralLighterAlt: '#faf9f8',
        neutralLighter: '#f3f2f1',
        neutralLight: '#edebe9',
        neutralQuaternaryAlt: '#e1dfdd',
        neutralQuaternary: '#d0d0d0',
        neutralTertiaryAlt: '#c8c6c4',
        neutralTertiary: '#a19f9d',
        neutralSecondary: '#605e5c',
        neutralSecondaryAlt: '#8a8886',
        neutralPrimaryAlt: '#3b3a39',
        neutralPrimary: '#323130',
        neutralDark: '#201f1e',
        black: '#000000',
        white: '#ffffff',
      }});

    const {currentPage} = this.state;
   
    const steps = [
      {
        step: 1,
        title: 'Information',
        content: (
          <PosterInfo 
            items={this.state.departmentList} 
            userInfo={this.props.userDisplayName} 
            workEmail = {this.props.workEmail}
            currentPage= {this.state.currentPage}
            handleDropDownItem={this.handleDropDownItem}
            readOnly= {false}
            values={this.state.values}
            fields={this.state.dropdownFields}
            inlineFieldErrors={this.state.inlineFieldErrors}
            prefLang={this.props.prefLang}
            jobOpportunityId={this.props.jobOpportunityId}
          />
        ),
      },
      {
        step:2,
        title: 'Details', 
        content: (
          <Details 
            programArea={this.state.programArea} 
            classificationCode={this.state.classificationCode} 
            classificationLevel={this.state.classificationLevel} 
            jobType={this.state.jobType} 
            duration={this.state.duration}
            currentPage= {this.state.currentPage}
            handleDropDownItem={this.handleDropDownItem}
            handleOnChange={this.handleOnChangeTextField} 
            handleOnDateChange={this.handleOnDateChange}
            handleDurationLength={this.handleDurationLength}
            handleNumberofOpp={this. handleNumberofOpp}
            values={this.state.values}
            hasError={this.state.hasError}
            inlineFieldErrors ={this.state.inlineFieldErrors}
            fields={this.state.dropdownFields}
            prefLang={this.props.prefLang}
            jobOppId = {this.props.jobOpportunityId}
          />
        ),
      },
      {
        step: 3,
        title: 'Requirements',
        content: (
          <Requirements
            language = {this.state.language}
            security = {this.state.security}
            workArrangment = {this.state.wrkArrangement}
            city={this.state.city}
            workSchedule = {this.state.wrkSchedule}
            province = {this.state.province}
            region = {this.state.region}
            currentPage= {this.state.currentPage}
            handleDropDownItem={this.handleDropDownItem}
            handleOnChange={this.handleOnChangeTextField} 
            checkedTerms={this.checkedTerms}
            values={this.state.values}
            inlineFieldErrors={this.state.inlineFieldErrors}
            prefLang={this.props.prefLang}
            skills={this.state.skillsList}
            hasTouchedSkillCombo={this.state.hasTouchedSkillCombo}

          />
        ),
      },
      {
        step: 4,
        title: 'Review',
        content: (
          <>
          <ReviewPage 
            userInfo={this.props.userDisplayName} 
            currentPage= {this.state.currentPage} 
            prefLang={this.props.prefLang}
            workEmail = {this.props.workEmail}
            department={this.state.values.department}
            jobTitleEn={this.state.values.jobTitleEn}
            jobTitleFr={this.state.values.jobTitleFr}
            jobDescriptionEn={this.state.values.jobDescriptionEn}
            jobDescriptionFr={this.state.values.jobDescriptionFr}
            jobType={this.state.values.jobType}
            programArea={this.state.values.programArea}
            classificationCode={this.state.values.classificationCode}
            classificationLevel={this.state.values.classificationLevel}
            numberOfOpportunities={this.state.values.numberOfOpportunities}
            durationLength={this.state.values.durationLength}
            duration={this.state.values.duration}
            deadline={this.state.values.deadline}
            skills={this.state.values.skills}
            workSchedule={this.state.values.workSchedule}
            province={this.state.values.province}
            region={this.state.values.region}
            city={this.state.values.city}
            security={this.state.values.security}
            languageRequirements={this.state.values.languageRequirements}
            workArrangment={this.state.values.workArrangment}
            approvedStaffing={this.state.values.approvedStaffing}
          />
          </>
        ),
      },
      
    ];
   
    const items = steps.map((item) => ({ key: item.step, title: "" }));
    
    return (

      <>
      <ThemeProvider applyTo='body' theme={myTheme}>
        <section>
          <div>
              {this.state.validationStatus === 200 ? (
                //Success
                <>
                  <Complete prefLang={this.props.prefLang} jobOppId={this.props.jobOpportunityId} />

                  <Stack horizontal horizontalAlign="space-between" wrap>
                     {this.state.jobOpportunityId !== ''  && (
                      <CustomButton id="view" name={this.strings.view} buttonType="secondary" url={ `https://devgcx.sharepoint.com/sites/CM-test/SitePages/Job-Opportunity.aspx?JobOpportunityId=${this.state.jobOpportunityId}`} onClick={() => ( `https://devgcx.sharepoint.com/sites/CM-test/SitePages/Job-Opportunity.aspx?JobOpportunityId=${this.state.jobOpportunityId}`)} />
                    )}
                    <CustomButton id="home" name={this.strings.complete_button} buttonType="primary" url={this.props.url} onClick={() => (this.props.url)} />
                  </Stack>
                </>
              ) : (this.state.validationStatus === 400 || this.state.validationStatus === 500 || this.state.validationStatus === null || this.state.validationStatus === 401 || this.state.validationStatus === 404 ) ? (
                // Error 400
                <ErrorPage prefLang={this.props.prefLang} values={this.state.postDetails} copyBtn={this.handleCopyBtn}/>
              ) : (
                //  Default fallback
                <>
                  {
                    this.props.jobOpportunityId !== "" && this.state.jobOpportunityOwner === false ? (
                      <>
                        <h2>You are not the owner</h2>
                        <CustomButton id="home" name="Go on, git! 🤠" buttonType="primary" url={this.props.url} onClick={() => (this.props.url)} />
                      </>
                    ) : (
                      <>
                        <div>
                          {this.state.isLoading ? (
                            <Spinner
                              label={this.strings.submitting_your_information}
                              ariaLive="assertive"
                              size={SpinnerSize.large}
                              className={styles.responsiveSpinner}
                            />
                          ) : (
                            <>
                              {/* Page title logic */}
                              <div
                                tabIndex={-1}
                                ref={this.titleRef}
                                style={{ display: this.navigationDirection === 'next' ? 'block' : 'none' }}
                              >
                                <PageTitle currentPage={this.state.currentPage} prefLang={this.props.prefLang} />
                              </div>

                              <div
                                tabIndex={-1}
                                ref={this.prevtitleRef}
                                style={{ display: this.navigationDirection === 'prev' ? 'block' : 'none' }}
                              >
                                <PageTitle currentPage={this.state.currentPage} prefLang={this.props.prefLang} />
                              </div>

                              {/* Stepper */}
                              <div className={styles.stepper}
                                tabIndex={0}
                                role="progressbar"
                                aria-valuemax={4}
                                aria-valuemin={1}
                                aria-valuenow={Math.floor(parseFloat(steps[this.state.currentPage].step.toString()))}
                                //aria-valuetext={this.props.prefLang === 'fr-fr' ? `Étape ${this.state.currentPage + 1} sur 4` : `Step ${this.state.currentPage + 1} out of 4`}
                                aria-label={this.props.prefLang === 'fr-fr' ? `Étape ${this.state.currentPage + 1} sur 4` : `Step ${this.state.currentPage + 1} out of 4`}
                              >
                                <Steps current={currentPage} labelPlacement="vertical" items={items} />
                              </div>

                              {/* Error alert */}
                              {this.state.hasError.length !== 0 && (
                                <div role="alertdialog" tabIndex={-1} ref={this.alertRef} id="alertErrors" aria-modal="true"
                                  aria-labelledby="alertHeading" aria-describedby="alertText" className={styles.errorDialog}>
                                  <h3 id="alertHeading" style={{ textWrap: 'wrap' }}>{this.strings.fixErrors}</h3>
                                  {this.changeFieldNameFormat()}
                                </div>
                              )}

                              {/* Page content */}
                              <div>{steps[currentPage].content}</div>

                              {/* Navigation buttons */}
                              <div style={{ marginTop: '20px' }}>
                                <Stack horizontal horizontalAlign={currentPage !== 0 ? 'space-between' : 'end'}>
                                  {currentPage !== 0 && (
                                    <CustomButton id="prev" name={this.strings.prev_btn} buttonType="secondary" onClick={() => this.prev()} />
                                  )}
                                  {currentPage === 3 ? (
                                    <CustomButton id="submit" name={this.strings.submit_btn} buttonType="primary" onClick={() => this.submit()} />
                                  ) : (
                                    <CustomButton id="next" name={this.strings.next_btn} buttonType="primary" onClick={() => this.next()} />
                                  )}
                                </Stack>
                              </div>
                            </>
                          )}
                        </div>
                      </>
                    )
                  }
                </>
              )
            }
          </div>
        </section>
      </ThemeProvider>
    </>
    )

  }
}
