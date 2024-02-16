import React, { useEffect, useState } from "react";
import axios from "axios";
import MockTest from "../../../../Images/mock_test.jpg";
import { Link, useParams } from "react-router-dom";
import logo from "./asserts/logo.jpeg";
import { FooterData } from "./DATA/Data";

const CoursePage = () => {
  const { examId, examName } = useParams();
  const [courseCard, setCourseCard] = useState([]);
  const [noOfTests, setNoOfTests] = useState([]);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchCourseDetails = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5001/Cards/feachingcourse/${examId}`
        );
        setCourseCard(response.data);
        console.log(examId);
        console.log("API Response:", response.data); // Log the API response
        const courseResponse = await fetch(
          "http://localhost:5001/Cards/Test/count"
        );
        if (!courseResponse.ok) {
          throw new Error("Network response was not ok");
        }
        const courseData = await courseResponse.json();
        setNoOfTests(courseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCourseDetails();
  }, [examId]);

  const currentDate = new Date(); // Get the current date

  // Filter exams based on start and end dates
  const filteredCourses = courseCard.filter(
    (courseDetails) =>
      new Date(courseDetails.courseStartDate) <= currentDate &&
      currentDate <= new Date(courseDetails.courseEndDate)
  );

  console.log("Exam ID:", examId); // Log the examId
  console.log("Course Card State:", courseCard); // Log the courseCard state

  return (
    <div>
      <div className="header">
        <img className="header_logo" src={logo} alt="logo" width={200} />
        {/* <h3>{courseDetails.examName}</h3>  */}
        {/* {courseCard.map((heading)=>(
          <h2 style={{"color":"white"}}>{heading.examName}</h2>

        ))} */}
        {/* Check if courseCard has at least one item before accessing examName */}
        {courseCard.length > 0 && (
          <h2 style={{ color: "white" }}>{courseCard[0].examName}</h2>
        )}
      </div>
      {/* <div><Header/></div> */}
      
      <div className="container_H100">
      <ul className="card_container">
        {filteredCourses.map((courseDetails) => (
          <div
            key={courseDetails.courseCreationId}
            className="first_card"
          >
            <img
              src={courseDetails.cardimeage}
              alt={courseDetails.examName}
       
            />
            
              <h3>{courseDetails.courseName}</h3>
            
            <li>
              Validity: ({courseDetails.courseStartDate}) to (
              {courseDetails.courseEndDate})
            </li>
            <li>Cost: {courseDetails.cost}</li>
            {/* <li>Discount: {courseDetails.Discount}%</li> */}
            {/* <li>Price after discount: {courseDetails.totalPrice}</li> */}
            <li>
              {noOfTests.map(
                (count) =>
                  count.courseCreationId === courseDetails.courseCreationId && (
                    <p key={count.courseCreationId}>
                      No of Tests: {count.numberOfTests}
                    </p>
                  )
              )}
            </li>
            <br />
            <div className="start_now">
              <Link to={`/Test_List/${courseDetails.courseCreationId}`}>
                Test Page
              </Link>
            </div>
          </div>
        ))}
      </ul>

      </div>
      
      <Footer/>
    </div>
  );
};

export default CoursePage;


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
// export const Header = () => {
//   // ---------------------------------- login ---------------------------
//   const [showloginQuiz, setShowloginQuiz] = useState(false);
//   const [showRegisterQuiz, setShowRegisterQuiz] = useState(false);
//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");
//   const [user, setUser] = useState("");
//   const Quiz_login = () => {
//     setShowloginQuiz(true);
//   };

//   const Quiz_register = () => {
//     setShowRegisterQuiz(true);
//   };

//   const Quiz_close = () => {
//     setShowloginQuiz(false);
//     setShowRegisterQuiz(false);
//   };
//   const userRole = localStorage.getItem("userRole");
//   const [isLoggedIn, setIsLoggedIn] = useState(false);
//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     const checkLoggedIn = () => {
//       const loggedIn = localStorage.getItem("isLoggedIn");
//       if (loggedIn === "true") {
//         setIsLoggedIn(true);
//         fetchUserData();
//       }
//     };
//     checkLoggedIn();
//   }, []);

//   const fetchUserData = async () => {
//     try {
//       const token = localStorage.getItem("token");
//       const response = await fetch(
//         "http://localhost:5001/ughomepage_banner_login/user",
//         {
//           headers: {
//             Authorization: `Bearer ${token}`,
//           },
//         }
//       );

//       if (response.ok) {
//         const userData = await response.json();
//         setUserData(userData);
//       } else {
//         // Handle errors if needed
//       }
//     } catch (error) {
//       // Handle other errors if needed
//     }
//   };

//   // const [courses, setCourses] = useState([]);
//   const [examsug, setExamsug] = useState([0]);

//   useEffect(() => {
//     axios
//       .get("http://localhost:5001/ughomepage_banner_login/examsug")
//       .then((res) => {
//         setExamsug(res.data);
//         console.log(res.data);
//       })
//       .catch((error) => {
//         console.error("Error fetching data:", error);
//       });
//   }, []);

//   const [coursesBtnContainerVisible, setCoursesBtnContainerVisible] =
//     useState(false);
//   const toggleCoursesBtnContainer = () => {
//     setCoursesBtnContainerVisible(!coursesBtnContainerVisible);
//   };
//   const [showQuizmobilemenu, setShowQuizmobilemenu] = useState(false);

//   const QuiZ_menu = () => {
//     setShowQuizmobilemenu(!showQuizmobilemenu);
//   };

//   const handleLogout = () => {
//     localStorage.removeItem("isLoggedIn");
//     localStorage.removeItem("userRole");
//     window.location.href = "/uglogin";
//   };

//   const act_info = () => {
//     if (user.role === "admin") {
//       window.location.href = "/UgadminHome";
//     } else {
//       window.location.href = "/userdeatailspage/:id"; // Replace with the URL for user details page
//     }
//   };

//   // ----------------- dashborad ---------------------/

//   //  localStorage.setItem("isLoggedIn", "true");
//   return (
//     <>
//       <div className="Quiz_main_page_header">
//         {nav.map((nav, index) => {
//           return (
//             <div key={index} className="Quiz_main_page_navbar">
//               <div className="Quizzlogo">
//                 <img src={nav.logo} alt="" />
//               </div>
//               {/* <li  className={showcardactive1?"showcardactive":"showcardactivenone"}> */}

//               <div
//                 className={
//                   !showQuizmobilemenu
//                     ? "Quiz_main_page_navbar_SUBpart Quiz_main_page_navbar_SUBpart_mobile"
//                     : "Quiz_main_page_navbar_SUBpart_mobile"
//                 }
//               >
//                 <ul>
//                   <button style={{ background: "none" }}>
//                     <Link to="/home" className="Quiz__home">
//                       Home
//                     </Link>
//                   </button>
//                   <li className="courses_btn_continer">
//                     <button
//                       className="courses_btn"
//                       onClick={toggleCoursesBtnContainer}
//                     >
//                       courses
//                     </button>
//                     {coursesBtnContainerVisible ? (
//                       <div className="courses">
//                         {examsug.map((e) => {
//                           return (
//                             <div key={examsug.exam_id}>
//                               <a href="">{e.exam_name} </a>
//                             </div>
//                           );
//                         })}
//                       </div>
//                     ) : null}
//                   </li>

//                   {/* <button className="quiz_sign_UP">
//                     Sign up
//                   </button> */}
//                   <div className="Quiz_main_page_login_signUp_btn">
//                     {/*
//                       <Link to='/'><button onClick={Quiz_login}>
//                    Login
//                   </button></Link> */}

//                     {/* {userRole === "admin"  && (
//                       <>
//                         <li>
//                           <button>
//                             <Link to="/Quiz_dashboard">ADMIN Settings</Link>
//                           </button>
//                         </li>
//                       </>
//                     )} */}

//                     {(userRole === "admin" ||
//                       userRole === "ugotsadmin" ||
//                       userRole === "ugadmin") && (
//                       <>
//                         <li>
//                           <button>
//                             <Link to="/Quiz_dashboard">ADMIN Settings</Link>
//                           </button>
//                         </li>
//                       </>
//                     )}

//                     {userRole === "viewer" && (
//                       <>
//                         <button>
//                           <Link to="/student_dashboard">DashBoard</Link>
//                         </button>
//                       </>
//                     )}
//                   </div>
//                   <div>
//                     {isLoggedIn === true ? (
//                       <>
//                         <button id="dropdownmenu_foradim_page_btn">
//                           {userData.username}
//                           <div className="dropdownmenu_foradim_page">
//                             {/* <Link to={`/userread/${user.id}`} className="btn btn-success mx-2">Read</Link> */}
//                             {/* <Link to={`/userdeatailspage/${user.id}`} >Account-info</Link> */}
//                             <Link to="/Account_info">Account-info</Link>
//                             <Link onClick={handleLogout}>Logout</Link>
//                           </div>
//                         </button>
//                       </>
//                     ) : (
//                       <>
//                         <a class="uglogin_btn" href="/UgadminHome">
//                           Login/Registration
//                         </a>
//                       </>
//                     )}

//                     {isLoggedIn === "flase" && (
//                       <>
//                         <button id="dropdownmenu_foradim_page_btn">
//                           {/* {userData.username} */}
//                           <div className="dropdownmenu_foradim_page">
//                             {/* <Link to={`/userread/${user.id}`} className="btn btn-success mx-2">Read</Link> */}

//                             {/* <Link to={`/userdeatailspage/${user.id}`} >Acount-info</Link> */}
//                             {/* <Link to="/Account_info">Acount-info</Link>

//                             <Link onClick={handleLogout}>Logout</Link> */}
//                           </div>
//                         </button>
//                       </>
//                     )}
//                   </div>
//                 </ul>
//               </div>
//               <div className="quz_menu" onClick={QuiZ_menu}>
//                 <div className="lines"></div>
//                 <div className="lines"></div>
//                 <div className="lines"></div>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     </>
//   );
// };
