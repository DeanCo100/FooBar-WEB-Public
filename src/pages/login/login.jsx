import React from "react";
import "./login.css"
import LoginForm from "./LoginForm/loginForm";
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const handleLogin = (username, password) => {
    onLogin(username, password); // Call the parent onLogin function
    navigate('/feed'); // Redirect to the Feed page
  };

  return (
    <div className="loginMain">
      <div className="inner_login">
        <div className="logo">
          <h2>FooBar</h2>
          <p>Connect with friends and the world around you on <strong>FooBar</strong>.</p>
        </div>
        <LoginForm onLogin={handleLogin} />
      </div>
    </div>
  );
};

export default LoginPage;
