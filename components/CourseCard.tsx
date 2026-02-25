import React from 'react';
import { Link } from 'react-router-dom';
import { Course } from '../types';
import { Clock, Tag, PlayCircle, BookOpen } from 'lucide-react';

interface CourseCardProps {
    course: Course;
}

export const CourseCard: React.FC<CourseCardProps> = ({ course }) => {
    const isProfessional = course.track === 'professional';

    return (
        <div className="flex flex-col bg-white rounded-xl shadow-sm border border-neutral-200 overflow-hidden hover:shadow-md transition-shadow">
            {/* Hero Media */}
            <div className="relative h-48 bg-neutral-100 flex items-center justify-center overflow-hidden">
                {course.hero_media_url ? (
                    <img
                        src={course.hero_media_url}
                        alt={course.title}
                        className="w-full h-full object-cover"
                    />
                ) : (
                    <div className="text-neutral-400">
                        {isProfessional ? <BookOpen size={48} /> : <PlayCircle size={48} />}
                    </div>
                )}

                {/* Badges */}
                <div className="absolute top-4 left-4 flex flex-col gap-2 relative z-10">
                    <span className={`text-xs font-semibold px-2 py-1 rounded-full text-white ${isProfessional ? 'bg-neutral-900' : 'bg-rose-500'
                        }`}>
                        {course.track === 'professional' ? 'Professional Track' : 'Casual'}
                    </span>
                    <span className="text-xs font-medium px-2 py-1 rounded-full bg-white/90 text-neutral-800 backdrop-blur-sm shadow-sm inline-block self-start">
                        {course.delivery_mode.charAt(0).toUpperCase() + course.delivery_mode.slice(1)}
                    </span>
                </div>
            </div>

            <div className="flex flex-col flex-grow p-6">
                {/* Title */}
                <h3 className="text-xl font-bold text-neutral-900 mb-2 leading-tight">
                    {course.title}
                </h3>

                {/* Summary */}
                <p className="text-sm text-neutral-600 mb-6 line-clamp-2">
                    {course.short_summary || "Explore this course and level up your skills today."}
                </p>

                {/* Categories */}
                {course.category_tags && course.category_tags.length > 0 && (
                    <div className="flex items-center gap-2 mb-4 flex-wrap">
                        <Tag size={14} className="text-neutral-400" />
                        {course.category_tags.slice(0, 2).map((tag, idx) => (
                            <span key={idx} className="text-xs text-neutral-600 bg-neutral-100 px-2 py-0.5 rounded-full">
                                {tag}
                            </span>
                        ))}
                        {course.category_tags.length > 2 && (
                            <span className="text-xs text-neutral-400">+{course.category_tags.length - 2}</span>
                        )}
                    </div>
                )}

                <div className="mt-auto">
                    {/* Duration & Pricing Context */}
                    <div className="flex items-center justify-between py-4 border-t border-neutral-100">
                        <div className="flex items-center text-sm text-neutral-600">
                            <Clock size={16} className="mr-2" />
                            {course.duration_weeks ? `${course.duration_weeks} Weeks` :
                                course.duration_hours ? `${course.duration_hours} Hours` :
                                    'Self-paced'}
                        </div>

                        <div className="text-right">
                            {course.price_amount ? (
                                <span className="font-semibold text-neutral-900">
                                    ${course.price_amount.toLocaleString()}
                                </span>
                            ) : (
                                <span className="text-sm font-medium text-emerald-600">Free Variant</span>
                            )}
                        </div>
                    </div>

                    {/* CTA Button / Link */}
                    <Link
                        to={`/courses/${course.slug}`}
                        className={`w-full inline-flex items-center justify-center py-3 rounded-lg font-semibold transition-colors mt-2 text-center decoration-transparent ${isProfessional
                            ? 'bg-neutral-900 text-white hover:bg-neutral-800'
                            : 'bg-rose-50 text-rose-600 hover:bg-rose-100'
                            }`}
                    >
                        {isProfessional ? 'View Program' : 'View Details'}
                    </Link>
                </div>
            </div>
        </div>
    );
};
