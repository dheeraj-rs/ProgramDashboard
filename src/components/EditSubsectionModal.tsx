import React, { useState } from 'react';
import Modal from './Modal';
import TimeSlotInput from './TimeSlotInput';
import { Subsection } from '../types';

interface EditSubsectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (subsection: Omit<Subsection, 'id' | 'subsections' | 'mergedFields'>) => void;
  initialData?: Partial<Subsection>;
}

const EditSubsectionModal: React.FC<EditSubsectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [name, setName] = useState(initialData?.name || '');
  const [speaker, setSpeaker] = useState(initialData?.speaker || '');
  const [role, setRole] = useState(initialData?.role || '');
  const [startTime, setStartTime] = useState(
    initialData?.timeSlot?.start || '09:00'
  );
  const [endTime, setEndTime] = useState(initialData?.timeSlot?.end || '17:00');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      speaker,
      role,
      timeSlot: {
        start: startTime,
        end: endTime,
      },
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Subsection' : 'Add New Subsection'}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Subsection Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Enter subsection name"
            required
          />
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Speaker Name
            </label>
            <input
              type="text"
              value={speaker}
              onChange={(e) => setSpeaker(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter speaker name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Role
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full rounded-lg border border-gray-200 p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
              placeholder="Enter role"
              required
            />
          </div>

          <TimeSlotInput
            start={startTime}
            end={endTime}
            onStartChange={setStartTime}
            onEndChange={setEndTime}
          />
        </div>

        <div className="flex justify-end space-x-3 pt-4 border-t">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-800 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleSubmit}
            className="px-4 py-2 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg hover:from-indigo-600 hover:to-blue-600 transition-colors"
          >
            {initialData ? 'Save Changes' : 'Add Subsection'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditSubsectionModal;