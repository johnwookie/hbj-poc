import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Mail, Phone, MapPin, ArrowRight, Check } from 'lucide-react';

const Contact: React.FC = () => {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = data.get('name') as string;
    const email = data.get('email') as string;
    const phone = data.get('phone') as string;
    const program = data.get('program') as string;
    const message = data.get('message') as string;

    const subject = encodeURIComponent(`New Inquiry — ${program}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nProgram of Interest: ${program}\n\nMessage:\n${message}`
    );

    window.location.href = `mailto:support@hbjacademy.com?subject=${subject}&body=${body}`;
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 4000);
  };

  return (
    <section className="bg-brand-charcoal py-32 md:py-48 px-6 lg:px-24 text-white" id="contact">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24">
          {/* Left: Info */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2 }}
          >
            <h2 className="font-serif text-5xl md:text-7xl mb-12 tracking-tight leading-[1.1]">
              Begin Your <br />
              <span className="italic font-light">Transformation.</span>
            </h2>
            <p className="text-white/40 text-sm tracking-widest uppercase mb-16 max-w-md leading-relaxed">
              Our team is here to guide you through our courses and help you choose the right path for your career.
            </p>

            <div className="space-y-12">
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-brand-pink">
                  <Mail size={20} />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2">Email Us</p>
                  <p className="text-lg font-light">support@hbjacademy.com</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-brand-pink">
                  <Phone size={20} />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2">Call Us</p>
                  <p className="text-lg font-light">0490 059 261</p>
                </div>
              </div>
              <div className="flex items-start gap-6">
                <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center text-brand-pink">
                  <MapPin size={20} />
                </div>
                <div>
                  <p className="text-[10px] tracking-[0.4em] uppercase text-white/30 mb-2">Visit Us</p>
                  <p className="text-lg font-light">Level 3, 415 Bourke Street, Melbourne VIC 3000</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right: Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.2, delay: 0.2 }}
            className="bg-white/5 p-12 md:p-16 rounded-[40px] backdrop-blur-sm border border-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.4em] uppercase text-white/30 ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 focus:border-brand-pink outline-none transition-colors font-light"
                    placeholder="Jane Doe"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-[10px] tracking-[0.4em] uppercase text-white/30 ml-1">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    required
                    className="w-full bg-transparent border-b border-white/20 py-4 focus:border-brand-pink outline-none transition-colors font-light"
                    placeholder="jane@example.com"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.4em] uppercase text-white/30 ml-1">Phone Number</label>
                <input
                  type="tel"
                  name="phone"
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:border-brand-pink outline-none transition-colors font-light"
                  placeholder="04XX XXX XXX"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.4em] uppercase text-white/30 ml-1">Program of Interest</label>
                <select
                  name="program"
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:border-brand-pink outline-none transition-colors font-light appearance-none"
                >
                  <option className="bg-brand-charcoal">Foundation Program</option>
                  <option className="bg-brand-charcoal">Intermediate Program</option>
                  <option className="bg-brand-charcoal">Advanced Professional</option>
                  <option className="bg-brand-charcoal">Specialty Modules</option>
                </select>
              </div>
              <div className="space-y-2">
                <label className="text-[10px] tracking-[0.4em] uppercase text-white/30 ml-1">Your Message</label>
                <textarea
                  name="message"
                  rows={4}
                  className="w-full bg-transparent border-b border-white/20 py-4 focus:border-brand-pink outline-none transition-colors font-light resize-none"
                  placeholder="Tell us about your career goals..."
                />
              </div>
              <button
                type="submit"
                className="w-full py-6 bg-brand-pink text-brand-charcoal text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-white transition-all duration-500 flex items-center justify-center gap-4"
              >
                {submitted ? (
                  <>
                    Opening Email Client
                    <Check size={16} />
                  </>
                ) : (
                  <>
                    Send Inquiry
                    <ArrowRight size={16} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
