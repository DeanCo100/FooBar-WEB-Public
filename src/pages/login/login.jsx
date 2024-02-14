import React from "react";
import "./login.css"
import LoginForm from "./LoginForm/loginForm";

const LoginPage = ()=>{

    return(
      <div className="loginMain">
        <div className="inner_login">
          <div className="logo">
              <h2>
                  facebook
              </h2>
              <p>
                  Connect with friends and the world around you on Facebook.
              </p>
          </div>
          <LoginForm/>
          </div>
      </div>
    )
} 

export default LoginPage
