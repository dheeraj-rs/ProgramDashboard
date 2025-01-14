export interface TimeSlot {
  start: string;
  end: string;
}

export interface MergedFields {
  speaker: boolean;
  role: boolean;
  timeSlot: boolean;
}

export interface Subsection {
  id: string;
  name: string;
  timeSlot: TimeSlot;
  speaker: string;
  role: string;
  subsections: Subsection[];
  mergedFields: MergedFields;
}

export interface Section {
  id: string;
  name: string;
  type: SectionType;
  timeSlot: TimeSlot;
  speaker: string;
  role: string;
  subsections: Subsection[];
  mergedFields: MergedFields;
}

export interface Track {
  id: string;
  name: string;
  startDate: string;
  endDate: string;
  sections: Section[];
}

export type Program = Track[];

export enum SectionType {
  PROGRAM = 'program',
  LUNCH = 'lunch',
  BREAK = 'break',
  INTRODUCTION = 'introduction',
  ENTERTAINMENT = 'entertainment',
  SPEECH = 'speech'
}

export interface SectionTypeConfig {
  label: string;
  color: string;
  icon: string;
  defaultDuration: {
    start: string;
    end: string;
  };
}

export interface SectionTemplate {
  type: SectionType;
  name: string;
  defaultDuration: number; // in minutes
  color: string;
  icon: string;
  defaultSpeakerRole?: string;
}