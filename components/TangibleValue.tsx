
import React from 'react';
import { motion } from 'motion/react';
import { Globe, Zap, Briefcase } from 'lucide-react';

const BENEFITS = [
  {
    icon: <Globe size={24} />,
    title: "Global Expertise",
    description: "Curriculum developed directly from Seoul's top aesthetic clinics."
  },
  {
    icon: <Zap size={24} />,
    title: "Future Tech",
    description: "Master Microneedling, Red Light Therapy, and Plasma induction."
  },
  {
    icon: <Briefcase size={24} />,
    title: "Career Ready",
    description: "Post-graduate support including job placement and clinic setup help."
  }
];

const PHASES = [
  {
    number: "01",
    title: "On-Demand Theory",
    description: "Gain instant access to our digital library of 50+ modules covering skin anatomy, product chemistry, and Korean protocols."
  },
  {
    number: "02",
    title: "Clinical Practicals",
    description: "Join us for 40 hours of intensive in-person training with live models, overseen by senior HBJ instructors."
  },
  {
    number: "03",
    title: "Certification & Launch",
    description: "Receive your HBJ Global Certification and personalized business roadmap to start your own clinic or join a top-tier spa."
  }
];

const TangibleValue: React.FC = () => {
  return (
    <section className="bg-white py-32 md:py-48 px-6 lg:px-24">
      <div className="max-w-screen-2xl mx-auto">
        {/* Benefits Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-48">
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
        <div className="mb-48">
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
                    Every full program includes a comprehensive professional kit featuring premium Civasan & Leze medical-grade products.
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
                "Do not learn on basic materials."
              </p>
              <p className="text-brand-charcoal/60 text-base font-light leading-relaxed">
                We believe your education is only as good as the tools you use. Our kits are curated from the same medical-grade lines used in Seoul's top clinics.
              </p>
              <div className="pt-8">
                <ul className="space-y-4">
                  {['Civasan Medical Series', 'Leze Professional Protocols', 'Advanced Device Kit', 'Clinical Grade Topicals'].map((item, i) => (
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
              Your journey from student to elite aesthetician in three clear phases.
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
