/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './CareerMarketplace.module.scss';
import type { ICareerMarketplaceProps } from './ICareerMarketplaceProps';
import { Steps } from"antd";
import CustomButton from './CustomButton';
import PosterInfo from './PosterInfo';
import {  Stack, ThemeProvider, createTheme } from '@fluentui/react';
import Details from './Details';
import Requirements from './Requirements';
//import Review from './Review';
import {AadHttpClient, IHttpClientOptions, HttpClientResponse} from '@microsoft/sp-http';
import { getSP } from '../../../pnpConfig';
import { SPFI } from '@pnp/sp';




export interface ICareerMarketplaceState {
  currentPage: number;
  contactName: string;
  departmentList: any[];
  workEmail: string;
  jobTitleEn: string;
  jobTitleFr: string;
  jobType: any[];
  jobDescriptionEn: string;
  jobDescriptionFr: string;
  city: any[];
  programArea: any[];
  classificationCode: any[];
  classificationLevel: any[];
  location: any[];
  security: any[];
  language: any[];
  workArrangement: any[];
  duration: any[];
  wrkSchedule: any[];
  province: any[];
  region:any[];
  allLists: any[];
  values: [{department: string, region: string}]

}



export default class CareerMarketplace extends React.Component<ICareerMarketplaceProps, ICareerMarketplaceState> {

  
  constructor(props: ICareerMarketplaceProps, state: ICareerMarketplaceState) {
    super(props);
    this.state = {
      currentPage: 0,
      contactName: `${this.props.userDisplayName}`,
      departmentList: [],
      workEmail: "",
      jobTitleEn: "",
      jobTitleFr: "",
      jobType: [],
      jobDescriptionEn: "",
      jobDescriptionFr: "",
      city: [],
      programArea:[],
      classificationCode: [],
      classificationLevel: [],
      location: [],
      security: [],
      language: [],
      workArrangement: [],
      duration: [],
      wrkSchedule: [],
      province: [],
      region:[],

      allLists: [],

      values: [{department: "", region: ""}]
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
              "ContactName": "${this.state.contactName}",
              "DepartmentLookupId": "1",
              "ContactEmail": "${this.state.workEmail}",
              "JobTitleEn": "${this.state.jobTitleEn}",
              "JobTitleFr": "${this.state.jobTitleFr}",
              "JobTypeLookupId": [ "2", "3" ],
              "ProgramAreaLookupId": "1",
              "ClassificationCodeLookupId": "1",
              "ClassificationLevelLookupId": "1",
              "NumberOfOpportunities": "1",
              "DurationLookupId": "1",
              "ApplicationDeadlineDate": "2024-11-08T00:00:00",
              "JobDescriptionEn": "${this.state.jobDescriptionEn}",
              "JobDescriptionFr": "${this.state.jobDescriptionFr}",
              "EssentialSkills": "Typing",
              "WorkScheduleLookupId": "1",
              "LocationLookupId": "1",
              "SecurityClearanceLookupId": "1",
              "LanguageRequirementLookupId": "1",
              "WorkArrangementLookupId": "1",
              "ApprovedStaffing": true,
              "AssetSkills": "none",
              "CityLookupId": "1"
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

    this.setState ({
      ...this.state,
      [eventName]: inputValue
    })

  }

  public handleDropDownItem = (event: any, item: any):void => {
    console.log("ITEM", item)
    console.log("E", event);
    const newValue:any = this.state.values.map((val) => {
      console.log(val)
      if(val === event) {
        console.log("hello")
      }
      return newValue
    })

   this.setState({...this.state, [event]: item})


    // this.setState((prevState) => ({
    //   values: {
    //     ...prevState.values,
    //     [event]: item

    //   }
    // }))

  }

  public _getAllLists = async (): Promise<void> => {
    const _sp: SPFI = getSP(this.props.context);
    const allLists =  await _sp.web.lists();
    console.log('all',allLists)

    const allListNames: string[] = [];
    
    allLists.map(async(lists) => {
      const listName = lists.Title;
      allListNames.push(listName)
    })

    console.log("all", allListNames);

    this.setState({
      allLists: allListNames
    })
  }

  public _getDropdownList = async (): Promise<void> => {

    const {currentPage} = this.state;
    const _sp: SPFI = getSP(this.props.context);


    if (currentPage === 0 ) {
      const departments = await _sp.web.lists.getByTitle('Department').items();
      if ( departments) {
        const dataArray = departments.map((data) => ({ key: data.Id, text: data.NameEn }));
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
        const dataResult = jobType.map((data) => ({ key: data.Id, text: data.NameEn }));
        this.setState({
          jobType: dataResult
        }) 
      }
      else {
        console.log("List does not exist")
       }
      
      if (programArea) {
        const dataResult = programArea.map((data) => ({ key: data.Id, text: data.NameEn }));
        this.setState({
          programArea: dataResult
        }) 
      } else {
        console.log("List does not exist")
       }
      
      if (classificationCode) {
        const dataResult = classificationCode.map((data) => ({ key: data.Id, text: data.NameEn }));
        this.setState({
          classificationCode: dataResult
        }) 

      } else {
        console.log("List does not exist")
       }
      
      if (classificationLevel) {
        console.log('cLevel', classificationLevel);
        const dataResult = classificationLevel.map((data) => ({ key: data.Id, text: data.NameEn }));
        this.setState({
          classificationLevel: dataResult
        }) 

      } else {
        console.log("List does not exist")
       }
      
      if (duration) {
        const dataResult = duration.map((data) => ({ key: data.Id, text: data.NameEn }));
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
      const location = await _sp.web.lists.getByTitle('Location').items();
      const securityClearance = await _sp.web.lists.getByTitle('SecurityClearance').items();
      const workArrangment = await _sp.web.lists.getByTitle('WorkArrangement').items();
      const wrkSchedule = await _sp.web.lists.getByTitle('WorkSchedule').items();
      const city =  await _sp.web.lists.getByTitle('City').items();
      const province =  await _sp.web.lists.getByTitle('Province').items();
      const region =  await _sp.web.lists.getByTitle('Region').items();

      if (languageReq) {
        const dataResult = languageReq.map((data) => ({ key: data.Id, text: data.NameEn }));
        this.setState({
          language: dataResult
        }) 

      } else {
        console.log("Language list does not exist")
       }
      
      if (location) {
        const dataResult = location.map((data) => ({ key: data.Id, text: data.NameEn }));
        this.setState({
          location: dataResult
        }) 

      } else {
        console.log("Language list does not exist")
       }
      
      if (securityClearance) {
        const dataResult = securityClearance.map((data) => ({key: data.Id, text: data.NameEn}))
          this.setState({
            security: dataResult
          })

      } else {
        console.log("Language list does not exist")
       }
      
      if (workArrangment) {
        const dataResult = workArrangment.map((data) => ({key: data.Id, text: data.NameEn}))
        this.setState({
          workArrangement: dataResult
        })
      } else {
       console.log(" list does not exist")
      }

      if (wrkSchedule) {
        const dataResult = wrkSchedule.map((data) => ({key: data.Id, text: data.NameEn}))
        this.setState({
          wrkSchedule: dataResult
        })
      } else {
       console.log(" list does not exist")
      }
      if (city) {
        const dataResult = city.map((data) => ({key: data.Id, text: data.NameEn}))
        this.setState({
          city: dataResult
        })
      } else {
       console.log(" list does not exist")
      }
      if (province) {
        const dataResult = province.map((data) => ({key: data.Id, text: data.NameEn}))
        this.setState({
          province: dataResult
        })
      } else {
       console.log(" list does not exist")
      }
      if (region) {
        const dataResult = region.map((data) => ({key: data.Id, text: data.NameEn}))
        this.setState({
          region: dataResult
        })
      } else {
       console.log(" list does not exist")
      }
      
      
    }


  }

  public async componentDidMount(): Promise<void> {
    await this._getAllLists()
    await this._getDropdownList()
  }

  public async componentDidUpdate(prevProps: ICareerMarketplaceProps , prevState: ICareerMarketplaceState): Promise<void> {
    if (this.state.currentPage !== prevState.currentPage) {
        console.log("I changed pages")
        await this._getDropdownList()
    }
  }





  public render(): React.ReactElement<ICareerMarketplaceProps> {

    
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
          />
        ),
      },
      {
        step: 3,
        title: 'Requirements',
        content: (
          <Requirements
            language = {this.state.language}
            location = {this.state.location}
            security = {this.state.security}
            workArrangment = {this.state.workArrangement}
            city={this.state.city}
            wrkSchedule = {this.state.wrkSchedule}
            province = {this.state.province}
            region = {this.state.region}
            currentPage= {this.state.currentPage}
            handleDropDownItem={this.handleDropDownItem}
            

          />
        ),
      },
      {
        step: 4,
        title: 'Review',
        content: (
          <>
          <PosterInfo handleOnChange={this.handleOnChangeTextField} items={this.state.departmentList} handleDropDownItem={this.handleDropDownItem} userInfo={this.props.userDisplayName} workEmail={this.props.workEmail} currentPage= {this.state.currentPage} readOnly={false} values={this.state.values}/>
          <Details handleDropDownItem={this.handleDropDownItem} programArea={this.state.programArea} classificationCode={this.state.classificationCode} classificationLevel={this.state.classificationLevel}  jobType={this.state.jobType} duration={this.state.duration} currentPage= {this.state.currentPage}/>
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
            <div>{steps[currentPage].content}</div>
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
