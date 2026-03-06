
import React from 'react';
import { motion } from 'motion/react';

const Hero: React.FC = () => {
  return (
    <section className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-brand-charcoal">
      {/* Cinematic Background Video Placeholder */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1512290902246-0bb0a7a0307b?q=80&w=1920&auto=format&fit=crop" 
          alt="Luxury Skincare Procedure"
          className="w-full h-full object-cover filter brightness-[0.4] scale-105 animate-pulse-slow"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-brand-charcoal/20 to-brand-charcoal/60" />
      </div>

      {/* Minimalist Overlay Content */}
      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        >
          <h1 className="font-serif text-5xl md:text-7xl lg:text-9xl text-white mb-8 tracking-tight leading-[0.9]">
            Master the Art of Glow <br />
            <span className="italic font-light">with Korean Skincare.</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          <p className="text-white/70 text-base md:text-lg font-sans font-light mb-12 tracking-[0.2em] uppercase max-w-3xl mx-auto leading-relaxed">
            Bridging the gap between traditional aesthetics and advanced Korean clinical skincare. <br className="hidden md:block" />
            Master the industry's most in-demand techniques.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5, delay: 0.8 }}
          className="flex flex-col md:flex-row items-center justify-center gap-6"
        >
          <button 
            className="w-full md:w-auto px-12 py-5 bg-brand-charcoal text-white border border-white/20 hover:bg-white hover:text-brand-charcoal transition-all duration-700 font-sans tracking-[0.3em] uppercase text-xs font-medium"
          >
            Explore Curriculum
          </button>
          <button 
            className="w-full md:w-auto px-12 py-5 bg-transparent text-white border border-white/40 hover:border-white transition-all duration-700 font-sans tracking-[0.3em] uppercase text-xs font-medium"
          >
            Contact Us
          </button>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-4"
      >
        <span className="text-[10px] text-white/30 tracking-[0.5em] uppercase vertical-text">Scroll</span>
        <div className="w-[1px] h-16 bg-gradient-to-b from-white/40 to-transparent" />
      </motion.div>
    </section>
  );
};

export default Hero;
