import React from 'react'
import ots from './Images/online.png'
import ovl from './Images/live.png'
import oqb from './Images/test.png'
import ots1 from './Images/ots1 (2).png'
import img4 from './Images/img4.png'
// 
// This data only for course.jsx
// Our course has three diffrent arrays
// If we want to change in the course component we can change here.Then automatically update in the course.jsx
export const OurCoursesDAta = [
    // This section has only online test series data
    {
        image: [ots1],
        Text: 'ONLINE TEST SERIES',
        Subtext: 'Features',
        List1:  'Combination of subject/topic wise and full syllabus.',
        List2: 'Interface similar to that of the competitive exams',
        List3: 'Detailed solutions with explanation',
        List4: 'Performance analysis reports',
       
        CorsesText: 'Courses',
        Corses1: 'IITJEE ',
        Corses1sub:'(Mains&Advanced)',
        Corses2: 'NEET',
        Corses3: 'BITSAT',
        Corses4: 'VITEE',
        Corses5: 'AP-EAPCET',
        Corses6: 'TS-EAMCET',
        Corses7: 'MHCET',
        Corses8: 'KCET',
        Corses9: 'WEBJEE',
        Corses10: 'KEAM',
        Corses11: 'SRMJEE',
        oURcOURSE: 'OTScourses-contant',
        CourseClass: 'Courses1',
        jeee:'/iitjee_otc',
        neet:'/neetotc',
        bitsat:'/bitsatots'
    },
      // This section has only online live video classes data
    {
        image: [img4],
        Text: 'ONLINE LIVE VIDEO CLASSES',
        Subtext: 'Features',
        List1: 'Accessible from anywhere and anytime',
        List2: 'Content curated by industry experts',
        List3: 'Frequent doubt clearing sessions',
        List4: 'Best-in-class user interface',

        CorsesText: 'Courses',
        Corses1: 'IITJEE',
        Corses1sub:'(Mains&Advanced)',
        Corses2: 'NEET',
        // Corses3: 'BITSAT',
        // Corses4: 'VITEE',
        // Corses5: 'AP-EAPCET',
        // Corses6: 'TS-EAMCET',
        // Corses7: 'MHCET',
        // Corses8: 'KCET',
        // Corses9: 'WEBJEE',
        // Corses10: 'KERALA CEE',
        // Corses11: 'SRMJEE'
        oURcOURSE: 'OVLcourses-contant',
        CourseClass: 'Courses2',
        // jeee:'/iitjee_otc',


    },
      // This section has only online question bank data
    {
        image: [oqb],
        Text: 'ONLINE QUESTION BANK',
        Subtext: 'Features',
        List1: 'Detailed analysis and explanations to the solutions',
        List2: 'Practice questions in the examination interface',
        List3: 'Volume of questions available across topics',
        List4: 'Practice any number of time',

        CorsesText: 'Courses',

        Corses1: 'IITJEE',
        Corses1sub:'(Mains&Advanced)',
        Corses2: 'NEET',
        oURcOURSE: 'OQB-courses-contant',
        CourseClass: 'Courses3'



    }

]