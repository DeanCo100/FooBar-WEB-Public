import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap'; // Import Modal, Button, and Form from react-bootstrap
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
import EditProfileIcon from '../icons/left-side-icons/edit-profile-icon.png';
import DeleteProfileIcon from '../icons/left-side-icons/delete-profile-icon.png';
import '../styles/DarkMode.css'; // Import the dark mode CSS file

function LeftMenu({ darkMode, toggleDarkMode }) {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [displayName, setDisplayName] = useState('');
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();

  const handleLogout = () => {    
    navigate('/');
  };

  const toggleEditProfileModal = () => {
    setShowEditProfileModal(!showEditProfileModal);
  };

  const handleSaveChanges = () => {
    // Validate input
    if (displayName.trim() === '' || !profilePic || displayName.length < 2) {
      alert('Please provide a valid display name and a profile picture.');
      return;
    }
    // Save changes logic
    // You can implement your logic here to save the changes
    toggleEditProfileModal(); // Close the modal
  };
  
  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
  };

  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    setProfilePic(file);
  };
  
  const handleModalHide = () => {
    // Reset input values when modal is closed
    setDisplayName('');
    setProfilePic(null);
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
          <button className='edit-profile-btn' onClick={toggleEditProfileModal}>
            <img src={EditProfileIcon} alt='EditProfile' className='icon'></img> 
            Edit Profile
          </button>
          <button className='edit-profile-btn'>
            <img src={DeleteProfileIcon} alt='DeleteProfile' className='icon'></img> 
            Delete Profile
          </button>
        </div>
      </nav>
      {/* Edit Profile Modal */}
      <Modal show={showEditProfileModal} onHide={toggleEditProfileModal} onExited={handleModalHide}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="display-name">
              <Form.Label>Display Name:</Form.Label>
              <Form.Control type="text" value={displayName} onChange={handleDisplayNameChange} />
            </Form.Group>
            <Form.Group controlId="profile-pic">
              <Form.Label>Profile Picture URL:</Form.Label>
              <Form.Control type="file" onChange={handleProfilePicChange} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleEditProfileModal}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSaveChanges}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LeftMenu;
