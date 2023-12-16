import React, { useState } from "react";
import "./styles/Exam_portal_admin_integration.css";
import "./styles/Exam_portal_admin_integration.css";

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

  const handledisplaydashboard = () => {
    setShowdashboard(true);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(false);
    setInstructionPage_admin(false);
    setTestcreationadmin(false);
    setDocumentUpload_admin(false);
  };

  const handleshowExamcreation_admin = () => {
    setShowdashboard(false);
    setshowCoursecreation_admin(false);
    setShowExamcreation_admin(true);
    setInstructionPage_admin(false);
    setTestcreationadmin(false);
    setDocumentUpload_admin(false);
  };
  const handleshowCoursecreation_admin = () => {
    setShowdashboard(false);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(true);
    setInstructionPage_admin(false);
    setTestcreationadmin(false);
    setDocumentUpload_admin(false);
  };
  const handleInstructionPage_admin = () => {
    setShowdashboard(false);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(false);
    setInstructionPage_admin(true);
    setTestcreationadmin(false);
    setDocumentUpload_admin(false);
  };

  const handleTestcreationadmin = () => {
    setShowdashboard(false);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(false);
    setInstructionPage_admin(false);
    setTestcreationadmin(true);
    setDocumentUpload_admin(false);
  };

  const handleshowDocumentUpload_admin = () => {
    setShowdashboard(false);
    setShowExamcreation_admin(false);
    setshowCoursecreation_admin(false);
    setInstructionPage_admin(false);
    setTestcreationadmin(false);
    setDocumentUpload_admin(true);
  };
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
          <div className={showMenu ? "rotate_right  " : "lines Line_one"}></div>
          <div className={showMenu ? "rotate_left  " : "lines Line_two "}></div>
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
                <div className="">
                  {/* <img width={40} src={dashboard} alt="" /> */}
                  <i class="fa-solid fa-database logo_-clr"></i>
                </div>
                <p> Dashboard</p>
              </Link>
            </li>
            <li>
              {/* <Link to="/exams" className="LeftnavLinks"> */}

              <Link
                onClick={handleshowExamcreation_admin}
                className="LeftnavLinks"
              >
                <div className="">
                  <i class="fa-solid fa-user-pen logo_-clr"></i>
                </div>
                <p>Exam Creation</p>
              </Link>
            </li>
            <li>
              {/* <Link  onClick={handleshowCoursecreation_admin} to="/Coursecreation" className="LeftnavLinks"> */}
              <Link
                onClick={handleshowCoursecreation_admin}
                className="LeftnavLinks"
              >
                <div className="">
                  {/* <img width={40} src={dashboard} alt="" /> */}
                  <i class="fa-solid fa-pen-nib logo_-clr"></i>
                </div>
                <p> Course Creation</p>
              </Link>
            </li>
            <li>
              {/* <Link onClick={handleInstructionPage_admin} to="/InstructionPage" className="LeftnavLinks"> */}
              <Link
                onClick={handleInstructionPage_admin}
                className="LeftnavLinks"
              >
                <div className="">
                  {/* <img width={40} src={dashboard} alt="" /> */}
                  <i class="fa-solid fa-person-chalkboard logo_-clr"></i>
                </div>
                <p> Instruction</p>
              </Link>
            </li>
            <li>
              {/* <Link  onClick={handleTestcreationadmin} to="/Testcreation" className="LeftnavLinks"> */}
              <Link onClick={handleTestcreationadmin} className="LeftnavLinks">
                <div className="">
                  {/* <img width={40} src={dashboard} alt="" /> */}
                  <i class="fa-solid fa-file-lines logo_-clr"></i>
                </div>
                <p> Test Creation</p>
              </Link>
            </li>
            <li>
              {/* <Link to="/DocumentUpload" onClick={handleshowDocumentUpload_admin} className="LeftnavLinks"> */}
              <Link
                onClick={handleshowDocumentUpload_admin}
                className="LeftnavLinks"
              >
                <div className="">
                  {/* <img width={40} src={dashboard} alt="" /> */}
                  <i class="fa-solid fa-folder-open logo_-clr"></i>
                </div>
                <p> Document Upload</p>
              </Link>
            </li>
            <li>
              <Link className="LeftnavLinks" to="/HomeLandingPage">
                <i class="fa-brands fa-quora"></i>
                <p>Quiz App</p>
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
        </>
      ) : null}

      {showCoursecreation_admin ? (
        <>
          <Coursecreation_admin />
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
    </>
  );
};

export default Leftnav;