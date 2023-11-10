import React from 'react'
import Header from './Header'
import { useState } from 'react'
import './IITjee.css'
import table1 from '../UG/Images/apeapcetimg1.png'
import tabimg from './Images/apeapcetimg2.png'
import tabimg1 from './Images/apeapcetimg3.png'
import tabimg5 from './Images/apeapcetimg4.png'
import { Link } from 'react-router-dom'
import logo from './logo2.jpg'
import livecls from './Images/live class.png'
import onlinets from './Images/online test seires.png'
import recordedmc from './Images/recorded mini class.png'

// ap exapm pages
import { Ap_examPattern } from './UGExamPages/ap_eapcet/Ap_examPattern'
import { Ap_Eligibility } from './UGExamPages/ap_eapcet/Ap_Eligibility'
import { Ap_Syllabus } from './UGExamPages/ap_eapcet/Ap_Syllabus'
import { Ap_impDates } from './UGExamPages/ap_eapcet/Ap_impDates'


export const ApEamcetExam = () => {
    const [selected, setSelected] = useState(null)
    const toggle2 = (i1) => {
        // return i
        if (selected === i1) {
            return setSelected(null)

        }
        setSelected(i1)
    }
  return (
    <div className='iitjeebody'>
         {/* import logo from './logo2.jpg' */}
         <nav>
             <div className="container nav__container">          
                <div className="pic">
                    <a href="/"><img src={logo} alt=""/></a>
                </div>    
                <ul className="nav__menu">
                    <li><Link to='/home'>Home</Link>   </li>
                    <li><a href="https://online-ug.egradtutor.in/" target='_blank' className="login1" >Login/User Registration </a></li>
                </ul>           
                 <button id="open-menu-btn"><i className="uil uil-bars"></i></button>
                 <button id="close-menu-btn"><i className="uil uil-multiply"></i></button>
             </div>   
           </nav> 
        <div className='FAQCONTENT' id='faq'>
            <div className="wrapper-3 container">
            
            <div className='exam_heading' >
                <h1>AP-EAPCET EXAM</h1>
          
            </div>
             <div className='sdfsf'>
             <div className='examdiv'>
            <button className='exambtn'><a href="">Exam Link</a></button>
            </div>
            
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
        </div>





        <div class="neetcourses">
    <div class="courses_heading">
      <h1>AP-EAPCET COURSES</h1>
    </div>

    <div class="online_courses">
      <div class="courses1 courses1-img">
        <div class="test_btn ots_btn">
          <h3>ONLINE TEST SERIES</h3>
          <img src={onlinets} alt="" />
          <div class="btn-neet"> 
            <button>
              <a href="">Explore <i class="uil uil-angle-right icon"></i></a></button>
          </div>

      </div>
      </div>


      <div class="courses1">
        <div class="test_btn ots_btn">
          <h3>RECORDED MINI COURSES</h3>
          <img src={recordedmc} alt="" />
          <div class="btn-neet"> 
            <button>
              <a href="">Explore <i class="uil uil-angle-right icon"></i></a></button>
          </div>
        </div>
      </div>

      <div class="courses1">
        <div class="test_btn ots_btn">
          <h3>LIVE CLASSES</h3>
          <img src={livecls} alt="" />
          <div class="btn-neet"> 
            <button>
              <a href="">Explore <i class="uil uil-angle-right icon"></i></a></button>
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
        answer: "Jawaharlal Nehru Technological University (JNTUK), Kakinada"
    },
// Exam Pattern ==========================
    {
        Qustion: "EXAM PATTERN",
        answer: [<Ap_examPattern/>],
     
       
    },
    // ELIGIBILITY ==========================================
    {
        Qustion: "ELIGIBILITY",
        answer: [<Ap_Eligibility/>],
       
    },
// syllabus ================================
    {
        Qustion: "SYLLABUS",
        answer: [<Ap_Syllabus/>],
        
    },

    {
        Qustion: "IMPORTANT DATES",
        answer: [<Ap_impDates/>],
    },
]





