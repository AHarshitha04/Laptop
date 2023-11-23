// import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');

//   const handleRegister = async () => {
//     try {
//       const response = await axios.post('http://localhost:5001/register', {
//         username,
//         password,
//       });

//       if (response.data.success) {
//         // Registration successful
//         localStorage.setItem('isLoggedIn', 'true');

//         // Redirect the user to the login page
//         window.location.href = '/uglogin';
//       } else {
//         // Registration failed, handle error
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//     }
//   };

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true') {
//       window.location.href = '/uglogin';
//     }
//   }, []);

//   return (
//     <div>
//       <h2>Register</h2>
//       <form>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
//         <button type="button" onClick={handleRegister}>
//           Register
//         </button>
//       </form>
//       <p>
//         Already have an account? <Link to="/login">Login here</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleRegister = async () => {
//     try {
//       // Basic validation
//       if (!username || !password) {
//         setError('Please enter both username and password.');
//         return;
//       }

//       // Additional validation logic (e.g., password length, format, etc.)
//       // ...

//       const response = await axios.post('http://localhost:5001/register', {
//         username,
//         password,
//       });

//       if (response.data.success) {
//         // Registration successful
//         localStorage.setItem('isLoggedIn', 'true');

//         // Redirect the user to the login page
//         window.location.href = '/uglogin';
//       } else {
//         // Registration failed, handle error
//         setError('Registration failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       setError('Registration failed. Please try again.');
//     }
//   };

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true') {
//       window.location.href = '/uglogin';
//     }
//   }, []);

//   return (
//     <div>
//       <h2>Register</h2>
//       <form>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
//         <button type="button" onClick={handleRegister}>
//           Register
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <p>
//         Already have an account? <Link to="/uglogin">Login here</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');

//   const handleRegister = async () => {
//     try {
//       // Basic validation
//       if (!username || !password) {
//         setError('Please enter both username and password.');
//         return;
//       }

//       // Additional validation logic (e.g., password length, format, etc.)
//       // ...

//       const response = await axios.post('http://localhost:5001/register', {
//         username,
//         password,
//       });

//       if (response.data.success) {
//         // Registration successful
//         localStorage.setItem('isLoggedIn', 'true');
//       } else {
//         // Registration failed, handle error
//         setError('Registration failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       setError('Registration failed. Please try again.');
//     }
//   };

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true') {
//       // Redirect to login page using Link component
//       return <Link to="/uglogin" />;
//     }
//   }, []);

//   return (
//     <div>
//       <h2>Register</h2>
//       <form>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
//         <button type="button" onClick={handleRegister}>
//           Register
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       <p>
//         Already have an account? <Link to="/uglogin">Login here</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;

// Register.js

// import React, { useState, useEffect } from 'react';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// const Register = () => {
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [error, setError] = useState('');
//   const [successMessage, setSuccessMessage] = useState('');

//   const handleRegister = async () => {
//     try {
//       setError('');

//       // Basic validation
//       if (!username || !password) {
//         setError('Please enter both username and password.');
//         return;
//       }

//       // Additional validation logic (e.g., password length, format, etc.)
//       // ...

//       const response = await axios.post('http://localhost:5001/register', {
//         username,
//         password,
//       });

//       if (response.data) {
//         localStorage.setItem('isLoggedIn', 'true');
//         setSuccessMessage('Registration successful!');
//       } else {
//         setError('Registration failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       setError('Registration failed. Please try again.');
//     }
//   };

//   useEffect(() => {
//     const isLoggedIn = localStorage.getItem('isLoggedIn');
//     if (isLoggedIn === 'true') {
//       // Redirect to login page using Link component
//       return <Link to="/uglogin" />;
//     }
//   }, []);

//   return (
//     <div>
//       <h2>Register</h2>
//       <form>
//         <label>
//           Username:
//           <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
//         </label>
//         <br />
//         <label>
//           Password:
//           <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         </label>
//         <br />
//         <button type="button" onClick={handleRegister}>
//           Register
//         </button>
//       </form>
//       {error && <p style={{ color: 'red' }}>{error}</p>}
//       {successMessage && <p style={{ color: 'green' }}>{successMessage}</p>}
//       <p>
//         Already have an account? <Link to="/uglogin">Login here</Link>
//       </p>
//     </div>
//   );
// };

// export default Register;

import React, { useState, useEffect } from "react";
import { Link, Navigate } from "react-router-dom";
import axios from "axios";
import { NavData } from "../../components/Header/NavData";

const Register = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState("");

  const isEmailValid = (email) => {
    // Basic email regex for validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };
  
  const isPasswordValid = (password) => {
    // Password length validation (minimum length 6 characters)
    return password.length >= 6;
  };
  
  const isUsernameValid = (username) => {
    // Username length validation (minimum length 3 characters)
    return username.length >= 3;
  };

  const handleRegister = async () => {
    try {
      setError("");

      // Basic validation
      if (!email || !username || !password) {
        setError("Please enter all the details.");
        return;
      }


      // Validate email
    if (!isEmailValid(email)) {
      setError('Please enter a valid email address.');
      return;
    }

    // Validate password
    if (!isPasswordValid(password)) {
      setError('Password should be at least 6 characters long.');
      return;
    }

    // Validate username
    if (!isUsernameValid(username)) {
      setError('Username should be at least 3 characters long.');
      return;
    }

      // Additional validation logic (e.g., password length, format, etc.)
      // ...

      const response = await axios.post("http://localhost:5001/register", {
        email,
        username,
        password,
      });

      if (response.data) {
        // localStorage.setItem('isLoggedIn', 'true');
        // localStorage.setItem('userRole', response.data.user.role);
        setIsRegistered(true);
      } else {
        setError("Registration failed. Please try again.");
      }
    } catch (error) {
      console.error("Error during registration:", error);
      setError("Registration failed. Please try again.");
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn === "true") {
      // Redirect to login page using Navigate component
      setIsRegistered(true);
    }
  }, []);

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
      <div className="ug_logincontainer">

      <div className="ug_logincontainer_box">
        <h2>Register</h2>
        <form>

          
          <label>
            Username:
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </label>
          
        <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
         
         
          <label>
            Password:
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <br />
          <button type="button" onClick={handleRegister}>
            Register
          </button>
        </form>
        {error && <p style={{ color: "red" }}>{error}</p>}
        <p>
          Already have an account? <Link to="/uglogin">Login here</Link>
        </p>
        {isRegistered && <Navigate to="/uglogin" />}
      </div>

      </div>

     
    </>
  );
};

export default Register;
