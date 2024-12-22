import { Link as ScrollLink } from 'react-scroll';
import { Link } from 'react-router-dom';
import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from 'flowbite-react';
import DbBtn from '/src/components/Dbbtn.jsx'; // Import your DbBtn component
import React from 'react';
import { useDarkMode } from './DarkModeContext.jsx';  // Import useDarkMode from the context
import { SignOutButton, useAuth, SignInButton } from '@clerk/clerk-react';
import { motion } from 'framer-motion'; // Import Framer Motion

export default function AppNavbar() {
  const { isDarkMode, setIsDarkMode } = useDarkMode(); // Access the context state
  const { isSignedIn, user } = useAuth(); // Access user data from auth context

  // Animation Variants for Framer Motion
  const menuItemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5, ease: 'easeOut', delay: 0.2 },
    },
  };

  const logoVariants = {
    hover: { scale: 1.1, rotate: 5 },
    initial: { scale: 1, rotate: 0 },
    transition: { duration: 0.3, type: 'spring', stiffness: 200 },
  };

  return (
    <FlowbiteNavbar fluid rounded className={`shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600'}`}>
      <FlowbiteNavbar.Brand href="/">
        {/* Logo Animation */}
        <motion.img
          src="https://i.ibb.co/NNPvnGQ/Whats-App-Image-2024-10-06-at-09-04-52-bc510686.jpg"
          className="mr-3 h-10 sm:h-12 rounded-full hover:transition duration-300 transform"
          alt="NutriScan Logo"
          variants={logoVariants}
          initial="initial"
          whileHover="hover"
          transition="transition"
        />
        <motion.span
          className={`self-center whitespace-nowrap text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-white'} hover:text-yellow-400 transition duration-300 transform hover:scale-105`}
          variants={logoVariants}
          initial="initial"
          whileHover="hover"
          transition="transition"
        >
          NutriScan
        </motion.span>
      </FlowbiteNavbar.Brand>

      <div className="flex md:order-2">
        {/* User Profile and Sign In/Out */}
        {isSignedIn ? (
          <Dropdown arrowIcon={false} inline>
            <Dropdown.Header>
              <span className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>
                {user?.firstName || 'User'} {user?.lastName || ''}
              </span>
              <span className={`block truncate text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                {user?.email}
              </span>
            </Dropdown.Header>
            <Dropdown.Item>Dashboard</Dropdown.Item>
            <Dropdown.Item>Settings</Dropdown.Item>
            <Dropdown.Item>Earnings</Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item>
              <SignOutButton>
                <motion.button className="text-red-500 hover:text-red-700 transition duration-300">
                  Sign Out
                </motion.button>
              </SignOutButton>
            </Dropdown.Item>
          </Dropdown>
        ) : (
          <SignInButton>
            <motion.button className="text-white hover:text-yellow-300 transition duration-300 text-xl">
              Sign In
            </motion.button>
          </SignInButton>
        )}

        {/* Dark Mode Toggle Button */}
        <DbBtn isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />

        {/* Toggle for Mobile Navigation */}
        <FlowbiteNavbar.Toggle />
      </div>

      {/* Navbar Links for Desktop */}
      <FlowbiteNavbar.Collapse>
        {/* Animating Menu Links */}
        <motion.div variants={menuItemVariants} initial="hidden" animate="visible">
          <FlowbiteNavbar.Link href="/" active className="text-white hover:text-yellow-300 transition duration-300 text-xl">
            Home
          </FlowbiteNavbar.Link>
        </motion.div>

        <motion.div variants={menuItemVariants} initial="hidden" animate="visible">
          <Link to="/Aboutus" className="text-white hover:text-yellow-300 transition duration-300 text-xl">
            About
          </Link>
        </motion.div>

        <motion.div variants={menuItemVariants} initial="hidden" animate="visible">
          <FlowbiteNavbar.Link className="text-white hover:text-yellow-300 transition duration-300 text-xl">
            <ScrollLink to="diet-plan-section" smooth={true} duration={500}>
              Diet Planner
            </ScrollLink>
          </FlowbiteNavbar.Link>
        </motion.div>

        <motion.div variants={menuItemVariants} initial="hidden" animate="visible">
          <FlowbiteNavbar.Link className="text-white hover:text-yellow-300 transition duration-300 text-xl">
            <ScrollLink to="ingredient-substitute-section" smooth={true} duration={500}>
              Substitute Finder
            </ScrollLink>
          </FlowbiteNavbar.Link>
        </motion.div>

        <motion.div variants={menuItemVariants} initial="hidden" animate="visible">
          <Link to="/pricing" className="text-white hover:text-yellow-300 transition duration-300 text-xl">
          Pricing
          </Link>
        </motion.div>

        {/* <motion.div variants={menuItemVariants} initial="hidden" animate="visible">
          <FlowbiteNavbar.Link href="pricing" className="text-white hover:text-yellow-300 transition duration-300 text-xl">
            Pricing
          </FlowbiteNavbar.Link>
        </motion.div> */}

        {/* Manage Profile Link */}
       
        <motion.div variants={menuItemVariants} initial="hidden" animate="visible">
          <Link to="/profile" className="text-white hover:text-yellow-300 transition duration-300 text-xl">
          Manage Profile
          </Link>
        </motion.div>
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}
