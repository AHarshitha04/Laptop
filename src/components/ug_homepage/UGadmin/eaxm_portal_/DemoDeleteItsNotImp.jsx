import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonsFunctionality from "./ButtonsFunctionality";

import DemoDeleteItsNotImp2 from "./DemoDeleteItsNotImp2";

import "./styles/Paper.css";
//logo in header
import logo from "./asserts/egradtutor_logo.png";

const QuestionPaper = () => {
  // --------------------------------------CONST VARIABLES DECLARATIONS--------------------------
  const [questionData, setQuestionData] = useState({ questions: [] });
  const [value, setValue] = useState("");

  const { subjectId, testCreationTableId, userId, question_id, user_Id } =
    useParams();
  const [Subjects, setSubjects] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questionStatus, setQuestionStatus] = useState(
    Array.isArray(questionData)
      ? Array(questionData.questions.length).fill("notAnswered")
      : []
  );
  const [sections, setSections] = useState([]);
  const [currentQuestionType, setCurrentQuestionType] = useState(null);

  console.log("hiii");
  console.log("calculator:", value);
  // console.log("calculator:", setValue)
  const navigate = useNavigate();
  const [answeredCount, setAnsweredCount] = useState(0);
  const [notAnsweredCount, setNotAnsweredCount] = useState(0);
  const [answeredmarkedForReviewCount, setAnsweredmarkedForReviewCount] =
    useState(0);
  const [markedForReviewCount, setMarkedForReviewCount] = useState(0);
  const [VisitedCount, setVisitedCount] = useState(0);
  const [showExamSumary, setShowExamSumary] = useState(false);

  const [calculatorValue, setCalculatorValue] = useState("");


  const [userAnswer, setUserAnswer] = useState("");
const [userHasAnswered, setUserHasAnswered] = useState(false);
const [previousAnswer, setPreviousAnswer] = useState("");


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

  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questionData.length).fill("")
  );

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestionIndex(questionNumber - 1);
    setActiveQuestion(questionNumber - 1);
  };

  const [clickCount, setClickCount] = useState(0);

  const [answeredQuestionsMap, setAnsweredQuestionsMap] = useState({});

  const [selectedAnswersMap1, setSelectedAnswersMap1] = useState({});
  const [selectedAnswersMap2, setSelectedAnswersMap2] = useState({});
  const [selectedAnswersMap3, setSelectedAnswersMap3] = useState({});

  const [answeredQuestions, setAnsweredQuestions] = useState([]);

  
  const [isPaused, setIsPaused] = useState(false);
  // const [showExamSumary, setShowExamSumary] = useState(false);
  const calculateResult = () => {};

  const handleYes = async () => {
    const userId = userData.id;

    console.log(userId);
    navigate(`/TestResultsPage/${testCreationTableId}`);
  };

  const handleNo = () => {
    setShowExamSumary(false);
  };

  const [activeQuestion, setActiveQuestion] = useState(0);
  // --------------------------------------END OF CONST VARIABLES DECLARATIONS--------------------------

  // ------------------------------------------TIMER FUNCTION------------------------
  const [timer, setTimer] = useState(0);
  // const [timers, setTimers] = useState(Array(questionData));
  const [timers, setTimers] = useState(
    Array(questionData.questions.length).fill(0)
  );

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
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

  // ------------------------------------------END OF TIMER FUNCTION------------------------
  const [timeLeftAtSubmission, setTimeLeftAtSubmission] = useState(0);

  // -------------------------overall time-------------------------------
  const [wtimer, setWTimer] = useState(0);
  const WformatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
    // return hours * 3600 + minutes * 60 + seconds;
  };
  useEffect(() => {
    // setWTimer(wtimer);
    let interval;
    interval = setInterval(() => {
      setWTimer((prevTimer) => prevTimer + 1);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, [wtimer]);
  // ----------------------------end overall time--------------------------
  //-----------------------------TYPES OF INPUT VALUES for ANSWERING FORMATE

  const onAnswerSelected1 = (optionIndex) => {
    const questionId = questionData.questions[currentQuestionIndex].question_id;
    const charcodeatopt = String.fromCharCode("a".charCodeAt(0) + optionIndex);
    console.log("questionId from onAnswerSelected1 : ", questionId);
    const questionIndex = currentQuestionIndex + 1;
    console.log(`Question Index: ${questionIndex}`);
    console.log(`Clicked Option Index: ${charcodeatopt}`);

    setSelectedAnswersMap1((prevMap) => ({
      ...prevMap,
      [questionId]: optionIndex,
    }));

    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeQuestion] = optionIndex;
    setSelectedAnswers(updatedSelectedAnswers);
    console.log(
      "questionId from updatedSelectedAnswers : ",
      updatedSelectedAnswers
    );
  };

  const onAnswerSelected2 = (optionIndex) => {
    const questionId = questionData.questions[currentQuestionIndex].question_id;
    const charcodeatopt = String.fromCharCode("a".charCodeAt(0) + optionIndex);
    console.log("questionId from onAnswerSelected2 : ", questionId);

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
  };

  const onAnswerSelected3 = (e) => {
    // Handle updating the state when the user answers a question
    const updatedAnswers = [...answers];
    updatedAnswers[currentQuestionIndex] = e.target.value;
    setAnswers(updatedAnswers);

    if (
      !questionData.questions ||
      !questionData.questions[currentQuestionIndex]
    ) {
      console.error("Invalid question data or index");
      return;
    }

    const currentQuestion = questionData.questions[currentQuestionIndex];
    const questionId = currentQuestion.question_id;

    const inputValue = e.target.value;
    const parsedValue = parseFloat(inputValue);
    setUserHasAnswered(true);
    setSelectedAnswersMap3((prevMap) => ({
      ...prevMap,
      [questionId]: parsedValue,
    }));

    setValue(parsedValue.toString());
  };
  
  
  
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

        const linkUrl = `/subjects/${testCreationTableId}/${
          subjectId || leastSubjectId
        }`;
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [testCreationTableId, subjectId, selectedAnswersMap1]);
  //end Subjects fetching use effect code

  //users fetching use effect code
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
  //end users fetching use effect code

  //counts use effect code
  useEffect(() => {
    const counts = calculateQuestionCounts();
    setAnsweredCount(counts.answered);
    setNotAnsweredCount(counts.notAnswered);
    setMarkedForReviewCount(counts.markedForReview);
    setAnsweredmarkedForReviewCount(counts.answeredmarkedForReviewCount);
    setVisitedCount(counts.VisitedCount);
  }, [questionStatus]);

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

  const [originalStatuses, setOriginalStatuses] = useState(
    Array(questionData.questions.length).fill("notVisited")
  );
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

  useEffect(() => {
    // Call the updateCounters function initially when the component mounts
    updateCounters();
  }, [questionStatus]);

  // Reset calculator value when the question changes
  // useEffect(() => {
  //   if (
  //     !questionData.questions ||
  //     !questionData.questions[currentQuestionIndex]
  //   ) {
  //     // Handle the case where questions are not defined
  //     return;
  //   }

  //   const questionId = questionData.questions[currentQuestionIndex].question_id;

  //   if (selectedAnswersMap3.hasOwnProperty(questionId)) {
  //     setValue(selectedAnswersMap3[questionId].toString());
  //   } else {
  //     setValue(""); // Clear the input if there is no selected answer
  //   }
  // }, [currentQuestionIndex, selectedAnswersMap3]);

  // useEffect(() => {
  //   console.log("Updated Map in useEffect:", selectedAnswersMap3);
  // }, [selectedAnswersMap3]);


  useEffect(() => {
    if (
      !questionData.questions ||
      !questionData.questions[currentQuestionIndex]
    ) {
      return;
    }

    const questionId = questionData.questions[currentQuestionIndex].question_id;

    if (selectedAnswersMap3.hasOwnProperty(questionId)) {
      setPreviousAnswer(selectedAnswersMap3[questionId].toString());
      setUserAnswer(selectedAnswersMap3[questionId].toString());
    } else {
      setPreviousAnswer("");
      setUserAnswer("");
      setValue(""); // Clear the input if there is no selected answer
    }
  }, [currentQuestionIndex, selectedAnswersMap3]);

  useEffect(() => {
    console.log("Updated Map in useEffect:", selectedAnswersMap3);
  }, [selectedAnswersMap3]);

  // const handleSaveNextQuestion = async () => {
  //   // ------------------------------------ button functionality --------------------------------------------
  //   // Update question status for the current question
  //   const updatedQuestionStatus = [...questionStatus];

  //   const calculatorInputValue = value;

  //   const currentQuestion = questionData.questions[currentQuestionIndex];

  //   const isCurrentQuestionAnswered =
  //     selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
  //     (selectedAnswersMap2[currentQuestion.question_id] &&
  //       selectedAnswersMap2[currentQuestion.question_id].length > 0)||
  //       calculatorInputValue !== "";

  //   const isResponseCleared =
  //     selectedAnswersMap1[currentQuestion.question_id] === null ||
  //     selectedAnswersMap2[currentQuestion.question_id]?.length === 0;

  //   if (!isCurrentQuestionAnswered) {
  //     // updatedQuestionStatus[currentQuestionIndex] = "notAnswered";
  //     // setQuestionStatus(updatedQuestionStatus);
  //     window.alert("Please answer the question before proceeding.");
  //   } else if (isCurrentQuestionAnswered) {
  //     // If the current question is not answered, update the status
  //     const updatedQuestionStatus = [...questionStatus];
  //     updatedQuestionStatus[currentQuestionIndex] = "answered";
  //     setQuestionStatus(updatedQuestionStatus);

  //     setCurrentQuestionIndex((prevIndex) => {
  //       if (prevIndex < questionData.questions.length - 1) {
  //         return prevIndex + 1;
  //       }
  //     });
  //     // updatedQuestionStatus[currentQuestionIndex] = "notAnswered"
  //     // You may also show a message or perform other actions to indicate that the question is not answered
  //     console.log("Question not answered!");
  //   } else if (isCurrentQuestionAnswered === markForReview()) {
  //     updatedQuestionStatus[currentQuestionIndex] =
  //       "Answered but marked for review";
  //     updateCounters();

  //     setCurrentQuestionIndex((prevIndex) => {
  //       if (prevIndex < questionData.questions.length - 1) {
  //         return prevIndex + 1;
  //       }
  //     });
  //   }

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
  //     );
  //     const result = await response.json();

  //     setQuestionData(result);

  //     const token = localStorage.getItem("token");
  //     const response_user = await fetch(
  //       "http://localhost:5001/ughomepage_banner_login/user",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Attach token to headers for authentication
  //         },
  //       }
  //     );

  //     if (response_user.ok) {
  //       const userData = await response_user.json();
  //       setUserData(userData);

  //       const userId = userData.id; // Move this line here to ensure userId is defined

  //       console.log("Test Creation Table ID:", testCreationTableId);
  //       console.log("Current user_Id:", userId); // Now userId should be defined

  //       if (!questionData || !questionData.questions) {
  //         console.error("Data or questions are null or undefined");
  //         return;
  //       }
  //       const calculatorInputValue = value;
  //       const currentQuestion = questionData.questions[currentQuestionIndex];
  //       const selectedOption1 =
  //         selectedAnswersMap1[currentQuestion.question_id];
  //       const selectedOption2 =
  //         selectedAnswersMap2[currentQuestion.question_id];

  //       const optionIndexes1 =
  //         selectedOption1 !== undefined ? [selectedOption1] : [];
  //       const optionIndexes2 =
  //         selectedOption2 !== undefined ? selectedOption2 : [];

  //       const questionId = currentQuestion.question_id;


  //       if(answeredQuestionsMap[questionId]){
  //         const updatedResponse = {
  //           optionIndexes1: optionIndexes1.map((index) =>
  //             String.fromCharCode("a".charCodeAt(0) + index)
  //           ),
  //           optionIndexes2: optionIndexes2.map((index) =>
  //             String.fromCharCode("a".charCodeAt(0) + index)
  //           ),
  //         };
  
  //         const updateResponse = await axios.put(
  //           `http://localhost:5001/QuestionPaper/updateResponse/${questionId}`,
  //           {
  //             updatedResponse,
  //           }
  //         );
  
  //         console.log(updateResponse.data);
  //         console.log("Handle Next Click - Response Updated");
  //       }else{
  //          // console.log("Responses to be sent:", responses);
  //       const responses = {
  //         userId: userId,
  //         testCreationTableId: testCreationTableId,
  //         [questionId]: {
  //           optionIndexes1: optionIndexes1.map((index) =>
  //             String.fromCharCode("a".charCodeAt(0) + index)
  //           ),
  //           optionIndexes2: optionIndexes2.map((index) =>
  //             String.fromCharCode("a".charCodeAt(0) + index)
  //           ),
  //           calculatorInputValue: calculatorInputValue, // Add the calculator value to responses
  //         },
  //       };

  //       const saveResponse = await axios.post(
  //         "http://localhost:5001/QuestionPaper/response",
  //         {
  //           responses,
  //           userId,
  //           testCreationTableId,
  //         }
  //       );

  //       console.log(saveResponse.data);
  //       console.log("Handle Next Click - New Response Saved");

  //       setAnsweredQuestionsMap((prevMap) => ({
  //         ...prevMap,
  //         [questionId]: true,
  //       }));

  //       }

       

  //       setClickCount((prevCount) => prevCount + 1);
  //     }
  //   } catch (error) {
  //     console.error("Error handling next click:", error);
  //   }

  //   // --------------------------------end of button functionality --------------------------------------------------
  // };

  // const handleSaveNextQuestion = async () => {
  //   // ------------------------------------ button functionality --------------------------------------------
  //   // Update question status for the current question
  //   const updatedQuestionStatus = [...questionStatus];

  //   const calculatorInputValue = value;

  //   const currentQuestion = questionData.questions[currentQuestionIndex];

  //   const isCurrentQuestionAnswered =
  //     selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
  //     (selectedAnswersMap2[currentQuestion.question_id] &&
  //       selectedAnswersMap2[currentQuestion.question_id].length > 0)||
  //       calculatorInputValue !== "";

  //   const isResponseCleared =
  //     selectedAnswersMap1[currentQuestion.question_id] === null ||
  //     selectedAnswersMap2[currentQuestion.question_id]?.length === 0;

  //   if (!isCurrentQuestionAnswered) {
  //     // updatedQuestionStatus[currentQuestionIndex] = "notAnswered";
  //     // setQuestionStatus(updatedQuestionStatus);
  //     window.alert("Please answer the question before proceeding.");
  //   } else if (isCurrentQuestionAnswered) {
  //     // If the current question is not answered, update the status
  //     const updatedQuestionStatus = [...questionStatus];
  //     updatedQuestionStatus[currentQuestionIndex] = "answered";
  //     setQuestionStatus(updatedQuestionStatus);

  //     setCurrentQuestionIndex((prevIndex) => {
  //       if (prevIndex < questionData.questions.length - 1) {
  //         return prevIndex + 1;
  //       }
  //     });
  //     // updatedQuestionStatus[currentQuestionIndex] = "notAnswered"
  //     // You may also show a message or perform other actions to indicate that the question is not answered
  //     console.log("Question not answered!");
  //   } else if (isCurrentQuestionAnswered === markForReview()) {
  //     updatedQuestionStatus[currentQuestionIndex] =
  //       "Answered but marked for review";
  //     updateCounters();

  //     setCurrentQuestionIndex((prevIndex) => {
  //       if (prevIndex < questionData.questions.length - 1) {
  //         return prevIndex + 1;
  //       }
  //     });
  //   }

  //   try {
  //     const response = await fetch(
  //       `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
  //     );
  //     const result = await response.json();

  //     setQuestionData(result);

  //     const token = localStorage.getItem("token");
  //     const response_user = await fetch(
  //       "http://localhost:5001/ughomepage_banner_login/user",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Attach token to headers for authentication
  //         },
  //       }
  //     );

  //     if (response_user.ok) {
  //       const userData = await response_user.json();
  //       setUserData(userData);

  //       const userId = userData.id; // Move this line here to ensure userId is defined

  //       console.log("Test Creation Table ID:", testCreationTableId);
  //       console.log("Current user_Id:", userId); // Now userId should be defined

  //       if (!questionData || !questionData.questions) {
  //         console.error("Data or questions are null or undefined");
  //         return;
  //       }
  //       const calculatorInputValue = value;
  //       const currentQuestion = questionData.questions[currentQuestionIndex];
  //       const selectedOption1 =
  //         selectedAnswersMap1[currentQuestion.question_id];
  //       const selectedOption2 =
  //         selectedAnswersMap2[currentQuestion.question_id];

  //       const optionIndexes1 =
  //         selectedOption1 !== undefined ? [selectedOption1] : [];
  //       const optionIndexes2 =
  //         selectedOption2 !== undefined ? selectedOption2 : [];

  //       const questionId = currentQuestion.question_id;

  //       const hasAnswered = answeredQuestionsMap[questionId];     
  //       // If the user has answered, update the existing response
  //       if (hasAnswered) {
  //         const updatedResponse = {
  //           optionIndexes1: optionIndexes1.map((index) =>
  //             String.fromCharCode("a".charCodeAt(0) + index)
  //           ),
  //           optionIndexes2: optionIndexes2.map((index) =>
  //             String.fromCharCode("a".charCodeAt(0) + index)
  //           ),
  //           calculatorInputValue: calculatorInputValue,
  //         };

  //         const updateResponse = await axios.put(
  //           `http://localhost:5001/QuestionPaper/updateResponse/${userId}/${testCreationTableId}/${questionId}`,
  //           {
  //             updatedResponse,
  //             userId,
  //             testCreationTableId,
  //           }
  //         );

  //         console.log(updateResponse.data);
  //         console.log("Existing Response Updated");
  //       } else {
  //         // Responses object
  //         const responses = {
  //           userId: userId,
  //           testCreationTableId: testCreationTableId,
  //           [questionId]: {
  //             optionIndexes1: optionIndexes1.map((index) =>
  //               String.fromCharCode("a".charCodeAt(0) + index)
  //             ),
  //             optionIndexes2: optionIndexes2.map((index) =>
  //               String.fromCharCode("a".charCodeAt(0) + index)
  //             ),
  //             calculatorInputValue: calculatorInputValue,
  //           },
  //         };

  //         // If the user has not answered, save a new response
  //         const saveResponse = await axios.post(
  //           "http://localhost:5001/QuestionPaper/response",
  //           {
  //             responses,
  //             userId,
  //             testCreationTableId,
  //           }
  //         );

  //         console.log(saveResponse.data);
  //         console.log("New Response Saved");

  //         // Update answeredQuestionsMap to indicate that the question has been answered
  //         setAnsweredQuestionsMap((prevMap) => ({
  //           ...prevMap,
  //           [questionId]: true,
  //         }));
  //       }

  //       setClickCount((prevCount) => prevCount + 1);
  //     }
  //   } catch (error) {
  //     console.error("Error handling next click:", error);
  //   }

  //   // --------------------------------end of button functionality --------------------------------------------------
  // };

  const handleSaveNextQuestion = async () => {
    // ------------------------------------ button functionality --------------------------------------------
    // Update question status for the current question
    const updatedQuestionStatus = [...questionStatus];
    const calculatorInputValue = value;
    const currentQuestion = questionData.questions[currentQuestionIndex];

    const isCurrentQuestionAnswered =
      selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
      (selectedAnswersMap2[currentQuestion.question_id] &&
        selectedAnswersMap2[currentQuestion.question_id].length > 0) ||
      calculatorInputValue !== "";

    const isResponseCleared =
      selectedAnswersMap1[currentQuestion.question_id] === null ||
      selectedAnswersMap2[currentQuestion.question_id]?.length === 0;

    if (!isCurrentQuestionAnswered) {
      window.alert("Please answer the question before proceeding.");
    } else {
      const updatedQuestionStatus = [...questionStatus];
      updatedQuestionStatus[currentQuestionIndex] = "answered";
      setQuestionStatus(updatedQuestionStatus);

      setCurrentQuestionIndex((prevIndex) => {
        if (prevIndex < questionData.questions.length - 1) {
          return prevIndex + 1;
        }
      });

      try {
        // Fetch question options
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
        );
        const result = await response.json();
        setQuestionData(result);

        // Fetch user data
        const token = localStorage.getItem("token");
        const response_user = await fetch(
          "http://localhost:5001/ughomepage_banner_login/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response_user.ok) {
          const userData = await response_user.json();
          setUserData(userData);

          const userId = userData.id;
          const subjectId = questionData.subjectId;

          console.log("Test Creation Table ID:", testCreationTableId);
          console.log("Current user_Id:", userId);
          console.log("Current Subject Id:",subjectId)
          // console.log("Current Section Id:",sectionId)
          console.log(questionData)

          
          if (!questionData || !questionData.questions) {
            console.error("Data or questions are null or undefined");
            return;
          }

          const calculatorInputValue = value;
          const currentQuestion = questionData.questions[currentQuestionIndex];
          const selectedOption1 =
            selectedAnswersMap1[currentQuestion.question_id];
          const selectedOption2 =
            selectedAnswersMap2[currentQuestion.question_id];

          const optionIndexes1 =
            selectedOption1 !== undefined ? [selectedOption1] : [];
          const optionIndexes2 =
            selectedOption2 !== undefined ? selectedOption2 : [];

          const questionId = currentQuestion.question_id;
          const hasAnswered = answeredQuestionsMap[questionId];

          if (hasAnswered) {
            const updatedResponse = {
              optionIndexes1: optionIndexes1.map((index) =>
                String.fromCharCode("a".charCodeAt(0) + index)
              ),
              optionIndexes2: optionIndexes2.map((index) =>
                String.fromCharCode("a".charCodeAt(0) + index)
              ),
              calculatorInputValue: calculatorInputValue,
            };

            const updateRespons = await axios.put(
              `http://localhost:5001/QuestionPaper/updateResponse/${questionId}`,
              {
                updatedResponse,
                userId,
                testCreationTableId,
              }
            );
            console.log("egrad", updateRespons);
            console.log("updatedResponse", updatedResponse);
            console.log("hiiii");
            console.log("The question answer is  updated");
            // You can perform additional actions if the question is already answered
          } else {
            const responses = {
              userId: userId,
              testCreationTableId: testCreationTableId,
              [questionId]: {
                optionIndexes1: optionIndexes1.map((index) =>
                  String.fromCharCode("a".charCodeAt(0) + index)
                ),
                optionIndexes2: optionIndexes2.map((index) =>
                  String.fromCharCode("a".charCodeAt(0) + index)
                ),
                calculatorInputValue: calculatorInputValue,
              },
            };
            console.log("hello");
            console.log("The question is answered for the first time");
            console.log("responses", responses);
            // You can perform additional actions if the question is answered for the first time

            // Update answeredQuestionsMap to indicate that the question has been answered
            setAnsweredQuestionsMap((prevMap) => ({
              ...prevMap,
              [questionId]: true,
            }));

            // If the user has answered, update the existing response
            if (hasAnswered) {
              console.log("Existing Response Updated");
              console.log("updated reponse is saved");
            } else {
              // Responses object
              const responses = {
                userId: userId,
                testCreationTableId: testCreationTableId,
                [questionId]: {
                  optionIndexes1: optionIndexes1.map((index) =>
                    String.fromCharCode("a".charCodeAt(0) + index)
                  ),
                  optionIndexes2: optionIndexes2.map((index) =>
                    String.fromCharCode("a".charCodeAt(0) + index)
                  ),
                  calculatorInputValue: calculatorInputValue,
                },
              };

              // If the user has not answered, save a new response
              const saveResponse = await axios.post(
                "http://localhost:5001/QuestionPaper/response",
                {
                  responses,
                  userId,
                  testCreationTableId,

                }
              );

              console.log(saveResponse.data);
              console.log("New Response Saved");
              console.log("reponse is saved");
            }

            setClickCount((prevCount) => prevCount + 1);
          }
        }
      } catch (error) {
        console.error("Error handling next click:", error);
      }
    }
    // --------------------------------end of button functionality --------------------------------------------------
  };

  // const handleNextQuestion = async () => {
  //   const currentQuestion = questionData.questions[currentQuestionIndex];
  //   const isCurrentQuestionAnswered =
  //     selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
  //     (selectedAnswersMap2[currentQuestion.question_id] &&
  //       selectedAnswersMap2[currentQuestion.question_id].length > 0);

  //   if (!isCurrentQuestionAnswered) {
  //     // If the current question is not answered, update the status
  //     const updatedQuestionStatus = [...questionStatus];
  //     updatedQuestionStatus[currentQuestionIndex] = "notAnswered";
  //     setQuestionStatus(updatedQuestionStatus);

  //     // You may also show a message or perform other actions to indicate that the question is not answered
  //     console.log("Question not answered!");
  //   } else {
  //     // You may also show a message or perform other actions to indicate that the question is not answered
  //     console.log("Question not answered!");
  //   }

  //   const response = await fetch(
  //     `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
  //   );
  //   const result = await response.json();
  //   setQuestionData(result);

  //   setCurrentQuestionIndex((prevIndex) => {
  //     if (prevIndex < questionData.questions.length - 1) {
  //       return prevIndex + 1;
  //     }
  //   });

  //   try {
  //     // Fetch question options
  //     const response = await fetch(
  //       `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
  //     );
  //     const result = await response.json();
  //     setQuestionData(result);

  //     // Fetch user data
  //     const token = localStorage.getItem("token");
  //     const response_user = await fetch(
  //       "http://localhost:5001/ughomepage_banner_login/user",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response_user.ok) {
  //       const userData = await response_user.json();
  //       setUserData(userData);

  //       const userId = userData.id;

  //       console.log("Test Creation Table ID:", testCreationTableId);
  //       console.log("Current user_Id:", userId);

  //       if (!questionData || !questionData.questions) {
  //         console.error("Data or questions are null or undefined");
  //         return;
  //       }

  //       const currentQuestion = questionData.questions[currentQuestionIndex];
  //       const questionId = currentQuestion.question_id;
  //       const calculatorInputValue = value;

  //       const selectedOption1 = selectedAnswersMap1[questionId];
  //       const selectedOption2 = selectedAnswersMap2[questionId];

  //       const optionIndexes1 =
  //         selectedOption1 !== undefined ? [selectedOption1] : [];
  //       const optionIndexes2 =
  //         selectedOption2 !== undefined ? selectedOption2 : [];

  //       const hasAnswered = answeredQuestionsMap[questionId];

  //       if (hasAnswered) {
  //         const updatedResponse = {
  //           optionIndexes1: optionIndexes1.map((index) =>
  //             String.fromCharCode("a".charCodeAt(0) + index)
  //           ),
  //           optionIndexes2: optionIndexes2.map((index) =>
  //             String.fromCharCode("a".charCodeAt(0) + index)
  //           ),
  //           calculatorInputValue: calculatorInputValue,
  //         };

  //         const updateRespons = await axios.put(
  //           `http://localhost:5001/QuestionPaper/updateResponse/${questionId}`,
  //           {
  //             updatedResponse,
  //             userId,
  //             testCreationTableId,
  //           }
  //         );
  //         console.log("egrad", updateRespons);
  //         console.log("updatedResponse", updatedResponse);
  //         console.log("hiiii");
  //         console.log("The question answer is updated");
  //         // You can perform additional actions if the question is already answered
  //       } else {
  //         const responses = {
  //           userId: userId,
  //           testCreationTableId: testCreationTableId,
  //           [questionId]: {
  //             optionIndexes1: optionIndexes1.map((index) =>
  //               String.fromCharCode("a".charCodeAt(0) + index)
  //             ),
  //             optionIndexes2: optionIndexes2.map((index) =>
  //               String.fromCharCode("a".charCodeAt(0) + index)
  //             ),
  //             calculatorInputValue: calculatorInputValue,
  //           },
  //         };
  //         console.log("hello");
  //         console.log("The question is answered for the first time");
  //         console.log("responses", responses);
  //         // You can perform additional actions if the question is answered for the first time

  //         // Update answeredQuestionsMap to indicate that the question has been answered
  //         setAnsweredQuestionsMap((prevMap) => ({
  //           ...prevMap,
  //           [questionId]: true,
  //         }));

  //         // If the user has answered, update the existing response
  //         if (hasAnswered) {
  //           console.log("Existing Response Updated 1");
  //           console.log("updated response is saved");
  //         } else {
  //           // Responses object
  //           const responses = {
  //             userId: userId,
  //             testCreationTableId: testCreationTableId,
  //             [questionId]: {
  //               optionIndexes1: optionIndexes1.map((index) =>
  //                 String.fromCharCode("a".charCodeAt(0) + index)
  //               ),
  //               optionIndexes2: optionIndexes2.map((index) =>
  //                 String.fromCharCode("a".charCodeAt(0) + index)
  //               ),
  //               calculatorInputValue: calculatorInputValue,
  //             },
  //           };

  //           // If the user has not answered, save a new response
  //           const saveResponse = await axios.post(
  //             "http://localhost:5001/QuestionPaper/response",
  //             {
  //               responses,
  //               userId,
  //               testCreationTableId,
  //             }
  //           );

  //           console.log(saveResponse.data);
  //           console.log("New Response Saved");
  //           console.log("response is saved");
  //         }

  //         setClickCount((prevCount) => prevCount + 1);
  //       }
  //     }
  //   } catch (error) {
  //     console.error("Error handling next click:", error);
  //   }
  //   // --------------------------------end of button functionality --------------------------------------------------
  // };

  const handleNextQuestion = async () => {
    const currentQuestion = questionData.questions[currentQuestionIndex];
    const isCurrentQuestionAnswered =
      selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
      (selectedAnswersMap2[currentQuestion.question_id] &&
        selectedAnswersMap2[currentQuestion.question_id].length > 0);

    if (!isCurrentQuestionAnswered) {
      // If the current question is not answered, update the status
      const updatedQuestionStatus = [...questionStatus];
      updatedQuestionStatus[currentQuestionIndex] = "notAnswered";
      setQuestionStatus(updatedQuestionStatus);

      // You may also show a message or perform other actions to indicate that the question is not answered
      console.log("Question not answered!");
    } else {
      // You may also show a message or perform other actions to indicate that the question is not answered
      console.log("Question not answered!");
    }

    const response = await fetch(
      `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
    );
    const result = await response.json();
    setQuestionData(result);

    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questionData.questions.length - 1) {
        return prevIndex + 1;
      }
    });
    try {
      const response = await fetch(
        `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
      );
      const result = await response.json();

      setQuestionData(result);

      const token = localStorage.getItem("token");
      const response_user = await fetch(
        "http://localhost:5001/ughomepage_banner_login/user",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to headers for authentication
          },
        }
      );

      if (response_user.ok) {
        const userData = await response_user.json();
        setUserData(userData);

        const userId = userData.id; // Move this line here to ensure userId is defined

        console.log("Test Creation Table ID:", testCreationTableId);
        console.log("Current user_Id:", userId); // Now userId should be defined

        if (!questionData || !questionData.questions) {
          console.error("Data or questions are null or undefined");
          return;
        }

        const currentQuestion = questionData.questions[currentQuestionIndex];
        const selectedOption1 =
          selectedAnswersMap1[currentQuestion.question_id];
        const selectedOption2 =
          selectedAnswersMap2[currentQuestion.question_id];

        const optionIndexes1 =
          selectedOption1 !== undefined ? [selectedOption1] : [];
        const optionIndexes2 =
          selectedOption2 !== undefined ? selectedOption2 : [];

        const questionId = currentQuestion.question_id;
        console.log("vanakam");
        console.log("Responses to be sent:", responses);

        const responses = {
          userId: userId,
          testCreationTableId: testCreationTableId,
          [questionId]: {
            optionIndexes1: optionIndexes1.map((index) =>
              String.fromCharCode("a".charCodeAt(0) + index)
            ),
            optionIndexes2: optionIndexes2.map((index) =>
              String.fromCharCode("a".charCodeAt(0) + index)
            ),
          },
        };

        const saveResponse = await axios.post(
          "http://localhost:5001/QuestionPaper/response",
          {
            responses,
          }
        );

        console.log(saveResponse.data);
        console.log("Handle Next Click - New Response Saved");

        setAnsweredQuestionsMap((prevMap) => ({
          ...prevMap,
          [questionId]: true,
        }));

        setClickCount((prevCount) => prevCount + 1);
      } else {
        // Handle errors, e.g., if user data fetch fails
      }
    } catch (error) {
      console.error("Error handling next click:", error);
    }

    if (currentQuestionIndex < questionData.length - 1) {
      // setCurrentQuestionIndex((prevActiveQuestion) => prevActiveQuestion + 1);
    } else {
      // setShowResult(true);
      calculateResult();
    }
  };
  const markForReview = async () => {
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questionData.questions.length - 1) {
        return prevIndex + 1;
      }
    });

    const currentQuestion = questionData.questions[currentQuestionIndex];
    const isCurrentQuestionAnswered =
      selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
      (selectedAnswersMap2[currentQuestion.question_id] &&
        selectedAnswersMap2[currentQuestion.question_id].length > 0);

    // Update questionStatus for the marked question
    const updatedQuestionStatus = [...questionStatus];
    if (isCurrentQuestionAnswered) {
      updatedQuestionStatus[currentQuestionIndex] =
        "Answered but marked for review";
    } else {
      updatedQuestionStatus[currentQuestionIndex] = "marked";
    }

    setQuestionStatus(updatedQuestionStatus);

    try {
      const response = await fetch(
        `http://localhost:5001/QuestionPaper/questionOptions/${testCreationTableId}`
      );
      const result = await response.json();

      setQuestionData(result);

      const token = localStorage.getItem("token");
      const response_user = await fetch(
        "http://localhost:5001/ughomepage_banner_login/user",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to headers for authentication
          },
        }
      );

      if (response_user.ok) {
        const userData = await response_user.json();
        setUserData(userData);

        const userId = userData.id; // Move this line here to ensure userId is defined

        console.log("Test Creation Table ID:", testCreationTableId);
        console.log("Current user_Id:", userId); // Now userId should be defined

        if (!questionData || !questionData.questions) {
          console.error("Data or questions are null or undefined");
          return;
        }

        const currentQuestion = questionData.questions[currentQuestionIndex];
        const selectedOption1 =
          selectedAnswersMap1[currentQuestion.question_id];
        const selectedOption2 =
          selectedAnswersMap2[currentQuestion.question_id];

        const optionIndexes1 =
          selectedOption1 !== undefined ? [selectedOption1] : [];
        const optionIndexes2 =
          selectedOption2 !== undefined ? selectedOption2 : [];

        const questionId = currentQuestion.question_id;
        console.log("Responses to be sent:");

        // Move the 'responses' variable declaration here
        const responses = {
          userId: userId,
          testCreationTableId: testCreationTableId,
          [questionId]: {
            optionIndexes1: optionIndexes1.map((index) =>
              String.fromCharCode("a".charCodeAt(0) + index)
            ),
            optionIndexes2: optionIndexes2.map((index) =>
              String.fromCharCode("a".charCodeAt(0) + index)
            ),
          },
        };

        const saveResponse = await axios.post(
          "http://localhost:5001/QuestionPaper/response",
          {
            responses,
            userId,
            testCreationTableId,
          }
        );

        console.log(saveResponse.data);
        console.log("Mark for Review - New Response Saved");

        setAnsweredQuestionsMap((prevMap) => ({
          ...prevMap,
          [questionId]: true,
        }));

        setClickCount((prevCount) => prevCount + 1);
      } else {
        // Handle errors, e.g., if user data fetch fails
      }
    } catch (error) {
      console.error("Error handling mark for review:", error);
    }

    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < questionData.questions.length - 1) {
        return prevIndex + 1;
      }
    });
  };

  // const handleSubmit = () => {
  //   window.alert("Your Test has been Submitted!! Click Ok to See Result.");
  //   setShowExamSumary(true);
  //   calculateResult();
  //   const counts = calculateQuestionCounts();
  //   setAnsweredCount(counts.answered);
  //   setNotAnsweredCount(counts.notAnswered);
  //   setMarkedForReviewCount(counts.markedForReview);
  //   setAnsweredmarkedForReviewCount(counts.answeredmarkedForReviewCount);
  //   setVisitedCount(counts.VisitedCount);
  //   setTimeLeftAtSubmission(wtimer);

  //    // Log the time left at the moment of submission
  // console.log("Time Left at Submission:", WformatTime(wtimer));

  // };

  const handleSubmit = async () => {
    window.alert(
      "Your Test has been Submitted!! Click Ok to See Result.",
      calculateResult()
    );
    setShowExamSumary(true);
    calculateResult();
    const counts = calculateQuestionCounts();
    setAnsweredCount(counts.answered);
    setNotAnsweredCount(counts.notAnswered);
    setMarkedForReviewCount(counts.markedForReview);
    setAnsweredmarkedForReviewCount(counts.answeredmarkedForReviewCount);
    setVisitedCount(counts.VisitedCount);

    // const timeLeftInSeconds = wtimer;
    const formattedTime = WformatTime(wtimer);

    // Log the time left at the moment of submission
    console.log("Time Left at Submission:", formattedTime);

    try {
      // Make a POST request to your server to submit time left
      const response = await fetch(
        "http://localhost:5001/QuestionPaper/submitTimeLeft",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userId: userData.id /* Replace with actual user ID */,
            testCreationTableId:
              testCreationTableId /* Replace with actual test creation table ID */,
            timeLeft: formattedTime,
          }),
        }
      );

      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting time left:", error);
    }
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
    //-----------------buttons functionality--------------
    const currentQuestion = questionData.questions[currentQuestionIndex];
    const isCurrentQuestionAnswered =
      selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
      (selectedAnswersMap2[currentQuestion.question_id] &&
        selectedAnswersMap2[currentQuestion.question_id].length > 0);

    if (isCurrentQuestionAnswered) {
      // If the current question is answered, update the status
      const updatedQuestionStatus = [...questionStatus];
      updatedQuestionStatus[currentQuestionIndex] = "notAnswered";
      setQuestionStatus(updatedQuestionStatus);
    }
    //-----------------buttons functionality end--------------

    try {
      const questionId =
        questionData.questions[currentQuestionIndex].question_id;
      console.log("Response cleared successfully ");

      // Clear response for radio buttons (MCQ)
      const updatedSelectedAnswersMap1 = { ...selectedAnswersMap1 };
      updatedSelectedAnswersMap1[questionId] = undefined;
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

  // -------------------------------END OF BUTTONS FUNCTIONALITIES-----------------------------------

  const updateQuestionStatus = (index, status) => {
    // Update the question status in the QuestionPaper component
    const updatedQuestionStatus = [...questionStatus];
    updatedQuestionStatus[index] = status;
    setQuestionStatus(updatedQuestionStatus);
  };

  // State variable to store text answers for each question
  const [selectedTextAnswersMap3, setSelectedTextAnswersMap3] = useState({});
  const [textInputs, setTextInputs] = useState({});
  // Update function
  const onTextAnswerSelected = (questionId, answer) => {
    setSelectedTextAnswersMap3((prevMap) => ({
      ...prevMap,
      [questionId]: answer,
    }));
  };

  // Update local storage when the 'value' state changes
  useEffect(() => {
    localStorage.setItem("calculatorInputValue", value);
  }, [value]);

  // Function to get the answer for the current question
  function getAnswerForCurrentQuestion() {
    const currentQuestion = questionData.questions[currentQuestionIndex];

    if (currentQuestion && currentQuestion.useranswer) {
      const { useranswer, typeofQuestion } = currentQuestion;

      // Check if typeofQuestion is defined before using includes
      if (typeofQuestion && typeofQuestion.includes) {
        // Adjust the logic based on your data structure
        if (typeofQuestion.includes("NATD")) {
          return useranswer.ans; // For questions with Decimal values
        } else if (typeofQuestion.includes("NATI")) {
          return useranswer.ans; // For questions with Integer values
        }
      }
    }

    // Add more conditions or handle the case where the question type is not recognized
    return "Answer not available";
  }
  // const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  return (
    <div>
      <div className="quiz_exam_interface_header">
        <div className="quiz_exam_interface_header_LOGO">
          <img src={logo} alt="" />
        </div>
      </div>
      {!showExamSumary ? (
        <div className="quiz_exam_interface_body">
          {/* --------------- quiz examconatiner -------------------- */}
          <div className="quiz_exam_interface_body_left_container">
            {/* --------------- quiz sub container -------------------- */}

            <div class="quiz_exam_interface_SUBJECTS_CONTAINER">
              <div>
                <div class="subjects_BTN_container">
                {/* {questionData.map((subject,Index) => (
                    <li key={Index}>
                      <p>{subject.subjectId}</p>
                    </li>
                  ))} */}
                  {/* <li>
                    <button class="subject_btn">Mathematics</button>
                  </li>
                  <li>
                    <button class="subject_btn">Physics</button>
                  </li>
                  <li>
                    <button class="subject_btn">Chemistry</button>
                  </li> */}
                  <li>
                    <h6>Time Left: {WformatTime(wtimer)}</h6>
                  </li>
                </div>

                <h3>
                  Question Type:
                  {questionTypes.map((type) => (
                    <li key={type.quesionTypeId}>
                      <p>{type.typeofQuestion}</p>
                    </li>
                  ))}
                </h3>
              </div>
              
              <div class="right-header">
                <div class="marks">
                  Marks: <div class="plus-mark">+1</div>
                  <div class="minus-mark">-1</div>
                  <span>
                    {" "}
                    <p>Timer:</p>
                    <p>{formatTime(timer)}</p>
                  </span>
                </div>
              </div>
            </div>

            {/* --------------- quiz question container -------------------- */}

            <div class="quiz_exam_interface_exam_CONTAINEr">
              {questionData.questions && questionData.questions.length > 0 && (
                <>
                  <div className="quiz_exam_interface_exam_subCONTAINEr">
                    <div className="quiz_exam_interface_exam_qN_Q">
                      {/* <h3>Question:{currentQuestion.sortid.sortid_text}</h3> */}
                      <h3>{currentQuestionIndex+1}</h3>

                      {currentQuestion.paragraph &&
                        currentQuestion.paragraph.paragraphImg && (
                          <>
                            <h2>Paragraph:</h2>
                            <img
                              src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${currentQuestion.paragraph.paragraphImg}`}
                              alt={`ParagraphImage ${currentQuestion.paragraph.paragraph_Id}`}
                              style={{ width: "700px" }}
                            />
                            <h2>Question: </h2>
                          </>
                        )}

                      <img
                        src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${currentQuestion.questionImgName}`}
                        alt={`Question ${currentQuestion.question_id}`}
                        style={{ width: "583px" }}
                      />
                      {/* <h1> {currentQuestion.question_id}</h1> */}
                    </div>

                    <div>
                      <div className="quiz_exam_interface_exam_qN_Q_options">
                        <h3>Options:</h3>
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
                                {currentQuestionType &&
                                  currentQuestionType.typeofQuestion &&
                                  currentQuestionType.typeofQuestion.includes(
                                    "MCQ4(MCQ with 4 Options)"
                                  ) && (
                                    <div>
                                      <input
                                        className="opt_btns"
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
                                  currentQuestionType.typeofQuestion.includes(
                                    "MCQ5(MCQ with 5 Options)"
                                  ) && (
                                    <div>
                                      <input
                                        className="opt_btns"
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
                                  currentQuestionType.typeofQuestion.includes(
                                    "MSQN(MSQ with -ve marking)"
                                  ) && (
                                    <div>
                                      <input
                                        className="opt_btns"
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
                                      />
                                    </div>
                                  )}
                                {currentQuestionType &&
                                  currentQuestionType.typeofQuestion &&
                                  currentQuestionType.typeofQuestion.includes(
                                    "MSQ(MSQ without -ve marking)"
                                  ) && (
                                    <div>
                                      <input
                                        className="opt_btns"
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
                                {/* calculator ============ */}

                                {currentQuestionType &&
                                  currentQuestionType.typeofQuestion &&
                                  currentQuestionType.typeofQuestion.includes(
                                    "NATD( Numeric Answer type of questions with Decimal values)"
                                  ) && (
                                    <div className="calculator">
                                      <div className="display">
                                          <h2>{questionData.questions[currentQuestionIndex].useranswer.ans}</h2>
                                        <input
                                          type="text"
                                          name={`question-${currentQuestionIndex}`}
                                          value={userHasAnswered ? userAnswer : value}
                                          onChange={(e) => onAnswerSelected3(e)}
                                          placeholder="Enter your answer"
                                          readOnly
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="button"
                                          value="AC"
                                          onClick={(e) => setValue("")}
                                        />
                                        <input
                                          type="button"
                                          value="DE"
                                          onClick={(e) =>
                                            setValue(value.slice(0, -1))
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="."
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="/"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="button"
                                          value="7"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="8"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="9"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="*"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="button"
                                          value="4"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="5"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="6"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="+"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="button"
                                          value="1"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="2"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="3"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="-"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="button"
                                          value="00"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="0"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="="
                                          className="equal"
                                          onClick={(e) => setValue(eval(value))}
                                        />
                                      </div>
                                    </div>
                                  )}

                                {currentQuestionType &&
                                  currentQuestionType.typeofQuestion &&
                                  currentQuestionType.typeofQuestion.includes(
                                    "NATI( Numeric Answer type of questions with integer values)"
                                  ) && (
                                    <div className="calculator">
                                      <h2>{questionData.questions[currentQuestionIndex].useranswer.ans} </h2>

                                      <div className="display">
                                        <input
                                          type="text"
                                          name={`question-${currentQuestionIndex}`}
                                          value={userHasAnswered ? userAnswer : value}
                                          onChange={(e) => onAnswerSelected3(e)}
                                          placeholder="Enter your answer"
                                          readOnly
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="button"
                                          value="AC"
                                          onClick={(e) => setValue("")}
                                        />
                                        <input
                                          type="button"
                                          value="DE"
                                          onClick={(e) =>
                                            setValue(value.slice(0, -1))
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="."
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="/"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="button"
                                          value="7"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="8"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="9"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="*"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="button"
                                          value="4"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="5"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="6"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="+"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="button"
                                          value="1"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="2"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="3"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="-"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                      </div>
                                      <div>
                                        <input
                                          type="button"
                                          value="00"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="0"
                                          onClick={(e) =>
                                            setValue(value + e.target.value)
                                          }
                                        />
                                        <input
                                          type="button"
                                          value="="
                                          className="equal"
                                          onClick={(e) => setValue(eval(value))}
                                        />
                                      </div>
                                    </div>
                                  )}
 {/* calculator ============ */}
                                {currentQuestionType &&
                                  currentQuestionType.typeofQuestion &&
                                  currentQuestionType.typeofQuestion.includes(
                                    "TF(True or false)"
                                  ) && (
                                    <div>
                                      <input
                                        className="opt_btns"
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
                                  currentQuestionType.typeofQuestion.includes(
                                    "CTQ(Comprehension type of questions )"
                                  ) && (
                                    <div>
                                      <input
                                        className="opt_btns"
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
                              </li>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="quiz_btns_contaioner">
                    <div>
                      <button
                        className="Quiz_Save_MarkforReview"
                        onClick={markForReview}
                      >
                        Save & Mark for Review
                      </button>
                      <button
                        className="Quiz_clearResponse"
                        onClick={clearResponse}
                      >
                        Clear Response
                      </button>
                      <button
                        className="quizsave_next"
                        onClick={handleSaveNextQuestion}
                      >
                        Save & Next
                      </button>
                    </div>

                    <div className="quiz_Next_back">
                      <button
                        className="previous-btn"
                        onClick={handlePreviousClick}
                        disabled={currentQuestionIndex === 0}
                      >
                        <i className="fa-solid fa-angles-left"></i> Back
                      </button>
                      <button onClick={handleNextQuestion}>Next</button>

                      <button
                        style={{ background: "#f0a607da" }}
                        onClick={handleSubmit}
                        id="resume_btn"
                      >
                        Submit
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>

            {/* --------------- quiz option container -------------------- */}

            {/* --------------- quiz btns container -------------------- */}
          </div>

          <div className="quiz_exam_interface_body_right_container">
            {/* --------------- right bar -------------------- */}

            <div className="rightsidebar">
              <DemoDeleteItsNotImp2
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
                // seconds={seconds}
                seconds={600}
              />

              {/* <Link to={`/TestResultsPage/${testCreationTableId}`}>Yes FOr Link</Link> */}
            </div>
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
            <p>
              Marked for Review Questions:
              <span> {markedForReviewCount}</span>
            </p>
            <p>
              Answered & Marked for Review Questions:
              <span> {answeredmarkedForReviewCount}</span>
            </p>
          </div>
          <div>
            <h2>
              Are you sure you want to submit for final marking? <br />
              No changes will be allowed after submission.
            </h2>

            {/* <Link to='/SubmitPage'>YES</Link> */}

            {/* <button onClick={handleYes}>YES</button> */}
            <Link
              to={`/TestResultsPage/${testCreationTableId}`}
              style={{ background: "red", fontWeight: "bold", padding: "10px" }}
            >
              Yes
            </Link>
            <button onClick={handleNo}>NO</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuestionPaper;
