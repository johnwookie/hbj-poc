
import React from 'react';

const TangibleValue: React.FC = () => {
  return (
    <section className="bg-white py-24 md:py-40 px-6 lg:px-24">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-12">
          Train with the Best
        </h2>
        
        {/* Knolling Style Flat Lay Placeholder */}
        <div className="relative group mb-12">
          <div className="aspect-[16/9] overflow-hidden bg-gray-50 rounded-sm">
            <img 
              src="https://images.unsplash.com/photo-1556228720-195a672e8a03?q=80&w=1600&auto=format&fit=crop" 
              alt="Professional Skincare Kit"
              className="w-full h-full object-cover grayscale-[20%] group-hover:grayscale-0 transition-all duration-700"
            />
          </div>
          
          {/* Subtle Annotations could go here */}
          <div className="absolute top-1/4 right-1/4 hidden md:block">
            <div className="flex items-center gap-4">
              <div className="w-12 h-[1px] bg-[#1A1A1A]" />
              <span className="text-[10px] uppercase tracking-widest text-[#1A1A1A]">Leze Professional Series</span>
            </div>
          </div>
        </div>

        <div className="max-w-2xl mx-auto">
          <p className="text-[#1A1A1A] text-xl md:text-2xl font-light leading-relaxed">
            Every enrollment includes a <span className="font-medium">full professional kit</span> with premium Civasan & Leze products. Professional grade tools for a professional grade career.
          </p>
        </div>
      </div>
    </section>
  );
};

export default TangibleValue;
