// src/App.js
import React from 'react';
import './ph_header.css'
import { Carousel } from 'react-responsive-carousel';
import welcom from './images/welcome.png'
import bg from './images/bg3.png'
import tifr from './images/Banners/TIFR-banner.jpg'
import silde1 from './images/Banners/side11.png'
import Marquee from "react-fast-marquee";


const Pg_header = () => {


  return (
    <div id='home'>

      <div className='marquee_Pg'>
        <Marquee pauseOnHover={true}>
          <div>
            <div className="marquee_PgUp">
              <span className="fast-flicker">U</span>pdate<span className="flicker">e</span>
            </div>
          </div>
          All tests will be LIVE according to the detailed schedule given. Do not confuse to the Total No. of tests in the test cards while buying as they show the number of tests LIVE at the moment..
        </Marquee>
      </div>



      <Carousel className=''  infiniteLoop showIndicators={false} showThumbs={false} showArrows={false} showStatus={false} interval={2000} >

        <div className="boxShadow_pg box_Shadow_pg ">
          <img src={silde1} alt="" />
        </div>

        <div className='box_Shadow_pg'>
          <img src={tifr} alt="" />
        </div>

      </Carousel>
    </div>
  );
};

export default Pg_header;