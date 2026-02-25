import React from 'react';
import { CourseTrack, DeliveryMode, CourseKind } from '../types';

interface BadgeRowProps {
    track: CourseTrack;
    deliveryMode: DeliveryMode;
    courseKind: CourseKind;
    className?: string;
}

export const BadgeRow: React.FC<BadgeRowProps> = ({ track, deliveryMode, courseKind, className = '' }) => {
    const isProfessional = track === 'professional';

    return (
        <div className={`flex flex-wrap items-center gap-2 ${className}`}>
            {/* Track Badge */}
            <span className={`text-xs font-bold px-2.5 py-1 rounded-full text-white ${isProfessional ? 'bg-neutral-900' : 'bg-rose-500'
                }`}>
                {isProfessional ? 'Professional' : 'Casual'}
            </span>

            {/* Kind Badge */}
            <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 uppercase tracking-wide">
                {courseKind}
            </span>

            {/* Delivery Mode Badge */}
            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-white text-neutral-600 border border-neutral-200">
                {deliveryMode.charAt(0).toUpperCase() + deliveryMode.slice(1)}
            </span>
        </div>
    );
};
