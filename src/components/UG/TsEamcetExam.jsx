import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import Header from './Header'

import './IITjee.css'
import table1 from '../UG/Images/tseamcetimg1.png'
import tabimg from './Images/tseamcetimg2.png'
import tabimg1 from './Images/tseamcetimg3.png'
import tabimg5 from './Images/tseamcetimg4.png'
import { Link } from 'react-router-dom'
import logo from './logo2.jpg'
import livecls from './Images/live class.png'
import onlinets from './Images/online test seires.png'
import recordedmc from './Images/recorded mini class.png'

// Ts exam pages
import { Ts_ExamPattern } from './UGExamPages/TS_eamcet/Ts_ExamPattern'
import { Ts_Eligibility } from './UGExamPages/TS_eamcet/Ts_Eligibility'
import { Ts_Syllabus } from './UGExamPages/TS_eamcet/Ts_Syllabus'
import { Ts_impDates } from './UGExamPages/TS_eamcet/Ts_impDates'
import Footer from './Footer'
import Examheader from './Examheader'
import axios from "axios";


export const TsEamcetExam = () => {
  const [imageDataList1, setImageDataList1] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/TsEamcetBanners")
      .then((response) => {
        setImageDataList1(response.data);
      })
      .catch((error) => {
        console.error("Error fetching images:", error);
      });
  }, []);
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
       <Examheader/>

       <div className='jee_Carousal' style={{paddingBottom:'1rem'}}>
                {/* <Bitsat_Banner/> */}
                <Carousel
            autoPlay
            infiniteLoop
            showArrows={false}
            interval={4600}
            showThumbs={false}
            // showIndicators={false}
            showStatus={false}
          >
            {imageDataList1.map((imageData, index) => (
              <img key={index} src={imageData} alt={`Image ${index + 1}`} />
            ))}
          </Carousel>
            </div>
        <div className='FAQCONTENT' id='faq'>
            <div className="wrapper-3 container">
            
            <div className='exam_heading' >
                <h1>TS-EAMCET EXAM</h1>
          
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
      <h1>TS-EAMCET COURSES</h1>
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









<Footer />
        </div>
  )
}


const sixtoten = [
    {
        Qustion: "CONDUCTING INSTITUTE",
        answer: "Jawaharlal Nehru Technological University Hyderabad (JNTUH)"
    },
// Exam Pattern ==========================
    {
        Qustion: "EXAM PATTERN",
        answer: [<Ts_ExamPattern/>],
     
       
    },
    // ELIGIBILITY ==========================================
    {
        Qustion: "ELIGIBILITY",
        answer: [<Ts_Eligibility/>],
       
    },
// syllabus ================================
    {
        Qustion: "SYLLABUS",
        answer: [<Ts_Syllabus/>],
        
    },

    {
        Qustion: "IMPORTANT DATES",
        answer: [<Ts_impDates/>],
    },
]

