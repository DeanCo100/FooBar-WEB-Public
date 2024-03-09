import '../styles/MenusStyles/RightMenu.css';
import BIUlogo from '../icons/right-side-icons/Bar_Ilan_logo.png';
import Contact from './MenuComponents/Contacts';
import contacts from '../data/contacts.json';
import SearchIcon from '../icons/header-icons/search-icon.png';
import dotsIcon from '../icons/right-side-icons/dots.png';
import { useState, useEffect } from 'react';
import axios from 'axios';


// The rightMenu component that renders the Contact component
function RightMenu({ darkMode, profile }) {

  const [contactsList, setContactsList] = useState(contacts)
  const [friendRequests, setFriendRequests] = useState([]);
  const [friendsList, setFriendsList] = useState([]); // Define friendsList state
  const token = localStorage.getItem('token');
  // console.log('lololossssssssslo', profile.username);


  useEffect(() => {
    // Fetch friend requests when the component mounts
    fetchFriendRequests();
    fetchFriends();
  }, []);

  // Function to fetch friend requests received by the user
  const fetchFriendRequests = async () => {
    try {
      const username = profile.username;
      const response = await axios.get(
        `http://localhost:8080/api/users/${username}/friend-requests`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        }
      );
      console.log(response);
      console.log(response.data);
      setFriendRequests(response.data);
      console.log('IN THE FETCH IN THE RIGHT MENU');
      console.log(friendRequests);
    } catch (error) {
      console.log(profile.username)
      console.error('Error fetching friend requests:', error);
    }
  };
  const fetchFriends = async () => {
    try {
      const username = profile.username;
      const response = await axios.get(
        `http://localhost:8080/api/users/${username}/friends`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      // Update the friends list in the state
      setFriendsList(response.data);
    } catch (error) {
      console.error('Error fetching friends:', error);
    }
  };

  // Function to handle accepting a friend request
const acceptFriendRequest = async (friendId) => {
  try {
    const response = await axios.patch(
      `http://localhost:8080/api/users/${profile.username}/friends/${friendId}`,
      null,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Update friend requests and friends list in the client
    setFriendRequests(friendRequests.filter(request => request.userId !== friendId));
    setFriendsList([...friendsList, response.data]); // needs to check what is the response and if its is the relevant response
  } catch (error) {
    console.error('Error accepting friend request:', error);
  }
};

// Function to handle declining a friend request
const declineFriendRequest = async (friendId) => {
  try {
    await axios.delete(
      `http://localhost:8080/api/users/${profile.username}/friends/${friendId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // Update friend requests in the client
    setFriendRequests(friendRequests.filter(request => request.userId !== friendId));
  } catch (error) {
    console.error('Error declining friend request:', error);
  }
};

// Function to handle deleting a friend
const deleteFriend = async (profileUsername, friendId) => {
  try {
    await axios.delete(
      `http://localhost:8080/api/users/${profileUsername}/friends/${friendId}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    // After successful deletion, update the friends list by refetching it
    fetchFriends(); // Assuming fetchFriends is a function that fetches the updated friends list
  } catch (error) {
    console.error('Error deleting friend:', error);
  }
};
  return (
    <div className={`right-menu ${darkMode ? 'dark-mode' : ''}`}>
      
      <nav class={`navbar-right ${darkMode ? 'dark-mode' : ''}`}>
        <div className="sponsored">
          <span className='text-sponsored'>Sponsored By:</span>
        <div className="sponsored-sub">
          <a href="https://www.biu.ac.il/" target='_blank'>
            <img className="biu-icon" src={BIUlogo} alt='Icon'></img></a>
          <div className='icon-info'>Bar Ilan University</div>
        </div>
        </div>
        <div className="sug-contacts">
          {/* The friend Requests section */}
          <div className="friend-requests">
            <div className="friend-requests-title">
              <h2 className="friend-requests-text">Friend Requests:</h2>
            </div>
            <div className="friend-requests-list">
              {/* Display friend requests */}
              {friendRequests.map((request, index) => (
                <div key={index} className="friend-request-item">
                  {/* Display profile picture and display name */}
                  <div className="left-section">
                    <img src={request.profilePic} alt="Profile Pic" className="profile-pic" />
                    <span className="display-name">{request.displayName}</span>
                  </div>
                  {/* Add buttons to accept or decline the friend request */}
                  <div className="right-section">
                    <button onClick={() => acceptFriendRequest(request.userId)}>Accept</button>
                    <button onClick={() => declineFriendRequest(request.userId)}>Decline</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
          {/* The Friends section */}
          <div className="sug-contacts-title">
            <div className="contacts-title-row">
              <span className="sug-contacts-text">Your Friends:</span>
              <button className="search-btn">
                <img src={SearchIcon} alt="Search" />
              </button>
              <button>
                <img src={dotsIcon} alt="More" />
              </button>
            </div>
            <div className="sug-contacts-list">
              {/* Display user's friends */}
              {friendsList.map((friend, index) => (
                <div key={index} className="friend-card">
                  {/* Display profile picture */}
                  <div className="pic-wrapper">
                    <img src={friend.profilePic} alt="Profile Pic" className="friend-pic" />
                  </div>
                  {/* Display display name */}
                  <span className="display-name">{friend.displayName}</span>
                  {/* Delete button */}
                  <button className='delete-button' onClick={() => deleteFriend(profile.username, friend._id)}>Delete</button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
}

export default RightMenu;
