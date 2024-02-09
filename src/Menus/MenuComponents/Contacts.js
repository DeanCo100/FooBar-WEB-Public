import React from 'react';


function Contact({ id, pic, friendName }) {
  return (
<div className="friend-card" id={id}>
  <button className='pic-wrapper'>
    <img className='friend-pic' src={pic} alt='pic'></img>
  </button>
  <div className='icon-info'>{friendName}</div>
</div>
  );
}

export default Contact;