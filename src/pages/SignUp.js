import React from 'react';
import './SignUp.css';

function SignUp() {
  return (
    <div className='wrapper'>
      <div className='signup-container'>
        <div className='logo-signup-container'>
          <h2 className='logo-signup'>FooBar</h2>
        </div>
          <form className="form-container">
            <h2>Create an acoount</h2>
            <div className="form-group">
              {/* <label htmlFor="firstName">First Name</label> */}
              <input type="text" id="firstName" placeholder='First name' />
            </div>
            <div className="form-group">
              {/* <label htmlFor="lastName">Last Name</label> */}
              <input type="text" id="lastName" placeholder='Last name' />
            </div>
            <div className="form-group">
              {/* <label htmlFor="emailOrPhone">Email or Phone</label> */}
              <input type="text" id="emailOrPhone" placeholder='Email or Phone number' />
            </div>
            <div className="form-group">
              {/* <label htmlFor="password">Password</label> */}
              <input type="password" id="password" placeholder='Password' />
            </div>
            <div className="form-group">
              {/* <label htmlFor="dob">Date of Birth</label> */}
              <input type="date" id="dob" placeholder='Date Of Birth' />
            </div>
            <div className="form-group">
              {/* <label htmlFor="gender">Gender</label> */}
              <select id="gender" placeholder='Gender'>
                <option value="">Gender</option>
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
            </div>
            <button type="submit">Sign Up</button>
            <p>Already have an account? <a href="#">Sign In</a></p>
          </form>
        </div>
      </div>
  );
}

export default SignUp;
