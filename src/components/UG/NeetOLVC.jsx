import React from 'react'

import logo from './logo2.jpg'
import Faq from './Faq'
import neetposter from './posters/NEET_POSTER.png'
import { Link } from 'react-router-dom'


export const NeetOLVC = () => {
  return (
   <>
    {/* import logo from './logo2.jpg' */}
    <nav>
             <div className="container nav__container">          
                <div className="pic">
                    <a href="/"><img src={logo} alt=""/></a>
                </div>    
                <ul className="nav__menu">
                    <li><Link to='/home'>Home</Link>   </li>
                    <li><a href="https://online-ug.egradtutor.in/" target='_blank' className="login1" >Login/User Registration </a></li>
                </ul>           
                 <button id="open-menu-btn"><i className="uil uil-bars"></i></button>
                 <button id="close-menu-btn"><i className="uil uil-multiply"></i></button>
             </div>   
           </nav> 
            <div className="otsh1">
                <h1 className='iit-heading'>NEET - ONLINE LIVE VIDEO CLASSES</h1>
            </div>

            <section className="contents">
                <div className="container content-container">
                    <h1 className='subheading'>NEET - ONLINE LIVE VIDEO CLASSES FOR YEAR 2024</h1>
                    <br />
                    <ul className="jee-olvc-kchanges text points">
                        <li className="text-li">Top faculty from IIT/IISc and IISER at eGRADTutor, through this course will cover the complete syllabus of XI and XII (P+C) in 5 to 6 months.</li>
                        <li className="text-li">This course comes with practice tests and challenger questions, which will be discussed in detail by the faculty in guidance sessions.</li>
                        <li className="text-li">This course comes with practice tests and challenger questions, which will be discussed in detail by the faculty in guidance sessions.</li>
                        <li className="text-li">Through evaluation sessions, on 4th Saturday every month, student can know about key areas of improvement.</li>
                        <li >These classes are designed perfectly to cater each and every student to learn, practice and perform.</li>
                    </ul>

                    <br />
                    <h1 className='subheading'>WHY ONLINE LIVE VIDEO CLASSES?</h1>
                    <ul className="text points ">

                        <li className="text-li">Classroom just for you!! Anywhere, Anytime!</li>
                        <li className="text-li">Live online video classes encourage participation of students.</li>
                        <li className="text-li">Live online video classes allow interaction with students through chats and comments.</li>
                        <li className="text-li">Live interaction with expert faculty helps students to understand the areas of improvement.</li>
                        <li className="text-li">Helps students to understand complex information through immediate answers to questions.</li>
                    </ul>

                    <div className="jee_updatedTable ">
                        <h1 className='subheading buyolvc'>BUY ONLINE LIVE VIDEO CLASSES</h1>

                        <table className='olvctable'>
                            <tr>
                                <th>S.NO</th>
                                <th>BATCHES</th>
                                <th>TIMINGS</th>
                                <th>CLASS SCHEDULE</th>
                                <th>COURSE DATE</th>
                                <th>COURSE FEE</th>
                            </tr>

                            <tr>
                                <td>1</td>
                                <td>MORNING</td>
                                <td>7:00AM to 8:00AM</td>
                                <td>

                                    <b>PHYSICS</b><br />
                                    (MONDAY-WEDNESDAY-FRIDAY) <br />
                                    <b>CHEMISTRY</b><br />
                                    (TUESDAY-THURSDAY-SATURDAY)
                                </td>
                                <td>SESSION-1 <br />SEP 4<sup>th</sup> 2023 <br /> <br />SESSION-2 <br /> SEP 11<sup>th</sup> 2023</td>
                                <td className="MODE-OF-INSTRUCTIONS"><span ><b> 35000/-</b></span> <br /> ( M + P + C ) <br /> * Students can also register for individual subjects <br /> with course fee 20000/- per subject.</td>
                            </tr>


                            <tr>
                                <td>2</td>
                                <td>EVENING</td>
                                <td>7:00PM to 8:00PM</td>
                                <td>
                                    <b>PHYSICS</b><br />
                                    7:00PM to 8:00PM <br />
                                    <b>CHEMISTRY</b><br />
                                    (MONDAY-WEDNESDAY-FRIDAY)
                                </td>
                                <td>SESSION-1 <br /> SEP 4<sup>th</sup> 2023 <br /> <br />SESSION-2 <br />SEP 11<sup>th</sup> 2023</td>
                                <td className="MODE-OF-INSTRUCTIONS"> <span > <b> 35000/-</b> </span> <br />( M + P + C ) <br /> * Students can also register for individual subjects <br /> with course fee 20000/- per subject.</td>
                            </tr>
                            <tr>
                                <td className="MODE-OF-INSTRUCTIONS">MODE OF INSTRUCTIONS</td>
                                <td colSpan="5">WE TEACH ALL OUR COURSES ONLINE VIA MICROSOFT TEAMS - WORK OR SCHOOL ACCOUNT</td>
                            </tr>

                        </table>
                    </div>
                </div>
                <br />
            </section>

<div className='brocher container'> 
   <a className="olvcbroucher" href={neetposter}>Online Live Video Classes flyer - NEET</a>

            </div>
            <section className="contents">
                <div className=" content-container">

                    <div className="menu_buttons2">
                        <div className="buttons-with-video">

                            <div className="button-conta">



                            </div>
                        </div>
                    </div>

                </div>
            </section><br />

            <section className="contents">
                <div className="container content-container">
                    <h1 className='subheading'>FEATURES OF ONLINE LIVE VIDEO CLASSES</h1>
                    <ul className="text">
                        <li className="text-li">Study and Practice daily 1 hour to crack NEET - 2024</li>
                        <li className="text-li">Study and Practice daily 1 hour to crack NEET - 2024</li>

                        <li className="text-li">Learn shortcuts and multiple approaches to problem solving.</li>

                        <li className="text-li">Develop time management and planning skills while preparing.</li>
                        <li className="text-li">Develop time management and planning skills while preparing.</li>

                        <li className="text-li">Entire course of XI and XII (P+C) will be taught in 5 to 6 months.</li>

                    </ul>
                </div>
            </section>
            <Faq />
        </>
    )
}
