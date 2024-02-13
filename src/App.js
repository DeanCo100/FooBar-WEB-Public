import React, { useState } from 'react';
import './App.css';
import Feed from '../src/Feed/Feed';
// import RightMenu from './Menus/RightMenu';

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };
  return (
    <div className={`App ${darkMode ? 'dark-mode' : ''}`}>
      <Feed darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
    </div>
  );
}

export default App;
