
import React from 'react';
import { motion } from 'motion/react';

const imageTestimonials = [
  { src: '/testimonials/testimonials screenshot 4.jpg', alt: 'Testimonial from Anna', name: 'Anna' },
  { src: '/testimonials/testimonials screenshot 3.jpg', alt: 'Testimonial from Palm', name: 'Palm' },
  { src: '/testimonials/testimonials screenshot 2.jpg', alt: 'Testimonial from Janette Cheng', name: 'Janette Cheng' },
  { src: '/testimonials/testimonials screenshot 1.jpg', alt: 'Testimonial from Tho Vuong', name: 'Tho Vuong' },
];

const videoTestimonials = [
  {
    src: '/videos/20260314_174652.mp4',
    label: 'March 2026 Graduation Cohort',
  },
  {
    src: '/testimonials/KakaoTalk_Video_2026-05-11-12-30-11.mp4',
    label: "",
  },
  {
    src: '/testimonials/Tiffany Testimonial.mp4',
    label: "Tiffany",
  },
];

const SocialProof: React.FC = () => {
  return (
    <section className="bg-white py-32 md:py-48 px-6 lg:px-24">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="mb-16 md:mb-24"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-brand-charcoal mb-4 tracking-tight">
            The Next Generation <br /> of Masters.
          </h2>
          <p className="text-brand-charcoal/40 text-[10px] tracking-[0.5em] uppercase">
            Real messages from real graduates
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10 md:mb-16">
          {imageTestimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.08 }}
              className="rounded-2xl overflow-hidden bg-brand-charcoal/95 p-5 flex flex-col"
            >
              <div className="rounded-xl overflow-hidden flex-1 flex items-center justify-center">
                <img
                  src={testimonial.src}
                  alt={testimonial.alt}
                  className="w-full h-auto"
                  loading="lazy"
                />
              </div>
              <p className="mt-4 text-[10px] tracking-[0.3em] uppercase text-white/40">
                — {testimonial.name}
              </p>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {videoTestimonials.map((video, index) => (
            <motion.div
              key={video.src}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.1 }}
            >
              <p className="text-brand-charcoal/40 text-[10px] tracking-[0.5em] uppercase mb-4">
                {video.label}
              </p>
              <div className="rounded-2xl overflow-hidden bg-brand-charcoal aspect-[9/16]">
                <video
                  src={video.src}
                  className="w-full h-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
