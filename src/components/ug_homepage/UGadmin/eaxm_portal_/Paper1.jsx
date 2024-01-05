import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonsFunctionality from "./ButtonsFunctionality";
import "./styles/Paper.css";
import { type } from "@testing-library/user-event/dist/type";

const Paper1 = () => {
  const [data, setData] = useState({ questions: [] });
  const { subjectId, testCreationTableId } = useParams();
  const [Subjects, setSubjects] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questionStatus, setQuestionStatus] = useState(
    Array.isArray(data) ? Array(data.questions.length).fill("notAnswered") : []
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

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestionIndex(questionNumber - 1);
  };

  const handleSubjectsClick = async (clickedSubjectId) => {
    setCurrentQuestionIndex(0);
    setSelectedSubject(clickedSubjectId);

    const selectedAnswersForSubject =
      selectedAnswersMap1[clickedSubjectId] || [];
    setSelectedAnswers(selectedAnswersForSubject);

    try {
      const response = await fetch(
        `http://localhost:5001/QuestionPaper/getPaperData/${testCreationTableId}`
      );
      const subjectsData = await response.json();

      if (subjectsData && subjectsData.questions) {
        setData(subjectsData);
        setSelectedSubject(clickedSubjectId);
        setSections(subjectsData.sections);
        setCurrentQuestionIndex(0);

        if (clickedSubjectId !== selectedSubject) {
          navigate(`/getPaperData/${testCreationTableId}`);
        }
      } else {
        console.error("Invalid data format:", subjectsData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handlePreviousClick = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const clearResponse = async () => {
    try {
      const questionId = data.questions[currentQuestionIndex].question_id;
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
  const correctAnswer =
    data && data.questions && data.questions[currentQuestionIndex]
      ? data.questions[currentQuestionIndex].correct_answer
      : null; // or provide a default value based on your logic

  // /user

  //user name
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/getPaperData/${testCreationTableId}`
        );
        const result = await response.json();
        setData(result);
        console.log(data);
        console.log("hello");
        console.log(testCreationTableId);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [testCreationTableId]);
  const handleNextClick = async () => {
    const response = await fetch(
      `http://localhost:5001/QuestionPaper/getPaperData/${testCreationTableId}`
    );
    const result = await response.json();
    setData(result);
    console.log(result.testData[0].testCreationTableId);
    console.log(result.testData)
    console.log(data);
    console.log("hello123456788");
    console.log(testCreationTableId);

    console.log("Before state update", currentQuestionIndex);

    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < data.questions.length - 1) {
        return prevIndex + 1;
      }
    });
    try {
      console.log("User ID:", userData.user_Id);
      console.log(
        "Test Creation Table ID:",
        result.testData[0].testCreationTableId
      );
      console.log("Current Question:", currentQuestion);

      const token = localStorage.getItem("token");
      const response = await fetch(
        "http://localhost:5001/ughomepage_banner_login/user",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to headers for authentication
          },
        }
      );

      // Move these lines to the top to ensure variables are properly declared
      const user_Id = userData.user_Id;
      const testCreationTableId = data.testCreationTableId;
      const currentQuestion = data.questions[currentQuestionIndex];

      if (!data || !data.questions) {
        console.error("Data or questions are null or undefined");
        return;
      }

      if (isNaN(user_Id) || isNaN(testCreationTableId) || !currentQuestion) {
        console.error("Invalid values or question data");
        return;
      }

      const selectedOption1 = selectedAnswersMap1[currentQuestion.question_id];
      const selectedOption2 = selectedAnswersMap2[currentQuestion.question_id];

      const optionIndexes1 =
        selectedOption1 !== undefined ? [selectedOption1] : [];
      const optionIndexes2 =
        selectedOption2 !== undefined ? selectedOption2 : [];

      const questionId = currentQuestion.question_id;

      if (answeredQuestionsMap[questionId]) {
        const updatedResponse = {
          optionIndexes1: optionIndexes1.map((index) =>
            String.fromCharCode("a".charCodeAt(0) + index)
          ),
          optionIndexes2: optionIndexes2.map((index) =>
            String.fromCharCode("a".charCodeAt(0) + index)
          ),
        };

        const updateResponse = await axios.put(
          `http://localhost:5001/QuestionPaper/updateResponse/${questionId}`,
          {
            updatedResponse,
          }
        );

        console.log(updateResponse.data);
        console.log("Handle Next Click - Response Updated");
      } else {
        const responses = {
          user_Id,
          testCreationTableId,
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
      }

      setClickCount((prevCount) => prevCount + 1);
      if (currentQuestionIndex < data.length - 1) {
        // setCurrentQuestionIndex((prevActiveQuestion) => prevActiveQuestion + 1);
      } else {
        // setShowResult(true);
        calculateResult();
      }
    } catch (error) {
      console.error("Error handling next click:", error);
    }
  };

  // const handleNextClick = async () => {
  //   console.log("Before state update", currentQuestionIndex);

  //   setCurrentQuestionIndex((prevIndex) => {
  //     if (prevIndex < data.questions.length - 1) {
  //       return prevIndex + 1;
  //     }
  //   });
  //   try {

  //     console.log("User ID:", userData.user_Id);
  //     console.log("Test Creation Table ID:", testCreationTableId);
  //     console.log("Current Question:", currentQuestion);

  //     const token = localStorage.getItem("token");
  //     const response = await fetch(
  //       "http://localhost:5001/ughomepage_banner_login/user",
  //       {
  //         headers: {
  //           Authorization: `Bearer ${token}`, // Attach token to headers for authentication
  //         },
  //       }
  //     );

  //     const responsetc = await fetch(
  //       `http://localhost:5001/QuestionPaper/getPaperData/${testCreationTableId}`
  //     );
  //     const result = await responsetc.json();
  //     setData(result);
  //     console.log(data);
  //      console.log("hiii")
  //      console.log(testCreationTableId)

  //     // const data = await responsetc.json();
  //     if (response.ok) {
  //       const userData = await response.json();
  //       setUserData(userData);
  //       console.log(userData);
  //     }
  //     if (!data || !data.questions) {
  //       console.error("Data or questions are null or undefined");
  //       return;
  //     }
  //     const user_Id = userData.user_Id;
  //     const testCreationTableId = data.testCreationTableId;
  //     const currentQuestion = data.questions[currentQuestionIndex];

  //     if (isNaN(user_Id) || isNaN(testCreationTableId) || !currentQuestion) {
  //       console.error("Invalid values or question data");
  //       return;
  //     }

  //     const selectedOption1 = selectedAnswersMap1[currentQuestion.question_id];
  //     const selectedOption2 = selectedAnswersMap2[currentQuestion.question_id];

  //     const optionIndexes1 =
  //       selectedOption1 !== undefined ? [selectedOption1] : [];
  //     const optionIndexes2 =
  //       selectedOption2 !== undefined ? selectedOption2 : [];

  //     const questionId = currentQuestion.question_id;

  //     if (answeredQuestionsMap[questionId]) {
  //       const updatedResponse = {
  //         optionIndexes1: optionIndexes1.map((index) =>
  //           String.fromCharCode("a".charCodeAt(0) + index)
  //         ),
  //         optionIndexes2: optionIndexes2.map((index) =>
  //           String.fromCharCode("a".charCodeAt(0) + index)
  //         ),
  //       };

  //       const updateResponse = await axios.put(
  //         `http://localhost:5001/QuestionPaper/updateResponse/${questionId}`,
  //         {
  //           updatedResponse,
  //         }
  //       );

  //       console.log(updateResponse.data);
  //       console.log("Handle Next Click - Response Updated");
  //     } else {
  //       const responses = {
  //         user_Id,
  //         testCreationTableId,
  //         [questionId]: {
  //           optionIndexes1: optionIndexes1.map((index) =>
  //             String.fromCharCode("a".charCodeAt(0) + index)
  //           ),
  //           optionIndexes2: optionIndexes2.map((index) =>
  //             String.fromCharCode("a".charCodeAt(0) + index)
  //           ),
  //         },
  //       };

  //       const saveResponse = await axios.post(
  //         "http://localhost:5001/QuestionPaper/response",
  //         {
  //           responses,
  //         }
  //       );

  //       console.log(saveResponse.data);
  //       console.log("Handle Next Click - New Response Saved");

  //       setAnsweredQuestionsMap((prevMap) => ({
  //         ...prevMap,
  //         [questionId]: true,
  //       }));
  //     }

  //     setClickCount((prevCount) => prevCount + 1);
  //     if (currentQuestionIndex < data.length - 1) {
  //       // setCurrentQuestionIndex((prevActiveQuestion) => prevActiveQuestion + 1);
  //     } else {
  //       // setShowResult(true);
  //       calculateResult();
  //     }

  //   } catch (error) {
  //     console.error("Error handling next click:", error);
  //   }
  // };

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
  const [selectedAnswers, setSelectedAnswers] = useState([]);

  const [questionTypes, setQuestionTypes] = useState([]);

  useEffect(() => {
    const fetchQuestionTypes = async () => {
      try {
        if (data && data.questions) {
          const qID = data.questions[currentQuestionIndex].question_id;

          const responseQuestionTypes = await fetch(
            `http://localhost:5001/QuestionPaper/questionType/${qID}`
          );
          const questionTypes = await responseQuestionTypes.json();
          setQuestionTypes(questionTypes);

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
  }, [data, currentQuestionIndex]);

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

        const response = await fetch(
          `http://localhost:5001/QuestionPaper/getPaperData/${testCreationTableId}`
        );
        const result = await response.json();
        setData(result);
        console.log(data);
        //  console.log(testCreationTableId)
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

  const [timer, setTimer] = useState(0);
  const [timers, setTimers] = useState(Array(data));
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

  const onAnswerSelected1 = (optionIndex) => {
    const questionId = data.questions[currentQuestionIndex].question_id;
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
  };

  const onAnswerSelected2 = (optionIndex) => {
    const questionId = data.questions[currentQuestionIndex].question_id;
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
  };

  // const [showExamSumary, setShowExamSumary] = useState(false);
  const calculateResult = () => {
    // // Make sure answeredQuestions is defined before accessing its length
    // const totalAttempted = answeredQuestions ? answeredQuestions.length : 0;
    // // const totalCorrect = result.correctAnswers;
  };

  const handleYes = () => {
    navigate("/SubmitPage");
  };

  const markForReview = () => {};

  return (
    <div>
      {!showExamSumary ? (
        <div>
          <div className="subjects">
            {Subjects.map((subjectTitle) => (
              <li key={subjectTitle.subjectId}>
                <button
                  onClick={() => handleSubjectsClick(subjectTitle.subjectId)}
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
            {data !== null && data.questions.length > 0 ? (
              <div className="qps_button_sections">
                <div className="question_paper_section">
                  <div className="question_options_container">
                    <div className="question">
                      <h3>{currentQuestionIndex + 1}.</h3>
                      <img
                        src={`data:image/png;base64,${data.questions[currentQuestionIndex].question_img}`}
                        alt="Question"
                      />
                    </div>

                    {data.options
                      .filter(
                        (opt) =>
                          opt.question_id ===
                          data.questions[currentQuestionIndex].question_id
                      )
                      .map((option, optionIndex) => (
                        <div className="option" key={option.option_id}>
                          <li className="option_li" key={optionIndex}>
                            {currentQuestionType &&
                              currentQuestionType.typeofQuestion.toLowerCase() ===
                                "mcq(multiple choice question)" && (
                                <input
                                  type="radio"
                                  name={`question-${currentQuestionIndex}-option`}
                                  value={String.fromCharCode(
                                    "A".charCodeAt(0) + optionIndex
                                  )}
                                  checked={
                                    selectedAnswersMap1[
                                      data.questions[currentQuestionIndex]
                                        .question_id
                                    ] === optionIndex
                                  }
                                  onChange={() =>
                                    onAnswerSelected1(optionIndex)
                                  }
                                />
                              )}

                            {currentQuestionType &&
                              currentQuestionType.typeofQuestion.toLowerCase() ===
                                "msq(multiple selection question)" && (
                                <input
                                  type="checkbox"
                                  name={`question-${currentQuestionIndex}-optionIndex`}
                                  value={String.fromCharCode(
                                    "A".charCodeAt(0) + optionIndex
                                  )}
                                  checked={
                                    selectedAnswersMap2[
                                      data.questions[currentQuestionIndex]
                                        .question_id
                                    ] &&
                                    selectedAnswersMap2[
                                      data.questions[currentQuestionIndex]
                                        .question_id
                                    ].includes(optionIndex)
                                  }
                                  onChange={() =>
                                    onAnswerSelected2(optionIndex)
                                  }
                                />
                              )}

                            {currentQuestionType &&
                              currentQuestionType.typeofQuestion.toLowerCase() ===
                                "nat(numerical answer type)" && (
                                <input
                                  type="text"
                                  name={`question-${currentQuestionIndex}`}
                                  value={
                                    selectedAnswersMap2[
                                      data.questions[currentQuestionIndex]
                                        .question_id
                                    ] || ""
                                  }
                                  onChange={(e) =>
                                    onAnswerSelected2(e.target.value)
                                  }
                                />
                              )}

                            {option.option_img && (
                              <div className="option_contents">
                                <p>
                                  (
                                  {String.fromCharCode(
                                    "A".charCodeAt(0) + optionIndex
                                  )}
                                  )
                                </p>
                                <img
                                  src={`data:image/png;base64,${option.option_img}`}
                                  alt={`Option-${optionIndex}`}
                                />
                              </div>
                            )}
                          </li>
                        </div>
                      ))}
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
                    <button className="save-btn" onClick={handleNextClick}>
                      Save and Next <i className="fa-solid fa-angles-right"></i>
                    </button>
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
                    data={data}
                  />
                  <button onClick={handleSubmit} id="resume_btn">
                    Submit
                  </button>
                </div>
              </div>
            ) : (
              <p>Loading data...</p>
            )}
          </div>
        </div>
      ) : (
        <div className="result">
          <h3 id="result_header">Exam Summary</h3>
          <div className="result_page_links"></div>
          <div className="result_contents">
            <p>
              Total Questions: <span>{data.questions.length}</span>
            </p>
            <p>
              Answered Questions:<span> {data.AnsweredQuestions}</span>
            </p>
            <p>
              Not Answered Questions:<span> {data.NotAnsweredQuestions}</span>
            </p>
            <p>
              Marked for Review Questions:
              <span> {data.MarkedforReviewQuestions}</span>
            </p>
            <p>
              Answered & Marked for Review Questions:
              <span> {data.AnsweredAndMarkedforReviewQuestions}</span>
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

export default Paper1;
