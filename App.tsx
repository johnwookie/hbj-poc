
import React from 'react';
import Hero from './components/Hero';
import SkillStack from './components/SkillStack';
import Authority from './components/Authority';
import TangibleValue from './components/TangibleValue';
import SocialProof from './components/SocialProof';
import Pricing from './components/Pricing';
import Footer from './components/Footer';

const App: React.FC = () => {
  return (
    <div className="min-h-screen selection:bg-[#FEDCD0] selection:text-[#1A1A1A]">
      <Hero />
      <SkillStack />
      <Authority />
      <TangibleValue />
      <SocialProof />
      <Pricing />
      <Footer />
    </div>
  );
};

export default App;
