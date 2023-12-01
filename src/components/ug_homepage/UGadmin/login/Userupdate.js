import axios from "axios";
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { nav } from "../eaxm_portal_/DATA/Data";

const Userupdate = () => {


  const [showQuizmobilemenu, setShowQuizmobilemenu] = useState(false);
  const QuiZ_menu = () => {
    setShowQuizmobilemenu(!showQuizmobilemenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/uglogin";
  };
  
  const { id } = useParams();
  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "",
  });

  const location = useLocation();
  const navigate = useNavigate();

  const userId = location.pathname.split("/")[2];

  const handleChange = (e) => {
    setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/userdetails/" + id)
      .then((res) => {
        console.log(res);
        setUser(res.data[0]);
      })
      .catch((err) => console.log(err));
  }, []);

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:5001/users/${userId}`, user);
      navigate("/Account_info");
    } catch (err) {
      console.log(err);
    }
  };

  return (


    <>

<div className="Quiz_main_page_header">
        {nav.map((nav, index) => {
          return (
            <div key={index} className="Quiz_main_page_navbar">
              <div className="Quizzlogo">
                <img src={nav.logo} alt="" />
              </div>
              {/* <li  className={showcardactive1?"showcardactive":"showcardactivenone"}> */}

              <div
                className={
                  !showQuizmobilemenu
                    ? "Quiz_main_page_navbar_SUBpart Quiz_main_page_navbar_SUBpart_mobile"
                    : "Quiz_main_page_navbar_SUBpart_mobile"
                }
              >
                <ul>
                  <button style={{background:"none"}}>
                    <Link to='/Account_info' className="Quiz__home">
                      Home
                    </Link>
                  </button>
            

                  {/* <button className="quiz_sign_UP">                   
                    Sign up
                  </button> */}
                  <div className="Quiz_main_page_login_signUp_btn">
                    {/* 
                      <Link to='/'><button onClick={Quiz_login}>
                   Login
                  </button></Link> */}

               
                  </div>
                  <div>
                    <button onClick={handleLogout}>Logout</button>
                  </div>
                </ul>
              </div>

           
              <div className="quz_menu" onClick={QuiZ_menu}>
                <div className="lines"></div>
                <div className="lines"></div>
                <div className="lines"></div>
              </div>
            </div>
          );
        })}
      </div>
     <div className="container">
      <h1>Edit Form</h1>
      <form>
        <div className="mb-3 mt-3">
          <label className="form-label"> ID:</label>
          <input
            type="text"
            className="form-control"
            id="id"
            placeholder="Enter Your Full Name"
            name="id"
            value={id}
            disabled
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label"> Full Name:</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter Your Full Name"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">Email:</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Enter email"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">Password:</label>
          <input
            type="password"
            className="form-control"
            id="password"
            placeholder="Enter password"
            name="password"
            value={user.password}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3 mt-3">
          <label className="form-label">Role:</label>
          <input
            type="text"
            className="form-control"
            id="password"           
            name="role"
            value={user.role}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary" onClick={handleClick}>
          Update
        </button>
      </form>
      <div className="container d-flex justify-content-center">
        <Link to="/">See all users</Link>
      </div>
    </div>
    
    </>
   
  );
};

export default Userupdate;

// Userupdate



// import axios from "axios";
// import React, { useState, useEffect } from "react";
// import { Link, useLocation, useNavigate, useParams } from "react-router-dom";

// const Userupdate = () => {
//   const { id } = useParams();
//   const [user, setUser] = useState({
//     username: "",
//     email: "",
//     password: "",
//     role: "",
//   });

// //   const location = useLocation();
//   const navigate = useNavigate();

//   const userId = id;



//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/userdetails/" +1)
//       .then((res) => {
//         console.log(res);
//         setUser(res.data[0]);
//       })
//       .catch((err) => console.log(err));
//   }, [ userId]);

//   const handleChange = (e) => {
//     // console.log(user)
//     setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
//     console.log(user.username)
//   };

// // const handleChange = (e) => {
// //     setUser((prev) => ({ ...prev, [e.target.name]: e.target.value }));
// //   };
  
//   useEffect(() => {
//     console.log(user);
//   },[user])

// //   const handleClick = async (e) => {
// //     e.preventDefault();

// //     try {
// //       await axios.put(`http://localhost:5001/users/${userId}`, user);
// //       navigate("/Account_info");
// //     //   setUser(true)
// //     } catch (err) {
// //       console.log(err);
// //     }
// //   };
// const handleClick = async (e) => {
//     e.preventDefault();
  
//     try {
//       console.log(`Updating user with ID ${userId}`);
//       await axios.put(`http://localhost:5001/users/${userId}`, user);
//       console.log("User updated successfully");
//       navigate("/Account_info");
//     } catch (err) {
//       console.error("Error updating user:", err);
//     }
//   };

//   return (
//     <div className="container">
//       <h1>Edit Form</h1>
//       <form>
//         <div className="mb-3 mt-3">
//           <label className="form-label"> ID:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="id"
//             placeholder="Enter Your Full Name"
//             name="id"
//             value={id}
//             disabled
//           />
//         </div>
//         <div className="mb-3 mt-3">
//           <label className="form-label"> Full Name:</label>
//           <input
//             type="text"
//             className="form-control"
//             placeholder="Enter Your Full Name"
//             name="username"
//             value={user.username}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3 mt-3">
//           <label className="form-label">Email:</label>
//           <input
//             type="email"
//             className="form-control"
//             id="email"
//             placeholder="Enter email"
//             name="email"
//             value={user.email}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3 mt-3">
//           <label className="form-label">Password:</label>
//           <input
//             type="password"
//             className="form-control"
//             id="password"
//             placeholder="Enter password"
//             name="password"
//             value={user.password}
//             onChange={handleChange}
//           />
//         </div>
//         <div className="mb-3 mt-3">
//           <label className="form-label">Role:</label>
//           <input
//             type="text"
//             className="form-control"
//             id="password"
//             placeholder="Enter password"
//             name="role"
//             value={user.role}
//             onChange={handleChange}
//           />
//         </div>
//         <button type="submit" className="btn btn-primary" onClick={handleClick}>
//           Update
//         </button>
//       </form>
//       <div className="container d-flex justify-content-center">
//         <Link to="/">See all users</Link>
//       </div>
//     </div>
//   );
// };

// export default Userupdate;

// Userupdate


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useNavigate, useParams } from 'react-router-dom';

// const Userupdate = () => {
//   const { userId } = useParams(); // Extract userId from URL params
//   const navigate=useNavigate();
//   const [user, setUser] = useState({
//     email: '',
//     username: '',
//     password: '',
//   });

//   useEffect(() => {
//     // Fetch user data by userId when component mounts
//     axios
//       .get(`http://localhost:5001/users/${userId}`)
//       .then((response) => {
//         setUser(response.data); // Set user data to state
//       })
//       .catch((error) => {
//         console.error('Error fetching user data:', error);
//       });
//   }, [userId]);

//   const handleInputChange = (e) => {
//     setUser({
//       ...user,
//       [e.target.name]: e.target.value,
//     });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(`http://localhost:5001/users/${userId}`, user);
//       // Redirect or show success message upon successful update
//       navigate("/Account_info");
//     } catch (error) {
//       console.error('Error updating user:', error);
//       // Handle error, show error message, etc.
//     }
//   };

//   return (
//     <div>
//       <h2>Edit User</h2>
//       <form onSubmit={handleSubmit}>
//         <div>
//           <label>Email:</label>
//           <input
//             type="text"
//             name="email"
//             value={user.email}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Username:</label>
//           <input
//             type="text"
//             name="username"
//             value={user.username}
//             onChange={handleInputChange}
//           />
//         </div>
//         <div>
//           <label>Password:</label>
//           <input
//             type="password"
//             name="password"
//             value={user.password}
//             onChange={handleInputChange}
//           />
//         </div>
//         <button type="submit">Update</button>
//       </form>
//     </div>
//   );
// };

// export default Userupdate;
