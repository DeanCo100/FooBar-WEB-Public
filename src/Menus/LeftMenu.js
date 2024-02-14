// import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/MenusStyles/LeftMenu.css';
import GroupIcon from '../icons/left-side-icons/group.png';
import SideBarLink from './MenuComponents/SideBarLink';
import FriendsIcon from '../icons/left-side-icons/friends.png';
import SaveIcon from '../icons/left-side-icons/save.png';
import MemoriesIcon from '../icons/left-side-icons/memories.png';
import VideoIcon from '../icons/header-icons/computer-monitor-video-play-icon.png';
import ProfileIcon from '../icons/spam/Michael.png';
import MarketPlaceIcom from '../icons/header-icons/shop-icon.png';
import LogOutIcon from '../icons/left-side-icons/logout.png';
import DarkModeIcon from '../icons/left-side-icons/night-mode.png';
import '../styles/DarkMode.css'; // Import the dark mode CSS file

function LeftMenu({ darkMode, toggleDarkMode }) {
  const navigate = useNavigate();
// Handles the logout button click
  const handleLogout = () => {
    // Perform any logout logic here
    // For example, clearing local storage, resetting state, etc.
    
    // Navigate to the login page
    navigate('/login');
  };

  return (
    <div className='left-menu'>
      <nav className={`left-side-navbar ${darkMode ? 'dark-mode' : ''}`}>
        <SideBarLink className='user-pic-side' icon={ProfileIcon} text="Tzion Mea" darkMode={darkMode} />
        <SideBarLink icon={FriendsIcon} text="Friends" darkMode={darkMode}/>
        <SideBarLink icon={MemoriesIcon} text="Memories" darkMode={darkMode}/>
        <SideBarLink icon={SaveIcon} text="Saved" darkMode={darkMode}/>
        <SideBarLink icon={GroupIcon} text="Groups" darkMode={darkMode}/>
        <SideBarLink icon={VideoIcon} text="Video" darkMode={darkMode}/>
        <SideBarLink icon={MarketPlaceIcom} text="Marketplace" darkMode={darkMode}/>
        <div className={`btns-wrapper ${darkMode ? 'dark-mode' : ''}`}>
          <button className='logout-btn' onClick={handleLogout}>
            <img src={LogOutIcon} alt='LogOut' className='icon'></img>
            Log-out
          </button>
          <button className='darkmode-btn' onClick={toggleDarkMode}>
            <img src={DarkModeIcon} alt='DarkMode' className='icon'></img>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default LeftMenu;

