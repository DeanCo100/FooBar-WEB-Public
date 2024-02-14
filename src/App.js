import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom'; // Import BrowserRouter
import './App.css';
import Feed from '../src/Feed/Feed';
// import RightMenu from './Menus/RightMenu';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  return (
    <Router> {/* Wrap your component with BrowserRouter */}
      <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
        <Feed darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      </div>
    </Router>
  );
}
export default App;
