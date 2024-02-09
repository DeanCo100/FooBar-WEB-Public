import React,{useRef,useState} from "react";
import './loginForm.css'
import { Button } from "bootstrap";

const LoginForm = (e) => {
 const emailRef = useRef()
 const passwordRef = useRef()
 const [usernameError, setEmailError]=useState(null)


const handleSubmit = (e) =>{
    e.preventDefault()
    let usernameValue =  emailRef.current.value
    let passwordValue = passwordRef.current.value
    if(usernameError) setEmailError(null)

    if(!usernameValue.includes('@')){
      setEmailError('Missing @ inside the email')
      return
    } 

}
  return(
    <div className="loginForm">
        <div className="form_container">
            <form className="form" onSubmit={handleSubmit}>
                <input
                  placeholder="Email or phone number"
                  ref={emailRef}
                  />
                  { usernameError ? <span>{usernameError}</span> : null}
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
  ) 
}
export default LoginForm;