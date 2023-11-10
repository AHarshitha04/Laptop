import React from 'react'
import { OurCoursesDAta } from './OurCoursesDAta'
import './courses.css'
import { Link } from 'react-router-dom'

// In thiscourse section having two compoenents one is OurCourseDAta.js and courses.css
// we created this component by getting the data from  the map function.
export const Course = () => {
  return (
    <div>
        <div className='OurCourses container bg-color'>
            <div className='CoursesTitle' id='course'>
                <h1>OUR COURSES</h1>
            </div>
            <div className='Courses-list'>
                {OurCoursesDAta.map((courses,coursesIndex) =>{
                    return(
                        <div key={coursesIndex} className={courses.oURcOURSE}>
                            {/* <div className='courses-images'>
                                <img  src={courses.image} alt=''/>
                            </div> */}
                            <div className='courses-contant'>
                                <h3>{courses.Text}</h3>
                               <ul className='courses-list'>
                                <li>{courses.List1}</li>
                                <li>{courses.List2}</li>
                                <li>{courses.List3}</li>
                                <li>{courses.List4}</li>
                               </ul>  
                            </div>

                            <div className='coursesList'>
                                {/* <h4>{courses.CorsesText}</h4> */}
                                <ul className='coursesList'>
                                    <li className={courses.CourseClass}><Link to={courses.jeee} >{courses.Corses1}<small>{courses.Corses1sub}</small></Link></li>
                                    <li className={courses.CourseClass}><Link to={courses.neet}>{courses.Corses2}</Link></li>
                                    <li className={courses.CourseClass}><Link to={courses.bitsat}>{courses.Corses3}</Link></li>
                                    <li className={courses.CourseClass}>{courses.Corses4}</li>
                                    <li className={courses.CourseClass}>{courses.Corses5}</li>
                                    <li className={courses.CourseClass}>{courses.Corses6}</li>
                                    <li className={courses.CourseClass}>{courses.Corses7}</li>
                                    <li className={courses.CourseClass}>{courses.Corses8}</li>
                                    <li className={courses.CourseClass}>{courses.Corses9}</li>
                                    <li className={courses.CourseClass}>{courses.Corses10}</li>
                                    <li className={courses.CourseClass}>{courses.Corses11}</li>

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
export default Course;



export const Course2 = () => {
  return (
    <>
    </>
  )
}
