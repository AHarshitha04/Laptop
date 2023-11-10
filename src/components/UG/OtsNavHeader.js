import React from 'react'
import { Link } from 'react-router-dom'
import Landingpage from '../../Landingpage'
const OtsNavHeader = () => {
  return (
    <header style={{background: '#01c3ff', width: '100%', borderRadius: '0px'}}>



    <div className='navlogo'>


    </div>

    <nav className='navbar'>
        <ul style={{fontSize: '20px', fontWeight :'600'}}>

            <a href="#home" >Home</ a >
            <a href="#about" >About</a>
            <a href="#exam">Exams</a>
            <a href="#course">Courses</a>
            <a href="#contact">Contact</a>
            <a href="#Faq">FAQs</a>


        </ul>
    </nav>
    <div className='login-btn'>
        <button><Link to={"/"}>Login/Registration</Link></button>
    </div>



</header>
  )
}

export default OtsNavHeader;