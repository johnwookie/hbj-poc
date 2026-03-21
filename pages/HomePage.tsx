import React from 'react';
import Hero from '../components/Hero';
import VSL from '../components/VSL';
import SkillStack from '../components/SkillStack';
import Authority from '../components/Authority';
import TangibleValue from '../components/TangibleValue';
import SocialProof from '../components/SocialProof';
import Pricing from '../components/Pricing';
import FAQ from '../components/FAQ';
import Contact from '../components/Contact';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <VSL />
      <SkillStack />
      <Authority />
      <TangibleValue />
      <SocialProof />
      <Pricing />
      <FAQ />
      <Contact />
    </>
  );
};

export default HomePage;
