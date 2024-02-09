import React from 'react';

function SideBarLink({ icon, text }) {
  return (
    <div className="side-bar-link">
      <img src={icon} alt={text}></img>
      <div className='icon-info'>{text}</div>
    </div>
  );
}

export default SideBarLink;