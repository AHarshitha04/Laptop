import React from 'react'
import { Pg_exploreDAta } from './Pg_exploreDAta';
import gate from './gateweb.png'

export const Pg_explorSider = () => {
   
        const images = [
          [gate]
       
        ];
  return (
    <div>
          <Pg_exploreDAta images={images} />
    </div>
  )
}
