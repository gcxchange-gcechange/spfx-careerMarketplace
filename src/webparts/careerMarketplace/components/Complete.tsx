import { IImageProps, ImageFit } from '@fluentui/react';
import * as React from 'react';



export interface ICompleteProps {

}


export default class Complete extends React.Component<ICompleteProps> {



  public render(): React.ReactElement<ICompleteProps>{

    const imageProps: Partial<IImageProps>= {
      src: (require("../assets/complete.png")),
      width: 400,
      imageFit: ImageFit.contain
    }


    return (
      <>      
          <div>
            <img {...imageProps} alt={'people high five'}/>
          </div>
          <div>
            <p>Congratualtions! You have created a new opportunity</p>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
          </div>
         
      </>
    )
  }

}
