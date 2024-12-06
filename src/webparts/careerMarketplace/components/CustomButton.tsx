/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import { DefaultButton, PrimaryButton, ThemeProvider} from '@fluentui/react';

export interface ICustomButtonProps {
  id: string;
  name: string;
  buttonType: 'primary' | 'secondary';
  onClick: (value: any) => void ;
  disabled?: boolean;
}


export default class CustomButton extends React.Component<ICustomButtonProps> {

  


  private handleOnClick = (ev?: any): void => {
    console.log("clicked",ev.target)
    const buttonName: any= ev.target
    this.props.onClick(buttonName)
  }
   


  public render(): React.ReactElement<ICustomButtonProps> {


    return (
      <>
      <ThemeProvider>
        <div>
          {
            this.props.buttonType === 'primary' ? 
            (
              <div id={this.props.id}>
                <PrimaryButton text={this.props.name} onClick={this.handleOnClick} disabled={this.props.disabled}/>
              </div>
            ):
            (
              <div id={this.props.id} >
                <DefaultButton text={this.props.name} style={{color: '#03787c'}} onClick={this.handleOnClick} disabled={this.props.disabled}/>
              </div>
            )
          }

        </div> 
        </ThemeProvider>
      </>
      

    )
  }
}