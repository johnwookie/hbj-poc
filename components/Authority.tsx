
import React from 'react';

const Authority: React.FC = () => {
  return (
    <section className="bg-[#FEDCD0] w-full min-h-screen flex flex-col md:flex-row">
      {/* Left: Editorial Portrait */}
      <div className="w-full md:w-1/2 h-[60vh] md:h-screen relative overflow-hidden">
        <img 
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" 
          alt="Master J"
          className="w-full h-full object-cover object-top"
        />
        <div className="absolute bottom-8 left-8 text-white z-10">
          <p className="text-xs tracking-[0.3em] uppercase mb-2">Lead Educator</p>
          <p className="font-serif text-3xl">Master J</p>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
      </div>

      {/* Right: Editorial Quote */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-24 bg-white">
        <div className="max-w-lg">
          <span className="text-6xl font-serif text-[#FEDCD0] block mb-4 opacity-50">“</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-tight mb-8">
            I don’t just teach theory. I teach you what <span className="italic">actually works</span> on the clinic floor.
          </h2>
          <a 
            href="#meet-j" 
            className="inline-block text-[#1A1A1A] text-sm tracking-widest uppercase border-b border-[#1A1A1A] pb-1 hover:opacity-60 transition-opacity"
          >
            Meet Master J
          </a>
        </div>
      </div>
    </section>
  );
};

export default Authority;
