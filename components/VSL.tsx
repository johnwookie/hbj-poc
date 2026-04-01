import React, { useState, useRef } from 'react';
import { motion } from 'motion/react';
import { Play } from 'lucide-react';

const VSL: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  const handlePlay = () => {
    setIsPlaying(true);
    setTimeout(() => videoRef.current?.play(), 100);
  };

  return (
    <section className="bg-white py-24 md:py-32 px-6 lg:px-24">
      <div className="max-w-screen-xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative group aspect-video overflow-hidden rounded-3xl bg-brand-charcoal shadow-2xl"
        >
          <video
            ref={videoRef}
            src="/videos/HBJ Academy Open Day.mp4"
            className="w-full h-full object-cover"
            controls={isPlaying}
            playsInline
            preload="metadata"
          />

          {!isPlaying && (
            <>
              <div className="absolute inset-0 bg-gradient-to-t from-brand-charcoal/80 via-brand-charcoal/30 to-transparent" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8">
                <motion.button
                  onClick={handlePlay}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 md:w-28 md:h-28 bg-brand-pink text-brand-charcoal rounded-full flex items-center justify-center mb-8 shadow-xl cursor-pointer"
                >
                  <Play size={32} fill="currentColor" className="ml-1" />
                </motion.button>

                <h2 className="font-serif text-4xl md:text-6xl text-white mb-6 tracking-tight">
                  Inside HBJ Academy
                </h2>
                <p className="text-white/80 text-sm md:text-base font-light max-w-xl mx-auto leading-relaxed">
                  Real classes. Real techniques. See what life looks like at Melbourne's only Korean beauty academy.
                </p>
              </div>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default VSL;
