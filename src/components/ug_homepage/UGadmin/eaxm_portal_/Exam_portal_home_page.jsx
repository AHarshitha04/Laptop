import React, { useEffect, useState } from "react";

import axios from "axios";

import { Link, useParams } from "react-router-dom";
import { Carousel } from "react-responsive-carousel";
import { AiOutlineForm, AiFillDelete } from "react-icons/ai";

// ------------------------------------------------------------------------- data ---------------------------------------------

import {
  FooterData,
  nav,
  quiz__Home_continer_left,
  quiz__Home_continer_right,
} from "./DATA/Data";

// ------------------------------------------------------------------------- css ---------------------------------------------

import "./styles/Home.css";
import "./styles/Dashboard.css";

import "react-responsive-carousel/lib/styles/carousel.min.css";

// ------------------------------------------------------------------------- program start  ---------------------------------------------

const Exam_portal_home_page = () => {
  const [courses, setCourses] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:3090/courses")
      .then((res) => {
        setCourses(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  return (
    <>
      <Header />
      <Home_section />
      <Quiz_Courses />
      <Footer />
    </>
  );
};

export default Exam_portal_home_page;

// ------------------------------------------------------------------------- header start ---------------------------------------------

export const Header = () => {
  // ---------------------------------- login ---------------------------
  const [showloginQuiz, setShowloginQuiz] = useState(false);
  const [showRegisterQuiz, setShowRegisterQuiz] = useState(false);
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  const [user, setUser] = useState("");

  const Quiz_login = () => {
    setShowloginQuiz(true);
  };

  const Quiz_register = () => {
    setShowRegisterQuiz(true);
  };

  const Quiz_close = () => {
    setShowloginQuiz(false);
    setShowRegisterQuiz(false);
  };

  const handleLogin = async () => {
    try {
      const response = await axios.post("http://localhost:3090/login", {
        email,
        password,
      });
      const data = response.data;
      setUser(data); // Set the user upon successful login
      setShowloginQuiz(false); // Close the login form
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const handleRegister = async () => {
    try {
      const response = await axios.post("http://localhost:3090/register", {
        email,
        password,
      });
      const data = response.data;
      setUser(data); // Set the user upon successful registration
      setShowRegisterQuiz(false); // Close the registration form
    } catch (error) {
      console.error("Registration error:", error);
    }
  };
  // const handleLogout = async () => {
  //   try {
  //     await axios.get('http://localhost:3090/logout');
  //     setUser(null); // Clear the user upon logout
  //     console.log('Logout successful');

  //   } catch (error) {
  //     console.error('Logout error:', error);
  //   }
  // };

  // const [courses, setCourses] = useState([]);
  const [examsug, setExamsug] = useState([0]);

  useEffect(() => {
    axios
      .get("http://localhost:5001/examsug")
      .then((res) => {
        setExamsug(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const [coursesBtnContainerVisible, setCoursesBtnContainerVisible] =
    useState(false);
  const toggleCoursesBtnContainer = () => {
    setCoursesBtnContainerVisible(!coursesBtnContainerVisible);
  };
  const [showQuizmobilemenu, setShowQuizmobilemenu] = useState(false);

  const QuiZ_menu = () => {
    setShowQuizmobilemenu(!showQuizmobilemenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/uglogin";
  };

const  act_info=()=>{
  if (user.role === "admin") {
    window.location.href = "/UgadminHome";
  } else {
    window.location.href = "/userdeatailspage/:id"; // Replace with the URL for user details page
  }
}
  
  // ----------------- dashborad ---------------------/
  const userRole = localStorage.getItem("userRole");
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
                    <a href="#" className="Quiz__home">
                      Home
                    </a>
                  </button>
                  <li className="courses_btn_continer">
                    <button
                      className="courses_btn"
                      onClick={toggleCoursesBtnContainer}
                    >
                      courses
                    </button>
                    {coursesBtnContainerVisible ? (
                      <div className="courses">
                        {examsug.map((e) => {
                          return (
                            <div key={examsug.exam_id}>
                              <a href="">{e.exam_name} </a>
                            </div>
                          );
                        })}
                      </div>
                    ) : null}
                  </li>

                  {/* <button className="quiz_sign_UP">                   
                    Sign up
                  </button> */}
                  <div className="Quiz_main_page_login_signUp_btn">
                    {/* 
                      <Link to='/'><button onClick={Quiz_login}>
                   Login
                  </button></Link> */}

                    {userRole === "admin" && (
                      <>
                        <li>
                          <button>
                            <Link to="/Quiz_dashboard">ADMIN</Link>
                          </button>
                        </li>
                      </>
                    )}
                  </div>
                  <div>
                    <button  id="dropdownmenu_foradim_page_btn" >
                       settings 
                    
                    <div className="dropdownmenu_foradim_page">
                    {/* <Link to={`/userread/${user.id}`} className="btn btn-success mx-2">Read</Link> */}
                     
                      {/* <Link to={`/userdeatailspage/${user.id}`} >Acount-info</Link> */}
                      <Link to='/Account_info' >Acount-info</Link>

                      <Link to='/'>General settings</Link>
                    <Link onClick={handleLogout}>Logout</Link>

                    </div>
                    </button>
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
    </>
  );
};

// ------------------------------------------------------------------------- header end ---------------------------------------------


// ------------------------------------------------------------------------- home section ---------------------------------------------

export const Home_section = () => {
  return (
    <>
      <div className="quiz__Home_continer">
        <div>
          <div className="quiz__Home_continer_left">
            {quiz__Home_continer_left.map((home, index) => {
              return (
                <div key={index} className="quiz__Home_continer_left_subpart">
                  <h3>{home.home_title}</h3>
                  <div className="home_highlight_btns">
                    {/* <button>{home.course1}</button> */}
                    {/* <button>{home.course2}</button>
                                      <button>{home.course3}</button>
                                      <button>{home.course4}</button> */}
                  </div>
                  <div className="home_para_start">
                    <p>{home.our_info}</p>
                    <button>{home.get_started}</button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="quiz__Home_continer_right">
            {quiz__Home_continer_right.map((homer, index) => {
              return (
                <div key={index}>
                  <Carousel
                    autoPlay
                    infiniteLoop
                    interval={5000}
                    showArrows={false}
                    showStatus={false}
                    showThumbs={false}
                  >
                    <div>
                      <img src={homer.carousel1} alt="" />
                    </div>
                    <div>
                      <img src={homer.carousel2} alt="" />
                    </div>
                    <div>
                      <img src={homer.carousel3} alt="" />
                    </div>
                    <div>
                      <img src={homer.carousel4} alt="" />
                    </div>
                  </Carousel>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};

// ------------------------------------------------------------------------- home section end ---------------------------------------------

// ------------------------------------------------------------------------- Quiz_Courses ---------------------------------------------

export const Quiz_Courses = () => {
  // ----------------------------------------------------------courses ug states--------------------------------------------------------
  const [coursesug, setCoursesug] = useState([]);
  const [showcard1, setshowcard1] = useState(false);
  const [showcardactive1, setshowcardactive1] = useState(false);
  const [examsug, setExamsug] = useState([0]);
  // ----------------------------------------------------------currentcourses states--------------------------------------------------------
  const [coursescurrentug, setCoursescurrentug] = useState([]);
  const [examscurrentug, setExamscurrentug] = useState([0]);
  const [showcard2, setshowcard2] = useState(true);
  const [showcardactive2, setshowcardactive2] = useState(true);

  // ----------------------------------------------------------courses ug function--------------------------------------------------------

  useEffect(() => {
    axios
      .get("http://localhost:5001/coursesug")
      .then((res) => {
        setCoursesug(res.data);
        console.log(coursesug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ----------------------------------------------------------currentcourses function--------------------------------------------------------
  useEffect(() => {
    axios
      .get("http://localhost:5001/coursescurrentug")
      .then((res) => {
        setCoursescurrentug(res.data);
        console.log(coursesug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ----------------------------------------------------------examsug function--------------------------------------------------------

  useEffect(() => {
    axios
      .get("http://localhost:5001/examsug")
      .then((res) => {
        setExamsug(res.data);
        console.log(setExamsug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);
  // ----------------------------------------------------------examexamscurrentugsug function--------------------------------------------------------
  useEffect(() => {
    axios
      .get("http://localhost:5001/examsug")
      .then((res) => {
        setExamsug(res.data);
        console.log(setExamsug);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  // ---------------------------------------------------------- onclick displayexamsug function--------------------------------------------------------

  const displayexamsug = () => {
    setshowcard1(true);
    setshowcard2(false);
    setshowcardactive1(true);
    setshowcardactive2(false);
  };

  // ---------------------------------------------------------- onclick displaycurrentexamsug function--------------------------------------------------------
  const displaycurrentexamsug = () => {
    setshowcard1(false);
    setshowcard2(true);
    setshowcardactive1(false);
    setshowcardactive2(true);
  };

  return (
    <>
      <div className="Quiz_cards_page">
        <div className="Quiz_cards_page_titles">
          {/* ------------------------ ug titles----------------------------- */}

          <div onClick={displaycurrentexamsug}>
            {coursescurrentug.map((e, i) => {
              return (
                <div key={i}>
                  <li
                    className={
                      showcardactive2 ? "showcardactive" : "showcardactivenone"
                    }
                  >
                    {e.course_name}
                  </li>
                </div>
              );
            })}
          </div>
          <div onClick={displayexamsug}>
            {coursesug.map((e, i) => {
              return (
                <div key={i}>
                  <li
                    className={
                      showcardactive1 ? "showcardactive" : "showcardactivenone"
                    }
                  >
                    {e.course_name}
                  </li>
                </div>
              );
            })}
          </div>
        </div>
        <div>
          {/* ------------------------ ug cards----------------------------- */}

          {showcard2 ? (
            <div className="Quiz_cards_cantainer_contain">
              {examscurrentug.map((e) => {
                return (
                  <div key={examsug.exam_id}>
                    {/* <a href=""><h1>{e.exam_name}</h1> </a>  */}
                    coming soon
                  </div>
                );
              })}
            </div>
          ) : null}
          {showcard1 ? (
            <div className="Quiz_cards_cantainer_contain">
              {examsug.map((e) => {
                return (
                  <div key={examsug.exam_id}>
                    <a href="">
                      <h2>{e.exam_name}</h2>
                    </a>
                  </div>
                );
              })}
            </div>
          ) : null}
        </div>
      </div>
    </>
  );
};

//  export const Quiz_Courses = () => {
//     const [coursesug, setCoursesug] = useState([]);
//     const [coursespg, setCoursespg] = useState([]);
//     const [coursesmba, setCoursesmba] = useState([]);
//     const [coursesca, setCoursesca] = useState([]);

//     useEffect(() => {
//       axios.get('http://localhost:3090/coursesug')
//         .then((res) => {
//             setCoursesug(res.data);
//           console.log(coursesug)
//         })
//         .catch((error) => {
//           console.error('Error fetching data:', error);
//         });
//     }, []);

//     useEffect(() => {
//         axios.get('http://localhost:3090/coursespg')
//           .then((res) => {
//             setCoursespg(res.data);
//             console.log(coursesug)
//           })
//           .catch((error) => {
//             console.error('Error fetching data:', error);
//           });
//       }, []);

//       useEffect(() => {
//         axios.get('http://localhost:3090/coursesmba')
//           .then((res) => {
//             setCoursesmba(res.data);
//             console.log(coursesug)
//           })
//           .catch((error) => {
//             console.error('Error fetching data:', error);
//           });
//       }, []);

//       useEffect(() => {
//         axios.get('http://localhost:3090/coursesca')
//           .then((res) => {
//             setCoursesca(res.data);
//             console.log(coursesug)
//           })
//           .catch((error) => {
//             console.error('Error fetching data:', error);
//           });
//       }, []);

//       const[examsug,setExamsug]=useState([0])
//       const[examspg,setExamspg]=useState([0])
//       const[examsmba,setExamsmba]=useState([0])
//       const[examsca,setExamsca]=useState([0])

//       useEffect(() => {
//         axios.get('http://localhost:3090/examsug')
//           .then((res) => {
//             setExamsug(res.data);
//             console.log(setExamsug)
//           })
//           .catch((error) => {
//             console.error('Error fetching data:', error);
//           });
//       }, []);

//       useEffect(() => {
//         axios.get('http://localhost:3090/examspg')
//           .then((res) => {
//             setExamspg(res.data);
//             console.log(setExamspg)
//           })
//           .catch((error) => {
//             console.error('Error fetching data:', error);
//           });
//       }, []);

//       useEffect(() => {
//         axios.get('http://localhost:3090/examsmba')
//           .then((res) => {
//             setExamsmba(res.data);
//             console.log(setExamsmba)
//           })
//           .catch((error) => {
//             console.error('Error fetching data:', error);
//           });
//       }, []);
//       useEffect(() => {
//         axios.get('http://localhost:3090/examsca')
//           .then((res) => {
//             setExamsca(res.data);
//             console.log(setExamsca)
//           })
//           .catch((error) => {
//             console.error('Error fetching data:', error);
//           });
//       }, []);
//     const[showcard1, setshowcard1] = useState(true);
//     const[showcard2, setshowcard2] = useState(false);
//     const[showcard3, setshowcard3] = useState(false);
//     const[showcard4, setshowcard4] = useState(false);
//     const[showcardactive1, setshowcardactive1] = useState(true);
//     const[showcardactive2, setshowcardactive2] = useState(false);
//     const[showcardactive3, setshowcardactive3] = useState(false);
//     const[showcardactive4, setshowcardactive4] = useState(false);

//     const displayexamsug = () => {
//         setshowcard1(true)
//         setshowcard2(false)
//         setshowcard3(false)
//         setshowcard4(false)
//         setshowcardactive1(true)
//         setshowcardactive2(false)
//         setshowcardactive3(false)
//         setshowcardactive4(false)

//     }

//     const displayexamspg = () => {
//         setshowcard1(false)
//         setshowcard2(true)
//         setshowcard3(false)
//         setshowcard4(false)
//         setshowcardactive1(false)
//         setshowcardactive2(true)
//         setshowcardactive3(false)
//         setshowcardactive4(false)

//     }
//     const displayexamsmba = (e) => {
//         setshowcard1(false)
//         setshowcard2(false)
//         setshowcard3(true)
//         setshowcard4(false)
//         setshowcardactive1(false)
//         setshowcardactive2(false)
//         setshowcardactive3(true)
//         setshowcardactive4(false)

//     }
//     const displayexamsca = (e) => {
//         setshowcard1(false)
//         setshowcard2(false)
//         setshowcard3(false)
//         setshowcard4(true)
//         setshowcardactive1(false)
//         setshowcardactive2(false)
//         setshowcardactive3(false)
//         setshowcardactive4(true)

//     }
//     return(
//         <>
//         <div className='Quiz_cards_page'>

//         <div className='Quiz_cards_page_titles'>
// {/* ------------------------ ug cards----------------------------- */}

//         <div onClick={displayexamsug}>
//         {coursesug.map((e,i)=>{
//             return(
//                 <div key={i}>
//                     <li  className={showcardactive1?"showcardactive":"showcardactivenone"}>
//                         {e.course_name}</li>
//                 </div>
//             )
//         })
//         }
// </div>
// {/* ------------------------ pg cards----------------------------- */}
// {/* <div onClick={displayexamspg}>
//         {coursespg.map((e,i)=>{
//             return(
//                 <div key={i}>
//                     <li className={showcardactive2?"showcardactive":"showcardactivenone"}>{e.course_name}</li>
//                 </div>
//             )
//         })
//         }
// </div> */}
// {/* ------------------------ mba cards----------------------------- */}

// {/* <div  onClick={displayexamsmba}>
//         {coursesmba.map((e,i)=>{
//             return(
//                 <div key={i}>
//                     <li className={showcardactive3?"showcardactive":"showcardactivenone"}>{e.course_name}</li>
//                 </div>
//             )
//         })
//         }
// </div> */}

// {/* ------------------------ ca cards----------------------------- */}

// {/* <div onClick={displayexamsca}>
//         {coursesca.map((e,i)=>{
//             return(
//                 <div key={i}>
//                     <li className={showcardactive4?"showcardactive":"showcardactivenone"}>{e.course_name}</li>
//                 </div>
//             )
//         })
//         }
// </div> */}
// </div>

// <div>
// {/* ------------------------ ug cards----------------------------- */}

// {showcard1 ? <div  className="Quiz_cards_cantainer_contain">

//     {
// examsug.map((e)=>{
//         return(
//             <div key={examsug.exam_id}>
//       <a href=""><h1>{e.exam_name}</h1> </a>
//             </div>
//         )
//     })}
// </div>:null}
// {/* ------------------------ pg cards----------------------------- */}

// {/* {showcard2 ?
// <div className="Quiz_cards_cantainer_contain" >
//     {
// examspg.map((e)=>{
//         return(
//             <div key={examspg.exam_id}>
//         <h1>{e.exam_name}</h1>
//             </div>
//         )
//     })}
// </div>:null} */}

// {/* ------------------------ mba cards----------------------------- */}

// {/* {showcard3 ?
// <div className="Quiz_cards_cantainer_contain">
//     {
// examsmba.map((e)=>{
//         return(
//             <div key={examsmba.exam_id}>
//         <h1>{e.exam_name}</h1>
//             </div>
//         )
//     })}
// </div>:null} */}

// {/* ------------------------ ca cards----------------------------- */}

// {/* {showcard4 ?
// <div className="Quiz_cards_cantainer_contain" >
//  {
// examsca.map((e)=>{
//         return(
//             <div key={examsca.exam_id}>
//         <h1>{e.exam_name}</h1>
//             </div>
//         )
//     })}
// </div>:null} */}
// </div>

//         </div>
//         </>
//     )
//  }
// ------------------------------------------------------------------------- Quiz_Courses_end---------------------------------------------

export const Footer = () => {
  return (
    <div className="footer-container footerBg">
      <footer className="footer">
        {FooterData.map((footerItem, footerIndex) => {
          return (
            <div key={footerIndex} className={footerItem.footerCLass}>
              <h4 className={footerItem.footerCs}>{footerItem.fotterTitles}</h4>
              <p>{footerItem.text}</p>

              <ul>
                <a href={footerItem.PrivacyPolicy}>
                  <li>{footerItem.home}</li>
                </a>

                <a href={footerItem.TermsAndConditions}>
                  <li>{footerItem.about}</li>
                </a>

                <a href={footerItem.RefundPolicy}>
                  <li>
                    {footerItem.career}
                    {footerItem.icon}
                  </li>
                </a>
              </ul>

              <div className="icontsFooter">
                <i id="footerIcons" className={footerItem.fb}></i>
                <i id="footerIcons" className={footerItem.insta}></i>
                <i id="footerIcons" className={footerItem.linkedin}></i>
                <i id="footerIcons" className={footerItem.youtube}></i>
              </div>
            </div>
          );
        })}
      </footer>
      <div
        className=" footer-linkss"
        style={{
          textAlign: "center",
          borderTop: "1px solid #fff",
          paddingTop: "10px",
          paddingBottom: "10px",
          color: "#fff",
        }}
      >
        {" "}
        <p style={{ margin: "0 auto" }}>
          Copyright © 2023 eGradTutor All rights reserved
        </p>
        {/* <div className='linkIcons' style={{display: 'flex', }}>
      <div className='bgIconLink'>
      <i class="fa-brands fa-facebook"></i>
      </div>

      <div className='bgIconLink'>
      <i class="fa-brands fa-instagram"></i>          
      </div>

      <div className='bgIconLink'>
      <i class="fa-brands fa-linkedin"></i>
      </div>

      <div className='bgIconLink'>
      <i class="fa-brands fa-youtube"></i>          
      </div>
    </div>  */}
      </div>
    </div>
  );
};
