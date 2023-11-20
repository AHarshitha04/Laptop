import React from 'react'
import { NavData } from "../ug_homepage/components/Header/NavData";
import { Link } from 'react-router-dom';
function Examheader() {
  return (
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
                    <Link to='/home' className={NavData.navlist}>
                      {NavData.link1}
                    </Link>
                </li>
                  <a
                    href="https://online-ug.egradtutor.in"
                    className={NavData.login}
                  >
                    {NavData.btn1}
                  </a>
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
  )
}

export default Examheader