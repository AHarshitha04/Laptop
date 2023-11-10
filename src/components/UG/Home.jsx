import React from 'react'
import {Link} from "react-router-dom"
import { Carousel } from "react-responsive-carousel"
// import "react-responsive-carousel/lib/styles/carousel.min.css"
import './home.css'
import Header from './Header'
import './header.css'
import { About } from './About'
import Contactus  from './Contactus'
import Faq from  './Faq'
import { Footer } from './Footer'
import Course from './Course'
import ExploreExams from './ExploreExams'
import banner1 from './Ugbanners/Ugbanners/AP_EAPCET.png'
import banner2 from './Ugbanners/Ugbanners/BITSTA.png'
import banner3 from './Ugbanners/Ugbanners/IIT-JEE.png'
import banner4 from './Ugbanners/Ugbanners/MHTCET.png'
import banner5 from './Ugbanners/Ugbanners/NEET2.png'
import banner6 from './Ugbanners/Ugbanners/TS_EMCET.png'
import banner7 from './Ugbanners/Ugbanners/VITEEE.png'
import banner8 from './Ugbanners/Ugbanners/WBJEE.png'

const Home = () => {
  return (
<>
<Header/>
   
   <div>
   <marquee  direction="left" scrollamount="5" onmouseover="this.stop()" onmouseleave="this.start()">
                    <div>All tests will be LIVE according to the detailed schedule given. Do not
                        confuse to the Total No. of tests in the test cards while buying as they show the number of
                        tests LIVE at the moment..</div>
</marquee>
   </div>


<div id='home'></div>

    <div  className='corouselContent' style={{padding:'1rem'}}>
    <Carousel  className='banner' autoPlay infiniteLoop showIndicators={false} showThumbs={false} showArrows={false} showStatus={false} interval={2000} >
        <div className='banner1 container'>
            <div className='banner1-info'>
                <div className='banner1-info-heading'>
                    <h1>Welcome eGRADTutor</h1>
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
    
    
       <div> <img src={banner1} alt="" /></div>
       <div> <img src={banner2} alt="" /></div>
       <div> <img src={banner3} alt="" /></div>
       <div> <img src={banner4} alt="" /></div>

       <div> <img src={banner5} alt="" /></div>
       <div> <img src={banner6} alt="" /></div>
       <div> <img src={banner7} alt="" /></div>
       <div> <img src={banner8} alt="" /></div>
    
    </Carousel>

{/* <Ug_home_carousel/> */}

    
    </div>


    <About/>
    
    <ExploreExams/>
    <Course/>


<Contactus/>

<Faq/>
<Carousel>


</Carousel>

    </>
  )
}

export default Home