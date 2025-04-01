/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './CareerMarketplace.module.scss';
import type { ICareerMarketplaceProps } from './ICareerMarketplaceProps';
import { Steps } from"antd";
import CustomButton from './CustomButton';
import PosterInfo from './PosterInfo';
import {  IStackTokens, Spinner, SpinnerSize, Stack, StackItem, ThemeProvider, createTheme } from '@fluentui/react';
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
 
 



export default class CareerMarketplace extends React.Component<ICareerMarketplaceProps, ICareerMarketplaceState> {

  private alertRef: RefObject<HTMLDivElement>;
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
        numberOfOpportunities: "1",
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
            readingFR: {value: ""},
            writtenEN: {value: ""},
            writtenFR: {value: ""},
            oralEN: {value: ""},
            oralFR: {value: ""},
          },
        ],
        workArrangment: {value: "" , pageNumber: 2}, 
        approvedStaffing:{value:"", pageNumber: 2},

      },

    };
    this.alertRef = React.createRef();
    this._sp = getSP(this.props.context);
 
  }

 
  private next = async (): Promise<void > => {

    const { values, currentPage } = this.state;
    const checkValues: {key: string, value: any}[] = [];

    //Get fields to validate (all if currentPage === 3, otherwise filter)

    const  currentPgFields = Object.entries(values).filter(([field, fieldData]) => {
      if ( Array.isArray(fieldData) && field !== "languageRequirements") {
        return currentPage === 3 || fieldData.some(item => item.pageNumber === currentPage);
        //return fieldData.some(item => item.pageNumber === currentPage);
      }
      return  currentPage === 3 || fieldData.pageNumber === currentPage;

    }).map(([field]) => field)

    console.log("currentFields", currentPgFields);
   
    //Extract string based fields
    const stringValues = Object.entries(values).filter(([key, value]) => typeof value === "string" && document.getElementById(key)).map(([value]) => value);

    for (const [key,value] of Object.entries(values)) {
      console.log(value)
      const jobTypeIncludesDeployment = values.jobType.Label === 'Deployment';

      //const jobTypeIncludesDeployment = values.jobType?.some((item: any) => item.label === 'Deployment');

      //Skip validation when deployment is selected
      if (jobTypeIncludesDeployment && (key === 'duration' || key === 'durationLength')) {
          continue;
      }

      //validate NumOfOpp seperately
      if (key === 'numberOfOpportunities' ) {
        console.log("val", value)
        if (value === "" || isNaN(Number(value))) {
            checkValues.push({ key, value });
            continue; 
        }
      }


      //General validation logic for required fields

      if ((currentPgFields.includes(key) && value.value === "" )
          || (currentPgFields.includes(key) && value.value === '0') 
          || (currentPgFields.includes(key) && value.Guid === '0') 
          || (currentPgFields.includes(key) && value.length === 1) 
          || (stringValues.includes(key) && value === "") 
          || value.text === `--${this.strings.select}--` 
          || value.text === 'No'

        ){
        
        checkValues.push({key, value })
      }

    }

    //Additional validation for language requirement fields
    if (currentPage === 2 ) {    
        const isReadingEmpty = this.state.values.languageRequirements[0].readingEN.value === "" || this.state.values.languageRequirements[0].readingFR.value === ""; 
        const isWrittenEmpty = this.state.values.languageRequirements[0].writtenEN.value === "" || this.state.values.languageRequirements[0].writtenFR.value=== "";
        const isOralEmpty = this.state.values.languageRequirements[0].oralEN.value === "" || this.state.values.languageRequirements[0].oralFR.value === "";

      if (this.state.values.languageRequirements[0].language.value === "") {
        checkValues.push({key:"language", value:""})
      }
      else if (this.state.values.languageRequirements[0].language.key === 3 && (isReadingEmpty || isWrittenEmpty || isOralEmpty )) {
        checkValues.push({key:"languageRequirements", value:""})
      }
    }
    console.log('checkvalues', checkValues)
    
    const newArray = toTitleCase(checkValues)
    const reorderArray = this.reorderLanguage(checkValues)



    const nextPage = this.state.currentPage + 1;

    if(currentPage === 3 && checkValues.length === 0) {
      //Run Sumbit function if no errors and on page 3
      this.submit();

    }
    else if (this.state.currentPage < 4 ) {

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
    this.addInLineErrors();

  }

  public reorderLanguage(arr: { key: string; value: string; }[]): { key: string; value: string; }[] {
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

    return arr;
  }
  

  public addInLineErrors = ():void => {
    this.state.hasError.forEach(element => {
      const error = document.getElementById(element.key);
        
      if (error) {
        error.firstElementChild?.classList.add(styles.borderRemove);
        error.parentElement?.classList.add(styles.borderRemove)
        error.classList.add(styles.error);

      } 

    });
   
  }

  private prev = (): void => {
    const prevPage = this.state.currentPage -1 ;

    if (this.state.currentPage > 0 ) {
      this.setState({
        currentPage: prevPage
      })
    }
  }



  private submit = (): void => {

    const dateStr = this.state.values.deadline;  
    const momentDate = moment(dateStr, "YYYY-MM-DD");  
    const isoString = momentDate.toISOString(); 
    const newJoBTypeFormat = [{Label: this.state.values.jobType.Label, Guid: this.state.values.jobType.Guid}]

    //const newJoBTypeFormat = this.state.values.jobType.map((item:any) => ({ Label: item.label, Guid: item.value }));
    const programArea = this.state.values.programArea;

    const programAreaFormat= {Label: programArea.text, Guid: programArea.key };


    let langCompText = "";

    langCompText = this.state.values.languageRequirements[0].readingEN.text + 
    this.state.values.languageRequirements[0].writtenEN.text + 
    this.state.values.languageRequirements[0].oralEN.text + '-' +
    this.state.values.languageRequirements[0].readingFR.text +
    this.state.values.languageRequirements[0].writtenFR.text +
    this.state.values.languageRequirements[0].oralFR.text;
 
 
    const skills = this.state.values.skills.filter(item => Object.keys(item).includes('value')).map(item => (item.value.toString()));
   
  
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
              "NumberOfOpportunities": "${this.state.values.numberOfOpportunities}",
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
        this.setState({isLoading: true}, () => {
        this.props.context.aadHttpClientFactory
        .getClient(this.props.clientId)
        .then((client: AadHttpClient): void => {
          client
          .post(this.props.jobOpportunityId ? this.props.apiUrlEdit :this.props.apiUrl, AadHttpClient.configurations.v1, postOptions)
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

      if(value.text === "Deployment") {
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
      const findSkillItem = [...this.state.values.skills];
      const skillExists = findSkillItem.some((item: any) => item.value === value.key);
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          skills: skillExists
            ? prevState.values.skills.filter((item) => item.value !== value.key) 
            : [...prevState.values.skills, {value: value.key}],  
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

    const cityData = await this._sp.web.lists.getByTitle("City").items.getById(cityId)();
    console.log(cityData)
 
    const regionDetails = await this._sp.web.lists.getByTitle("Region").items.getById(cityData.RegionId)();
    console.log("region", regionDetails)

    const provinceData = await this._sp.web.lists.getByTitle("Province").items.getById(regionDetails.ProvinceId)(); 
    const getIndex: any[] =  [];
   
    if (item.LanguageRequirement.ID === 3) {

      const languageComprehensionArray= item.LanguageComprehension?.split("") 
 
      if(languageComprehensionArray.length !== 0) {
       
         getIndex.push ( languageComprehensionArray.map((letter:string) => {
          if (letter === 'A') {
            return {key: 0, text: letter}
          }
          else if (letter === "B") {
            return {key:1, text: letter}
          }
          else if (letter === "C") {
            return {key:2, text: letter}
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
        programArea : {...prevState.programArea, key: item.ProgramArea.TermGuid},
        classificationCode: {key:item.ClassificationCode.ID , text: evaluateLanguage(this.props.prefLang, item.ClassificationCode)},
        classificationLevel:{key:item.ClassificationLevel.ID},
        numberOfOpportunities: item.NumberOfOpportunities,
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
        languageRequirements:[
          {...prevState.values.languageRequirements[0], 
          language: { key: item.LanguageRequirement.ID, text:item.LanguageRequirement.NameEn},
            readingEN: getIndex.length !== 0 ? getIndex[0][0] : {...prevState.values.languageRequirements[0].readingEN},
            writtenEN: getIndex.length !== 0 ? getIndex[0][1] : {...prevState.values.languageRequirements[0].writtenEN},
            oralEN:  getIndex.length !== 0 ? getIndex[0][2] : {...prevState.values.languageRequirements[0].oralEN},
            readingFR:  getIndex.length !== 0 ? getIndex[0][4] : {...prevState.values.languageRequirements[0].readingFR},
            writtenFR: getIndex.length !== 0 ?  getIndex[0][5]: {...prevState.values.languageRequirements[0].writtenFR },
            oralFR:  getIndex.length !== 0 ? getIndex[0][6] : {...prevState.values.languageRequirements[0].oralFR},

        }],
        approvedStaffing: {...prevState.values.approvedStaffing, value: true}
        
       
      }

    }))
  }

  public async _populateDropDowns(): Promise<void> {
    
    const {currentPage} = this.state;
    const parameters = [
      [
      '45f37f08-3ff4-4d84-bf21-4a77ddffcf3e', // jobType
      'bd807536-d8e7-456b-aab0-fae3eecedd8a', // programArea
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
      const classificationCodeResults = classificationCode.map((data:any) => ({ key: data.Id, text: this.props.prefLang === 'fr-fr' ? data.NameFr: data.NameEn }));
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
    const getInputElement = document.querySelectorAll('[class^="durationLength"]');
   
    if(getElements) {
      getElements.forEach(element => {
        elementId.push(element.id)
       
      });
    }

    if(getInputElement) {
      getInputElement.forEach(el => {
        elementId.push(...elementId, el.id);
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

    const checkUser = this.props.jobOppOwner === this.props.workEmail;

    await this._populateDropDowns();
    await this._getUser();
    await this.getDropdownElements();
    this.context.application.navigatedEvent.add(this, this.getDropdownElements());

    if (this.props.jobOpportunityId !== "" && checkUser === true) {
      await this._populateEditableFields();

    } else {
      this.setState({
        jobOpportunityOwner: checkUser
      })
    }

  }

  public async componentDidUpdate(prevProps: ICareerMarketplaceProps , prevState: ICareerMarketplaceState): Promise<void> {


    if (this.state.currentPage !== prevState.currentPage) {
      console.log("hi")
        this.setState({
          inlineFieldErrors: [],
          hasError:[],
        });

        await this._populateDropDowns();
        await this.getDropdownElements();   

    }

    if (this.state.values.jobType.Label === "Deployment" && prevState.values.jobType.Label !== "Deployment") {
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          durationLength: {...prevState.values.durationLength, value:0},
          duration: {...prevState.values.duration, key:"", text: ""},
        }   
      }))

    }
    if (this.state.values.jobType.Label === "Secondment" && prevState.values.jobType.Label !== "Secondment") {
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          durationLength:{...prevState.values.durationLength, value: 0},
          duration: {...prevState.values.duration, key:"", text: ""},
        }
      }))
    }
  }

  public componentWillUnmount():void {
    this.context.application.navigatedEvent.remove(this, this.getDropdownElements);
  }


  public changeFieldNameFormat = (): JSX.Element => {
    console.log("error", this.state.hasError)
    const properCaseValues: any[] = [];
  
    const convertString = this.state.hasError.map((item: any) => {
      console.log("item",item)
      // const isApprovedStaffing = item.key === "approvedStaffing";
      // const isEmpty = !item.value || item.value === ""; 
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
        // errorMessage: isApprovedStaffing
        //   ? isEmpty
        //     ? `${this.strings.requiredAndshouldBeYes}`
        //     : `${this.strings.shouldBeYes}`
        //   : `${localizedKey}`,
      };
    });
  
    properCaseValues.push(...convertString);
    console.log(properCaseValues);
  
    return (
      <>
        <div id="alertText">
          {properCaseValues.map((item, index) => (
            <ul key={index}>
              <li>
                <a href={`#${item.key}`}>{item.errorMessage}</a>
              </li>
            </ul>
          ))}
        </div>
      </>
    );
  };




  public render(): React.ReactElement<ICareerMarketplaceProps> {

    const customSpacingStackTokens: IStackTokens = {
      childrenGap: '3%',
    };

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

          />
        ),
      },
      {
        step: 4,
        title: 'Review',
        content: (
          <>
          <Stack horizontal wrap tokens={customSpacingStackTokens}>
            <StackItem grow={1} styles={{ root: { maxWidth: '45%' } }} >
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
                values={this.state.values}
                hasError={this.state.hasError}
                fields={this.state.dropdownFields}
                prefLang={this.props.prefLang}
                jobOppId = {this.props.jobOpportunityId}
              />
            </StackItem>
            <StackItem grow={1} styles={{ root: { maxWidth: '50%' } }} >
              <Requirements
                prefLang={this.props.prefLang}
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
                skills={this.state.skillsList}
                
              />
            </StackItem>
          </Stack>
          </>
        ),
      },
      
    ];
   
    const items = steps.map((item) => ({ key: item.step, title: "" }));
    const jobOpportunityUrl = `https://devgcx.sharepoint.com/sites/CM-test/SitePages/Job-Opportunity.aspx?JobOpportunityId=${this.props.jobOpportunityId}`

    return (
      <>      
        <ThemeProvider applyTo='body' theme={myTheme}>
          <section>
            <div>
              
              {
                this.state.validationStatus === 200 ? (
                <>                  
                  <div>
                    <Complete prefLang={this.props.prefLang} jobOppId={this.props.jobOpportunityId}/>
                  </div>  
                  <div style={{width: '100%', display: 'flex'}}>                  
                    <div style={{width: '40%'}}>
                      <Stack horizontal horizontalAlign="space-between">
                        <CustomButton id={'view'} name={this.strings.view} buttonType={'secondary'} url={jobOpportunityUrl} onClick={() => (jobOpportunityUrl)}/>
                      </Stack> 
                    </div>
                    <div style={{width: '60%'}}>
                      <Stack horizontal horizontalAlign='end'>
                        <CustomButton id={'home'} name={this.strings.complete_button} buttonType={'primary'} url={this.props.url} onClick={() => (this.props.url)}/> 
                      </Stack> 
                    </div>
                  </div>
                </>
                ) 
                :
                <>
                  {
                  (this.props.jobOpportunityId  !== "" &&  this.state.jobOpportunityOwner ===  false) ? (
                  
                      <>  
                        <div>
                          <h2>You are not the owner</h2>
                          <CustomButton id={'home'} name={"Go on, git! 🤠"} buttonType={'primary'} url={this.props.url} onClick={() => (this.props.url)}/> 
                        </div>
                      </>
                    
                  ) : (
                    <>
                    <div>
                      {this.state.isLoading ? (
                        <Spinner
                          label={this.strings.submitting_your_information}
                          labelPosition="right"
                          size={SpinnerSize.large}
                        />
                      ) : 
                      
                      <>
                      <div>
                      <PageTitle currentPage={this.state.currentPage} prefLang={this.props.prefLang}/>
                    </div>
                    <div className={styles.stepper}>
                      <Steps
                        current={currentPage}
                        labelPlacement="vertical"
                        items={items}
                      />
                    </div>
                    <div>
                      {this.state.hasError.length !== 0  && (
                        <div id='alertErrors' aria-modal="true" role="alertdialog" aria-labelledby="alertHeading" aria-describedby="alertText" className={styles.errorDialog} tabIndex={0}  ref={this.alertRef}>
                          <h3 id="alertHeading">{this.strings.fixErrors}</h3>
                          {
                            this.changeFieldNameFormat()
                          }
                        
                        </div>
                        )
                      }
                    </div>
                    <div>
                      {steps[currentPage].content}
                    </div>
  
                    <div style={{marginTop: '20px'}}>
                      <Stack horizontal horizontalAlign={currentPage !== 0 ?'space-between' : 'end'}>
                        {
                          currentPage !== 0 && (
                            <CustomButton id={'prev'} name={this.strings.prev_btn} buttonType={'secondary'} onClick={() => this.prev()}/>
                          )
                        }
                       
                        { currentPage === 3 ? 
                          <CustomButton id={'submit'} name={'Submit'} buttonType={'primary'}  onClick={() => this.next()}/>
                          :
                          <CustomButton id={'next'} name={this.strings.next_btn} buttonType={'primary'} onClick={() => this.next()}/>
                        }
                      </Stack>
                    </div>
                    </>
                      }
                    </div>
                  </>

                  )}
                </>
              }
            </div>
            
          </section>
        </ThemeProvider>
      </>

    );
  }
}
