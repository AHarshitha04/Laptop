import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonsFunctionality from "./ButtonsFunctionality";
import "./styles/Paper.css";
//logo in header
import logo from "./asserts/egradtutor_logo.png";

const QuestionPaper = () => {
  // --------------------------------------CONST VARIABLES DECLARATIONS--------------------------
  // const [data, setData] = useState({ questions: [] });
  const [questionData, setQuestionData] = useState({ questions: [] });
  // const [questionData, setQuestionData] = useState({});

  const { subjectId, testCreationTableId, userId } = useParams();
  const [Subjects, setSubjects] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(null);

  const [questionStatus, setQuestionStatus] = useState(Array(questionData?.questions?.length).fill("notAnswered"));
  
  const [sections, setSections] = useState([]);
  const [currentQuestionType, setCurrentQuestionType] = useState(null);
  const [value, setValue] = useState('');
  const navigate = useNavigate();
  const [answeredCount, setAnsweredCount] = useState(0);
  const [notAnsweredCount, setNotAnsweredCount] = useState(0);
  const [answeredmarkedForReviewCount, setAnsweredmarkedForReviewCount] =
    useState(0);
  const [markedForReviewCount, setMarkedForReviewCount] = useState(0);
  const [VisitedCount, setVisitedCount] = useState(questionData.questions.length);
  const [showExamSumary, setShowExamSumary] = useState(false);

  const calculateQuestionCounts = () => {
    let answered = 0;
    let notAnswered = 0;
    let markedForReview = 0;
    let answeredmarkedForReviewCount = 0;
    let VisitedCount = questionData.questions.length;

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
        VisitedCount--;
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
    let markedForReview = 0;
    let answeredmarkedForReviewCount = 0;
    let VisitedCount = questionData.questions.length;

    questionStatus.forEach((status) => {
      if (status === "answered") {
        answered++;
      } else if (status === "notAnswered") {
        notAnswered++;
      } else if (status === "marked") {
        markedForReview++;
      } else if (status === "Answered but marked for review") {
        answeredmarkedForReviewCount++;
      } else if (status === "notVisited") {
        VisitedCount--;
      }
    });

    setAnsweredCount(answered);
    setNotAnsweredCount(notAnswered);
    setAnsweredmarkedForReviewCount(markedForReview);
    setMarkedForReviewCount(answeredmarkedForReviewCount);
    setVisitedCount(VisitedCount,);
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
  // const correctAnswer =
  //   data && data.questions && data.questions[currentQuestionIndex]
  //     ? data.questions[currentQuestionIndex].correct_answer
  //     : null; // or provide a default value based on your logic

  const [selectedAnswersMap1, setSelectedAnswersMap1] = useState({});
  const [selectedAnswersMap2, setSelectedAnswersMap2] = useState({});
  const [selectedAnswersMap3, setSelectedAnswersMap3] = useState({});
  const [selectedAnswersMap4, setSelectedAnswersMap4] = useState({});
  const [answeredQuestions, setAnsweredQuestions] = useState([]);
  const [isPaused, setIsPaused] = useState(false);
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

  //-----------------------------TYPES OF INPUT VALUES for ANSWERING FORMATE
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
    // setSelectedAnswersMap2((prevMap) => ({
    //   ...prevMap,
    //   [questionId]: [],
    // }));

    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeQuestion] = optionIndex;
    setSelectedAnswers(updatedSelectedAnswers);

    // const updatedQuestionStatus = [...questionStatus];
    // updatedQuestionStatus[activeQuestion] = "answered";
    // setQuestionStatus(updatedQuestionStatus);
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

    // const updatedQuestionStatus = [...questionStatus];
    // updatedQuestionStatus[activeQuestion] = "answered";
    // setQuestionStatus(updatedQuestionStatus);
  };

  const onAnswerSelected3 = (e) => {
    const inputValue = e.target.value;
    const parsedValue = parseFloat(inputValue); // Parse the input value to a float if it's supposed to be a number
    const questionId = questionData.questions[currentQuestionIndex].question_id;
    const questionIndex = currentQuestionIndex + 1;
    console.log(`Question Index: ${questionIndex}`);
    console.log(`Entered Text: ${parsedValue}`);

    setSelectedAnswersMap3((prevMap) => {
      // Update the selected answers map with the parsed value
      return {
        ...prevMap,
        [questionId]: parsedValue,
      };
    });
    setCalculatorValue(parsedValue.toString()); // Update the calculator value as a string if needed
    console.log("Calculator Value:", parsedValue);
  };

  const onAnswerSelected4 = (e, value) => {
    const inputValue = value;
    const questionId =
      questionData.questions[currentQuestionIndex]?.question_id;

    setSelectedAnswersMap4((prevMap) => {
      // Update the selected answers map with the radio button value
      return {
        ...prevMap,
        [questionId]: inputValue,
      };
    });

    const updatedSelectedAnswers = [...selectedAnswers];
    updatedSelectedAnswers[activeQuestion] = e;
    setSelectedAnswers(updatedSelectedAnswers);
  };

  //-----------------------------END TYPES OF INPUT VALUES ANSWERING FORMATE

  // -------------------------------BUTTONS FUNCTIONALITIES-----------------------------------














  

  // -------------------------------END OF BUTTONS FUNCTIONALITIES-----------------------------------

  // -------------------------------------------USE EFFECT FETCHING CODE-------------------------------

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

  //counts use effect code
  useEffect(() => {
    const counts = calculateQuestionCounts();
    setAnsweredCount(counts.answered);
    setNotAnsweredCount(counts.notAnswered);
    setMarkedForReviewCount(counts.markedForReview);
    setAnsweredmarkedForReviewCount(counts.answeredmarkedForReviewCount);
    setVisitedCount(counts.VisitedCount);
  }, [questionStatus]);
  //end counts use effect code

  //questionOptions use effect code
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
  //end questionOptions use effect code

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
  useEffect(() => {
    setValue(""); // Reset calculator value when the question changes
  }, [currentQuestionIndex]); // Assuming currentQuestionIndex is the dependency indicating question change

  useEffect(() => {
    console.log("Updated Map in useEffect:", selectedAnswersMap3);
  }, [selectedAnswersMap3]);

  //main working code save &next btn start
  // const handleSaveNextQuestion = async () => {
  //   // ------------------------------------ button functionality --------------------------------------------
  //   // Update question status for the current question
  //   const updatedQuestionStatus = [...questionStatus];

  //   const currentQuestion = questionData.questions[currentQuestionIndex];
  //   const isCurrentQuestionAnswered =
  //     selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
  //     (selectedAnswersMap2[currentQuestion.question_id] &&
  //       selectedAnswersMap2[currentQuestion.question_id].length > 0);

  //    const isResponseCleared =
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

  //       const currentQuestion = questionData.questions[currentQuestionIndex];
  //       const selectedOption1 =
  //         selectedAnswersMap1[currentQuestion.question_id];
  //       const selectedOption2 =
  //         selectedAnswersMap2[currentQuestion.question_id];
  //       // its for NATD( Numeric Answer type of questions with Decimal values)
  //       const selectedOption3 =
  //         selectedAnswersMap3[currentQuestion.question_id];

  //       const optionIndexes1 =
  //         selectedOption1 !== undefined ? [selectedOption1] : [];
  //       const optionIndexes2 =
  //         selectedOption2 !== undefined ? selectedOption2 : [];

  //       const questionId = currentQuestion.question_id;

  //       // console.log("Responses to be sent:", responses);
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
  //           selectedOption3: calculatorValue, // Add the calculator value to responses
  //           isRadioType: true,
  //           value: selectedAnswersMap4[questionId],
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

  //       setClickCount((prevCount) => prevCount + 1);
  //     }
  //   } catch (error) {
  //     console.error("Error handling next click:", error);
  //   }

  //   // --------------------------------end of button functionality --------------------------------------------------
  // };

  //practice
  const handleSaveNextQuestion = async () => {
    // ------------------------------------ button functionality --------------------------------------------
    // Update question status for the current question
    const updatedQuestionStatus = [...questionStatus];
    const currentQuestion = questionData.questions[currentQuestionIndex];

    const isRadioType = currentQuestion.type === "TF(True or False)";
    const isCurrentQuestionAnswered =
      selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
      (selectedAnswersMap2[currentQuestion.question_id] &&
        selectedAnswersMap2[currentQuestion.question_id].length > 0);

     const isResponseCleared =
      selectedAnswersMap1[currentQuestion.question_id] === null ||
      selectedAnswersMap2[currentQuestion.question_id]?.length === 0;

    if (!isCurrentQuestionAnswered && !isRadioType) {
      // updatedQuestionStatus[currentQuestionIndex] = "notAnswered";
      // setQuestionStatus(updatedQuestionStatus);
      window.alert("Please answer the question before proceeding.");
    } else if (isCurrentQuestionAnswered) {
      // If the current question is not answered, update the status
      const updatedQuestionStatus = [...questionStatus];
      updatedQuestionStatus[currentQuestionIndex] = "answered";
      setQuestionStatus(updatedQuestionStatus);

      setCurrentQuestionIndex((prevIndex) => {
        if (prevIndex < questionData.questions.length - 1) {
          return prevIndex + 1;
        }
      }
      );
      // updatedQuestionStatus[currentQuestionIndex] = "notAnswered"
      // You may also show a message or perform other actions to indicate that the question is not answered
      console.log("Question not answered!");
    } else if (isRadioType && selectedAnswersMap4[currentQuestion.question_id] === undefined) {
      // If it's a true/false question and no value is selected
      window.alert("Please answer the true/false question before proceeding.");
    } else if (isCurrentQuestionAnswered === markForReview()) {
      updatedQuestionStatus[currentQuestionIndex] =
        "Answered but marked for review";
      updateCounters();

      setCurrentQuestionIndex((prevIndex) => {
        if (prevIndex < questionData.questions.length - 1) {
          return prevIndex + 1;
        }
      });
    }

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
        // its for NATD( Numeric Answer type of questions with Decimal values)
        const selectedOption3 =
          selectedAnswersMap3[currentQuestion.question_id];

        const optionIndexes1 =
          selectedOption1 !== undefined ? [selectedOption1] : [];
        const optionIndexes2 =
          selectedOption2 !== undefined ? selectedOption2 : [];

        const questionId = currentQuestion.question_id;

        // console.log("Responses to be sent:", responses);
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
            selectedOption3: calculatorValue, // Add the calculator value to responses
            isRadioType: isRadioType,
            value: isRadioType ? selectedAnswersMap4[questionId] === "true" : undefined,
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
        console.log("Handle Next Click - New Response Saved");

        setAnsweredQuestionsMap((prevMap) => ({
          ...prevMap,
          [questionId]: true,
        }));

        setClickCount((prevCount) => prevCount + 1);
      }
    } catch (error) {
      console.error("Error handling next click:", error);
    }

    // --------------------------------end of button functionality --------------------------------------------------
  };

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

  //main working
  // const markForReview = () => {
  //   const currentQuestion = questionData.questions[currentQuestionIndex];
  //   const isCurrentQuestionAnswered =
  //     selectedAnswersMap1[currentQuestion.question_id] !== undefined ||
  //     (selectedAnswersMap2[currentQuestion.question_id] &&
  //       selectedAnswersMap2[currentQuestion.question_id].length > 0);

  //   // Update questionStatus for the marked question
  //   const updatedQuestionStatus = [...questionStatus];
  //   if (isCurrentQuestionAnswered) {
  //     updatedQuestionStatus[currentQuestionIndex] =
  //       "Answered but marked for review";
  //   } else {
  //     updatedQuestionStatus[currentQuestionIndex] = "marked";
  //   }

  //   setQuestionStatus(updatedQuestionStatus);

  //   setCurrentQuestionIndex((prevIndex) => {
  //     if (prevIndex < questionData.questions.length - 1) {
  //       return prevIndex + 1;
  //     }
  //   });
  // };

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
      const updatedQuestionStatus = [...questionStatus];
      updatedQuestionStatus[currentQuestionIndex] = "notAnswered";
      setQuestionStatus(updatedQuestionStatus);
    }
    //-----------------buttons functionality end--------------

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

  // -------------------------------END OF BUTTONS FUNCTIONALITIES-----------------------------------

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
                                  <div>
                                    {/* <input
                                      type="text"
                                      name={`question-${currentQuestionIndex}`}
                                      value={
                                        selectedAnswersMap3[
                                          questionData.questions[
                                            currentQuestionIndex
                                          ]?.question_id
                                        ] || ""
                                      }
                                      onChange={(e) => onAnswerSelected3(e)}
                                    /> */}
                                    <div className="calculator">
                                      <form action="">
                                        <div className="display">
                                          <input type="text"  name={`question-${currentQuestionIndex}`} value={value} onChange={(e) => onAnswerSelected3(e)}/>
                                          {/* <input
                                      type="text"
                                      name={`question-${currentQuestionIndex}`}
                                      value={
                                        selectedAnswersMap3[
                                          questionData.questions[
                                            currentQuestionIndex
                                          ]?.question_id
                                        ] || ""
                                      }
                                      onChange={(e) => onAnswerSelected3(e)}
                                    /> */}
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
                                            onClick={(e) =>
                                              setValue(eval(value))
                                            }
                                          />
                                        </div>
                                      </form>
                                    </div>
                                  </div>
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
                    <button onClick={handleSaveNextQuestion}>Save & Next</button>
                    <button
                      className="previous-btn"
                      onClick={handlePreviousClick}
                      disabled={currentQuestionIndex === 0}
                    >
                      <i className="fa-solid fa-angles-left"></i> Back
                    </button>
                    <button onClick={handleNextQuestion}>Next</button>
                  </div>
                  <div></div>
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
                    setVisitedCount={setVisitedCount}
                    updateCounters={updateCounters}
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
