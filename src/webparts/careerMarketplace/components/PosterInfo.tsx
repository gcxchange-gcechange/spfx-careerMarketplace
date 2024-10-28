import * as React from 'react';
import ReusableTextField from './ReusableTextField';

export interface IPosterInfoProps {

}


export default class PosterInfo extends React.Component<IPosterInfoProps> {


  public render(): React.ReactElement<IPosterInfoProps>{
    return (
      <div>
       <ReusableTextField id={"1"} name={"name"} title={"Full name"}/>
       <ReusableTextField id={"2"} name={"department"} title={"Department"}/>
       <ReusableTextField id={"3"} name={"workEmail"} title={"Work Email"}/>
       <ReusableTextField id={"4"} name={"phone"} title={"Phone number"}/>
      </div>
    )
  }
}