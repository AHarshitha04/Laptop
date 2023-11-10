import React from 'react'
import {HashLink} from 'react-router-hash-link'
 import { AiFillFacebook, AiFillInstagram, AiFillYoutube, AiFillLinkedin } from "react-icons/ai"
import logo from './logo.png';
import './Footer.css';
export const Footer = () => {
  return (
    <>
     <footer>
                <div className="footer-container">
                    <div className="col-1">

                    <div className='foot-logo '>
                      <img src={logo}  alt=''/></div>
                     <p>eGRADTutor (a brand of eGATETutor Academy) started with a team of graduates from IIT/IISc.We are experts in training students for UG, PG And MBA entrance examinations.</p>
                    </div>

                    <div className="col-2">   
                    <h6> <ins>Permalinks</ins></h6>
                    <div className='fot-navlist'>
                    <HashLink to={'/#home'}>  Home </HashLink>
                    <HashLink to={'/#about'}>  About</HashLink>
                    <HashLink to={'/#exams'}>  Exams </HashLink>
                    <HashLink to={'/#courses'}>  Courses </HashLink>            
                    <HashLink to={'/#contactus'}>  ContactUs </HashLink>
                    </div>
                    </div>

                    <div className="col-3">
                    <h6><ins>Privacy</ins></h6>
                     <div className='fot-navlist'>
                     <HashLink to={"/"}>Privacy Policy</HashLink>
                     <HashLink to={"/"}>Terms and conditions</HashLink>
                     <HashLink to={"/"}>Refund Policy</HashLink>
                    </div>
                    </div>

            <div className="col-4">
            <h6><ins>Contact Us</ins></h6>
           <div className='fot-navlist1'>
            <p>H.NO-2-2-1132/10/C, R.K Nivas,2nd Floor, Opposite Bakers Q,Shivam Road, New Nallakunta, Hyderabad-44.</p>
            <p> <i class="fa-sharp fa-solid fa-phone-volume"> </i>+91-7993270532 </p>
            <p> <i class="fa-solid fa-envelope"> </i>info@egradtutor.in</p>
            <div className='fot-icons'>
            <i  className='fa1' class="fa-brands fa-facebook"></i>
            <i class="fa-brands fa-square-instagram"></i>
            <i class="fa-brands fa-youtube"></i>
            <i class="fa-brands fa-telegram"></i>
            <i class="fa-brands fa-linkedin"></i>
            </div>


      
            </div>
            </div>
            </div>
    
                   
            <div className="copy">
            <p><i class="fa-solid fa-paper-plane"></i> Copyright © 2023 eGRADTutor All rights reserved</p>
            </div>


            </footer>

        </>
    )
}

export default Footer
 