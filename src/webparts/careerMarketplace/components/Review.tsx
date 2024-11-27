// import * as React from 'react';
// import ReusableTextField from './ReusableTextField';
// import ReusableDropdownField from './ReusableDropDownField';
// import { IStackTokens, Stack, StackItem } from '@fluentui/react';

// export interface IReviewProps {

// }


// export default class Review extends React.Component<IReviewProps> {

//     public onChangeTextValue = (event: React.ChangeEvent<HTMLInputElement>):void => {
//         console.log(event.target.name);
//     }


//     public render(): React.ReactElement<IReviewProps>{

//         const customSpacingStackTokens: IStackTokens = {
//             childrenGap: '5%',
//           };
//         return (
//             <>
//                 <div>
//                     <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. </p>
//                 </div>
//                 <div>
//                     <Stack horizontal wrap tokens={customSpacingStackTokens}>
//                         <StackItem grow={1} styles={{ root: { maxWidth: '50%' } }} >
//                         <ReusableTextField id={"1"} name={"name"} title={"Full name"} onChange={this.onChangeTextValue} />
//                         <ReusableTextField id={"2"} name={"department"} title={"Department"} onChange={this.onChangeTextValue}/>
//                         <ReusableTextField id={"3"} name={"workEmail"} title={"Work Email"} onChange={this.onChangeTextValue}/>
//                         <ReusableTextField id={"4"} name={"phone"} title={"Phone number"} onChange={this.onChangeTextValue}/>
//                         <ReusableTextField id={"5"} name={"jobTitleEn"} title={"Job Title (EN)"} onChange={this.onChangeTextValue}/>
//                         <ReusableTextField id={"6"} name={"jobTitleFr"} title={"Job Title (FR)"} onChange={this.onChangeTextValue}/>
//                         <ReusableTextField id={"7"} name={"jobType"} title={"Job Type"} onChange={this.onChangeTextValue}/>
//                         <ReusableDropdownField id={"8"} name={"program"} title={"Program area"}  />
//                         <ReusableDropdownField id={"9"} name={"classification"} title={"Classification"} />
//                         <ReusableTextField id={"10"} name={"level"} title={"Level"} onChange={this.onChangeTextValue} />
//                         <ReusableTextField id={"11"} name={"numOfOpps"} title={"Number of opportunities"} onChange={this.onChangeTextValue} />
//                         </StackItem>
//                         <StackItem grow={1} styles={{ root: { maxWidth: '50%' } }}>
//                         <ReusableTextField id={"12"} name={"duration"} title={"Duration"} onChange={this.onChangeTextValue} />
//                         <ReusableTextField id={"13"} name={"deadline"} title={"Application deadline"} onChange={this.onChangeTextValue} />
//                         <ReusableTextField id={"14"} name={"jobDescriptionEn"} title={"Job Description (EN)"} onChange={this.onChangeTextValue}/>
//                         <ReusableTextField id={"15"} name={"jobDescriptionFr"} title={"Job Description (FR)"} onChange={this.onChangeTextValue}/>
//                         <ReusableTextField id={"16"} name={"essentialSkill"} title={"Essential Skill"} />
//                         <ReusableTextField id={"17"} name={"assetSkill"} title={"Asset Skill"} />
//                         <ReusableDropdownField id={"18"} name={"time"} title={"Time in hours"}/>
//                         <ReusableDropdownField id={"19"} name={"location"} title={"Location"}/>
//                         <ReusableDropdownField id={"20"} name={"city"} title={"City"}/>
//                         <ReusableDropdownField id={"21"} name={"language"} title={"Language requirements"} />
//                         <ReusableDropdownField  id={"22"} name={"wrkArrangment"} title={"Work arrangement"}/>
//                         <ReusableTextField id={"23"} name={"approvedStaffing"} title={"Approved Staffing"} onChange={this.onChangeTextValue}/>
//                         </StackItem>
//                     </Stack>
//                 </div>
//             </>
//         )
//     }
// }