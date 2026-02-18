
import React from 'react';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white py-12 px-6 lg:px-24 border-t border-gray-100">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="text-center md:text-left">
          <h2 className="font-serif text-2xl tracking-tight text-[#1A1A1A] mb-2 uppercase">HBJ Academy</h2>
          <p className="text-[10px] tracking-[0.4em] uppercase text-[#1A1A1A]/40 italic">Seoul &bull; Global Education</p>
        </div>

        <div className="flex gap-12 text-xs tracking-widest uppercase text-[#1A1A1A]/60">
          <a href="#instagram" className="hover:text-[#1A1A1A] transition-colors">Instagram</a>
          <a href="#youtube" className="hover:text-[#1A1A1A] transition-colors">YouTube</a>
          <a href="#contact" className="hover:text-[#1A1A1A] transition-colors">Contact</a>
        </div>

        <div className="text-[10px] tracking-widest text-[#1A1A1A]/40 uppercase text-center md:text-right">
          &copy; {new Date().getFullYear()} HBJ Academy. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
