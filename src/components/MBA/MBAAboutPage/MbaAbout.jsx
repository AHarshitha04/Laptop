import React from 'react'
import MbaAboutData from './MbaAboutData'
import Logo from './browser-removebg-preview.png'
import './MbaAbout.css'

const MbaAbout = () => {
  return (
    // This div was responsible for all the content in the MBA About us page
    <div id='about_' className='mbaabout'>
    <div className='mbaAbout-bg' >
      {/* Here we are using heading tag for all the MBA About us page */}
      <h1>ABOUT US</h1>
      {/* This div was responsible for all the content in the MBA About us page except the heading tag */}
      <div className='MbaAbout'>
        {/* This div was responsible for "image tag" and "paragraph tag" in MBA About us page  */}
        <div className='mbaAboutSection ContainerAbout'>
          {/* This perticular div was responsible only for "image tag" in MBA About us page */}
          <div className='mbalogoimage'>
            <img src={Logo} alt='' />
          </div>

          {/* This perticular div was responsible only for "paragraph tag" in MBA About us page */}

          <div className='mbaaboutContant' >

            <p>eGRADTutor is an Edtech firm started with a vision to blend the boundaries in education and take best-in-class courses and teachers virtually to every corner of the country. Our courses are developed by the alumni of IIT/IISc with an intent to enhance the student's abilities to face some of the toughest exams of the country. Our offerings not just provide a deeper understanding of the subjects to the students, but they also make them exam ready.</p>
          </div>
        </div>
        {/* This perticular div was responsible for "VISION" and "MISSION" in MBA About us page */}
        <div className='mbaVISIONMISSION'>
          <div className='mbavistionMission-section'>
            {/* Here we are using mapping function to call data from MbaAboutData.js file */}
            {MbaAboutData.map((vistion, Mistion) => {
              return (
                <div key={Mistion} className={vistion.vistionMisstion}>
                  <div className={vistion.contantClass}>
                    <h3>{vistion.Title}</h3>
                    <p>{vistion.Ptext}</p>
                    <p className='vision_value'>{vistion.Values}</p>
                    <ul className='ulList'>
                      <li className={vistion.contantClassForUl}>{vistion.Points1}</li>
                      <li className={vistion.contantClassForUl}>{vistion.Points2}</li>
                      <li className={vistion.contantClassForUl}>{vistion.Points3}</li>
                      <li className={vistion.contantClassForUl}>{vistion.Points4}</li>
                    </ul>
                  </div>
                </div>
              )
            })}

          </div>
        </div>
      </div>
    </div>
    </div>

  )
}

export default MbaAbout