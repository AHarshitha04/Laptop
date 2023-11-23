import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { nav } from "../eaxm_portal_/DATA/Data";
import axios from "axios";

const Account_info = () => {
  const [showQuizmobilemenu, setShowQuizmobilemenu] = useState(false);
  const [actinfo, setActinfo] = useState([]);
  const QuiZ_menu = () => {
    setShowQuizmobilemenu(!showQuizmobilemenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/uglogin";
  };

  useEffect(() => {
    axios
      .get("http://localhost:5001/act_info")
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
                  <button style={{background:"none"}}>
                    <Link to='/UgadminHome' className="Quiz__home">
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
     
      <Users/>
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
        const res = await axios.get("http://localhost:5001/users");
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
      await axios.delete(`http://localhost:5001/users/${id}`);
      window.location.reload()
    } catch (err) {
      console.log(err);
    }
  };
 
  return (
    <div className="container">
  
        <div className='row'>
            <div className='col-md-12'>
            <p><Link to="/add" className="btn btn-success">Add new users</Link></p>
            <table className="table table-bordered">
            <thead>
                <tr>
                    <th>S No.</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th>Role</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    users.map((user, i) => {
                        return (
                            <tr key={i}>
                                <td>{i + 1}</td>
                                <td>{user.username} </td>
                                <td>{user.email} </td>
                                <td>{user.password} </td>
                                <td>{user.role} </td>


                                <td>
                                    <button>
                                    <Link to={`/userread/${user.id}`} className="btn btn-success mx-2">Read</Link>
                                    </button>
                                 

                                    <button>
                                    <Link to={`/userupdate/${user.id}`} className="btn btn-info mx-2">Edit</Link>
                                    </button>
                                   
                                
                                    <button onClick={()=>handleDelete(user.id)} className="btn btn-danger">Delete</button>
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
        </div>
        </div>
    </div>
  );
};
 

   