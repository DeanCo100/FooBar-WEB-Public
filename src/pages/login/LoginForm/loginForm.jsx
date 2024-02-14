import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import './loginForm.css';

const LoginForm = ({ onLogin }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const [usernameError, setUsernameError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const usernameValue = emailRef.current.value;
    const passwordValue = passwordRef.current.value;

    // Hardcoded username and password for demonstration purposes
    const hardcodedUsername = 'TzionMea';
    const hardcodedPassword = 'Mea100100';

    if (usernameValue === hardcodedUsername && passwordValue === hardcodedPassword) {
      // Redirect to Feed page upon successful login
      navigate('/feed');
      onLogin(); // Notify parent component
    } else {
      setUsernameError('Incorrect username or password');
    }
  };

  return (
    <div className="loginForm">
      <div className="form_container">
        <form className="form" onSubmit={handleSubmit}>
          <input
            placeholder="Email or phone number"
            ref={emailRef}
          />
          {usernameError && <span>{usernameError}</span>}
          <input
            type="password"
            placeholder="Password"
            ref={passwordRef}
          />
          <button type="submit">
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
        <button>
          Create new account
        </button>
      </div>
    </div>
  );
};

export default LoginForm;
