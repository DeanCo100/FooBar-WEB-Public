import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Modal, Button, Form } from 'react-bootstrap';
import '../styles/MenusStyles/LeftMenu.css';
import GroupIcon from '../icons/left-side-icons/group.png';
import SideBarLink from './MenuComponents/SideBarLink';

import FriendsIcon from '../icons/left-side-icons/friends.png';
import SaveIcon from '../icons/left-side-icons/save.png';
import MemoriesIcon from '../icons/left-side-icons/memories.png';
import VideoIcon from '../icons/header-icons/computer-monitor-video-play-icon.png';
import MarketPlaceIcom from '../icons/header-icons/shop-icon.png';
import LogOutIcon from '../icons/left-side-icons/logout.png';
import DarkModeIcon from '../icons/left-side-icons/night-mode.png';
import EditProfileIcon from '../icons/left-side-icons/edit-profile-icon.png';
import DeleteProfileIcon from '../icons/left-side-icons/delete-profile-icon.png';
import '../styles/DarkMode.css';
import axios from 'axios';

function LeftMenu({ darkMode, toggleDarkMode, profile, setProfile, setPosts, posts}) {
  const [showEditProfileModal, setShowEditProfileModal] = useState(false);
  const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
  const [displayName, setDisplayName] = useState('');
  // const [profilePic, setProfilePic] = useState(profile.profilePic || null);
  const [profilePic, setProfilePic] = useState(null);

  const [profilePresentedPic, setProfilePresentedPic] = useState(null); // Clone of the profile pic
  const [originalDisplayName, setOriginalDisplayName] = useState('');
  const [originalProfilePic, setOriginalProfilePic] = useState(null);
  // const [posts, setPosts] = useState([]);

  const navigate = useNavigate();
  const [usernameError, setUsernameError] = useState('');

  const handleLogout = () => {
    navigate('/');
  };

  const toggleDeleteProfileModal = () => {
    setShowDeleteProfileModal(!showDeleteProfileModal);
  };

  useEffect(() => {
    fetchPosts();
  }, [profile.username]);

// Function to fetch the posts. Neccessary to rerender them after the user changes his profile.
  const fetchPosts = async () => {
    const token = localStorage.getItem('token');
    try {
      const response = await axios.get(`http://localhost:8080/api/posts`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log('IN LEFT MENU FETCH');
      console.log(response.data);
      setPosts(response.data);
      console.log(posts);
    } catch (error) {
      setPosts([]);
      console.error(error);
      alert('Failed to fetch posts. Please try again.');
    }
  };

  // Function that handle the changes that the user made in his profile.
  const handleSaveChanges = async () => {
    if (displayName.trim() === '' || !profilePic || displayName.length < 2 || displayName.length > 25) {
      alert('Please provide a valid display name (between 2 to 25 characters) and a profile picture.');
      return;
    } 
// Encoding the pic to base64
    let updatedImageUrl;
    if(profilePic != null) {
      updatedImageUrl = await new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onloadend = () => resolve(reader.result);
        reader.onerror = error => reject(error);          // reader.readAsDataURL(profilePic);
        reader.readAsDataURL(profilePic);
    });
    } else {
        updatedImageUrl = profile.profilePic;
    }
    try {
      const usernameValue = profile.username;
      const token = localStorage.getItem('token');
      await axios.patch(`http://localhost:8080/api/users/${usernameValue}`, {
        displayName,
        profilePic: updatedImageUrl // Use updatedImageUrl here
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      const updatedUserData = {
        _id: profile._id,
        profilePic: updatedImageUrl,
        username: usernameValue,
        displayName: displayName,
        };
      setProfile(updatedUserData);
      // Fetch posts again and update the state
      await fetchPosts();
      toggleEditProfileModal(); // Close the modal
    } catch (error) {
      if (error.response && error.response.status === 404) {
        setUsernameError('Username not found.');
      } else {
        // Handle other errors
        console.error(error);
      }
    }    
  };

  const handleDeleteProfile = async () => {
    try {
      const {username} = profile;
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/api/users/${username}`, {
        headers: {
          Authorization: `Bearer ${token}` 
        }
      });
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
