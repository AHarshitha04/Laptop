import React from 'react'
import './pg_courses.css'
import { Pg_Our_Courses_DAta } from './Pg_Our_Courses_DAta'
import { Link } from 'react-router-dom'


export const Pg_Course = () => {
  return (
    <div>
        
        <div className='Pg_OurCourses Pg_Container' id='Pg_Container'>
            <div className='CoursesTitle' id='course'>
                <h1>OUR COURSES</h1>
            </div>
            <div className='Pg_Courses-list'>
                {Pg_Our_Courses_DAta.map((courses,coursesIndex) =>{
                    return(
                        <div key={coursesIndex} className={courses.oURcOURSE}>
                                <div className='Pg_courses-images'>
                                    <img src={courses.image} alt=''/>
                                </div>
                            <div className='Pg_courses-contant'>
                                <h3>{courses.Text}</h3>
                               <ul className='Pg_courses-list'>
                                <li>{courses.List1}</li>
                                <li>{courses.List2}</li>
                                <li>{courses.List3}</li>
                                <li>{courses.List4}</li>
                               </ul>  
                            </div>

                            <div className='Pg_coursesList'>
                                {/* <h4>{courses.CorsesText}</h4> */}
                                <ul className='Pg_coursesList'>
                                    <li className={courses.CourseClass}><Link>{courses.Corses1}</Link></li>

                                </ul>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    </div>
  )
}
