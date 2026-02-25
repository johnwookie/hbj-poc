import React, { useState, useMemo } from 'react';
import { CourseFilters } from '../components/CourseFilters';
import { CourseCard } from '../components/CourseCard';
import { Course, CourseFilterState, CourseTrack } from '../types';

// MOCK DATA for layout testing
const MOCK_COURSES: Course[] = [
    {
        id: '1',
        title: 'Advanced Aesthetic Injectables',
        slug: 'advanced-aesthetic-injectables',
        short_summary: 'Master the art of dermal fillers and advanced neurotoxin applications for full-face rejuvenation.',
        hero_media_url: 'https://images.unsplash.com/photo-1614859324967-bdf8f2df5360?auto=format&fit=crop&q=80',
        track: 'professional',
        course_kind: 'certification',
        delivery_mode: 'hybrid',
        duration_weeks: 12,
        duration_hours: null,
        price_amount: 4500,
        has_active_cohort: true,
        category_tags: ['Injectables', 'Anti-Aging', 'Hands-on']
    },
    {
        id: '2',
        title: 'Laser Safety & Physics Core',
        slug: 'laser-safety-and-physics-core',
        short_summary: 'Essential physics, tissue interaction, and safety protocols for modern class IV aesthetic lasers.',
        hero_media_url: null,
        track: 'professional',
        course_kind: 'diploma',
        delivery_mode: 'online',
        duration_weeks: 8,
        duration_hours: null,
        price_amount: 2100,
        has_active_cohort: false,
        category_tags: ['Laser', 'Safety']
    },
    {
        id: '3',
        title: 'Gua Sha Fundamentals',
        slug: 'gua-sha-fundamentals',
        short_summary: 'Learn traditional Eastern facial massage techniques to lift, tone, and depuff at home.',
        hero_media_url: 'https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?auto=format&fit=crop&q=80',
        track: 'casual',
        course_kind: 'workshop',
        delivery_mode: 'online',
        duration_weeks: null,
        duration_hours: 2,
        price_amount: 49,
        has_active_cohort: false,
        category_tags: ['Holistic', 'At-Home']
    }
];

export const CourseListPage: React.FC = () => {
    const [filters, setFilters] = useState<CourseFilterState>({
        track: 'professional',
        course_kind: 'all',
        delivery_mode: 'all',
        category: 'all'
    });

    const handleTrackChange = (track: CourseTrack) => {
        setFilters({
            track,
            course_kind: 'all',
            delivery_mode: 'all',
            category: 'all'
        });
    };

    const handleFilterChange = (newFilters: Partial<CourseFilterState>) => {
        setFilters(prev => ({ ...prev, ...newFilters }));
    };

    // derived state for cohorts banner
    const hasActiveProfessionalCohorts = useMemo(() => {
        return MOCK_COURSES.some(c => c.track === 'professional' && c.has_active_cohort);
    }, []);

    // Filtered courses based on current state
    const displayedCourses = useMemo(() => {
        return MOCK_COURSES.filter(course => {
            if (course.track !== filters.track) return false;
            if (filters.course_kind !== 'all' && course.course_kind !== filters.course_kind) return false;
            if (filters.delivery_mode !== 'all' && course.delivery_mode !== filters.delivery_mode) return false;
            // Add category filtering if needed
            return true;
        });
    }, [filters]);

    return (
        <div className="min-h-screen bg-neutral-50 font-sans pb-24">
            {/* A. Hero Section & Global Toggle */}
            <section className="bg-white pt-20 pb-12 border-b border-neutral-200">
                <div className="max-w-7xl mx-auto px-4 text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-neutral-900 tracking-tight mb-4">
                        Our Programs
                    </h1>
                    <p className="text-lg text-neutral-600 max-w-2xl mx-auto mb-10 text-balance">
                        Whether you are launching a clinical career or perfecting your personal routine, we have a path for you.
                    </p>

                    {/* Global Track Toggle */}
                    <div className="inline-flex bg-neutral-100 p-1 rounded-xl shadow-inner">
                        <button
                            onClick={() => handleTrackChange('professional')}
                            className={`px-6 md:px-8 py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${filters.track === 'professional'
                                    ? 'bg-white text-neutral-900 shadow-sm'
                                    : 'text-neutral-500 hover:text-neutral-700'
                                }`}
                        >
                            Professional Career Tracks
                        </button>
                        <button
                            onClick={() => handleTrackChange('casual')}
                            className={`px-6 md:px-8 py-3 rounded-lg text-sm md:text-base font-semibold transition-all ${filters.track === 'casual'
                                    ? 'bg-rose-50 text-rose-700 shadow-sm'
                                    : 'text-neutral-500 hover:text-neutral-700'
                                }`}
                        >
                            Casual Modules & Workshops
                        </button>
                    </div>
                </div>
            </section>

            {/* C. Active Cohort Banner (Conditional) */}
            {filters.track === 'professional' && hasActiveProfessionalCohorts && (
                <div className="bg-neutral-900 text-white py-3 text-center px-4 font-medium text-sm tracking-wide">
                    Winter 2026 Cohorts Enrolling Now — Limited Seats Available
                </div>
            )}

            {/* Main Content Area */}
            <main className="max-w-7xl mx-auto px-4 mt-8">

                {/* B. Sticky Filter Ribbon */}
                <CourseFilters
                    filters={filters}
                    onFilterChange={handleFilterChange}
                />

                {/* D. Course Grid */}
                {displayedCourses.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {displayedCourses.map(course => (
                            <CourseCard key={course.id} course={course} />
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-2xl border border-neutral-200 mt-6">
                        <h3 className="text-xl font-bold text-neutral-900 mb-2">No programs found</h3>
                        <p className="text-neutral-600">Try adjusting your filters to see more results.</p>
                        <button
                            onClick={() => handleTrackChange(filters.track)}
                            className="mt-4 text-sm font-semibold text-neutral-900 underline"
                        >
                            Clear filters
                        </button>
                    </div>
                )}

            </main>

            {/* E. Trust Section Placeholder */}
            <section className="max-w-7xl mx-auto px-4 mt-24">
                <div className="bg-neutral-900 rounded-3xl p-12 text-center text-white">
                    <h2 className="text-3xl font-bold mb-6">Trusted by the Industry's Best</h2>
                    <p className="text-neutral-400 max-w-2xl mx-auto mb-8">
                        [Placeholder: Testimonials slider or alumni stats will go here. E.g. "98% of our certification graduates open their own practice within 12 months."]
                    </p>
                    <div className="flex justify-center gap-8 opacity-50 grayscale">
                        {/* Logos placeholder */}
                        <div className="h-8 w-24 bg-white/20 rounded"></div>
                        <div className="h-8 w-24 bg-white/20 rounded"></div>
                        <div className="h-8 w-24 bg-white/20 rounded"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default CourseListPage;
