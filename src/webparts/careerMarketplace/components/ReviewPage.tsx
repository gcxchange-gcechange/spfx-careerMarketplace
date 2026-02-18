/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { SelectLanguage } from "./SelectLanguage";
import CustomButton from "./CustomButton";
import styles from "./CareerMarketplace.module.scss";
import PageTitle from "./PageTitle";
import { ITextFieldStyles, Label, Stack, TextField } from "@fluentui/react";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

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
    handlePageNumber: (page: number) => void;
}

export default class ReviewPage extends React.Component<IReviewPageProps> {
    public strings = SelectLanguage(this.props.prefLang);


    public goToPage = (subtractAmount: number):void => {
        const newPage = this.props.currentPage - subtractAmount
        this.props.handlePageNumber(newPage)
    }
 
    public render(): React.ReactElement<IReviewPageProps> {
        console.log("PROPS",this.props)

        
            const disabledField: Partial<ITextFieldStyles>={
              root: {
                background:' #d6d6d5!important',
               
              },
              field: {
                background: '#d6d6d5!important',
                // color: 'black',
                paddingLeft: '10px',
                selectors: {
                    ':disabled': {
                        color: 'black'
                    }
                }
              },
               fieldGroup: {
                    background: '#d6d6d5!important',
                    minWidth: '500px!important',
                    selectors: {
                        ':after': {
                            borderBottom: '2px solid #323130'
                    },
                    ':before': {
                        borderBottom: '2px solid #323130'
                    }
                }
            },

              subComponentStyles: {
                label: {
                    root: {
                        color: 'black'
                    } 
                }
              }
            }
        
        // const isApproved = this.props.approvedStaffing.value === true ? "Yes" : "No";
        const skillsItems: string = this.props.skills.map(skill => skill.text?.trim()).filter(text => text).join(", ");

        const location: string = this.props.province.text + ", " + this.props.region.text + ", " + this.props.city.text

        console.log("location", location)


        return(
            <>
                <p>{this.strings.reviewSubmit_para1}</p>

                <div className={styles.reviewPageHeader}>
                    <PageTitle currentPage={1} prefLang={this.props.prefLang}/>
                    <CustomButton
                        id="1"
                        name="Edit"
                        buttonType="secondary"
                        onClick={() => this.goToPage(3)}
                    />
                </div>
                <div className={styles.reviewPageBody}>
                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.fullName}</Label><TextField borderless disabled defaultValue={this.props.userInfo} styles={disabledField} />
                    </Stack>
                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.departmentField}</Label><TextField borderless disabled defaultValue={this.props.department.text} styles={disabledField}/>
                    </Stack>
                    <Stack horizontal >
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.workEmail}</Label><TextField borderless disabled defaultValue={this.props.workEmail} styles={disabledField}/>
                    </Stack>
                
                </div>

                <div className={styles.reviewPageHeader}>
                    <PageTitle currentPage={2} prefLang={this.props.prefLang}/>
                        <CustomButton
                        id="2"
                        name="Edit"
                        buttonType="secondary"
                        onClick={() => this.goToPage(2)}
                    />
                </div>
                <div className={styles.reviewPageBody}>

                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{`${this.strings.job_Title} ${this.strings.english}`}</Label>
                        <TextField borderless disabled defaultValue={this.props.jobTitleEn} styles={disabledField}/>
                    </Stack>
                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{`${this.strings.job_Title} ${this.strings.french}`}</Label>
                        <TextField borderless disabled defaultValue={this.props.jobTitleFr} styles={disabledField}/>
                    </Stack>

                    <Stack className={styles.reviewRowSeparator}>
                        <Label>{`${this.strings.job_Description} ${this.strings.english}`}</Label>
                        <RichText
                            id={"jobDescriptionFr"}
                            value={this.props.jobDescriptionEn}
                            isEditMode={false}
                            styleOptions={{
                                showBold: false,
                                showItalic: false,
                                showUnderline: false,
                                showList: false,
                                showAlign: false,
                                showLink: false,
                                showMore: false
                            }}

                        />
                    </Stack>
                    <Stack className={styles.reviewRowSeparator}>
                        <Label>{`${this.strings.job_Description} ${this.strings.french}`}</Label>
                        <RichText
                            id={"jobDescriptionFr"}
                            value={this.props.jobDescriptionFr}
                            isEditMode={false}
                            styleOptions={{
                                showBold: false,
                                showItalic: false,
                                showUnderline: false,
                                showList: false,
                                showAlign: false,
                                showLink: false,
                                showMore: false
                            }}

                        />
                    </Stack>

                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.job_Type}</Label>
                        <TextField borderless disabled defaultValue={this.props.jobType.Label} styles={disabledField}/>
                    </Stack>
                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.program_Area}</Label>
                        <TextField borderless disabled  defaultValue={this.props.programArea.text} styles={disabledField}/>
                    </Stack>
                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.classification_Code}</Label>
                        <TextField borderless disabled defaultValue={this.props.classificationCode.text} styles={disabledField}/>
                    </Stack>
                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.classification_Level}</Label>
                        <TextField borderless disabled defaultValue={this.props.classificationLevel.text} styles={disabledField}/>
                    </Stack>
                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.number_of_Opportunities}</Label>
                        <TextField borderless disabled defaultValue={this.props.numberOfOpportunities.value} styles={disabledField}/>
                    </Stack>
                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.duration_time_period}</Label>
                        <TextField borderless disabled  defaultValue={this.props.durationLength.value +" " + this.props.duration.text} styles={disabledField}/>
                    </Stack>

                    <Stack horizontal  >
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.application_deadline}</Label>
                        <TextField borderless disabled defaultValue={this.props.deadline?.toDateString()} styles={disabledField}/>
                    </Stack>
                </div>

            
                <div className={styles.reviewPageHeader}>
                        <PageTitle currentPage={3} prefLang={this.props.prefLang}/>
                        <CustomButton
                            id="3"
                            name="Edit"
                            buttonType="secondary"
                            onClick={() => this.goToPage(1)}
                        />
                </div>
                    
                <div className={styles.reviewPageBody}>

                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.skillsField}</Label>
                        <TextField multiline={true} borderless disabled defaultValue={ skillsItems} styles={disabledField}/>
                    </Stack>
                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.time_in_hours}</Label>
                        <TextField borderless disabled  defaultValue={this.props.workSchedule.text } styles={disabledField}/>
                    </Stack>
                        <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.work_arrangment}</Label>
                        <TextField borderless disabled  defaultValue={this.props.workArrangment.text } styles={disabledField}/>
                    </Stack>
                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.location}</Label>
                        <TextField borderless disabled defaultValue={location} styles={disabledField}/>
                    </Stack>
                    
                    <Stack horizontal className={styles.reviewRowSeparator}>
                        <Label className={styles.reviewPageLabelWidth}>{this.strings.security_level}</Label>
                        <TextField borderless disabled defaultValue={this.props.security.text} styles={disabledField}/>
                    </Stack>
                    
                    <Stack horizontal>
                    <Label className={styles.reviewPageLabelWidth}>{this.strings.language_requirements}</Label>
                    <TextField borderless disabled  styles={disabledField}
                        defaultValue={ 
                        this.props.languageRequirements[0].language.text 
                        + " " + 
                        this.props.languageRequirements[0].writtenEN.text +  this.props.languageRequirements[0].readingEN.text + this.props.languageRequirements[0].oralEN.text  
                        + "-" + 
                        this.props.languageRequirements[0].writtenFR.text +  this.props.languageRequirements[0].readingFR.text + this.props.languageRequirements[0].oralFR.text
                    }/>
                    </Stack>
                
                </div>
            </>
        )
    }
}
