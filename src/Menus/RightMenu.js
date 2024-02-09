import '../styles/MenusStyles/RightMenu.css';
import BIUlogo from '../icons/right-side-icons/Bar_Ilan_logo.png';
// import DogFriend from '../icons/friends-icons/dog.png'
// import AIFriend from '../icons/friends-icons/ai-friend.png';
// import GirlFriend from '../icons/friends-icons/girlfriend.png';
// import MustacheFriend from '../icons/friends-icons/mustache-friend.png';
import Contact from './MenuComponents/Contacts';
import contacts from '../data/contacts.json';
import SearchIcon from '../icons/header-icons/search-icon.png';
import dotsIcon from '../icons/right-side-icons/dots.png';
import { useState } from 'react';



function RightMenu() {

  const [contactsList, setContactsList] = useState(contacts)
  
  return (
    <div className="right-menu">
      
      <nav class="navbar-right">
        <div className="sponsored">
          <span className='text-sponsored'>Sponsored By:</span>
        <div className="sponsored-sub">
          <a href="https://www.biu.ac.il/" target='_blank'>
            <img className="biu-icon" src={BIUlogo} alt='Icon'></img></a>
          <div className='icon-info'>Bar Ilan University</div>
        </div>
        </div>
        <div className="sug-contacts">
          <div className='sug-contacts-title'>
            <div className='contacts-title-row'>
              <span className='sug-contacts-text'>Your Contacts:</span>
              <button className='search-btn'><img src={SearchIcon} alt='Search'></img></button>
              <button><img src={dotsIcon} alt='More'></img></button>
            </div>
            {
              contactsList.map((contact) =>
              <Contact {...contact} />
              )
            }
            {/* <div className="friend-card">
              <button className='pic-wrapper'>
                <img className='friend-pic' src={DogFriend} alt='Icon'></img>
              </button>
              <div className='icon-info'>Lavrador Silva</div>
            </div>
            <div className="friend-card">
                <button className='pic-wrapper'>
                  <img className='friend-pic' src={AIFriend} alt='Icon'></img>
                </button>
                <div className='icon-info'>Rami Levy</div>
            </div>
            <div className="friend-card">
                <button className='pic-wrapper'>
                  <img className='friend-pic' src={MustacheFriend} alt='Icon'></img>
                </button>
                <div className='icon-info'>Eran Zahavi</div>
            </div>
            <div className="friend-card">
                <button className='pic-wrapper'>
                  <img className='friend-pic' src={GirlFriend} alt='Icon'></img>
                </button>
                <div className='icon-info'>Omer Atzili</div>
            </div> */}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default RightMenu;
