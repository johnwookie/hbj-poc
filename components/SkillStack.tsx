
import React from 'react';
import { motion } from 'motion/react';

const SKILLS = [
  {
    title: "Clinical Machinery",
    subtitle: "Master the latest in medical-grade aesthetics.",
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Korean Facials",
    subtitle: "The iconic glass skin protocol and beyond.",
    imageUrl: "https://images.unsplash.com/photo-1570172619992-052267ad7c3f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Advanced Massage",
    subtitle: "Sculpting techniques for non-invasive lifting.",
    imageUrl: "https://images.unsplash.com/photo-1596178065887-11386138c4f6?q=80&w=800&auto=format&fit=crop"
  }
];

const SkillStack: React.FC = () => {
  return (
    <section className="bg-white py-32 md:py-48 px-6 lg:px-24">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-1">
          {SKILLS.map((skill, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="group relative aspect-[2/3] overflow-hidden cursor-pointer bg-brand-charcoal"
            >
              <img 
                src={skill.imageUrl} 
                alt={skill.title}
                className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-105 group-hover:opacity-70"
                referrerPolicy="no-referrer"
              />
              
              <div className="absolute inset-0 flex flex-col justify-end p-12 z-10">
                <h3 className="font-serif text-3xl md:text-4xl text-white mb-4 tracking-tight transition-transform duration-700 group-hover:-translate-y-2">
                  {skill.title}
                </h3>
                <div className="h-0 overflow-hidden group-hover:h-auto transition-all duration-700 ease-out opacity-0 group-hover:opacity-100">
                  <p className="text-white/80 text-sm tracking-widest uppercase font-light">
                    {skill.subtitle}
                  </p>
                </div>
              </div>

              {/* Subtle Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillStack;
