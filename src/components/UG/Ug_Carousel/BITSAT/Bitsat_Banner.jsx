// src/App.js
import React from 'react';
import img0 from './BITSAT_Banner.png'

import Bitsat from './Bitsat';



const Bitsat_Banner = () => {
  const images = [
    [img0],
 
  ];

  return (
    <div>
      <Bitsat images={images} />
    </div>
  );
};

export default Bitsat_Banner;