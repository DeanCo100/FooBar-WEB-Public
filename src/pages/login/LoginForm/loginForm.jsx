import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './loginForm.css';
import axios from 'axios'; // Import axios for making HTTP requests


const LoginForm = ({ onLogin }) => {
  const usernameRef = useRef();
  const passwordRef = useRef();
  const [usernameError, setUsernameError] = useState(null);
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
    const usernameValue = usernameRef.current.value;
    const passwordValue = passwordRef.current.value;
    // The if and the else is for hardcoded enter to modify the feed's UI, NEED TO BE DELETED AT THE END.
    if (usernameValue == 'TzionMea' && passwordValue == 'Mea100100') {
      setUsernameError('');
      navigate('/feed');
      onLogin();
    }
    else {

    try {
      // Send a request to the server to authenticate the user
      const response = await axios.post('http://localhost:8080/api/login', {
        username: usernameValue,
        password: passwordValue
      });

      // If authentication is successful:
      // For now DISMISS the JWT issue. 
      // // Create a JWT token for the user
      // const tokenResponse = await axios.post('http://localhost:8080/api/tokens', {
      //   userId: response.data._id // Assuming the user object returned from login endpoint contains an _id field
      // });
      // // Store the JWT token in localStorage
      // localStorage.setItem('token', tokenResponse.data.token);
      setUsernameError('');
      
      // Redirect to the feed page
      navigate('/feed');
      // Im not sure if it is still necessary, but it was necessary in part 2.
      onLogin();
    } catch (error) {
        // If an error occurs (e.g., incorrect username or password), display the error message
      if (error.response.status === 401) {
        setUsernameError('Incorrect username or password');
      }

    }
  }

  };

  // Function to navigate to the signup page
  const handleCreateAccount = () => {
    navigate('/signup');
  }

  // ORIGIN ****************
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   const usernameValue = usernameRef.current.value;
  //   const passwordValue = passwordRef.current.value;


  //   // No more Hardcoded, we have DB
  //   // // Hardcoded username and password for demonstration purposes
  //   // const hardcodedUsername = 'TzionMea';
  //   // const hardcodedPassword = 'Mea100100';

  //   if (usernameValue === hardcodedUsername && passwordValue === hardcodedPassword) {
  //     // Redirect to Feed page upon successful login
  //     navigate('/feed');
  //     onLogin(); // Notify parent component
  //   } else {
  //     setUsernameError('Incorrect username or password');
  //   }
  // };


// The login FORM
  return (
    <div className="loginForm">
      <div className="form_container">
        <form className="form" onSubmit={handleSubmit}>
          <h2>Login to FooBar</h2>
          <input
            placeholder="Username"
            ref={usernameRef}
          />
          {usernameError && <span>{usernameError}</span>}
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <button className="login-btn" type="submit">
            Log In
          </button>
        </form>
        <div>
          <a href="">
            Forgot password
          </a>
        </div>
      </div>
      <div className="divider_line"></div>
      <div className="create_account">
        <button onClick={handleCreateAccount}>
          Create new account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
