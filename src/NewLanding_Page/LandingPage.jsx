import React from 'react'
import logo from './egradtutor_logo.png'
import './LandingPage.css'
import logo1 from './landingpagelogo-removebg-preview.png'

const LandingPage = () => {
    return (
        <div className='landingpage'>
            <div className='landingpage_header'>
                <div className='landingpage_logo'>
                    <img src={logo} alt="" />
                </div>
                <div className='landingpage_publications'>
                    <a href="/">eGRADTutor Publications</a>
                </div>
            </div>


            <div className='landingpage_div'>
                <div className='landingpage_section'>
                    <div className='landingsection_img'>
                        <img src={logo1} alt="" />
                    </div>

                    <div className='landingsection_content'>
                        <h2>Welcome to eGRADTutor</h2>
                        {/* <p>eGRADTutor is an Edtech firm started with a vision to blend the boundaries in education and take best-in-class courses and teachers virtually to every corner of the country. Our courses are developed by the alumni of IIT/IISc with an intent to enhance the student's abilities to face some of the toughest exams of the country. Our offerings not just provide a deeper understanding of the subjects to the students, but they also make them exam ready.</p> */}
                        <p>...tutors by grads from IIT's/IISc</p>
                    </div>
                </div>
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
                <br />
            </div>

            <div className='coursecards'>
                <div className='landingpage_coursecards'>
                    <div className='coursecard'>
                        <ul>
                            <h3>UG</h3>
                            <li>IIT-JEE</li>
                            <li>NEET</li>
                            <li>BITSAT</li>
                            <li>VITEEE</li>
                            <li>&OTHER ENTRANCE EXAMS</li>
                        </ul>
                    </div>

                    <div className='coursecard'>
                        <ul>
                            <h3>PG</h3>
                            <li>GATE</li>
                            <li>IIT-JAM</li>
                            <li>ESE</li>
                            <li>ISRO</li>
                            <li>&OTHER ENTRANCE EXAMS</li>
                        </ul>
                    </div>
                </div>
            </div>


            <div className='landingpage_footer'>
                <div className='landingpage_footer_icons'>
                    <i className='fa-brands fa-facebook icon'></i>
                    <i className='fa-brands fa-instagram icon'></i>
                    <i className='fa-brands fa-linkedin icon'></i>
                    <i className='fa-brands fa-youtube icon'></i>
                </div>
                <div className=' footer-linkss' style={{ textAlign: 'center', borderTop: '1px solid #fff', paddingTop: '10px', paddingBottom: '10px', color: '#fff' }}> <p style={{ margin: '0 auto' }}>Copyright © 2023 eGradTutor All rights reserved</p>
                </div>
            </div>
        </div>
    )
}

export default LandingPage