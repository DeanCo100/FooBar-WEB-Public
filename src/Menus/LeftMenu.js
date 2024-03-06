import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
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
import '../styles/DarkMode.css';

function LeftMenu({ darkMode, toggleDarkMode, profile }) {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
  const [displayName, setDisplayName] = useState(profile.displayName || '');
  const [profilePic, setProfilePic] = useState(profile.profilePic || null);
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate('/');
  };

  const toggleEditProfileModal = () => {
    setShowEditProfileModal(!showEditProfileModal);
  };

  const toggleDeleteProfileModal = () => {
    setShowDeleteProfileModal(!showDeleteProfileModal);
  };

  const handleSaveChanges = () => {
    if (displayName.trim() === '' || !profilePic || displayName.length < 2) {
      alert('Please provide a valid display name and a profile picture.');
      return;
    }
    // **** SAVE LOGIC: ****
    // Here I need to send to the server the modified user's data by 'PUT/PATCH' and it will store it in the DB.
    // **** I also need to code the picture in 64bit somehow and pass it to the server encoded.
    toggleEditProfileModal(); // Close the modal
  };

  const handleDeleteProfile = () => {
    // **** DELETE LOGIC: ****
    // Here I need to send to the server via 'DELETE' action the username of the required user to be deleted. The server needs to find this username in the DB and delete it from there.
    navigate('/'); 
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
        <SideBarLink className='user-pic-side' icon={profile.profilePic} text={profile.displayName} darkMode={darkMode} />
        {/* <SideBarLink className='user-pic-side' icon={ProfileIcon} text="Tzion Mea" darkMode={darkMode} /> */}
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
          <button className='delete-profile-btn' onClick={toggleDeleteProfileModal}>
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
              <Form.Label>Profile Picture:</Form.Label>
              {/* {profilePic ? (
                <img src={URL.createObjectURL(profilePic)} alt="Profile" style={{ width: '100px', height: '100px' }} />
              ) : (
                <img src={ProfileIcon} alt="Default Profile" style={{ width: '100px', height: '100px' }} />
              )} */}
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
      {/* Delete Profile Modal */}
      <Modal show={showDeleteProfileModal} onHide={toggleDeleteProfileModal}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete your profile?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleDeleteProfileModal}>
            No
          </Button>
          <Button variant="warning" onClick={handleDeleteProfile}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default LeftMenu;
