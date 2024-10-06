import React from 'react';
import Hero from './Hero';
import Hero2 from './Hero2';
import FunctionalityShowcase from './FunctionalityShowcase';
import FeaturesCarousel from './FeaturesCarousel';
function Home() {
  return (
    <div>
      <Hero/>
      <FeaturesCarousel/>
      <Hero2/>
      <FunctionalityShowcase/>
    </div>
  );
}

export default Home;
