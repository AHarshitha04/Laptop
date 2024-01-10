// import React, { useState, useEffect } from "react";
// import { useParams, Link, useNavigate } from "react-router-dom";
// import axios from "axios";
// import ButtonsFunctionality from "./ButtonsFunctionality";
// import "./styles/Paper.css";

// const QuestionPaper = () => {
//   const [data, setData] = useState({ questions: [] });
//   // const [questionData, setQuestionData] = useState({ questions: [] });
//   const [questionData, setQuestionData] = useState({});

//   const { subjectId, testCreationTableId, userId } = useParams();
//   const [Subjects, setSubjects] = useState([]);
//   const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
//   const [selectedSubject, setSelectedSubject] = useState(null);
//   const [questionStatus, setQuestionStatus] = useState(
//     Array.isArray(questionData) ? Array(questionData.questions.length).fill("notAnswered")
//       : []
//   );
//   const [sections, setSections] = useState([]);
//   const [currentQuestionType, setCurrentQuestionType] = useState(null);

//   const navigate = useNavigate();
//   const [answeredCount, setAnsweredCount] = useState(0);
//   const [notAnsweredCount, setNotAnsweredCount] = useState(0);
//   const [answeredmarkedForReviewCount, setAnsweredmarkedForReviewCount] =
//     useState(0);
//   const [markedForReviewCount, setMarkedForReviewCount] = useState(0);
//   const [VisitedCount, setVisitedCount] = useState(0);
//   const [showExamSumary, setShowExamSumary] = useState(false);
//   const calculateQuestionCounts = () => {
//     let answered = 0;
//     let notAnswered = 0;
//     let markedForReview = 0;
//     let answeredmarkedForReviewCount = 0;
//     let VisitedCount = 0;

//     questionStatus.forEach((status, index) => {
//       if (status === "answered") {
//         answered++;
//       } else if (status === "notAnswered") {
//         notAnswered++;
//       } else if (status === "marked") {
//         markedForReview++;
//       } else if (status === "Answered but marked for review") {
//         answeredmarkedForReviewCount++;
//       } else if (status === "notVisited") {
//         VisitedCount++;
//       }
//     });

//     return {
//       answered,
//       notAnswered,
//       markedForReview,
//       answeredmarkedForReviewCount,
//       VisitedCount,
//     };
//   };



//   const updateCounters = () => {
//     let answered = 0;
//     let notAnswered = 0;
//     let marked = 0;
//     let markedForReview = 0;
//     let Visited = 0;

//     questionStatus.forEach((status) => {
//       if (status === "answered") {
//         answered++;
//       } else if (status === "notAnswered") {
//         notAnswered++;
//       } else if (status === "marked") {
//         marked++;
//       } else if (status === "Answered but marked for review") {
//         markedForReview++;
//       } else if (status === "notVisited") {
//         Visited++;
//       }
//     });

//     setAnsweredCount(answered);
//     setNotAnsweredCount(notAnswered);
//     setAnsweredmarkedForReviewCount(marked);
//     setMarkedForReviewCount(markedForReview);
//     setVisitedCount(Visited);
//   };

//   useEffect(() => {
//     // Call the updateCounters function initially when the component mounts
//     updateCounters();
//   }, [questionStatus]);


//   const [selectedAnswers, setSelectedAnswers] = useState(
//     Array(questionData.length).fill("")
//   );

//   const handleQuestionSelect = (questionNumber) => {
//     setCurrentQuestionIndex(questionNumber - 1);
//     setActiveQuestion(questionNumber - 1);
//   };


//   const handlePreviousClick = () => {
//     setCurrentQuestionIndex((prevIndex) => {
//       // Save the current timer value for the question
//       const updatedTimers = [...timers];
//       updatedTimers[prevIndex] = timer;
//       setTimers(updatedTimers);
//       // Move to the previous question
//       return prevIndex - 1;
//     });

//     setActiveQuestion((prevActiveQuestion) => prevActiveQuestion - 1);
//   };

//   const clearResponse = async () => {
//     try {
//       const questionId =
//         questionData.questions[currentQuestionIndex].question_id;
//       console.log("Response cleared successfully");
//       // Clear response for radio buttons (MCQ)
//       const updatedSelectedAnswersMap1 = { ...selectedAnswersMap1 };
//       updatedSelectedAnswersMap1[questionId] = null;
//       setSelectedAnswersMap1(updatedSelectedAnswersMap1);

//       // Clear response for checkboxes (MSQ)
//       const updatedSelectedAnswersMap2 = { ...selectedAnswersMap2 };
//       updatedSelectedAnswersMap2[questionId] = [];
//       setSelectedAnswersMap2(updatedSelectedAnswersMap2);

//       // Send a request to your server to clear the user's response for the current question
//       const response = await axios.delete(
//         `http://localhost:5001/QuestionPaper/clearResponse/${questionId}`
//       );

//       if (response.status === 200) {
//         console.log("Response cleared successfully");
//         // Update any state or perform additional actions as needed
//       } else {
//         console.error("Failed to clear response:", response.data);
//       }
//     } catch (error) {
//       console.error("Error clearing response:", error);
//     }
//   };

//   const [clickCount, setClickCount] = useState(0);

//   const [answeredQuestionsMap, setAnsweredQuestionsMap] = useState({});
//   const correctAnswer =
//     data && data.questions && data.questions[currentQuestionIndex]
//       ? data.questions[currentQuestionIndex].correct_answer
//       : null; // or provide a default value based on your logic

//   // /user

//   //user name

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           "http://localhost:5001/ughomepage_banner_login/user",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Attach token to headers for authentication
//             },
//           }
//         );

//         if (response.ok) {
//           const userData = await response.json();
//           setUserData(userData);
//           // console.log(userData);
//         } else {
//           // Handle errors, e.g., if user data fetch fails
//         }
//       } catch (error) {
//         // Handle other errors
//       }
//     };

//     fetchUserData();
//   }, []);

//   useEffect(() => {
//     const counts = calculateQuestionCounts();
//     setAnsweredCount(counts.answered);
//     setNotAnsweredCount(counts.notAnswered);
//     setMarkedForReviewCount(counts.markedForReview);
//     setAnsweredmarkedForReviewCount(counts.answeredmarkedForReviewCount);
//     setVisitedCount(counts.VisitedCount);
//   }, [questionStatus]);

//   const handleSubmit = () => {
//     window.alert("Your Test has been Submitted!! Click Ok to See Result.");
//     setShowExamSumary(true);
//     calculateResult();
//     const counts = calculateQuestionCounts();
//     setAnsweredCount(counts.answered);
//     setNotAnsweredCount(counts.notAnswered);
//     setMarkedForReviewCount(counts.markedForReview);
//     setAnsweredmarkedForReviewCount(counts.answeredmarkedForReviewCount);
//     setVisitedCount(counts.VisitedCount);
//   };

//   const [selectedAnswersMap1, setSelectedAnswersMap1] = useState({});
//   const [selectedAnswersMap2, setSelectedAnswersMap2] = useState({});
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const responseSubjects = await fetch(
//           `http://localhost:5001/QuestionPaper/subjects/${testCreationTableId}`
//         );
//         const subjectsData = await responseSubjects.json();
//         setSubjects(subjectsData);

//         const leastSubjectId =
//           subjectsData.length > 0
//             ? Math.min(...subjectsData.map((subject) => subject.subjectId))
//             : null;

//         const defaultSubjectId = subjectId || leastSubjectId;

//         const selectedAnswersForSubject =
//           selectedAnswersMap1[defaultSubjectId] || [];
//         setSelectedAnswers(selectedAnswersForSubject);

//         const linkUrl = `/subjects/${testCreationTableId}/${subjectId || leastSubjectId
//           }`;
//       } catch (error) {
//         console.error("Error fetching data:", error);
//       }
//     };

//     fetchData();
//   }, [testCreationTableId, subjectId, selectedAnswersMap1]);

//   const [timer, setTimer] = useState(0);
//   const [timers, setTimers] = useState(Array(data));
//   const formatTime = (seconds) => {
//     const hours = Math.floor(seconds / 3600);
//     const minutes = Math.floor((seconds % 3600) / 60);
//     const remainingSeconds = seconds % 60;
//     return `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes
//       }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
//   };

//   useEffect(() => {
//     setTimer(timers[currentQuestionIndex] || 0);
//     let interval;
//     interval = setInterval(() => {
//       setTimer((prevTimer) => prevTimer + 1);
//     }, 1000);

//     return () => {
//       clearInterval(interval);
//     };
//   }, [currentQuestionIndex, timers]);

//   const onAnswerSelected1 = (optionIndex) => {
//     console.log("User ID:", userData.user_Id);
//     console.log("Test Creation Table ID:", testCreationTableId);
//     const questionId = questionData.questions[currentQuestionIndex].question_id;
//     const charcodeatopt = String.fromCharCode("a".charCodeAt(0) + optionIndex);
//     const questionIndex = currentQuestionIndex + 1;
//     console.log(`Question Index: ${questionIndex}`);
//     console.log(`Clicked Option Index: ${charcodeatopt}`);
//     setSelectedAnswersMap1((prevMap) => ({
//       ...prevMap,
//       [questionId]: optionIndex,
//     }));
//     setSelectedAnswersMap2((prevMap) => ({
//       ...prevMap,
//       [questionId]: [],
//     }));
//   };

//   const onAnswerSelected2 = (optionIndex) => {
//     console.log("User ID:", userData.user_Id);
//     console.log("Test Creation Table ID:", testCreationTableId);
//     const questionId = questionData.questions[currentQuestionIndex].question_id;
//     const charcodeatopt = String.fromCharCode("a".charCodeAt(0) + optionIndex);
//     const questionIndex = currentQuestionIndex + 1;
//     console.log(`Question Index: ${questionIndex}`);
//     console.log(`Clicked Option Index: ${charcodeatopt}`);
//     setSelectedAnswersMap2((prevMap) => {
//       const updatedSelection = [...(prevMap[questionId] || [])];
//       const index = updatedSelection.indexOf(optionIndex);

//       if (index !== -1) {
//         updatedSelection.splice(index, 1);
//       } else {
//         updatedSelection.push(optionIndex);
//       }

//       return {
//         ...prevMap,
//         [questionId]: updatedSelection,
//       };
//     });
//   };

//   // const [showExamSumary, setShowExamSumary] = useState(false);
//   const calculateResult = () => {
//     // // Make sure answeredQuestions is defined before accessing its length
//     // const totalAttempted = answeredQuestions ? answeredQuestions.length : 0;
//     // // const totalCorrect = result.correctAnswers;
//   };

//   const handleYes = () => {
//     navigate("/SubmitPage");
//   };

//   const [activeQuestion, setActiveQuestion] = useState(0);


//   const markForReview = () => {
//     // Update questionStatus for the marked question
//     const updatedQuestionStatus = [...questionStatus];
//     if (selectedAnswers[activeQuestion]) {
//       updatedQuestionStatus[activeQuestion] = "Answered but marked for review";
//       if (selectedAnswers[activeQuestion] === "Answered but marked for review") {
//         updatedQuestionStatus[activeQuestion] = "Answered but marked for review";
//       }
//     } else if (!selectedAnswers[activeQuestion]) {
//       updatedQuestionStatus[activeQuestion] = "marked";
//     }

//     setQuestionStatus(updatedQuestionStatus);
//   };

//   // const [questionData, setQuestionData] = useState({});
//   const { sectionId } = useParams();

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
//         );

//         if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//         }

//         const data = await response.json();
//         setQuestionData(data);
//       } catch (error) {
//         console.error("Error fetching question data:", error);
//       }
//     };

//     fetchData();
//   }, [testCreationTableId]);

//   const currentQuestion =
//     questionData.questions && questionData.questions[currentQuestionIndex];

//   const [userData, setUserData] = useState({});

//   useEffect(() => {
//     const fetchUserData = async () => {
//       try {
//         const token = localStorage.getItem("token");
//         const response = await fetch(
//           "http://localhost:5001/ughomepage_banner_login/user",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`, // Attach token to headers for authentication
//             },
//           }
//         );

//         if (response.ok) {
//           const userData = await response.json();
//           setUserData(userData);
//           // console.log(userData);
//         } else {
//           // Handle errors, e.g., if user data fetch fails
//         }
//       } catch (error) {
//         // Handle other errors
//       }
//     };

//     fetchUserData();
//   }, []);


//   const [answeredQuestions, setAnsweredQuestions] = useState([]);
//   const [isPaused, setIsPaused] = useState(false);


//   const handleNextQuestion = async () => {
//   // // ------------------------------------ button functionality --------------------------------------------

//   // updateCounters();
//   // // Get the current question index
//   // const questionIndex = currentQuestionIndex;

//   // // Check if the current question is already answered
//   // if (questionStatus[questionIndex] !== "answered") {
//   //   // If not answered, mark it as answered
//   //   setQuestionStatus((prevQuestionStatus) => [
//   //     ...prevQuestionStatus.slice(0, questionIndex),
//   //     "answered",
//   //     ...prevQuestionStatus.slice(questionIndex + 1),
//   //   ]);

//   //   // Update other necessary state or perform additional logic
//   //   setAnsweredQuestions((prevAnsweredQuestions) => [
//   //     ...prevAnsweredQuestions,
//   //     questionIndex + 1,
//   //   ]);
//   //   setIsPaused(false);
//   // }

//   // // --------------------------------end of button functionality --------------------------------------------------
//   setCurrentQuestionIndex((prevIndex) => {
//     if (prevIndex < data.questions.length - 1) {
//       return prevIndex + 1;
//     }
//   });
//     const response = await fetch(
//       `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
//     );


//     try {
//       // --------------------------------saving------------------------------
//       const response = await fetch(
//         `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
//       );
//       console.log("User ID:", userData.user_Id);
//       console.log("Test Creation Table ID:", testCreationTableId);


//       if (!questionData || !questionData.questions) {
//         console.error("Data or questions are null or undefined");
//         return;
//       }

//       setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

//       const currentQuestion = questionData.questions[currentQuestionIndex];
//       const questionId = currentQuestion.question_id;

//       const selectedOption1 = selectedAnswersMap1[questionId];
//       const selectedOption2 = selectedAnswersMap2[questionId];

//       const optionIndexes1 =
//         selectedOption1 !== undefined ? [selectedOption1] : [];
//       const optionIndexes2 =
//         selectedOption2 !== undefined ? selectedOption2 : [];

//       if (answeredQuestionsMap[questionId]) {
//         const updatedResponse = {
//           optionIndexes1: optionIndexes1.map((index) =>
//             String.fromCharCode("a".charCodeAt(0) + index)
//           ),
//           optionIndexes2: optionIndexes2.map((index) =>
//             String.fromCharCode("a".charCodeAt(0) + index)
//           ),
//         };

//         const updateResponse = await axios.put(
//           `http://localhost:5001/QuestionPaper/updateResponse/${userId}`,
//           {
//             updatedResponse,
//             user_Id: userData.userId,
//             testCreationTableId: testCreationTableId,
//           }
//         );

//         console.log(updateResponse.data);
//         console.log("Handle Next Click - Response Updated");
//       } else {
//         const responses = {
//           [questionId]: {
//             optionIndexes1: optionIndexes1.map((index) =>
//               String.fromCharCode("a".charCodeAt(0) + index)
//             ),
//             optionIndexes2: optionIndexes2.map((index) =>
//               String.fromCharCode("a".charCodeAt(0) + index)
//             ),
//           },
//         };

//         const saveResponse = await axios.post(
//           "http://localhost:5001/QuestionPaper/response",
//           {
//             responses: responses, // Make sure to include 'responses'
//             user_Id: userData.user_Id, // Use 'user_Id' from userData
//             testCreationTableId: testCreationTableId,
//           }
//         );

//         console.log(saveResponse.data);
//         console.log("Handle Next Click - New Response Saved");

//         setAnsweredQuestionsMap((prevMap) => ({
//           ...prevMap,
//           [questionId]: true,
//         }));
//       }
//       console.log("Request Payload:", {
//         // responses,
//         response: response,
//         user_Id: userData.userId,
//         testCreationTableId: testCreationTableId,
//       });

//       console.log("Parsed userId:", userId);
//       console.log("Parsed testCreationTableId:", testCreationTableId);

//       console.log("User ID:", userData.user_Id); // Check if this is correct
//       console.log("Parsed userId:", userId);
//       // console.log(responses);

//       setClickCount((prevCount) => prevCount + 1);
//       // --------------------------------saving------------------------------
//     } catch (error) {
//       console.error("Error handling next question:", error);
//     }

  
//   }


  

//   // const handleNextQuestion = async () => {
//   //   setCurrentQuestionIndex((prevIndex) => prevIndex + 1);

//   //   const response = await fetch(
//   //     // http://localhost:5001/QuestionPaper/questionType/61
//   //     `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
//   //   );

//   //   // console.log(testCreationTableId);

//   //   try {
//   //     console.log("User ID:", userData.user_Id);
//   //     console.log("Test Creation Table ID:", testCreationTableId);
//   //     // -------------------------------saving----------------------------
//   //  if (!data || !data.questions) {
//   //   console.error("Data or questions are null or undefined");
//   //   return;
//   // }

//   //     const currentQuestion = data.questions[currentQuestionIndex];
//   //     const selectedOption1 = selectedAnswersMap1[currentQuestion.question_id];
//   //     const selectedOption2 = selectedAnswersMap2[currentQuestion.question_id];

//   //     const optionIndexes1 =
//   //       selectedOption1 !== undefined ? [selectedOption1] : [];
//   //     const optionIndexes2 =
//   //       selectedOption2 !== undefined ? selectedOption2 : [];

//   //     const questionId = currentQuestion.question_id;

//   //     if (answeredQuestionsMap[questionId]) {
//   //       const updatedResponse = {
//   //         optionIndexes1: optionIndexes1.map((index) =>
//   //           String.fromCharCode("a".charCodeAt(0) + index)
//   //         ),
//   //         optionIndexes2: optionIndexes2.map((index) =>
//   //           String.fromCharCode("a".charCodeAt(0) + index)
//   //         ),
//   //       };

//   //       const updateResponse = await axios.put(
//   //         `http://localhost:5001/QuestionPaper/updateResponse/${userId}`,
//   //         {
//   //           updatedResponse,
//   //         }
//   //       );

//   //       console.log(updateResponse.data);
//   //       console.log("Handle Next Click - Response Updated");
//   //     } else {
//   //       const responses = {
//   //         [questionId]: {
//   //           optionIndexes1: optionIndexes1.map((index) =>
//   //             String.fromCharCode("a".charCodeAt(0) + index)
//   //           ),
//   //           optionIndexes2: optionIndexes2.map((index) =>
//   //             String.fromCharCode("a".charCodeAt(0) + index)
//   //           ),
//   //         },
//   //       };

//   //       const saveResponse = await axios.post(
//   //         "http://localhost:5001/QuestionPaper/response",
//   //         {
//   //           responses,
//   //         }
//   //       );

//   //       console.log(saveResponse.data);
//   //       console.log("Handle Next Click - New Response Saved");

//   //       setAnsweredQuestionsMap((prevMap) => ({
//   //         ...prevMap,
//   //         [questionId]: true,
//   //       }));
//   //     }

//   //     setClickCount((prevCount) => prevCount + 1);
//   //     // --------------------------------saving------------------------------
//   //   } catch {}
//   // };

//   const [questionTypes, setQuestionTypes] = useState([]);

//   useEffect(() => {
//     const fetchQuestionTypes = async () => {
//       try {
//         if (questionData && questionData.questions) {
//           const qID = questionData.questions[currentQuestionIndex].question_id;

//           const responseQuestionTypes = await fetch(
//             `http://localhost:5001/QuestionPaper/questionType/${qID}`
//           );
//           const questionTypes = await responseQuestionTypes.json();
//           setQuestionTypes(questionTypes);
//           // console.log(responseQuestionTypes);
//           const currentQuestionType = questionTypes.find(
//             (q) => q.question_id === qID
//           );

//           setCurrentQuestionType(currentQuestionType);
//         }
//       } catch (error) {
//         console.error("Error fetching question types:", error);
//       }
//     };

//     fetchQuestionTypes();
//   }, [questionData, currentQuestionIndex]);



//   const updateQuestionStatus = (index, status) => {
//     // Update the question status in the QuestionPaper component
//     const updatedQuestionStatus = [...questionStatus];
//     updatedQuestionStatus[index] = status;
//     setQuestionStatus(updatedQuestionStatus);
//   };

//   const uniqueOptionIds = new Set(currentQuestion.options.map(opt => opt.option_id));
//   const uniqueOptions = Array.from(uniqueOptionIds)
//   .map(optionId => currentQuestion.options.find(opt => opt.option_id === optionId));

//   return (
//     <div>
//       {!showExamSumary ? (
//         <div>
//           <div className="subjects">
//             {Subjects.map((subjectTitle) => (
//               <li key={subjectTitle.subjectId}>
//                 <button
//                   //   onClick={() => handleSubjectsClick(subjectTitle.subjectId)}
//                   className="subject_btn"
//                 >
//                   {subjectTitle.subjectName}
//                 </button>
//               </li>
//             ))}
//             <h3>
//               Question Type:
//               {questionTypes.map((type) => (
//                 <li key={type.quesionTypeId}>
//                   <p>{type.typeofQuestion}</p>
//                 </li>
//               ))}
//             </h3>

//             <div className="right-header">
//               <div className="marks">
//                 Marks: <div className="plus-mark">+1</div>
//                 <div className="minus-mark">-1</div>
//               </div>
//               <div>Timer: {formatTime(timer)}</div>
//             </div>
//           </div>
          
//           <div>
//             {questionData.questions && questionData.questions.length > 0 && (
//               <div
//                 key={currentQuestionIndex}
//                 className="question-container"
//                 style={{ display: "flex" }}
//               >
//                 <div>
//                   <div>
//                     <h3>Question: {currentQuestion.sortid.sortid_text}</h3>

//                     <img
//                       src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${currentQuestion.questionImgName}`}
//                       alt={`Question ${currentQuestion.question_id}`}
//                     />
//                     <div>
                
//                     {currentQuestion.options && Array.isArray(currentQuestion.options) &&
//                 currentQuestion.options
//                   .filter(
//                     (opt) =>
//                       opt.question_id ===
//                       questionData.questions[currentQuestionIndex]?.question_id
//                   ).map((option, optionIndex) => (
//                           <div className="option" key={option.option_id}>
//                             <li key={optionIndex}>
//                               {/* {console.log("Option:", option)}
//                                 {console.log("Option Index:", option.option_index)} */}
//                               {currentQuestionType &&
//                                 currentQuestionType.typeofQuestion &&
//                                 currentQuestionType.typeofQuestion
//                                   .toLowerCase()
//                                   .includes(
//                                     "mcq(multiple choice question)"
//                                   ) && (
//                                   <div>
                                  
//                                     <input
//                                       type="radio"
//                                       name={`question-${currentQuestionIndex}-option`}
//                                       value={String.fromCharCode(
//                                         "A".charCodeAt(0) + optionIndex
//                                       )}
//                                       checked={
//                                         selectedAnswersMap1[
//                                         questionData.questions[
//                                           currentQuestionIndex
//                                         ]?.question_id
//                                         ] === optionIndex
//                                       }
//                                       onChange={() =>
//                                         onAnswerSelected1(optionIndex)
//                                       }
//                                     />
//                                     (
//                                     {String.fromCharCode(
//                                       "a".charCodeAt(0) + optionIndex
//                                     )}
//                                     )
//                                     <img
//                                       src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${option.optionImgName}`}
//                                       alt={`Option ${option.option_id}`}
//                                     />
//                                   </div>
//                                 )}
                                
//                               {currentQuestionType &&
//                                 currentQuestionType.typeofQuestion &&
//                                 currentQuestionType.typeofQuestion
//                                   .toLowerCase()
//                                   .includes(
//                                     "msq(multiple selection question)"
//                                   ) && (
//                                   <div>
//                                     {" "}
//                                     <input
//                                       type="checkbox"
//                                       name={`question-${currentQuestionIndex}-optionIndex`}
//                                       value={String.fromCharCode(
//                                         "A".charCodeAt(0) + optionIndex
//                                       )}
//                                       checked={
//                                         selectedAnswersMap2[
//                                         questionData.questions[
//                                           currentQuestionIndex
//                                         ]?.question_id
//                                         ] &&
//                                         selectedAnswersMap2[
//                                           questionData.questions[
//                                             currentQuestionIndex
//                                           ]?.question_id
//                                         ].includes(optionIndex)
//                                       }
//                                       onChange={() =>
//                                         onAnswerSelected2(optionIndex)
//                                       }
//                                     />
//                                     (
//                                     {String.fromCharCode(
//                                       "a".charCodeAt(0) + optionIndex
//                                     )}
//                                     )
//                                     <img
//                                       src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${option.optionImgName}`}
//                                       alt={`Option ${option.option_id}`}
//                                     />{" "}
//                                   </div>
//                                 )}

//                               {currentQuestionType &&
//                                 currentQuestionType.typeofQuestion &&
//                                 currentQuestionType.typeofQuestion
//                                   .toLowerCase()
//                                   .includes("nat(numerical answer type)") && (
//                                   <input
//                                     type="text"
//                                     name={`question-${currentQuestionIndex}`}
//                                     value={
//                                       selectedAnswersMap2[
//                                       questionData.questions[
//                                         currentQuestionIndex
//                                       ]?.question_id
//                                       ] || ""
//                                     }
//                                     onChange={(e) =>
//                                       onAnswerSelected2(e.target.value)
//                                     }
//                                   />
//                                 )}

//                               {currentQuestionType &&
//                                 currentQuestionType.typeofQuestion &&
//                                 currentQuestionType.typeofQuestion
//                                   .toLowerCase()
//                                   .includes("True/False Questions") && (
//                                   <>
//                                     <input
//                                       type="radio"
//                                       name={`question-${currentQuestionIndex}-option`}
//                                       value="true"
//                                       checked={
//                                         selectedAnswersMap1[
//                                         questionData.questions[
//                                           currentQuestionIndex
//                                         ]?.question_id
//                                         ] === "true"
//                                       }
//                                       onChange={() => onAnswerSelected1("true")}
//                                     />
//                                     True
//                                     <input
//                                       type="radio"
//                                       name={`question-${currentQuestionIndex}-option`}
//                                       value="false"
//                                       checked={
//                                         selectedAnswersMap1[
//                                         questionData.questions[
//                                           currentQuestionIndex
//                                         ]?.question_id
//                                         ] === "false"
//                                       }
//                                       onChange={() =>
//                                         onAnswerSelected1("false")
//                                       }
//                                     />
//                                     False
//                                   </>
//                                 )}


//                             </li>
//                           </div>
//                         ))}




//                     </div>
//                   </div>
//                   <div>
//                     <button className="clear-btn" onClick={markForReview}>
//                       Mark for Review & Next
//                     </button>
//                     <button className="clear-btn" onClick={clearResponse}>
//                       Clear Response
//                     </button>
//                     <button
//                       className="previous-btn"
//                       onClick={handlePreviousClick}
//                       disabled={currentQuestionIndex === 0}
//                     >
//                       <i className="fa-solid fa-angles-left"></i> Previous
//                     </button>
//                     <button onClick={handleNextQuestion}>Next</button>
//                   </div>
//                 </div>
//                 <div className="rightsidebar">
//                   <ButtonsFunctionality
//                     onQuestionSelect={handleQuestionSelect}
//                     questionStatus={questionStatus}
//                     setQuestionStatus={setQuestionStatus}
//                     answeredCount={answeredCount}
//                     notAnsweredCount={notAnsweredCount}
//                     answeredmarkedForReviewCount={answeredmarkedForReviewCount}
//                     markedForReviewCount={markedForReviewCount}
//                     VisitedCount={VisitedCount}
//                     selectedSubject={selectedSubject}
//                     questionData={questionData}
//                     updateQuestionStatus={updateQuestionStatus}
//                   />
//                   <button onClick={handleSubmit} id="resume_btn">
//                     Submit
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className="result">
//           <h3 id="result_header">Exam Summary</h3>
//           <div className="result_page_links"></div>
//           <div className="result_contents">
//             <p>
//               Total Questions: <span>{questionData.questions.length}</span>
//             </p>
//             <p>
//               Answered Questions:<span> {questionData.AnsweredQuestions}</span>
//             </p>
//             <p>
//               Not Answered Questions:
//               <span> {questionData.NotAnsweredQuestions}</span>
//             </p>
//             <p>
//               Marked for Review Questions:
//               <span> {questionData.MarkedforReviewQuestions}</span>
//             </p>
//             <p>
//               Answered & Marked for Review Questions:
//               <span> {questionData.AnsweredAndMarkedforReviewQuestions}</span>
//             </p>
//           </div>
//           <div>
//             <h2>
//               Are you sure you want to submit for final marking? <br />
//               No changes will be allowed after submission.
//             </h2>
//             <button onClick={handleYes}>YES</button>
//             <button>NO</button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default QuestionPaper;



















import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonsFunctionality from "./ButtonsFunctionality";
import "./styles/Paper.css";
 
const QuestionPaper = () => {
  // const [data, setData] = useState({ questions: [] });
  // const [questionData, setQuestionData] = useState({ questions: [] });
  const [questionData, setQuestionData] = useState({});
 
  const { subjectId, testCreationTableId , userId} = useParams();
  const [Subjects, setSubjects] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questionStatus, setQuestionStatus] = useState(
    Array.isArray(questionData) ? Array(questionData.questions.length).fill("notAnswered")
      : []
  );
  const [sections, setSections] = useState([]);
  const [currentQuestionType, setCurrentQuestionType] = useState(null);
 
  const navigate = useNavigate();
  const [answeredCount, setAnsweredCount] = useState(0);
  const [notAnsweredCount, setNotAnsweredCount] = useState(0);
  const [answeredmarkedForReviewCount, setAnsweredmarkedForReviewCount] =
    useState(0);
  const [markedForReviewCount, setMarkedForReviewCount] = useState(0);
  const [VisitedCount, setVisitedCount] = useState(0);
  const [showExamSumary, setShowExamSumary] = useState(false);
  const calculateQuestionCounts = () => {
    let answered = 0;
    let notAnswered = 0;
    let markedForReview = 0;
    let answeredmarkedForReviewCount = 0;
    let VisitedCount = 0;
 
    questionStatus.forEach((status, index) => {
      if (status === "answered") {
        answered++;
      } else if (status === "notAnswered") {
        notAnswered++;
      } else if (status === "marked") {
        markedForReview++;
      } else if (status === "Answered but marked for review") {
        answeredmarkedForReviewCount++;
      } else if (status === "notVisited") {
        VisitedCount++;
      }
    });
 
    return {
      answered,
      notAnswered,
      markedForReview,
      answeredmarkedForReviewCount,
      VisitedCount,
    };
  };
 
 
 
  const updateCounters = () => {
    let answered = 0;
    let notAnswered = 0;
    let marked = 0;
    let markedForReview = 0;
    let Visited = 0;
 
    questionStatus.forEach((status) => {
      if (status === "answered") {
        answered++;
      } else if (status === "notAnswered") {
        notAnswered++;
      } else if (status === "marked") {
        marked++;
      } else if (status === "Answered but marked for review") {
        markedForReview++;
      } else if (status === "notVisited") {
        Visited++;
      }
    });
 
    setAnsweredCount(answered);
    setNotAnsweredCount(notAnswered);
    setAnsweredmarkedForReviewCount(marked);
    setMarkedForReviewCount(markedForReview);
    setVisitedCount(Visited);
  };
 
  useEffect(() => {
    // Call the updateCounters function initially when the component mounts
    updateCounters();
  }, [questionStatus]);
 
 
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questionData.length).fill("")
  );
 
  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestionIndex(questionNumber - 1);
    setActiveQuestion(questionNumber - 1);
  };
 
 
  const handlePreviousClick = () => {
    setCurrentQuestionIndex((prevIndex) => {
      // Save the current timer value for the question
      const updatedTimers = [...timers];
      updatedTimers[prevIndex] = timer;
      setTimers(updatedTimers);
      // Move to the previous question
      return prevIndex - 1;
    });
 
    setActiveQuestion((prevActiveQuestion) => prevActiveQuestion - 1);
  };
 
  const clearResponse = async () => {
    try {
      const questionId =
        questionData.questions[currentQuestionIndex].question_id;
      console.log("Response cleared successfully");
      // Clear response for radio buttons (MCQ)
      const updatedSelectedAnswersMap1 = { ...selectedAnswersMap1 };
      updatedSelectedAnswersMap1[questionId] = null;
      setSelectedAnswersMap1(updatedSelectedAnswersMap1);
 
      // Clear response for checkboxes (MSQ)
      const updatedSelectedAnswersMap2 = { ...selectedAnswersMap2 };
      updatedSelectedAnswersMap2[questionId] = [];
      setSelectedAnswersMap2(updatedSelectedAnswersMap2);
 
      // Send a request to your server to clear the user's response for the current question
      const response = await axios.delete(
        `http://localhost:5001/QuestionPaper/clearResponse/${questionId}`
      );
 
      if (response.status === 200) {
        console.log("Response cleared successfully");
        // Update any state or perform additional actions as needed
      } else {
        console.error("Failed to clear response:", response.data);
      }
    } catch (error) {
      console.error("Error clearing response:", error);
    }
  };
 
  const [clickCount, setClickCount] = useState(0);
 
  const [answeredQuestionsMap, setAnsweredQuestionsMap] = useState({});
  // const correctAnswer =
  //   data && data.questions && data.questions[currentQuestionIndex]
  //     ? data.questions[currentQuestionIndex].correct_answer
  //     : null; // or provide a default value based on your logic
 
  // /user
 
  //user name
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5001/ughomepage_banner_login/user",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to headers for authentication
            },
          }
        );
 
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          // console.log(userData);
        } else {
          // Handle errors, e.g., if user data fetch fails
        }
      } catch (error) {
        // Handle other errors
      }
    };
 
    fetchUserData();
  }, []);
 
  useEffect(() => {
    const counts = calculateQuestionCounts();
    setAnsweredCount(counts.answered);
    setNotAnsweredCount(counts.notAnswered);
    setMarkedForReviewCount(counts.markedForReview);
    setAnsweredmarkedForReviewCount(counts.answeredmarkedForReviewCount);
    setVisitedCount(counts.VisitedCount);
  }, [questionStatus]);
 
  const handleSubmit = () => {
    window.alert("Your Test has been Submitted!! Click Ok to See Result.");
    setShowExamSumary(true);
    calculateResult();
    const counts = calculateQuestionCounts();
    setAnsweredCount(counts.answered);
    setNotAnsweredCount(counts.notAnswered);
    setMarkedForReviewCount(counts.markedForReview);
    setAnsweredmarkedForReviewCount(counts.answeredmarkedForReviewCount);
    setVisitedCount(counts.VisitedCount);
  };
 
  const [selectedAnswersMap1, setSelectedAnswersMap1] = useState({});
  const [selectedAnswersMap2, setSelectedAnswersMap2] = useState({});
  const [selectedAnswersMap3, setSelectedAnswersMap3] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      try {
        const responseSubjects = await fetch(
          `http://localhost:5001/QuestionPaper/subjects/${testCreationTableId}`
        );
        const subjectsData = await responseSubjects.json();
        setSubjects(subjectsData);
 
        const leastSubjectId =
          subjectsData.length > 0
            ? Math.min(...subjectsData.map((subject) => subject.subjectId))
            : null;
 
        const defaultSubjectId = subjectId || leastSubjectId;
 
        const selectedAnswersForSubject =
          selectedAnswersMap1[defaultSubjectId] || [];
        setSelectedAnswers(selectedAnswersForSubject);
 
        const linkUrl = `/subjects/${testCreationTableId}/${subjectId || leastSubjectId
          }`;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
 
    fetchData();
  }, [testCreationTableId, subjectId, selectedAnswersMap1]);
 
  const [timer, setTimer] = useState(0);
  const [timers, setTimers] = useState(Array(questionData));
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 9 ? hours : "0" + hours}:${minutes > 9 ? minutes : "0" + minutes
      }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
  };
 
  useEffect(() => {
    setTimer(timers[currentQuestionIndex] || 0);
    let interval;
    interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer + 1);
    }, 1000);
 
    return () => {
      clearInterval(interval);
    };
  }, [currentQuestionIndex, timers]);
 
  const onAnswerSelected1 = (optionIndex) => {
    const questionId = questionData.questions[currentQuestionIndex].question_id;
    const charcodeatopt = String.fromCharCode("a".charCodeAt(0) + optionIndex);
    const questionIndex = currentQuestionIndex + 1;
    console.log(`Question Index: ${questionIndex}`);
    console.log(`Clicked Option Index: ${charcodeatopt}`);
    setSelectedAnswersMap1((prevMap) => ({
      ...prevMap,
      [questionId]: optionIndex,
    }));
    setSelectedAnswersMap2((prevMap) => ({
      ...prevMap,
      [questionId]: [],
    }));
 
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeQuestion] = optionIndex;
    setSelectedAnswers(updatedSelectedAnswers);
 
    const updatedQuestionStatus = [...questionStatus];
    updatedQuestionStatus[activeQuestion] = "answered";
    setQuestionStatus(updatedQuestionStatus);
  };
 
  const onAnswerSelected2 = (optionIndex) => {
    const questionId = questionData.questions[currentQuestionIndex].question_id;
    const charcodeatopt = String.fromCharCode("a".charCodeAt(0) + optionIndex);
    const questionIndex = currentQuestionIndex + 1;
    console.log(`Question Index: ${questionIndex}`);
    console.log(`Clicked Option Index: ${charcodeatopt}`);
    setSelectedAnswersMap2((prevMap) => {
      const updatedSelection = [...(prevMap[questionId] || [])];
      const index = updatedSelection.indexOf(optionIndex);
 
      if (index !== -1) {
        updatedSelection.splice(index, 1);
      } else {
        updatedSelection.push(optionIndex);
      }
 
      return {
        ...prevMap,
        [questionId]: updatedSelection,
      };
    });
 
    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeQuestion] = optionIndex;
    setSelectedAnswers(updatedSelectedAnswers);
 
    const updatedQuestionStatus = [...questionStatus];
    updatedQuestionStatus[activeQuestion] = "answered";
    setQuestionStatus(updatedQuestionStatus);
  };
 

  const onAnswerSelected3 = (e) => {
    const optionIndex = e.target.value;
    const questionId = questionData.questions[currentQuestionIndex].question_id;
    const charcodeatopt = String.fromCharCode("a".charCodeAt(0) + optionIndex);
    const questionIndex = currentQuestionIndex + 1;
    console.log(`Question Index: ${questionIndex}`);
    console.log(`Clicked Option Index: ${charcodeatopt}`);


    setSelectedAnswersMap3((prevMap) => {
      const updatedSelection = [...(prevMap[questionId] || [])];
      const index = updatedSelection.indexOf(optionIndex);
  
      if (index !== -1) {
        updatedSelection.splice(index, 1);
      } else {
        updatedSelection.push(optionIndex);
      }
  
      return {
        ...prevMap,
        [questionId]: updatedSelection,
      };
    });
  }
  







  // const [showExamSumary, setShowExamSumary] = useState(false);
  const calculateResult = () => {
    // // Make sure answeredQuestions is defined before accessing its length
    // const totalAttempted = answeredQuestions ? answeredQuestions.length : 0;
    // // const totalCorrect = result.correctAnswers;
  };
 
  const handleYes = () => {
    navigate("/SubmitPage");
  };
 
  const [activeQuestion, setActiveQuestion] = useState(0);
 
 
  const markForReview = () => {
    // Update questionStatus for the marked question
    const updatedQuestionStatus = [...questionStatus];
    if (selectedAnswers[activeQuestion]) {
      updatedQuestionStatus[activeQuestion] = "Answered but marked for review";
      if (selectedAnswers[activeQuestion] === "Answered but marked for review") {
        updatedQuestionStatus[activeQuestion] = "Answered but marked for review";
      }
    } else if (!selectedAnswers[activeQuestion]) {
      updatedQuestionStatus[activeQuestion] = "marked";
    }
 
    setQuestionStatus(updatedQuestionStatus);
  };
 
  // const [questionData, setQuestionData] = useState({});
  const { sectionId } = useParams();
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
        );
 
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
 
        const data = await response.json();
        setQuestionData(data);
      } catch (error) {
        console.error("Error fetching question data:", error);
      }
    };
 
    fetchData();
  }, [testCreationTableId]);
 
  const currentQuestion =
    questionData.questions && questionData.questions[currentQuestionIndex];
 
  const [userData, setUserData] = useState({});
 
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5001/ughomepage_banner_login/user",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Attach token to headers for authentication
            },
          }
        );
 
        if (response.ok) {
          const userData = await response.json();
          setUserData(userData);
          // console.log(userData);
        } else {
          // Handle errors, e.g., if user data fetch fails
        }
      } catch (error) {
        // Handle other errors
      }
    };
 
    fetchUserData();
  }, []);
 
 
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
 


  // const handleNextQuestion = async () => {
  // setCurrentQuestionIndex((prevIndex) => {
  //   if (prevIndex < questionData.questions.length - 1) {
  //     return prevIndex + 1;
  //   }
  // });
  // }

  const handleNextQuestion = async () => {
    // Move to the next question
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questionData.questions.length - 1) {
        return prevIndex + 1;
      }
    });
    // Save the user response to the backend
    const questionId = questionData.questions[currentQuestionIndex].question_id;
    const response = selectedAnswers[activeQuestion];

    try {
      await axios.post("http://localhost:5001/storeUserResponse", {
        userId: userId,
        testCreationTableId: testCreationTableId,
        questionId: questionId,
        response: response,
      });

      
    } catch (error) {
      console.error("Error storing user response:", error);
      // Handle the error as needed
    }
  };

  
  

 
 
  const [questionTypes, setQuestionTypes] = useState([]);
 
  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        if (questionData && questionData.questions) {
          const qID = questionData.questions[currentQuestionIndex].question_id;
 
          const responseQuestionTypes = await fetch(
            `http://localhost:5001/QuestionPaper/questionType/${qID}`
          );
          const questionTypes = await responseQuestionTypes.json();
          setQuestionTypes(questionTypes);
          // console.log(responseQuestionTypes);
          const currentQuestionType = questionTypes.find(
            (q) => q.question_id === qID
          );
 
          setCurrentQuestionType(currentQuestionType);
        }
      } catch (error) {
        console.error("Error fetching question types:", error);
      }
    };
 
    fetchQuestionTypes();
  }, [questionData, currentQuestionIndex]);
 
 
 
  const updateQuestionStatus = (index, status) => {
    // Update the question status in the QuestionPaper component
    const updatedQuestionStatus = [...questionStatus];
    updatedQuestionStatus[index] = status;
    setQuestionStatus(updatedQuestionStatus);
  };
 
  return (
    <div>
      {!showExamSumary ? (
        <div>
          <div className="subjects">
            {Subjects.map((subjectTitle) => (
              <li key={subjectTitle.subjectId}>
                <button
                  //   onClick={() => handleSubjectsClick(subjectTitle.subjectId)}
                  className="subject_btn"
                >
                  {subjectTitle.subjectName}
                </button>
              </li>
            ))}
            <h3>
              Question Type:
              {questionTypes.map((type) => (
                <li key={type.quesionTypeId}>
                  <p>{type.typeofQuestion}</p>
                </li>
              ))}
            </h3>
 
            <div className="right-header">
              <div className="marks">
                Marks: <div className="plus-mark">+1</div>
                <div className="minus-mark">-1</div>
              </div>
              <div>Timer: {formatTime(timer)}</div>
            </div>
          </div>
          <div>
            {questionData.questions && questionData.questions.length > 0 && (
              <div
                key={currentQuestionIndex}
                className="question-container"
                style={{ display: "flex" }}
              >
                <div>
                  <div>
                    <h3>Question: {currentQuestion.sortid.sortid_text}</h3>
 
                    <img
                      src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${currentQuestion.questionImgName}`}
                      alt={`Question ${currentQuestion.question_id}`}
                    />
                    <div>
                      {currentQuestion.options &&
                        Array.isArray(currentQuestion.options) &&
                        currentQuestion.options.filter(
                          (opt) =>
                            opt.question_id ===
                            questionData.questions[currentQuestionIndex]
                              ?.question_id
                        ) &&
                        currentQuestion.options.map((option, optionIndex) => (
                          <div className="option" key={option.option_id}>
                            <li key={optionIndex}>
                              {/* {console.log("Option:", option)}
                                {console.log("Option Index:", option.option_index)} */}
                              {currentQuestionType &&
                                currentQuestionType.typeofQuestion &&
                                currentQuestionType.typeofQuestion
                                  .toLowerCase()
                                  .includes(
                                    "mcq(multiple choice question)"
                                  ) && (
                                  <div>
                                    {" "}
                                    <input
                                      type="radio"
                                      name={`question-${currentQuestionIndex}-option`}
                                      value={String.fromCharCode(
                                        "A".charCodeAt(0) + optionIndex
                                      )}
                                      checked={
                                        selectedAnswersMap1[
                                        questionData.questions[
                                          currentQuestionIndex
                                        ]?.question_id
                                        ] === optionIndex
                                      }
                                      onChange={() =>
                                        onAnswerSelected1(optionIndex)
                                      }
                                    />
                                    (
                                    {String.fromCharCode(
                                      "a".charCodeAt(0) + optionIndex
                                    )}
                                    )
                                    <img
                                      src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${option.optionImgName}`}
                                      alt={`Option ${option.option_id}`}
                                    />
                                  </div>
                                )}
                              {currentQuestionType &&
                                currentQuestionType.typeofQuestion &&
                                currentQuestionType.typeofQuestion
                                  .toLowerCase()
                                  .includes(
                                    "msq(multiple selection question)"
                                  ) && (
                                  <div>
                                    {" "}
                                    <input
                                      type="checkbox"
                                      name={`question-${currentQuestionIndex}-optionIndex`}
                                      value={String.fromCharCode(
                                        "A".charCodeAt(0) + optionIndex
                                      )}
                                      checked={
                                        selectedAnswersMap2[
                                        questionData.questions[
                                          currentQuestionIndex
                                        ]?.question_id
                                        ] &&
                                        selectedAnswersMap2[
                                          questionData.questions[
                                            currentQuestionIndex
                                          ]?.question_id
                                        ].includes(optionIndex)
                                      }
                                      onChange={() =>
                                        onAnswerSelected2(optionIndex)
                                      }
                                    />
                                    (
                                    {String.fromCharCode(
                                      "a".charCodeAt(0) + optionIndex
                                    )}
                                    )
                                    <img
                                      src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${option.optionImgName}`}
                                      alt={`Option ${option.option_id}`}
                                    />{" "}
                                  </div>
                                )}
                              {currentQuestionType &&
                                currentQuestionType.typeofQuestion &&
                                currentQuestionType.typeofQuestion
                                  .toLowerCase()
                                  .includes("nat(numerical answer type)") && (
                                  <input
                                    type="text"
                                    name={`question-${currentQuestionIndex}`}
                                    value={
                                      selectedAnswersMap3[
                                      questionData.questions[
                                        currentQuestionIndex
                                      ]?.question_id
                                      ] || ""
                                    }
                                    onChange={(e) =>
                                      onAnswerSelected3(e.target.value)
                                    }
                                  />
                                )}
                              {currentQuestionType &&
                                currentQuestionType.typeofQuestion &&
                                currentQuestionType.typeofQuestion
                                  .toLowerCase()
                                  .includes("True/False Questions") && (
                                  <>
                                    <input
                                      type="radio"
                                      name={`question-${currentQuestionIndex}-option`}
                                      value="true"
                                      checked={
                                        selectedAnswersMap1[
                                        questionData.questions[
                                          currentQuestionIndex
                                        ]?.question_id
                                        ] === "true"
                                      }
                                      onChange={() => onAnswerSelected1("true")}
                                    />
                                    True
                                    <input
                                      type="radio"
                                      name={`question-${currentQuestionIndex}-option`}
                                      value="false"
                                      checked={
                                        selectedAnswersMap1[
                                        questionData.questions[
                                          currentQuestionIndex
                                        ]?.question_id
                                        ] === "false"
                                      }
                                      onChange={() =>
                                        onAnswerSelected1("false")
                                      }
                                    />
                                    False
                                  </>
                                )}
 
 
                            </li>
                          </div>
                        ))}
 
 
                    </div>
                  </div>
                  <div>
                    <button className="clear-btn" onClick={markForReview}>
                      Mark for Review & Next
                    </button>
                    <button className="clear-btn" onClick={clearResponse}>
                      Clear Response
                    </button>
                    <button
                      className="previous-btn"
                      onClick={handlePreviousClick}
                      disabled={currentQuestionIndex === 0}
                    >
                      <i className="fa-solid fa-angles-left"></i> Previous
                    </button>
                    <button onClick={handleNextQuestion}>Next</button>
                  </div>
                </div>
                <div className="rightsidebar">
                  <ButtonsFunctionality
                    onQuestionSelect={handleQuestionSelect}
                    questionStatus={questionStatus}
                    setQuestionStatus={setQuestionStatus}
                    answeredCount={answeredCount}
                    notAnsweredCount={notAnsweredCount}
                    answeredmarkedForReviewCount={answeredmarkedForReviewCount}
                    markedForReviewCount={markedForReviewCount}
                    VisitedCount={VisitedCount}
                    selectedSubject={selectedSubject}
                    questionData={questionData}
                    updateQuestionStatus={updateQuestionStatus}
                  />
                  <button onClick={handleSubmit} id="resume_btn">
                    Submit
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      ) : (
        <div className="result">
          <h3 id="result_header">Exam Summary</h3>
          <div className="result_page_links"></div>
          <div className="result_contents">
            <p>
              Total Questions: <span>{questionData.questions.length}</span>
            </p>
            <p>
              Answered Questions:<span> {answeredCount}</span>
            </p>
            <p>
              Not Answered Questions:
              <span> {notAnsweredCount}</span>
            </p>
            {/* <p>
              Marked for Review Questions:
              <span> {questionData.MarkedforReviewQuestions}</span>
            </p>
            <p>
              Answered & Marked for Review Questions:
              <span> {questionData.AnsweredAndMarkedforReviewQuestions}</span>
            </p> */}
          </div>
          <div>
            <h2>
              Are you sure you want to submit for final marking? <br />
              No changes will be allowed after submission.
            </h2>
            <button onClick={handleYes}>YES</button>
            <button>NO</button>
          </div>
        </div>
      )}
    </div>
  );
};
 
export default QuestionPaper;
 