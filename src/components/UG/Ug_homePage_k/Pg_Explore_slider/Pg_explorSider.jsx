import React from 'react'
import { Pg_exploreDAta } from './Pg_exploreDAta';


export const Pg_explorSider = () => {
   
        const images = [
          ['https://www.egradtutor.in/images.html/iitjee-pop.png'],
          ['https://cdn.pixabay.com/photo/2023/09/24/20/01/mushroom-8273752_640.jpg']
       
        ];
  return (
    <div>
          <Pg_exploreDAta images={images} />
    </div>
  )
}
