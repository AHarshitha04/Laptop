import React from 'react'
import explore from '../UG/Images/education.png'
import Img1 from '../UG/Images/img1.png'
import Img2 from '../UG/Images/img2.png'
import Img3 from '../UG/Images/img3.png'
import Img4 from '../UG/Images/img4.png'
import Img5 from '../UG/Images/img5.png'
import Img6 from '../UG/Images/img6.png'
import Img7 from '../UG/Images/img7.png'
import Img8 from '../UG/Images/img8.png'
import Img9 from '../UG/Images/img9.png'
import Img10 from '../UG/Images/img10.png'
import Img11 from '../UG/Images/img11.png'
import hand from "../UG/Images/hand-index-fill.svg"

// ----------------- poster ---------------------------------
import poster1 from "../UG/posters/IIT-JEE.png"
import poster2 from "../UG/posters/BITSAT.png"
import poster3 from "../UG/posters/NEET.png"




// This data will used in ExploreExams.jsx component

// We can change the content it will automatically change in the ExploreExams.jsx.
// In this having 11 arrays. Each array having there own content as Title, Exam name, Online Test Series, OLV Classes and Explore Button linked to go to Exam random pages.
// We imported images from component/ug/images.
export const ExploreData = [
 
    {
        IMGuRL:[explore],
        IMGuRL1:[hand],
        Title:'IITJEE',
        examPage: '/iitjeeExam',
        OnlineTestSeries: 'Online Test Series',
        OLVClasses: 'Online Live Video Classes',
        ONLINE: '',
        cardContant: 'cardsContant',
        explore: '/iitjee_otc',
        liveclasses: '/iitjee_olvc',
        IMGposter1:[poster1],
        IMGposter2:[poster2],
        IMGposter3:[poster3],
        Examposter:'Examposter'         
        
    },
    {
        IMGuRL:[Img2],
        Title:'NEET',
        examPage: '/NeetExam',
        OnlineTestSeries: 'Online Test Series',
        OLVClasses: 'Online Live Video Classes',
        ONLINE: '',
        cardContant: 'cardsContant',
        explore: '/neetotc',
        liveclasses: '/neet_olvc',

    },
    {
        IMGuRL:[Img3],
        Title:'BITSAT',
        examPage: '/bitsatexam',
        OnlineTestSeries: 'Online Test Series',
        OLVClasses: 'Online Live Video Classes',
        ONLINE: '',
        cardContant: 'cardsContant',
        explore: '/bitsatots',
        liveclasses: '/bitsat_olvc',

    },
    {
        IMGuRL:[Img4],
        Title:'VITEEE',
        examPage: '/viteeeexam',
        OnlineTestSeries: 'Online Test Series',
        OLVClasses: 'Online Live Video Classes',
        ONLINE: '',
        cardContant: 'cardsContant',
        // explore: 'viteee'

    },
    {
        IMGuRL:[Img5],
        Title:'AP-EAPCET',
        examPage: '/apeamcetexam',
        OnlineTestSeries: 'Online Test Series',
        OLVClasses: 'Online Live Video Classes',
        ONLINE: '',
        cardContant: 'cardsContant',
        // explore: 'apeapcet'

    },
    {
        IMGuRL:[Img6],
        Title:'TS-EAMCET',
        examPage: '/tseamcetexam',
        OnlineTestSeries: 'Online Test Series',
        OLVClasses: 'Online Live Video Classes',
        ONLINE: '',
        cardContant: 'cardsContant',
        // explore: 'tseamcet'

    },
    {
        IMGuRL:[Img7],
        Title:'MHCET',
        examPage: '/mhcetexam',
        OnlineTestSeries: 'Online Test Series',
        OLVClasses: 'Online Live Video Classes',
        ONLINE: '',
        cardContant: 'cardsContant',
        // explore: 'mhcet'

    },
    {
        IMGuRL:[Img8],
        Title:'KCET',
        examPage: '/kcetexam',
        OnlineTestSeries: 'Online Test Series',
        OLVClasses: 'Online Live Video Classes',
        ONLINE: '',
        cardContant: 'cardsContant',
        // explore: 'kect'

    },
    {
        IMGuRL:[Img9],
        Title:'WBJEE',
        examPage: '/wbjeeexam',
        OnlineTestSeries: 'Online Test Series',
        OLVClasses: 'Online Live Video Classes',
        ONLINE: '',
        cardContant: 'cardsContant',
        // explore: 'wbjee'

    },
    {
        IMGuRL:[Img10],
        Title:'KEAM',
        examPage: '/keamexam',
        OnlineTestSeries: 'Online Test Series',
        OLVClasses: 'Online Live Video Classes',
        ONLINE: '',
        cardContant: 'cardsContant',
        // explore: 'keralacee'

    },
    {
        IMGuRL:[Img11],
        Title:'SRMJEE',
        examPage: '/srmjeeexam',
        OnlineTestSeries: 'Online Test Series',
        OLVClasses: 'Online Live Video Classes',
        ONLINE: '',
        cardContant: 'cardsContant',
        // explore: 'srmjee'

    },
]
