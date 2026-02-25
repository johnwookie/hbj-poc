import React from 'react';
import { Course } from '../types';
import { CheckCircle2, ShieldAlert } from 'lucide-react';

interface PricingBoxProps {
    course: Course;
}

export const PricingBox: React.FC<PricingBoxProps> = ({ course }) => {
    const isProfessional = course.track === 'professional';

    return (
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden flex flex-col h-full">
            {/* Box Header */}
            <div className={`p-6 text-center text-white ${isProfessional ? 'bg-neutral-900' : 'bg-rose-500'}`}>
                <h3 className="text-sm font-bold uppercase tracking-widest mb-2 opacity-90">Program Investment</h3>

                {course.price_total ? (
                    <div className="flex justify-center items-start gap-1">
                        <span className="text-xl mt-1 opacity-90">{course.currency || '$'}</span>
                        <span className="text-5xl font-serif">{course.price_total.toLocaleString()}</span>
                    </div>
                ) : (
                    <span className="text-3xl font-serif">Free Overview</span>
                )}
            </div>

            {/* Box Body Details */}
            <div className="p-6 md:p-8 flex flex-col flex-grow bg-neutral-50/50">

                {/* Payment Options Context */}
                {course.payment_options && (
                    <div className="mb-6 pb-6 border-b border-neutral-100">
                        <h4 className="text-sm font-bold text-neutral-900 mb-2 uppercase tracking-wide">Financing Available</h4>
                        <p className="text-sm text-neutral-600 leading-relaxed">
                            {course.payment_options}
                        </p>
                    </div>
                )}

                {/* Fees / Deposit Context */}
                {(course.deposit_required || course.application_fee) && (
                    <ul className="space-y-3 mb-6 pb-6 border-b border-neutral-100">
                        {course.application_fee && (
                            <li className="flex items-start gap-3 text-sm text-neutral-700">
                                <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Non-refundable Application Fee:</strong> ${course.application_fee.toLocaleString()} (Applied to total if accepted)
                                </span>
                            </li>
                        )}
                        {course.deposit_required && (
                            <li className="flex items-start gap-3 text-sm text-neutral-700">
                                <CheckCircle2 size={18} className="text-emerald-500 flex-shrink-0 mt-0.5" />
                                <span>
                                    <strong>Required Deposit:</strong> ${course.deposit_required.toLocaleString()} to secure your cohort seat.
                                </span>
                            </li>
                        )}
                    </ul>
                )}

                {/* Refund Policy Short Text */}
                {course.refund_policy_text && (
                    <div className="mt-auto bg-white border border-neutral-100 rounded-xl p-4 flex items-start gap-3">
                        <ShieldAlert size={18} className="text-neutral-400 flex-shrink-0 mt-0.5" />
                        <p className="text-xs text-neutral-500 leading-relaxed">
                            {course.refund_policy_text}
                        </p>
                    </div>
                )}

            </div>
        </div>
    );
};
