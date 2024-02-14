// import React, { useState } from 'react';
import '../styles/MenusStyles/LeftMenu.css';
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
import '../styles/DarkMode.css'; // Import the dark mode CSS file

function LeftMenu({ darkMode, toggleDarkMode }) {
  // const [darkMode, setDarkMode] = useState(false);

  // const handleDarkModeToggle = () => {
  //   setDarkMode(prevMode => !prevMode);
  //   // Toggle dark mode class on body element
  //   document.body.classList.toggle('dark-mode', !darkMode);
  // };

  return (
    <div className='left-menu'>
      <nav className={`left-side-navbar ${darkMode ? 'dark-mode' : ''}`}>
        <SideBarLink icon={ProfileIcon} text="Profile" darkMode={darkMode} />
        <SideBarLink icon={FriendsIcon} text="Friends" darkMode={darkMode}/>
        <SideBarLink icon={MemoriesIcon} text="Memories" darkMode={darkMode}/>
        <SideBarLink icon={SaveIcon} text="Saved" darkMode={darkMode}/>
        <SideBarLink icon={GroupIcon} text="Groups" darkMode={darkMode}/>
        <SideBarLink icon={VideoIcon} text="Video" darkMode={darkMode}/>
        <SideBarLink icon={MarketPlaceIcom} text="Marketplace" darkMode={darkMode}/>
        <div className={`btns-wrapper ${darkMode ? 'dark-mode' : ''}`}>
          <button className='logout-btn'>
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


// // import { useHistory } from 'react-router-dom';
// import React, { useState } from 'react';
// import '../styles/MenusStyles/LeftMenu.css';
// import GroupIcon from '../icons/left-side-icons/group.png';
// import SideBarLink from './MenuComponents/SideBarLink';
// import FriendsIcon from '../icons/left-side-icons/friends.png';
// import SaveIcon from '../icons/left-side-icons/save.png'
// import MemoriesIcon from '../icons/left-side-icons/memories.png';
// import VideoIcon from '../icons/header-icons/computer-monitor-video-play-icon.png';
// import ProfileIcon from '../icons/header-icons/male-icon.png'
// import MarketPlaceIcom from '../icons/header-icons/shop-icon.png';
// import LogOutIcon from '../icons/left-side-icons/logout.png';
// import DarkModeIcon from '../icons/left-side-icons/night-mode.png';
// import '../styles/DarkMode.css'


// function LeftMenu() {
//   // const history = useHistory(); // Initialize useHistory hook
    
//   // // Function to handle logout when Login page will be ready
//   //   const handleLogout = () => {
//   //     // Redirect to the login page
//   //     history.push('/login'); // Need to replace '/login' with the actual path of the login page
//   //   };
//   const [darkMode, setDarkMode] = useState(false);

//    // Function to handle dark mode toggle
//   const handleDarkModeToggle = () => {
//   // Toggle the mode
//   setDarkMode(prevMode => !prevMode);
//   };

//   return (
//     <div className={`left-menu ${darkMode ? 'dark-mode' : ''}`}>
//       <nav className="left-side-navbar">
//         <SideBarLink icon={ProfileIcon} text="Profile" />
//         <SideBarLink icon={FriendsIcon} text="Friends" />
//         <SideBarLink icon={MemoriesIcon} text="Memories" />
//         <SideBarLink icon={SaveIcon} text="Saved" />
//         <SideBarLink icon={GroupIcon} text="Groups" />
//         <SideBarLink icon={VideoIcon} text="Video" />
//         <SideBarLink icon={MarketPlaceIcom} text="Marketplace" />
//         <div className='btns-wrapper'>
//           <button className='logout-btn'>
//             <img src={LogOutIcon} alt='LogOut' className='icon'></img>
//           {/* Thats how it should be with the login page */}
//             {/* <img src={LogOutIcon} alt='LogOut'  onClick={handleLogout} className='icon'></img> */}
//           Log-out</button>
//           <button className='darkmode-btn'>
//             <img src={DarkModeIcon} alt='DarkMode' onClick={handleDarkModeToggle} className='icon'></img>
//             {darkMode ? 'Light Mode' : 'Dark Mode'}
//           </button>
//         </div>
//       </nav>
//     </div>
//   );
// }
// export default LeftMenu;
