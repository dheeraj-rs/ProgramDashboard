import React from 'react';

interface TimeSlotInputProps {
  start: string;
  end: string;
  onStartChange: (value: string) => void;
  onEndChange: (value: string) => void;
}

const TimeSlotInput: React.FC<TimeSlotInputProps> = ({
  start,
  end,
  onStartChange,
  onEndChange,
}) => {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Start Time
        </label>
        <input
          type="time"
          value={start}
          onChange={(e) => onStartChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          End Time
        </label>
        <input
          type="time"
          value={end}
          onChange={(e) => onEndChange(e.target.value)}
          className="w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  );
};

export default TimeSlotInput;