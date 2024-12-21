"use client";

import React from "react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-yellow-400 py-12 dark:bg-gray-900 dark:text-yellow-300">
      <div className="container mx-auto px-6">
        {/* Brand Section */}
        <div className="flex flex-col md:flex-row justify-between mb-12">
          <div className="mb-6 md:mb-0 w-full md:w-1/3">
            <img
              src="https://i.ibb.co/NNPvnGQ/Whats-App-Image-2024-10-06-at-09-04-52-bc510686.jpg"
              alt="NutriScan Logo"
              className="h-40 mb-4 rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
            />
            <p className="text-gray-200 text-lg">Empowering your health journey with every bite.</p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 mb-6 md:mb-0 md:w-1/2">
            <div>
              <h4 className="text-orange-500 font-bold text-xl mb-4">About Us</h4>
              <ul>
                <li>
                  <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300">Who We Are</a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300">Our Mission</a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300">Contact</a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-orange-500 font-bold text-xl mb-4">Legal</h4>
              <ul>
                <li>
                  <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300">Privacy Policy</a>
                </li>
                <li>
                  <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300">Terms & Conditions</a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="my-6 border-t border-gray-700" />

        {/* Social Media and Copyright */}
        <div className="flex flex-col md:flex-row items-center justify-between">
          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2024 NutriScan. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0 justify-center md:justify-end">
            <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300 transform hover:scale-110">
              <BsFacebook size={24} />
            </a>
            <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300 transform hover:scale-110">
              <BsInstagram size={24} />
            </a>
            <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300 transform hover:scale-110">
              <BsTwitter size={24} />
            </a>
            <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300 transform hover:scale-110">
              <BsGithub size={24} />
            </a>
            <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300 transform hover:scale-110">
              <BsDribbble size={24} />
            </a>
          </div>
        </div>

        {/* Made with Heart Section */}
        <div className="mt-12 text-center text-gray-400 text-lg md:text-2xl font-semibold animate-pulse">
          <p className="text-yellow-300">Built with ❤️, coffee, and the power of Ctrl+Z</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
