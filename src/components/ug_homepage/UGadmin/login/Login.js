

import React, { useState, useEffect } from "react";


// ------------------ icons -----------------------
import { MdAlternateEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";

import { Link } from "react-router-dom";
import { NavData } from "../../components/Header/NavData";
// ------------css ---------------
import "./Login.css";

// ------------ img ---------------
import loginlogo from "./asserts/loginlogo.jpeg";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

const handleLogin = async (e) => {
  e.preventDefault();

  try {
    const response = await fetch('http://localhost:5001/ughomepage_banner_login/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
      credentials: 'same-origin',
    });

    if (response.ok) {
      const responseData = await response.json();
      const { token, user } = responseData;

      localStorage.setItem('token', token); // Store the token in localStorage
      localStorage.setItem('userRole', user.role);
      localStorage.setItem('isLoggedIn', 'true');
      setMessage('Login successful!');
      setEmail('');
      setPassword('');
      window.location.href = '/UgadminHome'; // Redirect to the desired page after successful login
    } else {
      const data = await response.json();
      throw new Error(data.error || 'Failed to login');
    }
  } catch (error) {
    setMessage(error.message || 'Error logging in');
    console.error('Error:', error);
  }
};




  return (
    <>
      {/* ------------------ header ------------------- */}
      <div>
        <div className="ugexam_header">
          {NavData.map((NavData, index) => {
            return (
              <div className="header ug_exam_header" key={index}>
                <div className={NavData.logo_img_container}>
                  <Link to={"/"}>
                    {" "}
                    <img src={NavData.logo} alt="" />
                  </Link>
                </div>

                <div className="exam_login_menu">
                  <li>
                    <Link
                      to="/Exam_portal_home_page"
                      className={NavData.navlist}
                    >
                      {NavData.link1}
                    </Link>
                  </li>
                  <Link
                    to="/Register"
                    href="https://online-ug.egradtutor.in"
                    className={NavData.login}
                  >
                    Registration
                  </Link>
                  {/* <div className="mobile_menu mobile_menu_non"onClick={() => setshowMenu(!showMenu)}  >
              <div className={showMenu ? "rotate_right  " :"lines "}></div>
              <div className={showMenu ? "no_lines  " :"lines "}></div>
              <div className={showMenu ? "rotate_left  " :"lines "}></div>
              </div> */}
                  {/* <a href="#"><AiOutlineMenu/></a> */}{" "}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* ------------------ Login ------------------- */}

      <div className="ug_logincontainer">
        <div className="ug_logincontainer_box">
          <h2>Login</h2>

          <div className="ug_logincontainer_box_subbox">
            <div className="loginlogo_img">
              <img src={loginlogo} alt="" />
            </div>

            <div className="login_from_continer">
              <form>
              {message && <p style={{
                color:"green"
              }}>{message}</p>}
                <label>
                  <MdAlternateEmail />
                  <input type="email"  placeholder="EMAIL ID" value={email} onChange={(e) => setEmail(e.target.value)} required />
             
                </label>
                <br />
                <label>
                  <FaLock />
                  <input type="password"    placeholder="PASSWORD" value={password} onChange={(e) => setPassword(e.target.value)} required />
              
                </label>
                <button type="button" onClick={handleLogin}>
                  Login
                </button>
              </form>
              <p>
                Don't have an account ?
                <Link to="/Register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
