import { SectionTemplate } from '../types';

export const SECTION_TEMPLATES: SectionTemplate[] = [
  {
    type: 'program',
    name: 'Program Session',
    defaultDuration: 60,
    color: 'bg-gradient-to-r from-blue-500 to-cyan-500',
    icon: 'Presentation',
    defaultSpeakerRole: 'Presenter'
  },
  {
    type: 'lunch',
    name: 'Lunch Break',
    defaultDuration: 45,
    color: 'bg-gradient-to-r from-orange-400 to-yellow-400',
    icon: 'Coffee',
  },
  {
    type: 'break',
    name: 'Break',
    defaultDuration: 15,
    color: 'bg-gradient-to-r from-green-400 to-emerald-400',
    icon: 'Clock',
  },
  {
    type: 'introduction',
    name: 'Introduction',
    defaultDuration: 30,
    color: 'bg-gradient-to-r from-purple-500 to-pink-500',
    icon: 'Users',
    defaultSpeakerRole: 'Host'
  },
  {
    type: 'entertainment',
    name: 'Entertainment',
    defaultDuration: 45,
    color: 'bg-gradient-to-r from-rose-400 to-red-400',
    icon: 'Music',
    defaultSpeakerRole: 'Performer'
  },
  {
    type: 'speech',
    name: 'Speech',
    defaultDuration: 30,
    color: 'bg-gradient-to-r from-indigo-500 to-violet-500',
    icon: 'Mic',
    defaultSpeakerRole: 'Speaker'
  }
]; 