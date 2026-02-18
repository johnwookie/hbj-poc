
import React from 'react';
import { ArrowUpRight } from 'lucide-react';

const Pricing: React.FC = () => {
  return (
    <section className="bg-[#FEDCD0]/30 py-24 md:py-40 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-4xl md:text-6xl text-[#1A1A1A] text-center mb-20">
          Choose Your Path
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {/* Card 1: Upskill */}
          <div className="bg-white p-12 md:p-16 flex flex-col items-start hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-[#1A1A1A]/5">
            <span className="text-xs uppercase tracking-[0.3em] text-[#1A1A1A]/40 mb-8 block">Option 01</span>
            <h3 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4">Upskill</h3>
            <p className="text-[#1A1A1A]/60 text-lg mb-4">Single Technique Courses</p>
            <p className="text-[#1A1A1A]/40 text-sm mb-12 leading-relaxed">
              Designed for established professionals looking to add high-revenue services like MTS or Gua Sha to their menu.
            </p>
            <button className="mt-auto group flex items-center gap-3 bg-[#1A1A1A] text-white px-8 py-4 tracking-widest uppercase text-xs font-medium hover:bg-[#FEDCD0] hover:text-[#1A1A1A] transition-colors">
              View Catalog
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>

          {/* Card 2: Career */}
          <div className="bg-[#1A1A1A] p-12 md:p-16 flex flex-col items-start text-white hover:shadow-2xl hover:-translate-y-2 transition-all duration-500">
            <span className="text-xs uppercase tracking-[0.3em] text-white/40 mb-8 block">Option 02</span>
            <h3 className="font-serif text-3xl md:text-4xl mb-4">Career</h3>
            <p className="text-white/60 text-lg mb-4">Full Internship Package</p>
            <p className="text-white/40 text-sm mb-12 leading-relaxed">
              For those seeking total transformation. A 12-week immersive residency covering all protocols and clinic management.
            </p>
            <button className="mt-auto group flex items-center gap-3 bg-white text-[#1A1A1A] px-8 py-4 tracking-widest uppercase text-xs font-medium hover:bg-[#FEDCD0] transition-colors">
              Apply for Internship
              <ArrowUpRight size={16} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Pricing;
