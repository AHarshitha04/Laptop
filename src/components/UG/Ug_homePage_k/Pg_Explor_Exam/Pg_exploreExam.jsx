import React from 'react'
import { Link } from 'react-router-dom'
import { Pg_ExploreData } from './Pg_Explore_Data.jsx'
import './pg_explor.css'

export const Pg_exploreExam = () => {
  return (
    <div className=' Pg_explore_Container'>
        <div className='Pg_explore-container Pg_Container' id='Exams'>
            <div className='Pg_explore-contantText'><h1>EXPLORE EXAMS</h1></div>

            <div className='Pg_cards-container'>
                {Pg_ExploreData.map((item,index) => {
                    return(
                        <div key={index} className={item.cardContant}>
                          
                                <div className='Pg_cardFlex' >
                                    {/* This is the image */}
                                  <div className='Pg_hand-div'>
                                 
                                   <Link className='Pg_Title_explor' to={item.examPage}><h4 >{item.Title}</h4><i className='uil uil-angle-right icon'></i></Link>
                                  <div className='hand' ><i class="fa-solid fa-hand-point-left"></i></div>

                                  </div>
                                  
                                    {/* <div className='cardImg'><img width={180} height={150} src={item.IMGuRL}alt='' /></div> */}
                                {/* This is the content */}
                                    <div className='Pg_CoursesTextIcons'>
                                       <Link className='Pg_olvs_ots_links' to={item.explore}><h5>{item.OnlineTestSeries} <i class="uil uil-angle-double-right"></i></h5></Link>
                                       <Link className='Pg_olvs_ots_links' to={item.liveclasses}><h5>{item.OLVClasses}<i class="uil uil-angle-double-right"></i></h5></Link>
                                        
                                        <h5>{item.ONLINE}</h5>
                                    </div>
                                </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}
