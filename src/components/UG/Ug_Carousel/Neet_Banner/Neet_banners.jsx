// src/App.js
import React from 'react';
import img0 from './neet_banner.png'

import Neet from './Neet';



const Neet_banners = () => {
  const images = [
    [img0],
 
  ];

  return (
    <div>
      <Neet images={images} />
    </div>
  );
};

export default Neet_banners;