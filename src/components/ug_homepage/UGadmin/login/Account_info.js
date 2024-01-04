import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { nav } from "../eaxm_portal_/DATA/Data";
import axios from "axios";
import "./Account_info.css";

const Account_info = () => {
  const [showQuizmobilemenu, setShowQuizmobilemenu] = useState(false);
  const [actinfo, setActinfo] = useState([]);
  const QuiZ_menu = () => {
    setShowQuizmobilemenu(!showQuizmobilemenu);
  };
  const userRole = localStorage.getItem("userRole");

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/uglogin";
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/ughomepage_banner_login/act_info")
      .then((res) => {
        setActinfo(res.data);
        console.log(actinfo);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

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
                  <button style={{ background: "none" }}>
                    <Link to="/UgadminHome" className="Quiz__home">
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
      {userRole === "admin" && (
        <div>
          <p>Admin View: Show all features</p>
          {/* Admin-specific content goes here */}
          <Users />
        </div>
      )}

      {userRole === "viewer" && (
        <div>
          <p>Viewer View: Show limited features</p>

          <Users_info />
          {/* Viewer-specific content goes here */}
        </div>
      )}
    </>
  );
};

export default Account_info;

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';

export const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchAllUsers = async () => {
      try {
        const res = await axios.get(
          "http://localhost:5001/ughomepage_banner_login/act_info"
        );
        setUsers(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllUsers();
  }, []);

  console.log(users);

  const handleDelete = async (id) => {
    try {
      await axios.delete(
        `http://localhost:5001/ughomepage_banner_login/users/${id}`
      );
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="act_infocontainer">
      <div className="row">
        <div className="col-md-12">
          <p>
            <Link to="/add" className="btn btn-success">
              Add new users
            </Link>
          </p>
          <table className="table table-bordered">
            <thead className="otsGEt_-contantHead otc_-table_-header">
              <tr>
                <th>S No.</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Password</th>
                <th>Role</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="otc_-table_-tBody">
              {users.map((user, i) => {
                return (
                  <tr
                    key={i}
                    className={user.id % 2 === 0 ? "color1" : "color2"}
                  >
                    <td>{i + 1}</td>
                    <td>{user.username} </td>
                    <td>{user.email} </td>
                    <td>{user.password} </td>
                    <td>{user.role} </td>

                    <td>
                      <button>
                        <Link
                          to={`/userread/${user.user_Id}`}
                          className="btn btn-success mx-2"
                        >
                          Read
                        </Link>
                      </button>

                      <button>
                        <Link
                          to={`/userupdate/${user.user_Id}`}
                          className="btn btn-info mx-2"
                        >
                          Edit
                        </Link>
                      </button>

                      <button
                        onClick={() => handleDelete(user.id)}
                        className="btn btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export const Users_info = () => {
  const [userData, setUserData] = useState({});
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5001/ughomepage_banner_login/user",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to headers for authentication
            },
          }
        );

        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          console.log(userData);
        } else {
          // Handle errors, e.g., if user data fetch fails
        }
      } catch (error) {
        // Handle other errors
      }
    };

    fetchUserData();
  }, []);

  return (
    <>
      <div>
        <div className="profilepic">
          <p>User ID: {userData.user_Id}</p>
          <h2>Username: {userData.username}</h2>
          <p>Email: {userData.email}</p>
        </div>
      </div>
    </>
  );
};
