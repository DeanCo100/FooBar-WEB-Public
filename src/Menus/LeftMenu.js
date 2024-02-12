import React, { useState } from 'react';
import '../styles/MenusStyles/LeftMenu.css';
import '../styles/DarkMode.css'; // Import the dark mode CSS file
import GroupIcon from '../icons/left-side-icons/group.png';
import SideBarLink from './MenuComponents/SideBarLink';
import FriendsIcon from '../icons/left-side-icons/friends.png';
import SaveIcon from '../icons/left-side-icons/save.png';
import MemoriesIcon from '../icons/left-side-icons/memories.png';
import VideoIcon from '../icons/header-icons/computer-monitor-video-play-icon.png';
import ProfileIcon from '../icons/header-icons/male-icon.png';
import MarketPlaceIcom from '../icons/header-icons/shop-icon.png';
import LogOutIcon from '../icons/left-side-icons/logout.png';
import DarkModeIcon from '../icons/left-side-icons/night-mode.png';

function LeftMenu() {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkModeToggle = () => {
    setDarkMode(prevMode => !prevMode);
    // Toggle dark mode class on body element
    document.body.classList.toggle('dark-mode', !darkMode);
  };

  return (
    <div className="left-menu">
      <nav className="left-side-navbar">
        <SideBarLink icon={ProfileIcon} text="Profile" />
        <SideBarLink icon={FriendsIcon} text="Friends" />
        <SideBarLink icon={MemoriesIcon} text="Memories" />
        <SideBarLink icon={SaveIcon} text="Saved" />
        <SideBarLink icon={GroupIcon} text="Groups" />
        <SideBarLink icon={VideoIcon} text="Video" />
        <SideBarLink icon={MarketPlaceIcom} text="Marketplace" />
        <div className='btns-wrapper'>
          <button className='logout-btn'>
            <img src={LogOutIcon} alt='LogOut' className='icon'></img>
            Log-out
          </button>
          <button className='darkmode-btn' onClick={handleDarkModeToggle}>
            <img src={DarkModeIcon} alt='DarkMode' className='icon'></img>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </button>
        </div>
      </nav>
    </div>
  );
}

export default LeftMenu;
