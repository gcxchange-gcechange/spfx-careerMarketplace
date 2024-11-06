import * as React from 'react';
//import styles from './CareerMarketplace.module.scss';
import type { ICareerMarketplaceProps } from './ICareerMarketplaceProps';
import { Steps } from"antd";
import CustomButton from './CustomButton';
import PosterInfo from './PosterInfo';
import { Stack } from '@fluentui/react';
import Details from './Details';
import Requirements from './Requirements';



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

    if (this.state.currentPage < 2) {
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

    const {currentPage} = this.state;

    const steps = [
      {
        title: 'First',
        content: (
          <PosterInfo/>
        ),
      },
      {
        title: 'Second',
        content: (
          <Details/>
        ),
      },
      {
        title: 'Last',
        content: (
          <Requirements/>
        ),
      },
    ];
   
    const items = steps.map((item) => ({ key: item.title, title: item.title }));

    return (
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
    );
  }
}
