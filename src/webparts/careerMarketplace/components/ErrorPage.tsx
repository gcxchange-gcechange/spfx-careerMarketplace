/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { SelectLanguage } from "./SelectLanguage";
import { Link, Stack } from "@fluentui/react";
import CustomButton from "./CustomButton";


export interface IErrorPageProps {
  prefLang: string;
  values: any;
  copyBtn: (value: any) => void;
}


export default class ErrorPage extends React.Component<IErrorPageProps> {
    
    public strings = SelectLanguage(this.props.prefLang);


    public copyTxtBtn = async (): Promise<void> => {
        try {
          const valueToCopy = typeof this.props.values === 'string'
            ? this.props.values
            : JSON.stringify(this.props.values);
      
          await navigator.clipboard.writeText(valueToCopy);


          this.props.copyBtn(valueToCopy);
        } catch (err) {
          console.error('Failed to copy: ', err);
        }
    }

    public contactBtn = ():void => {
        window.location.href = `mailto:support-soutien@gcx-gce.gc.ca?subject=${this.strings.email_subject}&body=${this.strings.email_body}` ;
    };
      


    public render(): React.ReactElement<IErrorPageProps> {

        

        return (
            <>
                <h2>{this.strings.server_error_title}</h2>


                <p>{this.strings.error_p1}</p>
                <p>{this.strings.error_p2}</p>
                <ol>
                    <li>{this.strings.error_list_1}</li>
                    <li>{this.strings.error_list_2}</li>
                    <li>
                        {this.strings.error_list_3} <Link href="support-soutien@gcx-gce.gc.ca">support-soutien@gcx-gce.gc.ca</Link> {this.strings.error_list_3b}
                    </li>
                </ol> 
                <p>{this.strings.error_p3}</p>

                <div style={{background: "rgb(211, 211, 211)", padding: "10px"}}>
                    <pre>
                        <code>{JSON.stringify(this.props.values, null, 2)}</code>
                    </pre>
                </div>

                <Stack horizontal horizontalAlign={'space-between'} style={{padding: '20px'}}>
                    <CustomButton id={'1'} name={'Copy'} buttonType={'primary'} onClick={this.copyTxtBtn}/>
                    <CustomButton id={'2'} name={this.strings.contact_btn} buttonType={'secondary'} onClick={this.contactBtn}/>
                </Stack>

            </>
        )
    }
}