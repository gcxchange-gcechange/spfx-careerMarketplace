/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from "react";
import ReusableTextField from "./ReusableTextField";
import ReusableDropdownField from "./ReusableDropDownField";
import {
  ComboBox,
  DatePicker,
  Dropdown,
  FocusZone,
  FocusZoneTabbableElements,
  Label,
  IComboBox,
  IComboBoxOption,
  IComboBoxStyles,
  IDropdownOption,
  ILabelStyles,
  IStackTokens,
  Stack,
  StackItem,
} from "@fluentui/react";
import * as moment from "moment";
import { validateNumericField, validateEmpty } from "./Validations";
import styles from "./CareerMarketplace.module.scss";
import { SelectLanguage } from "./SelectLanguage";
import { isInvalid, getLocalizedString } from "./Functions";
import { RichText } from "@pnp/spfx-controls-react/lib/RichText";



export interface IClassificationLevelOption extends IComboBoxOption {
  classificationLevelIds: string;
}

export interface IDetailsProps {
  prefLang: string;
  programArea: any[];
  classificationCode: any[];
  classificationLevel: any[];
  jobType: any[];
  duration: any[];
  currentPage: number;
  handleDropDownItem: (event: any, item: any) => void;
  handleOnChange: (event: string, newValue?: string) => void;
  handleOnDateChange: (date: Date) => void;
  handleDurationLength: (value: string) => void;
  handleNumberofOpp: (value: string) => void;
  hasError: { key: string; value: any }[];
  onBlur?: (value: any) => void;
  fields: string[];
  values: {
    jobType: any;
    jobTitleEn: string;
    jobTitleFr: string;
    jobDescriptionEn: string;
    jobDescriptionFr: string;
    numberOfOpportunities: any;
    deadline: Date | undefined;
    programArea: any;
    classificationCode: any;
    classificationLevel: any;
    classificationLevelIds: string;
    duration: any;
    durationLength: any;
  };
  jobTypeProps: any;
  inlineFieldErrors?: any[];
  jobOppId: string;
}

export default class Details extends React.Component<IDetailsProps> {
  public strings = SelectLanguage(this.props.prefLang);

  public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>, value: any): void => {
    const eventName = event.target.name;
    const inputValue = value;

    this.props.handleOnChange(eventName, inputValue);
  };


private convertToParagraph = (value: string): string => {
  if (!value) return value;

  // remove the  style attributes
  let cleaned = value.replace(/ style="[^"]*"/gi, "");
 
  //remove unwanted tags
  cleaned = cleaned.replace(/<\/?(h1|h2|h3|h4|a|img)[^>]*>/gi, "");


  return cleaned;
};





  private isRichTextEmpty = (value: string): boolean => {
    if (!value) return true;

    const textOnly = value
      .replace(/<[^>]*>/g, "")
      .replace(/&nbsp;/g, "")
      .trim();

    return textOnly.length === 0;
  };


  public onChangeRichTextValue = (text: string): string => {
    console.log("Text")
    const isEmpty = this.isRichTextEmpty(text);
    const cleanedText = this.convertToParagraph(text);
    console.log(cleanedText)

    const normalizedValue = isEmpty ? "" : cleanedText;


    this.props.handleOnChange("jobDescriptionEn", normalizedValue);

    return normalizedValue;
  };

   public onChangeRichTextValueFr = (text: string): string => {
 
    const isEmpty = this.isRichTextEmpty(text);
    const cleanedText = this.convertToParagraph(text);
    console.log(cleanedText)

    const normalizedValue = isEmpty ? "" : cleanedText;

    this.props.handleOnChange("jobDescriptionFr", normalizedValue);

    return normalizedValue;
  };



  public onChangeDropDownItem = (event: any, item: IDropdownOption): void => {
    const eventId = event.target.id;

    if (item) {
      this.props.handleDropDownItem(eventId, item);
    }
  };

  public onSelectedDate = (date: Date | undefined): void => {
    if (date) {
      this.props.handleOnDateChange(date);
    }
  };

  public onChangeClassificationCode = (event: React.FormEvent<IComboBox>, item?: IClassificationLevelOption, index?: number, value?: string): void => {
    const selectedValue = item ? item.key : "classificationCode-input";
    const selectedText = item ? item.text : value;
    this.props.values.classificationLevelIds = item ? item.classificationLevelIds : "";

    if (item) {
      this.props.handleDropDownItem("classificationCode", { key: selectedValue, text: selectedText });
    }
  };

  public render(): React.ReactElement<IDetailsProps> {


    const permDeploy = this.props.values.jobType.Guid === this.props.jobTypeProps[0].id;


    const customSpacingStackTokens: IStackTokens = {
      childrenGap: "10%",
    };
    const dropdownStyles = {
      dropdown: { width: 150 },
      errorMessage: {
        margin: "0px",
        fontWeight: "700",
        
        paddingLeft: "5px",
        marginTop: "4px",
      },
    };
    const comboBoxStyles: Partial<IComboBoxStyles> = {
      errorMessage: { margin: "0px", fontWeight: "700", paddingLeft: '5px', marginTop:"4px", borderLeft: "2px solid rgb(164, 38, 44)", },
        callout: {vhmax: "50%"}
    };

    const labelSpacing: Partial<ILabelStyles> = {
      root:{
        padding:'0px 0px 4px 0px'
      }
    }

    const isReadOnly = this.props.currentPage === 3;
    const durationDisabled = this.props.currentPage === 3 || permDeploy;
    const {
      jobTitleEn,
      jobTitleFr,
      jobDescriptionFr,
      jobDescriptionEn,
      numberOfOpportunities,
      deadline,
    } = this.props.values;

    const filteredClassificationLevels = this.props.classificationLevel?.filter((item) => this.props.values.classificationLevelIds?.includes(item.key));

    const reformatDate = (): string => {
      const formattedDate = moment(deadline).format("YYYY-MM-DD");

      return formattedDate;
    };

    const today = new Date();
    const oneMonthLater = new Date();
    oneMonthLater.setMonth(today.getMonth() + 1);

    //const selectedItems =  jobType.map((item: any) => item.value).filter((item: any) => item !== undefined);

    const getDisabledElement = document.getElementsByName("durationLength")[0];

    if (getDisabledElement) {
      if (durationDisabled) {
        getDisabledElement.style.backgroundColor = "rgb(243, 242, 241)";
        getDisabledElement.style.borderColor = "rgb(243, 242, 241)";

      } else {
        getDisabledElement.style.backgroundColor = "rgb(255, 255, 255)";
        getDisabledElement.style.borderColor = "rgb(96, 94, 92)";
      }
    }

    const classificationCodeItems = this.props.classificationCode.sort()

    const editor = document.querySelectorAll(".ql-editor");
    const toolbar = document.querySelectorAll(".ql-toolbar");

    editor.forEach((node, index) => {
       node.setAttribute("data-field", String(index + 1));
      
       if (index === 0) {
        node.setAttribute("tabIndex", '0');
        node.setAttribute('aria-labelledby','jobDescriptionEn-label');
        node.setAttribute('role', 'textbox');
        if (this.props.inlineFieldErrors?.includes("jobDescriptionEn")) {
          node.setAttribute('aria-invalid', 'true')
        }
       } else {
        node.setAttribute("tabIndex", '0');
        node.setAttribute('aria-labelledby','jobDescriptionFr-label');
        node.setAttribute('role', 'textbox');
         if (this.props.inlineFieldErrors?.includes("jobDescriptionFr")) {
          node.setAttribute('aria-invalid', 'true')
        }
       }
       
    })

    toolbar.forEach((node) => {
      node.setAttribute("role","toolbar")
    })


    return (
      <>
        {this.props.currentPage === 2 && (
          <>
            <p>{this.strings.careerOpportunitiesOnly_1}<strong>{this.strings.careerOpportunitiesOnly_2}</strong>{this.strings.careerOpportunitiesOnly_3}</p>
            <p>{this.strings.oppotunityDetails_para1}</p>
            <p>{this.strings.asteriks}</p>
          </>
        )}

          <ReusableTextField
            id={"jobTitleEn"}
            name={"jobTitleEn"}
            title={`${this.strings.job_Title} ${this.strings.english}`}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.jobTitleEn}
            disabled={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobTitleEn, "jobTitleEn", this.props.prefLang)}
            ariaLabelRequired={this.strings.required}
            ariaInvalid={isInvalid("jobTitleEn", this.props.inlineFieldErrors)}
            maxLength={255}
            instruction={this.strings.jobTitle_Instructions}
            placeholder={this.strings.enter_jobTitleEn}
          />

          <ReusableTextField
            id={"jobTitleFr"}
            name={"jobTitleFr"}
            title={`${this.strings.job_Title} ${this.strings.french}`}
            onChange={this.onChangeTextValue}
            defaultValue={this.props.values.jobTitleFr}
            disabled={isReadOnly}
            onGetErrorMessage={() => validateEmpty(jobTitleFr, "jobTitleFr", this.props.prefLang)}
            ariaLabelRequired={this.strings.required}
            maxLength={255}
            instruction={this.strings.jobTitle_Instructions}
            placeholder={this.strings.enter_jobTitleFr}
          />

            <Stack>
              <FocusZone tabIndex={0} handleTabKey={FocusZoneTabbableElements.inputOnly}>
                <Stack horizontal verticalAlign="center" >
                  <StackItem>
                    <Label id={`jobDescriptionEn-label`} >
                      <p className={styles.mrg0}>
                        <>
                          <span style={{ color: 'rgb(164, 38, 44)' }} aria-hidden="true">
                            *
                          </span>
                          <span className={styles.visuallyHidden}>{this.strings.required}</span>
                        </>
                        <strong>{`${this.strings.job_Description} ${this.strings.english}`}</strong>
                      </p>
                      <p className={styles.instruction}>{this.strings.jobDescription_Instructions}</p>
                    </Label>
                  </StackItem>
                </Stack>
              <div  className={this.props.inlineFieldErrors?.includes("jobDescriptionEn") ? styles.editorError_English : ""}>
                <RichText
                  id={"jobDescriptionEn"}
                  value={jobDescriptionEn}
                  onChange={this.onChangeRichTextValue}
                  placeholder={this.strings.enter_jobDescEn}
                  styleOptions={{
                    showBold: true,
                    showItalic: true,
                    showUnderline: true,
                    showList: true,
                    showAlign: true,
                    showLink: false,
                    showMore: false
                  }}
                 
                  

                />
                </div>
              </FocusZone>
            </Stack>
            <div role="alert">
              {this.props.inlineFieldErrors?.includes("jobDescriptionEn") &&
                validateEmpty(
                  jobDescriptionEn,
                  "jobDescriptionEn",
                  this.props.prefLang,
                )}
            </div>
          
            <Stack>
              <FocusZone tabIndex={0} handleTabKey={FocusZoneTabbableElements.inputOnly}>
                <Stack horizontal verticalAlign="center" >
                  <StackItem>
                    <Label id={`jobDescriptionFr-label`} >
                      <p className={styles.mrg0}>
                        <>
                          <span style={{ color: 'rgb(164, 38, 44)' }} aria-hidden="true">
                            *
                          </span>
                          <span className={styles.visuallyHidden}>{this.strings.required}</span>
                        </>
                        <strong>{`${this.strings.job_Description} ${this.strings.french}`}</strong>
                      </p>
                      <p className={styles.instruction}>{this.strings.jobDescription_Instructions}</p>
                    </Label>
                  </StackItem>
                </Stack>

                <RichText
                  id={"jobDescriptionFr"}
                  value={jobDescriptionFr}
                  onChange={this.onChangeRichTextValueFr}
                  placeholder={this.strings.enter_jobDescFr}
                  styleOptions={{
                    showBold: true,
                    showItalic: true,
                    showUnderline: true,
                    showList: true,
                    showAlign: true,
                    showLink: false,
                    showMore: false
                  }}
                  className={this.props.inlineFieldErrors?.includes("jobDescriptionFr") ? styles.editorError_French : ""}

                />
              </FocusZone>
            </Stack>
          <div role="alert">
            {this.props.inlineFieldErrors?.includes("jobDescriptionFr") &&
              validateEmpty(
                jobDescriptionFr,
                "jobDescriptionFr",
                this.props.prefLang,
              )}
          </div>

          <ReusableDropdownField
            id={"jobType"}
            name={"jobType"}
            title={this.strings.job_Type}
            options={[{ key: "0", text: `--${this.strings.select}--` }, ...this.props.jobType,]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.jobType.Guid}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.job_Type_description}
            prefLang={this.props.prefLang}
            errorMessage={
              this.props.values.jobType.Guid === "0"
                ? getLocalizedString("jobType", this.props.prefLang)
                : undefined
            }
            placeholder={this.strings.selectOption}
          />

          <ReusableDropdownField
            id={"programArea"}
            name={"programArea"}
            title={this.strings.program_Area}
            options={[{ key: "0", text: `--${this.strings.select}--` }, ...this.props.programArea,]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.programArea.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.programArea_description}
            inlineFieldErrors={this.props.inlineFieldErrors}
            prefLang={this.props.prefLang}
            placeholder={this.strings.selectOption}
            errorMessage={
              this.props.values.programArea.key === "0"
                ? getLocalizedString("programArea", this.props.prefLang)
                : undefined
            }
          />

          <Stack horizontal verticalAlign="center" style={{marginTop:'12px'}}>
            <StackItem>
              <Label
                id={"classificationCode-label"}
                htmlFor={"classificationCode"}
                style={{ fontWeight: "700" }}
                styles={labelSpacing}
              >
                <p className={styles.mrg0} style={{paddingBottom:'8px'}}>
                  <span
                    style={{ color: "rgb(164, 38, 44)" }}
                    aria-hidden="true"
                  >
                    *
                  </span>
                  <span className={styles.visuallyHidden}>
                    {this.strings.required}
                  </span>
                  {this.strings.classification_Code}
                </p>
                <p className={styles.instruction}>
                  {this.strings.classification_Code_description}
                </p>
              </Label>
            </StackItem>
          </Stack>
          <ComboBox
            id={"classificationCode"}
            aria-labelledby={"classificationCode-label"}
            aria-describedby="classificationCode-error"
            options={[{ key: "0", text: `--${this.strings.select}--` },...classificationCodeItems,]}
            onChange={this.onChangeClassificationCode}
            disabled={this.props.currentPage === 3}
            selectedKey={this.props.values.classificationCode.key}
            autoComplete="on"
            allowFreeform
            styles={comboBoxStyles}
            errorMessage={
              this.props.values.classificationCode.key === "0"
                ? getLocalizedString(
                    "classificationCode",
                    this.props.prefLang
                  )
                : undefined
            }
            placeholder={this.strings.selectOrType}
            useComboBoxAsMenuWidth={true}
          />
          

          <ReusableDropdownField
            id={"classificationLevel"}
            name={"classificationLevel"}
            title={this.strings.classification_Level}
            options={[{ key: "0", text: `--${this.strings.select}--` }, ...filteredClassificationLevels]}
            onChange={this.onChangeDropDownItem}
            disabled={isReadOnly}
            selectedKey={this.props.values.classificationLevel.key}
            ariaLabelRequired={this.strings.required}
            instruction={this.strings.classification_Level_description}
            placeholder={this.strings.selectOption}
            errorMessage={
              this.props.values.classificationLevel.key === "0"
                ? getLocalizedString(
                    "classificationLevel",
                    this.props.prefLang
                  )
                : undefined
            }
          />

          <Stack style={{marginTop:'16px'}}>
            <label
              htmlFor={"numberOfOpportunities"}
              style={{ padding: "0px 0px 8px", fontWeight: "700",  }}
            >
              <span
                  style={{ color: "rgb(164, 38, 44)" }}
                  aria-hidden="true"
                >
                  *
              </span>
              {this.strings.number_of_Opportunities}
            </label>
            <input
              type="number"
              id={"numberOfOpportunities"}
              name={"numberOfOpportunities"}
              min={1}
              max={60}
              value={numberOfOpportunities.value}
              aria-describedby="numberOfOpportunities-error"
              onChange={(e) => {
                  let val = Number(e.target.value);

                  // if empty string 
                  if (e.target.value === '') {
                    this.props.handleNumberofOpp('');
                    return;
                  }
                  //if values are not within the 1-60
                  if (val < 1) val = 1;
                  if (val > 60) val = 60;

                  this.props.handleNumberofOpp(val.toString());
                }}
            
              required
              className={styles.durationLengthInput}
              disabled={isReadOnly}
            />
          </Stack>
          <div style={{marginTop: '5px'}}>
            {this.props.inlineFieldErrors?.includes(
              "numberOfOpportunities"
            ) &&
              validateNumericField(
                numberOfOpportunities.value,
                this.props.prefLang,
                "numberOfOpportunities"
              )}
          </div>
          
          <div style={{marginTop:'16px'}}>
            <Label
              id={"duration-label"}
              htmlFor={"duration"}
              style={{fontWeight: "700" }}
              styles={labelSpacing}
            >
              <p className={styles.mrg0} style={{marginBottom:'8px'}}>
                <span style={{ color: "rgb(164, 38, 44)" }} aria-hidden="true">
                  *
                </span>
                <span className={styles.visuallyHidden}>
                  {this.strings.required}
                </span>
                {this.strings.durationField}
              </p>
              <p className={styles.instruction}>
                {this.strings.durationDescription}
              </p>
            </Label>

            <Stack horizontal tokens={customSpacingStackTokens}  style={{marginTop: '16px'}}>
              <StackItem>
              <p
                id={"duration-input-label"}
                style={{fontWeight: "700", marginBottom:'8px'}}
                className={styles.mrg0}
              >
                {this.strings.time_period}
              </p>
                <Dropdown
                  id={"duration"}
                  aria-labelledby={`${"duration-label"} ${"duration-input-label"}`}
                  options={[{ key: "", text: `--${this.strings.select}--` }, ...this.props.duration,]}
                  onChange={this.onChangeDropDownItem}
                  selectedKey={this.props.values.duration.key}
                  disabled={durationDisabled}
                  styles={dropdownStyles}
                  errorMessage={
                    this.props.values.duration.key === "" && !permDeploy
                    
                      ? getLocalizedString("duration", this.props.prefLang)
                      : undefined
                  }
                  placeholder={this.strings.selectOption}
                />
              </StackItem>

              <StackItem>
                <Stack>
                  <label
                    id={"durationLength"}
                    style={{marginBottom:'8px', fontWeight: "700" }}
                  >
                    {this.strings.length}
                  </label>
                  <input
                    type="number"
                    id={"durationLength"}
                    name={"durationLength"}
                    min={1}
                    max={60}
                      onChange={(e) => {
                        let val = Number(e.target.value);

                        // if empty string 
                        if (e.target.value === '') {
                          this.props.handleDurationLength('');
                          return;
                        }
                        //if values are not within the 1-60
                        if (val < 1) val = 1;
                        if (val > 60) val = 60;

                        this.props.handleDurationLength(val.toString());
                      }}

                    value={this.props.values.durationLength.value}
                    required
                    className={styles.durationLengthInput}
                    disabled={durationDisabled}
                    aria-describedby="durationLength-error"
                    aria-labelledby={ "durationLength"}
                  />
                </Stack>
                {this.props.inlineFieldErrors?.includes("durationLength") &&
                  validateNumericField(
                    this.props.values.durationLength.value,
                    this.props.prefLang,
                    "durationLength"
                  )}
              </StackItem>
            </Stack>
          </div>

          <Stack horizontal verticalAlign="center" style={{marginTop:'12px'}}>
            <StackItem>
              <Label id={"deadline"} styles={labelSpacing}>
                <p className={styles.mrg0} style={{paddingBottom:'8px', fontWeight:'700'}}>
                  <span
                    style={{ color: "rgb(164, 38, 44)" }}
                    aria-hidden="true"
                  >
                    *
                  </span>
                  <span className={styles.visuallyHidden}>
                    {this.strings.required}
                  </span>
                  {this.strings.application_deadline}
                </p>
                <p className={styles.instruction} style={{paddingBottom:'4px'}}>
                  {this.strings.application_deadline_description}
                </p>
              </Label>
            </StackItem>
          </Stack>

            <DatePicker
              id={"deadline"}
              aria-labelledby={"deadline"}
              className={styles.labelStyle}
              ariaLabel={this.strings.application_deadline}
              onSelectDate={this.onSelectedDate}
              disabled={isReadOnly}
              formatDate={reformatDate}
              value={this.props.values.deadline}
              minDate={this.props.jobOppId ? undefined : oneMonthLater}
            />
      </>
    );
  }
}
