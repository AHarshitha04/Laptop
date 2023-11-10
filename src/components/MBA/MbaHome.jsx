import React from 'react'
import { Carousel } from "react-responsive-carousel"
import "react-responsive-carousel/lib/styles/carousel.min.css"
import Header from '../UG/Header'
import '../UG/header.css'
import '../UG/home.css'
import MbaAbout from './MBAAboutPage/MbaAbout'
import MBAExploreexams from './exams/MBAExploreexams'
import MbaCourse from './MBACoursePage/MbaCourse'
import MbaContactUs from './MBAContactPage/MbaContactUs'
import MbaFaqs from './MbaFaqsPage/MbaFaqs'
import banner1 from './images/banner1.png'
import banner from './images/MBA_banner.png'

export const MbaHome = () => {
        return (
                // This div was reponsible with the total MBA Home page
                <div id='home'>
                        <>
                                <Header />
                                <div id='MbaHome home'></div>
                                {/* Here we have used this marquee tag to scroll the updated news above the banner section */}
                                <marquee behavior="" direction="">
                                        <p>All tests will be LIVE according to the detailed schedule given. Do not confuse to the Total No. of tests in the test cards while buying as they show the number of tests LIVE at the moment..</p>
                                </marquee>
                                {/* Here we have used the carousel for the banners */}
                                <Carousel className='banner' autoPlay infiniteLoop showIndicators={false} showThumbs={false} showArrows={false} showStatus={false} interval={2000} >
                                        {/* Here we are using separete divs for the separate banners */}
                                        <div className='bannerq1'>
                                                <img src={banner} alt="" />
                                        </div>
                                        <div className='banner2'>
                                                <img src={banner1} alt="" />
                                        </div>

                                </Carousel>

                                <MbaAbout />
                                <MBAExploreexams />
                                <MbaCourse />
                                <MbaContactUs />
                                <MbaFaqs />
                        </>
                </div>
        )
}
