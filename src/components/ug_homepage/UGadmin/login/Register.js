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



import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from 'axios';

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setIsRegistered] = useState(false);
  const [error, setError] = useState('');

  const handleRegister = async () => {
    try {
      setError('');

      // Basic validation
      if (!username || !password) {
        setError('Please enter both username and password.');
        return;
      }

      // Additional validation logic (e.g., password length, format, etc.)
      // ...

      const response = await axios.post('http://localhost:5001/register', {
        username,
        password,
      });

      if (response.data) {
        // localStorage.setItem('isLoggedIn', 'true');
        // localStorage.setItem('userRole', response.data.user.role);
        setIsRegistered(true);
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      setError('Registration failed. Please try again.');
    }
  };

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn === 'true') {
      // Redirect to login page using Navigate component
      setIsRegistered(true);
    }
  }, []);

  return (
    <div>
      <h2>Register</h2>
      <form>
        <label>
          Username:
          <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
        </label>
        <br />
        <label>
          Password:
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </label>
        <br />
        <button type="button" onClick={handleRegister}>
          Register
        </button>
      </form>
      {error && <p style={{ color: 'red' }}>{error}</p>}
      <p>
        Already have an account? <Link to="/uglogin">Login here</Link>
      </p>
      {isRegistered && <Navigate to="/uglogin" />}
    </div>
  );
};

export default Register;