import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Plus, Minus } from 'lucide-react';

const FAQS = [
  {
    question: "Do I need prior experience or qualifications?",
    answer: "No. Our Foundation Program is designed for absolute beginners — no beauty diploma or prior qualifications are required. Australia has no licensing requirement for beauty and massage work, so you can start from zero."
  },
  {
    question: "Where are classes held?",
    answer: "All practical training takes place at our Melbourne CBD facility — Level 3, 415 Bourke Street, Melbourne VIC 3000. Classes run twice a week, 10am to 4pm with a one-hour break."
  },
  {
    question: "Is the student kit included in tuition?",
    answer: "Yes. Every full program enrolment includes a comprehensive professional kit with medical-grade products — all included in your tuition fee."
  },
  {
    question: "Do you offer job placement or internships?",
    answer: "Yes. Our Paid Internship Package includes a 3-month apprenticeship contract at Healing by J. High-performing students may also transition into part-time or ongoing roles at the clinic."
  },
  {
    question: "Can I pay in instalments?",
    answer: "Yes. We offer flexible payment plans for the Foundation Program — a $150 application fee plus bi-weekly instalments. Contact us for full details."
  },
  {
    question: "What are the optional clinical placements?",
    answer: "Our Intermediate and Advanced programs offer an optional 12-week full-time work placement, giving you real-world experience in a high-volume clinical environment."
  },
  {
    question: "How do I apply?",
    answer: "Simply fill out the contact form below or call us on 0490 059 261. Our team will guide you through the enrolment process and help you choose the right program for your experience level."
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
