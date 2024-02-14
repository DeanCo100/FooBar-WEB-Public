import React from 'react';

function SideBarLink({ icon, text, darkMode }) {
  return (
    <div className={`side-bar-link ${darkMode ? 'dark-mode' : ''}`}>
      <img src={icon} alt={text}></img>
      <div className='icon-info'>{text}</div>
    </div>
  );
}

export default SideBarLink;