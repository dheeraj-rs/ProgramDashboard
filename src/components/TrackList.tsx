import React from 'react';
import { Calendar, Clock } from 'lucide-react';
import { Track } from '../types';

interface TrackListProps {
  tracks: Track[];
  onTrackSelect: (trackId: string) => void;
  selectedTrackId: string | null;
}

const TrackList: React.FC<TrackListProps> = ({ tracks, onTrackSelect, selectedTrackId }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {tracks.map((track) => (
        <div
          key={track.id}
          onClick={() => onTrackSelect(track.id)}
          className={`
            bg-white p-6 rounded-xl shadow-lg cursor-pointer
            transform hover:scale-105 transition-all duration-300
            ${selectedTrackId === track.id ? 'ring-4 ring-indigo-500' : ''}
            hover:shadow-xl
          `}
          style={{
            perspective: '1000px',
            transform: selectedTrackId === track.id ? 'translateZ(20px)' : 'none'
          }}
        >
          <h3 className="text-xl font-bold text-gray-800 mb-4">{track.name}</h3>
          <div className="space-y-3">
            <div className="flex items-center text-gray-600">
              <Calendar className="w-5 h-5 mr-2 text-indigo-600" />
              <span>{new Date(track.startDate).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center text-gray-600">
              <Clock className="w-5 h-5 mr-2 text-indigo-600" />
              <span>{track.sections.length} sections</span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default TrackList;