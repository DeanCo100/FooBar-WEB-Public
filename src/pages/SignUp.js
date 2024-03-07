import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// The GPT said to import it. I dont know if it is allowed to use.
import axios from 'axios'; // Import axios for making HTTP requests


import './SignUp.css';

function SignUp() {
  const [profilePic, setProfilePic] = useState(null);
  const [presentedPic, setPresentedPic] = useState(null);
  const [username, setUsername] = useState('');
  const [displayName, setDisplayName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [displayNameError, setDisplayNameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');

  const navigate = useNavigate();

  const handleProfilePicChange = (e) => {
    const selectedFile = e.target.files[0];
    setPresentedPic(URL.createObjectURL(selectedFile));
    // setProfilePic(URL.createObjectURL(selectedFile));
    setProfilePic(selectedFile);
    console.log(selectedFile);
  };

  // When click 'signIn' moves to the login page
  const handleSignInClick = () => {
    navigate('/');
  }

// Adjusted SignUpClick function to communicate with the server
const handleSignUpClick = async (e) => {
  e.preventDefault(); // Prevent default form submission

  // Check if all fields are valid
  if (usernameError || displayNameError || passwordError || confirmPasswordError) {
    // If any error exists, display error messages
    return;
  }

  try {
    // ADDED NOW *************
   // Declare updatedImageUrl variable
    let updatedImageUrl;
    // ADDED NOW *************
    updatedImageUrl = await new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = error => reject(error);
      reader.readAsDataURL(profilePic);
    });
    // Send a request to the server to create a new user
    await axios.post('http://localhost:8080/api/users', {
      username,
      displayName,
      password,
      profilePic: updatedImageUrl // Use updatedImageUrl here
    });

    // If successful, navigate to the login page and "clean" the username error
    setUsernameError('');
    navigate('/');
  } catch (error) {
    // If an error occurs (e.g., username already taken), display the error message
    if(error.response.status === 401) {
      setUsernameError('Username already taken. Please select a different username');
    }
  }
}
  // Function to validate the userName
  const handleUsernameChange = (e) => {
    const inputValue = e.target.value;
    setUsername(inputValue);
    // Check if username is too short
    if (inputValue.length < 8) {
      setUsernameError('Username must be at least 8 characters long.');
    } // Check if username contains invalid characters
     else if (!/^[a-zA-Z0-9]+$/.test(inputValue)) {
      setUsernameError('Username can only contain English letters and/or numbers.');
    } else if (inputValue.length > 25) {
      setUsernameError('The username max length is 25 characters long.');
    }

    else {
      setUsernameError('');
    }
  };
  // Function to validate the displayName
  const handleDisplayNameChange = (e) => {
    const inputValue = e.target.value;
    setDisplayName(inputValue);
    if(inputValue.length < 2) {
      setDisplayNameError('Display name must be at least 2 characters long.');
    }
    else if (inputValue.length > 25) {
      setDisplayNameError('Display name max length is 25 characters long.');
    }
    // Check if first two characters are not English letters
    else if (!/^[a-zA-Z]{2}/.test(inputValue)) {
      setDisplayNameError('Display name must start with at least 2 English letters.');
    }
    // Check if display name contains invalid characters
    else if (!/^[a-zA-Z0-9\s]*$/.test(inputValue)) {
      setDisplayNameError('Display name must contain only English letters, numbers, or spaces.');
    } else {
      setDisplayNameError('');
    }
    
  };
  // Function to validate the password
  const handlePasswordChange = (e) => {
    const inputValue = e.target.value;
    // Check if password contains only English letters and numbers
    const containsInvalidCharacters = /[^a-zA-Z\d]/.test(inputValue);
    setPassword(inputValue);
    if (inputValue.length < 8) {
      setPasswordError('Password must be at least 8 characters long.');
    }
    else if (inputValue.length > 25) {
      setPasswordError('Password max length is 25 characters.');
    } 
    // Check if password contains at least one uppercase letter, one lowercase letter, and one number
    else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}/.test(inputValue)) {
      setPasswordError('Password must contain at least one uppercase letter, one lowercase letter, and one number.');
    } 
    else if (containsInvalidCharacters) {
      setPasswordError('Password can only contain English letters and numbers.');
    } else {
      setPasswordError('');
    }
  };

  // Function to check that the passwords indeed the same
  const handleConfirmPasswordChange = (e) => {
    const inputValue = e.target.value;
    setConfirmPassword(inputValue);
    // If they arent the same
    if(inputValue != password) {
        setConfirmPasswordError('Passwords does not match!');
    }
    else {
      setConfirmPasswordError('');
    }
  };
// The signup page
  return (
    <div className='wrapper'>
      <div className='signup-container'>
        <div className='logo-signup-container'>
          <h2 className='logo-signup'>FooBar</h2>
        </div>
        <form className="form-container" onSubmit={handleSignUpClick}>
          <h2>Create an account</h2>
          <div className="form-group">

            <input required type="text" id="username" placeholder='Enter Username' value={username} onChange={handleUsernameChange} />
            {usernameError && <p className="error-message">{usernameError}</p>}
          </div>
          <div className="form-group">
            <input required type="text" id="displayname" placeholder='Enter Display Name' onChange={handleDisplayNameChange} />
            {displayNameError && <p className="error-message">{displayNameError}</p>}
          </div>
          <div className="form-group">
            <input required type="password" id="password" placeholder='Password' onChange={handlePasswordChange} />
            {passwordError && <p className="error-message">{passwordError}</p>}
          </div>
          <div className="form-group">
            <input required type="password" id="confirmPassword" placeholder='Confirm Password' onChange={handleConfirmPasswordChange} />
            {confirmPasswordError && <p className="error-message">{confirmPasswordError}</p>}
          </div>
          <div className='form-group'>
            <input required type='file' className='img-input' onChange={handleProfilePicChange} />
            {profilePic && <img src={presentedPic} alt="Profile Pic" className="profile-pic-preview" style={{ width: '100px', height: '100px' }} />}
          </div>
          <button type="submit" className='submit-btn-form'>Sign Up</button>
          <p>Already have an account? <button className='signin-btn' onClick={handleSignInClick}>Sign In</button></p>
        </form>
      </div>
    </div>
  );
}

export default SignUp;




