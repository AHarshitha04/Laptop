import React from 'react'
import { Link } from 'react-router-dom'
import logo from '../../logo2.jpeg'
import pdf from './IITJEE.pdf'
import Faq from '../../../Faq'

import './jee_ots.css'

export const Jee_ots = () => {
    return (
        <div>
            {/* import logo from './logo2.jpg' */}
            <nav>
                <div className="container nav__container">
                    <div className="pic">
                        <a href="/"><img src={logo} alt="" /></a>
                    </div>
                    <ul className="nav__menu">
                        <li><Link to='/home'>Home</Link>   </li>
                        <li><a href="https://online-ug.egradtutor.in/" target='_blank' className="login1" >Login/User Registration </a></li>
                    </ul>
                    <button id="open-menu-btn"><i className="uil uil-bars"></i></button>
                    <button id="close-menu-btn"><i className="uil uil-multiply"></i></button>
                </div>
            </nav>


            {/* IIT - JEE - ONLINE TEST SERIES */}
            <div class="otsh1">
                <h1>IIT - JEE - ONLINE TEST SERIES</h1>
            </div>

            <div className='jeesection'>
                <div className='jeediv'>
                    <h2>IIT-JEE-(MAINS & ADVANCED) - ONLINE TEST SERIES - 2023</h2>
                    <a href={pdf}>COURSE BROUCHER</a>
                </div>
                <p>Preparing well for the exam and attempting the exam successfully is one of the greatest desires for all the students. Many students will not be able to attempt IIT-JEE on the examination day as they do not have the right resources and proper guidance for the preparation. Our online test series makes your understanding stronger and helps you to challenge yourself in an environment that resembles the final examination. Challenger test series - as the name suggest, challenges the students’ abilities to attain the best by answering the toughest questions. With our online test series, channel your skills towards the desired success.</p>
            </div>

            {/* WHY ONLINE TEST SERIES? */}
            <div className='jeesection'>
                <h2>WHY ONLINE TEST SERIES?</h2>
                <div className='jeelist'>
                    <ul>
                        <li>It will help in improving paper solving speed.</li>
                        <li>Our performance analysis helps you understand the areas of improvement.</li>
                        <li>Our performance analysis helps you understand the areas of improvement.</li>
                        <li>Appearing in these tests will improve the overall preparation and will increase the chances of getting a good score.</li>
                        <li>Our online test series helps you know your understanding of the subject so that you can put efforts in the right direction.</li>
                    </ul>
                </div>
            </div>

            {/* BUY ONLINE TEST SERIES */}
            <div className='jeesection jeetable'>
                <h2>BUY ONLINE TEST SERIES</h2>

                <table className='jee_insidetable jeeinsidetable'>
                    <tr>
                        <th >S.NO</th>
                        <th> TEST SERIES TYPE</th>
                        <th>PRICE</th>
                        <th>START DATE</th>
                        <th>END DATE</th>
                        <th>ENROLL NOW</th>
                    </tr>
                    <tr>
                        <td>1</td>
                        <td>Complete Test Series(JEE Mains+Advanced)  + Challenger Test Series (Advanced)</td>
                        <td>&#8377;5000 + <small>GST</small></td>
                        <td>22-03-2023</td>
                        <td>31-07-2023</td>
                        <td><center><a href='https://online-ug.egradtutor.in/' target='_blank'>BUY NOW</a></center></td>
                    </tr>

                    <tr>
                        <td>2</td>
                        <td>Challenger Test Series (JEE Advanced)</td>
                        <td>&#8377;2000 + <small>GST</small></td>
                        <td>20-04-2023</td>
                        <td>31-07-2023</td>
                        <td><center><a href='https://online-ug.egradtutor.in/' target='_blank'>BUY NOW</a></center></td>
                    </tr>

                    <tr>
                        <td>3</td>
                        <td>JEE (Mains+Advanced) - Mathematics</td>
                        <td>&#8377;2000 + <small>GST</small></td>
                        <td>22-03-2023</td>
                        <td>31-07-2023</td>
                        <td><center><a href='https://online-ug.egradtutor.in/' target='_blank'>BUY NOW</a></center></td>
                    </tr>

                    <tr>
                        <td>4</td>
                        <td>JEE (Mains+Advanced) - Physics</td>
                        <td>&#8377;2000 + <small>GST</small></td>
                        <td>22-03-2023</td>
                        <td>31-07-2023</td>
                        <td><center><a href='https://online-ug.egradtutor.in/' target='_blank'>BUY NOW</a></center></td>
                    </tr>

                    <tr>
                        <td>5</td>
                        <td>JEE (Mains+Advanced) - Chemistry</td>
                        <td>&#8377;2000 + <small>GST</small></td>
                        <td>22-03-2023</td>
                        <td>31-07-2023</td>
                        <td><center><a href='https://online-ug.egradtutor.in/' target='_blank'>BUY NOW</a></center></td>
                    </tr>
                </table>
            </div>

            {/* IIT-JEE(MAINS & ADVANCED)-TEST SERIES SCHEDULE */}
            <div className='jeesection'>
                <div className='jeebtns'>
                    <h2>IIT-JEE(MAINS & ADVANCED)-TEST SERIES SCHEDULE</h2>

                    <ul>
                        <li><a href="#">Complete Test Series(JEE Mains+Advanced) + Challenger Test Series (Advanced)</a></li>
                        <li><a href="#">Challenger Test Series (JEE Advanced)</a></li>
                        <li><a href="#">JEE (Mains+Advanced) - Mathematics</a></li>
                        <li><a href="#">JEE (Mains+Advanced) - Physics</a></li>
                        <li><a href="#">JEE (Mains+Advanced) - Chemistry</a></li>
                    </ul>
                </div>

                <div className='jeelist'>
                    <h2>FEATURES OF ONLINE TEST SERIES</h2>
                    <ul>
                        <li>Gives you other possible solutions to a problem.</li>
                        <li>Each test gives you the realistic & authentic all India ranking.</li>
                        <li>Question papers prepared by experts who are top faculty across India.</li>
                        <li>Developed as per the latest syllabus of IIT-JEE-(MAINS & ADVANCED) exam.</li>
                        <li>All the tests will be accessible till the IIT-JEE-(ADVANCED)-2023 examination.</li>
                        <li>Gives you sufficient time to consolidate on your JEE Mains & JEE Advanced preparation.</li>
                        <li>Courses designed to challenge and test the students learning and understanding of the subjects.</li>
                        <li>This test series helps you to eliminate conceptual doubts and plugs in any gaps in your preparation.</li>
                        <li>Same pattern and time limit as the actual JEE exam which acquaints students with the intricacies of the exam.</li>
                        <li>Gives you several chances to appear in simulated JEE like environment to help you develop better time management skills.</li>
                    </ul>
                </div>
            </div>

            {/* fax */}

            <Faq />


        </div>
    )
}
