/* eslint-disable @typescript-eslint/no-floating-promises */
/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import styles from './CareerMarketplace.module.scss';
import type { ICareerMarketplaceProps } from './ICareerMarketplaceProps';
import { Steps } from"antd";
import CustomButton from './CustomButton';
import PosterInfo from './PosterInfo';
import { IDropdownOption, Stack, ThemeProvider, createTheme } from '@fluentui/react';
import Details from './Details';
import Requirements from './Requirements';
import Review from './Review';
import {AadHttpClient, IHttpClientOptions, HttpClientResponse} from '@microsoft/sp-http';
import { getSP } from '../../../pnpConfig';
import { SPFI } from '@pnp/sp';
import Complete from './Complete';




export interface ICareerMarketplaceState {
  currentPage: number;
  contactName: string;
  department: any[];
  workEmail: string;
  jobTitleEn: string;
  jobTitleFr: string;
  jobType: string;
  jobDescriptionEn: string;
  jobDescriptionFr: string;
  city: string[];
}



export default class CareerMarketplace extends React.Component<ICareerMarketplaceProps, ICareerMarketplaceState> {

  
  constructor(props: ICareerMarketplaceProps, state: ICareerMarketplaceState) {
    super(props);
    this.state = {
      currentPage: 0,
      contactName: "",
      department: [],
      workEmail: "",
      jobTitleEn: "",
      jobTitleFr: "",
      jobType: "",
      jobDescriptionEn: "",
      jobDescriptionFr: "",
      city: []
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

  public handleDropDownItem = (item: IDropdownOption):void => {

  }

  public _getDropdownList = async (): Promise<void> => {
    const {currentPage} = this.state;
    const _sp: SPFI = getSP(this.props.context);

    
    console.log("LIST",_sp);
    console.log("list", this.props.list);

    this.props.list.map(async (listId: string) => {
      if (currentPage === 0 && listId === 'ee941d16-2a92-4d84-83fc-acc26611f9b7' ) {
        const itemsA = await _sp.web.lists.getById('ee941d16-2a92-4d84-83fc-acc26611f9b7').items();
  
        const dataArray = itemsA.map((data) => ({ key: data.Id, text: data.NameEn }));
  
        console.log("DA",dataArray);
        this.setState({
          department: dataArray
        }) 
      }
      else if (currentPage === 1) {
        console.log("page1")
      }

    })

   
      
      
    // } else if (this.state.currentPage === 1 ) {
    //   const items2 = await _sp.web.lists.getById(this.props.list[1]).items();
    //   console.log(items2)
    // }


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
          <PosterInfo handleOnChange={this.handleOnChangeTextField} items={this.state.department} handleDropDownItem={this.handleDropDownItem} />
        ),
      },
      {
        step:2,
        title: 'Details',
        content: (
          <Details/>
        ),
      },
      {
        step: 3,
        title: 'Requirements',
        content: (
          <Requirements/>
        ),
      },
      {
        step: 4,
        title: 'Review',
        content: (
          <Review/>
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
            <div>
             
                <Complete/>
           
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
