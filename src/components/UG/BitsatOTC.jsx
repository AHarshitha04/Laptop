import React from 'react'
import Faq from './Faq'
import logo from './logo2.jpg'
import { Link } from 'react-router-dom'
import './IITJEE_OLVCStyles.css'
import Footer from './Footer'
import Examheader from './Examheader'


export const BitsatOTC = () => {
  return (
    <>
      {/* import logo from './logo2.jpg' */}
      <Examheader/>

      {/* BITSAT - ONLINE TEST SERIES */}
      <div className='otsh1'>
        <h1>BITSAT - ONLINE TEST SERIES</h1>
      </div>
      <div className='jeesection'>
        <div className='jeediv'>
          <h2 >BITSAT - ONLINE TEST SERIES - 2023 COURSE BROCHURE </h2>
          <a href=''>COURSE BROCHURE</a>
        </div>

        <p>BITSAT stands for Birla Institute of Technology and Science Admission Test. It is an online exam which is conducted for the students to take admission into B.E., B. Pharm and M.Sc. programmes offered at its three campuses located at Pilani, Goa and Hyderabad.
          Preparing well and attempting the exam successfully is one of the greatest desires aspirants. BITSAT Online Test Series provides an opportunity to the students to assess their level of learning and understanding of the subject before showcasing their prowess in the main entrance examination. Our online test series makes your understanding stronger and helps you to challenge yourself in an environment that resembles the final examination. We at eGRADTutor academy are offering previous year question papers and online tests series. The online test series interface is similar to the actual exam interface and it helps the student to strategize and approach the examination.</p>
      </div>


      {/* WHY ONLINE TEST SERIES? */}
      <div className='jeesection'>
        <h2>WHY ONLINE TEST SERIES?</h2>
        <ul>
          <li>By taking BITSAT online tests series, candidates get familiar with the test-taking environment.</li>
          <li>BITSAT online test series is crafted by academic experts with years of domain knowledge and experience</li>
          <li>You will be receiving an in-depth analysis post your test that will help you understand your strong/weak areas.</li>
          <li>With the help of online test series, candidates are able to enhance their speed and accuracy of answering questions in the examination.</li>
          <li>BITSAT online test series lets you have a real-time exam experience. You can learn to manage your time better, attempt questions with accuracy and precision.  </li>
        </ul>
      </div>

      {/* BUY ONLINE TEST SERIES */}
      <div className='jeesection jeetable'>
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
              <td>&#8377;2500 +<small>GST</small></td>
              <td>10-04-2023</td>
              <td>22-06-2023</td>
              <td><center><a href='https://online-ug.egradtutor.in/'>BUY NOW</a></center></td>
            </tr>
          </table>
        </div>
      </div>

      {/* NEET - ONLINE TEST SERIES SCHEDULE */}

      <div className='jeesection'>
        <h2 className='bitsatheading'>BITSAT - ONLINE TEST SERIES SCHEDULE</h2>
        <a className='otsbroucher' href="#">BITSAT - ONLINE TEST SERIES SCHEDULE</a>
      </div>


      {/* FEATURES OF ONLINE TEST SERIES */}
      <div className='jeesection'>
        <h2>FEATURES OF ONLINE TEST SERIES</h2>
        <ul>
          <li>All India rank will be given for each test.</li>
          <li>10 papers as a part of the challenger test series</li>
          <li>Developed as per the latest syllabus of BITSAT exam.</li>
          <li>Additional 5 Previous year question papers for practice</li>
          <li>Well explained and detailed answers for every question.</li>
          <li>All the tests are active till the BITSAT - 2023 examination.</li>
          <li>Test series prepared by experts who are top faculty across India.</li>
          <li>We have designed BITSAT online test series that will provide you with in-depth coverage of the latest syllabus.</li>
          <li>Our BITSAT online test interface is similar to that of the final exam, and it helps students assess their preparation.</li>
          <li>Same pattern and time limit as the actual BITSAT exam which acquaints students with the intricacies of the exam.</li>
        </ul>
      </div>


      <Faq />
      <Footer />
    </>
  )
}
