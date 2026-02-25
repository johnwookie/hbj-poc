import React from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';

const ApplyPage: React.FC = () => {
    const [searchParams] = useSearchParams();
    const courseSlug = searchParams.get('course') || 'a-program';

    return (
        <div className="bg-neutral-50 min-h-screen py-24 flex flex-col items-center justify-center px-4">
            <div className="text-center max-w-lg mb-8">
                <h1 className="font-serif text-3xl md:text-4xl text-neutral-900 mb-4">Application Form</h1>
                <p className="text-neutral-600">
                    You are applying for the <span className="font-bold text-rose-600">{courseSlug.replace(/-/g, ' ')}</span> cohort.
                </p>
            </div>

            <div className="bg-white p-8 rounded-2xl border border-neutral-200 shadow-sm w-full max-w-lg text-center">
                <p className="text-sm text-neutral-500 mb-6 italic">
                    [Placeholder: Complex multi-step application logic, CV upload, and pre-requisite questionnaires will go here.]
                </p>

                <Link
                    to={`/courses/${courseSlug}`}
                    className="inline-flex items-center text-sm font-semibold text-neutral-900 hover:text-rose-600 transition-colors"
                >
                    <ArrowLeft size={16} className="mr-2" /> Back to Course
                </Link>
            </div>
        </div>
    );
};

export default ApplyPage;
