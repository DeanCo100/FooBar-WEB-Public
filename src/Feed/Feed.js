import React, { useState } from 'react';
import HeaderMenu from '../Menus/HeaderMenu';
import LeftMenu from '../Menus/LeftMenu';
import RightMenu from '../Menus/RightMenu';
import MidSection from '../MiddleSection/MidSection';
import '../styles/DarkMode.css';

// The feed component
function Feed({ profile, setProfile }) {
  console.log(profile);
  const [darkMode, setDarkMode] = useState(false);
  // Posts moved to here to be able to send it 'down' to LeftMenu and MidSection
  const [posts, setPosts] = useState([]);
  // Need to do this to rerender the comments when user changing his pic or name
  const [comments, setComments] = useState([]); // Need to send this as parameters as well to 'Left Menu' and add it there as parameters as well and modify the comments based on the new changes.


  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <div className={`Feed ${darkMode ? 'dark-mode' : ''}`}>
      <HeaderMenu darkMode={darkMode} profile={profile} />
      <LeftMenu darkMode={darkMode} toggleDarkMode={toggleDarkMode} profile={profile} setProfile={setProfile} setPosts={setPosts} posts={posts} />
      <RightMenu darkMode={darkMode} profile={profile} />
      <MidSection darkMode={darkMode} profile={profile} setPosts={setPosts} posts={posts} />
    </div>
  );
}

export default Feed;
