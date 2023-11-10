import React from 'react';

import AccoData from './AccoData'
import { Acco } from './Acco';
import { Ese_examPg } from './ExamPageComponent/Ese_examPg';



export const PgEseExam = () => {


  return (
    <>
     <h1>Accordion Table Example</h1>
      <Acco data={AccoData} />

      <Ese_examPg data={Ese_examPg} />
     
    </>
  )
}
