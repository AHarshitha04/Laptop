

import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { NavData } from "../../components/Header/NavData";
const Register = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  
  const [message, setMessage] = useState('');
  const [smessage, setSMessage] = useState('');


  const isEmailValid = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isPasswordValid = (password) => {
    return password.length >= 6;
  };
  
  const isUsernameValid = (username) => {
    return username.length >= 3;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
  
    if (!isEmailValid(email)) {
      setMessage('Please enter a valid email address.');
      return;
    }
  
    if (!isPasswordValid(password)) {
      setMessage('Password should be at least 6 characters long.');
      return;
    }
  
    if (!isUsernameValid(username)) {
      setMessage('Username should be at least 3 characters long.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5001/ughomepage_banner_login/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, email, password }),
      });
  
      if (response.ok) {
        setSMessage('User registered successfully!');
        setMessage('');
        setUsername('');
        setEmail('');
        setPassword('');
      window.location.href = "/uglogin";

      } else {
        const data = await response.json();
        setMessage(data.error || 'Failed to register user');
      }
    } catch (error) {
      setMessage('Error registering user');
      console.error('Error:', error);
    }
  };

  return (
    <>
      <div>
        <div className="ugexam_header">
          {NavData.map((NavData, index) => {
            return (
              <>
                <div className="header ug_exam_header" key={index}>
                  <div className={NavData.logo_img_container}>
                    <Link to={"/"}>
                      <img src={NavData.logo} alt="" />
                    </Link>
                  </div>

                  <div className="exam_login_menu">
                    <li>
                      <Link to="/home" className={NavData.navlist}>
                        {NavData.link1}
                      </Link>
                    </li>
                    <Link
                      to="/uglogin"
                      href="https://online-ug.egradtutor.in"
                      className={NavData.login}
                    >
                      Login
                    </Link>
                    {/* <div className="mobile_menu mobile_menu_non"onClick={() => setshowMenu(!showMenu)}  >
              <div className={showMenu ? "rotate_right  " :"lines "}></div>
              <div className={showMenu ? "no_lines  " :"lines "}></div>
              <div className={showMenu ? "rotate_left  " :"lines "}></div>
              </div> */}
                    {/* <a href="#"><AiOutlineMenu/></a> */}{" "}
                  </div>
                </div>
              </>
            );
          })}
        </div>
      </div>

        
      {/* Registration Form */}
      <div className="ug_logincontainer">
   
        <div className="ug_logincontainer_box">
          
          <h2>Register</h2>
          <form onSubmit={handleRegister}>
            <label>Username:
              <input type="text" value={username} onChange={(e) => setUsername(e.target.value)}  />
            </label>
            
            <label>Email:
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}  />
            </label>
            
            <label>Password:
              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)}  />
            </label>
            
            <br />
            {message && <p style={{color:"red"}}>{message}</p>}
            {smessage && <p style={{color:"green"}}>{smessage}</p>}

            <button type="submit">
              Register
            </button>
          </form>
          <p>
            Already have an account? <Link to="/uglogin">Login here</Link>
          </p>
       
        </div>
      </div>
    </>
  );
};

export default Register;