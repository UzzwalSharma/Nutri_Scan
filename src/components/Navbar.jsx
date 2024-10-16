// src/components/AppNavbar.jsx
import { Avatar, Dropdown, Navbar as FlowbiteNavbar } from 'flowbite-react';
import DbBtn from '/src/components/Dbbtn.jsx'; // Import your DbBtn component
import React from 'react'; 
import { useDarkMode } from './DarkModeContext.jsx';  // Import useDarkMode from the context
import { SignOutButton , useAuth ,SignInButton } from '@clerk/clerk-react';
export default function AppNavbar() {
  const { isDarkMode, setIsDarkMode } = useDarkMode(); // Access the context state
  const { isSignedIn } = useAuth();
  return (
    <FlowbiteNavbar fluid rounded className={`shadow-lg ${isDarkMode ? 'bg-gray-800' : 'bg-gradient-to-r from-blue-500 via-indigo-600 to-purple-600'}`}>
      <FlowbiteNavbar.Brand href="/">
        <img
          src="https://i.ibb.co/NNPvnGQ/Whats-App-Image-2024-10-06-at-09-04-52-bc510686.jpg" // Adjust your logo image path
          className="mr-3 h-10 sm:h-12 rounded-full hover:transition duration-300 transform hover:scale-105"
          alt="NutriScan Logo"
        />
        <span className={`self-center whitespace-nowrap text-2xl font-bold ${isDarkMode ? 'text-gray-200' : 'text-white'} hover:text-yellow-400 transition duration-300 transform hover:scale-105`}>
          NutriScan
        </span>
      </FlowbiteNavbar.Brand>
      <div className="flex md:order-2">
        <Dropdown arrowIcon={false} inline>
          <Dropdown.Header>
            <span className={`block text-sm font-semibold ${isDarkMode ? 'text-gray-200' : 'text-gray-900'}`}>Bonnie Green</span>
            <span className={`block truncate text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>name@nutriscan.com</span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Settings</Dropdown.Item>
          <Dropdown.Item>Earnings</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item><SignOutButton /></Dropdown.Item>
        </Dropdown>
        <FlowbiteNavbar.Toggle />
        <div>
          <DbBtn isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode} />
        </div>
      </div>
      <FlowbiteNavbar.Collapse>
        <FlowbiteNavbar.Link href="/" active className="text-white hover:text-yellow-300 transition duration-300 text-xl">
          Home
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="#about" className="text-white hover:text-yellow-300 transition duration-300 text-xl">
          About
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="#services" className="text-white hover:text-yellow-300 transition duration-300 text-xl">
          Services
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="#pricing" className="text-white hover:text-yellow-300 transition duration-300 text-xl">
        {isSignedIn ? (
         
            <SignOutButton>
              <button className="text-white hover:text-yellow-300 transition duration-300 text-xl">Sign Out</button>
            </SignOutButton>
      
        ) : (
        
            <SignInButton>
              <button className="text-white hover:text-yellow-300 transition duration-300 text-xl">Sign In</button>
            </SignInButton>
       
        )}
        </FlowbiteNavbar.Link>
        <FlowbiteNavbar.Link href="/profile" className="text-white hover:text-yellow-300 transition duration-300 text-xl">
          Manage Profile
        </FlowbiteNavbar.Link>
        
        {/* Add the DbBtn to the navbar */}
        
      </FlowbiteNavbar.Collapse>
    </FlowbiteNavbar>
  );
}
