import React from 'react'
// import Header from './Header'
import { useState } from 'react'
// import './IITjee.css'
import table1 from '../UG/Images/vittableimg1.png'
import tabimg from '../UG/Images/vittableimg2.png'
import tabimg1 from '../UG/Images/vittableimg3.png'
import tabimg5 from '../UG/Images/vittableimg4.png'
import { Link } from 'react-router-dom'
import logo from '../../logo2.jpeg'

import onlinets from '../UG/Images/online test seires.png'
import recordedmc from '../UG/Images/recorded mini class.png'
import livecls from '../UG/Images/live class.png'



//ESE Exam pages 
import { EseExamPateern } from './ExamPageComponent/EseExamPage/EseExamPateern'
import EseEligibility from './ExamPageComponent/EseExamPage/EseEligibility'
import { EseSyllabus } from './ExamPageComponent/EseExamPage/EseSyllabus'
import EseImportantDates from './ExamPageComponent/EseExamPage/EseImportantDates'
import Footer from '../UG/Footer'










export const Ese_ExamPage = () => {
    const [selected, setSelected] = useState(null)
    const toggle2 = (i1) => {
        // return i
        if (selected === i1) {
            return setSelected(null)

        }
        setSelected(i1)
    }
  return (
    <div className=''>
        
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
                <h1>ESE EXAM</h1>
          
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
            <div class="neetcourses pgexms ">
                        <div class="courses_heading">
                            <h1>ESE COURSES</h1>
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


const sixtoten = [
    {
        Qustion: "CONDUCTING INSTITUTE",
        answer: "Union Public Service Commission"
    },
// Exam Pattern ==========================
    {
        Qustion: "EXAM PATTERN",
        answer: [<EseExamPateern />],
        // ansIMG: [table1],
     
       
    },
    // ELIGIBILITY ==========================================
    {
        Qustion: "ELIGIBILITY",
        answer: [<EseEligibility/>],
       
    },
// syllabus ================================
    {
        Qustion: "SYLLABUS",
        answer: [<EseSyllabus/>],
        
    },

    {
        Qustion: "IMPORTANT DATES",
        answer: [<EseImportantDates/>],
    },
]

