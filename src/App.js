import React from "react";





import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import "./App.css";
// import ScrollToTop from 'react-router-scroll-top';
import Footer from "../src/components/UG/Footer";
import GATE_OTS from "./components/PG/GATE_OTS";
import { GateOts } from "./components/PG/GateOts";

// ========================================================= IMPORTED TERMS AND CONDITIONS PAGES ===========================================================
import { TERMsCONDITIONS } from "./components/UG/TERMsCONDITIONS";
import { Privacypolicy } from "./components/UG/Privacypolicy";

// ========================================================= IMPORTED LANDING PAGE ===========================================================
import { Egate } from "./Landing_PAGE/Egate";

// ========================================================= IMPORTED UG FILES ===========================================================
import UG_HOME from "./components/ug_homepage/UG_HOME";
import { IITJEE_EXAM } from "./components/UG/IITJEE_EXAM";
import OTS from "./components/UG/OTS";
import { JeeOts } from "./components/UG/JeeOts";
import OLVC from "./components/UG/IITJEE_OLVC";
import { NeetExam } from "./components/UG/NeetExam";
import { NeetOtc } from "./components/UG/NeetOtc";
import { NeetOLVC } from "./components/UG/NeetOLVC";
import { BitsatExam } from "./components/UG/BitsatExam";
import { BitsatOTC } from "./components/UG/BitsatOTC";
import { BitsatOLVC } from "./components/UG/BitsatOLVC";
import { ViteeeExam } from "./components/UG/ViteeeExam";
import { ApEamcetExam } from "./components/UG/ApEamcetExam";
import { TsEamcetExam } from "./components/UG/TsEamcetExam";
import { MhcetExam } from "./components/UG/MhcetExam";
import { KcetExam } from "./components/UG/KcetExam";
import { WbjeeExam } from "./components/UG/WbjeeExam";
import { KeamExam } from "./components/UG/KeamExam";
import { SrmJeeExam } from "./components/UG/SrmJeeExam";

// ========================================================= IMPORTED PG FILES ===========================================================
import { Pg_home_page } from "./components/PG/PG_homePage/Pg_home_page";
import { PGGATE_Exam } from "./components/PG/PGGATE_Exam.jsx";
import { PGIITJAMExam } from "./components/PG/PGIITJAMExam.jsx";
import { Ese_ExamPage } from "./components/PG/Ese_ExamPage";
import { Pg_Tifr_ExamPage } from "./components/PG/Pg_Tifr_ExamPage";
import { Pg_Isro_ExamPage } from "./components/PG/Pg_Isro_ExamPage";
import { Pg_BARC_Exam_Page } from "./components/PG/Pg_BARC_Exam_Page";

// ========================================================= IMPORTED MBA FILES ===========================================================
import { MbaHome } from "./components/MBA/MbaHome";

// ========================================================= UNUSED IMPORTED FILES ===========================================================
import Landingpage from "../src/Landingpage";
import NEET from "./components/UG/NEET";
import { Landing } from "./Landing";
import { Ug_About } from "./components/UG/Ug_homePage_k/Ug_About/Ug_About";
import { Jee_ots } from "./components/UG/Ug ots pages/jee ots olvc/jee ots/Jee_ots";
import { PgHome } from "./components/PG/PgHome";
import LandingPage from "./NewLanding_Page/LandingPage.jsx";
import ScrollToTop from "./Landing_PAGE/ScrollToTop.js";
import Examheader from "./components/UG/Examheader.jsx";

// ========================================================= uglogin ===========================================================

import Login from "./components/ug_homepage/UGadmin/login/Login.js";
import UgadminHome from "./components/ug_homepage/UGadmin/UgadminHome.js";
import Quiz_dashboard, {
  ImageFetching,
} from "./components/ug_homepage/UGadmin/eaxm_portal_/Quiz_dashboard.js";
import Register from "./components/ug_homepage/UGadmin/login/Register.js";
import Account_info from "./components/ug_homepage/UGadmin/login/Account_info.js";
import UserRead from "./components/ug_homepage/UGadmin/login/UserRead.js";
import Userupdate from "./components/ug_homepage/UGadmin/login/Userupdate.js";
import Userdeatailspage from "./components/ug_homepage/UGadmin/login/Userdeatailedpage.js";
import Userdeatailedpage from "./components/ug_homepage/UGadmin/login/Userdeatailedpage.js";
import Exam_portal_home_page from "./components/ug_homepage/UGadmin/eaxm_portal_/Exam_portal_home_page.jsx";
// ========================================================= ugquiz exam imports ===========================================================

import QuestionPaper from "./components/ug_homepage/UGadmin/eaxm_portal_/QuestionPaper.jsx";

import DemoDeleteItsNotImp from "./components/ug_homepage/UGadmin/eaxm_portal_/DemoDeleteItsNotImp.jsx";


import FullTest from "./components/ug_homepage/UGadmin/eaxm_portal_/FullTest.jsx";
import Instructions from "./components/ug_homepage/UGadmin/eaxm_portal_/Instructions.jsx";

import General_intructions_page from "./components/ug_homepage/UGadmin/eaxm_portal_/General_intructions_page.jsx";

import CoursePage from "./components/ug_homepage/UGadmin/eaxm_portal_/CoursePage.jsx";

// import ExamSummary from './components/ug_homepage/UGadmin/eaxm_portal_/Exam_Summary';
import SubmitPage from "./components/ug_homepage/UGadmin/eaxm_portal_/Submit_Page";
import TestResultsPage from "./components/ug_homepage/UGadmin/eaxm_portal_/TestResultsPage";

// {/* ---------------------------------  Exam_portal_admin_integration ------------- */}

import ExamUpdataion_admin from "./components/ug_homepage/exam_portal_admin/ExamUpdataion_admin.jsx";
import Coureseupdate_admin from "./components/ug_homepage/exam_portal_admin/Coureseupdate_admin.jsx";
import TestUpdateadmin from "./components/ug_homepage/exam_portal_admin/TestUpdateadmin.jsx";
import Document_ImageInfo from "./components/ug_homepage/exam_portal_admin/Document_ImageInfo.jsx";

import GettinggInstructions from "./components/ug_homepage/exam_portal_admin/GettinggInstructions.jsx";

import { UpdateInstruction } from "./components/ug_homepage/exam_portal_admin/UpdateInstruction.jsx";

import { Score } from "./Score.jsx";

// ------------------------- studdent dash ------------------
import Student_dashboard from "./components/ug_homepage/UGadmin/eaxm_portal_/StudentDashboard/Student_dashboard.js";
import Student_Settings from "./components/ug_homepage/UGadmin/eaxm_portal_/StudentDashboard/Student_Settings.jsx";
import Student_profileUpdate from "./components/ug_homepage/UGadmin/eaxm_portal_/StudentDashboard/Student_profileUpdate.js";

// ------------------------- EmployeePortal  ------------------


import EmployeePortal from "./components/EmployeePortal/EmployeePortal.js";
import EmployeeDashboard from "./components/EmployeePortal/EmployeeDashboard.js";

const PrivateRoute = ({ element }) => {
  const isAuthenticated = localStorage.getItem("isLoggedIn");
  return isAuthenticated ? element : <Navigate to="/uglogin" />;
};
const App = () => {
  return (
    <Router>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Egate />} />
        {/* ======================================================== LANDING PAGE ================================================================ */}
        {/* This is a link for landing page */}
        {/* ======================================================== ALL HOME PAGES ================================================================ */}
        {/* These are the links for all Home pages */}
        {/* This is a link for UG Home page */}
        <Route path="/home" element={<UG_HOME />} />
        {/* This ia a link for PG Home page */}
        <Route path="/PgHome" element={<Pg_home_page />} />
        {/* This is a link for MBA Home page */}
        <Route path="/MbaHome" element={<MbaHome />} />
        {/* ======================================================== ALL UG EXAM PAGES(INCLUDING OTS AND OLVC PAGES) ================================================================ */}
        {/* These are the links for all UG Exam pages  */}
        {/* This is the EXAM page OTS Page and OLVC page for IIT-JEE */}
        {/* This is the EXAM page for IIT-JEE */}
        <Route path="/iitjeeExam" element={<IITJEE_EXAM />} />
        {/* This is the OTS page for IIT-JEE */}
        <Route path="/iitjee" element={<OTS />} />
        <Route path="/iitjee_otc" element={<JeeOts />} />
        {/* This is the OLVC page for IIT-JEE */}
        <Route path="/iitjee_olvc" element={<OLVC />} />
        {/* This is the EXAM page OTS Page and OLVC page for NEET */}
        {/* This is the EXAM page for NEET */}
        <Route path="/neetexam" element={<NeetExam />} />
        {/* This is the OTS page for NEET */}
        <Route path="/neetotc" element={<NeetOtc />} />
        {/* This is the OLVC page for NEET */}
        <Route path="/neet_olvc" element={<NeetOLVC />} />
        {/* This is the EXAM page OTS Page and OLVC page for BITSAT */}
        {/* This is the EXAM page for BITSAT */}
        <Route path="/bitsatexam" element={<BitsatExam />} />
        {/* This is the OTS page for BITSAT */}
        <Route path="/bitsatots" element={<BitsatOTC />} />
        {/* This is the OLVC page for BITSAT */}
        <Route path="/bitsat_olvc" element={<BitsatOLVC />} />
        {/* This is the EXAM page for VITEEE */}
        <Route path="/viteeeexam" element={<ViteeeExam />} />
        {/* This is the EXAM page for AP-EAPCET */}
        <Route path="/apeamcetexam" element={<ApEamcetExam />} />
        {/* This is the EXAM page for TS-EAMCET */}
        <Route path="/tseamcetexam" element={<TsEamcetExam />} />
        {/* This is the EXAM page for MHCET */}
        <Route path="/mhcetexam" element={<MhcetExam />} />
        {/* This is the EXAM page for KCET */}
        <Route path="/kcetexam" element={<KcetExam />} />
        {/* This is the EXAM page for WBJEE */}
        <Route path="/wbjeeexam" element={<WbjeeExam />} />
        {/* This is the EXAM page for KEAM */}
        <Route path="/keamexam" element={<KeamExam />} />
        {/* This is the EXAM page for SRMJEE */}
        <Route path="/srmjeeexam" element={<SrmJeeExam />} />
        {/* ========================================================= END OF UG EXAM LINKS ====================================================================== */}
        {/* ======================================================== ALL PG EXAM PAGES(INCLUDING OTS AND OLVC PAGES) ================================================================ */}
        {/* These are the links for all PG Exam pages  */}
        {/* This is the EXAM page for GATE */}
        <Route path="/pggateexam" element={<PGGATE_Exam />} />
        {/* This is the EXAM page for IITJAM */}
        <Route path="/pgiitjamexam" element={<PGIITJAMExam />} />
        {/* This is the EXAM page for ESC */}
        <Route path="/pgEse_exam" element={<Ese_ExamPage />} />
        {/* This is the EXAM page for TIFR */}
        <Route path="/Ug_Tifr_ExamPage" element={<Pg_Tifr_ExamPage />} />
        {/* This is the EXAM page for ISRO */}
        <Route path="/isro_examPage" element={<Pg_Isro_ExamPage />} />
        {/* This is the EXAM page for BARC */}
        <Route path="/barc_examPage" element={<Pg_BARC_Exam_Page />} />
        {/* ========================================================= END OF PG EXAM LINKS ====================================================================== */}
        {/* This is a link for GATE OTS page */}
        <Route path="/" element={<GATE_OTS />} />
        {/* This is a link for GATE OLVC Page */}
        <Route path="/" element={<GateOts />} />
        <Route path="/terms" element={<TERMsCONDITIONS />} />
        <Route path="/policy" element={<Privacypolicy />} />
        {/* ========================================================= uglogin ====================================================================== */}
        <Route path="/Register" element={<Register />} />
        {/* <Route path="/uglogin" element={<Login />} /> */}
        <Route
          path="/UgadminHome"
          element={<PrivateRoute element={<UgadminHome />} />}
        />
        {/* Remove the following line, as it always redirects to the login page */}
        <Route path="/uglogin" element={<Login />} />
        {/* ========================================================= ugdashboard ====================================================================== */}
        <Route
          path="/Exam_portal_home_page"
          element={<Exam_portal_home_page />}
        />
        <Route
          path="/Quiz_dashboard"
          element={<PrivateRoute element={<Quiz_dashboard />} />}
        />
        <Route
          path="/Account_info"
          element={<PrivateRoute element={<Account_info />} />}
        />
        <Route
          path="/userread/:id"
          element={<PrivateRoute element={<UserRead />} />}
        />
        <Route
          path="/Userupdate/:id"
          element={<PrivateRoute element={<Userupdate />} />}
        />
        <Route
          path="/userdetails"
          element={<PrivateRoute element={<Userdeatailedpage />} />}
        />
        {/* <Route path="/Quiz_dashboard" element={<Quiz_dashboard />} /> */}
        {/* ========================================================= ughomepage ====================================================================== */}
        <Route
          path="/ImageFetching"
          element={<PrivateRoute element={<ImageFetching />} />}
        />
        {/* ========================================================= quiz exam routes ====================================================================== */}
        <Route
          path="/feachingcourse/:examId"
          element={<PrivateRoute element={<CoursePage />} />}
        />
        <Route
          path="/Test_List/:courseCreationId"
          element={<PrivateRoute element={<FullTest />} />}
        />
        <Route
          path="/Instructions/:testCreationTableId"
          element={<PrivateRoute element={<Instructions />} />}
        />
        <Route
          path="/General_intructions_page/:testCreationTableId"
          element={<PrivateRoute element={<General_intructions_page />} />}
        />
        <Route
          path="/QuestionPaper/questionOptions/:testCreationTableId"
          element={<PrivateRoute element={<QuestionPaper />} />}
        />
{/* ----------------demo------------------------------------------------------------------ */}
{/* 
<Route
          path="/QuestionPaper/questionOptions/:testCreationTableId"
          element={<PrivateRoute element={<DemoDeleteItsNotImp />} />}
        /> */}

{/* ----------------demo------------------------------------------------------------------ */}

<Route
          path="/SubmitPage"
          element={<PrivateRoute element={<SubmitPage />} />}
        />
{/* 
<Route
          path="/OTS_reset_password/:id/:token"
          element={<QUIZ_ResetPassword />}
        ></Route> */}
        {/* <Route
          path="/SubmitPage"
          element={<PrivateRoute element={<SubmitPage />} />}
        /> */}
        <Route
          path="/TestResultsPage/:testCreationTableId"
          element={<PrivateRoute element={<TestResultsPage />} />}
        />
        {/* <Route path='/ExamSummary'  element={<ExamSummary />} /> */}
        {/* ---------------------------------  Exam_portal_admin_integration ------------- */}
        <Route
          path="/ExamUpdataion_admin/:examId"
          element={<PrivateRoute element={<ExamUpdataion_admin />} />}
        />
        <Route
          path="/Coureseupdate_admin/:courseCreationId"
          element={<PrivateRoute element={<Coureseupdate_admin />} />}
        />
        <Route
          path="/TestUpdateadmin/:testCreationTableId"
          element={<PrivateRoute element={<TestUpdateadmin />} />}
        />
        <Route
          path="/getSubjectData/:testCreationTableId/:subjectId/:sectionId"
          element={<PrivateRoute element={<Document_ImageInfo />} />}
        />
        <Route
          path="/Instruction/editIns/:instructionId/"
          element={<PrivateRoute element={<GettinggInstructions />} />}
        />
        <Route
          path="/InstructionPage/editIns/:instructionId/:id"
          element={<PrivateRoute element={<UpdateInstruction />} />}
        />
        {/* // --------------------------
        student_dashboard-------------------------// */}
        <Route
          path="/Student_dashboard"
          element={<PrivateRoute element={<Student_dashboard />} />}
        />
        <Route
          path="/Student_profileUpdate"
          element={<PrivateRoute element={<Student_profileUpdate />} />}
        />
        <Route path="/Score" element={<PrivateRoute element={<Score />} />} />
        {/* ---------------------------EmployeePortalHomepage----------------------- */}
        {/* ---------- EmployeePortal_login ------------- */}
        <Route path="/EmployeePortal" element={<EmployeePortal />} />
        {/* ---------- EmployeeDashboard ------------- */}
        <Route path="/Employee_dashboard" element={<EmployeeDashboard />} />
      </Routes>

      {/* <Footer /> */}
      {/* <LandingPage /> */}
    </Router>
  );
};



export default App;
