import React, { useState, useEffect } from 'react';
import Modal from './Modal';
import TimeSlotInput from './TimeSlotInput';
import { Section, SectionType } from '../types';
import { sectionTypeConfigs } from '../config/sectionTypes';
import { Presentation, Coffee, Clock, Users, Music, Mic } from 'lucide-react';

const icons = {
  Presentation,
  Coffee,
  Clock,
  Users,
  Music,
  Mic
};

interface EditSectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (section: Omit<Section, 'id' | 'subsections' | 'mergedFields'>) => void;
  initialData?: Partial<Section>;
}

const EditSectionModal: React.FC<EditSectionModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialData,
}) => {
  const [type, setType] = useState<SectionType>(initialData?.type || SectionType.PROGRAM);
  const [name, setName] = useState(initialData?.name || '');
  const [speaker, setSpeaker] = useState(initialData?.speaker || '');
  const [role, setRole] = useState(initialData?.role || '');
  const [timeSlot, setTimeSlot] = useState({
    start: initialData?.timeSlot?.start || sectionTypeConfigs[type].defaultDuration.start,
    end: initialData?.timeSlot?.end || sectionTypeConfigs[type].defaultDuration.end,
  });

  useEffect(() => {
    if (!initialData?.name) {
      const config = sectionTypeConfigs[type];
      const currentTime = new Date();
      const hour = currentTime.getHours();
      let defaultName = config.label;

      // Add time context to the name
      if (type === SectionType.LUNCH) {
        defaultName = hour < 12 ? 'Early Lunch Break' : hour < 15 ? 'Lunch Break' : 'Late Lunch Break';
      } else if (type === SectionType.BREAK) {
        defaultName = hour < 12 ? 'Morning Break' : hour < 17 ? 'Afternoon Break' : 'Evening Break';
      } else {
        const count = Math.floor(Math.random() * 100) + 1;
        defaultName = `${config.label} ${count}`;
      }
      
      setName(defaultName);
    }
  }, [type, initialData]);

  const handleTypeChange = (newType: SectionType) => {
    setType(newType);
    const config = sectionTypeConfigs[newType];
    setTimeSlot(config.defaultDuration);
    
    switch (newType) {
      case SectionType.LUNCH:
      case SectionType.BREAK:
        setSpeaker('');
        setRole('');
        break;
      case SectionType.PROGRAM:
        setRole('Presenter');
        break;
      case SectionType.SPEECH:
        setRole('Speaker');
        break;
      case SectionType.ENTERTAINMENT:
        setRole('Performer');
        break;
      case SectionType.INTRODUCTION:
        setRole('Host');
        break;
    }
  };

  const renderInputFields = () => {
    switch (type) {
      case SectionType.LUNCH:
      case SectionType.BREAK:
        return (
          <TimeSlotInput
            start={timeSlot.start}
            end={timeSlot.end}
            onStartChange={(start) => setTimeSlot({ ...timeSlot, start })}
            onEndChange={(end) => setTimeSlot({ ...timeSlot, end })}
          />
        );
      
      case SectionType.PROGRAM:
      case SectionType.SPEECH:
      case SectionType.INTRODUCTION:
      case SectionType.ENTERTAINMENT:
        return (
          <>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Speaker Name
                </label>
                <input
                  type="text"
                  value={speaker}
                  onChange={(e) => setSpeaker(e.target.value)}
                  className="w-full rounded-lg border border-gray-200 p-2 bg-gradient-to-r from-gray-50 to-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
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
                  className="w-full rounded-lg border border-gray-200 p-2 bg-gradient-to-r from-gray-50 to-gray-100 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
                  required
                />
              </div>
              <TimeSlotInput
                start={timeSlot.start}
                end={timeSlot.end}
                onStartChange={(start) => setTimeSlot({ ...timeSlot, start })}
                onEndChange={(end) => setTimeSlot({ ...timeSlot, end })}
              />
            </div>
          </>
        );
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      name,
      type,
      speaker,
      role,
      timeSlot,
    });
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={initialData ? 'Edit Section' : 'Add New Section'}
    >
      <div className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Section Name
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-lg border border-gray-200 p-2.5 bg-white focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all"
            placeholder="Enter section name"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Section Type
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.values(SectionType).map((sectionType) => (
              <button
                key={sectionType}
                onClick={() => handleTypeChange(sectionType)}
                className={`
                  p-3 rounded-lg border transition-all flex items-center space-x-2
                  ${type === sectionType 
                    ? 'border-indigo-500 bg-indigo-50 text-indigo-700' 
                    : 'border-gray-200 hover:border-indigo-200 hover:bg-indigo-50/50'
                  }
                `}
              >
                {React.createElement(icons[sectionTypeConfigs[sectionType].icon], {
                  className: 'w-5 h-5'
                })}
                <span className="text-sm font-medium">
                  {sectionTypeConfigs[sectionType].label}
                </span>
              </button>
            ))}
          </div>
        </div>

        {renderInputFields()}

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
            {initialData ? 'Save Changes' : 'Add Section'}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default EditSectionModal;