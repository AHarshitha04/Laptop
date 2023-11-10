import React from 'react'
import {Link} from "react-router-dom"

import '../../UG/header.css'

// import { ExploreExams } from '../UG/ExploreExams'

import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Header from '../../UG/Header'

import { PgCourse } from '../PgCourse'
import Contactus from '../../UG/Contactus'
import Faq from '../../UG/Faq'
import Footer from '../../UG/Footer'
import { Pg_About } from './Pg_About/Pg_About'
import { Pg_exploreExam } from './Pg_Explor_Exam/Pg_exploreExam'
import { Pg_Course } from './Pg_ouercourses/Pg_Course'
import Pg_header from './Pg_Header/Pg_header'
import { Pg_Countact } from './Pg_Countact_Page/Pg_Countact'
import { Pg_Fax } from './Pg_Faq/Pg_Fax'
import { Pg_explorSider } from './Pg_Explore_slider/Pg_explorSider'



export const Pg_home_page = () => {
  return (
   
<>
<div id='PgHome'></div>
<Header/>


<Pg_header/>
{/* <Carousel className='banner' autoPlay infiniteLoop interval={3000} >
        <div className='banner1'>
            <div className='banner1-info'>
                <div className='banner1-info-heading'>
                    <h1>welcome eGRADTutor</h1>
                    <p>eGRADTutor is an Edtech firm started with a vision to blend the boundaries in education and take
                        best-in-class courses and teachers virtually to every corner of the country. Our courses are
                        developed by the alumni of IIT/IISc with an intent to enhance the student's abilities to face some
                        of the toughest exams of the country. Our offerings not just provide a deeper understanding of the
                        subjects to the students, but they also make them exam ready. </p>
                </div>
                <div className='online-btn'>
                    <button>
                        <Link to={"/"}>Online Live classes</Link>
                    </button>
    
                    <button>
                        <Link to={"/"}>Online Live video classes</Link>
                    </button>
                </div>
    
            </div>
    
        </div>
    
    
        <div className='banner2'></div>
        <div className='banner3'></div>
        <div className='banner4'></div>
        <div className='banner5'></div>
        <div className='banner6'></div>
        <div className='banner7'></div>
    
    </Carousel> */}
    
 
    <Pg_About />


    {/* <About/> */}
    {/* < PGexploreExam/> */}
    <Pg_exploreExam/>
    <br />
    <Pg_explorSider/>

{/* <Pg_explorSider/> */}

  
    {/* <ExploreExams/> */}

 {/* <PgCourse/> */}
<Pg_Course/>
{/* 
<Contactus/> */}
<Pg_Countact/>


{/* <Faq/> */}

<Pg_Fax/>
{/* <Footer/> */}

    </>
  )
}
