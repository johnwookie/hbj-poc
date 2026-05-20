import React, { useState } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate } from 'react-router-dom';
import { motion } from 'motion/react';
import { ArrowRight } from 'lucide-react';

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setError(error.message);
      } else if (data.user) {
        navigate('/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-charcoal pt-32 pb-24 flex items-center justify-center px-6">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="w-full max-w-md bg-white/5 p-8 md:p-12 rounded-[30px] backdrop-blur-sm border border-white/10 text-white"
      >
        <div className="text-center mb-10">
          <h1 className="font-serif text-3xl md:text-4xl mb-4">Student <span className="italic font-light">Login</span></h1>
          <p className="text-[10px] tracking-[0.4em] uppercase text-white/40">Access your purchased courses</p>
        </div>

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-200 text-sm p-4 rounded-xl mb-6 text-center">
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.4em] uppercase text-white/30 ml-1">Email Address</label>
            <input 
              type="email" 
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-4 focus:border-brand-pink outline-none transition-colors font-light text-white"
              placeholder="Enter your email"
            />
          </div>
          <div className="space-y-2">
            <label className="text-[10px] tracking-[0.4em] uppercase text-white/30 ml-1">Password</label>
            <input 
              type="password" 
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-transparent border-b border-white/20 py-4 focus:border-brand-pink outline-none transition-colors font-light text-white"
              placeholder="Enter your password"
            />
          </div>

          <button 
            type="submit" 
            disabled={loading}
            className="w-full mt-8 py-5 bg-brand-pink text-brand-charcoal text-[10px] tracking-[0.4em] uppercase font-bold hover:bg-white transition-all duration-500 flex items-center justify-center gap-4 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Logging in...' : 'Log In'}
            {!loading && <ArrowRight size={16} />}
          </button>
        </form>
      </motion.div>
    </div>
  );
};

export default LoginPage;
