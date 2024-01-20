import React, { useState } from "react";
import "./styles/Exam_portal_admin_integration.css";
import "./styles/otcCss.css";

import { Link } from "react-router-dom";
import dashboard from "./assert/daashboard.png";
import exam from "./assert/exam.png";
import "./styles/Leftnav.css";
import Exam_portal_admin_Dashboard from "./Exam_portal_admin_Dashboard";
import Examcreation_admin from "./Examcreation_admin";
import Coursecreation_admin from "./Coursecreation_admin";
import InstructionPage_admin from "./InstructionPage_admin";
import Testcreationadmin from "./Testcreationadmin";
import DocumentUpload_admin from "./DocumentUpload_admin";
import Examcreation from "./Examcreation";
import Coursecreation from "./Coursecreation";
import Account_info from "../UGadmin/login/Account_info";

import { FaLock, FaUserAlt, FaImage } from "react-icons/fa";
import Image_Upload_for_Ac_ADMIN from "./Image_Upload_for_Ac_ADMIN";

// import logo2 from './logo2.jpeg'
// import HomeLandingPage from "../Frontend/Pages/HomeLandingPage/HomeLandingPage";

const Leftnav = () => {
  const [showMenu, setshowMenu] = useState(0);

  //------------------------------ left nav buttons toggle-----------

  const [showdashboard, setShowdashboard] = useState(true);
  const [showExamcreation_admin, setShowExamcreation_admin] = useState(false);
  const [showInstructionPage_admin, setInstructionPage_admin] = useState(false);
  const [showCoursecreation_admin, setshowCoursecreation_admin] =
    useState(false);
  const [showTestcreationadmin, setTestcreationadmin] = useState(false);
  const [showDocumentUpload_admin, setDocumentUpload_admin] = useState(false);

  const [showregisteredstudent, setShowregisteredstudent] = useState(false);
  const [showImage_Upload_for_Ac, setShowImage_Upload_for_Ac] = useState(false);
  
  const handledisplaydashboard = () => {
    setShowdashboard(true);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(false);
    setInstructionPage_admin(false);
    setTestcreationadmin(false);
    setDocumentUpload_admin(false);
    setShowregisteredstudent(false);
    setShowImage_Upload_for_Ac(false)
  };

  const handleshowExamcreation_admin = () => {
    setShowdashboard(false);
    setshowCoursecreation_admin(false);
    setShowExamcreation_admin(true);
    setInstructionPage_admin(false);
    setTestcreationadmin(false);
    setDocumentUpload_admin(false);
    setShowregisteredstudent(false);
    setShowImage_Upload_for_Ac(false)

  };
  const handleshowCoursecreation_admin = () => {
    setShowdashboard(false);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(true);
    setInstructionPage_admin(false);
    setTestcreationadmin(false);
    setDocumentUpload_admin(false);
    setShowregisteredstudent(false);
    setShowImage_Upload_for_Ac(false)

  };
  const handleInstructionPage_admin = () => {
    setShowdashboard(false);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(false);
    setInstructionPage_admin(true);
    setTestcreationadmin(false);
    setDocumentUpload_admin(false);
    setShowregisteredstudent(false);
    setShowImage_Upload_for_Ac(false)

  };

  const handleTestcreationadmin = () => {
    setShowdashboard(false);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(false);
    setInstructionPage_admin(false);
    setTestcreationadmin(true);
    setDocumentUpload_admin(false);
    setShowregisteredstudent(false);
    setShowImage_Upload_for_Ac(false)

  };

  const handleshowDocumentUpload_admin = () => {
    setShowdashboard(false);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(false);
    setInstructionPage_admin(false);
    setTestcreationadmin(false);
    setDocumentUpload_admin(true);
    setShowregisteredstudent(false);
    setShowImage_Upload_for_Ac(false)

  };

  const handleregisteredstudent = () => {
    setShowdashboard(false);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(false);
    setInstructionPage_admin(false);
    setTestcreationadmin(false);
    setDocumentUpload_admin(false);
    setShowregisteredstudent(true);
    setShowImage_Upload_for_Ac(false)

  };

  const handleImage_Upload_for_Ac=()=>{
    setShowdashboard(false);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(false);
    setInstructionPage_admin(false);
    setTestcreationadmin(false);
    setDocumentUpload_admin(false);
    setShowregisteredstudent(false);
    setShowImage_Upload_for_Ac(true)
  }
  return (
    <>
      <div className="left_nav_bar_container">
        <div
          className={
            showMenu
              ? "mobile_menu mobile_menu_non  "
              : "mobile_menu_non_black "
          }
          onClick={() => setshowMenu(!showMenu)}
        >
          <div class="quz_menu">
            <div class="lines"></div>
            <div class="lines"></div>
            <div class="lines"></div>
          </div>
        </div>
        <div
          className={showMenu ? "left-nav-bar left-nav-bar_" : "left-nav-bar"}
        >
          <ul className="left-nav-bar-ul">
            {/* <li> <img src={logo2} alt="Egrad logo" className='img' /></li> */}
            <li>
              {/* <Link to="/Exam_portal_admin_Dashboard" className="LeftnavLinks">
               */}

              <Link onClick={handledisplaydashboard} className="LeftnavLinks">
                {/* <img width={40} src={dashboard} alt="" /> */}

                <p>
                  <i class="fa-solid fa-database logo_-clr"></i> Dashboard
                </p>
              </Link>
            </li>
            <li>
              {/* <Link to="/exams" className="LeftnavLinks"> */}

              <Link
                onClick={handleshowExamcreation_admin}
                className="LeftnavLinks"
              >
                <p>
                  <i class="fa-solid fa-user-pen logo_-clr"></i>
                  Exam Creation
                </p>
              </Link>
            </li>
            <li>
              {/* <Link  onClick={handleshowCoursecreation_admin} to="/Coursecreation" className="LeftnavLinks"> */}
              <Link
                onClick={handleshowCoursecreation_admin}
                className="LeftnavLinks"
              >
                {/* <img width={40} src={dashboard} alt="" /> */}

                <p>
                  <i class="fa-solid fa-pen-nib logo_-clr"></i>
                  Course Creation
                </p>
              </Link>
            </li>
            <li>
              {/* <Link onClick={handleInstructionPage_admin} to="/InstructionPage" className="LeftnavLinks"> */}
              <Link
                onClick={handleInstructionPage_admin}
                className="LeftnavLinks"
              >
                {/* <img width={40} src={dashboard} alt="" /> */}

                <p>
                  <i class="fa-solid fa-person-chalkboard logo_-clr"></i>
                  Instruction
                </p>
              </Link>
            </li>
            <li>
              {/* <Link  onClick={handleTestcreationadmin} to="/Testcreation" className="LeftnavLinks"> */}
              <Link onClick={handleTestcreationadmin} className="LeftnavLinks">
                {/* <img width={40} src={dashboard} alt="" /> */}

                <p>
                  <i class="fa-solid fa-file-lines logo_-clr"></i>
                  Test Creation
                </p>
              </Link>
            </li>
            <li>
              {/* <Link to="/DocumentUpload" onClick={handleshowDocumentUpload_admin} className="LeftnavLinks"> */}
              <Link
                onClick={handleshowDocumentUpload_admin}
                className="LeftnavLinks"
              >
                {/* <img width={40} src={dashboard} alt="" /> */}
                <p>
                  <i class="fa-solid fa-folder-open logo_-clr"></i>
                  Document Upload
                </p>
              </Link>
            </li>
            <li>
              <Link className="LeftnavLinks" to="/HomeLandingPage">
                <p>
                  <i class="fa-brands fa-quora"></i>
                  Quiz App
                </p>
              </Link>
            </li>

            <li>
              <Link className="LeftnavLinks" onClick={handleregisteredstudent}>
                <p>
                  <i>
                    <FaUserAlt />
                  </i>
                  Regestered student info
                </p>
              </Link>
            </li>
            <li>
              <Link className="LeftnavLinks" onClick={handleImage_Upload_for_Ac}>
                <p>
                  <i>
                    <FaUserAlt />
                  </i>
                 Image Upload
                </p>
              </Link>
            </li>
          </ul>
        </div>
      </div>

      {showdashboard ? (
        <>
          <Exam_portal_admin_Dashboard />
        </>
      ) : null}

      {showExamcreation_admin ? (
        <>
          <Examcreation_admin />
          {/* <Examcreation/> */}
        </>
      ) : null}

      {showCoursecreation_admin ? (
        <>
          <Coursecreation_admin />
          {/* <Coursecreation/> */}
        </>
      ) : null}

      {showInstructionPage_admin ? (
        <>
          <InstructionPage_admin />
        </>
      ) : null}

      {showTestcreationadmin ? (
        <>
          <Testcreationadmin />
        </>
      ) : null}

      {showDocumentUpload_admin ? (
        <>
          <DocumentUpload_admin />
        </>
      ) : null}

      {showregisteredstudent ? (
        <div className="admin_S_R_INfo">
          <Account_info />
        </div>
      ) : null}

{showImage_Upload_for_Ac ? (
        
          <Image_Upload_for_Ac_ADMIN />
        
      ) : null}

    </>
  );
};

export default Leftnav;
