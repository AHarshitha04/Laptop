// src/App.js
import React from 'react';
import img0 from './IIT-JEE.png'

import IitJee from './IitJee';



const Iitjee_banners = () => {
  const images = [
    [img0],
 
  ];

  return (
    <div>
      <IitJee images={images} />
    </div>
  );
};

export default Iitjee_banners;