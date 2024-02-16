import '../styles/MenusStyles/RightMenu.css';
import BIUlogo from '../icons/right-side-icons/Bar_Ilan_logo.png';
import Contact from './MenuComponents/Contacts';
import contacts from '../data/contacts.json';
import SearchIcon from '../icons/header-icons/search-icon.png';
import dotsIcon from '../icons/right-side-icons/dots.png';
import { useState } from 'react';


// The rightMenu component that renders the Contact component
function RightMenu({ darkMode }) {

  const [contactsList, setContactsList] = useState(contacts)
  
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
          </div>
        </div>
      </nav>
    </div>
  );
}

export default RightMenu;
