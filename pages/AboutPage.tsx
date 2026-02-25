import React from 'react';
import { Target, Heart, Award } from 'lucide-react';

const AboutPage: React.FC = () => {
    return (
        <div className="bg-white min-h-screen">
            {/* Header Section */}
            <section className="bg-neutral-50 py-24 px-4 text-center border-b border-neutral-100">
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-neutral-900 mb-6 tracking-tight">
                    About HBJ Academy
                </h1>
                <p className="text-lg text-neutral-600 max-w-2xl mx-auto leading-relaxed">
                    [Mission Placeholder: We believe in elevating the standard of global aesthetics through rigorous, science-backed education rooted in Korean skincare innovation. Our mission is to empower practitioners and enthusiasts with knowledge that transforms skin and lives.]
                </p>
            </section>

            {/* Values / Pillars Section */}
            <section className="py-24 px-4 max-w-7xl mx-auto">
                <div className="text-center mb-16">
                    <h2 className="font-serif text-3xl text-neutral-900 mb-4">Our Pillars of Excellence</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                    {/* Pillar 1 */}
                    <div className="text-center group">
                        <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 text-neutral-900 group-hover:bg-[#FEDCD0] transition-colors">
                            <Target size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">Clinical Precision</h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Every technique is grounded in anatomical science and proven protocols to ensure safety and superior results.
                        </p>
                    </div>

                    {/* Pillar 2 */}
                    <div className="text-center group">
                        <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 text-neutral-900 group-hover:bg-[#FEDCD0] transition-colors">
                            <Heart size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">Holistic Care</h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            We look beyond the surface, blending external treatments with internal wellness strategies for true longevity.
                        </p>
                    </div>

                    {/* Pillar 3 */}
                    <div className="text-center group">
                        <div className="mx-auto w-16 h-16 bg-neutral-100 rounded-2xl flex items-center justify-center mb-6 text-neutral-900 group-hover:bg-[#FEDCD0] transition-colors">
                            <Award size={32} />
                        </div>
                        <h3 className="text-xl font-bold text-neutral-900 mb-3">Global Standards</h3>
                        <p className="text-neutral-600 text-sm leading-relaxed">
                            Bringing Seoul’s advanced methodologies to the world, setting a gold standard in aesthetics education.
                        </p>
                    </div>
                </div>
            </section>

            {/* Instructor Credibility Placeholder */}
            <section className="bg-neutral-900 py-24 px-4 text-white">
                <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
                    <div className="w-full md:w-1/2 aspect-square bg-neutral-800 rounded-3xl overflow-hidden flex items-center justify-center text-neutral-500 relative">
                        <img
                            src="https://images.unsplash.com/photo-1559839734-2b71ea197ec2?auto=format&fit=crop&q=80"
                            alt="Instructor Placeholder"
                            className="w-full h-full object-cover opacity-80 mix-blend-luminosity hover:mix-blend-normal transition-all duration-500"
                        />
                    </div>
                    <div className="w-full md:w-1/2">
                        <h2 className="font-serif text-4xl mb-6">Learn from the Best</h2>
                        <p className="text-neutral-400 mb-8 leading-relaxed">
                            [Placeholder for Instructor Bio: Dr. Jane Doe brings over 15 years of clinical experience in Seoul and New York. Having pioneered advanced injection protocols and curated bespoke skincare lines, she now dedicates her expertise to shaping the next generation of top-tier aestheticians.]
                        </p>
                        <div className="flex flex-col gap-4 text-sm text-neutral-300 font-medium">
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#FEDCD0] rounded-full"></div>
                                15+ Years Clinical Experience
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#FEDCD0] rounded-full"></div>
                                Founder of HBJ Aesthetics
                            </div>
                            <div className="flex items-center gap-3">
                                <div className="w-2 h-2 bg-[#FEDCD0] rounded-full"></div>
                                Trained 5,000+ Practitioners Globally
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default AboutPage;
