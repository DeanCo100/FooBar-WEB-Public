import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login/login';
import Feed from '../src/Feed/Feed';
import SignUp from '../src/pages/SignUp';

function App() {
  // State to track whether the use logged in from the login page
  // const [isAuthenticated, setIsAuthenticated] = useState(false);

    // State to hold user data
    const [profile, setProfile] = useState({
      profilePic: null,
      username: '',
      displayName: '',
    });

    // Function to update user data after login
    const handleLogin = (userData) => {
      setProfile(userData);
    };

  // const handleLogin = () => {
  //   // Logic to handle successful login
  //   setIsAuthenticated(true);
  // };
// The App that runs the program and the router to navigate between pages
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<LoginPage onLogin={handleLogin}  profile={profile}/>} />
          {profile.username ? (
            <Route path="/feed" element={<Feed profile={profile} setProfile = {setProfile} />} />
          ) : (
            // Redirect to login page if not authenticated
            <Route path="/feed" element={<Navigate to="/" />} />
          )}
          <Route path="/signup" element={<SignUp/>} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
