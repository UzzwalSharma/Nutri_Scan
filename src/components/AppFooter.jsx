"use client";

import React from "react";
import { BsDribbble, BsFacebook, BsGithub, BsInstagram, BsTwitter } from "react-icons/bs";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-yellow-400 py-8 dark:bg-gray-900 dark:text-yellow-300">
      <div className="container mx-auto px-6">
        <div className="flex flex-col md:flex-row justify-between">
          {/* Brand Section */}
          <div className="mb-6 md:mb-0">
            <img
              src="https://ibb.co/Sm8j7ZW"
              alt="NutriScan Logo"
              className="h-40 mb-4 rounded-lg"
            />
            <p className="text-gray-200">Empowering your health journey with every bite.</p>
          </div>

          {/* Navigation Links */}
          <div className="grid grid-cols-2 gap-8 mb-6 md:mb-0">
            <div>
              <h4 className="text-orange-500 font-bold">About Us</h4>
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
              <h4 className="text-orange-500 font-bold">Legal</h4>
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
          <p className="text-gray-400 text-sm">© 2024 NutriScan. All rights reserved.</p>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300">
              <BsFacebook size={20} />
            </a>
            <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300">
              <BsInstagram size={20} />
            </a>
            <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300">
              <BsTwitter size={20} />
            </a>
            <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300">
              <BsGithub size={20} />
            </a>
            <a href="#" className="text-gray-200 hover:text-orange-500 transition duration-300">
              <BsDribbble size={20} />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
