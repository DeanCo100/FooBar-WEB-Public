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
  const token = localStorage.getItem('token');
  // console.log('lololossssssssslo', profile.username);


  useEffect(() => {
    // Fetch friend requests when the component mounts
    fetchFriendRequests();
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
              <span className="friend-requests-text">Friend Requests:</span>
            </div>
            <div className="friend-requests-list">
              {/* Display friend requests */}
              {friendRequests.map((request, index) => (
                <div key={index} className="friend-request-item">
                  {/* Display information about the friend request */}
                  <span>{request.sender}</span>
                  {/* Add buttons to accept or decline the friend request */}
                  <button>Accept</button>
                  <button>Decline</button>
                </div>
              ))}
            </div>
          </div>
          <div className='sug-contacts-title'>
            <div className='contacts-title-row'>
              <span className='sug-contacts-text'>Your Friends:</span>
              <button className='search-btn'><img src={SearchIcon} alt='Search'></img></button>
              <button><img src={dotsIcon} alt='More'></img></button>
            </div>
            {
              contactsList.map((contact) =>
              <Contact {...contact} profile={profile} />
              )
            }
          </div>
        </div>
      </nav>
    </div>
  );
}

export default RightMenu;
