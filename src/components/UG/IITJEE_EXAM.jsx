import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from './Header'
// import { useState } from 'react'
import './IITjee.css'
import table1 from '../UG/Images/table1.png'
import tabimg from './Images/tabimg1.png'
import tabimg1 from './Images/iitjeesyllabustabimg.png'
import tabimg2 from './Images/iitjeeimptabimg.png'
import logo from './logo2.jpg'
import { Link } from 'react-router-dom'
import livecls from './Images/live class.png'
import onlinets from './Images/online test seires.png'
import recordedmc from './Images/recorded mini class.png'
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

// exam components
import { Iit_jee_ExamPattren } from './UGExamPages/iitjee/Iit_jee_ExamPattren'
import { Iitjee_Eligibility } from './UGExamPages/iitjee/Iitjee_Eligibility'
import { Iitjee_Syllabus } from './UGExamPages/iitjee/Iitjee_Syllabus'
import { Iitjee_Important } from './UGExamPages/iitjee/Iitjee_Important'
import Iitjee_banners from './Ug_Carousel/iitjee/Iitjee_banners'
import Footer from './Footer'
import Examheader from './Examheader'



export const IITJEE_EXAM = () => {

  const [imageDataList1, setImageDataList1] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5001/ExamBanners")
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
  // const[showMenu, setshowMenu] = useState(0);

  return (
    <div className='iitjeebody' >
        {/* import logo from './logo2.jpg' */}
      
<Examheader/>

            <div className='jee_Carousal' style={{paddingBottom:'1rem'}}>
                {/* <Iitjee_banners/> */}
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
                <h1>IIT-JEE(MAINS & ADVANCED) EXAM</h1>
                
          
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
                                        <div className='imagessg'><p style={{color:'black'}}>{item.answer} </p> <img src={item.ansIMG} alt="" />
                                        
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
      <h1>IIT-JEE(MAINS & ADVANCED) COURSES</h1>
    </div>

    <div class="online_courses">
      <div class="courses1 courses1-img">
        <div class="test_btn ots_btn">
          <h3>ONLINE TEST SERIES</h3>
          <img src={onlinets} alt="" />
          <div class="btn-neet"> 
            <button>
              <Link to='/iitjee_otc'>Explore <i class="uil uil-angle-right icon"></i></Link></button>
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
              <Link to='/iitjee_olvc'>Explore <i class="uil uil-angle-right icon"></i></Link></button>
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
        answer: "IIT Guwahati"
    },
// Exam Pattern ==========================
    {
        Qustion: "EXAM PATTERN",
        // answerB: "MAINS ",
        answer: [<Iit_jee_ExamPattren/>],
        // ansLI1: 'Mode of Exam:',
        // ansP1: 'It will be conducted via online (Computer-based) mode. However, Paper 2(Drawing test) will be held via pen-paper based mode.',
        // ansLI2:'Number of Papers:',
        // ansP2:'There will be two papers in JEE Main - Paper I for B.E/ B.Tech & Paper 2 for B.Arch/ B.Plan.',
        // ansLI3:'Time Duration:',
        // ansP3:'Candidates will get 3 hours to solve the paper. For PWD, 1 hour will be provided extra.',
        // ansLI4:'Questions Type:',
        // ansP4:'Objective type questions will be asked in the exam. Paper 2 will be subjective in nature. ',
        // ansLI5: 'Number of Questions:',
        // ansP5: 'There will be total 90 questions in Paper I (B.Tech/B.E) & 82 in Paper II A (B.Arch) and 105 questions in Paper II B (B.Plan).',
        // ansLI6: 'Languages:',
        // ansP6: 'Candidates will be able to attempt JEE Main in various languages. These are English, Gujarati, Hindi, Bengali, Malayalam, Kannada, Marathi, Odia, Assamese, Tamil, Urdu, Telugu & Punjabi.',
        // ansLI7: 'Marks:',
        // ansP7: 'Paper 1 will consist of 300 marks; Paper II A & Paper II B will consist of 400 marks.',
        // ansLI8: 'Marking Scheme:',
        // ansP8: 'For each correct answer, 4 marks will be given. 1 mark will be deducted for every incorrect answer.',

        // answerC: "ADVANCED ",
        // ansLIa: 'Mode of Exam:',
        // ansPa: 'JEE Advanced will be held in Online (Computer-based test) mode.',
        // ansLIb: 'Number of Papers:',
        // ansPb: 'There will be 2 Papers 1 & 2 (Both Mandatory).',
        // ansLIc: 'Time Duration:',
        // ansPc: '3 hours will be provided for each paper (4 hours for PwD candidates).',
        // ansLId: 'Subjects:',
        // ansPd: 'Questions in the paper will be from three subjects – Physics, Chemistry & Mathematics.',
        // ansLIe: 'Questions Type:',
        // ansPe: 'There will be MCQs in the paper with single correct options.',
        // ansLIf: 'Marking Scheme:',
        // ansPf: 'As per marking pattern, marks for vary for each correct answer. While negative marking will be done in some of the questions with incorrect responses.',
        // ansLIi: 'Languages:',
        // ansPi: 'Paper will be available in both Hindi and English language.',
        // ansLIj: 'Check in the table below Paper 1 & 2 questions and marks distribution:',
        // ansIMG: [table1],
     
       
    },
    // ELIGIBILITY ==========================================
    {
        Qustion: "ELIGIBILITY",
        answer: [<Iitjee_Eligibility/>],
       
    },
// syllabus ================================
    {
        Qustion: "SYLLABUS",
        answer: [<Iitjee_Syllabus/>],
    },

    {
        Qustion: "IMPORTANT DATES",
        answer: [<Iitjee_Important/>],
    },
]



