import React, { Component } from 'react'
import '../UG/navbar.css'
import { Link } from 'react-router-dom'

// import { useState, useEffect } from 'react'

class Navbar extends Component {


  state = { clicked: false }
  hadleClick = () => {
    this.setState({ clicked: !this.state.clicked })
  }
  render() {
    return (


      <div>
        <div className='menu-icons' onClick={this.hadleClick}>
          <i className={this.state.clicked ? 'fas fa-times' : 'fas fa-bars'}></i>
        </div>
        <ul className={this.state.clicked ? 'nav-menu active' : 'nav-menu'}>
          <a className='navBarLinZ' href="#home" >Home</ a >
          <a className='navBarLinZ' href="#about_" >About</a>
          <a className='navBarLinZ' href="#Exams">Exams</a>
          <a className='navBarLinZ' href="#course">Courses</a>
          <a className='navBarLinZ' href="#contactt">Contact</a>
          <a className='navBarLinZ' href="#faq">FAQs</a>
          {/* <Link className='login' to={"/"}>Login/Registration</Link> */}
          <a className='login' target='_blank' href="https://online-ug.egradtutor.in">Login/Registration</a>

        </ul>

        {/* <div className='login-btn'>
    </div> */}

      </div>




    )
  }
}
export default Navbar;
