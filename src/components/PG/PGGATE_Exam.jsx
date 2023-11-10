import React from 'react'
import Header from '../UG/Header'
import { useState } from 'react'
import './GATECSS.css'
import table1 from '../PG/Images/tableimg1.png'
import tabimg from '../PG/Images/tableimg2.png'
import tabimg3 from '../PG/Images/tableimg3.png'
import tabimg4 from '../PG/Images/tableimg4.png'
import logo from '../UG/Images/logo2.jpeg'


import onlinets from '../UG/Images/online test seires.png'
import recordedmc from '../UG/Images/recorded mini class.png'
import livecls from '../UG/Images/live class.png'



// GateExamPage pages
import GateExamPattern from './ExamPageComponent/GateExamPage/GateExamPattern'
import GateEligibility from './ExamPageComponent/GateExamPage/GateEligibility'
import GateSyllabus from './ExamPageComponent/GateExamPage/GateSyllabus'
import GateImportantDates from './ExamPageComponent/GateExamPage/GateImportantDates'
import { Link } from 'react-router-dom'

export const PGGATE_Exam = () => {
    const [selected, setSelected] = useState(null)
    const toggle2 = (i1) => {
        // return i
        if (selected === i1) {
            return setSelected(null)

        }
        setSelected(i1)
    }
  return (
    <div className='' style={{margin: '2rem'}}>
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
                <h1>GATE</h1>
          
            </div>
             <div className='sdfsf'>
                <div className="accordion">
                        {sixtoten.map((item, i2) => (
                            <div className="item2">
                                <div className="title" onClick={() => toggle2(i2)}>
                                    <h2>{item.Qustion}</h2>
                                    <span>{selected === i2 ? '-' : '+'}</span>
                                </div>
                                <div className={selected === i2 ? 'content-show2' : 'content2'}>
                                    <div>
                                        <div className='imagessg'>{item.answer}  
                                        {/* <img src={item.ansIMG} alt="" /> */}
                                        
                                        </div>
                                                                        
                                    
                                    </div>
                                </div>
                            </div>
                        ))}

                    </div>
             </div>

            </div>
            <div class="neetcourses pgexms">
    <div class="courses_heading">
      <h1>GATE COURSES</h1>
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
        </div>
  )
}








const sixtoten = [
    {
        Qustion: "CONDUCTING INSTITUTE",
        answer: "IIT KANPUR"
    },
// Exam Pattern ==========================
    {
        Qustion: "EXAM PATTERN",
        answer: [<GateExamPattern/>],
       
      
     
       
    },
    // ELIGIBILITY ==========================================
    {
        Qustion: "ELIGIBILITY",
        answer: [<GateEligibility/>],
       
    },
// syllabus ================================
    {
        Qustion: "SYLLABUS",
        answer: [<GateSyllabus/>]
    },

    {
        Qustion: "IMPORTANT DATES",
        answer: [<GateImportantDates/>]
    },
]