import React, { createContext, useContext, useState, ReactNode } from 'react';
import { Program, Track, Section, Subsection } from '../types';
import { v4 as uuidv4 } from 'uuid';

interface ProgramContextType {
  program: Program;
  addTrack: (track: Omit<Track, 'id' | 'sections'>) => void;
  updateTrack: (trackId: string, track: Partial<Track>) => void;
  deleteTrack: (trackId: string) => void;
  addSection: (trackId: string, section: Omit<Section, 'id' | 'subsections' | 'mergedFields'>) => void;
  updateSection: (trackId: string, sectionId: string, section: Partial<Section>) => void;
  deleteSection: (trackId: string, sectionId: string) => void;
  addSubsection: (trackId: string, sectionId: string, parentId: string | null, subsection: Omit<Subsection, 'id' | 'subsections' | 'mergedFields'>) => void;
  updateSubsection: (trackId: string, sectionId: string, subsectionId: string, subsection: Partial<Subsection>) => void;
  deleteSubsection: (trackId: string, sectionId: string, subsectionId: string) => void;
  mergeSubsections: (trackId: string, sectionId: string, subsectionIds: string[]) => void;
}

const ProgramContext = createContext<ProgramContextType | undefined>(undefined);

export const ProgramProvider: React.FC<{ children: ReactNode; initialData: Program }> = ({
  children,
  initialData,
}) => {
  const [program, setProgram] = useState<Program>(initialData);

  const addTrack = (track: Omit<Track, 'id' | 'sections'>) => {
    const newTrack: Track = {
      ...track,
      id: uuidv4(),
      sections: [],
    };
    setProgram((prev) => [...prev, newTrack]);
  };

  const updateTrack = (trackId: string, track: Partial<Track>) => {
    setProgram((prev) =>
      prev.map((t) => (t.id === trackId ? { ...t, ...track } : t))
    );
  };

  const deleteTrack = (trackId: string) => {
    setProgram((prev) => prev.filter((t) => t.id !== trackId));
  };

  const addSection = (
    trackId: string,
    section: Omit<Section, 'id' | 'subsections' | 'mergedFields'>
  ) => {
    const newSection: Section = {
      ...section,
      type: section.type || 'program',
      id: uuidv4(),
      subsections: [],
      mergedFields: {
        speaker: false,
        role: false,
        timeSlot: false,
      },
    };
    setProgram((prev) =>
      prev.map((track) =>
        track.id === trackId
          ? { ...track, sections: [...track.sections, newSection] }
          : track
      )
    );
  };

  const updateSection = (
    trackId: string,
    sectionId: string,
    section: Partial<Section>
  ) => {
    setProgram((prev) =>
      prev.map((track) =>
        track.id === trackId
          ? {
              ...track,
              sections: track.sections.map((s) =>
                s.id === sectionId ? { ...s, ...section } : s
              ),
            }
          : track
      )
    );
  };

  const deleteSection = (trackId: string, sectionId: string) => {
    setProgram((prev) =>
      prev.map((track) =>
        track.id === trackId
          ? {
              ...track,
              sections: track.sections.filter((s) => s.id !== sectionId),
            }
          : track
      )
    );
  };

  const addSubsection = (
    trackId: string,
    sectionId: string,
    parentId: string | null,
    subsection: Omit<Subsection, 'id' | 'subsections' | 'mergedFields'>
  ) => {
    const newSubsection: Subsection = {
      ...subsection,
      id: uuidv4(),
      subsections: [],
      mergedFields: {
        speaker: false,
        role: false,
        timeSlot: false,
      },
    };

    const addSubsectionToParent = (
      subsections: Subsection[],
      parentId: string | null,
      newSubsection: Subsection
    ): Subsection[] => {
      if (!parentId) return [...subsections, newSubsection];

      return subsections.map((sub) => {
        if (sub.id === parentId) {
          return {
            ...sub,
            subsections: [...sub.subsections, newSubsection],
          };
        }
        return {
          ...sub,
          subsections: addSubsectionToParent(
            sub.subsections,
            parentId,
            newSubsection
          ),
        };
      });
    };

    setProgram((prev) =>
      prev.map((track) =>
        track.id === trackId
          ? {
              ...track,
              sections: track.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      subsections: addSubsectionToParent(
                        section.subsections,
                        parentId,
                        newSubsection
                      ),
                    }
                  : section
              ),
            }
          : track
      )
    );
  };

  const updateSubsection = (
    trackId: string,
    sectionId: string,
    subsectionId: string,
    subsection: Partial<Subsection>
  ) => {
    const updateSubsectionInTree = (
      subsections: Subsection[],
      subsectionId: string,
      updates: Partial<Subsection>
    ): Subsection[] => {
      return subsections.map((sub) => {
        if (sub.id === subsectionId) {
          return { ...sub, ...updates };
        }
        return {
          ...sub,
          subsections: updateSubsectionInTree(
            sub.subsections,
            subsectionId,
            updates
          ),
        };
      });
    };

    setProgram((prev) =>
      prev.map((track) =>
        track.id === trackId
          ? {
              ...track,
              sections: track.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      subsections: updateSubsectionInTree(
                        section.subsections,
                        subsectionId,
                        subsection
                      ),
                    }
                  : section
              ),
            }
          : track
      )
    );
  };

  const deleteSubsection = (
    trackId: string,
    sectionId: string,
    subsectionId: string
  ) => {
    const deleteSubsectionFromTree = (
      subsections: Subsection[],
      subsectionId: string
    ): Subsection[] => {
      return subsections
        .filter((sub) => sub.id !== subsectionId)
        .map((sub) => ({
          ...sub,
          subsections: deleteSubsectionFromTree(sub.subsections, subsectionId),
        }));
    };

    setProgram((prev) =>
      prev.map((track) =>
        track.id === trackId
          ? {
              ...track,
              sections: track.sections.map((section) =>
                section.id === sectionId
                  ? {
                      ...section,
                      subsections: deleteSubsectionFromTree(
                        section.subsections,
                        subsectionId
                      ),
                    }
                  : section
              ),
            }
          : track
      )
    );
  };

  const mergeSubsections = (trackId: string, sectionId: string, subsectionIds: string[]) => {
    setProgram((prev) =>
      prev.map((track) => {
        if (track.id === trackId) {
          return {
            ...track,
            sections: track.sections.map((section) => {
              if (section.id === sectionId) {
                const subsectionsToMerge = findSubsectionsById(section.subsections, subsectionIds);
                const mergedSubsection = createMergedSubsection(subsectionsToMerge);
                const remainingSubsections = removeSubsectionsById(
                  section.subsections,
                  subsectionIds
                );

                return {
                  ...section,
                  subsections: [...remainingSubsections, mergedSubsection],
                };
              }
              return section;
            }),
          };
        }
        return track;
      })
    );
  };

  const findSubsectionsById = (
    subsections: Subsection[],
    ids: string[]
  ): Subsection[] => {
    const result: Subsection[] = [];
    const searchInSubsections = (subs: Subsection[]) => {
      subs.forEach((sub) => {
        if (ids.includes(sub.id)) {
          result.push(sub);
        }
        searchInSubsections(sub.subsections);
      });
    };
    searchInSubsections(subsections);
    return result;
  };

  const removeSubsectionsById = (
    subsections: Subsection[],
    ids: string[]
  ): Subsection[] => {
    return subsections
      .filter((sub) => !ids.includes(sub.id))
      .map((sub) => ({
        ...sub,
        subsections: removeSubsectionsById(sub.subsections, ids),
      }));
  };

  const createMergedSubsection = (subsections: Subsection[]): Subsection => {
    const timeSlots = subsections.map((sub) => sub.timeSlot);
    const startTimes = timeSlots.map((slot) => slot.start);
    const endTimes = timeSlots.map((slot) => slot.end);

    return {
      id: uuidv4(),
      name: `Merged: ${subsections.map((sub) => sub.name).join(' + ')}`,
      timeSlot: {
        start: startTimes.sort()[0],
        end: endTimes.sort()[endTimes.length - 1],
      },
      speaker: subsections[0].speaker,
      role: subsections[0].role,
      subsections: [],
      mergedFields: {
        speaker: true,
        role: true,
        timeSlot: true,
      },
    };
  };

  return (
    <ProgramContext.Provider
      value={{
        program,
        addTrack,
        updateTrack,
        deleteTrack,
        addSection,
        updateSection,
        deleteSection,
        addSubsection,
        updateSubsection,
        deleteSubsection,
        mergeSubsections,
      }}
    >
      {children}
    </ProgramContext.Provider>
  );
};

export const useProgram = () => {
  const context = useContext(ProgramContext);
  if (context === undefined) {
    throw new Error('useProgram must be used within a ProgramProvider');
  }
  return context;
};