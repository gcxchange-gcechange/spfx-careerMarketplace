/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { SelectLanguage } from "./SelectLanguage";
import { Link } from "@fluentui/react";


export interface IErrorPageProps {
  prefLang: string;
  values: any;
}


export default class ErrorPage extends React.Component<IErrorPageProps> {
    
    public strings = SelectLanguage(this.props.prefLang);


    public render(): React.ReactElement<IErrorPageProps> {


   console.log("values", this.props.values)
        

        return (
            <>
                <h2>{this.strings.server_error_title}</h2>


                <p>{this.strings.error_p1}</p>
                <p>{this.strings.error_p2}</p>
                <ol>
                    <li>{this.strings.error_list_1}</li>
                    <li>{this.strings.error_list_2}</li>
                    <li>
                        {this.strings.error_list_3} <Link href="support-soutien@gcx-gce.gc.ca">support-soutien@gcx-gce.gc.ca</Link>{this.strings.error_list_3b}
                    </li>
                </ol> 
                <p>{this.strings.error_p3}</p>

                {/* <div>
                    {jobPosterInfo.map((item:any) => (
                        <p key={item.label}>{item.label}: {item.value}</p>
                    ))}
                </div> */}

                <p>{this.strings.department}: {this.props.values[0].department.text}</p>
                <p>{this.strings.jobTitleEn}: {this.props.values[0].jobTitleEn.text}</p>
                <p>{this.strings.jobTitleFr}: {this.props.values[0].jobTitleFr.text}</p>
                <p>{this.strings.jobDescriptionEn}: {this.props.values[0].jobDescriptionEn.text}</p>
                <p>{this.strings.jobDescriptionFr}: {this.props.values[0].jobDescriptionFr.text}</p>
                <p>{this.strings.jobType}: {this.props.values[0].job_Type.text}</p>
                <p>{this.strings.department}: {this.props.values[0].department.text}</p>



            </>
        )
    }
}