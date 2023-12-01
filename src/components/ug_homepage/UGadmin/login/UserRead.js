import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { nav } from "../eaxm_portal_/DATA/Data";
import { Link } from "react-router-dom";

 
const Read = () => {

    const [showQuizmobilemenu, setShowQuizmobilemenu] = useState(false);
    const QuiZ_menu = () => {
      setShowQuizmobilemenu(!showQuizmobilemenu);
    };
    

 
  
    const {id} = useParams();
    const [user, setUsers] = useState([]);
 
    useEffect(() => {
        axios.get("http://localhost:5001/userdetails/"+id)
        .then(res => {
            console.log(res)
            setUsers(res.data[0]);
        })
        .catch(err => console.log(err))
    }, []);

    const handleLogout = () => {
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("userRole");
      window.location.href = "/uglogin";
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
        <div className='row'>
        <div className='col-md-12'>
        <h1>User Details</h1>
            <table className="table">
                <thead>
                    <tr>
                        <th>S No.</th>
                        <th>Full Name</th>
                        <th>Email</th> 
                        <th>Password</th> 

                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.password}</td>

                    </tr>
                </tbody>
            </table>
      </div>
      </div>
    </div>
    
    </>
   
  );
};
 
export default Read;