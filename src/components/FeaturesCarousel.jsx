import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // Import carousel styles

function FeaturesCarousel() {
  return (
    <section className="w-full max-w-6xl mx-auto my-12">
      <h2 className="text-5xl font-bold text-center text-indigo-600 mb-8">
       Lets Roll in....
      </h2>
      <Carousel
        showThumbs={false}
        autoPlay={true}
        infiniteLoop={true}
        showStatus={false}
        interval={2000}
        transitionTime={800}
        className="rounded-lg"
      >
        {/* Slide 1: Scan Food */}
        <div className="bg-white p-10 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105">
          <img
            src="https://images.pexels.com/photos/9789494/pexels-photo-9789494.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Add relevant image for scanning feature
            alt="Scan Food"
            className="mx-auto mb-4 w-full h-72 object-cover rounded-md"
          />
          <h3 className="text-3xl font-semibold text-indigo-600">
            Scan Your Food
          </h3>
          <p className="mt-4 text-gray-600 text-lg">
            Simply scan your food to get detailed nutritional information, including calories, vitamins, and health benefits instantly.
          </p>
        </div>

        {/* Slide 2: Personalized Diet Plans */}
        <div className="bg-white p-10 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105">
          <img
            src="https://images.pexels.com/photos/8939504/pexels-photo-8939504.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" // Add relevant image for diet plan feature
            alt="Personalized Diet Plans"
            className="mx-auto mb-4 w-full h-72 object-cover rounded-md"
          />
          <h3 className="text-3xl font-semibold text-indigo-600">
            Personalized Diet Plans
          </h3>
          <p className="mt-4 text-gray-600 text-lg">
            Get a personalized diet plan tailored to your health needs and food preferences to achieve your fitness goals.
          </p>
        </div>

        {/* Slide 3: Calorie Tracker */}
        <div className="bg-white p-10 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105">
          <img
            src="https://images.pexels.com/photos/17947739/pexels-photo-17947739/free-photo-of-woman-measuring-blood-sugar-level-with-a-smart-phone-app.jpeg?auto=compress&cs=tinysrgb&w=600" // Add relevant image for calorie tracking
            alt="Calorie Tracker"
            className="mx-auto mb-4 w-full h-72 object-cover rounded-md"
          />
          <h3 className="text-3xl font-semibold text-indigo-600">
            Calorie Tracker
          </h3>
          <p className="mt-4 text-gray-600 text-lg">
            Track your daily calorie intake and monitor your progress over time to stay in control of your diet.
          </p>
        </div>

        {/* Slide 4: Substitute Ingredients */}
        <div className="bg-white p-10 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105">
          <img
            src="https://images.pexels.com/photos/2235907/pexels-photo-2235907.jpeg?auto=compress&cs=tinysrgb&w=600" // Add relevant image for ingredient substitution
            alt="Ingredient Substitutes"
            className="mx-auto mb-4 w-full h-72 object-cover rounded-md"
          />
          <h3 className="text-3xl font-semibold text-indigo-600">
            Find Ingredient Substitutes
          </h3>
          <p className="mt-4 text-gray-600 text-lg">
            Can't find a particular ingredient? NutriScan suggests healthy and available substitutes for your recipe.
          </p>
        </div>

        {/* Slide 5: Purchase Links */}
        <div className="bg-white p-10 rounded-lg shadow-lg transition-transform duration-500 ease-in-out transform hover:scale-105">
          <img
            src="https://images.pexels.com/photos/8939510/pexels-photo-8939510.jpeg?auto=compress&cs=tinysrgb&w=600" // Add relevant image for purchase links
            alt="Purchase Links"
            className="mx-auto mb-4 w-full h-72 object-cover rounded-md"
          />
          <h3 className="text-3xl font-semibold text-indigo-600">
            Purchase Ingredients
          </h3>
          <p className="mt-4 text-gray-600 text-lg">
            Get purchase links for healthy food ingredients directly from NutriScan, making it easier to eat healthy.
          </p>
        </div>
      </Carousel>
    </section>
  );
}

export default FeaturesCarousel;
