import React from 'react'
import {Link} from "react-router-dom"

import Faq from '../UG/Faq'
import Contactus from '../UG/Contactus'
// import { ExploreExams } from '../UG/ExploreExams'
import Course from '../UG/Course'
import { About } from '../UG/About'
import Header from '../UG/Header'
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import {PGexploreExam} from './PGexploreExam'
import {PgCourse} from './PgCourse'

export const PgHome = () => {
  return (
    <div>

<>
<Header/>
<div id='PgHome'></div>
<Carousel className='banner' autoPlay infiniteLoop interval={3000} >
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
    
    </Carousel>

    <About/>
    < PGexploreExam/>

  
    {/* <ExploreExams/> */}

 <PgCourse/>
<Contactus/>

<Faq/>


    </>


    </div>
  )
}
