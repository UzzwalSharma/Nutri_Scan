import React, { useEffect, useRef, useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Navbar from './components/Navbar';
import { DarkModeProvider } from './components/DarkModeContext';
import Footer from '/src/components/AppFooter.jsx';
import NutriScan from '/src/components/NutriScan';
import SkinScanner from './components/SkinScanner';
import Chat from './components/Chat';
import { SignIn, SignUp, useAuth, SignedOut, UserProfile } from '@clerk/clerk-react';
import toast, { Toaster } from 'react-hot-toast';
import "/src/App.css";

function ProtectedRoute({ children }) {
  const { isSignedIn } = useAuth();
  const [redirect, setRedirect] = useState(false); // State to handle redirect
  const toastDisplayed = useRef(false); // Ref to track toast display status

  useEffect(() => {
    if (!isSignedIn && !toastDisplayed.current) {
      toast.error('You must be signed in to access this page!');
      toastDisplayed.current = true;

      // Set a 2-second delay before redirecting
      setTimeout(() => {
        setRedirect(true);
      }, 2000);
    }
  }, [isSignedIn]);

  if (redirect) {
    return <Navigate to="/login" replace />;
  }

  // Render children only if the user is signed in
  return isSignedIn ? children : null;
}

function App() {
  return (
    <DarkModeProvider>
      <Router>
        <Navbar />
        <Toaster /> {/* Toaster for notifications */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/nutriscan" element={<NutriScan />} /> */}
          <Route path="/login" element={
            <div style={{display:"flex"
              , alignItems:"center" , justifyContent:"center" , margin:"50px"
            }}>
            <SignIn />
            
            </div> } />
          <Route path="/signup" element={<SignUp />} />

          {/* Protected route for profile */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />

          {/* Protected routes using ProtectedRoute */}
          <Route
            path="/scanner"
            element={
              <ProtectedRoute>
                <div className="center-container">
                  <SkinScanner />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/nutriscan"
            element={
              <ProtectedRoute>
                <div className="center-container">
                  <NutriScan />
                </div>
              </ProtectedRoute>
            }
          />
          <Route
            path="/chat"
            element={
              <ProtectedRoute>
                <div className="center-container">
                  <Chat />
                </div>
              </ProtectedRoute>
            }
          />
        </Routes>

        {/* Footer */}
        <Footer />

        {/* Show a toast for sign-out */}
        <SignedOut>
          {() => toast.info('You have signed out!')}
        </SignedOut>
      </Router>
    </DarkModeProvider>
  );
}

export default App;
