import React, { useState } from 'react';
import HeaderMenu from '../Menus/HeaderMenu';
import LeftMenu from '../Menus/LeftMenu';
import RightMenu from '../Menus/RightMenu';
import MidSection from '../MiddleSection/MidSection';
import '../styles/DarkMode.css';

function Feed() {
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`Feed ${darkMode ? 'dark-mode' : ''}`}>
      <HeaderMenu darkMode={darkMode}/>
      <LeftMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <RightMenu darkMode={darkMode} />
      <MidSection darkMode={darkMode} />
    </div>
  );
}

export default Feed;
