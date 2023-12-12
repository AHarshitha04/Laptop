



import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";

const Paper1 = () => {
  const [data, setData] = useState(null);
  const { subjectId, testCreationTableId } = useParams();
  const [Subjects, setSubjects] = useState([]);


  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all subjects
        const responseSubjects = await fetch(
          `http://localhost:5001/subjects/${testCreationTableId}`
        );
        const subjectsData = await responseSubjects.json();
        setSubjects(subjectsData);
        console.log(subjectsData);
  
        // Find the least subjectId
        const leastSubjectId = subjectsData.length > 0 ? Math.min(...subjectsData.map(subject => subject.subjectId)) : null;
  
        // If subjectId is not provided, set it to the least subjectId
        const defaultSubjectId = subjectId || leastSubjectId;
  
        // Fetch data for the default subject
        const response = await fetch(
          `http://localhost:5001/getPaperData/${testCreationTableId}/${defaultSubjectId}`
        );
        const result = await response.json();
        setData(result);
  
        // Construct the link with the least subjectId
        const linkUrl = `/subjects/${testCreationTableId}/${subjectId || leastSubjectId}`;
        // Use linkUrl as needed in your component
  
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, [testCreationTableId, subjectId]);
  
  



  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       // Fetch all subjects
  //       const responseSubjects = await fetch(
  //         `http://localhost:5001/subjects/${testCreationTableId}`
  //       );
  //       const subjectsData = await responseSubjects.json();
  //       setSubjects(subjectsData);
  //       console.log(subjectsData);
        

  //       // If subjectId is not provided, set it to the first subject
  //       // const subjectId ='1';
  //       // const defaultSubjectId = subjectId || subjectsData[0]?.subjectId;
  //       const defaultSubjectId = subjectId || (Subjects.length > 0 ? Subjects[0].subjectId : null);

  //       // Fetch data for the default subject
  //       const response = await fetch(
  //         `http://localhost:5001/getPaperData/${testCreationTableId}/${defaultSubjectId}`
  //       );
  //       const result = await response.json();
  //       setData(result);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };

  //   fetchData();
  // }, [testCreationTableId, subjectId]);


  
  const handleSubjectsClick = async (clickedSubjectId) => {
    setData(null);
    try {
      const response = await fetch(
        `http://localhost:5001/getPaperData/${testCreationTableId}/${clickedSubjectId}`
      );
      const subjectsData = await response.json();

      if (subjectsData && subjectsData.questions) {
        setData(subjectsData);
      } else {
        console.error('Invalid data format:', subjectsData);
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <div>
      <div className="subjects">
        {Subjects.map((subjectTitle) => (
          <li key={subjectTitle.subjectId}>
            <Link
              to="#"
              onClick={() => handleSubjectsClick(subjectTitle.subjectId)}
              className="subject-btn"
            >
        {/* {subjectTitle.subjectId[0]} */}
              {subjectTitle.subjectName}
            </Link>
          </li>
        ))}
      </div>
      {data !== null ? (
        data.questions.map((question, index) => (
          <div key={index}>
            <div className="question">
              <h3>{index + 1}</h3>
              <img
                src={`data:image/png;base64,${question.question_img}`}
                alt="Question"
              />
            </div>

            {/* Map over options and render them */}
            {data.options
              .filter((opt) => opt.question_id === question.question_id)
              .map((option) => (
                <div className="option" key={option.question_id}>
                  <img
                    src={`data:image/png;base64,${option.option_img}`}
                    alt="Option"
                  />
                </div>
              ))}
          </div>
        ))
      ) : (
        <p>Loading data...</p>
      )}
    </div>
  );
};

export default Paper1;





// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";

// const Paper1 = () => {
//   const [data, setData] = useState(null);
//   const { subjectId, testCreationTableId } = useParams();
//   const [Subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Fetch all subjects
//         const responseSubjects = await fetch(
//           `http://localhost:5001/subjects/${testCreationTableId}`
//         );
//         const subjectsData = await responseSubjects.json();
//         setSubjects(subjectsData);

//         // If subjectId is not provided, set it to the least subject id
//         const defaultSubjectId = subjectId || (subjectsData.length > 0 ? subjectsData.reduce((min, subject) => subject.subjectId < min ? subject.subjectId : min, subjectsData[0].subjectId) : null);

//         // Fetch data for the default subject
//         const response = await fetch(
//           `http://localhost:5001/getPaperData/${testCreationTableId}/${defaultSubjectId}`
//         );
//         const result = await response.json();
//         setData(result);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [testCreationTableId, subjectId]);

//   const handleSubjectsClick = async (clickedSubjectId) => {
//     setData(null);
//     try {
//       const response = await fetch(
//         `http://localhost:5001/getPaperData/${testCreationTableId}/${clickedSubjectId}`
//       );
//       const subjectsData = await response.json();

//       if (subjectsData && subjectsData.questions) {
//         setData(subjectsData);
//       } else {
//         console.error('Invalid data format:', subjectsData);
//       }
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <div className="subjects">
//         {Subjects.map((subjectTitle) => (
//           <li key={subjectTitle.subjectId}>
//             <Link
//               to="#"
//               onClick={() => handleSubjectsClick(subjectTitle.subjectId)}
//               className="subject-btn"
//             >
//               {subjectTitle.subjectName}
//             </Link>
//           </li>
//         ))}
//       </div>
//       {data !== null ? (
//         data.questions.map((question, index) => (
//           <div key={index}>
//             <div className="question">
//               <h3>{index + 1}</h3>
//               <img
//                 src={`data:image/png;base64,${question.question_img}`}
//                 alt="Question"
//               />
//             </div>

//             {/* Map over options and render them */}
//             {data.options
//               .filter((opt) => opt.question_id === question.question_id)
//               .map((option) => (
//                 <div className="option" key={option.question_id}>
//                   <img
//                     src={`data:image/png;base64,${option.option_img}`}
//                     alt="Option"
//                   />
//                 </div>
//               ))}
//           </div>
//         ))
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// };

// export default Paper1;






// import React, { useState, useEffect } from "react";
// import { useParams, Link } from "react-router-dom";

// const Paper1 = () => {
//   const [data, setData] = useState(null);
//   const { subjectId, testCreationTableId } = useParams();
//   const [Subjects, setSubjects] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5001/getPaperData/${testCreationTableId}/${subjectId}`
//         );
//         const result = await response.json();
//         setData(result);
//         console.log(data);
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [testCreationTableId, subjectId]);

//   useEffect(() => {
//     const fetchSubjects = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5001/subjects/${testCreationTableId}`
//         );
//         const subjectsData = await response.json();
//         setSubjects(subjectsData);

//         // Check if subjectId is not specified in the URL, set the first subject as default
//         if (!subjectId && subjectsData.length > 0) {
//           handleSubjectsClick(subjectsData[0].subjectId);
//         }
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchSubjects();
//   }, [testCreationTableId, subjectId]);

//   const handleSubjectsClick = async (subjectId) => {
//     setData(null);
//     try {
//       const response = await fetch(
//         `http://localhost:5001/getPaperData/${testCreationTableId}/${subjectId}`
//       );
//       const subjectsData = await response.json();

//       if (subjectsData && subjectsData.questions) {
//         setData(subjectsData);
//       } else {
//         console.error("Invalid data format:", subjectsData);
//       }

//       console.log(subjectId);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   return (
//     <div>
//       <div className="subjects">
//         {Subjects.map((subjectTitle) => (
//           <li key={subjectTitle.subjectId}>
//             <Link
//               to="#"
//               onClick={() => handleSubjectsClick(subjectTitle.subjectId)}
//               className="subject-btn"
//             >
//               {subjectTitle.subjectName}
//             </Link>
//           </li>
//         ))}
//       </div>
//       {data !== null ? (
//         data.questions.map((question, index) => (
//           <div key={index}>
//             <div className="question">
//               <h3>{index + 1}</h3>
//               <img
//                 src={`data:image/png;base64,${question.question_img}`}
//                 alt="Question"
//               />
//             </div>

//             {/* Map over options and render them */}
//             {data.options
//               .filter((opt) => opt.question_id === question.question_id)
//               .map((option) => (
//                 <div className="option" key={option.question_id}>
//                   <img
//                     src={`data:image/png;base64,${option.option_img}`}
//                     alt="Option"
//                   />
//                 </div>
//               ))}
//           </div>
//         ))
//       ) : (
//         <p>Loading data...</p>
//       )}
//     </div>
//   );
// };

// export default Paper1;


