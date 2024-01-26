

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
import { nav } from "../eaxm_portal_/DATA/Data";

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
        <div className="Quiz_main_page_header">
          {NavData.map((NavData, index) => {
            return (
              <>
                <div key={index} className="Quiz_main_page_navbar">
                  <div className="Quizzlogo">
                    <img src={NavData.logo} alt="" />
                  </div>
                  {/* <li  className={showcardactive1?"showcardactive":"showcardactivenone"}> */}

                  <div className="quiz_app_quiz_menu_login_btn_contaioner">
                    <button style={{ background: "none" }}>
                      <Link to="/Exam_portal_home_page" className="Quiz__home">
                        Home
                      </Link>
                    </button>
                    <div>
                      <a class="ugQUIz_login_btn" href="/Register">
                        Registration
                      </a>
                    </div>
                  </div>
                </div>
              </>
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
                {message && (
                  <p
                    style={{
                      color: "green",
                    }}
                  >
                    {message}
                  </p>
                )}
                <label>
                  <MdAlternateEmail />
                  <input
                    type="email"
                    placeholder="Email ID"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </label>

                <label>
                  <FaLock />
                  <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </label>
                <button type="button" onClick={handleLogin}>
                  Login
                </button>
              </form>
              <p>
                Don't have an account ?<Link to="/Register">Register here</Link>
              </p>

              <Link to="/OTS_ForgotPassword">Forgot Password ?</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
