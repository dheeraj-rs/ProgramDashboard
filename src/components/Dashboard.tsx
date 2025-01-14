import React, { useState } from 'react';
import Timeline from './Timeline';
import { BarChart, Calendar, Clock, Users, Plus } from 'lucide-react';
import EditTrackModal from './EditTrackModal';
import { useProgram } from './ProgramContext';
import DateSelector from './DateSelector';
import TrackList from './TrackList';

const Dashboard: React.FC = () => {
  const { program, addTrack } = useProgram();
  const [isAddingTrack, setIsAddingTrack] = useState(false);
  const [selectedTrackId, setSelectedTrackId] = useState<string | null>(null);
  const [dateRange, setDateRange] = useState({
    start: '2025-01-01T00:00',
    end: '2025-12-31T23:59',
  });
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const totalSections = program.reduce(
    (acc, track) => acc + track.sections.length,
    0
  );

  const totalSpeakers = new Set(
    program.flatMap(track =>
      track.sections.flatMap(section => [
        section.speaker,
        ...section.subsections.flatMap(sub => sub.speaker)
      ])
    )
  ).size;

  const calculateTotalHours = () => {
    let total = 0;
    program.forEach(track => {
      track.sections.forEach(section => {
        const [startHour] = section.timeSlot.start.split(':').map(Number);
        const [endHour] = section.timeSlot.end.split(':').map(Number);
        total += endHour - startHour;
      });
    });
    return total;
  };

  const filteredTracks = program.filter(track => {
    const trackStart = new Date(track.startDate);
    const trackEnd = new Date(track.endDate);

    if (selectedDate) {
      const selected = new Date(selectedDate);
      selected.setHours(0, 0, 0, 0);
      return selected >= trackStart && selected <= trackEnd;
    } else {
      const rangeStart = new Date(dateRange.start);
      const rangeEnd = new Date(dateRange.end);
      return (
        (trackStart >= rangeStart && trackStart <= rangeEnd) ||
        (trackEnd >= rangeStart && trackEnd <= rangeEnd) ||
        (trackStart <= rangeStart && trackEnd >= rangeEnd)
      );
    }
  });

  const handleDateClick = (date: Date) => {
    setSelectedDate(date);
    setSelectedTrackId(null);
  };

  const handleDateRangeChange = (start: string, end: string) => {
    setDateRange({ start, end });
    setSelectedDate(null);
    setSelectedTrackId(null);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        <div className="flex justify-between items-center">
          <h1 className="text-4xl font-bold text-gray-800">Program Dashboard</h1>
          <button
            onClick={() => setIsAddingTrack(true)}
            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Track
          </button>
        </div>

        <DateSelector
          startDate={dateRange.start}
          endDate={dateRange.end}
          onStartDateChange={(date) => handleDateRangeChange(date, dateRange.end)}
          onEndDateChange={(date) => handleDateRangeChange(dateRange.start, date)}
          onDateClick={handleDateClick}
          tracks={program}
          selectedDate={selectedDate}
        />
        
        
        <div className="bg-white p-6 rounded-xl shadow-lg">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-800">
              {selectedDate 
                ? `Tracks for ${selectedDate.toLocaleDateString()}`
                : `Tracks from ${new Date(dateRange.start).toLocaleDateString()} to ${new Date(dateRange.end).toLocaleDateString()}`
              }
            </h2>
            <button
              onClick={() => setIsAddingTrack(true)}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 flex items-center"
            >
              <Plus className="w-4 h-4 mr-2" />
              Add Track
            </button>
          </div>
          
          <TrackList
            tracks={filteredTracks}
            onTrackSelect={setSelectedTrackId}
            selectedTrackId={selectedTrackId}
          />
        </div>

        {selectedTrackId && (
          <Timeline
            track={program.find(t => t.id === selectedTrackId)!}
          />
        )}

        <EditTrackModal
          isOpen={isAddingTrack}
          onClose={() => setIsAddingTrack(false)}
          onSave={(trackData) => {
            addTrack(trackData);
            setIsAddingTrack(false);
          }}
        />
      </div>
    </div>
  );
};

export default Dashboard;