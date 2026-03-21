
import React from 'react';
import { motion } from 'motion/react';
import { Play, Quote } from 'lucide-react';

const TESTIMONIALS = [
  {
    type: 'video',
    url: 'https://images.unsplash.com/photo-1596178067639-5c6e689a42e5?q=80&w=800&auto=format',
    name: 'Video Testimonial',
    role: 'Coming Soon',
    span: 'col-span-1 row-span-2'
  },
  {
    type: 'text',
    quote: "Thank you so much Jane for everything!! You're sincerely one of the best teachers with enthusiasm that I know of. We hope we can make you proud in the future!",
    name: 'Anna',
    role: 'HBJ Academy Graduate',
    span: 'col-span-1 row-span-1'
  },
  {
    type: 'text',
    quote: "Thank you Jane for being such a wonderful teacher. I learned so many things from you and from teacher Wonkyung, and I'm very grateful for your guidance and kindness.",
    name: 'Palm',
    role: 'HBJ Academy Graduate',
    span: 'col-span-1 row-span-1'
  },
  {
    type: 'text',
    quote: "I had the best time and thanks for teaching us, so honoured to meet everyone!! We should catch up for dinner together!",
    name: 'Janette Cheng',
    role: 'HBJ Academy Graduate',
    span: 'col-span-1 row-span-1'
  },
  {
    type: 'video',
    url: 'https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?q=80&w=800&auto=format',
    name: 'Video Testimonial',
    role: 'Coming Soon',
    span: 'col-span-1 row-span-2'
  },
  {
    type: 'text',
    quote: "Thank you everyone. I had a good time with all of you guys. Thank you Jane, Andy and Instructor Wonkyung for delivering your teaching very clear.",
    name: 'Tho Vuong',
    role: 'HBJ Academy Graduate',
    span: 'col-span-1 row-span-1'
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
          className="mb-24"
        >
          <h2 className="font-serif text-5xl md:text-7xl text-brand-charcoal mb-4 tracking-tight">
            The Next Generation <br /> of Masters.
          </h2>
          <p className="text-brand-charcoal/40 text-[10px] tracking-[0.5em] uppercase">
            Student testimonials & success stories
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className={`relative group overflow-hidden rounded-[32px] ${
                item.type === 'text' ? 'bg-brand-pink/10 p-10 flex flex-col justify-between' : 'bg-brand-charcoal aspect-[4/5]'
              }`}
            >
              {item.type === 'video' ? (
                <>
                  <img 
                    src={item.url} 
                    alt={item.name}
                    className="w-full h-full object-cover opacity-60 grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center text-white mb-4 group-hover:scale-110 transition-transform duration-500">
                      <Play size={24} fill="currentColor" className="ml-1" />
                    </div>
                  </div>
                  <div className="absolute bottom-8 left-8 text-white">
                    <p className="font-serif text-xl mb-1">{item.name}</p>
                    <p className="text-[10px] tracking-widest uppercase text-white/60">{item.role}</p>
                  </div>
                </>
              ) : (
                <>
                  <Quote className="text-brand-pink mb-8" size={32} />
                  <p className="text-brand-charcoal/80 text-lg font-light leading-relaxed italic mb-12">
                    "{item.quote}"
                  </p>
                  <div>
                    <p className="font-serif text-xl text-brand-charcoal mb-1">{item.name}</p>
                    <p className="text-[10px] tracking-widest uppercase text-brand-charcoal/40">{item.role}</p>
                  </div>
                </>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
