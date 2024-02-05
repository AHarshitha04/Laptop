// import React, { useEffect, useRef, useState } from "react";
// import {
//   General_intructions_page_content,
//   Navbar,
// } from "./DATA/Introduction_page_DATA";
// import { Link, useNavigate, useParams } from "react-router-dom";
// import axios from "axios";
// import { AiOutlineArrowRight } from "react-icons/ai";
// // import Paper from "../Paper/Paper";

// // import Paper1 from '../Paper/Paper1'
// // import Paper1 from '../Paper/Paper1';

// const General_intructions_page = () => {
//   return (
//     <>
//       <General_intructions_page_header />
//       <General_intructions_page_container seconds={600} />
//     </>
//   );
// };

// export default General_intructions_page;

// export const General_intructions_page_header = () => {
//   return (
//     <>
//       {Navbar.map((nav, index) => {
//         return (
//           <div className="Quiz_General_header" key={index}>
//             <h1>{nav.Q_page_title}</h1>
//             <div className="Q_title">{/* <p>{nav.time_limt}</p> */}</div>
//           </div>
//         );
//       })}
//     </>
//   );
// };

// export const General_intructions_page_container = ({ seconds }) => {
  
//   const [countdown, setCountdown] = useState(seconds);
//   const timerId = useRef();

//   useEffect(() => {
//     if (countdown <= 0) {
//       clearInterval(timerId.current);
//       alert("End");
//     }
//   }, [countdown]);
//   const navigate = useNavigate();
//   const startCountdown = () => {
//     timerId.current = setInterval(() => {
//       setCountdown((prev) => prev - 1);
//     }, 1000);
//     navigate("/Paper1");
//   };
//   const [isChecked, setIsChecked] = useState(false);

//   const handleCheckboxChange = (e) => {
//     setIsChecked(e.target.checked);
//   };

//   const [instructionsData, setInstructionsData] = useState([]);
//   const { examid, subjectId , testCreationTableId} = useParams();
//   console.log("examid:", examid);

//   useEffect(() => {
//     const fetchInstructions = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5001/fetchinstructions/${testCreationTableId}/`
//         );
//         const data = await response.json();
//         setInstructionsData(data);
//         // setSubjectData(instructionsData);
//         // console.log(instructionsData)
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchInstructions();
//   }, [testCreationTableId]);

//   const [SubjectData, setSubjectData] = useState([]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5001/subjectData/${subjectId}`
//         );
//         const data = await response.json();
//         setSubjectData(data);
//         console.log(SubjectData);
//       } catch (error) {
//         console.error(error);
//       }
//     };
//     fetchSubjects();
//   }, [subjectId]);


//   return (
//     <>
//       <div>
//         <h2>General Instructions</h2>
//         <ul>
//           {instructionsData.map((instruction, index) => (
//             <React.Fragment key={instruction.id}>
//               {index === 0 && <li>{instruction.instructionHeading}</li>}
//               <li>{instruction.points}</li>
//             </React.Fragment>
//           ))}
//         </ul>
//       </div>

//       <div>
//         {/* <input type="checkbox" onClick={checkbox}/> */}

//         <div className="gn_checkbox">
//           <input
//             type="checkbox"
//             onChange={handleCheckboxChange}
//             className="checkbox"
//           />
//           <p>
//             {" "}
//             I agree to these <b> Terms and Conditions.</b>
//           </p>
//         </div>
//       </div>

//       <div className="gn_next_btn_container">
//         {isChecked ? (
       

//             <Link
//             to={`/subjects/${testCreationTableId}/1`}
//             className="gn_next_btn"
//             >
//             I am ready to begin <AiOutlineArrowRight />
//           </Link>
       
//         ) : (
//           <div>
//             <span className="disabled-link gn_next_btn_bull ">
//               I am ready to begin <AiOutlineArrowRight />
//             </span>
//           </div>
//         )}
//       </div>

     
//     </>
//   );
// };













import React, { useEffect, useRef, useState } from "react";
import {
  General_intructions_page_content,
  Navbar,
} from "./DATA/Introduction_page_DATA";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { AiOutlineArrowRight } from "react-icons/ai";
// import Paper from "../Paper/Paper";

// import Paper1 from '../Paper/Paper1'
// import Paper1 from '../Paper/Paper1';

const General_intructions_page = () => {
  return (
    <>
      <General_intructions_page_header />
      <General_intructions_page_container seconds={600} />
    </>
  );
};

export default General_intructions_page;

export const General_intructions_page_header = () => {
  return (
    <>
      {Navbar.map((nav, index) => {
        return (
          <div className="Quiz_General_header" key={index}>
            <h1>{nav.Q_page_title}</h1>
            <div className="Q_title">{/* <p>{nav.time_limt}</p> */}</div>
          </div>
        );
      })}
    </>
  );
};

export const General_intructions_page_container = ({ seconds }) => {
  // const [subjectData, setSubjectData] = useState([]);

  // useEffect(() => {
  //   const fetchSubjects = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:4009/subjectData`
  //       );
  //       const data = await response.json();
  //       setSubjectData(data);
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchSubjects();
  // }, [testCreationTableId]);

  const [countdown, setCountdown] = useState(seconds);
  const timerId = useRef();

  useEffect(() => {
    if (countdown <= 0) {
      clearInterval(timerId.current);
      alert("End");
    }
  }, [countdown]);
  const navigate = useNavigate();
  const startCountdown = () => {
    timerId.current = setInterval(() => {
      setCountdown((prev) => prev - 1);
    }, 1000);
    navigate("/Paper1");
  };
  
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (e) => {
    setIsChecked(e.target.checked);
  };

  const [instructionsData, setInstructionsData] = useState([]);
  const { testCreationTableId, subjectId,sectionId } = useParams();
  console.log("testCreationTableId:", testCreationTableId);

  useEffect(() => {
    const fetchInstructions = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/Cards/fetchinstructions/${testCreationTableId}/`
        );
        const data = await response.json();
        setInstructionsData(data);
        // setSubjectData(instructionsData);
        // console.log(instructionsData)
      } catch (error) {
        console.error(error);
      }
    };

    fetchInstructions();
  }, [testCreationTableId, subjectId]);

  // sectionId
  const [SubjectData, setSubjectData] = useState([]);
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/Cards/subjectData/${subjectId}`
        );
        const data = await response.json();
        setSubjectData(data);
        console.log(SubjectData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSubjects();
  }, [subjectId]);

  const [SectionData, setSectionData] = useState([]);
  useEffect(() => {
    const fetchSections = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/Cards/fetchSections/${sectionId}`
        );
        const data = await response.json();
        setSectionData(data);
        console.log(SectionData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchSections();
  }, [subjectId]);



  // const [subjectId, setSubjectId] = useState([]);
  // const handlePaperData = async (typeOfTestId) => {
  //   console.log("working");
  //   try {
  //     // Fetch tests based on typeOfTestId
  //     const response = await fetch(
  //       `http://localhost:4009/feachingtestbytype/${typeOfTestId}`
  //     );
  //     const testData = await response.json();
  //     setSubjectId(testData);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  //   const [questionData, setQuestionData] = useState([]);
  // const [ setSubjectId] = useState([]);
  //   useEffect(() => {
  //     const fetchQuestionDataBySubjectId = async () => {
  //       try {
  //         const response = await fetch(
  //           `http://localhost:4009/getPaperData/${testCreationTableId}/${subjectId}`
  //         );
  //         const data = await response.json();

  //         // Check if the data has both 'questions' and 'options' properties
  //         if (data && data.questions && data.options) {
  //           // Assuming both questions and options are arrays, you might want to merge them
  //           const mergedData = data.questions.map((question, index) => ({
  //             ...question,
  //             options: data.options.slice(index * 4, (index + 1) * 4), // Assuming 4 options per question
  //           }));
  //           setQuestionData(mergedData);
  //         } else {
  //           const testData = await response.json();
  //           console.error("API response does not have expected structure:", data);
  //           setSubjectId(testData);
  //         }
  //       } catch (error) {
  //         console.error(error);
  //       }
  //     };

  //     fetchQuestionDataBySubjectId();
  //   }, [testCreationTableId]);

  // const [courseCreationId]=useParams('')

  // const [minsubjectid, setminsubjectid] = useState('');
  
  const [minsubjectid, setminsubjectid] = useState("");
  useEffect(() => {
    const fetchSubjects = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/Cards/subjectData2/${testCreationTableId}`
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();

        // Corrected line: Set the state using the retrieved data
        setSubjectData(data);
        console.log(data);

        if (data && data.length > 0) {
          // Find the minimum value of subjectId in the array
          const minSubjectId = Math.min(...data.map((item) => item.subjectId));

          // Log the minimum value to the console
          console.log("Minimum subjectId:", minSubjectId);
          
          setminsubjectid(minSubjectId);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchSubjects();
  }, [subjectId]);
  // useEffect(() => {
  //   const fetchSubjects = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:4009/subjectData/${courseCreationId}`
  //       );

  //       if (!response.ok) {
  //         throw new Error("Network response was not ok");
  //       }

  //       const data = await response.json();
  //       setSubjectData(data);

  //       if (data && data.length > 0) {
  //         // Find the minimum value of subjectId in the array
  //         const minSubjectId = Math.min(...data.map((item) => item.subjectId));

  //         // Log the minimum value to the console
  //         console.log("Minimum subjectId:", minSubjectId);

  //         setminsubjectid(minSubjectId);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchSubjects();
  // }, [subjectId]);

  const newWinRef = useRef(null);
  const openPopup = () => {
    newWinRef.current = window.open(
      `/getPaperData/${testCreationTableId}`,
      '_blank', // Use '_blank' to open in a new window or tab
      'width=1000,height=1000'
    );

    document.onmousedown = focusPopup;
    document.onkeyup = focusPopup;
    document.onmousemove = focusPopup;
  };

  const focusPopup = () => {
    if (newWinRef.current && !newWinRef.current.closed) {
      newWinRef.current.focus();
    }
  };


  return (
    <>
      <div className="Instructions_container">
        <h1>General Instructions</h1>
        <ul className="Instructions_points">
          {instructionsData.map((instruction, index) => (
            <React.Fragment key={instruction.id}>
              {index === 0 && <h2>{instruction.instructionHeading}</h2>}
              <li className="Instructions_points_list">{instruction.points}</li>
            </React.Fragment>
          ))}
        </ul>
      </div>

      <div>
        {/* <input type="checkbox" onClick={checkbox}/> */}

        <div className="gn_checkbox">
          <input
            type="checkbox"
            onChange={handleCheckboxChange}
            className="checkbox"
          />
          <p>
            I agree to these <b> Terms and Conditions.</b>
          </p>
        </div>
      </div>

      <div className="gn_next_btn_container">
        {isChecked ? (
          //  to="/Paper1" {`/quiz_all/${testCreationTableId}`}
          // <Link to={`/getPaperData/${testCreationTableId}/${subjectId}`}  className="gn_next_btn">
          // <Link to={`/getPaperData/${testCreationTableId}`} onClick={handlePaperData} className="gn_next_btn">
          // {/* <Link to={`/quiz_all/${testCreationTableId}`}  className="gn_next_btn"> */}
          //  {/* <Link to={`/quiz_all/${testCreationTableId}`}  className="gn_next_btn"> */}
          //   I am ready to begin <AiOutlineArrowRight />
          // </Link>

          // <Link
          //   to={`/getPaperData/${testCreationTableId}`}
          //   className="gn_next_btn"
          // >
          // <>
          // {questionData.map((subjectIdData)=>(
          //        <Link Link
          //   to={`/getPaperData/${subjectIdData.testCreationTableId}/${subjectIdData.subjectId}`}
          //   className="gn_next_btn"
          //   >
          //   I am ready to begin <AiOutlineArrowRight />
          // </Link>
          // ))}
          // </>
          // <Link to={`/subjects/${testCreationTableId}`}
          //   className="gn_next_btn"
          //   >
          // <Link
          //   to={`/getPaperData/${testCreationTableId}/${subjectId}`}
          //   className="gn_next_btn"
          //   >
          //   I am ready to begin <AiOutlineArrowRight />
          // </Link>
          // <div>{SubjectData.map((data)=>(
          //   <Link
          //   to={`/getPaperData/${testCreationTableId}/${data.subjectId}`}
          //   className="gn_next_btn"
          //   >
          //   I am ready to begin <AiOutlineArrowRight />
          // </Link>
          // ))}</div>
          //
           //-------------------------------WORKING CODE-----------------------------------
          //   <Link
          //   // to={`/subjects/${testCreationTableId}/${minsubjectid}`}
          //   to={`/subjects/${testCreationTableId}/1`}

          //   className="gn_next_btn"

          //   // to={`/General_intructions_page/${test.testCreationTableId}/${minsubjectid}`}
          //   >
          //   I am ready to begin <AiOutlineArrowRight />
          // </Link>
            //-------------------------------WORKING CODE-----------------------------------
          // <Link
          //   to={`/subjects/${testCreationTableId}/${
          //     subjectId || leastSubjectId
          //   }`}
          //   className="gn_next_btn"
          // >
          //   I am ready to begin <AiOutlineArrowRight />
          // </Link>
          // to={`/getPaperData/${testCreationTableId}`} 
          <Link
            // to={`/subjects/${testCreationTableId}/${minsubjectid}`}
            // to={`/getPaperData/${testCreationTableId}/${minsubjectid}`}
            //  onClick={openPopup}
            //  to={`/getPaperData/${testCreationTableId}`} 
            // to={`/QuestionPaper/questionOptions/${testCreationTableId}`} 
            className="gn_next_btn"
            to={`/QuestionPaper/questionOptions/${testCreationTableId}`} 
            
            // to={`/General_intructions_page/${test.testCreationTableId}/${minsubjectid}`}
            >
            I am ready to begin <AiOutlineArrowRight />
          </Link>
        ) : (
          <div>
            <span className="disabled-link gn_next_btn_bull ">
              I am ready to begin <AiOutlineArrowRight />
            </span>
          </div>
        )}
      </div>

      {/* 
      {SubjectData.map((data) => (
        <Link
          key={data.subjectId}
          to={`/General_intructions_page/${testCreationTableId}/${data.subjectId}`}
          className="intro_next_btn"
        >
          NEXT <AiOutlineArrowRight />
        </Link>
      ))} */}
    </>
  );
};

// {/* {General_intructions_page_content.map((gipc, index) => {
//           return (
//               <div key={index} className="Q_container g_container">
//                   <h3>{gipc.gnheading}</h3>

//                   <div className="Gn_table">
//                       <table>
//                           <tr>
//                               <th>{gipc.gn_table_heading1}</th>
//                               <th>{gipc.gn_table_heading2}</th>
//                               <th>{gipc.gn_table_heading3}</th>
//                           </tr>

//                           <tr>
//                               <th>{gipc.m}</th>
//                               <td>{gipc.mq}</td>
//                               <td>{gipc.mm}</td>
//                           </tr>
//                           <tr>
//                               <th>{gipc.p}</th>
//                               <td>{gipc.pq}</td>
//                               <td>{gipc.pm}</td>
//                           </tr>
//                           <tr>
//                               <th>{gipc.c}</th>
//                               <td>{gipc.cq}</td>
//                               <td>{gipc.cm}</td>
//                           </tr>
//                           <tr>
//                               <td>{gipc.t}</td>
//                               <th>{gipc.tq}</th>
//                               <th>{gipc.tm}</th>
//                           </tr>
//                       </table>
//                   </div>
//                   < ul className="gn_points">
//                       <li>
//                           This test contains
//                           <strong>
//                               90&nbsp;questions (need to answer 75 questions).
//                           </strong>
//                           &nbsp;
//                       </li>

//                       <li>
//                           Total duration of the test is <strong>180&nbsp;minutes.</strong>
//                       </li>

//                       <li>
//                           There are <strong>3 sections</strong> in the question paper
//                           consisting of{" "}
//                           <strong>Physics, Chemistry and Mathematics</strong> having{" "}
//                           <strong>30&nbsp;questions</strong> in each section (
//                           <strong>20 MCQs + 10 Numeric Value</strong> Answer Based
//                           Questions).
//                       </li>

//                       <li>
//                           <strong>Single Choice Type questions</strong>&nbsp;are
//                           allotted <strong>4 (Four)</strong> marks for each question
//                           answered correctly and <strong>1 (One) mark</strong> will be
//                           deducted for <strong>indicating incorrect </strong>response.
//                       </li>

//                       <li><strong>Numerical</strong> <strong>Value</strong> &nbsp;Type questions are allotted <strong>4 (Four)</strong> marks for each question answered correctly and<strong>&nbsp;1&nbsp;(one) marks</strong> will be deducted for <strong>indicating incorrect</strong> response.</li>

//                       <li>
//                           In each section in{" "}
//                           <strong>
//                               Numerical Value Type Questions, 5 Questions out of 10 can be
//                               attempted.
//                           </strong>
//                       </li>

//                       <li>In each section in <strong>Numerical Value Type Questions, 5 Questions out of 10 can be attempted.</strong></li>
//                       <li>
//                           In all the sections, <strong>No deduction</strong> from the
//                           total score will be made if <strong>no response</strong> is
//                           indicated.
//                       </li>

//                       <li>
//                           The countdown timer at the top right corner of screen will
//                           display the remaining time available for you to complete the
//                           examination. When the timer reaches zero, the examination will
//                           end by itself.
//                       </li>

//                       <li>Use a scribble pad for any rough work.</li>

//                       <li>You are not allowed to use a calculator.</li>

//                   </ul>
//               </div>
//           );
//       })}

