import React from 'react'
import './MBAExploreexam.css'

import { Carousel } from 'react-responsive-carousel'
// import "react-responsive-carousel/lib/styles/carousel.min.css"
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Link } from 'react-router-dom'
import { MBAExploreexamData } from './MBAExploreexamData'


// This is the exam page code
// The data is taken by map function.
// The data from ExploreData.js, in this code if we want to change anything go to the ExploreData.js component.
const MBAExploreexams = () => {
    return (
        <div id='Exams'>
            {/* This perticular div was responsible for whole MBA Exams page. If you change anything using this classname then it will effect whole MBA Exam page */}
            <div className='mbaexplore-container container' id='Exams'>
                {/* Thi perticular div will contain only the MBA Exam page "heading tag" */}
                <div className='mbaexplore-contantText'>
                    <h1>EXPLORE EXAMS</h1>
                </div>
                {/* This perticular div will contains all the exams and also it will effect for the instagram posts which are implemented by the carousel */}
                <div className='mbaExams-container'>
                    {/* Here we are using mapping function to get the data from another file "MBAExploreexamData.js" */}
                    <div className='mbaexamsposters-container'>
                        {MBAExploreexamData.map((item, index) => {
                            return (
                                // This perticular div will contain the carousel where we have imported all the instagram posters regarding MBA exams
                                <div key={index} className={item.Examposter}>
                                    {/* Here we are using carousel to slide show of instagram poster automatically */}
                                    <Carousel  autoPlay infiniteLoop showIndicators={false} showThumbs={false} showArrows={false} showStatus={false} interval={2000} >
                                        <div><img src={item.IMGposter1} alt="" /></div>
                                        <div><img src={item.IMGposter2} alt="" /></div>
                                        <div><img src={item.IMGposter3} alt="" /></div>

                                    </Carousel>
                                    </div>
                             

                            )
                        })}
                    </div>

                    {/* Here we are using mapping function to get the data from another file "MBAExploreexamData.js". All the exam data was stored in that perticular file */}
                    <div className='mbaugcards-container'>
                        {MBAExploreexamData.map((item, index) => {
                            return (
                                // This perticular div will contain all the exams which are there in MBA. By using this classname it will effect for all the exams in this MBA page
                                <div key={index} className={item.cardContant}>

                                    <div className='mbacardFlex' >
                                        {/* This perticular div will effect for the exam title and hand image */}
                                        <div className='mbahand-div'>
                                            {/* Here we are using link tag to link these pages to that perticular "EXAM" page */}
                                            <Link to={item.examPage}>
                                                <h4>{item.Title}</h4>
                                            </Link>
                                            {/* Here we are using this div to have an hand image while hover on that perticular exam div */}
                                            <div className='mbahand' ><i class="fa-solid fa-hand-point-left"></i></div>

                                        </div>
                                        {/* This perticular div will effect for the OTS and OLVC  */}
                                        <div className='mbaCoursesTextIcons'>
                                            {/* Here we are using link tag to link these pages to that perticular "OTS" page */}
                                            <Link to={item.explore}><h5>{item.OnlineTestSeries}</h5></Link>
                                            {/* Here we are using link tag to link these pages to that perticular "OLVC" page */}
                                            <Link to={item.liveclasses}><h5>{item.OLVClasses}</h5></Link>
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
export default MBAExploreexams
