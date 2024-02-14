import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import './App.css';
import LoginPage from './pages/login/login';
import Feed from '../src/Feed/Feed';

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  const handleLogin = (username, password) => {
    // Hardcoded username and password for demonstration purposes
    const hardcodedUsername = 'TzionMea';
    const hardcodedPassword = 'Mea100100';

    if (username === hardcodedUsername && password === hardcodedPassword) {
      setIsAuthenticated(true);
    } else {
      // Show error message or handle invalid login
      console.log("Invalid username or password");
    }
  };

  return (
    <Router>
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <Routes>
          {/* Instead of Feed in the first route it should be loginPage */}
          <Route path="/login" element={<Feed onLogin={handleLogin} />} />
          <Route path="/" element={isAuthenticated ? <Feed darkMode={darkMode} toggleDarkMode={toggleDarkMode} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
