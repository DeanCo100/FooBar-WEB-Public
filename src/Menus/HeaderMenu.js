import 'bootstrap/dist/css/bootstrap.css';
// TopMenu.js
import React from 'react';
import '../styles/MenusStyles/HeaderMenu.css';
// Imports for the left section
import FaceBookIcon from '../icons/header-icons/facebook-icon.png';
import SearchIcon from '../icons/header-icons/search-icon.png';
// Imports for the mid section
import MediaIcon from '../icons/header-icons/computer-monitor-video-play-icon.png';
import GroupIcon from '../icons/header-icons/group-icon.png';
import MarketPlaceIcom from '../icons/header-icons/shop-icon.png';
import GamingIcon from '../icons/header-icons/psp-portable-playstation-icon.png';
import HomeIcon from '../icons/header-icons/home.png';
// Imports for the right section
import UserPicIcon from '../icons/spam/Michael.png';
import NotificationsIcon from '../icons/header-icons/bell-icon.png';
import MessengerIcon from '../icons/header-icons/messenger.png';
import AppsMenu from '../icons/header-icons/apps-grid-icon.png';




function HeaderMenu({ darkMode, profile }) {
  return (
  <div className={`top-menu ${darkMode ? 'dark-mode' : ''}`}>
    <div className='left-sec'>
      <img className='facebook-logo' src={FaceBookIcon} alt = "icon"></img>
      <label className='search-wrapper'>
      <input className="search-box"type='text' placeholder='Seacrh in Facebook'></input>
        <img className='search-icon-img' src={SearchIcon} alt='icon'></img>
      </label>
    </div>

    {/* This is the mid-part of the menu */}
    <div className='mid-menu'>
      <button className = "gaming-button">
        <img src={GamingIcon} alt="Icon"></img>
        <div className="tool-tip">Gaming</div>
      </button>
      <button className = "groups-button">
        <img src={GroupIcon} alt="Icon"></img>
        <div className="tool-tip">Groups</div>
      </button>
      <button className = "marketplace-button">
        <img src={MarketPlaceIcom} alt="Icon"></img>
        <div className="tool-tip">Marketplace</div>
      </button>
      <button className = "videos-button">
        <img src={MediaIcon} alt="Icon"></img>
        <div className="tool-tip">Videos</div>
      </button>
      <button className = "home-button">
        <img src={HomeIcon} alt="Icon"></img>
        <div className="tool-tip">Home</div>
      </button>
    </div>

    {/* This is the right side of the menu */}
    <div className='right-section'>
      <button className='btn-right'>
        <img src={AppsMenu} alt='Icon'></img>
        <div className="tool-tip">Apps Menu</div>

      </button>
      <button className='messenger-btn btn-right'>
        <img src={MessengerIcon} alt='Icon'></img>
        <div className="tool-tip">Messages</div>
        <div class="messages-num">6</div>


      </button>
      <button className='notifications-btn btn-right'>
        <img src={NotificationsIcon} alt='Icon'></img>
        <div className="tool-tip">Notifications</div>
        <div class="notifications-num">2</div>
      </button>
      <span>
        {/* This img needs to be switched with the user registeration img when we'll have a server*/}
        <img src={profile.profilePic} className='usr-pic-header' alt='Icon'></img>
        <div className="tool-tip">Profile</div>
      </span>
    </div>

  </div>
  );
}

export default HeaderMenu;