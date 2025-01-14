import React from 'react';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';
import { Track, SectionType } from '../types';
import { sectionTypeConfigs } from '../config/sectionTypes';

interface DateSelectorProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  tracks: Track[];
  onDateClick: (date: Date) => void;
  selectedDate: Date | null;
}

const DateSelector: React.FC<DateSelectorProps> = ({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  tracks,
  onDateClick,
  selectedDate,
}) => {
  const getDatesBetween = (start: Date, end: Date) => {
    const dates = [];
    const current = new Date(start);
    while (current <= end) {
      dates.push(new Date(current));
      current.setDate(current.getDate() + 1);
    }
    return dates;
  };

  const getTrackEventsForDate = (date: Date) => {
    return tracks.filter(track => {
      const trackStart = new Date(track.startDate);
      const trackEnd = new Date(track.endDate);
      return date >= trackStart && date <= trackEnd;
    });
  };

  const getSectionTypeForDate = (date: Date) => {
    const events = tracks.flatMap(track => 
      track.sections.filter(section => {
        const trackDate = new Date(track.startDate);
        return trackDate.toDateString() === date.toDateString();
      })
    );
    return events.map(section => section.type);
  };

  const dates = getDatesBetween(new Date(startDate), new Date(endDate));

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg space-y-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <Calendar className="w-6 h-6 text-indigo-600 mr-2" />
          <h2 className="text-xl font-semibold text-gray-800">Program Timeline</h2>
        </div>
        <div className="flex space-x-2">
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronLeft className="w-5 h-5 text-gray-600" />
          </button>
          <button className="p-2 hover:bg-gray-100 rounded-full">
            <ChevronRight className="w-5 h-5 text-gray-600" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">Start Date</label>
          <input
            type="date"
            value={startDate.split('T')[0]}
            onChange={(e) => onStartDateChange(`${e.target.value}T00:00`)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">End Date</label>
          <input
            type="date"
            value={endDate.split('T')[0]}
            onChange={(e) => onEndDateChange(`${e.target.value}T23:59`)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          />
        </div>
      </div>

      <div className="overflow-x-auto">
        <div className="inline-flex space-x-2 min-w-full p-2">
          {dates.map((date, index) => {
            const events = getTrackEventsForDate(date);
            const sectionTypes = getSectionTypeForDate(date);
            const hasEvents = events.length > 0;
            
            return (
              <div
                key={date.toISOString()}
                onClick={() => onDateClick(date)}
                className={`
                  flex flex-col items-center p-3 rounded-lg min-w-[100px]
                  ${hasEvents ? 'bg-gradient-to-b from-indigo-50 to-indigo-100' : 'bg-gray-50'}
                  ${selectedDate?.toDateString() === date.toDateString() ? 'ring-2 ring-indigo-500 bg-indigo-100' : ''}
                  ${date.toDateString() === new Date().toDateString() ? 'border-2 border-indigo-300' : ''}
                  hover:shadow-md transition-all cursor-pointer
                `}
              >
                <span className="text-sm font-medium text-gray-600">
                  {date.toLocaleDateString('en-US', { weekday: 'short' })}
                </span>
                <span className="text-lg font-bold text-gray-800">
                  {date.getDate()}
                </span>
                {hasEvents && (
                  <div className="flex flex-wrap gap-1 mt-2">
                    {Array.from(new Set(sectionTypes)).map((type, i) => (
                      <div
                        key={i}
                        className={`w-2 h-2 rounded-full ${sectionTypeConfigs[type].color.replace('bg-', 'bg-')}`}
                      />
                    ))}
                  </div>
                )}
                {events.length > 0 && (
                  <span className="text-xs text-indigo-600 mt-1">
                    {events.length} track{events.length > 1 ? 's' : ''}
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default DateSelector;