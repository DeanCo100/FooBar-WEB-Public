import React, { useState } from 'react';
import HeaderMenu from '../Menus/HeaderMenu';
import LeftMenu from '../Menus/LeftMenu';
import RightMenu from '../Menus/RightMenu';
import MidSection from '../MiddleSection/MidSection';
import '../styles/DarkMode.css';

// The feed component
function Feed({ profile }) {
  console.log(profile);
  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`Feed ${darkMode ? 'dark-mode' : ''}`}>
      <HeaderMenu darkMode={darkMode} profile={profile} />
      <LeftMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} profile={profile} />
      <RightMenu darkMode={darkMode} profile={profile} />
      <MidSection darkMode={darkMode} profile={profile} />
    </div>
  );
}

export default Feed;
