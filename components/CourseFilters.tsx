import React from 'react';
import { CourseFilterState, CourseTrack, DeliveryMode, CourseKind } from '../types';

interface CourseFiltersProps {
    filters: CourseFilterState;
    onFilterChange: (newFilters: Partial<CourseFilterState>) => void;
}

export const CourseFilters: React.FC<CourseFiltersProps> = ({ filters, onFilterChange }) => {
    const isProfessional = filters.track === 'professional';

    // Dynamic filter options based on track
    const kindOptions: { value: CourseKind | 'all', label: string }[] = isProfessional
        ? [
            { value: 'all', label: 'All Programs' },
            { value: 'certification', label: 'Certifications' },
            { value: 'diploma', label: 'Diplomas' }
        ]
        : [
            { value: 'all', label: 'All Courses' },
            { value: 'workshop', label: 'Workshops' },
            { value: 'masterclass', label: 'Masterclasses' },
            { value: 'module', label: 'Modules' }
        ];

    const deliveryOptions: { value: DeliveryMode | 'all', label: string }[] = [
        { value: 'all', label: 'All Delivery' },
        { value: 'online', label: 'Online' },
        { value: 'hybrid', label: 'Hybrid' },
        { value: 'in-person', label: 'In-Person' }
    ];

    return (
        <div className="sticky top-0 z-40 bg-white/80 backdrop-blur-md border-b border-neutral-200 py-4 mb-8 -mx-4 px-4 sm:mx-0 sm:px-0">
            <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 py-2">

                {/* Results Counter / Current Selection context */}
                <div className="text-sm font-medium text-neutral-600">
                    Filter {isProfessional ? 'Professional Programs' : 'Casual Courses'}
                </div>

                {/* Filter Dropdowns */}
                <div className="flex flex-wrap gap-3 w-full sm:w-auto">

                    <select
                        className="px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-700 outline-none focus:ring-2 focus:ring-neutral-200 cursor-pointer"
                        value={filters.course_kind}
                        onChange={(e) => onFilterChange({ course_kind: e.target.value as CourseKind | 'all' })}
                    >
                        {kindOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

                    <select
                        className="px-3 py-2 bg-white border border-neutral-300 rounded-lg text-sm text-neutral-700 outline-none focus:ring-2 focus:ring-neutral-200 cursor-pointer"
                        value={filters.delivery_mode}
                        onChange={(e) => onFilterChange({ delivery_mode: e.target.value as DeliveryMode | 'all' })}
                    >
                        {deliveryOptions.map(opt => (
                            <option key={opt.value} value={opt.value}>{opt.label}</option>
                        ))}
                    </select>

                </div>
            </div>
        </div>
    );
};
