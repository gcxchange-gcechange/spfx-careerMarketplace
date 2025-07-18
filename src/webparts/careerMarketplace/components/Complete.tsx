import { IImageProps, ImageFit } from '@fluentui/react';
import * as React from 'react';
import { SelectLanguage } from "./SelectLanguage";



export interface ICompleteProps {
  prefLang: string;
  jobOppId: string;
}


export default class Complete extends React.Component<ICompleteProps> {

  public strings = SelectLanguage(this.props.prefLang);

  public render(): React.ReactElement<ICompleteProps>{

    const imageProps: Partial<IImageProps>= {
      src: (require("../assets/complete.png")),
      width: 400,
      imageFit: ImageFit.contain
    }


    return (
      <>   
        <div>
          <h2>{this.strings.complete_title}</h2>
        </div>
        <div style={{display:'flex', justifyContent: 'center'}}>
          <img {...imageProps} alt=""/>
        </div>
        <div>
          <p><strong>{this.props.jobOppId ? this.strings.update_para1 :this.strings.complete_para1}</strong></p>
          <p>{this.strings.complete_para2 }<strong>{this.strings.complete_para2_bold}</strong>{this.strings.complete_para2_b}</p>
          <p>{this.strings.complete_para3}</p>
          <p>{this.strings.complete_para4}</p>
        </div>
      </>
    )
  }

}
