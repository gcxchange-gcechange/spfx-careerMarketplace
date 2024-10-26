import * as React from 'react';
import { PrimaryButton } from '@fluentui/react';

export interface ICustomButtonProps {
  name: string;
}


export default class CustomButton extends React.Component<ICustomButtonProps> {


  public render() {
    return (
      <div>
        <PrimaryButton text={this.props.name}/>
      </div>

    )
  }
}