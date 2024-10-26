import * as React from 'react';
//import styles from './CareerMarketplace.module.scss';
import type { ICareerMarketplaceProps } from './ICareerMarketplaceProps';
import { Steps } from"antd";
import CustomButton from './CustomButton';
import ReusableTextField from './ReusableTextField';

export interface ICareerMarketplaceState {
  currentPage: number;
}


export default class CareerMarketplace extends React.Component<ICareerMarketplaceProps, ICareerMarketplaceState> {

  public constructor(props: ICareerMarketplaceProps, state: ICareerMarketplaceState) {
    super(props);
    this.state = {
      currentPage: 0,
    };
  }

  // private next = (): void => {
  //   const nextPage = this.state.currentPage + 1;
  //   this.setState({
  //     currentPage: nextPage
  //   })

  // }

  // private prev = (): void => {
  //   const prevPage = this.state.currentPage -1 ;
  //   this.setState({
  //     currentPage: prevPage
  //   })

  // }

  public render(): React.ReactElement<ICareerMarketplaceProps> {

    const {currentPage} = this.state;

    const steps = [
      {
        title: 'First',
        content: (
          <ReusableTextField id={'1'} name={'first'} title={'first title'}/>
        ),
      },
      {
        title: 'Second',
        content: 'Second-content',
      },
      {
        title: 'Last',
        content: 'Last-content',
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
        <div>
          <CustomButton name={'next'}/>
        </div>
      </section>
    );
  }
}
