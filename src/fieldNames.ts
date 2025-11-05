
export type FieldName =
  | { type: "lookup"; subFields: string[] }
  | { type: "text" };

export const fieldNames: Record<string, FieldName> = {
  Department: { type: "lookup", subFields: ["ID", "NameEn", "NameFr"] },
  JobTitleEn: { type: "text" },
  JobTitleFr: { type: "text" },
  JobDescriptionEn: { type: "text" },
  JobDescriptionFr: { type: "text" },
  JobType: { type: "text" },
  ProgramArea: { type: "text" },
  ClassificationCode: { type: "lookup", subFields: ["ID", "NameEn", "NameFr"] },
  ClassificationLevel: { type: "lookup", subFields: ["ID", "NameFr"] },
  Duration: { type: "lookup", subFields: ["ID", "NameEn", "NameFr"] },
  DurationQuantity: { type: "text" },
  NumberOfOpportunities: { type: "text" },
  ApplicationDeadlineDate: { type: "text" },
  WorkArrangement: { type: "lookup", subFields: ["ID", "NameEn", "NameFr"] },
  City: { type: "lookup", subFields: ["ID", "NameEn", "NameFr"] },
  SecurityClearance: { type: "lookup", subFields: ["ID"] },
  WorkSchedule: { type: "lookup", subFields: ["ID", "NameEn", "NameFr"] },
  LanguageRequirement: { type: "lookup", subFields: ["ID", "NameEn", "NameFr"] },
  LanguageComprehension: { type: "text" },
  Skills: { type: "lookup", subFields: ["ID"] },
};
