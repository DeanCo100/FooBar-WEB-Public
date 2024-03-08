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
import axios from 'axios';

function LeftMenu({ darkMode, toggleDarkMode, profile, setProfile }) {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
  const [displayName, setDisplayName] = useState('');
  // const [profilePic, setProfilePic] = useState(profile.profilePic || null);
  const [profilePic, setProfilePic] = useState(null);

  const [profilePresentedPic, setProfilePresentedPic] = useState(null); // Clone of the profile pic
  const [originalDisplayName, setOriginalDisplayName] = useState('');
  const [originalProfilePic, setOriginalProfilePic] = useState(null);

  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const toggleDeleteProfileModal = () => {
    setShowDeleteProfileModal(!showDeleteProfileModal);
  };

  const handleSaveChanges = async () => {
    if (displayName.trim() === '' || !profilePic || displayName.length < 2) {
      alert('Please provide a valid display name and a profile picture.');
      return;
    }
    // So here I need to extract the modified data and do that:
    // 1. Pass the picture (encoded) and the display name to the server, BUT, maybe for efficiency, I would like to check if the some of them indeed have been changed.
    // 2. I Need to modify the 'profile' by the 'setProfile' based on the new displayName and profilePic.
    // **** SAVE LOGIC: ****
      // The encoding of the pic to 64base:**************************
      let updatedImageUrl;
      if(profilePic != null) {
      updatedImageUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = error => reject(error);
        // reader.readAsDataURL(profilePic);
        reader.readAsDataURL(profilePic);

      });
    } else {
        updatedImageUrl = profile.profilePic;

    }
      // setOriginalDisplayName(displayName)
      const usernameValue = profile.username;
      // Send the request to the server to modify this user's data with the id = username
      // I used PATCH, if needed, modify to PUT
      // await axios.patch(`http://localhost:8080/api/users/:${usernameValue}`, {
      //   displayName,
      //   profilePic: updatedImageUrl // Use updatedImageUrl here
      // });



      // Now after I sent to the server the modified data, I can modify it as well via the 'setProfile'
      const updatedUserData = {
        // If the encoded pic isnt good here, maybe we need to use the reg one.
        profilePic: updatedImageUrl,
        username: usernameValue,
        displayName: displayName,
        };

    setProfile(updatedUserData);
    toggleEditProfileModal(); // Close the modal
  };

  const handleDeleteProfile = async () => {
    // **** DELETE LOGIC: ****
    // Here I need to send to the server via 'DELETE' action the username of the required user to be deleted.
    // The server needs to find this username in the DB and delete it from there.
    try {

      const {username} = profile;
      await axios.delete(`http://localhost:8080/api/users/${username}`);
      console.log('User deleted');
      setUsernameError('');
      navigate('/');
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setUsernameError('Username not found.');
      } else {
        // Handle other errors
        console.error(error);
      }
    }

  };

  const handleDisplayNameChange = (e) => {
    setDisplayName(e.target.value);
    // profile.displayName = displayName;
  };

  const handleProfilePicChange = (e) => {
    const selectedFile = e.target.files[0];
    setProfilePresentedPic(URL.createObjectURL(selectedFile));
    setProfilePic(selectedFile);
  };
  const toggleEditProfileModal = () => {
    setShowEditProfileModal(!showEditProfileModal);
  };
  
  const handleModalHide = () => {
    // Reset input values to their original state when the modal is closed
    setDisplayName(originalDisplayName);
    setProfilePresentedPic(originalProfilePic);
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
              <Form.Label>New Display Name:</Form.Label>
              <Form.Control type="text" value={displayName} onChange={handleDisplayNameChange} />
            </Form.Group>
            <Form.Group controlId="profile-pic">
              <Form.Label>Choose New Profile Picture:</Form.Label>
              {profilePresentedPic && (
                  <img src={profilePresentedPic} alt="Profile" style={{ width: '100px', height: '100px' }} />
                )}

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
