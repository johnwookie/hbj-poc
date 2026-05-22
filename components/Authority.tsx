
import React from 'react';
import { motion } from 'motion/react';
import janePhoto from '@/images/Jane Photo.png';

const CREDENTIALS = [
  "COMONDE Academy Instructor",
  "Slim M Clinical Centre Manager",
  "Cheongdam Aesthetic Academy Adjunct Instructor",
  "Taereung National Training Centre LPG Trainer",
  "Skincare & Day Spa Therapist in Australia",
  "Hotel Dayspa & Laser Clinic Main Therapist",
  "Founder of Healing By J",
  "JH Contouring Master Class Completion",
];

const Authority: React.FC = () => {
  return (
    <section id="about" className="bg-brand-charcoal w-full py-24 md:py-40 flex items-center justify-center px-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        className="max-w-md w-full"
      >
        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-8 border-2 border-white/10">
          <img
            src={janePhoto}
            alt="Jane Kim"
            className="w-full h-full object-cover object-top"
          />
        </div>
        <p className="text-[10px] tracking-[0.5em] uppercase mb-6 text-white/40">Founder & Lead Instructor</p>
        <h3 className="font-serif text-5xl md:text-6xl text-white tracking-tight mb-4">Jane Kim</h3>
        <p className="text-brand-pink text-sm tracking-widest uppercase font-light mb-8">20+ years experience. Founder of Healing by J, Melbourne CBD.</p>

        <p className="text-white/80 font-serif text-lg md:text-xl italic leading-relaxed mb-10">
          "I don't teach textbook theory. I teach what actually works — refined over 20 years in my own clinic."
        </p>

        <div className="w-16 h-[1px] bg-white/20 mb-10" />

        <ul className="space-y-4">
          {CREDENTIALS.map((cred, i) => (
            <motion.li
              key={i}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.08 }}
              className="flex items-start gap-4 text-white/60 text-sm font-light"
            >
              <div className="w-1.5 h-1.5 rounded-full bg-brand-pink mt-1.5 flex-shrink-0" />
              {cred}
            </motion.li>
          ))}
        </ul>

        <div className="w-16 h-[1px] bg-white/20 mt-10 mb-8" />

        <a
          href="#programs"
          className="inline-block text-white text-xs tracking-[0.3em] uppercase border-b border-white/30 pb-2 hover:border-white transition-all duration-500"
        >
          Learn from Jane
        </a>
      </motion.div>
    </section>
  );
};

export default Authority;
