import * as React from 'react';
import ReusableTextField from './ReusableTextField';

export interface IPosterInfoProps {

}


export default class PosterInfo extends React.Component<IPosterInfoProps> {

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>):void => {
    console.log(event.target.name);
  }


  public render(): React.ReactElement<IPosterInfoProps>{
    return (
      <div>
       <ReusableTextField id={"1"} name={"name"} title={"Full name"} onChange={this.onChangeTextValue}/>
       <ReusableTextField id={"2"} name={"department"} title={"Department"} onChange={this.onChangeTextValue}/>
       <ReusableTextField id={"3"} name={"workEmail"} title={"Work Email"} onChange={this.onChangeTextValue}/>
       <ReusableTextField id={"4"} name={"phone"} title={"Phone number"} onChange={this.onChangeTextValue}/>
      </div>
    )
  }
}