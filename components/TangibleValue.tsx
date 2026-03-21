
import React from 'react';
import { motion } from 'motion/react';
import { Globe, Zap, Briefcase } from 'lucide-react';

const BENEFITS = [
  {
    icon: <Globe size={24} />,
    title: "Authentic Korean Instruction",
    description: "Taught by native Korean-trained therapists. Not adapted Western versions — the real techniques direct from Seoul."
  },
  {
    icon: <Zap size={24} />,
    title: "Earn While You Study",
    description: "From month one, passing a module can unlock paid work shifts at the Healing by J clinic in Melbourne CBD."
  },
  {
    icon: <Briefcase size={24} />,
    title: "Job Guarantee Pathway",
    description: "Our Paid Internship Package includes a 3-month apprenticeship contract at Healing by J. Top students transition into paid roles."
  }
];

const PHASES = [
  {
    number: "01",
    title: "Theory & Foundations",
    description: "Flexible scheduling — 2 days per week, 10am to 4pm. Covers skin anatomy, product chemistry, massage techniques, and Korean protocols."
  },
  {
    number: "02",
    title: "Hands-On Practicals",
    description: "Intensive in-person training with live models at our Melbourne CBD facility, overseen by senior HBJ instructors including Jane Kim."
  },
  {
    number: "03",
    title: "Internship & Certification",
    description: "Graduate with your HBJ certification. Top-performing students may transition into paid roles at Healing by J through our apprenticeship pathway."
  }
];

const TangibleValue: React.FC = () => {
  return (
    <section className="bg-white py-16 md:py-24 px-6 lg:px-24">
      <div className="max-w-screen-2xl mx-auto">
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-16"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-brand-charcoal mb-6 tracking-tight">
            Why HBJ Academy
          </h2>
          <p className="text-brand-charcoal/40 text-[10px] tracking-[0.5em] uppercase">
            What makes us different
          </p>
        </motion.div>

        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-24">
          {BENEFITS.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="flex flex-col items-start"
            >
              <div className="w-16 h-16 bg-brand-pink/30 rounded-2xl flex items-center justify-center text-brand-charcoal mb-8">
                {benefit.icon}
              </div>
              <h3 className="font-serif text-2xl text-brand-charcoal mb-4">{benefit.title}</h3>
              <p className="text-brand-charcoal/60 text-sm leading-relaxed font-light">
                {benefit.description}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Train with the Best Section */}
        <div className="mb-24">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <h2 className="font-serif text-5xl md:text-7xl text-brand-charcoal mb-8 tracking-tight">
              Train with the Best.
            </h2>
            <div className="w-24 h-[1px] bg-brand-pink mx-auto" />
          </motion.div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
              className="lg:col-span-8 relative group"
            >
              <div className="aspect-[4/3] overflow-hidden bg-gray-50 rounded-3xl">
                <img 
                  src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1600&auto=format&fit=crop" 
                  alt="Professional Student Kit Flat Lay"
                  className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0"
                  referrerPolicy="no-referrer"
                />
              </div>
              
              <div className="absolute -bottom-8 -right-8 hidden md:block">
                <div className="bg-brand-charcoal text-white p-8 max-w-xs rounded-2xl">
                  <p className="text-[10px] tracking-[0.4em] uppercase mb-2 text-white/40">Included</p>
                  <p className="text-sm font-light leading-relaxed">
                    Every full program includes a comprehensive professional kit with medical-grade products — included in your tuition.
                  </p>
                </div>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="lg:col-span-4 space-y-8"
            >
              <p className="text-brand-charcoal text-xl md:text-2xl font-serif leading-relaxed italic">
                "Don't learn on basic materials."
              </p>
              <p className="text-brand-charcoal/60 text-base font-light leading-relaxed">
                Your education is only as good as the tools you train with. Every full program includes a professional kit featuring the same medical-grade products we use daily at Healing by J.
              </p>
              <div className="pt-8">
                <ul className="space-y-4">
                  {['Professional Product Kit', 'Clinical Device Training', 'Hydrafacial & RF Equipment', 'Endermologie Systems'].map((item, i) => (
                    <li key={i} className="flex items-center gap-4 text-[10px] tracking-[0.3em] uppercase text-brand-charcoal/40">
                      <div className="w-1.5 h-1.5 rounded-full bg-brand-pink" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Path to Mastery Section */}
        <div>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="text-center mb-24"
          >
            <h2 className="font-serif text-5xl md:text-7xl text-brand-charcoal mb-6 tracking-tight">
              The Path to Mastery
            </h2>
            <p className="text-brand-charcoal/60 text-sm tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
              Your journey from student to working therapist in three clear phases.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {PHASES.map((phase, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: index * 0.2 }}
                className="p-12 bg-white border border-brand-charcoal/5 rounded-[40px] hover:shadow-xl transition-all duration-500"
              >
                <span className="text-6xl font-serif text-brand-pink/20 block mb-8">{phase.number}</span>
                <h3 className="text-2xl font-bold text-brand-charcoal mb-6">{phase.title}</h3>
                <p className="text-brand-charcoal/60 text-sm leading-relaxed font-light">
                  {phase.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TangibleValue;
