import React from 'react';
import Win from '../../Images/win.png'
import exam from '../../Images/exam.png'


import onlineCourses from '../../Images/onlineCourses.png'
import education from '../../Images/education.png'

// import Vission from '../../Images/Vission.png'
// import Mission from '../../Images/Mission.png'

import Vission from './Mission.png'
import Mission from './Vission.png'
// import Vission from './vs.jpg'


// this is only for About section in the code.
// In this has two arrays.
// export const AboutItems = [
//     {
//         aboutIMG: [Win],
//         classAboutImg: 'win'
//     },
//     {
//         aboutIMG: [education],
//         classAboutImg: 'education'
//     },
//     {
//         aboutIMG: [exam],
//         classAboutImg: 'exam'
//     },
//     {
//         aboutIMG: [onlineCourses],
//         classAboutImg: 'onlineCourses'
//     },
// ]

// This is the second array of Mission and Vission.
// This data we will use on about.js component.

export const UgAboutVisionMission =[
    {
        vision: [Vission],
        Title: 'Our Vision',
        Ptext: 'Our vision is to blend the boundaries in education and take best-in-class courses and teachers virtually to every corner of the country.',
        Values: 'Values:',
        Points1: 'We believe in constant innovation and development.',
        Points2: 'We seek growth and equal opportunity.',
        Points3: 'We act with integrity and humility.',
        Points4:  'We work with energy and curiosity.',
        vistionMisstion: '  vision-contant_Ug',
        contantClass: ' contant_Ug',
        imageClass: 'vistionMoissionClass_Pg',
        contantClassForUl: 'Ug_About_LI'
       
    },
    {
        vision: [Mission],
        Title: 'Our Mission',
        Ptext: 'Our mission is to be the most accessible and affordable online education provider in the country. ',
        Values: 'We intend to build a virtual knowledge pool that strengthens the students and thereby strengthens the country in the journey towards growth and innovation.',
        vistionMisstion: 'mission-contant_Ug',
        contantClass: 'contant_Ug',
        imageClass: 'vistionMoissionClass_Pg',
        contantClassForUl: 'Ul-list2 '
    }
]