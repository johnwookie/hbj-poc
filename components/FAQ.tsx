import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: "Do I need prior experience to enroll?",
    answer: "No, our Foundation Program is designed specifically for absolute beginners. We start with the basics of skin anatomy and build your skills from the ground up."
  },
  {
    question: "Are the certifications recognized globally?",
    answer: "Yes, HBJ Academy certifications are highly regarded in the industry worldwide, particularly in the growing sector of Korean clinical aesthetics."
  },
  {
    question: "What is the 'Hybrid' learning model?",
    answer: "Our hybrid model combines the flexibility of online theory modules with intensive, hands-on practical training at our clinical facilities."
  },
  {
    question: "Is the student kit included in the tuition?",
    answer: "Yes, every full program enrollment includes a comprehensive professional kit featuring premium Civasan & Leze medical-grade products."
  },
  {
    question: "Do you offer job placement assistance?",
    answer: "Absolutely. We have a dedicated career support team that helps with job placements in top-tier spas and provides guidance for setting up your own clinic."
  },
  {
    question: "Can I pay in installments?",
    answer: "Yes, we offer flexible payment plans for our Foundation and Intermediate programs to make elite education more accessible."
  },
  {
    question: "What is the duration of the clinical placements?",
    answer: "Optional clinical placements are available for up to 12 weeks, providing real-world experience in a high-volume clinical environment."
  },
  {
    question: "How do I apply for the Advanced Professional course?",
    answer: "The Advanced course requires 2-3 years of industry experience. You can apply via our website, and our admissions team will review your portfolio and experience."
  }
];

const FAQ: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <section className="bg-white py-32 md:py-48 px-6 lg:px-24">
      <div className="max-w-4xl mx-auto">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1 }}
          className="text-center mb-24"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-brand-charcoal mb-6 tracking-tight">
            Common Questions
          </h2>
          <p className="text-brand-charcoal/40 text-[10px] tracking-[0.5em] uppercase">
            Everything you need to know
          </p>
        </motion.div>

        <div className="space-y-4">
          {FAQS.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
              className="border-b border-brand-charcoal/5"
            >
              <button 
                onClick={() => setActiveIndex(activeIndex === index ? null : index)}
                className="w-full py-8 flex items-center justify-between text-left group"
              >
                <span className="font-serif text-xl md:text-2xl text-brand-charcoal group-hover:text-brand-pink transition-colors duration-300">
                  {faq.question}
                </span>
                <div className={`transition-transform duration-500 ${activeIndex === index ? 'rotate-180' : 'rotate-0'}`}>
                  {activeIndex === index ? <Minus size={20} /> : <Plus size={20} />}
                </div>
              </button>
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-8 text-brand-charcoal/60 text-base font-light leading-relaxed max-w-3xl">
                      {faq.answer}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQ;
