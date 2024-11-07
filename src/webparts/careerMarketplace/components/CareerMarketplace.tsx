import * as React from 'react';
//import styles from './CareerMarketplace.module.scss';
import type { ICareerMarketplaceProps } from './ICareerMarketplaceProps';
import { Steps } from"antd";
import CustomButton from './CustomButton';
import PosterInfo from './PosterInfo';
import { Stack, ThemeProvider, createTheme } from '@fluentui/react';
import Details from './Details';
import Requirements from './Requirements';
import Review from './Review';



export interface ICareerMarketplaceState {
  currentPage: number;
  name: string;
  department: string;
  workEmail: string;
  jobTitleEn: string;
  jobTitleFr: string;
  jobType: string;
}



export default class CareerMarketplace extends React.Component<ICareerMarketplaceProps, ICareerMarketplaceState> {

  public constructor(props: ICareerMarketplaceProps, state: ICareerMarketplaceState) {
    super(props);
    this.state = {
      currentPage: 0,
      name: "",
      department: "",
      workEmail: "",
      jobTitleEn: "",
      jobTitleFr: "",
      jobType: ""
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
          <PosterInfo/>
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
                <CustomButton id={'next'} name={'Next'} buttonType={'primary'}  onClick={() => this.next()}/>
              </Stack>
            </div>
          </section>
        </ThemeProvider>
      </>

    );
  }
}
