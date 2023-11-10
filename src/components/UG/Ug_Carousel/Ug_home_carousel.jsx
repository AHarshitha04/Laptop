// src/App.js
import React from 'react';
import img0 from './Ug_home_Images/bann2.png'
import img1 from './Ug_home_Images/banner1.png'
import img2 from './Ug_home_Images/banner2.png'
import img3 from './Ug_home_Images/banner3.png'
import img4 from './Ug_home_Images/banner4.png'
import Ug_carousal from './Ug_carousal';



const Ug_home_carousel = () => {
  const images = [
    [img0],
    [img1],
    [img2],
    [img3],
    [img4],

    
  ];

  return (
    <div>
      <h1>React Carousel</h1>
      <Ug_carousal images={images} />
    </div>
  );
};

export default Ug_home_carousel;