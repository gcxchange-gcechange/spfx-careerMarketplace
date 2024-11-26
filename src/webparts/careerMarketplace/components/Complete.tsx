import * as React from 'react';


export interface ICompleteProps {

}


export default class Complete extends React.Component<ICompleteProps> {



  public render(): React.ReactElement<ICompleteProps>{


    return (
      <>      
          <div>
            <img src="" alt={'people high five'}/>
          </div>
          <div>
            <p>Congratualtions! You have created a new opportunity</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
         
      </>
    )
  }

}
