/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import { SelectLanguage } from "./SelectLanguage";
import CustomButton from "./CustomButton";
import styles from "./CareerMarketplace.module.scss";
import { ITextFieldStyles, Label, Stack, StackItem, TextField } from "@fluentui/react";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";

export interface IReviewPageProps {
    currentPage: number;
    prefLang:string;
    userInfo:string;
    applyEmail: string;
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
                paddingLeft: '10px',
                selectors: {
                    ':disabled': {
                        color: 'black'
                    }
                }
              },
               fieldGroup: {
                    background: '#d6d6d5!important',
                    
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

    //        const editor = document.querySelectorAll(".ql-editor");


    // editor.forEach((node, index) => {

    //   node.setAttribute("data-field", String(index + 1));

    //   if (index === 0) {
    //     node.setAttribute('aria-labelledby', `${this.strings.job_Description} ${this.strings.english}`);
      
    //   } else {
    //     node.setAttribute('aria-labelledby', `${this.strings.job_Description} ${this.strings.french}`);

    //   }

    // })

    // toolbar.forEach((node) => {
    //   node.setAttribute("role", "toolbar")
    // })



        return(
            <>
                <p>{this.strings.reviewSubmit_para1}</p>

                <div className={styles.reviewPageHeader}  >
                    <h2 id={`${this.strings.posterInformation_title}`} tabIndex={0}>{this.strings.posterInformation_title}</h2>
                    <CustomButton
                        id="1"
                        name="Edit"
                        buttonType="secondary"
                        onClick={() => this.goToPage(3)}
                    />
                </div>
                <div className={styles.reviewPageBody}>
                    <Stack wrap horizontal className={styles.reviewRowSeparator}>
                        <Label htmlFor={this.strings.fullName} className={styles.reviewPageLabelWidth}>{this.strings.fullName}</Label>
                        <StackItem grow>
                            <TextField id={this.strings.fullName} borderless readOnly defaultValue={this.props.userInfo} styles={disabledField} />
                        </StackItem>
                    </Stack>
                    <Stack wrap horizontal className={styles.reviewRowSeparator}>
                        <Label htmlFor={this.strings.departmentField} className={styles.reviewPageLabelWidth}>{this.strings.departmentField}</Label>
                        <TextField id={this.strings.departmentField} borderless readOnly defaultValue={this.props.department.text} styles={disabledField}/>
                    </Stack>
                    <Stack wrap horizontal >
                        <StackItem>
                            <Label htmlFor={this.strings.apply_Email} className={styles.reviewPageLabelWidth}>{this.strings.apply_Email}</Label>
                        </StackItem>
                        <StackItem grow>
                            <TextField id={this.strings.apply_Email}  borderless readOnly defaultValue={this.props.applyEmail} styles={disabledField}/>
                        </StackItem>
                    </Stack>
                
                </div>

                <div className={styles.reviewPageHeader}>
                    <h2 tabIndex={0} > {this.strings.oppotunityDetails_Title}</h2>
                    <CustomButton
                        id="2"
                        name="Edit"
                        buttonType="secondary"
                        onClick={() => this.goToPage(2)}
                    />
                </div>
                <div className={styles.reviewPageBody}>

                    <Stack wrap horizontal className={styles.reviewRowSeparator}>
                        <StackItem>
                            <Label htmlFor={`${this.strings.job_Title} ${this.strings.english}`} className={styles.reviewPageLabelWidth}>{`${this.strings.job_Title} ${this.strings.english}`}</Label>
                        </StackItem>
                        <StackItem grow>
                            <TextField id={`${this.strings.job_Title} ${this.strings.english}`} borderless readOnly defaultValue={this.props.jobTitleEn} styles={disabledField}/>
                        </StackItem>
                    </Stack>
                    <Stack wrap horizontal className={styles.reviewRowSeparator}>
                        <StackItem>
                            <Label htmlFor={`${this.strings.job_Title} ${this.strings.french}`} className={styles.reviewPageLabelWidth}>{`${this.strings.job_Title} ${this.strings.french}`}</Label>
                        </StackItem>
                        <StackItem grow>
                            <TextField id={`${this.strings.job_Title} ${this.strings.french}`} borderless readOnly defaultValue={this.props.jobTitleFr} styles={disabledField}/>
                        </StackItem>
                    </Stack>

                    <Stack wrap className={styles.reviewRowSeparator}>
                        <Label htmlFor={`${this.strings.job_Description} ${this.strings.english}`} > {`${this.strings.job_Description} ${this.strings.english}`}</Label>
                        <RichText
                            id={`${this.strings.job_Description} ${this.strings.english}`}
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
                    <Stack wrap className={styles.reviewRowSeparator}>
                        <Label htmlFor={`${this.strings.job_Description} ${this.strings.french}`} >{`${this.strings.job_Description} ${this.strings.french}`}</Label>
                        <RichText
                            id={`${this.strings.job_Description} ${this.strings.french}`}
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

                    <Stack wrap horizontal className={styles.reviewRowSeparator}>
                        <StackItem>
                            <Label htmlFor={this.strings.job_Type} className={styles.reviewPageLabelWidth}>{this.strings.job_Type}</Label>
                        </StackItem>
                        <StackItem grow>
                            <TextField id={this.strings.job_Type} borderless readOnly defaultValue={this.props.jobType.Label} styles={disabledField}/>
                        </StackItem>
                    </Stack>
                    <Stack wrap horizontal className={styles.reviewRowSeparator}>
                        <StackItem>
                            <Label htmlFor={this.strings.program_Area}className={styles.reviewPageLabelWidth}>{this.strings.program_Area}</Label>
                        </StackItem>
                        <StackItem grow>
                            <TextField id={this.strings.program_Area} borderless readOnly  defaultValue={this.props.programArea.text} styles={disabledField}/>
                        </StackItem>
                    </Stack>
                    <Stack wrap horizontal className={styles.reviewRowSeparator}>
                        <StackItem>
                            <Label htmlFor={this.strings.classification_Code} className={styles.reviewPageLabelWidth}>{this.strings.classification_Code}</Label>
                        </StackItem>
                        <StackItem grow>
                            <TextField id={this.strings.classification_Code} borderless readOnly defaultValue={this.props.classificationCode.text} styles={disabledField}/>
                        </StackItem>
                    </Stack>
                    <Stack wrap  horizontal className={styles.reviewRowSeparator}>
                        <StackItem>
                            <Label htmlFor={this.strings.classification_Level} className={styles.reviewPageLabelWidth}>{this.strings.classification_Level}</Label>
                        </StackItem>
                        <StackItem grow>
                            <TextField id={this.strings.classification_Level} borderless readOnly defaultValue={this.props.classificationLevel.text} styles={disabledField}/>
                        </StackItem>
                    </Stack>
                    <Stack wrap horizontal className={styles.reviewRowSeparator} verticalAlign="center">
                        <Stack.Item>
                            <Label htmlFor={this.strings.number_of_Opportunities} className={styles.reviewPageLabelWidth}>
                            {this.strings.number_of_Opportunities}
                            </Label>
                        </Stack.Item>

                        <Stack.Item grow>
                            <TextField
                            id={this.strings.number_of_Opportunities}
                            borderless
                            readOnly
                            defaultValue={this.props.numberOfOpportunities.value}
                            styles={disabledField}
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack wrap horizontal className={styles.reviewRowSeparator} verticalAlign="center">
                        <Stack.Item>
                            <Label htmlFor={this.strings.duration_time_period} className={styles.reviewPageLabelWidth}>
                            {this.strings.duration_time_period}
                            </Label>
                        </Stack.Item>

                        <Stack.Item grow>
                            <TextField
                            id={this.strings.duration_time_period}
                            borderless
                            readOnly
                            defaultValue={
                                this.props.durationLength.value + " " + this.props.duration.text
                            }
                            styles={disabledField}
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack wrap horizontal verticalAlign="center">
                        <Stack.Item>
                            <Label htmlFor={this.strings.application_deadline} className={styles.reviewPageLabelWidth}>
                            {this.strings.application_deadline}
                            </Label>
                        </Stack.Item>

                        <Stack.Item grow>
                            <TextField
                            id={this.strings.application_deadline}
                            borderless
                            readOnly
                            defaultValue={this.props.deadline?.toDateString()}
                            styles={disabledField}
                            />
                        </Stack.Item>
                    </Stack>

                </div>

            
                <div className={styles.reviewPageHeader}>
                        <h2 tabIndex={0}>{this.strings.opportunityRequirements_title}</h2>
                        <CustomButton
                            id="3"
                            name="Edit"
                            buttonType="secondary"
                            onClick={() => this.goToPage(1)}
                        />
                </div>
                    
                <div className={styles.reviewPageBody}>
                    <Stack wrap horizontal className={styles.reviewRowSeparator} verticalAlign="center">
                        <Stack.Item>
                            <Label htmlFor={this.strings.skillsField} className={styles.reviewPageLabelWidth}>
                            {this.strings.skillsField}
                            </Label>
                        </Stack.Item>

                        <Stack.Item grow>
                            <TextField
                            id={this.strings.skillsField}
                            multiline
                            borderless
                            readOnly
                            defaultValue={skillsItems}
                            styles={disabledField}
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack wrap horizontal className={styles.reviewRowSeparator} verticalAlign="center">
                        <Stack.Item>
                            <Label htmlFor={this.strings.time_in_hours} className={styles.reviewPageLabelWidth}>
                            {this.strings.time_in_hours}
                            </Label>
                        </Stack.Item>

                        <Stack.Item grow>
                            <TextField
                            id={this.strings.time_in_hours}
                            borderless
                            readOnly
                            defaultValue={this.props.workSchedule.text}
                            styles={disabledField}
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack wrap horizontal className={styles.reviewRowSeparator} verticalAlign="center">
                        <Stack.Item>
                            <Label htmlFor={this.strings.work_arrangment} className={styles.reviewPageLabelWidth}>
                            {this.strings.work_arrangment}
                            </Label>
                        </Stack.Item>

                        <Stack.Item grow>
                            <TextField
                            id={this.strings.work_arrangment}
                            borderless
                            readOnly
                            defaultValue={this.props.workArrangment.text}
                            styles={disabledField}
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack wrap horizontal className={styles.reviewRowSeparator} verticalAlign="center">
                        <Stack.Item>
                            <Label htmlFor={this.strings.location} className={styles.reviewPageLabelWidth}>
                            {this.strings.location}
                            </Label>
                        </Stack.Item>

                        <Stack.Item grow>
                            <TextField
                            id={this.strings.location}
                            borderless
                            readOnly
                            defaultValue={location}
                            styles={disabledField}
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack wrap horizontal className={styles.reviewRowSeparator} verticalAlign="center">
                        <Stack.Item>
                            <Label htmlFor={this.strings.security_level} className={styles.reviewPageLabelWidth}>
                            {this.strings.security_level}
                            </Label>
                        </Stack.Item>

                        <Stack.Item grow>
                            <TextField
                            id={this.strings.security_level}
                            borderless
                            readOnly
                            defaultValue={this.props.security.text}
                            styles={disabledField}
                            />
                        </Stack.Item>
                    </Stack>

                    <Stack wrap horizontal verticalAlign="center">
                        <Stack.Item>
                            <Label htmlFor={this.strings.language_requirements} className={styles.reviewPageLabelWidth}>
                            {this.strings.language_requirements}
                            </Label>
                        </Stack.Item>

                        <Stack.Item grow>
                            <TextField
                            id={this.strings.language_requirements}
                            borderless
                            readOnly
                            styles={disabledField}
                            defaultValue={
                                this.props.languageRequirements[0].language.key !== 3 
                                ? this.props.languageRequirements[0].language.text :

                                this.props.languageRequirements[0].language.text +
                                " " +
                                this.props.languageRequirements[0].writtenEN.text +
                                this.props.languageRequirements[0].readingEN.text +
                                this.props.languageRequirements[0].oralEN.text +
                                "-" +
                                this.props.languageRequirements[0].writtenFR.text +
                                this.props.languageRequirements[0].readingFR.text +
                                this.props.languageRequirements[0].oralFR.text
                            }
                            />
                        </Stack.Item>
                    </Stack>
                </div>
            </>
        )
    }
}
