import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home'; // Importing the Home component
import Navbar from './components/Navbar'; // Assuming you have your Navbar with dark mode logic
import { DarkModeProvider } from './components/DarkModeContext'; // Context for dark mode
import  Footer  from '/src/components/AppFooter.jsx'; 
function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Navbar /> {/* Navbar will always be displayed */}
        <Routes>
          <Route path="/" element={<Home />} /> {/* Home route */}
        </Routes>
        <Footer/>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
