import { SectionType, SectionTypeConfig } from '../types';

export const sectionTypeConfigs: Record<SectionType, SectionTypeConfig> = {
  [SectionType.PROGRAM]: {
    label: 'Program Session',
    color: 'bg-blue-50 border-l-4 border-blue-500',
    icon: 'Presentation',
    defaultDuration: {
      start: '09:00',
      end: '10:30'
    }
  },
  [SectionType.LUNCH]: {
    label: 'Lunch Break',
    color: 'bg-orange-50 border-l-4 border-orange-500',
    icon: 'Coffee',
    defaultDuration: {
      start: '12:00',
      end: '13:00'
    }
  },
  [SectionType.BREAK]: {
    label: 'Break Time',
    color: 'bg-green-50 border-l-4 border-green-500',
    icon: 'Clock',
    defaultDuration: {
      start: '10:30',
      end: '11:00'
    }
  },
  [SectionType.INTRODUCTION]: {
    label: 'Introduction',
    color: 'bg-purple-50 border-l-4 border-purple-500',
    icon: 'Users',
    defaultDuration: {
      start: '09:00',
      end: '09:30'
    }
  },
  [SectionType.ENTERTAINMENT]: {
    label: 'Entertainment',
    color: 'bg-pink-50 border-l-4 border-pink-500',
    icon: 'Music',
    defaultDuration: {
      start: '15:00',
      end: '16:00'
    }
  },
  [SectionType.SPEECH]: {
    label: 'Speech',
    color: 'bg-yellow-50 border-l-4 border-yellow-500',
    icon: 'Mic',
    defaultDuration: {
      start: '11:00',
      end: '12:00'
    }
  }
}; 