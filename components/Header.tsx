import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X, User, LayoutDashboard, LogOut } from 'lucide-react';
import { useLocation, Link, useNavigate } from 'react-router-dom';
import { supabase } from '../lib/supabase';

const Header: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [session, setSession] = useState<any>(null);
  
  const location = useLocation();
  const navigate = useNavigate();
  const isHomePage = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate('/');
  };

  const getTextColor = () => {
    if (isScrolled) return 'text-brand-charcoal';
    if (isHomePage) return 'text-white';
    return 'text-brand-charcoal';
  };
  
  const getSubTextColor = () => {
    if (isScrolled) return 'text-brand-charcoal/60';
    if (isHomePage) return 'text-white/70';
    return 'text-brand-charcoal/60';
  };

  const navLinks = [
    { name: 'Courses', href: '/courses' },
    { name: 'About', href: '/#biography' },
    { name: 'Contact Us', href: '/#contact' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${isScrolled ? 'bg-white/90 backdrop-blur-md py-4 border-b border-brand-charcoal/5' : 'bg-transparent py-8'
        }`}
    >
      <div className="max-w-screen-2xl mx-auto px-6 lg:px-24 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="group">
          <h1 className={`font-serif text-xl md:text-2xl tracking-tighter transition-colors duration-500 ${getTextColor()}`}>
            HBJ <span className="font-light italic">Academy</span>
          </h1>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-12">
          <div className="flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={`text-[10px] tracking-[0.4em] uppercase font-medium transition-colors duration-500 hover:text-brand-pink ${getSubTextColor()}`}
              >
                {link.name}
              </a>
            ))}
          </div>

          <div className="flex items-center gap-6 border-l border-brand-charcoal/10 pl-6">
            {!session ? (
              <>
                <Link
                  to="/login"
                  className={`flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase font-medium transition-colors duration-500 hover:text-brand-pink ${getSubTextColor()}`}
                >
                  <User size={14} />
                  Log In
                </Link>
                <Link to="/courses" className="px-8 py-3 bg-brand-charcoal text-white text-[10px] tracking-[0.4em] uppercase font-medium hover:bg-brand-pink hover:text-brand-charcoal transition-all duration-500">
                  Apply Now
                </Link>
              </>
            ) : (
              <>
                <Link
                  to="/dashboard"
                  className={`flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase font-medium transition-colors duration-500 hover:text-brand-pink ${getSubTextColor()}`}
                >
                  <LayoutDashboard size={14} />
                  Dashboard
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="px-8 py-3 bg-brand-charcoal text-white text-[10px] tracking-[0.4em] uppercase font-medium hover:bg-brand-pink hover:text-brand-charcoal transition-all duration-500 flex items-center gap-2"
                >
                  <LogOut size={14} />
                  Log Out
                </button>
              </>
            )}
          </div>
        </nav>

        {/* Mobile Toggle */}
        <button
          className={`md:hidden p-2 transition-colors duration-500 ${getTextColor()}`}
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
              
              {!session ? (
                <>
                  <Link
                    to="/login"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase font-medium text-brand-charcoal/60"
                  >
                    <User size={14} />
                    Log In
                  </Link>
                  <Link 
                    to="/courses" 
                    onClick={() => setIsMobileMenuOpen(false)} 
                    className="block w-full py-4 bg-brand-charcoal text-white text-[10px] tracking-[0.4em] uppercase font-medium text-center"
                  >
                    Apply Now
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    to="/dashboard"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 text-[10px] tracking-[0.4em] uppercase font-medium text-brand-charcoal/60"
                  >
                    <LayoutDashboard size={14} />
                    Dashboard
                  </Link>
                  <button 
                    onClick={() => { setIsMobileMenuOpen(false); handleLogout(); }} 
                    className="w-full py-4 bg-brand-charcoal text-white text-[10px] tracking-[0.4em] uppercase font-medium flex justify-center items-center gap-2"
                  >
                    <LogOut size={14} />
                    Log Out
                  </button>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
