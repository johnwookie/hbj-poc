
import React from 'react';
import { motion } from 'motion/react';

const SKILLS = [
  {
    title: "V-Shape Facial Lifting",
    subtitle: "Non-surgical face contouring using manual massage and muscle manipulation. Visible results after one session.",
    imageUrl: "https://images.unsplash.com/photo-1512290923902-8a9f81dc236c?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Korean Kyeong-lak (경락)",
    subtitle: "Meridian-based massage rooted in Traditional Korean Medicine. Pressure along energy pathways to rejuvenate skin and body.",
    imageUrl: "https://images.unsplash.com/photo-1570172619992-052267ad7c3f?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Clinical Machinery",
    subtitle: "Hands-on training with HIFU, RF, Endermologie, Hydrafacial, and Picoway — the same devices used in Seoul's top clinics.",
    imageUrl: "https://images.unsplash.com/photo-1596178065887-11386138c4f6?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Water Bomb Facials",
    subtitle: "Glass skin, wrinkle filler, and spot eraser protocols — the hydration techniques behind Korea's famous dewy look.",
    imageUrl: "https://images.unsplash.com/photo-1515377905703-c4788e51af15?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Anti-Aging Lifting Facial",
    subtitle: "Non-invasive lifting and firming techniques that deliver visible tightening without surgery or injections.",
    imageUrl: "https://images.unsplash.com/photo-1487412947147-5cebf100ffc2?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Remedial Massage",
    subtitle: "Deep tissue and therapeutic bodywork for pain relief, injury recovery, and chronic tension management.",
    imageUrl: "https://images.unsplash.com/photo-1544161515-4ab6ce6db874?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Endermologie & Slimming",
    subtitle: "Body contouring, cellulite reduction, and slimming machinery techniques used in Seoul's premium clinics.",
    imageUrl: "https://images.unsplash.com/photo-1519823551278-64ac92734fb1?q=80&w=800&auto=format&fit=crop"
  },
  {
    title: "Korean Body Scrub",
    subtitle: "Traditional Italy towel exfoliation technique — a staple of Korean bathhouse culture, now a premium spa service.",
    imageUrl: "https://images.unsplash.com/photo-1540555700478-4be289fbec6d?q=80&w=800&auto=format&fit=crop"
  }
];

const SkillStack: React.FC = () => {
  const duplicated = [...SKILLS, ...SKILLS];

  return (
    <section className="bg-white py-16 md:py-24 px-6 lg:px-24 overflow-hidden">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-brand-charcoal mb-6 tracking-tight">
            Signature Techniques
          </h2>
          <p className="text-brand-charcoal/40 text-[10px] tracking-[0.5em] uppercase">
            The skills that set HBJ graduates apart
          </p>
        </motion.div>

        <div className="group-hover-carousel">
          <div
            className="flex gap-4 animate-carousel-scroll"
            style={{
              width: `${duplicated.length * 356}px`,
            }}
          >
            {duplicated.map((skill, index) => (
              <div
                key={index}
                className="group relative w-[340px] flex-shrink-0 aspect-[2/3] overflow-hidden cursor-pointer bg-brand-charcoal"
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

                <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-transparent to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-700" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillStack;
