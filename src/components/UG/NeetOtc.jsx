import React from 'react'
import Header from './Header'
import Faq from './Faq'
import './JeeOts.css'
import logo from './logo2.jpg'
import { Link } from 'react-router-dom'
import Footer from './Footer'
import Examheader from './Examheader'


export const NeetOtc = () => {
  return (
  <>
     {/* import logo from './logo2.jpg' */}
     <Examheader/>


    <div class="otsh1">
            <h1>NEET - ONLINE TEST SERIES</h1>
         </div>


{/* NEET - ONLINE TEST SERIES */}
        <div className='jeesection'>
            <div className='jeediv'>
                <h2>NEET - ONLINE TEST SERIES - 2023 COURSE BROCHURE </h2>
                <a href=''>COURSE BROCHURE</a>
            </div>
            <div>
                <p>The National eligibility and entrance test is conducted every year by the national testing agency for admission to MBBS colleges in India.
                Preparing well and attempting the exam successfully is one of the greatest desires of MBBS aspirants. NEET Online Test Series provides the students with an opportunity to assess their learning and understanding of the subject before showcasing their prowess in the final examination. Our online test series makes your understanding stronger and helps you prepare better. We at eGRADTutor academy are offering 15 online tests and 5 previous year question papers as part of the NEET UG Challenger test series.</p>
            </div>
        </div>

{/* WHY ONLINE TEST SERIES? */}
        <div className='jeesection'>
            <h2>WHY ONLINE TEST SERIES?</h2>
            <div className='jeelist'>
            <ul>
                <li>Helps in enhancing the student's speed and accuracy of answering questions in the examination.</li>
                <li>Our online test series is crafted by academic experts with years of domain knowledge and experience.</li>
                <li>Practice with our NEET online test series to be aware of the hurdles that you might face while attempting the final examination.</li>
                <li>Practice with our NEET online test series to be aware of the hurdles that you might face while attempting the final examination.</li>
            </ul>
            </div>
        </div>

        {/* BUY ONLINE TEST SERIES */}
        <div className='jeesection'>
            <h2>BUY ONLINE TEST SERIES</h2>

            <div>
            <table className='jeeinsidetable'>
             <tr>   
             <th >S.NO</th>
             <th> TEST SERIES TYPE</th>
             <th>PRICE</th>
             <th>START DATE</th>
             <th>END DATE</th>
             <th>BUY NOW</th>
             </tr>
             <tr>
             <td>1</td>
             <td>Challenger Test Series (15 Tests)</td>
             <td>&#8377;2000 +<small>GST</small></td>
             <td>22-03-2023</td>
             <td>07-05-2023</td>
            <td><center><a href='https://online-ug.egradtutor.in/'>BUY NOW</a></center></td>
             </tr>
           </table>
            </div>
        </div>

        {/* NEET - ONLINE TEST SERIES SCHEDULE */}

        <div className='jeesection'>
            <h2 className='head'>NEET - ONLINE TEST SERIES SCHEDULE</h2>
            <a href="#" className='otsbroucher'>Challenger Test Series</a>
        </div>


        {/* FEATURES OF ONLINE TEST SERIES */}
        <div className='jeesection'>
            <h2>FEATURES OF ONLINE TEST SERIES</h2>
            <div className='jeelist'>
            <ul>
                <li>15 tests in the challenger test series</li>
                <li>All India rank will be given for each test.</li>
                <li>Developed as per the latest syllabus of NEET exam.</li>
                <li>Well explained and detailed solution for each question.</li>
                <li>Test series prepared by experts who are top faculty across India.</li>
                <li>We have designed NEET online test series that will provide you with in-depth coverage of the latest syllabus</li>
                <li>Same pattern and time limit as the actual NEET exam which acquaints students with the intricacies of the exam.</li>
            </ul>
            </div>
        </div>


    <Faq/>
    <Footer />
  </>
  )
}
