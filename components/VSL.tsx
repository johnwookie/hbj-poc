import React from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const VSL: React.FC = () => {
  return (
    <section className="bg-white py-24 md:py-32 px-6 lg:px-24">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative group aspect-video overflow-hidden rounded-3xl bg-brand-charcoal shadow-2xl"
        >
          {/* Placeholder Image for Video */}
          <img 
            src="https://images.unsplash.com/photo-1570172619992-052267ad7c3f?q=80&w=1920&auto=format&fit=crop" 
            alt="The HBJ Experience"
            className="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-1000"
            referrerPolicy="no-referrer"
          />

          {/* Overlay Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="w-20 h-20 md:w-28 md:h-28 bg-brand-pink text-brand-charcoal rounded-full flex items-center justify-center mb-8 shadow-xl"
            >
              <Play size={32} fill="currentColor" className="ml-1" />
            </motion.button>

            <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 tracking-tight">
              The HBJ Experience
            </h2>
            <p className="text-white/80 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
              Watch how we transform passionate students into elite aestheticians through our signature Korean curriculum.
            </p>
          </div>

          {/* Subtle Gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-60" />
        </motion.div>
      </div>
    </section>
  );
};

export default VSL;
