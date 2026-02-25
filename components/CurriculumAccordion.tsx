import React, { useState } from 'react';
import { Module, Lesson } from '../types';
import { ChevronDown, ChevronUp, PlayCircle } from 'lucide-react';

interface CurriculumAccordionProps {
    modules: Module[];
    lessons: Lesson[];
}

export const CurriculumAccordion: React.FC<CurriculumAccordionProps> = ({ modules, lessons }) => {
    const [openModuleIds, setOpenModuleIds] = useState<Set<string>>(new Set());

    const toggleModule = (moduleId: string) => {
        setOpenModuleIds(prev => {
            const newSet = new Set(prev);
            if (newSet.has(moduleId)) {
                newSet.delete(moduleId);
            } else {
                newSet.add(moduleId);
            }
            return newSet;
        });
    };

    const expandAll = () => {
        setOpenModuleIds(new Set(modules.map(m => m.id)));
    };

    const collapseAll = () => {
        setOpenModuleIds(new Set());
    };

    return (
        <div className="w-full">
            {/* Summary Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-4 border-b border-neutral-100">
                <h2 className="font-serif text-2xl text-neutral-900 mb-2 sm:mb-0">Curriculum</h2>

                <div className="flex items-center justify-between sm:justify-end gap-6 text-sm">
                    <span className="text-neutral-600 font-medium">
                        {modules.length} Module{modules.length !== 1 ? 's' : ''} &bull; {lessons.length} Lesson{lessons.length !== 1 ? 's' : ''}
                    </span>
                    <div className="flex gap-3">
                        <button onClick={expandAll} className="text-neutral-500 hover:text-neutral-900 font-medium transition-colors">Expand All</button>
                        <button onClick={collapseAll} className="text-neutral-500 hover:text-neutral-900 font-medium transition-colors">Collapse All</button>
                    </div>
                </div>
            </div>

            {/* Accordions */}
            <div className="flex flex-col gap-3">
                {modules.map((moduleItem, index) => {
                    const isOpen = openModuleIds.has(moduleItem.id);
                    const moduleLessons = lessons.filter(l => l.module_id === moduleItem.id);

                    return (
                        <div key={moduleItem.id} className="border border-neutral-200 rounded-xl overflow-hidden bg-white shadow-sm">
                            <button
                                onClick={() => toggleModule(moduleItem.id)}
                                className="w-full flex items-center justify-between p-5 text-left bg-white hover:bg-neutral-50 transition-colors"
                                aria-expanded={isOpen}
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold text-neutral-400 uppercase tracking-widest mb-1">
                                        Module {index + 1}
                                    </span>
                                    <span className="font-bold text-neutral-900 text-lg">
                                        {moduleItem.title}
                                    </span>
                                </div>

                                <div className="flex items-center gap-4 text-neutral-400">
                                    <span className="text-sm font-medium hidden sm:inline-block">
                                        {moduleLessons.length} lessons
                                    </span>
                                    <div className={`p-2 rounded-full ${isOpen ? 'bg-[#FEDCD0]/30 text-rose-600' : 'bg-neutral-100'}`}>
                                        {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                                    </div>
                                </div>
                            </button>

                            {isOpen && (
                                <div className="border-t border-neutral-100 bg-neutral-50 p-2">
                                    <ul className="flex flex-col">
                                        {moduleLessons.map((lesson) => (
                                            <li key={lesson.id} className="flex items-center gap-4 py-3 px-4 text-neutral-700 hover:bg-white hover:shadow-sm rounded-lg transition-all group">
                                                <PlayCircle size={18} className="text-neutral-300 group-hover:text-rose-500 transition-colors flex-shrink-0" />
                                                <span className="text-sm font-medium group-hover:text-neutral-900">{lesson.title}</span>
                                                {/* Note: URL strictly omitted. Enrollment state needed to unlock playback. */}
                                            </li>
                                        ))}
                                        {moduleLessons.length === 0 && (
                                            <li className="text-sm text-neutral-400 italic py-3 px-4">Lessons coming soon...</li>
                                        )}
                                    </ul>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
};
