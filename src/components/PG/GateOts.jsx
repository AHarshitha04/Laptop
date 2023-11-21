
import React from 'react'

import { Link } from 'react-router-dom'
import logo from '../../logo.png'
import gif from './Images/hand-scroll-bar.gif'
import OtsNavHeader from '../UG/OtsNavHeader'
import Footer from '../UG/Footer'



export const GateOts = () => {
  return (
    <div>
        <div className='conatiner  '>
    <div className='container_navlogo navlogo ots-conatinerHead'>
        {/* <Link to={"/"} element={<Landingpage />}><img src={logo} alt="" /></Link> */}
      
      <div className='imgClass' > <img width={300} src={logo} alt="" /></div>

   
    <div className='login-btn'>
    <Link  className='otsNavLinks eAnimation' to={"/"}>eGRADTutor Publications</Link>
        <div className='links'>
        <Link className='otsNavLinks' to={"/"}>Student Login</Link>
        <Link className='otsNavLinks' to={"/"}>Contact Us</Link>
        </div>
        
    </div>

</div>
{/* nav header */}
<div className=' ots-conatiner-header'>
    <OtsNavHeader/>
</div>

<div className='coursename ots-conatiner'>
    <h1>NEET - ONLINE TEST SERIES</h1>
</div>
<div className='contentug_OTS ots-conatiner'>

<div className='coursebrochure'>
<h3>NEET - ONLINE TEST SERIES - 2023 </h3>

   <div className='gif-BROCHURE'>
    <img src={gif} width={40} alt="" />
 <a className='otsNavLinks' href="">COURSE BROCHURE</a>
    </div>
</div>
<p>Preparing well for the exam and attempting the exam successfully is one of the greatest desires for all the students. Many students will not be able to attempt IIT-JEE on the examination day as they do not have the right resources and proper guidance for the preparation. Our online test series makes your understanding stronger and helps you to challenge yourself in an environment that resembles the final examination. Challenger test series - as the name suggest, challenges the students’ abilities to attain the best by answering the toughest questions. With our online test series, channel your skills towards the desired success.</p>

</div>
<div className='WHYOTS ots-conatiner'>
    <h3>WHY ONLINE TEST SERIES?</h3>
    <ul>
        <li>Our online test series helps you know your understanding of the subject so that you can put efforts in the right direction.</li>
        <li>Appearing in these tests will improve the overall preparation and will increase the chances of getting a good score</li>
        <li>Our test series encompasses questions at different levels of difficulty from very difficult to relatively easy ones.</li>
        <li>Our performance analysis helps you understand the areas of improvement.</li>
        <li>It will help in improving paper solving speed.</li>

    </ul>
</div>
<div className='table ots-conatiner'>
    <h3>BUY ONLINE TEST SERIES</h3>
       
      <table id="customers">
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
         <td>Complete Test Series + Challenger Test Series </td>
         <td>&#8377;5000 + <small>GST</small></td>
         <td>22-03-2023</td>
         <td>31-07-2023</td>
         <td><center><button class="btn btn-primary" onclick="onlineugegradtutorinexams()">BUY NOW</button></center></td>
         </tr>

         <tr>
            <td>2</td>
            <td>Challenger Test Series (NEET)</td>
            <td>&#8377;2000 + <small>GST</small></td>
            <td>20-04-2023</td>
            <td>31-07-2023</td>
            <td><center><button class="btn btn-primary" onclick="onlineugegradtutorinexams()">BUY NOW</button></center></td>
            </tr>

            <tr>
            <td>3</td>
            <td>NEET - Mathematics</td>
            <td>&#8377;2000 + <small>GST</small></td>
            <td>22-03-2023</td>
            <td>31-07-2023</td>
            <td><center><button class="btn btn-primary" onclick="onlineugegradtutorinexams()">BUY NOW</button></center></td>
            </tr>

            <tr>
                <td>4</td>
                <td>NEET - Physics</td>
                <td>&#8377;2000 + <small>GST</small></td>
                <td>22-03-2023</td>
                <td>31-07-2023</td>
                <td><center><button class="btn btn-primary" onclick="onlineugegradtutorinexams()">BUY NOW</button></center></td>
                </tr>

                <tr>
                    <td>5</td>
                    <td>NEET  - Chemistry</td>
                    <td>&#8377;2000 + <small>GST</small></td>
                    <td>22-03-2023</td>
                    <td>31-07-2023</td>
                   <td><center><button class="btn btn-primary" onclick="onlineugegradtutorinexams()">BUY NOW</button></center></td>
                    </tr>
                    </table>
</div>

<div className='SCHEDULE ots-conatiner'>
    <h3>NEET-TEST SERIES SCHEDULE</h3>
    <div class="button-contant-ug" >
        <button class="button2 otsNavLinks" onclick=""> Complete Test Series  + Challenger Test Series </button>
       
        <button class="button2 otsNavLinks" onclick="">Challenger Test Series</button>
       
        <button class="button2 otsNavLinks" onclick="">NEET - Mathematics</button>
    
        <button class="button2 otsNavLinks" onclick="">NEET - Physics</button>
        
        <button class="button2 otsNavLinks" onclick="">NEET - Chemistry</button>
    </div>
    </div>
    <div className='Features ots-conatiner'>
        <h3>FEATURES OF ONLINE TEST SERIES</h3>
        <ul>
            <li>Gives you other possible solutions to a problem.</li>
            <li>Developed as per the latest syllabus of NEET exam.</li>
            <li>All the tests will be accessible till the NEET examination.</li>
            <li>Each test gives you the realistic & authentic all India ranking.</li>
            <li>Question papers prepared by experts who are top faculty across India.</li>
            <li>Gives you sufficient time to consolidate on your  NEET Advanced preparation.</li>
            <li>Courses designed to challenge and test the students learning and understanding of the subjects.</li>
            <li>This test series helps you to eliminate conceptual doubts and plugs in any gaps in your preparation.</li>
            <li>Same pattern and time limit as the actual JEE exam which acquaints students with the intricacies of the exam.</li>
            <li>Gives you several chances to appear in simulated NEET like environment to help you develop better time management skills.</li>
        
        </ul>
    </div>
    <div className='FAQs ots-conatiner'>
        <h1 style={{textAlign: 'center'}}>Frequently Asked Questions</h1>
        <div class="faq-content">
        <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
            <button class="toggle">
                <i class="uil uil-plus icon"></i>What is the mode of registration?  </button>
                <div class="contentfaq">
                    <p>
                        Registration will be online and free. In our portal online-ug.egradtutor.in,You need to make payment only when you buy a course or package.
    
                    </p>  
                </div>
        </div>
    
    
        <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
            <button class="toggle">
                <i class="uil uil-plus icon"></i>What information do we need for registration?  </button>
                <div class="contentfaq">
                    <p> Name, Contact number, Email Id, Password, etc.We donot ask your identity cards,photos during registration,Kindly bring it to our notice in such case. </p>
                </div>
        </div>
    
    
        <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
            <button class="toggle">
                <i class="uil uil-plus icon"></i>What is the mode of payment?</button>
                <div class="contentfaq">
                    <p>
                        Payment can be done online only through Debit card, Credit card, UPI, Net Banking. No Cash payments or center based registrations.</p>
                     
        
                </div>
        </div>
    
    
        <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
            <button class="toggle">
                <i class="uil uil-plus icon"></i>Will the money be refunded incase I don't like the course?  </button>
                <div class="contentfaq">
                    <p>
                        No refund will be given if a student wishes to opt out during the period of subscription. Demo tests and Videos are given to have an idea regarding our courses. 
     
                    </p>  
                </div>
    
                
        </div>
    
        <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
            <button class="toggle">
                <i class="uil uil-plus icon"></i> What if the money is debited and the course is not accessible?  </button>
                <div class="contentfaq">
                    <p>
                        We will try to resolve any techanical issues regarding payment within 48 hours of credit to our account. Please contact our web team -info@egradtutor.in , +91-7386660493 for any queries or resolution. </p>
                   
                </div>
    
                
        </div>
       
       
            <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                <button class="toggle">
                    <i class="uil uil-plus icon"></i>Why are the Number of tests available in the test cards different from total Number of tests given in the schedule?  </button>
                    <div class="contentfaq">
                        <p>
                            The tests available in the test cards are the live tests. The tests will be uploaded according to the schedule. Detailed schedule is available in the course page.  </p>
                    
                    </div>
            </div>
    
    
            <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                <button class="toggle">
                    <i class="uil uil-plus icon"></i> Does your interface give the exact feel JEE real time interface?   </button>
                    <div class="contentfaq">
                        <p>
                            Our interface offers similar experience to that of real time exam interface with all the features.</p>
                     
                    </div>
            </div>
    
   
            <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                <button class="toggle">
                    <i class="uil uil-plus icon"></i>Do we provide any demo tests? </button>
                    <div class="contentfaq">
                        <p>
                            Yes, we provide the demo test for those who do  register online.Registered users are requested to write the demo test to get an idea of the interface and the level of questions in our test series. </p>
                     
                    </div>
            </div>
    
    
            <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                <button class="toggle">
                    <i class="uil uil-plus icon"></i> How many tests are given in the course? </button>
                    <div class="contentfaq">
                        <p>
                            In the complete test series package, 48 tests are available for each subject (physics, chemistry, maths) and 10 Challenger tests totalling the number of tests to 154. </p>
                    </div>
            </div>
    </div>
            <div class="faq-content">
            <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                <button class="toggle">
                    <i class="uil uil-plus icon"></i>What are the types of tests provided in OTS? </button>
                    <div class="contentfaq">
                        <p>
                            Our test series includes TOPIC-WISE , SECTION-WISE and FULL SYLLABUS tests and challenger test series are FULL SYLLABUS tests with all 3 subjects( M + P + C ) combined. </p>
                    </div>
            </div>
    
            <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                <button class="toggle">
                    <i class="uil uil-plus icon"></i>What will be the validity for all the tests?  </button>
                    <div class="contentfaq">
                        <p>
                     All the tests will be accessible till IIT-JEE(ADVANCED)-31-JULY-2023 examination.  </p>
                    </div>
            </div>
            <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                <button class="toggle">
                    <i class="uil uil-plus icon"></i>How many times can I attempt every test? </button>
                    <div class="contentfaq">
                        <p>
                            Every test can be attempted only once.We request you not to waste your attempt.  </p>
                    </div>
            </div>
            <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                <button class="toggle">
                            <i class="uil uil-plus icon"></i>Are there any discounts/coupons available for OTS (or) Promotional offers?</button>
                            <div class="contentfaq">
                                <p>
                                    Yes, if you are referred by any of our faculty. You can use the same while making the payment to avail the discount.   </p>
                            </div>
                    </div>
                
                    <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                        <button class="toggle">
                                    <i class="uil uil-plus icon"></i>Are previous year question papers included in the Online test series for practice?</button>
                                    <div class="contentfaq">
                                        <p>
                                            We have not given any previous year question papers in the test series for separate practice. However, Few important questions are included from previous year question papers.  </p>
                                    </div>
                            </div>

                    <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                        <button class="toggle">
                            <i class="uil uil-plus icon"></i> What should be my approach to the Online test series?</button>
                            <div class="contentfaq">
                                <p>
                                    We advise the students to follow the schedule given in our test series. The dates of release of various papers were discussed and suggested by the course creators to ensure optimum practice in the available time frame.    </p>
                            </div>
                    </div>
                
                     
                    <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                        <button class="toggle">
                            <i class="uil uil-plus icon"></i> Is the Online test series relevant only for  JEE ADVANCED?</button>
                            <div class="contentfaq">
                                <p>
                                    Though the intent and focus of our course is towards  JEE ADVANCED, our tests also helps the students appearing for IIT JEE (MAINS) in April’2023 session questions in TOPIC-WISE tests are mainly conceptual and JEE MAINS level.  </p>
                            </div>
                    </div>

                     
                    <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                        <button class="toggle">
                            <i class="uil uil-plus icon"></i> How were the Online tests designed?</button>
                            <div class="contentfaq">
                                <p>
                                    Keeping in mind the challenge JEE exam throws on the student, we made sure all concepts are covered with questions of varying toughness. The aspirant is sure to face and experience the situations for prepardness to the final exam.</p>
                             
                            </div>
                    </div>

                     
                    <div class="wrapper" style={{padding: '0px 0px 0px 10px'}}>
                        <button class="toggle">
                            <i class="uil uil-plus icon"></i> May I know little about the team at eGRADTutor who created the courses?</button>
                            <div class="contentfaq">
                                <p>
                                    All the courses are created and well crafted by subject matter experts at eGRADTutor.Who have vast experience in training students for JEE and other exams.Our experts are Graduates, Post graduates, Doctrates from IIT/IISc and other reputed universities in India & Abroad.</p>
                              
                            </div>
                    </div>

                  
   
    </div>
</div>





</div>
<Footer />
    </div>
  )
}
