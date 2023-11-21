import React from 'react'
import './Ots.css'
import { Link } from 'react-router-dom'
import logo from '../../logo.png'
import Header from './Header'
import OtsNavHeader from './OtsNavHeader'
import { FooterData } from './FooterData'
import './Footer.css'
import gif from './Images/hand-scroll-bar.gif'
import { useState } from 'react'
import './Faq.css'
import Examheader from './Examheader'

const OTS = () => {
    const [selected, setSelected] = useState(null)
    const toggle2 = (i1) => {
        // return i
        if (selected === i1) {
            return setSelected(null)

        }
        setSelected(i1)
    }
    const sixtoten = [
        {
            Qustion: "What is the mode of registration?",
            answer: " Registration will be online and free. In our portal online-ug.egradtutor.in,You need to make payment only when you buy a course or package."
        },
    
        {
            Qustion: "What information do we need for registration? ",
            answer: "Name, Contact number, Email Id, Password, etc.We donot ask your identity cards,photos during registration,Kindly bring it to our notice in such case."
        },
        {
            Qustion: "What is the mode of payment?",
            answer: " Payment can be done online only through Debit card, Credit card, UPI, Net Banking. No Cash payments or center based registrations."
        },
    
        {
            Qustion: "Will the money be refunded incase I don't like the course?",
            answer: "No refund will be given if a student wishes to opt out during the period of subscription. Demo tests and Videos are given to have an idea regarding our courses." 
            
        },
    
        {
            Qustion: "What if the money is debited and the course is not accessible?",
            answer: "We will try to resolve any techanical issues regarding payment within 48 hours of credit to our account. Please contact our web team -info@egradtutor.in , +91-7386660493 for any queries or resolution."
        },
        {
            Qustion: "Why are the Number of tests available in the test cards different from total Number of tests given in the schedule?.",
            answer: "The tests available in the test cards are the live tests. The tests will be uploaded according to the schedule. Detailed schedule is available in the course page."
        },
          {
              Qustion: "Does your interface give the exact feel JEE real time interface?",
              answer: "  Our interface offers similar experience to that of real time exam interface with all the features."
        },
        {
            Qustion: "Do we provide any demo tests?",
            answer: " Yes, we provide the demo test for those who do  register online.Registered users are requested to write the demo test to get an idea of the interface and the level of questions in our test series."

        },
        {
            Qustion: "How many tests are given in the course?",
            answer: " In the complete test series package, 48 tests are available for each subject (physics, chemistry, maths) and 10 Challenger tests totalling the number of tests to 154."
        },
        {
            Qustion: "What are the types of tests provided in OTS?",
            answer: "Our test series includes TOPIC-WISE , SECTION-WISE and FULL SYLLABUS tests and challenger test series are FULL SYLLABUS tests with all 3 subjects( M + P + C ) combined."
        },
       {
        Qustion: "What will be the validity for all the tests?",
        answer: "All the tests will be accessible till IIT-JEE(ADVANCED)-31-JULY-2023 examination."
       },
       {
        Qustion: "How many times can I attempt every test?",
        answer: " Every test can be attempted only once.We request you not to waste your attempt."
       },
       {
        Qustion: "Are there any discounts/coupons available for OTS (or) Promotional offers?",
        answer: " Yes, if you are referred by any of our faculty. You can use the same while making the payment to avail the discount."
       },
       {
        Qustion: "Are previous year question papers included in the Online test series for practice?",
        answer: "We have not given any previous year question papers in the test series for separate practice. However, Few important questions are included from previous year question papers."
       },
       {
        Qustion: " What should be my approach to the Online test series?",
        answer: " We advise the students to follow the schedule given in our test series. The dates of release of various papers were discussed and suggested by the course creators to ensure optimum practice in the available time frame."
       },
       {
        Qustion: "Is the Online test series relevant only for  JEE ADVANCED?",
        answer: " Though the intent and focus of our course is towards  JEE ADVANCED, our tests also helps the students appearing for IIT JEE (MAINS) in April’2023 session questions in TOPIC-WISE tests are mainly conceptual and JEE MAINS level."
       },
       {
        Qustion: " How were the Online tests designed?",
        answer: " Keeping in mind the challenge JEE exam throws on the student, we made sure all concepts are covered with questions of varying toughness. The aspirant is sure to face and experience the situations for prepardness to the final exam."
       },
       {
        Qustion: "May I know little about the team at eGRADTutor who created the courses?",
        answer: "All the courses are created and well crafted by subject matter experts at eGRADTutor.Who have vast experience in training students for JEE and other exams.Our experts are Graduates, Post graduates, Doctrates from IIT/IISc and other reputed universities in India & Abroad."
       },
     
    ]
  return (
  <div className='conatiner  '>
    {/* <div className='container_navlogo navlogo ots-conatinerHead'> */}
        {/* <Link to={"/"} element={<Landingpage />}><img src={logo} alt="" /></Link> */}
      
      {/* <div className='imgClass' > <img width={300} src={logo} alt="" /></div> */}

   
    {/* <div className='login-btn'>
    <Link  className='otsNavLinks eAnimation' to={"/"}>eGRADTutor Publications</Link>
        <div className='links'>
        <Link className='otsNavLinks' to={"/"}>Student Login</Link>
        <Link className='otsNavLinks' to={"/"}>Contact Us</Link>
        </div>
        
    </div> */}

{/* </div> */}
{/* nav header */}
<div className='container'>

<Examheader/>
</div>

<div className='coursename ots-conatiner'>
    <h1>IIT-JEE - ONLINE TEST SERIES</h1>
</div>
<div className='contentug_OTS ots-conatiner'>

<div className='coursebrochure'>
<h3>IIT-JEE-(MAINS & ADVANCED) - ONLINE TEST SERIES - 2023 </h3>

   <div className='gif-BROCHURE'>
    <img src={gif} width={40} alt="" />
 <a className='otsNavLinks' href="">COURSE BROCHURE</a>
    </div>
</div>
<p style={{marginTop:'15px'}}>Preparing well for the exam and attempting the exam successfully is one of the greatest desires for all the students. Many students will not be able to attempt IIT-JEE on the examination day as they do not have the right resources and proper guidance for the preparation. Our online test series makes your understanding stronger and helps you to challenge yourself in an environment that resembles the final examination. Challenger test series - as the name suggest, challenges the students’ abilities to attain the best by answering the toughest questions. With our online test series, channel your skills towards the desired success.</p>

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
         <td>Complete Test Series(JEE Mains+Advanced)  + Challenger Test Series (Advanced)</td>
         <td>&#8377;5000 + <small>GST</small></td>
         <td>22-03-2023</td>
         <td>31-07-2023</td>
         <td><center><button class="btn btn-primary" onclick="onlineugegradtutorinexams()">BUY NOW</button></center></td>
         </tr>

         <tr>
            <td>2</td>
            <td>Challenger Test Series (JEE Advanced)</td>
            <td>&#8377;2000 + <small>GST</small></td>
            <td>20-04-2023</td>
            <td>31-07-2023</td>
            <td><center><button class="btn btn-primary" onclick="onlineugegradtutorinexams()">BUY NOW</button></center></td>
            </tr>

            <tr>
            <td>3</td>
            <td>JEE (Mains+Advanced) - Mathematics</td>
            <td>&#8377;2000 + <small>GST</small></td>
            <td>22-03-2023</td>
            <td>31-07-2023</td>
            <td><center><button class="btn btn-primary" onclick="onlineugegradtutorinexams()">BUY NOW</button></center></td>
            </tr>

            <tr>
                <td>4</td>
                <td>JEE (Mains+Advanced) - Physics</td>
                <td>&#8377;2000 + <small>GST</small></td>
                <td>22-03-2023</td>
                <td>31-07-2023</td>
                <td><center><button class="btn btn-primary" onclick="onlineugegradtutorinexams()">BUY NOW</button></center></td>
                </tr>

                <tr>
                    <td>5</td>
                    <td>JEE (Mains+Advanced) - Chemistry</td>
                    <td>&#8377;2000 + <small>GST</small></td>
                    <td>22-03-2023</td>
                    <td>31-07-2023</td>
                   <td><center><button class="btn btn-primary" onclick="onlineugegradtutorinexams()">BUY NOW</button></center></td>
                    </tr>
                    </table>
</div>

<div className='SCHEDULE ots-conatiner'>
    <h3>IIT-JEE(MAINS & ADVANCED)-TEST SERIES SCHEDULE</h3>
    <div class="button-contant-ug" >
        <button class="button2 otsNavLinks" onclick=""> Complete Test Series + Challenger Test Series (Advanced)</button>
       
        <button class="button2 otsNavLinks" onclick="">Challenger Test Series (JEE Advanced)</button>
       
        <button class="button2 otsNavLinks" onclick="">JEE (Mains+Advanced) - Mathematics</button>
    
        <button class="button2 otsNavLinks" onclick="">JEE (Mains+Advanced) - Physics</button>
        
        <button class="button2 otsNavLinks" onclick="">JEE (Mains+Advanced) - Chemistry</button>
    </div>
    </div>
    <div className='Features ots-conatiner'>
        <h3>FEATURES OF ONLINE TEST SERIES</h3>
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


   
<div className='FAQCONTENT'>
            <div className="wrapper-3 container">
            
            <div className='' >
                <h1>FREQUENTLY ASKED QUESTIONS</h1>
          
            </div>
                <div className="accordion2">
                    {sixtoten.map((item, i2) => (
                        <div className="item2">
                            <div className="title" onClick={() => toggle2(i2)}>
                                <h2>{item.Qustion}</h2>
                                <span>{selected === i2 ? '-' : '+'}</span>
                            </div>
                            <div className={selected === i2 ? 'content-show2' : 'content2'}>{item.answer}</div>
                        </div>
                    ))}

                </div>

            </div>
        </div>
</div>
 
  )
}

export default OTS;