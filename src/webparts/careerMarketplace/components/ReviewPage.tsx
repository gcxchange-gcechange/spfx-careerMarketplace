/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import { SelectLanguage } from "./SelectLanguage";

export interface IReviewPageProps {
    currentPage: number;
    prefLang:string;
    userInfo:string;
    workEmail: string;
    department: any;
    jobTitleEn: string;
    jobTitleFr: string;
    jobDescriptionEn: string;
    jobDescriptionFr: string;
    jobType: any;
    programArea: any;
    classificationCode: any;
    classificationLevel: any;
    numberOfOpportunities: any;
    durationLength: any;
    duration: any;
    deadline: Date | undefined;
    skills: any[];
    workSchedule: any;
    province: any;
    region: any;
    city: any;
    security: any;
    languageRequirements: any[];
    workArrangment: any;
    // approvedStaffing: any;
}

export default class ReviewPage extends React.Component<IReviewPageProps> {
    public strings = SelectLanguage(this.props.prefLang);
 
    public render(): React.ReactElement<IReviewPageProps> {
        console.log("PROPS",this.props)
        
        // const isApproved = this.props.approvedStaffing.value === true ? "Yes" : "No";
        const skillsItems: string = this.props.skills.map(skill => skill.text?.trim()).filter(text => text).join(", ");


        return(
            <>
                <ReusableTextField
                    id={"contactName"}
                    name={"contactName"}
                    title={this.strings.fullName}
                    defaultValue={this.props.userInfo}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                <ReusableTextField
                    id={"department"}
                    name={"department"}
                    title={this.strings.departmentField}
                    defaultValue={this.props.department.text}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                <ReusableTextField
                    id={"workEmail"}
                    name={"workEmail"}
                    title={this.strings.workEmail}
                    defaultValue={this.props.workEmail}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                <ReusableTextField
                    id={"jobTitleEn"}
                    name={"jobTitleEn"}
                    title={`${this.strings.job_Title} ${this.strings.english}`}
                    defaultValue={this.props.jobTitleEn}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                <ReusableTextField
                    id={"jobTitleFr"}
                    name={"jobTitleFr"}
                    title={`${this.strings.job_Title} ${this.strings.french}`}
                    defaultValue={this.props.jobTitleFr}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                <ReusableTextField
                    id={"jobDescriptionEn"}
                    name={"jobDescriptionEn"}
                    title={`${this.strings.job_Description} ${this.strings.english}`}
                    defaultValue={this.props.jobDescriptionEn}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                <ReusableTextField
                    id={"jobDescriptionFr"}
                    name={"jobDescriptionFr"}
                    title={`${this.strings.job_Description} ${this.strings.french}`}
                    defaultValue={this.props.jobDescriptionFr}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                 <ReusableTextField
                    id={"jobType"}
                    name={"jobType"}
                    title={this.strings.job_Type}
                    defaultValue={this.props.jobType.Label}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                 <ReusableTextField
                    id={"programArea"}
                    name={"programArea"}
                    title={this.strings.program_Area}
                    defaultValue={this.props.programArea.text}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                <ReusableTextField
                    id={"classificationCode"}
                    name={"classificationCode"}
                    title={this.strings.classification_Code}
                    defaultValue={this.props.classificationCode.text}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                <ReusableTextField
                    id={"classificationLevel"}
                    name={"classificationLevel"}
                    title={this.strings.classification_Level}
                    defaultValue={this.props.classificationLevel.text}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                <ReusableTextField
                    id={"numberOfOpportunities"}
                    name={"numberOfOpportunities"}
                    title={this.strings.number_of_Opportunities}
                    defaultValue={this.props.numberOfOpportunities.value}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                <ReusableTextField
                    id={"duration"}
                    name={"duration"}
                    title={this.strings.duration_time_period}
                    defaultValue={this.props.duration.text}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                <ReusableTextField
                    id={"durationLength"}
                    name={"durationLength"}
                    title={this.strings.duration_length}
                    defaultValue={this.props.durationLength.value}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                <ReusableTextField
                    id={"deadline"}
                    name={"deadline"}
                    title={this.strings.application_deadline}
                    defaultValue={this.props.deadline?.toDateString()}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                <ReusableTextField
                    id={"skills"}
                    name={"skills"}
                    title={this.strings.skillsField}
                    defaultValue={ skillsItems}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />

                <ReusableTextField
                    id={"workSchedule"}
                    name={"workSchedule"}
                    title={this.strings.time_in_hours}
                    defaultValue={this.props.workSchedule.text }
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                 <ReusableTextField
                    id={"province"}
                    name={"province"}
                    title={this.strings.provinceField}
                    defaultValue={this.props.province.text}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                 <ReusableTextField
                    id={"region"}
                    name={"region"}
                    title={this.strings.regionField}
                    defaultValue={this.props.region.text }
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                 <ReusableTextField
                    id={"city"}
                    name={"city"}
                    title={this.strings.cityField}
                    defaultValue={this.props.city.text }
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                 <ReusableTextField
                    id={"security "}
                    name={"security"}
                    title={this.strings.security_level}
                    defaultValue={this.props.security.text}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                 <ReusableTextField
                    id={"language"}
                    name={"language"}
                    title={this.strings.language_requirements}
                    defaultValue={this.props.languageRequirements[0].language.text }
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                 <ReusableTextField
                    id={"readingEN"}
                    name={"readingEN"}
                    title={this.strings.readingENField}
                    defaultValue={this.props.languageRequirements[0].readingEN.text }
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                 <ReusableTextField
                    id={"writtenEN"}
                    name={"writtenEN"}
                    title={this.strings.writtenENField}
                    defaultValue={this.props.languageRequirements[0].writtenEN.text}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                <ReusableTextField
                    id={"oralEN"}
                    name={"oralEN"}
                    title={this.strings.oralENField}
                    defaultValue={this.props.languageRequirements[0].oralEN.text }
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                <ReusableTextField
                    id={"readingFR"}
                    name={"readingFR"}
                    title={this.strings.readingFRField}
                    defaultValue={this.props.languageRequirements[0].readingFR.text}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                <ReusableTextField
                    id={"writtenFR"}
                    name={"writtenFR"}
                    title={this.strings.writtenFRField}
                    defaultValue={this.props.languageRequirements[0].writtenFR.text }
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                <ReusableTextField
                    id={"oralFR"}
                    name={"oralFR"}
                    title={this.strings.oralFRField}
                    defaultValue={this.props.languageRequirements[0].oralFR.text}
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                <ReusableTextField
                    id={"workArrangment"}
                    name={"workArrangement"}
                    title={this.strings.work_arrangment}
                    defaultValue={this.props.workArrangment.text }
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                />
                {/* <ReusableTextField
                    id={"approveStaffing"}
                    name={"approvedStaffing"}
                    title={this.strings.approved_staffing}
                    defaultValue={isApproved }
                    disabled={true}
                    ariaLabelRequired={'required'}
                    multiline={true}
                /> */}

                
            </>
        )
    }
}
