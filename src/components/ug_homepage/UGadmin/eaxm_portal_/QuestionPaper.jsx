import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import axios from "axios";
import ButtonsFunctionality from "./ButtonsFunctionality";
import "./styles/Paper.css";

const QuestionPaper = () => {
  const [data, setData] = useState({ questions: [] });
  const [questionData, setQuestionData] = useState({ questions: [] });
  const { subjectId, testCreationTableId } = useParams();
  const [Subjects, setSubjects] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [questionStatus, setQuestionStatus] = useState(
    Array.isArray(questionData) ? Array(questionData.questions.length).fill("notAnswered") : []
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
  const handlePreviousClick = () => {
    setCurrentQuestionIndex((prevIndex) =>
      prevIndex > 0 ? prevIndex - 1 : prevIndex
    );
  };

  const clearResponse = async () => {
    try {
      const questionId = questionData.questions[currentQuestionIndex].question_id;
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

        // const response = await fetch(
        //   `http://localhost:5001/QuestionPaper/getPaperData/${testCreationTableId}`
        // );
        // const result = await response.json();
        // setData(result);
        // console.log(data);
        // console.log("hello");
        // console.log(testCreationTableId);
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
    const questionId = currentQuestion.questions[currentQuestionIndex].question_id;
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
    const questionId = currentQuestion.questions[currentQuestionIndex].question_id;
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

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
  };


  

  return (
    <div>
      <h1>hii</h1>
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
              {currentQuestion && currentQuestion.qtype && (
                <div>{currentQuestion.qtype.qtype_text}</div>
              )}
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
            {currentQuestion && (
              <div
                key={currentQuestionIndex}
                className="question-container"
                style={{ display: "flex" }}
              >
                <div>
                  <div>
                    <h3>Question {currentQuestion.question_id}</h3>
                    <img
                      src={`http://localhost:5001/uploads/${currentQuestion.documen_name}/${currentQuestion.questionImgName}`}
                      alt={`Question ${currentQuestion.question_id}`}
                    />
                    <div>
                    {currentQuestion.options &&
                        currentQuestion.options
                          .filter(
                            (opt) =>
                              opt.question_id ===
                              data.questions[currentQuestionIndex]?.question_id
                          )
                          
                          .map((option, optionIndex) => (
                            <div key={optionIndex}>
                               
                              {currentQuestion && currentQuestion.qtype && currentQuestion.question_id &&
                                typeof currentQuestion.qtype === "string" &&
                                currentQuestion.qtype.toLowerCase() ===
                                  "mcq(multiple choice question)" && (
                                    
                                  
                                  <input
                                    type="radio"
                                    name={`question-${currentQuestionIndex}-option`}
                                    value={String.fromCharCode(
                                      "A".charCodeAt(0) + optionIndex
                                    )}
                                    checked={
                                      selectedAnswersMap1[
                                        currentQuestion.questions[currentQuestionIndex]
                                          ?.question_id
                                      ] === optionIndex
                                    }
                                    onChange={() =>
                                      onAnswerSelected1(optionIndex)
                                    }
                                  />
                                )}

                              {currentQuestion && currentQuestion.qtype && currentQuestion.question_id &&
                                typeof currentQuestion.qtype === "string" &&
                                currentQuestion.qtype.toLowerCase() ===
                                  "msq(multiple selection question)" && (
                                  <input
                                    type="checkbox"
                                    name={`question-${currentQuestionIndex}-optionIndex`}
                                    value={String.fromCharCode(
                                      "A".charCodeAt(0) + optionIndex
                                    )}
                                    checked={
                                      selectedAnswersMap2[
                                        currentQuestion.questions[currentQuestionIndex]
                                          ?.question_id
                                      ] &&
                                      selectedAnswersMap2[
                                        questionData.questions[currentQuestionIndex]
                                          ?.question_id
                                      ].includes(optionIndex)
                                    }
                                    onChange={() =>
                                      onAnswerSelected2(optionIndex)
                                    }
                                  />
                              )}
                              {currentQuestion && currentQuestion.qtype && currentQuestion.question_id &&
                                typeof currentQuestion.qtype === "string" &&
                                currentQuestion.qtype.toLowerCase() ===
                                  "nat(numerical answer type)" && (
                                  <input
                                    type="text"
                                    name={`question-${currentQuestionIndex}`}
                                    value={
                                      selectedAnswersMap2[
                                        currentQuestion.questions[currentQuestionIndex]
                                          ?.question_id
                                      ] || ""
                                    }
                                    onChange={(e) =>
                                      onAnswerSelected2(e.target.value)
                                    }
                                  />
                              )}
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
              Answered Questions:<span> {questionData.AnsweredQuestions}</span>
            </p>
            <p>
              Not Answered Questions:<span> {questionData.NotAnsweredQuestions}</span>
            </p>
            <p>
              Marked for Review Questions:
              <span> {questionData.MarkedforReviewQuestions}</span>
            </p>
            <p>
              Answered & Marked for Review Questions:
              <span> {questionData.AnsweredAndMarkedforReviewQuestions}</span>
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
