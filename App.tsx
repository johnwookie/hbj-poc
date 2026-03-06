
import React from 'react';
import Header from './components/Header';
import Hero from './components/Hero';
import VSL from './components/VSL';
import SkillStack from './components/SkillStack';
import Authority from './components/Authority';
import TangibleValue from './components/TangibleValue';
import SocialProof from './components/SocialProof';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Contact from './components/Contact';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-brand-pink selection:text-brand-charcoal">
      <Header />
      <Hero />
      <VSL />
      <SkillStack />
      <Authority />
      <TangibleValue />
      <SocialProof />
      <Pricing />
      <FAQ />
      <Contact />
      <Footer />
    </div>
  );
};

export default App;
