import React, { useState, useEffect } from "react";
import axios from "axios";

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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:5001/login", {
        email,
        password,
      });
      const { message, user } = response.data;

      localStorage.setItem("isLoggedIn", "true");
      localStorage.setItem("userRole", user.role);
      window.location.href = "/UgadminHome";
    } catch (error) {
      console.error("Login failed:", error.message);
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      window.location.href = "/UgadminHome";
    }
  }, []);

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
                    <Link to="/home" className={NavData.navlist}>
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
                <label>
                  <MdAlternateEmail />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="EMAIL ID"
                  />
                </label>
                <br />
                <label>
                  <FaLock />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="PASSWORD"
                  />
                </label>            
                <button type="button" onClick={handleLogin}>
                  Login
                </button>
              </form>
              <p>
                Don't have an account ? <Link to="/Register">Register here</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
