import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo2.jpeg'
import BARCExamPattern from './ExamPageComponent/BARCExamPage/BARCExamPattern'
import BARCEligibility from './ExamPageComponent/BARCExamPage/BARCEligibility'
import BARCSyllabus from './ExamPageComponent/BARCExamPage/BARCSyllabus'
import BARCImportantDates from './ExamPageComponent/BARCExamPage/BARCImportantDates'

import onlinets from '../UG/Images/online test seires.png'
import recordedmc from '../UG/Images/recorded mini class.png'
import livecls from '../UG/Images/live class.png'
import Footer from '../UG/Footer'








export const Pg_BARC_Exam_Page = () => {
    const [selected, setSelected] = useState(null)
    const toggle2 = (i1) => {
        // return i
        if (selected === i1) {
            return setSelected(null)

        }
        setSelected(i1)
    }
  return (
    <div>
        {/* import logo from '../../logo2.jpeg' */}
    <nav>
          <div className="container nav__container">          
             <div className="pic">
                 <a href="/"><img src={logo} alt=""/></a>
             </div>    
             <ul className="nav__menu">
                 <li><Link to='/PgHome'>Home</Link>   </li>
                 <li><a href="https://online-ug.egradtutor.in/" target='_blank' className="login1" >Login/User Registration </a></li>
             </ul>           
              <button id="open-menu-btn"><i className="uil uil-bars"></i></button>
              <button id="close-menu-btn"><i className="uil uil-multiply"></i></button>
          </div>   
        </nav> 
     <div className='FAQCONTENT' id='faq'>
         <div className="wrapper-3 container">
         
         <div className='' >
             <h1>BARC EXAM PAGE</h1>
       
         </div>
          <div className='sdfsf'>
             <div className="accordion">
                     {barc.map((item, i2) => (
                         <div className="item2">
                             <div className="title" onClick={() => toggle2(i2)}>
                                 <h2>{item.Qustion}</h2>
                                 <span>{selected === i2 ? '-' : '+'}</span>
                             </div>
                             <div className={selected === i2 ? 'content-show2' : 'content2'}>
                                 <div>
                                     {/* <div className='imagessg'> */}
                                     <div className={item.class}>
                                         <div>
                                         <ul className={item.clName}>
                                             <div className='exSpace'>
                                             <li><b>{item.answer}</b></li><br />
                                            
                                             </div>
                                         </ul>
                                         </div>
                                         {/* <div className='imgSection'>
                                         <img src={item.ansIMG} alt="" />
                                         </div> */}
                                     
                                     </div>
                                                                     
                                 
                                 </div>
                             </div>
                         </div>
                     ))}

                 </div>
          </div>

         </div>
         

  
         <div class="neetcourses   pgexms 
">
                        <div class="courses_heading">
                            <h1>BARC COURSES</h1>
                        </div>

                        <div class="online_courses">
                            <div class="courses1 courses1-img">
                                <div class="test_btn ots_btn">
                                    <h3>ONLINE TEST SERIES</h3>
                                    <img src={onlinets} alt="" />
                                    <div class="btn-neet">
                                        <button>
                                            <Link to=''>Explore <i class="uil uil-angle-right icon"></i></Link></button>
                                    </div>

                                </div>
                            </div>


                            <div class="courses1">
                                <div class="test_btn ots_btn">
                                    <h3>RECORDED MINI COURSES</h3>
                                    <img src={recordedmc} alt="" />
                                    <div class="btn-neet">
                                        <button>
                                            <Link to=''>Explore <i class="uil uil-angle-right icon"></i></Link></button>
                                    </div>
                                </div>
                            </div>

                            <div class="courses1">
                                <div class="test_btn ots_btn">
                                    <h3>LIVE CLASSES</h3>
                                    <img src={livecls} alt="" />
                                    <div class="btn-neet">
                                        <button>
                                            <Link to=''>Explore <i class="uil uil-angle-right icon"></i></Link></button>
                                    </div>

                                </div>
                            </div>

                        </div>
                    </div>
     </div>
     <Footer />
    </div>
  )
}

const barc = [
    {
        Qustion: "CONDUCTING INSTITUTE",
        answer: "Bhabha Atomic Research Centre",
        
    },
// Exam Pattern ==========================
    {
        Qustion: "EXAM PATTERN",
        answer: [<BARCExamPattern/>],   
    },
    // ELIGIBILITY ==========================================
    {
        Qustion: "ELIGIBILITY",
        answer: [<BARCEligibility/>],
       


       
    },
// syllabus ================================
    {
        Qustion: "SYLLABUS",
        answer: [<BARCSyllabus/>],
    },

    {
        Qustion: "IMPORTANT DATES",
        answer: [<BARCImportantDates/>],
       
    },
]
