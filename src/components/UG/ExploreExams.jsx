import React from 'react'
import { ExploreData } from './ExploreData'
import './Main.css'
import './ExploreExams.css'
import { Carousel } from 'react-responsive-carousel'
// import "react-responsive-carousel/lib/styles/carousel.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'


// This is the exam page code
// The data is taken by map function.
// The data from ExploreData.js, in this code if we want to change anything go to the ExploreData.js component.
const ExploreExams = () => {
    return (
        <div>
            <div className='explore-container container' id='Exams'>
                <div className='explore-contantText'><h1>EXPLORE EXAMS</h1></div>
                <div className='Exams-container'>
                <div className='examsposters-container'>
                    <div>
                        {ExploreData.map((item, index) => {
                            return (
                                <div key={index} className={item.Examposter}>
                                    <Carousel  autoPlay infiniteLoop showIndicators={false} showThumbs={false} showArrows={false} showStatus={false} interval={2000} >
                                        <div> <img src={item.IMGposter1} alt="" /></div>
                                        <div> <img src={item.IMGposter2} alt="" /></div>
                                        <div> <img src={item.IMGposter3} alt="" /></div>

                                    </Carousel>
                                </div>

                            )
                        })}
                    </div>


                </div>

                <div className='ugcards-container'>
                    {ExploreData.map((item, index) => {
                        return (
                            <div key={index} className={item.cardContant}>

                                <div className='cardFlex' >
                                    {/* This is the image */}
                                    <div className='hand-div'>

                                        <Link to={item.examPage}><h4>{item.Title}</h4></Link>
                                        <div className='hand' ><i class="fa-solid fa-hand-point-left"></i></div>

                                    </div>

                                    {/* <div className='cardImg'><img width={180} height={150} src={item.IMGuRL}alt='' /></div> */}
                                    {/* This is the content */}
                                    <div className='CoursesTextIcons'>
                                        <Link to={item.explore}><h5>{item.OnlineTestSeries} <i class="fa-solid fa-file-lines"></i></h5></Link>
                                        <Link to={item.liveclasses}><h5>{item.OLVClasses}<i class="fa-solid fa-tv"></i></h5></Link>

                                        <h5>{item.ONLINE}</h5>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
                </div>
            </div>
        </div>
    )
}
export default ExploreExams
