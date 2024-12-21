import React from "react";
import Hero from "./Hero";
import Hero2 from "./Hero2";
import FunctionalityShowcase from "./FunctionalityShowcase";
import FeaturesCarousel from "./FeaturesCarousel";
import Healthier from "./Healthieralt";
import Restaurentbtn from "/src/components/Restaurentcta";
import Skinbtn from "/src/components/Skinbtn";
import ComingSoon from "./Comingsoon";
function Home() {
  return (
    <div className="bg-gray-100">
      {/* Hero Section */}
      <section id="hero" className="mb-12">
        <Hero />
      </section>

      {/* Features Carousel Section */}
      <section id="features-carousel" className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Explore Our Features
          </h2>
          <FeaturesCarousel />
        </div>
      </section>

      {/* Healthier Alternatives Section */}
      <section id="healthier-alternatives" className="py-12 bg-gray-300">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Discover Healthier Alternatives
          </h2>
          <Healthier />
        </div>
      </section>
     
      {/* Restaurant CTA Button Section */}
      <section
        id="restaurant-cta"
        className="py-16 g-gray-300 text-gray-800 mt-8"
      >
        <div className="container mx-auto text-center px-6">
          <h2 className="text-4xl font-bold mb-6">
            Looking for a Place to Eat? 🍴
          </h2>
          <p className="text-lg mb-8">
            Discover nearby restaurants based on your location and preferences. Whether you're craving something specific or looking for new dining experiences, we've got you covered!
          </p>
          <Restaurentbtn />
        </div>
      </section>
      <section id="functionality-showcase" className="py-12 bg-gray-300">
        <div className="container mx-auto px-6">
         
          <Skinbtn />
        </div>
      </section>

      {/* Additional Hero Section */}
      <section id="additional-hero" className="py-12 bg-white">
        <div className="container mx-auto px-6">
          <Hero2 />
        </div>
      </section>
      <section id="functionality-showcase" className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
         
        <ComingSoon/>
        </div>
      </section>
      {/* Functionality Showcase Section */}
      <section id="functionality-showcase" className="py-12 bg-gray-50">
        <div className="container mx-auto px-6">
         
          <FunctionalityShowcase />
        </div>
      </section>
    
      
     
     
    </div>
  );
}

export default Home;
