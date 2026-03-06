
import React from 'react';
import { motion } from 'motion/react';

const PROGRAMS = [
  {
    title: "Specialty Modules",
    subtitle: "Targeted Upskilling",
    price: "From $500 AUD",
    paymentInfo: "A La Carte Learning",
    duration: "Short, intensive 3-7 hour modules for single technique mastery.",
    bullets: ["HIFU Mastery", "Facial Lifting", "Baby Massage", "Deep Cleansing"],
    cta: "View Specialty Modules",
    highlight: false
  },
  {
    title: "Foundation Program",
    subtitle: "Start from zero",
    price: "$3,500 AUD",
    paymentInfo: "Payment Plans Available",
    duration: "8 Weeks (96 Hours) | Hybrid (2w Online + 6w Practical)",
    bullets: ["Full Body & V-Shape Facial", "Basic Korean Facial", "Skin Analysis"],
    cta: "Explore Foundation",
    highlight: false
  },
  {
    title: "Intermediate Program",
    subtitle: "Elevate your skills - 1yr experience",
    price: "$4,800 AUD",
    paymentInfo: "",
    duration: "10 Weeks (120 Hours) | Hybrid (3w Online + 7w Practical)",
    bullets: ["Device-Focused Clinical Training", "Water Bomb Protocol", "Anti-Aging Lifting"],
    cta: "Explore Intermediate",
    highlight: true
  },
  {
    title: "Advanced Professional",
    subtitle: "Elite standards - 2-3yrs experience",
    price: "$6,800 AUD",
    paymentInfo: "",
    duration: "12 Weeks (144 Hours) | Hybrid (4w Online + 8w Practical)",
    bullets: ["Lasers, HIFU, RF & Needling", "Advanced Skin Tag & Infusion", "Korean Kyeong Lak"],
    cta: "Apply for Advanced",
    highlight: false
  }
];

const Pricing: React.FC = () => {
  return (
    <section className="bg-white py-32 md:py-48 px-6 lg:px-24" id="programs">
      <div className="max-w-screen-2xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-brand-charcoal mb-6 tracking-tight">
            Choose Your Path
          </h2>
          <p className="text-brand-charcoal/60 text-sm tracking-widest uppercase max-w-2xl mx-auto leading-relaxed">
            From absolute beginners to seasoned therapists. <br className="hidden md:block" />
            Optional 12-week clinical placements available.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-1">
          {PROGRAMS.map((program, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: index * 0.2 }}
              className={`p-12 md:p-16 flex flex-col items-start border border-brand-charcoal/5 transition-all duration-700 ${
                program.highlight ? 'bg-brand-charcoal text-white' : 'bg-white text-brand-charcoal'
              }`}
            >
              <div className="mb-12">
                <p className={`text-[10px] tracking-[0.4em] uppercase mb-4 ${program.highlight ? 'text-white/40' : 'text-brand-charcoal/40'}`}>
                  {program.subtitle}
                </p>
                <h3 className="font-serif text-3xl md:text-4xl mb-2 tracking-tight">
                  {program.title}
                </h3>
                <div className="flex items-baseline gap-2 mt-6">
                  <span className="text-3xl font-serif">{program.price}</span>
                  {program.paymentInfo && (
                    <span className={`text-[10px] tracking-widest uppercase ${program.highlight ? 'text-white/40' : 'text-brand-charcoal/40'}`}>
                      {program.paymentInfo}
                    </span>
                  )}
                </div>
              </div>

              <div className="space-y-8 mb-16 flex-grow">
                <div>
                  <p className={`text-[10px] tracking-[0.3em] uppercase mb-3 ${program.highlight ? 'text-white/40' : 'text-brand-charcoal/40'}`}>Duration</p>
                  <p className="text-sm font-light leading-relaxed">{program.duration}</p>
                </div>
                <div>
                  <p className={`text-[10px] tracking-[0.3em] uppercase mb-3 ${program.highlight ? 'text-white/40' : 'text-brand-charcoal/40'}`}>Curriculum Highlights</p>
                  <ul className="space-y-3">
                    {program.bullets.map((bullet, i) => (
                      <li key={i} className="text-sm font-light flex items-center gap-3">
                        <div className={`w-1 h-1 rounded-full ${program.highlight ? 'bg-brand-pink' : 'bg-brand-pink'}`} />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <button 
                className={`w-full py-5 text-[10px] tracking-[0.4em] uppercase font-medium transition-all duration-500 border ${
                  program.highlight 
                    ? 'bg-white text-brand-charcoal border-white hover:bg-brand-pink hover:border-brand-pink' 
                    : 'bg-brand-charcoal text-white border-brand-charcoal hover:bg-brand-pink hover:border-brand-pink hover:text-brand-charcoal'
                }`}
              >
                {program.cta}
              </button>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
