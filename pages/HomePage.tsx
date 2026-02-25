import React from 'react';
import Hero from '../components/Hero';
import SkillStack from '../components/SkillStack';
import Authority from '../components/Authority';
import TangibleValue from '../components/TangibleValue';
import SocialProof from '../components/SocialProof';
import Pricing from '../components/Pricing';

const HomePage: React.FC = () => {
    return (
        <>
            <Hero />
            <SkillStack />
            <Authority />
            <TangibleValue />
            <SocialProof />
            <Pricing />

            {/* Bottom CTA Band */}
            <section className="bg-neutral-900 py-20 text-center px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-serif text-white mb-6">Ready to Master Your Craft?</h2>
                    <p className="text-neutral-400 mb-10 max-w-2xl mx-auto">
                        Take the first step towards elevating your expertise with our industry-leading programs and workshops.
                    </p>
                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <button className="px-8 py-4 bg-white text-neutral-900 font-semibold rounded-lg hover:bg-neutral-100 transition-colors">
                            Apply for Professional Program
                        </button>
                        <button className="px-8 py-4 bg-neutral-800 text-white font-semibold rounded-lg hover:bg-neutral-700 transition-colors">
                            Enroll in a Workshop
                        </button>
                    </div>
                </div>
            </section>
        </>
    );
};

export default HomePage;
