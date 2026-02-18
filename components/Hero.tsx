
import React from 'react';
import { ArrowRight } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden">
      {/* Cinematic Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512290902246-0bb0a7a0307b?q=80&w=1920&auto=format&fit=crop" 
          alt="Luxury Skincare"
          className="w-full h-full object-cover filter brightness-50"
        />
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px]" />
      </div>

      {/* Minimalist Overlay Content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white mb-6 tracking-tight leading-tight">
          Define Your Future in <br />
          <span className="italic">Korean Skincare</span>
        </h1>
        <p className="text-white/80 text-lg md:text-xl font-light mb-10 tracking-widest uppercase">
          Master the industry's most in-demand techniques.
        </p>
        <button 
          className="group relative px-10 py-5 text-white border border-white hover:bg-white hover:text-[#1A1A1A] transition-all duration-500 font-medium tracking-widest uppercase text-sm"
        >
          <span className="flex items-center gap-3">
            Explore the Curriculum
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </button>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce">
        <div className="w-[1px] h-12 bg-white/40" />
      </div>
    </section>
  );
};

export default Hero;
