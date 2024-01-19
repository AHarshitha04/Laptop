

import React, { useEffect, useState } from "react";
import { nav } from "../DATA/Data";
import { Link, Navigate } from "react-router-dom";
import "./StudentDashbord.css";
import Student_profileUpdate from "./Student_profileUpdate";

const Student_dashboard = () => {
  const [studentDashbordconatiner, setStudentDashbordconatiner] =useState(true);

  const [studentDashbordmycourse, setStudentDashbordmycourse] = useState(false);

   const [studentDashbordbuycurses, setStudentDashbordbuycurses] =
     useState(false);
  const [studentDashbordmyresult, setStudentDashbordmyresult] = useState(false);

  const [studentDashborddountsection, setStudentDashborddountsection] =useState(false);

  const [studentDashbordbookmark, setStudentDashbordbookmark] = useState(false);

  const [studentDashbordsettings, setStudentDashbordsettings] = useState(false);


  const handlestudentDashbordconatiner=()=>{
setStudentDashbordconatiner(true)
   setStudentDashbordmycourse(false)
   setStudentDashbordbuycurses(false)
   setStudentDashbordmyresult(false)
   setStudentDashborddountsection(false)
   setStudentDashbordbookmark(false)
   setStudentDashbordsettings(false)
  }

   const handlestudentDashbordmycourse = () => {

   setStudentDashbordconatiner(false)
   setStudentDashbordmycourse(true)
   setStudentDashbordbuycurses(false)
   setStudentDashbordmyresult(false)
   setStudentDashborddountsection(false)
   setStudentDashbordbookmark(false)
   setStudentDashbordsettings(false)
   };
     const handlestudentDashbordbuycurses = () => {
        setStudentDashbordconatiner(false);
        setStudentDashbordmycourse(false);
        setStudentDashbordbuycurses(true);
        setStudentDashbordmyresult(false);
        setStudentDashborddountsection(false);
        setStudentDashbordbookmark(false);
        setStudentDashbordsettings(false);
     };
    const handlestudentDashbordmyresult = () => {
        setStudentDashbordconatiner(false);
        setStudentDashbordmycourse(false);
        setStudentDashbordbuycurses(false);
        setStudentDashbordmyresult(true);
        setStudentDashborddountsection(false);
        setStudentDashbordbookmark(false);
        setStudentDashbordsettings(false);
    };
     const handlestudentDashborddountsection = () => {
        setStudentDashbordconatiner(false);
        setStudentDashbordmycourse(false);
        setStudentDashbordbuycurses(false);
        setStudentDashbordmyresult(false);
        setStudentDashborddountsection(true);
        setStudentDashbordbookmark(false);
        setStudentDashbordsettings(false);
     };
      const handlestudentDashbordbookmark = () => {
          setStudentDashbordconatiner(false);
          setStudentDashbordmycourse(false);
          setStudentDashbordbuycurses(false);
          setStudentDashbordmyresult(false);
          setStudentDashborddountsection(false);
          setStudentDashbordbookmark(true);
          setStudentDashbordsettings(false);
      };
       const handlestudentDashbordsettings = () => {
 setStudentDashbordconatiner(false);
 setStudentDashbordmycourse(false);
 setStudentDashbordbuycurses(false);
 setStudentDashbordmyresult(false);
 setStudentDashborddountsection(false);
 setStudentDashbordbookmark(false);
 setStudentDashbordsettings(true);

       };
        
     
  return (
    <div>
      <StudentDashbordheader />

      <div className="ugquiz_StudentDashbordconatiner">
        <div className="ugquiz_StudentDashbordconatiner_left">
          <div className="ugquiz_StudentDashbordconatiner_left_menu">
            <button onClick={handlestudentDashbordconatiner}>Dashboard</button>
            <button onClick={handlestudentDashbordmycourse}>My Courses</button>
            <button onClick={handlestudentDashbordbuycurses}>
              Buy Courses
            </button>
            <button onClick={handlestudentDashbordmyresult}>My Results </button>
            <button onClick={handlestudentDashborddountsection}>
              Doubt section
            </button>
            <button onClick={handlestudentDashbordbookmark}>Bookmark</button>
            <button onClick={handlestudentDashbordsettings}>Settings</button>
          </div>
        </div>
        <div className="ugquiz_StudentDashbordconatiner_right">
          {studentDashbordconatiner ? (
            <>
              <StudentDashbordconatiner />
            </>
          ) : null}

          {studentDashbordmycourse ? (
            <>
              <StudentDashbordmycourse />
            </>
          ) : null}
          {studentDashbordbuycurses ? (
            <>
              <StudentDashbordbuycurses />
            </>
          ) : null}

          {studentDashbordmyresult ? (
            <>
              <StudentDashbordmyresult />
            </>
          ) : null}

          {studentDashborddountsection ? (
            <>
              <StudentDashborddountsection />
            </>
          ) : null}

          {studentDashbordbookmark ? (
            <>
              <StudentDashbordbookmark />
            </>
          ) : null}

          {studentDashbordsettings ? (
            <>
              <StudentDashbordsettings />
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Student_dashboard;

export const StudentDashbordheader = () => {
  const [showQuizmobilemenu, setShowQuizmobilemenu] = useState(false);
  const QuiZ_menu = () => {
    setShowQuizmobilemenu(!showQuizmobilemenu);
  };

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    localStorage.removeItem("userRole");
    window.location.href = "/uglogin";
  };
  const userRole = localStorage.getItem("userRole");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const checkLoggedIn = () => {
      const loggedIn = localStorage.getItem("isLoggedIn");
      if (loggedIn === "true") {
        setIsLoggedIn(true);
        fetchUserData();
      }
    };
    checkLoggedIn();
  }, []);

const fetchUserData = async () => {
  try {
    const token = localStorage.getItem("token");
    const response = await fetch(
      "http://localhost:5001/ughomepage_banner_login/user",
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      // Token is expired or invalid, redirect to login page
      localStorage.removeItem("isLoggedIn");
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      Navigate("/uglogin"); // Assuming you have the 'navigate' function available

      return;
    }

    if (response.ok) {
      // Token is valid, continue processing user data
      const userData = await response.json();
      setUserData(userData)
      // ... process userData
    }
  } catch (error) {
    console.error("Error fetching user data:", error);
  }
};


 const handlestudentDashbordsettings = () => {}
  return (
    <div>
      StudentDashbordheader
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
                    <button id="dropdownmenu_foradim_page_btn">
                      <img
                        title={userData.username}
                        src={userData.imageData}
                        alt={`Image ${userData.user_Id}`}
                      />
                      <div className="dropdownmenu_foradim_page">
                        {/* <Link to={`/userread/${user.id}`} className="btn btn-success mx-2">Read</Link> */}
                        {/* <Link to={`/userdeatailspage/${user.id}`} >Account-info</Link> */}
                        {/* <Link onClick={handlestudentDashbordsettings}>
                          My profile
                        </Link> */}
                        <Link onClick={handleLogout}>Logout</Link>
                      </div>
                    </button>
                    {/* <button onClick={handleLogout}>Logout</button> */}
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
  );
};

export const StudentDashbordconatiner = () => {
  return <div>StudentDashbordconatiner</div>;
};
export const StudentDashbordbuycurses = () => {
  return <div>StudentDashbordbuycourse</div>;
};
export const StudentDashbordmycourse = () => {
  return <div>StudentDashbordmycourse</div>;
};

export const StudentDashbordmyresult = () => {
  return <div>StudentDashbordmyresult</div>;
};

export const StudentDashborddountsection = () => {
  return <div>StudentDashborddountsection</div>;
};

export const StudentDashbordbookmark = () => {
  return <div>StudentDashbordbookmark</div>;
};

export const StudentDashbordsettings = () => {
  const userRole = localStorage.getItem("userRole");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUserData] = useState({});
    
     useEffect(() => {
       const checkLoggedIn = () => {
         const loggedIn = localStorage.getItem("isLoggedIn");
         if (loggedIn === "true") {
           setIsLoggedIn(true);
           fetchUserData();
         }
       };
       checkLoggedIn();
     }, []);

     const fetchUserData = async () => {
       try {
         const token = localStorage.getItem("token");
         const response = await fetch(
           "http://localhost:5001/ughomepage_banner_login/user",
           {
             headers: {
               Authorization: `Bearer ${token}`,
             },
           }
         );

         if (!response.ok) {
           // Token is expired or invalid, redirect to login page
           localStorage.removeItem("isLoggedIn");
           localStorage.removeItem("token");
           setIsLoggedIn(false);
           Navigate("/uglogin"); // Assuming you have the 'navigate' function available

           return;
         }

         if (response.ok) {
           // Token is valid, continue processing user data
           const userData = await response.json();
           setUserData(userData);
           // ... process userData
         }
       } catch (error) {
         console.error("Error fetching user data:", error);
       }
     };

  return (
    <div className="StudentDashbordsettings_conatiner">
      {/* StudentDashbordsettings */}
      <div className="StudentDashbordsettings_subconatiner">
        <div className="StudentDashbordsettings_profile_conatiner">
          <div className="StudentDashbordsettings_profile_box">
            {/* <p>{i + 1}</p> */}
            <div className="pro_img">
              Profile Image
              <img src={user.imageData} alt={`Image ${user.user_Id}`} />
            </div>
            <div className="StudentDashbordsettings_profile_box_info">
              <p>User ID:{user.username}</p>
              <p>Email ID:{user.email}</p>
              {/* <p>Role:{user.role}</p> */}
            </div>
            <div className="admin_profile_box_btncontainer">
              {/* <Link to={`/Student_profileUpdate`} className="update">
              Edit
            </Link> */}
            </div>
          </div>
        </div>
        <div className="Student_profileUpdate_editconatiner">
          <Student_profileUpdate />
        </div>
      </div>
    </div>
  );
};
