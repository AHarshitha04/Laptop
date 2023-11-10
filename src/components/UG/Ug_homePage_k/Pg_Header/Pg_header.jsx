// src/App.js
import React from 'react';
import './ph_header.css'
import { Carousel } from 'react-responsive-carousel';
import welcom from './images/welcome.png'
import bg from './images/bg3.png'
import tifr from './images/Banners/TIFR-banner.jpg'
import silde1 from './images/Banners/side11.png'



const Pg_header = () => {


  return (
    <div>
    <Carousel className='' autoPlay  infiniteLoop showIndicators={false} showThumbs={false} showArrows={false} showStatus={false} interval={2000} >
       <div className="boxShadow_pg ">
       {/* <div className='Pg_header_bg '> 
         <div className="Pg_header_content ">
          <div className="Pg_welcomePage">
           <img src={welcom} width={9} alt="" />  
           <h1 style={{color:'rgb(1 44 89)',paddingTop:'35px'}}> to eGRADTutor</h1> 
          </div>
            <p>eGRADTutor is an Edtech firm started with a vision to blend the boundaries in education and take best-in-class courses and teachers virtually to every corner of the country. Our courses are developed by the alumni of IIT/IISc with an intent to enhance the student's abilities to face some of the toughest exams of the country. Our offerings not just provide a deeper understanding of the subjects to the students, but they also make them exam ready.</p>
         
         </div>

        <div className='Pg_nextImg'> <img src={bg} alt="" />  </div>

        </div> */}
        <img src={silde1} alt="" />
       </div>
    
    
        <div className=''><img src={tifr} alt="" /></div>
        {/* <div className=''></div>
        <div className=''></div>
        <div className=''></div>
        <div className=''></div>
        <div className=''></div> */}
    
    </Carousel>
    </div>
  );
};

export default Pg_header;