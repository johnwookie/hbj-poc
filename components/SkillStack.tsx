
import React from 'react';
import { SKILLS } from '../constants';

const SkillStack: React.FC = () => {
  return (
    <section className="bg-white py-24 md:py-32 px-6 lg:px-24">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16">
          <div className="max-w-xl">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">
              The Skill Stack
            </h2>
            <p className="text-[#1A1A1A]/60 text-lg leading-relaxed">
              Curated modules designed to elevate your artistry. From cellular health to advanced aesthetics.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {SKILLS.map((skill, index) => (
            <div 
              key={index} 
              className="group relative aspect-[3/4] overflow-hidden cursor-pointer bg-[#FEDCD0]"
            >
              <img 
                src={skill.imageUrl} 
                alt={skill.title}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 group-hover:opacity-40"
              />
              
              {/* Overlay Content */}
              <div className="absolute inset-0 flex flex-col justify-end p-8 translate-y-8 group-hover:translate-y-0 transition-transform duration-500">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100 mb-4">
                  <p className="text-[#1A1A1A] text-sm leading-relaxed font-light">
                    {skill.description}
                  </p>
                </div>
                <h3 className="font-serif text-2xl md:text-3xl text-white group-hover:text-[#1A1A1A] transition-colors duration-500">
                  {skill.title}
                </h3>
              </div>

              {/* Borders */}
              <div className="absolute inset-0 border border-white/20 group-hover:border-[#1A1A1A]/10 transition-colors" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillStack;
