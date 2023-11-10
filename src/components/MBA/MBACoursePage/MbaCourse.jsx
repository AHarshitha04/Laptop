import React from 'react'
import './MbaCourse.css'
import MbaCourseData from './MbaCourseData'

const MbaCourse = () => {
  return (
    <div id='course'>
        {/* This perticular div was reponsible for whole MBA course page */}
        <div className='mbaOurCourses container bg-color'>
            {/* This perticular div was responsible only for "heading tag" in MBA course page */}
            <div className='mbaCoursesTitle' id='course'>
                <h1>OUR COURSES</h1>
            </div>
            {/* Here we are using mapping function to get the data from another file "MbaCourseData.js". All the data regarding course page will be stored in that perticular file */}
            <div className='mbaCourses-list'>
                {MbaCourseData.map((courses,coursesIndex) =>{
                    return(
                        // This perticular div was responsible for all courses which are there in MBA
                        <div key={coursesIndex} className={courses.oURcOURSE}>
                            {/* This perticular div was responsible only for image tag in the MBA course page */}
                            <div className='mbacourses-images'>
                                <img src={courses.image} alt=''/>
                            </div>
                            {/* This perticular div will contain all the list tags to list out the content in MBA course page  */}
                            <div className='mbacourses-contant'>
                                <h3>{courses.Text}</h3>
                               <ul className='mbacourses-list'>
                                <li>{courses.List1}</li>
                                <li>{courses.List2}</li>
                                <li>{courses.List3}</li>
                                <li>{courses.List4}</li>
                               </ul>  
                            </div>
                            {/* This perticular div was responsible with "explore button tag" */}
                            <div className='mbacoursesList'>
                                <ul className='mbacoursesListul'>
                                    <li className={courses.CourseClass}>{courses.Corses1}</li>
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

export default MbaCourse