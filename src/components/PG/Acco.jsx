
import React, { useState } from 'react'
import AccoData from './AccoData'

export const Acco = () => {
    const [openRow, setOpenRow] = useState(null);
    // const toggleRow = (rowIndex) => {
    //   if (openRows.includes(rowIndex)) {
    //     setOpenRows(openRows.filter((row) => row !== rowIndex));
    //   } else {
    //     setOpenRows([...openRows, rowIndex]);
    //   }
    // };

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
         {/* <table className="table">
        <thead>
          <tr>
            <th>Header 1</th>
            <th>Header 2</th>
          </tr>
        </thead>
        <tbody>
          {AccoData.map((row, index) => (
            <React.Fragment key={index}>
              <tr
                onClick={() => toggleRow(index)}
                className={`accordion-header ${openRow === index ? 'open' : ''}`}
              >
                <td>{row.column1}</td>
               
              </tr>
              {openRow === index && (
                <tr className="accordion-content">
                  <td colSpan="2">
                    <div>
                      {row.additionalInfo}
                      <h1>sdljfhsdj</h1>
                      <h3>dsjfhsdjh</h3>
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table> */}



             <div style={{cursor:'pointer'}}>
                {AccoData.map((ii,ind) => (           
                    <React.Fragment key={ind}>
                      <div onClick={() => toggleRow(ind)}className={`accordion-header ${openRow === ind ? 'open' : ''}`}>
                     <p>{ii.column1}</p>
                    </div>

                    {openRow === ind && (
                        <div>
                        {ii.additionalInfo}

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
