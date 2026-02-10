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
      src: (require("../assets/checkmark.png")),
      width: 200,
      imageFit: ImageFit.contain
    }


    // text-align:center

    return (
      <>   
        <div>
          <h2>{this.strings.complete_title}</h2>
        </div>

        <div style={{display:'flex', justifyContent: 'center'}}>
          <img {...imageProps} alt=""/>
        </div>

        <div style={{textAlign: 'center'}}>
          <p><strong>{this.props.jobOppId ? this.strings.update_para1 :this.strings.complete_para1}</strong></p>
        </div>

        <div>
          <h3>{this.strings.next_steps}</h3>

          <p><b>{this.strings.application_process_1}</b>{this.strings.application_process_2}</p>

          <p>{this.strings.manage_opportunity_1}<b>{this.strings.manage_opportunity_2}</b>{this.strings.manage_opportunity_3}</p>

          {!this.props.jobOppId && (<p>{this.strings.complete_para3}</p>) }

          <p>{this.strings.complete_para2 }<strong>{this.strings.complete_para2_bold}</strong>{this.strings.complete_para2_b}</p>
        </div><br />
      </>
    )
  }

}
