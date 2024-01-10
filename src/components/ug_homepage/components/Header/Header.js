import { React, useState } from "react";
import { Link } from "react-router-dom";

// ----------------header css------------------------
import "./header.css";

// ----------------navbardata_------------------------

import { NavData } from "./NavData";

const Header = () => {
  const [showMenu, setshowMenu] = useState(0);
  return (
    <>
      <div className="ug_header">
        {NavData.map((NavData, index) => {
          return (
            <div className="header" key={index}>
              <div className={NavData.logo_img_container}>
                <Link to={"/"}>
                  {" "}
                  <img src={NavData.logo} alt="" />
                </Link>
              </div>
              <div className={showMenu ? "navbox  mobile-menu" : "navbox "}>
                <ul className={NavData.navbar}>
                  <li>
                    <a href="#home" className={NavData.navlist}>
                      {NavData.link1}
                    </a>
                  </li>
                  <li>
                    <a href="#about" className={NavData.navlist}>
                      {NavData.link2}
                    </a>
                  </li>
                  <li>
                    <a href="#exam" className={NavData.navlist}>
                      {NavData.link3}
                    </a>
                  </li>
                  <li>
                    <a href="#courses" className={NavData.navlist}>
                      {NavData.link4}
                    </a>
                  </li>
                  <li>
                    <a href="#contact" className={NavData.navlist}>
                      {NavData.link5}
                    </a>
                  </li>
                  <li>
                    <a href="#faq" className={NavData.navlist}>
                      {NavData.link6}
                    </a>
                  </li>
                </ul>
              </div>

              <div className="login_menu">
                {/* <a
                    href="https://online-ug.egradtutor.in"
                    className={NavData.login}
                  >
                    {NavData.btn1}
                  </a> */}
                {/* <Link to="/uglogin" className={NavData.login}>
                  {NavData.btn1}
                </Link> */}
                <Link to="/Exam_portal_home_page" className={NavData.login}>
                  {NavData.btn1}
                </Link>
                <div
                  className="mobile_menu mobile_menu_non"
                  onClick={() => setshowMenu(!showMenu)}
                >
                  <div className={showMenu ? "rotate_right  " : "lines "}></div>
                  <div className={showMenu ? "no_lines  " : "lines "}></div>
                  <div className={showMenu ? "rotate_left  " : "lines "}></div>
                </div>
                {/* <a href="#"><AiOutlineMenu/></a> */}{" "}
              </div>
            </div>
          );
        })}
      </div>

      {/* <div className="mobile_nav">
        <div className="mobil_navbar">
          <ul className="mobil_navbar_links">
            <li>
              <a href="#home" title="Home">
                <AiFillHome />
              </a>
            </li>
            <li>
              <a href="#about" title="About">
                <AiOutlineUser />
              </a>
            </li>
            <li>
              <a href="#exam" title="Exams">
                <AiOutlinePercentage />
              </a>
            </li>
            <li>
              <a href="#courses" title="Courses">
                <AiFillBook />
              </a>
            </li>
            <li>
              <a href="#contact" title="Contact">
                <AiFillPhone />
              </a>
            </li>
            <li>
              <a href="#faq" title="FAQ" s>
                <AiFillQuestionCircle />
              </a>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
};

export default Header;

{
  /* <nav className="pulication-nav">
<div className="logo">
    <img src={logo} alt="" />
</div>

<div className={showMenu ? "pulication-nav-list mobile-menu" :"pulication-nav-list"}>
    <ul>
        <li><a href="#home">Home</a></li>
        <li><a href="#ug">UG Books</a></li>
        <li><a href="#pg">PG Books</a></li>
        <li><a href="#mba">MBA Books</a></li>
        <li><a href="#ca">CA Books</a></li>
        <li><a href="#Arrivals">New Arrivals</a></li>



    </ul>
</div>

<div className="publication-contactus">
   
    <div className="menu-icon">
        <a href="#menu" onClick={() => setshowMenu(!showMenu)}><GiHamburgerMenu /></a>
        
    </div>
</div>

</nav> */
}
