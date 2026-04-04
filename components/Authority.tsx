
import React from 'react';
import { motion } from 'motion/react';

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
    <section id="about" className="bg-white w-full min-h-screen flex flex-col md:flex-row overflow-hidden">
      {/* Left: Credentials Panel */}
      <div className="w-full md:w-1/2 h-[70vh] md:h-screen relative overflow-hidden bg-brand-charcoal flex items-center justify-center p-12 md:p-24">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-md"
        >
          <div className="w-32 h-32 md:w-40 md:h-40 rounded-full overflow-hidden mb-8 border-2 border-white/10">
            <img
              src="/images/KakaoTalk_Photo_2026-04-03-16-38-00.png"
              alt="Jane Kim"
              className="w-full h-full object-cover object-top"
            />
          </div>
          <p className="text-[10px] tracking-[0.5em] uppercase mb-6 text-white/40">Founder & Lead Instructor</p>
          <h3 className="font-serif text-5xl md:text-6xl text-white tracking-tight mb-4">Jane Kim</h3>
          <p className="text-brand-pink text-sm tracking-widest uppercase font-light mb-12">20+ years of experience</p>

          <div className="w-16 h-[1px] bg-white/20 mb-12" />

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
        </motion.div>
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
          <span className="text-8xl font-serif text-brand-pink block -mb-8 opacity-40">"</span>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-brand-charcoal leading-[1.1] mb-12">
            I don't teach textbook theory. I teach what <span className="italic font-light">actually works</span> — refined over 20 years in my own clinic.
          </h2>
          <div className="space-y-6">
            <p className="text-brand-charcoal/60 text-sm tracking-widest uppercase font-light">
              20+ years experience. Founder of Healing by J, Melbourne CBD.
            </p>
            <a
              href="#programs"
              className="inline-block text-brand-charcoal text-xs tracking-[0.3em] uppercase border-b border-brand-charcoal/20 pb-2 hover:border-brand-charcoal transition-all duration-500"
            >
              View Courses
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Authority;
