import React, { useState, useEffect } from 'react';
import "./styles/TestActivation_admin.css";

const TestActivation_admin = () => {
  const [tests, setTests] = useState([]);
  const [isActive, setIsActive] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:5001/TestActivation/5');
        const data = await response.json();
        setTests(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  


  const handleButtonClick = () => {
    // Check conditions for activation
    const isActivationAllowed = tests.every(test => {
      return test.subjects.every(subject => {
        return subject.sections.every(section => {
          return section.numberOfQuestions === section.numberOfQuestionsInSection;
        }) 
      }) ;
    });

    // Update isActive state based on conditions
    if (isActivationAllowed) {
      setIsActive(!isActive);
    } else {
      console.log('Activation not allowed. Conditions not met.');
    }
  };
 

  return (
    <div>
      <div className='Test_Activation_Admin_conatiner'>
        <h2>Test Activation Admin</h2>

        <div className='Test_Activation_Admin_subconatiner'>
          {tests.map(test => (
            <div className='Test_Activation_Admin_ecahcard' key={test.testCreationTableId}>
              <h3>{test.TestName}</h3>

              <div className='Test_Activation_Admin_ecahcard_info'>
                {test.subjects.map(subject => (
                  <div className='Test_Activation_Admin_ecahcard_subjectName' key={subject.subjectId}>

                    <span>{subject.subjectName}<p>({subject.numberOfQuestionsInSubject})</p></span>
                    {subject.sections.map(section => (
                      <div className='Test_Activation_Admin_ecahcard_section_quntion' key={section.sectionId}>
                        <p>{section.sectionName}</p>
                        <p title={section.numberOfQuestions}> {section.numberOfQuestionsInSection}</p>
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <button onClick={handleButtonClick} title='click to activate the test' className={isActive ? 'active' : 'inactive'}>
        {isActive ? 'Active' : 'Inactive'}
      </button>
            </div>
          ))}
        </div>
      </div>

   
    </div>
  );
};

export default TestActivation_admin;
