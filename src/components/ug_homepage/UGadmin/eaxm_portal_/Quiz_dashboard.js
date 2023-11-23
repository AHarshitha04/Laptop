import React, { useState } from 'react'
import Adimheader from '../login/Adimheader'
import { nav } from './DATA/Data';
import { Link } from 'react-router-dom';

const Quiz_dashboard = () => {
  const [showQuizmobilemenu, setShowQuizmobilemenu] = useState(false);
  const QuiZ_menu = () => {
    setShowQuizmobilemenu(!showQuizmobilemenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/uglogin";
  };

  return (
    <div>
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

    </div>
  )
}

export default Quiz_dashboard
 