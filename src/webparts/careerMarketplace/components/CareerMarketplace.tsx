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
//import Review from './Review';
import {AadHttpClient, IHttpClientOptions, HttpClientResponse} from '@microsoft/sp-http';
import { getSP } from '../../../pnpConfig';
import { SPFI } from '@pnp/sp';





export interface ICareerMarketplaceState {
  currentPage: number;
  departmentList: any[];
  jobType: any[];
  city: any[];
  programArea: any[];
  classificationCode: any[];
  classificationLevel: any[];
  location: any[];
  security: any[];
  language: any[];
  wrkArrangement: any[];
  duration: any[];
  wrkSchedule: any[];
  province: any[];
  region:any[];

  values: {
    jobTitleEn: string;
    jobTitleFr: string;
    jobDescriptionEn: string;
    jobDescriptionFr: string;
    numOfOpps: string;
    deadline: Date | undefined;
    department: any, 
    essentialSkill: string;
    assetSkill: string;
    approvedStaffing: string;
    jobType: string,
    programArea: any,
    classificationCode: any,
    classificationLevel: any,
    duration: any, 
    language: any, 
    location: string, 
    security: any,
    city: any, 
    province: any,
    region: any, 
    wrkArrangment: any, 
    wrkSchedule: string, 
  }

}



export default class CareerMarketplace extends React.Component<ICareerMarketplaceProps, ICareerMarketplaceState> {

  
  constructor(props: ICareerMarketplaceProps, state: ICareerMarketplaceState) {
    super(props);
    this.state = {
      currentPage: 0,
      departmentList: [],
      jobType: [],
      city: [],
      programArea:[],
      classificationCode: [],
      classificationLevel: [],
      location: [],
      security: [],
      language: [],
      wrkArrangement: [],
      duration: [],
      wrkSchedule: [],
      province: [],
      region:[],

      values: {
        jobTitleEn: "",
        jobTitleFr: "",
        jobDescriptionEn: "",
        jobDescriptionFr: "",
        numOfOpps: "",
        deadline: new(Date),
        essentialSkill: "",
        assetSkill: "",
        approvedStaffing: "",
        department: "", 
        jobType: "",
        programArea: "",
        classificationCode: "",
        classificationLevel: "",
        duration: "", 
        language: "", 
        location: "", 
        security: "",
        city: "", 
        province: "",
        region: "", 
        wrkArrangment: "", 
        wrkSchedule: "", 
      }
    };
  }

  private next = (): void => {
    const nextPage = this.state.currentPage + 1;

    if (this.state.currentPage < 3) {
      this.setState({
        currentPage: nextPage
      })
    }

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
    console.log("submit");

      const clientId = "c1";
      const url = "CreateJobOpportunity";
  
      const requestHeaders: Headers = new Headers();
      requestHeaders.append("Content-type", "application/json");
      requestHeaders.append("Cache-Control", "no-cache");
  
      const postOptions: IHttpClientOptions= {
        headers: requestHeaders,
        body: `{

              "ContactObjectId": null,
              "ContactName": "${this.props.userDisplayName}",
              "DepartmentLookupId": "${this.state.values.department.key}",
              "ContactEmail": "${this.props.workEmail}",
              "JobTitleEn": "${this.state.values.jobTitleEn}",
              "JobTitleFr": "${this.state.values.jobTitleFr}",
              "JobTypeLookupId": [ "2", "3" ],
              "ProgramAreaLookupId": "${this.state.values.programArea.key}",
              "ClassificationCodeLookupId": "${this.state.values.classificationCode.key}",
              "ClassificationLevelLookupId": "${this.state.values.classificationLevel.key}",
              "NumberOfOpportunities": "${this.state.values.numOfOpps}",
              "DurationLookupId": "${this.state.values.duration.key}",
              "ApplicationDeadlineDate": "2024-11-08T00:00:00",
              "JobDescriptionEn": "${this.state.values.jobDescriptionEn}",
              "JobDescriptionFr": "${this.state.values.jobDescriptionFr}",
              "EssentialSkills": "${this.state.values.essentialSkill}",
              "WorkScheduleLookupId": "${this.state.values.wrkSchedule}",
              "LocationLookupId": "1",
              "SecurityClearanceLookupId": "${this.state.values.security.key}",
              "LanguageRequirementLookupId": "${this.state.values.language.key}",
              "WorkArrangementLookupId": "${this.state.values.wrkArrangment.key}",
              "ApprovedStaffing": true,
              "AssetSkills": "${this.state.values.assetSkill}",
              "CityLookupId": "${this.state.values.city.key}"
        }`,

      };

      try {
        this.props.context.aadHttpClientFactory
        .getClient(clientId)
        .then((client: AadHttpClient): void => {
          client
          .post(url, AadHttpClient.configurations.v1, postOptions)
          .then((response: HttpClientResponse) => {
            console.log('RESPONSE:', response.json());
            return response.json();
          })
          
        })
      }
      catch(error){
        console.log(error)
      }
      
  };


  public handleOnChangeTextField = (event: any, value: string): void => {

    const eventName = event;
    const inputValue = value;
    
    console.log("Event",event);
    console.log("Value",value);

    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [eventName]: inputValue

      }
    }))

  }

  public handleDropDownItem = (valueName: any, value: any):void => {
 
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        [valueName]: value

      }
    }))

  }

  public handleOnDateChange=(date: Date | undefined):void => {
    console.log(date)
    this.setState((prevState) => ({
      values: {
        ...prevState.values,
        deadline: date

      }
    }))
  }

  // public _getAllLists = async (): Promise<void> => {
  //   const _sp: SPFI = getSP(this.props.context);
  //   const allLists =  await _sp.web.lists();
  //   console.log('all',allLists)

  //   const allListNames: string[] = [];
    
  //   allLists.map(async(lists) => {
  //     const listName = lists.Title;
  //     allListNames.push(listName)
  //   })

  //   console.log("all", allListNames);

  //   this.setState({
  //     allLists: allListNames
  //   })
  // }

  public _getDropdownList = async (): Promise<void> => {

    const {currentPage} = this.state;
    const _sp: SPFI = getSP(this.props.context);


    if (currentPage === 0 ) {
      const departments = await _sp.web.lists.getByTitle('Department').items();
      if ( departments) {
        const dataArray = departments.map((data:any) => ({ key: data.Id, text: data.NameEn }));
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
        const dataResult = jobType.map((data:any) => ({ key: data.Id, text: data.NameEn }));
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
        const dataResult = languageReq.map((data:any) => ({ key: data.Id, text: data.NameEn }));
        this.setState({
          language: dataResult
        }) 

      } else {
        console.log("Language list does not exist")
       }
      
      
      if (securityClearance) {
        const dataResult = securityClearance.map((data:any) => ({key: data.Id, text: data.NameEn}))
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

  public async componentDidMount(): Promise<void> {
    await this._getDropdownList()
  }

  public async componentDidUpdate(prevProps: ICareerMarketplaceProps , prevState: ICareerMarketplaceState): Promise<void> {
    if (this.state.currentPage !== prevState.currentPage) {
        console.log("I changed pages")
        await this._getDropdownList()
    }
  }





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
    console.log("VALUES", this.state.values)

    const steps = [
      {
        step: 1,
        title: 'Information',
        content: (
          <PosterInfo 
            handleOnChange={this.handleOnChangeTextField} 
            items={this.state.departmentList} 
            userInfo={this.props.userDisplayName} 
            workEmail = {this.props.workEmail}
            currentPage= {this.state.currentPage}
            handleDropDownItem={this.handleDropDownItem}
            readOnly= {false}
            values={this.state.values}
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
            wrkArrangment = {this.state.wrkArrangement}
            city={this.state.city}
            wrkSchedule = {this.state.wrkSchedule}
            province = {this.state.province}
            region = {this.state.region}
            currentPage= {this.state.currentPage}
            handleDropDownItem={this.handleDropDownItem}
            handleOnChange={this.handleOnChangeTextField} 
            values={this.state.values}
            

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
                handleOnChange={this.handleOnChangeTextField} 
                items={this.state.departmentList} 
                userInfo={this.props.userDisplayName} 
                workEmail = {this.props.workEmail}
                currentPage= {this.state.currentPage}
                handleDropDownItem={this.handleDropDownItem}
                readOnly= {false}
                values={this.state.values}
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
              />
            </StackItem>
            <StackItem grow={1} styles={{ root: { maxWidth: '50%' } }} >
              <Requirements
                language = {this.state.language}
                security = {this.state.security}
                wrkArrangment = {this.state.wrkArrangement}
                city={this.state.city}
                wrkSchedule = {this.state.wrkSchedule}
                province = {this.state.province}
                region = {this.state.region}
                currentPage= {this.state.currentPage}
                handleDropDownItem={this.handleDropDownItem}
                handleOnChange={this.handleOnChangeTextField} 
                values={this.state.values}
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
              <h2>Title</h2>
            </div>
            <div className={styles.stepper}>
              <Steps
                current={currentPage}
                labelPlacement="vertical"
                items={items}
              />
            </div>
            <div>
              {steps[currentPage].content}
            </div>
            <div style={{marginTop: '20px'}}>
              <Stack horizontal horizontalAlign={'space-between'}>
                <CustomButton id={'prev'} name={'Previous'} buttonType={'secondary'} onClick={() => this.prev()}/>
                { currentPage === 3 ? 
                  <CustomButton id={'submit'} name={'Submit'} buttonType={'primary'}  onClick={() => this.submit()}/>
                :
                  <CustomButton id={'next'} name={'Next'} buttonType={'primary'}  onClick={() => this.next()}/>
                }
              </Stack>
            </div>
          </section>
        </ThemeProvider>
      </>

    );
  }
}
