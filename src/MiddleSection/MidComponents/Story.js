import React from 'react';

const Story = ({ imageUrl, userProfileUrl, userName }) => {
  return (
    <div className="story">
      <div className="story-image" style={{backgroundImage: `url("${imageUrl}")`}}></div>
      <div className="user-profile">
        <img src={userProfileUrl} alt="User Profile" />
      </div>
      <div className="user-name">{userName}</div>
    </div>
  );
}

export default Story;
