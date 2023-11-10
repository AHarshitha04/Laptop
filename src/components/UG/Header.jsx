import React from 'react'
import { Link } from 'react-router-dom'
import Landingpage from '../../Landingpage'
import logo from '../../logo.png'
// import { Nav } from './Nav'
import Navbar from '../UG/Nav'

const Header = () => {
  return (
    <header>


{/* This is navbar for all the home pages */}
    <div className='navlogo'>
        <Link to={"/"} element={<Landingpage />}><img src={logo} alt="" /></Link>


    </div>
    <Navbar/>
{/* Navbar section */}
    {/* <nav className='navbar'>
        <ul>
            < a href="#home" >Home</ a >
            <a href="#about" >About</a>
            <a href="#Exams">Exams</a>
            <a href="#course">Courses</a>
            <a href="#contact">Contact</a>
            <a href="#Faq">FAQs</a>
        </ul>
    </nav> */}
    {/* This is the registration button to students who want to register */}
    {/* <div className='login-btn'>
     <button><Link to={"/"}>Login/Registration</Link></button>
    </div> */}





</header>
  )
}

export default Header;