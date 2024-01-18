import React, { useState } from 'react'

const Employee_Information = () => {

  const [currentStep, setCurrentStep] = useState(1);
  const [languages, setLanguages] = useState([
    { name: '', read: false, write: false, communicate: false }
  ]);


  const addLanguageRow = (e) => {
    e.preventDefault();
    setLanguages((prevLanguages) => [
      ...prevLanguages,
      { name: '', read: false, write: false, communicate: false }
    ]);
  };

  const handleInputChange = (index, field, value) => {
    setLanguages((prevLanguages) => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages[index][field] = value;
      return updatedLanguages;
    });
  };

  const handleDeleteRow = (index) => {
    // index.preventDefault();
    setLanguages((prevLanguages) => {
      const updatedLanguages = [...prevLanguages];
      updatedLanguages.splice(index, 1);
      return updatedLanguages;
    });
  };

  const handleNext = () => {
    // Perform any necessary validation or data processing before moving to the next step
    if (currentStep < 3) {
      setCurrentStep((prevStep) => prevStep + 1);
    } else {
      // Handle submission or additional steps
    }
  };

  const handlePrevious = () => {
    // Perform any necessary validation or data processing before moving to the next step
    if (currentStep > 1) {
      setCurrentStep((prevStep) => prevStep - 1);
    } else {
      // Handle submission or additional steps
    }
  };


  return (
    <div className='emp_info'>
      {currentStep === 1 && (
        <div>

          <h1>Emoployee Information</h1>
          <div className='empinfo_form'>

            <form action="" className='emp_form'>

              {/* <div className='empinfo_inputs'>
                <label htmlFor="name" className='empinfo_label'>Job Role:</label>
                <input type="text" placeholder='Enter Your Role' className='empinfo_input_field' />
              </div> */}

              <div className='empinfo_inputs'>
                <label htmlFor="location" className='empinfo_label'>Job Role:</label>
                <select id="location" className='empinfo_input_field'>
                  <option value="select">--SELECT--</option>
                  <option value="hyderabad">Web Department</option>
                  <option value="bangalore">Typing Department</option>
                </select>
              </div>

              <div className='empinfo_inputs'>
                <label htmlFor="location" className='empinfo_label'>Location:</label>
                <select id="location" className='empinfo_input_field'>
                  <option value="select">--SELECT--</option>
                  <option value="hyderabad">Hyderabad</option>
                  <option value="bangalore">Bangalore</option>
                  <option value="online">Online</option>
                </select>
              </div>

              <div className='empinfo_inputs'>
                <label htmlFor="name" className='empinfo_label'>First Name: <br /><span className='emp_span'>(*As per your 10th certificates)</span> </label>
                <input type="text" placeholder='Enter Name' className='empinfo_input_field' />
              </div>


              <div className='empinfo_inputs'>
                <label htmlFor="name" className='empinfo_label'>Last Name:</label>
                <input type="text" placeholder='Enter Name' className='empinfo_input_field' />
              </div>

              <div className='empinfo_inputs'>
                <label htmlFor="name" className='empinfo_label'>Mother's Name:</label>
                <input type="text" placeholder='Enter Name' className='empinfo_input_field' />
              </div>

              <div className='empinfo_inputs'>
                <label htmlFor="name" className='empinfo_label'>Father's Name:</label>
                <input type="text" placeholder='Enter Name' className='empinfo_input_field' />
              </div>

              <div className='empinfo_inputs'>
                <label htmlFor="name" className='empinfo_label'>Personal Mailid:</label>
                <input type="email" placeholder='Enter Your Personal Emailid' className='empinfo_input_field' />
              </div>

              <div className='empinfo_inputs'>
                <label htmlFor="birthday" className='empinfo_label'>Date of Birth:</label>
                <input id='birthday' type="date" className='empinfo_input_field' />
              </div>

              <div className='empinfo_inputs_check'>
                <label htmlFor="name" className='empinfo_label'>Gender:</label>

                <input type="checkbox" className='empinfo_input_field' />
                <label htmlFor="name" className='empinfo_label_check'>Male</label>
                <input type="checkbox" className='empinfo_input_field' />
                <label htmlFor="name" className='empinfo_label_check'>Female</label>
              </div>

              <div className='empinfo_inputs_check'>
                <label htmlFor="name" className='empinfo_label'>Relationship Status:</label>

                <input type="checkbox" className='empinfo_input_field' />
                <label htmlFor="name" className='empinfo_label_check'>Single</label>
                <input type="checkbox" className='empinfo_input_field' />
                <label htmlFor="name" className='empinfo_label_check'>Married</label>
              </div>

              <div className='empinfo_inputs'>
                <label htmlFor="name" className='empinfo_label'>Mother Tongue:</label>
                <input type="text" placeholder='Enter Your Mother Tongue' className='empinfo_input_field' />
              </div>


              <div className='empinfo_inputs_check employee_table'>
                <table className='empinfo_table'>
                  <tr className='empinfo_tr'>
                    <th className='empinfo_th'>Languages Known</th>
                    <th className='empinfo_th'>Read</th>
                    <th className='empinfo_th'>Write</th>
                    <th className='empinfo_th'>Communicate</th>
                    <button onClick={addLanguageRow}>Add</button>
                  </tr>

                  {languages.map((language, index) => (
                    <tr key={index} className='empinfo_tr'>
                      <td className='empinfo_td'>
                        <input
                          type="text"
                          value={language.name}
                          onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                          className='empinfo_input_field'
                        />
                      </td>
                      <td className='empinfo_td'>
                        <input
                          type="checkbox"
                          checked={language.read}
                          onChange={(e) => handleInputChange(index, 'read', e.target.checked)}
                          className='empinfo_input_field'
                        />
                      </td>
                      <td className='empinfo_td'>
                        <input
                          type="checkbox"
                          checked={language.write}
                          onChange={(e) => handleInputChange(index, 'write', e.target.checked)}
                          className='empinfo_input_field'
                        />
                      </td>
                      <td className='empinfo_td'>
                        <input
                          type="checkbox"
                          checked={language.communicate}
                          onChange={(e) => handleInputChange(index, 'communicate', e.target.checked)}
                          className='empinfo_input_field'
                        />
                      </td>
                      <button type='button' onClick={(e) => handleDeleteRow(index, e)}>Delete</button>
                    </tr>
                  ))}
                </table>

              </div>
            </form>
          </div>
          <div className='emp_next_btn_div'>

            <button type='button' onClick={handleNext} className='emp_next_btn'>Next</button>
          </div>
        </div>

      )}


      {currentStep === 2 && (
        <div>

          <h1>Emoployee Bank Details</h1>
          <div className='empinfo_form'>

            <form action="" className='emp_form'>

              <div className='empinfo_inputs'>
                <label htmlFor="name" className='empinfo_label'>First Name:</label>
                <input type="text" placeholder='Enter Name' className='empinfo_input_field' />
              </div>

              <div className='empinfo_inputs'>
                <label htmlFor="name" className='empinfo_label'>Last Name:</label>
                <input type="text" placeholder='Enter Name' className='empinfo_input_field' />
              </div>




            </form>
          </div>
          <div className='emp_next_btn_div'>
            <button type='button' onClick={handlePrevious} className='emp_next_btn'>Back</button>
            <button type='button' onClick={handleNext} className='emp_next_btn'>Next</button>
          </div>
        </div>
      )}





    </div>
  )
}

export default Employee_Information




