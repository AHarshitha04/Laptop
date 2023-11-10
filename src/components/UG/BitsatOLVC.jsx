import React from 'react'
import logo from './logo2.jpg'
import Faq from './Faq'
import { Link } from 'react-router-dom'

export const BitsatOLVC = () => {
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
                    <li><a href="https://online-ug.egradtutor.in/" className="login1" >Login/User Registration </a></li>
                </ul>           
                 <button id="open-menu-btn"><i className="uil uil-bars"></i></button>
                 <button id="close-menu-btn"><i className="uil uil-multiply"></i></button>
             </div>   
           </nav>


            <div className='otsh1'>
                <h1 className='iit-heading'>BITSAT CRASH COURSE - ONLINE LIVE VIDEO CLASSES SERIES</h1>
            </div>

{/* BITSAT CRASH COURSE - ONLINE LIVE VIDEO CLASSES FOR YEAR 2024 */}
            <div className='container content-container'>
                <h2 className='olvcheading'>BITSAT CRASH COURSE - ONLINE LIVE VIDEO CLASSES FOR YEAR 2024</h2>

                <p>Birla Institute of Technology and Science Admission Test (BITSAT) is an entrance exam conducted by the Birla Institute of Technology and Science (BITS), Pilani, for admissions to undergraduate engineering courses (BE) at its three campuses located at Pilani, Goa and Hyderabad. BITSAT success is mostly attributed to the foundation created for the student in XI and XII standards. During the last few days before examination, the foundation has to be strengthened by the experts. To resolve this, we at eGRADTutor with one of the top faculty from IIT/IISc, will give the best mode to each student to cover and prepare for the complete syllabus of Mathematics, Physics and Chemistry for the examination within 30- 40 days, through our daily BITSAT Crash Course Online Live Video Classes. These classes are designed perfectly to cater to teach the most important topics, which is more or less expected in the examination. This course comes with practice tests and daily assignment questions, which will be resolved in detail by the faculty in guidance sessions.
                English and General Aptitude classes will be conducted on Sundays, to cover the overall requirement for the examination.
                BITSAT Crash course will let students improve their confidence and channel their skills towards the desired success in just 30- 40 days.</p>
            </div>

{/* WHY ONLINE LIVE VIDEO CLASSES ? */}
            <div className='container content-container'>
            <h1 className='subheading'>WHY ONLINE LIVE VIDEO CLASSES?</h1>
                <ul className="text points ">
                        
                        <li className="text-li">Classroom just for you!! Anywhere, Anytime!</li>
                        <li className="text-li">Live online video classes encourage participation of students.</li>
                        <li className="text-li">Live online video classes allow interaction with students through chats and comments.</li>
                        <li className="text-li">Live interaction with expert faculty helps students to understand the areas of improvement.</li>
                        <li className="text-li">Helps students to understand complex information through immediate answers to questions.</li>
                    </ul>
            </div>


            {/* table */}

            <div style={{overflowY:'scroll'}} className='container content-container'>
            <table className='olvctable'>
        <tr>
          <th>COURSE</th>
          <td>ONLINE LIVE VIDEO CLASSES</td>
          </tr>
          <tr>
          <th>EXAM</th>
          <td>BITSAT 1 - YEAR COURSE – 2024</td>
          </tr>
       
          <tr>
            <th>SYLLABUS</th>
            <td>COMPLETE SYLLABUS FOR XI & XII</td>
          </tr>
          <tr>
            <th>ELIGIBILITY</th>
            <td>APPEARED/PASSED XI IN 2023/PASSED XII(LONG TERM)</td>
          </tr>
          <tr>
            <th>SUBJECTS</th>
            <td>
              MATHS  +  PHYSICS + CHEMISTRY + ENGLISH AND LOGICAL REASONING</td>
              </tr>
        <tr>
          <th>COURSE DURATION</th>
            <td>7 - 8 MONTHS</td>
            </tr>
            <tr>
                <th >MODE OF INSTRUCTIONS</th>
                <td>ENGLISH</td>
             </tr>
            <tr>
          <th>START DATE</th>
          <td>Batch-1: 01-06-2023 
              Batch-2: 01-07-2023</td>
          </tr>
          <tr>
          <th>END DATE</th>
          <td>COURSE VALID UNTIL BITSAT EXAM</td>
          </tr>
        
            <tr>
          <th >FEES</th>
          <td>45000/- + <small>GST</small> (TOTAL FEE CAN BE PAID IN <strong>2</strong> INSTALLMENTS) ONLY</td>
          </tr>
          <tr>
           <th>TIMINGS</th>
    
        <td>BATCH-1:  6:00 AM – 8:00AM 
            BATCH-2:  7:00 PM – 9:00PM </td>
         </tr>
        
         <tr>
            <td  colspan="2">
                <button>ENROLL NOW</button>
            </td>
         </tr>
    
     </table>
            </div>

            <Faq/>
  </>
  )
}
