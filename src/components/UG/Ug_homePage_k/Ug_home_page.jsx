import React from 'react'
import {Link} from "react-router-dom"



// import { ExploreExams } from '../UG/ExploreExams'

import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Header from '../Header'

import { PgCourse } from '../PgCourse'
import Contactus from '../Contactus'
import Faq from '../Faq'
import Footer from '../Footer'
import { Pg_About, Ug_About } from './Ug_About/Ug_About'
import { Pg_exploreExam } from './Pg_Explor_Exam/Pg_exploreExam'
import { Pg_Course } from './Pg_ouercourses/Pg_Course'
import Pg_header from './Pg_Header/Pg_header'
import { Pg_Countact } from './Pg_Countact_Page/Pg_Countact'
import { Pg_Fax } from './Pg_Faq/Pg_Fax'


export const Ug_home_page = () => {
  return (
   
<>
<Header/>
{/* <div id='PgHome'></div> */}

{/* <Pg_header/> */}

    <Ug_About/>

    {/* <About/> */}
    {/* < PGexploreExam/> */}
    {/* <Pg_exploreExam/> */}
    

{/* <Pg_explorSider/> */}
  
    {/* <ExploreExams/> */}

 {/* <PgCourse/> */}
{/* <Pg_Course/> */}
{/* 
<Contactus/> */}
{/* <Pg_Countact/> */}


{/* <Faq/> */}

{/* <Pg_Fax/> */}
{/* <Footer/> */}

    </>
  )
}
