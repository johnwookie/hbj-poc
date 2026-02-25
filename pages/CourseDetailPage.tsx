import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { fetchCourseBySlug } from '../lib/supabase-queries';
import { Course, Module, Lesson, Cohort } from '../types';
import { BadgeRow } from '../components/BadgeRow';
import { CurriculumAccordion } from '../components/CurriculumAccordion';
import { PricingBox } from '../components/PricingBox';
import { ArrowRight, ChevronDown, CheckCircle2 } from 'lucide-react';

const CourseDetailPage: React.FC = () => {
    const { slug } = useParams<{ slug: string }>();
    const navigate = useNavigate();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [course, setCourse] = useState<Course | null>(null);
    const [cohorts, setCohorts] = useState<Cohort[]>([]);
    const [modules, setModules] = useState<Module[]>([]);
    const [lessons, setLessons] = useState<Lesson[]>([]);

    useEffect(() => {
        async function loadCourseData() {
            if (!slug) return;
            try {
                setLoading(true);
                const data = await fetchCourseBySlug(null, slug); // Pass null for mock client

                if (!data.course || !data.course.is_published || data.course.deleted_at) {
                    setError('Course not found or is no longer available.');
                    return;
                }

                // Set document title for basic SEO
                document.title = `${data.course.title} | HBJ Academy`;

                setCourse(data.course);
                setCohorts(data.cohorts);
                setModules(data.modules);
                setLessons(data.lessons);
            } catch (err) {
                console.error(err);
                setError('Failed to load course details.');
            } finally {
                setLoading(false);
            }
        }

        loadCourseData();

        // Cleanup title on unmount
        return () => { document.title = 'HBJ Academy'; };
    }, [slug]);

    // CTA Routing Logic
    const handlePrimaryCTA = () => {
        if (!course) return;

        // Professional Track -> /apply
        if (course.track === 'professional' || course.course_kind === 'certification' || course.course_kind === 'diploma') {
            navigate(`/apply?course=${course.slug}`);
        }
        // Casual / Online -> /checkout
        else {
            navigate(`/checkout?course=${course.slug}`);
        }
    };

    const getCTAText = () => {
        if (!course) return 'Enroll Now';
        if (course.track === 'professional' || course.course_kind === 'certification') return 'Apply Now';
        if (course.delivery_mode === 'online') return 'Start Learning Now';
        return 'Enroll Now';
    };

    // Parsing "What You'll Learn" from description
    // Note: Fallback to placeholder if full_description is missing or short
    const parseLearningPoints = (desc: string | null | undefined): string[] => {
        if (!desc) return [
            "Master advanced clinical protocols safely.",
            "Understand the science behind top-tier efficacy.",
            "Integrate Korean aesthetic principles into daily practice."
        ];
        // Very primitive parsing mock: split by newlines or markers
        const points = desc.split('\n').filter(line => line.trim().startsWith('-'));
        if (points.length > 0) return points.map(p => p.replace('-', '').trim());
        return [
            "Master advanced clinical protocols safely.",
            "Understand the science behind top-tier efficacy.",
            "Integrate Korean aesthetic principles into daily practice."
        ];
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-white">
                <div className="animate-pulse space-y-4 text-center">
                    <div className="h-4 bg-neutral-200 rounded w-48 mx-auto"></div>
                    <div className="h-8 bg-neutral-200 rounded w-64 mx-auto"></div>
                </div>
            </div>
        );
    }

    if (error || !course) {
        return (
            <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-50 px-4 text-center">
                <h1 className="font-serif text-4xl text-neutral-900 mb-4">Program Unavailable</h1>
                <p className="text-neutral-600 mb-8">{error || "We couldn't find the requested course."}</p>
                <Link
                    to="/courses"
                    className="px-6 py-3 bg-neutral-900 text-white rounded-lg font-semibold hover:bg-neutral-800 transition-colors"
                >
                    Back to Courses
                </Link>
            </div>
        );
    }

    const learningPoints = parseLearningPoints(course.full_description);
    const activeCohort = cohorts.find(c => new Date(c.end_date) > new Date());

    return (
        <div className="bg-white min-h-screen pb-24 relative">

            {/* 1. Split Hero (Above the Fold) */}
            <section className="bg-neutral-50 px-4 py-16 lg:py-24 border-b border-neutral-200 overflow-hidden">
                <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-20 items-center">

                    <div className="w-full lg:w-1/2 flex flex-col items-start z-10">
                        <BadgeRow
                            track={course.track}
                            deliveryMode={course.delivery_mode}
                            courseKind={course.course_kind}
                            className="mb-6"
                        />

                        <h1 className="text-4xl lg:text-5xl xl:text-6xl font-black text-neutral-900 leading-tight mb-6">
                            {course.title}
                        </h1>

                        <p className="text-lg text-neutral-600 leading-relaxed mb-8 max-w-xl">
                            {course.short_summary}
                        </p>

                        {/* Cohort Availability (Professional) */}
                        {course.track === 'professional' && activeCohort && (
                            <div className="bg-white border border-neutral-200 rounded-xl p-4 mb-8 w-full max-w-md shadow-sm">
                                <div className="flex justify-between items-center mb-2">
                                    <span className="text-xs font-bold uppercase tracking-wider text-rose-600">Next Cohort Start</span>
                                    <span className="text-sm font-semibold text-neutral-900">
                                        {new Date(activeCohort.start_date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                                    </span>
                                </div>
                                <div className="w-full bg-neutral-100 rounded-full h-1.5 mb-2">
                                    <div
                                        className="bg-neutral-900 h-1.5 rounded-full"
                                        style={{ width: `${(activeCohort.seats_filled / activeCohort.seats_total) * 100}%` }}
                                    ></div>
                                </div>
                                <div className="flex justify-between text-xs font-medium text-neutral-500">
                                    <span>Seats Filling Fast</span>
                                    <span>{activeCohort.seats_total - activeCohort.seats_filled} seats left</span>
                                </div>
                            </div>
                        )}

                        <button
                            onClick={handlePrimaryCTA}
                            className={`px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 transition-colors w-full sm:w-auto shadow-sm text-lg ${course.track === 'professional' ? 'bg-neutral-900 text-white hover:bg-neutral-800' : 'bg-rose-50 text-rose-700 hover:bg-rose-100'
                                }`}
                        >
                            {getCTAText()} <ArrowRight size={20} />
                        </button>
                    </div>

                    <div className="w-full lg:w-1/2 relative h-[400px] lg:h-[600px] rounded-3xl overflow-hidden bg-neutral-200 shadow-xl">
                        {course.hero_media_url ? (
                            <img
                                src={course.hero_media_url}
                                alt={course.title}
                                className="w-full h-full object-cover"
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center font-serif text-3xl text-neutral-400">
                                Media Placeholder
                            </div>
                        )}
                    </div>
                </div>
            </section>

            {/* 2. Social Proof Band (Placeholder) */}
            <section className="border-b border-neutral-100 py-12 px-4 bg-white">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-8">
                    <div className="flex items-center gap-4">
                        <div className="text-4xl font-black text-neutral-900">4.9</div>
                        <div className="flex flex-col">
                            <div className="flex gap-1 text-[#FEDCD0] mb-0.5">
                                ★★★★★
                            </div>
                            <span className="text-xs font-bold uppercase tracking-wider text-neutral-400">Average Review</span>
                        </div>
                    </div>

                    <div className="flex flex-1 overflow-hidden gap-6 px-4">
                        <div className="bg-neutral-50 rounded-xl p-4 flex-1 border border-neutral-100 hidden md:block">
                            <p className="text-sm italic text-neutral-600">"This course completely transformed my clinical approach. The protocols are unmatched."</p>
                            <p className="text-xs font-bold text-neutral-900 mt-2">— Sarah K., RN</p>
                        </div>
                        <div className="bg-neutral-50 rounded-xl p-4 flex-1 border border-neutral-100 hidden lg:block">
                            <p className="text-sm italic text-neutral-600">"The depth of scientific explanation behind the skincare formulations was exactly what I needed."</p>
                            <p className="text-xs font-bold text-neutral-900 mt-2">— Dr. Lee</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Content Layout */}
            <main className="max-w-7xl mx-auto px-4 py-16 lg:py-24 grid grid-cols-1 lg:grid-cols-12 gap-16 relative">

                {/* Left Column: Content */}
                <div className="lg:col-span-8 space-y-20">

                    {/* 3. Transformation / What You'll Learn */}
                    <section>
                        <h2 className="font-serif text-3xl text-neutral-900 mb-8">What You'll Learn</h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {learningPoints.map((point, idx) => (
                                <div key={idx} className="flex items-start gap-3">
                                    <CheckCircle2 size={24} className="text-[#FEDCD0] flex-shrink-0" />
                                    <p className="text-neutral-700 leading-relaxed font-medium">{point}</p>
                                </div>
                            ))}
                        </div>
                    </section>

                    {/* 4. Curriculum Accordion */}
                    <section>
                        <CurriculumAccordion modules={modules} lessons={lessons} />
                    </section>

                    {/* 5. Internship / Job Outcomes (Pro Only) */}
                    {course.internship_details && (
                        <section className="bg-neutral-50 rounded-3xl p-8 lg:p-12 border border-neutral-200">
                            <h2 className="font-serif text-2xl text-neutral-900 mb-4">Post-Graduate Opportunities</h2>
                            <div className="prose prose-neutral">
                                <p className="text-neutral-700 leading-relaxed">
                                    {course.internship_details}
                                </p>
                            </div>
                        </section>
                    )}

                    {/* 6. Instructor Bio */}
                    <section className="flex flex-col sm:flex-row gap-8 items-start pt-16 border-t border-neutral-200">
                        <div className="w-24 h-24 rounded-full bg-neutral-200 flex-shrink-0 overflow-hidden">
                            <img src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80" alt="Instructor" className="w-full h-full object-cover mix-blend-luminosity" />
                        </div>
                        <div>
                            <h3 className="font-serif text-2xl text-neutral-900 mb-1">Dr. Jane Doe</h3>
                            <p className="text-sm font-bold text-rose-600 uppercase tracking-widest mb-4">Lead Educator & Founder</p>
                            <p className="text-neutral-600 leading-relaxed max-w-2xl">
                                Dr. Doe brings over 15 years of clinical experience in Seoul and New York. Having pioneered advanced injection protocols and curated bespoke skincare lines, she now dedicates her expertise to shaping the next generation of top-tier aestheticians.
                            </p>
                        </div>
                    </section>

                    {/* 8. FAQs */}
                    <section className="pt-16 border-t border-neutral-200">
                        <h2 className="font-serif text-3xl text-neutral-900 mb-8">Frequently Asked Questions</h2>
                        <div className="space-y-4">
                            {[1, 2, 3].map(i => (
                                <div key={i} className="border border-neutral-200 rounded-xl p-6 hover:border-neutral-300 transition-colors">
                                    <div className="flex justify-between items-center cursor-pointer">
                                        <h4 className="font-bold text-neutral-900">What are the prerequisites for this course?</h4>
                                        <ChevronDown size={20} className="text-neutral-400" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>
                </div>

                {/* Right Column: Sticky Pricing */}
                <div className="lg:col-span-4 relative">
                    <div className="sticky top-24">
                        {/* 7. Pricing Box */}
                        <PricingBox course={course} />

                        <div className="mt-6">
                            <button
                                onClick={handlePrimaryCTA}
                                className="w-full px-8 py-5 rounded-xl font-bold flex items-center justify-center gap-3 bg-neutral-900 text-white hover:bg-neutral-800 transition-colors shadow-lg shadow-neutral-900/10 text-lg"
                            >
                                {getCTAText()} <ArrowRight size={20} />
                            </button>
                            <p className="text-center text-xs text-neutral-400 mt-3 font-medium flex items-center justify-center gap-2">
                                Secure SSL Encrypted Checkout
                            </p>
                        </div>
                    </div>
                </div>

            </main>

            {/* Mobile Sticky CTA */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full bg-white border-t border-neutral-200 p-4 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
                <button
                    onClick={handlePrimaryCTA}
                    className="w-full px-8 py-4 rounded-xl font-bold flex items-center justify-center gap-3 bg-neutral-900 text-white shadow-lg text-lg"
                >
                    {getCTAText()}
                </button>
            </div>

        </div>
    );
};

export default CourseDetailPage;
