import React, { useState } from 'react'
import { EseExam } from './EseExam';

export const Ese_examPg = () => {
    const [openRow, setOpenRow] = useState(null);

    const toggleRow = (rowIndex) => {
        if (openRow === rowIndex) {
          // Clicking on an already open row, so close it
          setOpenRow(null);
        } else {
          setOpenRow(rowIndex);
        }
      };
  return (
    <div>

<div style={{cursor:'pointer'}}>
                {EseExam.map((ii,ind) => (           
                    <React.Fragment key={ind}>
                      <div onClick={() => toggleRow(ind)}className={`accordion-header ${openRow === ind ? 'open' : ''}`}>
                     <p>{ii.Title}</p>
                    </div>

                    {openRow === ind && (
                        <div>
                        {ii.Component}

                        <div>
                            {ii.com}
                        </div>
                            
                        </div>
                    )}

                    </React.Fragment>   
            
                 ))}

            </div>
    </div>
  )
}
