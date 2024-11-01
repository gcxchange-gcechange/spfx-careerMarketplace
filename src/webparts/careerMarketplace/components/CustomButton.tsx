import * as React from 'react';
import { DefaultButton, PrimaryButton, ThemeProvider } from '@fluentui/react';

export interface ICustomButtonProps {
  id: string;
  name: string;
  buttonType: 'primary' | 'secondary';
  onClick: (value: HTMLButtonElement) => void;
}

export default class CustomButton extends React.Component<ICustomButtonProps> {
  
  private handleOnClick = (ev: React.MouseEvent<HTMLButtonElement>): void => {
    console.log("clicked", ev.currentTarget);
    this.props.onClick(ev.currentTarget); 
  }
  
  public render(): React.ReactElement<ICustomButtonProps> {
    return (
      <ThemeProvider>
        <div>
          {
            this.props.buttonType === 'primary' ? 
            (
              <div id={this.props.id}>
                <PrimaryButton text={this.props.name} onClick={this.handleOnClick} />
              </div>
            ) :
            (
              <div id={this.props.id}>
                <DefaultButton text={this.props.name} style={{ color: '#03787c' }} onClick={this.handleOnClick} />
              </div>
            )
          }
        </div> 
      </ThemeProvider>
    );
  }
}
