import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User } from 'lucide-react';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Course', href: '#programs' },
    { name: 'About', href: '#biography' },
    { name: 'Contact Us', href: '#contact' },
  ];

  return (
    <header 
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${
        isScrolled ? 'bg-white/90 backdrop-blur-md py-4 border-b border-brand-charcoal/5' : 'bg-transparent py-8'
      }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-24 flex items-center justify-between">
        {/* Logo */}
        <a href="/" className="group">
          <h1 className={`font-serif text-xl md:text-2xl tracking-tighter transition-colors duration-500 ${isScrolled ? 'text-brand-charcoal' : 'text-white'}`}>
            HBJ <span className="font-light italic">Academy</span>
          </h1>
        </a>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a 
                key={link.name}
                href={link.href}
                className={`text-[10px] tracking-[0.4em] uppercase font-medium transition-colors duration-500 hover:text-brand-pink ${
                  isScrolled ? 'text-brand-charcoal/60' : 'text-white/70'
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 border-l border-brand-charcoal/10 pl-6">
            <a 
              href="#login"
              className={`flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase font-medium transition-colors duration-500 hover:text-brand-pink ${
                isScrolled ? 'text-brand-charcoal/60' : 'text-white/70'
              }`}
            >
              <User size={14} />
              Log In
            </a>
            <button className="px-8 py-3 bg-brand-charcoal text-white text-[10px] tracking-[0.4em] uppercase font-medium hover:bg-brand-pink hover:text-brand-charcoal transition-all duration-500">
              Apply Now
            </button>
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button 
          className={`md:hidden p-2 transition-colors duration-500 ${isScrolled ? 'text-brand-charcoal' : 'text-white'}`}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 w-full bg-white border-b border-brand-charcoal/5 p-8 md:hidden"
          >
            <div className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-[10px] tracking-[0.4em] uppercase font-medium text-brand-charcoal/60 hover:text-brand-pink"
                >
                  {link.name}
                </a>
              ))}
              <div className="h-[1px] bg-brand-charcoal/5 w-full" />
              <a 
                href="#login"
                className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase font-medium text-brand-charcoal/60"
              >
                <User size={14} />
                Log In
              </a>
              <button className="w-full py-4 bg-brand-charcoal text-white text-[10px] tracking-[0.4em] uppercase font-medium">
                Apply Now
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
