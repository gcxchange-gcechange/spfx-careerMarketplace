/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './CareerMarketplace.module.scss';
import type { ICareerMarketplaceProps } from './ICareerMarketplaceProps';
import { Steps } from"antd";
import CustomButton from './CustomButton';
import PosterInfo from './PosterInfo';
import {  IStackTokens, Stack, StackItem, ThemeProvider, createTheme } from '@fluentui/react';
import Details from './Details';
import Requirements from './Requirements';
import {AadHttpClient, IHttpClientOptions, HttpClientResponse} from '@microsoft/sp-http';
import { getSP } from '../../../pnpConfig';
import { SPFI } from '@pnp/sp';
import PageTitle from './PageTitle';
import * as moment from 'moment';
import Complete from './Complete';
import { toTitleCase } from './Functions';


export interface ICareerMarketplaceState {
  currentPage: number;
  departmentList: any[];
  jobType: any[];
  city: any[];
  programArea: any[];
  classificationCode: any[];
  classificationLevel: any[];
  security: any[];
  language: any[];
  wrkArrangement: any[];
  duration: any[];
  wrkSchedule: any[];
  province: any[];
  region:any[];
  validationStatus: number;
  jobTypeValue: string[];
  userId: string | number;
  hasError:  {key: string, value: any}[] ;
  fieldErrorTitles :string[],
  disableButton: boolean,
  inlineFieldErrors: any[],
  dropdownFields: string[],

  values: {
    jobTitleEn: string;
    jobTitleFr: string;
    jobDescriptionEn: string;
    jobDescriptionFr: string;
    numberOfOpportunities: string;
    deadline: Date | undefined;
    department: any, 
    essentialSkill: string;
    assetSkill: string;
    approvedStaffing: string;
    jobType: any[],
    programArea: any,
    classificationCode: any,
    classificationLevel: any,
    duration: any, 
    language: any, 
    security: any,
    city: any, 
    province: any,
    region: any, 
    workArrangment: any, 
    workSchedule: any, 
  }

}
 

export default class CareerMarketplace extends React.Component<ICareerMarketplaceProps, ICareerMarketplaceState> {

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
      jobTypeValue: [],
      userId: '',
      hasError: [],
      fieldErrorTitles: [],
      disableButton: false,
      inlineFieldErrors: [],
      dropdownFields: [],

      values: {
        department: {value: "" , pageNumber: 0},
        jobTitleEn: "",
        jobTitleFr: "",
        jobDescriptionEn: "",
        jobDescriptionFr: "",
        jobType: [{pageNumber: 1}],
        programArea: {value: "" , pageNumber: 1},
        classificationCode: {value: "" , pageNumber: 1},
        classificationLevel: {value: "" , pageNumber: 1},
        numberOfOpportunities: "",
        duration: {value: "" , pageNumber: 1},
        deadline: threeMonthsLater,
        essentialSkill: "",
        assetSkill: "",
        workSchedule: {value: "" , pageNumber: 2},
        province: {value: "" , pageNumber: 2},
        region: {value: "" , pageNumber: 2},
        city: {value: "" , pageNumber: 2},
        security: {value: "" , pageNumber: 2},
        language:{value: "" , pageNumber: 2},
        workArrangment: {value: "" , pageNumber: 2}, 
        approvedStaffing: "",
      }
    };
  }

 
  private next = async (): Promise<void > => {

    const { values, currentPage } = this.state;

    const checkValues: {key: string, value: any}[] = [];
    const  currentPgFields = Object.entries(values).filter(([, fieldData]) => {
      if( Array.isArray(fieldData)) {
        return fieldData.some(item => item.pageNumber === currentPage);
      }
      return fieldData.pageNumber === currentPage;
    }).map(([field]) => field)
   

    const stringValues = Object.entries(values).filter(([key, value]) => typeof value === "string" && document.getElementById(key)).map(([value]) => value);

    for (const [key,value] of Object.entries(values)) {

      if (
        (currentPgFields.includes(key) && value.value === "" )
        || (stringValues.includes(key) && value === "") 
        || value.text === "--Select--" || (currentPgFields.includes(key) && value.length === 1)
        ){
        
        checkValues.push({key, value })
      }

     }

    const newArray = toTitleCase(checkValues)

    const nextPage = this.state.currentPage + 1;

    if (this.state.currentPage < 4 ) {

      if (checkValues.length !== 0) {
        await this.setState({
          hasError: checkValues,
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

  public addInLineErrors = ():void => {
    this.state.hasError.forEach(element => {
      const error = document.getElementById(element.key);
      const findDivError = document.getElementById('error')

        // Create the outer div element
        const newDiv = document.createElement("div");
        newDiv.id = `error_${element.key}`;
        newDiv.style.borderLeft = "2px solid rgb(164, 38, 44)";
        newDiv.style.marginTop = "5px";
        newDiv.style.paddingLeft = "5px";
      
        // Create the paragraph element
        const newParagraph = document.createElement("p");
        newParagraph.style.margin = "0px";
        newParagraph.style.fontWeight = "700";
        newParagraph.style.color = 'rgb(164, 38, 44)';
      
        // Add text content to the paragraph
        const textContent = document.createTextNode("Field has an error");
        newParagraph.appendChild(textContent);
      
        // Append the paragraph to the div
        newDiv.appendChild(newParagraph);

        
      if (error) {
          error.classList.add(styles.error);
          if(!findDivError) {
            error.insertAdjacentElement("afterend", newDiv);
          }
      } 
    });
   
  }

  private prev = (): void => {
    const prevPage = this.state.currentPage -1 ;
  
    if(this.state.hasError.length !== 0) {
      this.setState({
        disableButton: true
      })
    }

    if (this.state.currentPage > 0 && this.state.hasError.length === 0) {
      this.setState({
        currentPage: prevPage
      })
    }
  }



  private submit = (): void => {
    const {jobTypeValue}= this.state

    const dateStr = this.state.values.deadline;  
    const momentDate = moment(dateStr, "YYYY-MM-DD");  
    const isoString = momentDate.toISOString();  

    const formatJobType = jobTypeValue.map((item) => (item.toString()));
    console.log(formatJobType)



    const clientId = "c121f403-ff41-4db3-8426-f3b9c5016cd4";
    const url = "https://appsvc-function-dev-cm-listmgmt-dotnet001.azurewebsites.net/api/CreateJobOpportunity?code=SqdzqkkJo5j_TxoqTSv4zQdcpRp1WaxsvWUal8KLR61bAzFuVVQOUw%3D%3D";
  
      const requestHeaders: Headers = new Headers();
      requestHeaders.append("Content-type", "application/json");
      requestHeaders.append("Cache-Control", "no-cache");
      
      const postOptions: IHttpClientOptions= {
        headers: requestHeaders,
        body: `{

              "ContactObjectId": "${this.state.userId}",
              "ContactName": "${this.props.userDisplayName}",
              "DepartmentLookupId": "${this.state.values.department.key}",
              "ContactEmail": "${this.props.workEmail}",
              "JobTitleEn": "${this.state.values.jobTitleEn}",
              "JobTitleFr": "${this.state.values.jobTitleFr}",
              "JobTypeLookupId": ${JSON.stringify(formatJobType)},
              "ProgramAreaLookupId": "${this.state.values.programArea.key}",
              "ClassificationCodeLookupId": "${this.state.values.classificationCode.key}",
              "ClassificationLevelLookupId": "${this.state.values.classificationLevel.key}",
              "NumberOfOpportunities": "${this.state.values.numberOfOpportunities}",
              "DurationLookupId": "${this.state.values.duration.key}",
              "ApplicationDeadlineDate": "${isoString}",
              "JobDescriptionEn": "${this.state.values.jobDescriptionEn}",
              "JobDescriptionFr": "${this.state.values.jobDescriptionFr}",
              "EssentialSkills": "${this.state.values.essentialSkill}",
              "WorkScheduleLookupId": "${this.state.values.workSchedule.key}",
              "SecurityClearanceLookupId": "${this.state.values.security.key}",
              "LanguageRequirementLookupId": "${this.state.values.language.key}",
              "WorkArrangementLookupId": "${this.state.values.workArrangment.key}",
              "ApprovedStaffing": true,
              "AssetSkills": "${this.state.values.assetSkill}",
              "CityLookupId": "${this.state.values.city.key}"
        }`,

      };

      console.log("BODY", postOptions.body)
      try {
        this.props.context.aadHttpClientFactory
        .getClient(clientId)
        .then((client: AadHttpClient): void => {
          client
          .post(url, AadHttpClient.configurations.v1, postOptions)
          .then((response: HttpClientResponse) => {
            console.log('RESPONSE:', response);
            if (response.status) {
              this.setState({
                validationStatus: response.status
              })
            }
            return response.json();
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

  public handleDropDownItem = (valueName: any, value: any):void => {

    if (valueName === "jobType") {

      const findItem = [...this.state.values.jobType];
      
      const jobTypeExists = findItem.some((item) => item.value === value.key);
    
      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          jobType: jobTypeExists
            ? prevState.values.jobType.filter((item) => item.value !== value.key) 
            : [...prevState.values.jobType, {value: value.key}],  
        },
      }));
    }

    else {

      this.setState((prevState) => ({
        values: {
          ...prevState.values,
          [valueName]: value
  
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

  public _getDropdownList = async (): Promise<void> => {

    const {currentPage} = this.state;
    const _sp: SPFI = getSP(this.props.context);


    if (currentPage === 0 ) {
      const departments = await _sp.web.lists.getByTitle('Department').items();
      if ( departments) {
        const dataArray = departments.map((data:any) => ({ key: data.Id, text: data.NameEn, pageNumber: 0 }));
          this.setState({
            departmentList: dataArray
          }) 
      } else {
        console.log('List Department not found')
      }
    }

    else if (currentPage === 1 ) {
      const jobType = await _sp.web.lists.getByTitle('JobType').items();
      const programArea = await _sp.web.lists.getByTitle('ProgramArea').items();
      const classificationCode = await _sp.web.lists.getByTitle('ClassificationCode').items();
      const classificationLevel = await _sp.web.lists.getByTitle('ClassificationLevel').items();
      const duration = await _sp.web.lists.getByTitle('Duration').items();

      if (jobType) {
        const dataResult = jobType.map((data:any) => ({ key: data.Id, text: data.NameEn}));
        this.setState({
          jobType: dataResult
        }) 
      }
      else {
        console.log("List does not exist")
       }
      
      if (programArea) {
        const dataResult = programArea.map((data:any) => ({ key: data.Id, text: data.NameEn }));
        this.setState({
          programArea: dataResult
        }) 
      } else {
        console.log("List does not exist")
       }
      
      if (classificationCode) {
        const dataResult = classificationCode.map((data:any) => ({ key: data.Id, text: data.NameEn }));
        console.log("ClassCode data", dataResult)
        this.setState({
          classificationCode: dataResult
        }) 

      } else {
        console.log("List does not exist")
       }
      
      if (classificationLevel) {
        console.log('cLevel', classificationLevel);
        const dataResult = classificationLevel.map((data:any) => ({ key: data.Id, text: data.NameEn }));
        this.setState({
          classificationLevel: dataResult
        }) 

      } else {
        console.log("List does not exist")
       }
      
      if (duration) {
        const dataResult = duration.map((data:any) => ({ key: data.Id, text: data.NameEn }));
        this.setState({
          duration: dataResult
        }) 
      }
       else {
        console.log("List does not exist")
       }

    }
    else if (currentPage === 2) {
      console.log("page 2")
      const languageReq = await _sp.web.lists.getByTitle('LanguageRequirement').items();
      const securityClearance = await _sp.web.lists.getByTitle('SecurityClearance').items();
      const workArrangment = await _sp.web.lists.getByTitle('WorkArrangement').items();
      const wrkSchedule = await _sp.web.lists.getByTitle('WorkSchedule').items();
      const city =  await _sp.web.lists.getByTitle('City').items();
      const province =  await _sp.web.lists.getByTitle('Province').items();
      const region =  await _sp.web.lists.getByTitle('Region').items();

      if (languageReq) {
        const dataResult = languageReq.map((data:any) => ({ key: data.Id, text: data.NameEn, pageNumber: 2}));
        this.setState({
          language: dataResult
        }) 

      } else {
        console.log("Language list does not exist")
       }
      
      
      if (securityClearance) {
        const dataResult = securityClearance.map((data:any) => ({key: data.Id, text: data.NameEn, pageNumber: 2}))
          this.setState({
            security: dataResult
          })

      } else {
        console.log("Language list does not exist")
       }
      
      if (workArrangment) {
        const dataResult = workArrangment.map((data:any) => ({key: data.Id, text: data.NameEn}))
        this.setState({
          wrkArrangement: dataResult
        })
      } else {
       console.log(" list does not exist")
      }

      if (wrkSchedule) {
        const dataResult = wrkSchedule.map((data:any) => ({key: data.Id, text: data.NameEn}))
        this.setState({
          wrkSchedule: dataResult
        })
      } else {
       console.log(" list does not exist")
      }
      if (city) {
        console.log("CITYLIST", city)
        const dataResult = city.map((data:any) => ({key: data.Id, text: data.NameEn, regionID: data.RegionId}))
        this.setState({
          city: dataResult
        })
      } else {
       console.log(" list does not exist")
      }
      if (province) {
        console.log("PROVINCELIST", province)
        const dataResult = province.map((data:any) => ({key: data.Id, text: data.NameEn}))
        this.setState({
          province: dataResult
        })
      } else {
       console.log(" list does not exist")
      }
      if (region) {
        console.log("Region List",region)
        const dataResult = region.map((data:any) => ({key: data.Id, text: data.NameEn, provinceId: data.ProvinceId}))
        this.setState({
          region: dataResult
        })
      } else {
       console.log(" list does not exist")
      }
           
    }
  }

  public _getUser = async ():Promise<void> => {
    const _sp: SPFI = getSP(this.props.context);
    const user = await  _sp.web.currentUser();

    const userID = user.UserId.NameId

    this.setState({
      userId: userID
    })
  }

  public getDropdownElements =(): void => {
    const elementId :any[] = [];
    const getElements = document.querySelectorAll('div[class^="ms-Dropdown"]');

    if(getElements) {
      getElements.forEach(element => {
        elementId.push(element.id)
       
      });
    }

    this.setState({
      dropdownFields: elementId
    });

    const cleanUpDropDownFields = this.state.dropdownFields.filter((n) => n)

    this.onBlur(cleanUpDropDownFields);

  }

  public onBlur = (fields: string[]): void => {
    console.log(fields);
    //const fieldErrors :string[] = [];
  
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

          if(tab === true) {
            if (!this.state.inlineFieldErrors.includes(fieldId)) {
              this.setState({
                inlineFieldErrors: [...this.state.inlineFieldErrors, fieldId]
              })

            }
          }
          else {
            this.setState({
              inlineFieldErrors: []
            })
          }
          
          tab = false;
        });
      }
    });
  };


  public async componentDidMount(): Promise<void> {
    await this._getDropdownList();
    await this._getUser();
    await this.getDropdownElements();
  }

  public async componentDidUpdate(prevProps: ICareerMarketplaceProps , prevState: ICareerMarketplaceState): Promise<void> {
    if (this.state.currentPage !== prevState.currentPage) {

        this.setState({
          inlineFieldErrors: []
        });

        await this._getDropdownList();
        await this.getDropdownElements();       
    }
  }

  public changeFieldNameFormat = () : JSX.Element => {
    const properCaseValues: any[] = [];


    const convertString = this.state.hasError.map((item: any) => ({
      key: item.key,
      properCase: item.key.replace(/([A-Z])/g, ' $1').replace(/^ /, '').toLowerCase()
    }))

   
    properCaseValues.push(...convertString);
  
    return (
      
     <>
     <div>
     {properCaseValues.map((item, index) => (
      <ul key={index}>
        <li>
        <a href={`#${item.key}`}>The {item.properCase} field is required</a> 
        </li>
      </ul>
     ))}
     </div>
     </>

    )
  }

 


  public render(): React.ReactElement<ICareerMarketplaceProps> {

    console.log("HASERROR",this.state.hasError)


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
            values={this.state.values}
            hasError={this.state.hasError}
            jobTypeValues={this.state.jobTypeValue}
            //onBlur={this.handleOnBlur}
            inlineFieldErrors ={this.state.inlineFieldErrors}
            fields={this.state.dropdownFields}
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
            handleOnChange={() => this.handleOnChangeTextField} 
            values={this.state.values}
            inlineFieldErrors={this.state.inlineFieldErrors}
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
                values={this.state.values}
                jobTypeValues={this.state.jobTypeValue}
                hasError={this.state.hasError}
                fields={this.state.dropdownFields}
              />
            </StackItem>
            <StackItem grow={1} styles={{ root: { maxWidth: '50%' } }} >
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
                handleOnChange={() => this.handleOnChangeTextField} 
                values={this.state.values}
                inlineFieldErrors={this.state.inlineFieldErrors}
              />
            </StackItem>
          </Stack>
          </>

          // <Review/>
        ),
      },
      
    ];
   
    const items = steps.map((item) => ({ key: item.step, title: "" }));

    return (
      <>      
        <ThemeProvider applyTo='body' theme={myTheme}>
          <section>
            <div>
              {
                this.state.validationStatus === 400 ? (
                <>                  
                  <div>
                    <Complete/>
                  </div>  
                  <div style={{width: '100%', display: 'flex'}}>                  
                    <div style={{width: '40%'}}>
                      <Stack horizontal horizontalAlign="space-between">
                        <CustomButton id={'edit'} name={'Edit'} buttonType={'secondary'} onClick={() => this.prev()}/>
                        <CustomButton id={'view'} name={'View Opportunity'} buttonType={'secondary'} onClick={() => this.prev()}/>
                      </Stack> 
                    </div>
                    <div style={{width: '60%'}}>
                      <Stack horizontal horizontalAlign='end'>
                        <CustomButton id={'home'} name={'Career Marketplace HomePage'} buttonType={'primary'} onClick={() => this.prev()}/>
                      </Stack> 
                    </div>
                  </div>
                </>
                )
                :
                <>
                
                  <div>
                    <PageTitle currentPage={this.state.currentPage}/>
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
                    <div style={{ border: '2px solid #8F0000', borderRadius: '5px',padding: '5px', marginTop:'10px'}}>
                      <h3 style={{color: '#8F0000'}}>Please fix the following errors before proceeding.</h3>
                      {
                        this.changeFieldNameFormat()
                      }
                     
                        {/* {this.state.hasError.map((item) => (
                          <ul key={item.key} style={{color: '#8F0000'}}>
                            <li>
                              <a href={`#${item.key}`}>The {item.key} field is required</a> 
                            </li>
                          </ul>
                        ))} */}
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
                          <CustomButton id={'prev'} name={'Previous'} buttonType={'secondary'} disabled={this.state.disableButton} onClick={() => this.prev()}/>
                        )
                      }
                     
                      { currentPage === 3 ? 
                        <CustomButton id={'submit'} name={'Submit'} buttonType={'primary'}  onClick={() => this.submit()}/>
                        :
                        <CustomButton id={'next'} name={'Next'} buttonType={'primary'} disabled={this.state.disableButton}  onClick={() => this.next()}/>
                      }
                    </Stack>
                  </div>
                </>
              }
            </div>
            
          </section>
        </ThemeProvider>
      </>

    );
  }
}
