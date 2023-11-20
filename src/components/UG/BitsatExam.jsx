import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import Header from './Header'
// import { useState } from 'react'
import './IITjee.css'
import table1 from '../UG/Images/bitsattableimg1.png'
import tabimg from './Images/bitsattableimg2.png'
import tabimg1 from './Images/bitsattableimg3.png'
import tabimg5 from './Images/bitsattableimg4.png'
import { Link } from 'react-router-dom'
import logo from './logo2.jpg'
import livecls from './Images/live class.png'
import onlinets from './Images/online test seires.png'
import recordedmc from './Images/recorded mini class.png'


// bitsat exam pages
import { Bitsat_ExamPattern } from './UGExamPages/bitsat/Bitsat_ExamPattern'
import { Bitsat_eligibility } from './UGExamPages/bitsat/Bitsat_eligibility'
import { Bistat_Syllabus } from './UGExamPages/bitsat/Bistat_Syllabus'
import { Bitsat_ImpDates } from './UGExamPages/bitsat/Bitsat_ImpDates'
import Bitsat_Banner from './Ug_Carousel/BITSAT/Bitsat_Banner'
import Footer from './Footer'
import Examheader from './Examheader'
import axios from "axios";



export const BitsatExam = () => {

  const [imageDataList1, setImageDataList1] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/BitsatExamBanners")
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
                <h1>BITSAT EXAM</h1>
          
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
      <h1>BITSAT COURSES</h1>
    </div>

    <div class="online_courses">
      <div class="courses1 courses1-img">
        <div class="test_btn ots_btn">
          <h3>ONLINE TEST SERIES</h3>
          <img src={onlinets} alt="" />
          <div class="btn-neet"> 
            <button>
              <Link to='/bitsatots'>Explore <i class="uil uil-angle-right icon"></i></Link></button>
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
              <Link to='/bitsat_olvc'>Explore <i class="uil uil-angle-right icon"></i></Link></button>
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
        answer: "Birla Institute of Technology and Science"
    },
// Exam Pattern ==========================
    {
        Qustion: "EXAM PATTERN",
        answer: [<Bitsat_ExamPattern/>],
        
     
       
    },
    // ELIGIBILITY ==========================================
    {
        Qustion: "ELIGIBILITY",
        answer: [<Bitsat_eligibility/>],
       
    },
// syllabus ================================
    {
        Qustion: "SYLLABUS",
        answer: [<Bistat_Syllabus/>],
        
    },

    {
        Qustion: "IMPORTANT DATES",
        answer: [<Bitsat_ImpDates/>],
    },
]



