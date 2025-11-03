/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { SelectLanguage } from "./SelectLanguage";
import { Link, Stack } from "@fluentui/react";
import CustomButton from "./CustomButton";


export interface IErrorPagePostRemovalProps {
  prefLang: string;
  values: any;
  copyBtn: (value: any) => void; 
  startOpp:(pageNumber: number) => void;
  currentPage: number;
}


export default class ErrorPagePostRemoval extends React.Component<IErrorPagePostRemovalProps> {
    
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

    public handleClickStartOpp = ():void => {
        const newPage = 0
        this. props.startOpp(newPage)
    }
      


    public render(): React.ReactElement<IErrorPagePostRemovalProps> {

        

        return (
            <>
                <h2>{this.strings.postNotCreated_title}</h2>
                <p>{this.strings.p1}<br/>{this.strings.p2}</p>
                <h3>{this.strings.fix_this}</h3>
                <ol>
                    <li>{this.strings.list_item1}</li>
                    <li>{this.strings.list_item2}</li>
                    <li>{this.strings.list_item3}</li>
                </ol> 
                <p>{this.strings.contact}<Link href="mailto:support-soutien@gcx-gce.gc.ca">support-soutien@gcx-gce.gc.ca </Link>{this.strings.contact_b}</p>

                <div style={{background: "rgb(211, 211, 211)", padding: "10px"}}>
                    <pre>
                        <code>{JSON.stringify(this.props.values, null, 2)}</code>
                    </pre>
                </div>

                <Stack horizontal horizontalAlign={'space-between'} style={{padding: '20px'}}>
                    <CustomButton id={'1'} name={this.strings.postDetails_btn} buttonType={'secondary'} onClick={this.copyTxtBtn}/>
                    <CustomButton id={'2'} name={this.strings.createOpp_btn} buttonType={'primary'} onClick={this.handleClickStartOpp}/>
                </Stack>

            </>
        )
    }
}