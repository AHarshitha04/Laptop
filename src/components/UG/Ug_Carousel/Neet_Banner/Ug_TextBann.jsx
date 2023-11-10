import React from 'react'
import { Link } from 'react-router-dom'

export const Ug_TextBann = () => {
  return (
    <div>
        <div className='banner1 container'>
            <div className='banner1-info'>
                <div className='banner1-info-heading'>
                    <h1>Welcome eGRADTutor</h1>
                    <p>eGRADTutor is an Edtech firm started with a vision to blend the boundaries in education and take
                        best-in-class courses and teachers virtually to every corner of the country. Our courses are
                        developed by the alumni of IIT/IISc with an intent to enhance the student's abilities to face some
                        of the toughest exams of the country. Our offerings not just provide a deeper understanding of the
                        subjects to the students, but they also make them exam ready. </p>
                </div>
                <div className='online-btn'>
                    <button>
                        <Link to={"/"}>Online Live classes</Link>
                    </button>
    
                    <button>
                        <Link to={"/"}>Online Live video classes</Link>
                    </button>
                </div>
    
            </div>
    
        </div>
    </div>
  )
}
