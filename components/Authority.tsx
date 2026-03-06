
import React from 'react';
import { motion } from 'motion/react';

const Authority: React.FC = () => {
  return (
    <section className="bg-white w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left: Editorial Portrait */}
      <div className="w-full md:w-1/2 h-[70vh] md:h-screen relative overflow-hidden">
        <motion.img 
          initial={{ scale: 1.1, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
          src="https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=1200&auto=format&fit=crop" 
          alt="Master J - Lead Instructor"
          className="w-full h-full object-cover object-top grayscale"
          referrerPolicy="no-referrer"
        />
        <div className="absolute bottom-12 left-12 text-white z-10">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <p className="text-[10px] tracking-[0.5em] uppercase mb-4 text-white/60">Lead Educator</p>
            <p className="font-serif text-4xl md:text-5xl tracking-tight">Master J</p>
          </motion.div>
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/60 via-transparent to-transparent" />
      </div>

      {/* Right: Editorial Quote */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-12 md:p-32 bg-white">
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-xl"
        >
          <span className="text-8xl font-serif text-brand-pink block -mb-8 opacity-40">“</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-[1.1] mb-12">
            I don’t just teach theory. I teach what <span className="italic font-light">actually works</span> on the clinic floor.
          </h2>
          <div className="space-y-6">
            <p className="text-brand-charcoal/60 text-sm tracking-widest uppercase font-light">
              15 years of experience in Seoul's Gangnam district.
            </p>
            <a 
              href="#biography" 
              className="inline-block text-brand-charcoal text-xs tracking-[0.3em] uppercase border-b border-brand-charcoal/20 pb-2 hover:border-brand-charcoal transition-all duration-500"
            >
              Read Biography
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Authority;
