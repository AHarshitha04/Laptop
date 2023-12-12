
import Header from './Header'
import React, { useState, useEffect } from "react";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import axios from "axios";
import './IITjee.css'
import table1 from '../UG/Images/neettableimg1.png'
import tabimg from './Images/neettableimg2.png'
import tabimg1 from './Images/neettableimg3.png'
import tabimg2 from './Images/neettableimg4.png'
import tabimg3 from './Images/neettableimg5.png'
import tabimg4 from './Images/neettableimg6.png'
import tabimg5 from './Images/neettableimg7.png'
import logo from './logo2.jpg'
import { Link } from 'react-router-dom'
import livecls from './Images/live class.png'
import onlinets from './Images/online test seires.png'
import recordedmc from './Images/recorded mini class.png'


// neet exam pages ---
import { Neet_examPattern } from './UGExamPages/neet/Neet_examPattern'
import { Neet_Eligibility } from './UGExamPages/neet/Neet_Eligibility'
import { Neet_Syllabus } from './UGExamPages/neet/Neet_Syllabus'
import { Neet_ImportantDates } from './UGExamPages/neet/Neet_ImportantDates'
import Neet_banners from './Ug_Carousel/Neet_Banner/Neet_banners'
import Footer from './Footer'
import Examheader from './Examheader'


export const NeetExam = () => {

  const [imageDataList1, setImageDataList1] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5005/NeetExamBanners")
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
                {/* <Neet_banners/> */}
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
                <h1>NEET EXAM</h1>
          
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
                                        </div><br />
                                        {/* <div className='imagessg'><img src={item.ansIMG1} alt="" /></div><br />
                                        <div className='imagessg'><img src={item.ansIMG2} alt="" /></div><br />
                                        <div className='imagessg'><img src={item.ansIMG3} alt="" /></div><br /> */}
                                                   
                                    
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
      <h1>NEET COURSES</h1>
    </div>

    <div class="online_courses">
      <div class="courses1 courses1-img">
        <div class="test_btn ots_btn">
          <h3>ONLINE TEST SERIES</h3>
          <img src={onlinets} alt="" />
          <div class="btn-neet"> 
            <button>
              <Link to='/neetotc'>Explore <i class="uil uil-angle-right icon"></i></Link></button>
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
              <Link to='/neet_olvc'>Explore <i class="uil uil-angle-right icon"></i></Link></button>
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
        answer: "National Testing Agency"
    },
// Exam Pattern ==========================
    {
        Qustion: "EXAM PATTERN",
        answer: [<Neet_examPattern/>],
        // ansIMG: [table1],
     
       
    },
    // ELIGIBILITY ==========================================
    {
        Qustion: "ELIGIBILITY",
        answer: [<Neet_Eligibility/>],
       
    },
// syllabus ================================
    {
        Qustion: "SYLLABUS",
        answer: [<Neet_Syllabus/>],
        
        
    },

    {
        Qustion: "IMPORTANT DATES",
        answer: [<Neet_ImportantDates/>],
    },
]







