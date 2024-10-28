import * as React from 'react';
import ReusableTextField from './ReusableTextField';

export interface IDetailsProps {

}


export default class Details extends React.Component<IDetailsProps> {


  public render(): React.ReactElement<IDetailsProps>{
    return (
      <div>
       
       <ReusableTextField id={"5"} name={"jobTitleEn"} title={"Job Title (EN)"}/>
       <ReusableTextField id={"6"} name={"jobTitleFr"} title={"Job Title (FR)"}/>
       <ReusableTextField id={"7"} name={"jobType"} title={"Job Type"}/>
       <ReusableTextField id={"8"} name={"program"} title={"Program area"}/>
       <ReusableTextField id={"9"} name={"classification"} title={"Classification"}/>
      </div>
    )
  }
}