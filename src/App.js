import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Footer from '../src/components/UG/Footer';
import GATE_OTS from './components/PG/GATE_OTS';
import { GateOts } from './components/PG/GateOts';

// ========================================================= IMPORTED TERMS AND CONDITIONS PAGES ===========================================================
import { TERMsCONDITIONS } from './components/UG/TERMsCONDITIONS';
import { Privacypolicy } from './components/UG/Privacypolicy';

// ========================================================= IMPORTED LANDING PAGE ===========================================================
import { Egate } from './Landing_PAGE/Egate';

// ========================================================= IMPORTED UG FILES ===========================================================
import UG_HOME from './components/ug_homepage/UG_HOME';
import { IITJEE_EXAM } from './components/UG/IITJEE_EXAM';
import OTS from './components/UG/OTS';
import { JeeOts } from './components/UG/JeeOts';
import OLVC from './components/UG/IITJEE_OLVC';
import { NeetExam } from './components/UG/NeetExam'
import { NeetOtc } from './components/UG/NeetOtc';
import { NeetOLVC } from './components/UG/NeetOLVC';
import { BitsatExam } from './components/UG/BitsatExam';
import { BitsatOTC } from './components/UG/BitsatOTC';
import { BitsatOLVC } from './components/UG/BitsatOLVC';
import { ViteeeExam } from './components/UG/ViteeeExam';
import { ApEamcetExam } from './components/UG/ApEamcetExam';
import { TsEamcetExam } from './components/UG/TsEamcetExam';
import { MhcetExam } from './components/UG/MhcetExam';
import { KcetExam } from './components/UG/KcetExam';
import { WbjeeExam } from './components/UG/WbjeeExam';
import { KeamExam } from './components/UG/KeamExam';
import { SrmJeeExam } from './components/UG/SrmJeeExam';



// ========================================================= IMPORTED PG FILES ===========================================================
import { Pg_home_page } from './components/PG/PG_homePage/Pg_home_page';
import { PGGATE_Exam } from './components/PG/PGGATE_Exam.jsx'
import { PGIITJAMExam } from './components/PG/PGIITJAMExam.jsx'
import { Ese_ExamPage } from './components/PG/Ese_ExamPage';
import { Pg_Tifr_ExamPage } from './components/PG/Pg_Tifr_ExamPage';
import { Pg_Isro_ExamPage } from './components/PG/Pg_Isro_ExamPage';
import { Pg_BARC_Exam_Page } from './components/PG/Pg_BARC_Exam_Page';



// ========================================================= IMPORTED MBA FILES ===========================================================
import { MbaHome } from './components/MBA/MbaHome';



// ========================================================= UNUSED IMPORTED FILES ===========================================================
import Landingpage from "../src/Landingpage";
import NEET from './components/UG/NEET';
import { Landing } from './Landing';
import { Ug_About } from './components/UG/Ug_homePage_k/Ug_About/Ug_About';
import { Jee_ots } from './components/UG/Ug ots pages/jee ots olvc/jee ots/Jee_ots';
import { PgHome } from './components/PG/PgHome';






const App = () => {
  return (
    <Router>
      <Routes>


{/* ======================================================== LANDING PAGE ================================================================ */}
        {/* This is a link for landing page */}
        <Route path='/' element={< Egate />} />

{/* ======================================================== ALL HOME PAGES ================================================================ */}

        {/* These are the links for all Home pages */}

        {/* This is a link for UG Home page */}
        <Route path='/home' element={<UG_HOME />} />
        {/* This ia a link for PG Home page */}
        <Route path='/PgHome' element={<Pg_home_page />} />
        {/* This is a link for MBA Home page */}
        <Route path='/MbaHome' element={<MbaHome />} />


{/* ======================================================== ALL UG EXAM PAGES(INCLUDING OTS AND OLVC PAGES) ================================================================ */}

        {/* These are the links for all UG Exam pages  */}

        {/* This is the EXAM page OTS Page and OLVC page for IIT-JEE */}

        {/* This is the EXAM page for IIT-JEE */}
        <Route path='/iitjeeExam' element={<IITJEE_EXAM />} />
        {/* This is the OTS page for IIT-JEE */}
        <Route path='/iitjee' element={<OTS />} />
        <Route path='/iitjee_otc' element={<JeeOts />} />
        {/* This is the OLVC page for IIT-JEE */}
        <Route path='/iitjee_olvc' element={<OLVC />} />

        {/* This is the EXAM page OTS Page and OLVC page for NEET */}

        {/* This is the EXAM page for NEET */}
        <Route path='/neetexam' element={<NeetExam />} />
        {/* This is the OTS page for NEET */}
        <Route path='/neetotc' element={<NeetOtc />} />
        {/* This is the OLVC page for NEET */}
        <Route path='/neet_olvc' element={<NeetOLVC />} />

        {/* This is the EXAM page OTS Page and OLVC page for BITSAT */}

        {/* This is the EXAM page for BITSAT */}
        <Route path='/bitsatexam' element={<BitsatExam />} />
        {/* This is the OTS page for BITSAT */}
        <Route path='/bitsatots' element={<BitsatOTC />} />
        {/* This is the OLVC page for BITSAT */}
        <Route path='/bitsat_olvc' element={<BitsatOLVC />} />

        {/* This is the EXAM page for VITEEE */}
        <Route path='/viteeeexam' element={<ViteeeExam />} />
        {/* This is the EXAM page for AP-EAPCET */}
        <Route path='/apeamcetexam' element={<ApEamcetExam />} />
        {/* This is the EXAM page for TS-EAMCET */}
        <Route path='/tseamcetexam' element={<TsEamcetExam />} />
        {/* This is the EXAM page for MHCET */}
        <Route path='/mhcetexam' element={<MhcetExam />} />
        {/* This is the EXAM page for KCET */}
        <Route path='/kcetexam' element={<KcetExam />} />
        {/* This is the EXAM page for WBJEE */}
        <Route path='/wbjeeexam' element={<WbjeeExam />} />
        {/* This is the EXAM page for KEAM */}
        <Route path='/keamexam' element={<KeamExam />} />
        {/* This is the EXAM page for SRMJEE */}
        <Route path='/srmjeeexam' element={<SrmJeeExam />} />

        {/* ========================================================= END OF UG EXAM LINKS ====================================================================== */}


{/* ======================================================== ALL PG EXAM PAGES(INCLUDING OTS AND OLVC PAGES) ================================================================ */}

        {/* These are the links for all PG Exam pages  */}

        {/* This is the EXAM page for GATE */}
        <Route path='/pggateexam' element={<PGGATE_Exam />} />
        {/* This is the EXAM page for IITJAM */}
        <Route path='/pgiitjamexam' element={<PGIITJAMExam />} />
        {/* This is the EXAM page for ESC */}
        <Route path='/pgEse_exam' element={<Ese_ExamPage />} />
        {/* This is the EXAM page for TIFR */}
        <Route path='/Ug_Tifr_ExamPage' element={<Pg_Tifr_ExamPage />} />
        {/* This is the EXAM page for ISRO */}
        <Route path='/isro_examPage' element={<Pg_Isro_ExamPage />} />
        {/* This is the EXAM page for BARC */}
        <Route path='/barc_examPage' element={<Pg_BARC_Exam_Page />} />

        {/* ========================================================= END OF PG EXAM LINKS ====================================================================== */}

      
        

        {/* This is a link for GATE OTS page */}
        <Route path='/' element={<GATE_OTS />} />

        {/* This is a link for GATE OLVC Page */}
        <Route path='/' element={<GateOts />} />

        <Route path='/terms' element={<TERMsCONDITIONS />} />
        <Route path='/policy' element={<Privacypolicy />} />

      </Routes>
      <Footer />
    </Router>
  );
}

export default App;