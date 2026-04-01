
import React from 'react';
import { motion } from 'motion/react';

const SocialProof: React.FC = () => {
  return (
    <section className="bg-white py-32 md:py-48 px-6 lg:px-24">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-24"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-brand-charcoal mb-4 tracking-tight">
            The Next Generation <br /> of Masters.
          </h2>
          <p className="text-brand-charcoal/40 text-[10px] tracking-[0.5em] uppercase">
            Real messages from real graduates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Column 1: Anna + Palm (short + tall = balanced) */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="rounded-2xl overflow-hidden bg-brand-charcoal/95 p-5"
            >
              <div className="rounded-xl overflow-hidden">
                <img src="/testimonials/testimonials screenshot 4.jpg" alt="Testimonial from Anna" className="w-full h-auto" />
              </div>
              <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-white/40">— Anna</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="rounded-2xl overflow-hidden bg-brand-charcoal/95 p-5"
            >
              <div className="rounded-xl overflow-hidden">
                <img src="/testimonials/testimonials screenshot 3.jpg" alt="Testimonial from Palm" className="w-full h-auto" />
              </div>
              <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-white/40">— Palm</p>
            </motion.div>
          </div>

          {/* Column 2: Janette + Tho (both short, add spacing to balance) */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="rounded-2xl overflow-hidden bg-brand-charcoal/95 p-5"
            >
              <div className="rounded-xl overflow-hidden">
                <img src="/testimonials/testimonials screenshot 2.jpg" alt="Testimonial from Janette Cheng" className="w-full h-auto" />
              </div>
              <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-white/40">— Janette Cheng</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="rounded-2xl overflow-hidden bg-brand-charcoal/95 p-5"
            >
              <div className="rounded-xl overflow-hidden">
                <img src="/testimonials/testimonials screenshot 1.jpg" alt="Testimonial from Tho Vuong" className="w-full h-auto" />
              </div>
              <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-white/40">— Tho Vuong</p>
            </motion.div>
          </div>

          {/* Column 3: Graduation Video */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <p className="text-brand-charcoal/40 text-[10px] tracking-[0.5em] uppercase mb-4">
              March 2026 Graduation Cohort
            </p>
            <div className="rounded-2xl overflow-hidden bg-brand-charcoal aspect-[9/16]">
              <video
                src="/videos/20260314_174652.mp4"
                className="w-full h-full object-cover"
                controls
                playsInline
                preload="metadata"
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
