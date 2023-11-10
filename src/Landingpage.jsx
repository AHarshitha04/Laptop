import React from 'react';
import {Link} from "react-router-dom"
import './App.css';
import logo from './logo2.jpeg';
import logoo from './logo image.jpg'
import  Footer  from './components/UG/Footer';
// import { Link } from 'react-router-dom';
function Landingpage() {
  return (
    <>



    {/* This is landing page of main to open the Homepages of UG AND PG AND MBA AND CA */}
 
    <div className="navcontainer">
      <div className='landing_header'>
      <div className="navbar">
        <img src={logo} className='logo' alt=""/>
        {/* <div className='heading'> */}
           <h2  className='heading'>...tutoring by grads from IIT/IISc</h2>
      {/* </div> */}
      </div>


      {/* This is the eGRADTutor buttons for registrations */}
     
 <div className='login-btn'>
    <Link  className='otsNavLinks eAnimation' to={"/"}>eGRADTutor Publications</Link>
        {/* <div className='links'>
        <Link className='otsNavLinks' to={"/"}>Student Login</Link>
        <Link className='otsNavLinks' to={"/"}>Contact Us</Link>
        </div> */}
    </div>
    </div>
    {/* Registration button ends */}



      <div className='logoo'>
       <img src={logoo} className='logoo' alt=""/></div>

      <div className="row">
      <div className="col1">
        {/* <img src={image} alt="" /> */}
        <h1>Welcome to eGRADTutor</h1>
        <p>eGRADTutor is an Edtech firm started with a vision to blend the boundaries in education and take best-in-class courses and teachers virtually to every corner of the country. Our courses are developed by the alumni of IIT/IISc with an intent to enhance the student's abilities to face some of the toughest exams of the country. Our offerings not just provide a deeper understanding of the subjects to the students, but they also make them exam ready.</p>
       {/* <button type="button">Login</button> */}
   </div>
    </div>
               {/*We are linked the cards to open the home pages */}
               {/* This is UG page code */}
<div className='landing-cards'>
<div className='ugCard'>
  <Link to={"/home"}>
<h3>UG </h3>
<ul>
  <li><Link to="/iitjee">IIT-JEE <span> (Mains & Advanced) </span> </Link></li>
  <li><Link to={'/neet'}>NEET</Link></li>
  <li>BITSAT</li>
  <li>VITEEE</li>
  <li>&OTHER ENTRANCE EXAMS</li>
</ul>
</Link>
</div>
{/* This is PG page code */}
<div className='ugCard'>
<Link to={"/PgHome"}>
<h3>PG </h3>
<ul>
  <li>GATE</li>
  <li>IIT-JAM</li>
  <li>ESC</li>
  <li>ISRO</li>
  <li>&OTHER ENTRANCE EXAMS</li>
</ul>
</Link>
</div>
{/* This is MBA page code */}
<div className='ugCard'>
<Link to={"/MbaHome"}>
<h3>MBA </h3>
<ul>
  <li>GRE</li>
  <li>GMAT</li>
  <li>CAT</li>
  <li>XAT</li>
  <li>&OTHER ENTRANCE EXAMS</li>
</ul>
</Link>
</div>
{/* This is CA page code */}
<div className='ugCard'>
<Link to={"/"}>
<h3>CA </h3>
<ul>
  <li>ACCOUNTING</li>
  <li>MERCANTILE LAWS</li>
  <li>GENERAL ECONOMICS</li>
  <li>QUANTITATIVE APTITUDE</li>
  <li>&OTHER ENTRANCE EXAMS</li>
</ul>
</Link>
</div>
</div>
</div>



    </>
  );
};

export default Landingpage;
