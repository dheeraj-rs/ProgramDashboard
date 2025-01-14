import React, { useState } from 'react';
import { Track, Section, Subsection } from '../types';
import { Calendar, Clock, User, Edit, Trash2, Plus, Merge } from 'lucide-react';
import EditSectionModal from './EditSectionModal';
import EditSubsectionModal from './EditSubsectionModal';
import { useProgram } from './ProgramContext';
import { sectionTypeConfigs } from '../config/sectionTypes';

interface TimelineProps {
  track: Track;
}

const Timeline: React.FC<TimelineProps> = ({ track }) => {
  const {
    addSection,
    updateSection,
    deleteSection,
    addSubsection,
    updateSubsection,
    deleteSubsection,
    mergeSubsections,
  } = useProgram();

  const [editingSectionId, setEditingSectionId] = useState<string | null>(null);
  const [editingSubsectionId, setEditingSubsectionId] = useState<string | null>(null);
  const [addingSubsectionTo, setAddingSubsectionTo] = useState<{
    sectionId: string;
    parentId: string | null;
  } | null>(null);
  const [selectedSubsections, setSelectedSubsections] = useState<string[]>([]);

  const handleMergeSubsections = (sectionId: string) => {
    if (selectedSubsections.length >= 2) {
      mergeSubsections(track.id, sectionId, selectedSubsections);
      setSelectedSubsections([]);
    }
  };

  const renderSubsections = (
    subsections: Subsection[],
    sectionId: string,
    depth = 0
  ) => {
    return subsections.map((subsection) => {
      const isSelected = selectedSubsections.includes(subsection.id);
      const hasMergedFields = Object.values(subsection.mergedFields).some(value => value);

      return (
        <div
          key={subsection.id}
          className={`
            p-4 rounded-xl transition-all duration-300
            ${isSelected ? 'ring-2 ring-indigo-500 shadow-md' : ''}
            ${hasMergedFields ? 'bg-gradient-to-r from-purple-50 to-indigo-50' : 'bg-white/80'}
            hover:shadow-lg hover:translate-x-1
            cursor-pointer backdrop-blur-sm
            border border-gray-100
          `}
          style={{
            transform: `perspective(1000px) translateZ(${depth * 5}px)`,
            marginLeft: `${depth * 1.5}rem`
          }}
          onClick={() => {
            if (selectedSubsections.includes(subsection.id)) {
              setSelectedSubsections(prev => prev.filter(id => id !== subsection.id));
            } else {
              setSelectedSubsections(prev => [...prev, subsection.id]);
            }
          }}
        >
          <div className="flex items-center justify-between mb-2">
            <h4 className="text-lg font-semibold text-gray-800">
              {subsection.name}
            </h4>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-600">
                <Clock className="w-4 h-4 mr-1" />
                <span>
                  {subsection.timeSlot.start} - {subsection.timeSlot.end}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setEditingSubsectionId(subsection.id);
                  }}
                  className="p-1 text-gray-600 hover:text-indigo-600"
                >
                  <Edit className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    deleteSubsection(track.id, sectionId, subsection.id);
                  }}
                  className="p-1 text-gray-600 hover:text-red-600"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setAddingSubsectionTo({
                      sectionId,
                      parentId: subsection.id,
                    });
                  }}
                  className="p-1 text-gray-600 hover:text-green-600"
                >
                  <Plus className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-gray-600 mb-2">
            <div className="flex items-center">
              <User className="w-4 h-4 mr-1" />
              <span>{subsection.speaker}</span>
            </div>
            <span className="text-gray-400">|</span>
            <span className="text-gray-600">{subsection.role}</span>
          </div>
          {subsection.subsections.length > 0 && (
            <div className="mt-4">
              {renderSubsections(subsection.subsections, sectionId, depth + 1)}
            </div>
          )}
        </div>
      );
    });
  };

  return (
    <div className="bg-gradient-to-br from-gray-50 to-white p-8 rounded-2xl shadow-xl transform hover:scale-[1.01] transition-all duration-300 border border-gray-100">
      <div className="flex items-center justify-between mb-8">
        <div className="space-y-2">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            {track.name}
          </h2>
          <div className="flex items-center text-gray-600 bg-gray-50 px-4 py-2 rounded-lg shadow-sm">
            <Calendar className="w-5 h-5 mr-2 text-indigo-500" />
            <span className="font-medium">
              {new Date(track.startDate).toLocaleDateString()} -{' '}
              {new Date(track.endDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        <div className="flex space-x-4">
          {selectedSubsections.length >= 2 && (
            <button
              onClick={() => handleMergeSubsections(track.id)}
              className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 rounded-lg hover:from-purple-700 hover:to-indigo-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center"
            >
              <Merge className="w-4 h-4 mr-2" />
              Merge Selected ({selectedSubsections.length})
            </button>
          )}
          <button
            onClick={() => setEditingSectionId('new')}
            className="px-6 py-2.5 text-sm font-medium text-white bg-gradient-to-r from-indigo-500 to-blue-500 rounded-lg hover:from-indigo-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all flex items-center"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add Section
          </button>
        </div>
      </div>

      <div className="space-y-6">
        {track.sections.map((section) => (
          <div 
            key={section.id} 
            className={`
              p-6 rounded-xl shadow-lg transform hover:scale-[1.01] transition-all duration-300
              ${sectionTypeConfigs[section.type || 'program'].color}
              relative overflow-hidden backdrop-blur-sm
              border border-gray-100/20
            `}
          >
            <div className="absolute top-0 right-0 px-4 py-2 text-xs font-semibold uppercase tracking-wider text-white bg-gradient-to-r from-black/30 to-black/10 backdrop-blur-sm rounded-bl-lg">
              {sectionTypeConfigs[section.type || 'program'].label}
            </div>

            <div className="flex items-center justify-between">
              <h3 className="text-xl font-bold text-gray-800">{section.name}</h3>
              <div className="flex items-center space-x-6">
                <div className="flex items-center text-gray-700 bg-white/80 px-3 py-1.5 rounded-lg shadow-sm">
                  <Clock className="w-4 h-4 mr-2 text-indigo-500" />
                  <span className="font-medium">
                    {section.timeSlot.start} - {section.timeSlot.end}
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <button
                    onClick={() => setEditingSectionId(section.id)}
                    className="p-2 text-gray-600 hover:text-indigo-600 hover:bg-white/80 rounded-lg transition-colors"
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => deleteSection(track.id, section.id)}
                    className="p-2 text-gray-600 hover:text-red-600 hover:bg-white/80 rounded-lg transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                  <button
                    onClick={() => setAddingSubsectionTo({ sectionId: section.id, parentId: null })}
                    className="p-2 text-gray-600 hover:text-green-600 hover:bg-white/80 rounded-lg transition-colors"
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="flex items-center space-x-4 mt-3 text-gray-700">
              <div className="flex items-center bg-white/80 px-3 py-1.5 rounded-lg shadow-sm">
                <User className="w-4 h-4 mr-2 text-indigo-500" />
                <span className="font-medium">{section.speaker}</span>
                <span className="mx-2 text-gray-400">|</span>
                <span className="text-gray-600">{section.role}</span>
              </div>
            </div>

            {section.subsections.length > 0 && (
              <div className="mt-6 space-y-4 pl-4 border-l-2 border-indigo-100">
                {renderSubsections(section.subsections, section.id)}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Modals */}
      {editingSectionId && (
        <EditSectionModal
          isOpen={true}
          onClose={() => setEditingSectionId(null)}
          initialData={editingSectionId === 'new' ? undefined : track.sections.find(s => s.id === editingSectionId)}
          onSave={(data) => {
            if (editingSectionId === 'new') {
              addSection(track.id, data);
            } else {
              updateSection(track.id, editingSectionId, data);
            }
            setEditingSectionId(null);
          }}
        />
      )}
      {editingSubsectionId && (
        <EditSubsectionModal
          isOpen={true}
          onClose={() => setEditingSubsectionId(null)}
          initialData={track.sections.flatMap(s => s.subsections).find(s => s.id === editingSubsectionId)}
          onSave={(data) => {
            const sectionId = track.sections.find(s => 
              s.subsections.some(sub => sub.id === editingSubsectionId)
            )?.id;
            if (sectionId) {
              updateSubsection(track.id, sectionId, editingSubsectionId, data);
            }
          }}
        />
      )}
      {addingSubsectionTo && (
        <EditSubsectionModal
          isOpen={true}
          onClose={() => setAddingSubsectionTo(null)}
          onSave={(data) =>
            addSubsection(
              track.id,
              addingSubsectionTo.sectionId,
              addingSubsectionTo.parentId,
              data
            )
          }
        />
      )}
    </div>
  );
};

export default Timeline;