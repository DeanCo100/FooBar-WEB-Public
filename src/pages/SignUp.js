import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import './SignUp.css';

function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const navigate = useNavigate();


  // Function to handle profile picture change
  const handleProfilePicChange = (e) => {
    // Access the first file selected
    const selectedFile = e.target.files[0];
    // Set the profilePic state to the URL of the selected file
    setProfilePic(URL.createObjectURL(selectedFile));
  };

  const handleSignInClick = () => {
    // Navigate to the login page
    navigate('/');
  }

  const handleSignUpClick = () => {
    // Navigate to the login page
    navigate('/');
  }

  return (
    <div className='wrapper'>
      <div className='signup-container'>
        <div className='logo-signup-container'>
          <h2 className='logo-signup'>FooBar</h2>
        </div>
          <form className="form-container">
            <h2>Create an account</h2>
            <div className="form-group">
              <input type="text" id="firstName" placeholder='Enter Username' />
            </div>
            <div className="form-group">
              <input type="text" id="lastName" placeholder='Enter Display Name' />
            </div>
            <div className="form-group">
              <input type="password" id="password" placeholder='Password' />
            </div>
            <div className="form-group">
              <input type="password" id="password" placeholder='Confirm Password' />
            </div>
            <div className='form-group'>
              {/* Input field for selecting profile picture */}
              <input type='file' onChange={handleProfilePicChange} />
              {/* Display the selected profile picture */}
              {profilePic && <img src={profilePic} alt="Profile Pic" className="profile-pic-preview" style={{ width: '100px', height: '100px' }} />}
            </div>
            <button type="submit" onClick={handleSignUpClick}>Sign Up</button>
            <p>Already have an account? <a className='signin-btn' onClick={handleSignInClick}>Sign In</a></p>
          </form>
        </div>
      </div>
  );
}

export default SignUp;
