
import React from 'react';
import { SOCIAL_IMAGES } from '../constants';

const SocialProof: React.FC = () => {
  return (
    <section className="bg-white py-24 md:py-32 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
            Join the Next Generation
          </h2>
          <p className="text-[#1A1A1A]/40 uppercase tracking-[0.2em] text-sm">
            Our community of elite practitioners
          </p>
        </div>

        <div className="masonry-grid">
          {SOCIAL_IMAGES.map((img) => (
            <div key={img.id} className="masonry-item relative group overflow-hidden">
              <img 
                src={img.imageUrl} 
                alt="Social proof"
                className="w-full h-auto object-cover grayscale-[30%] group-hover:grayscale-0 transition-all duration-500"
              />
              <div className="absolute inset-0 bg-[#FEDCD0]/20 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
