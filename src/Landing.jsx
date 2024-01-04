import React from 'react'
import Footer from './components/UG/Footer'
import logo from './logo2.jpeg';
import logoo from './logo image.jpg'
import { Link } from 'react-router-dom';
import './landing.css'



export const Landing = () => {
  return (
    <div >
       <div >
          <nav>
                <img src={logo} width={100} alt=""/>
                <h2 >...tutoring by grads from IIT/IISc</h2>
            </nav>
       </div>

        <section className='eLanding_Container'>
          <div className="landingE">
              <h1>Welcome to eGRADTutor</h1>
              <p>eGRADTutor is an Edtech firm started with a vision to blend the boundaries in education and take best-in-class courses and teachers virtually to every corner of the country. Our courses are developed by the alumni of IIT/IISc with an intent to enhance the student's abilities to face some of the toughest exams of the country. Our offerings not just provide a deeper understanding of the subjects to the students, but they also make them exam ready.</p>

              <div >
                  <img src={logoo} width={100} alt=""/> 
              </div>
          </div>
        </section>

        <section className='eLanding_Container'>
          <div className="eCordsLanding">
          <Link  className='elanLink' to={"/home"}>
            
            <ul className='elandUl'>
              <h3>UG </h3>
              <li><Link to="/iitjee">IIT-JEE <span> (Mains & Advanced) </span> </Link></li>
              <li><Link to={'/neet'}>NEET</Link></li>
              <li><Link >BITSAT</Link></li>
              <li><Link >VITEEE</Link></li>
              <li><Link >&OTHER ENTRANCE EXAMS</Link></li>
            </ul>
          </Link>

          <Link className='elanLink' to={"/PgHome"}>
            
            <ul className='elandUl'>
              <h3>PG </h3>
              <li><Link >GATE</Link></li>
              <li><Link >IIT-JAM</Link></li>
              <li><Link >ESC</Link></li>
              <li><Link >ISRO</Link></li>
              <li><Link >&OTHER ENTRANCE EXAMS</Link></li>
            </ul>   
          </Link>

          <Link className='elanLink' to={"/MbaHome"}>
            
            <ul className='elandUl'>
              <h3>MBA</h3>
              <li><Link >GRE</Link></li>
              <li><Link >GMAT</Link></li>
              <li><Link >CAT</Link></li>
              <li><Link >XAT</Link></li>
              <li><Link >&OTHER ENTRANCE EXAMS</Link></li>
            </ul>
          </Link>

          <Link  className='elanLink'>
            
            <ul className='elandUl'>
              <h3>CA </h3>
              <li><Link >ACCOUNTING</Link></li>
              <li><Link >MERCANTILE LAWS</Link></li>
              <li><Link >GENERAL ECONOMICS</Link></li>
              <li><Link >QUANTITATIVE APTITUDE</Link></li>
              <li><Link >&OTHER ENTRANCE EXAMS</Link></li>
            </ul>
          </Link>
          </div>
        </section>

        <Footer/>
    </div>
  )
}
