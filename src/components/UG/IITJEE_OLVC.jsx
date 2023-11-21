import React from 'react'
import './IITJEE_OLVCStyles.css'
import logo from './Images/logo2.jpeg'
import Faq from './Faq'
import { Link } from 'react-router-dom'
import jeeposter from './posters/jee_poster_2023-9-1.pdf'
import Footer from './Footer'
import Examheader from './Examheader'


const IITJEE_OLVC = () => {
  return (
  <>
    {/* import logo from './logo2.jpg' */}
    <Examheader/>
 
            <div className="otsh1">
                <h1 className='iit-heading'>IITJEE ONLINE LIVE VIDEO CLASSES</h1>
            </div>

            <section className="contents">
                <div className="container content-container uG_iit_CONTAINER">
                    <h1 className='subheading'>IIT-JEE Mains & Advanced ONLINE LIVE VIDEO CLASSES FOR YEAR 2024</h1>
                    <br />
                    <ul className="jee-olvc-kchanges text points">
                        
                        <li className="text-li">Students can also use this course for preparation of other engineering exams.</li>
                        <li className="text-li">These classes are designed perfectly to cater each and every student to learn, practice and perform. </li>
                        <li className="text-li">Top faculty from IIT/IISc at eGRADTutor, through this course will cover the complete syllabus of XI and XII MPC in 4 to 5 months.</li>
                        <li className="text-li">This course comes with practice tests and challenger questions, which will be discussed in detail by the faculty in guidance sessions.</li>
                        <li className="text-li">4 to 5 months of continuous classes and practice through Sunday test sessions, will improve students  confidence and lead them to success.</li>

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
                                <td>5:00AM to 7:00AM</td>
                                <td>
                                    5:00AM to 6:00AM <br />
                                    <b>MATHEMATICS</b><br />
                                    (THESDAY-SATURDAY)
                                    {/* <div style="width: 100%;height: 1px; background: #a19494;"></div> */}
                                    6:00AM to 7:00AM <br />
                                    <b>PHYSICS</b><br />
                                    (MONDAY-WEDNESDAY) <br />
                                    <b>CHEMISTRY</b><br />
                                    (THURSDAY-SATURDAY)
                                </td>
                                <td>SESSION-1 <br />SEP 4<sup>th</sup> 2023 <br /> <br />SESSION-2 <br /> SEP 11<sup>th</sup> 2023</td>
                                <td className="MODE-OF-INSTRUCTIONS"><span ><b> 50000/-</b></span> <br /> ( M + P + C ) <br /> * Students can also register for individual subjects <br /> with course fee 25000/- per subject.</td>
                            </tr>


                            <tr>
                                <td>2</td>
                                <td>EVENING</td>
                                <td>6:00PM to 7:00PM <br /> 8:00PM to 9:00PM</td>
                                <td>
                                    6:00PM to 7:00PM <br />
                                    <b>MATHEMATICS</b><br />
                                    (MONDAY-FRIDAY)
                                    {/* <div style="width: 100%;height: 1px; background: #a19494;"></div> */}
                                    8:00PM to 9:00PM <br />
                                    <b>PHYSICS</b><br />
                                    (MONDAY-WEDNESDAY) <br />
                                    <b>CHEMISTRY</b><br />
                                    (THURSDAY-SATURDAY)
                                </td>
                                <td>SESSION-1 <br /> SEP 4<sup>th</sup> 2023 <br /> <br />SESSION-2 <br />SEP 11<sup>th</sup> 2023</td>
                                <td className="MODE-OF-INSTRUCTIONS"> <span > <b> 50000/-</b> </span> <br />( M + P + C ) <br /> * Students can also register for individual subjects <br /> with course fee 25000/- per subject.</td>
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
   <a className="olvcbroucher" href={jeeposter}>Online Live Video Classes brouchure (IIT-JEE Mains & Advanced)</a>

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
                        <li className="text-li">Study and Practice daily to crack JEE Mains & other exams.</li>
                        <li className="text-li">Entire course XI and XII MPC will be taught in 4 to 5 months.</li>

                        <li className="text-li">Learn shortcuts and multiple approaches to problem solving.</li>

                        <li className="text-li">For Xll appearing/passed students along with NCERT learning.</li>
                        <li className="text-li">Instant doubt clarification and practice sessions for JEE Mains.</li>

                        <li className="text-li">Develop time management and planning skills during preparation.</li>
                        <li className="text-li">Crack all engineering entrance exams besides your JEE preparation.</li>

                    </ul>
                </div>
            </section>
            <Faq />
            <Footer />
        </>
    )
}


export default IITJEE_OLVC