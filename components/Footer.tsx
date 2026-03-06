
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-brand-charcoal py-24 px-6 lg:px-24 border-t border-white/5">
      <div className="max-w-screen-2xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-16 md:gap-8 mb-24">
          <div className="md:col-span-2">
            <h2 className="font-serif text-3xl text-white mb-6 tracking-tight uppercase">HBJ Academy</h2>
            <p className="text-white/40 text-[10px] tracking-[0.5em] uppercase italic mb-8">Seoul &bull; Global Education</p>
            <p className="text-white/60 text-sm font-light leading-relaxed max-w-sm">
              Defining the future of aesthetics through precision, artistry, and the world's most advanced Korean skincare protocols.
            </p>
          </div>

          <div>
            <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-8">Navigation</p>
            <ul className="space-y-4 text-xs tracking-widest uppercase text-white/60">
              <li><a href="#curriculum" className="hover:text-brand-pink transition-colors">Curriculum</a></li>
              <li><a href="#programs" className="hover:text-brand-pink transition-colors">Programs</a></li>
              <li><a href="#biography" className="hover:text-brand-pink transition-colors">Biography</a></li>
              <li><a href="#contact" className="hover:text-brand-pink transition-colors">Contact</a></li>
            </ul>
          </div>

          <div>
            <p className="text-white/30 text-[10px] tracking-[0.4em] uppercase mb-8">Connect</p>
            <ul className="space-y-4 text-xs tracking-widest uppercase text-white/60">
              <li><a href="#instagram" className="hover:text-brand-pink transition-colors">Instagram</a></li>
              <li><a href="#youtube" className="hover:text-brand-pink transition-colors">YouTube</a></li>
              <li><a href="#linkedin" className="hover:text-brand-pink transition-colors">LinkedIn</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
          <p className="text-[10px] tracking-[0.4em] text-white/20 uppercase">
            &copy; {new Date().getFullYear()} HBJ Academy. All Rights Reserved.
          </p>
          <p className="text-[10px] tracking-[0.4em] text-white/20 uppercase">
            Gangnam-gu, Seoul, South Korea
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
