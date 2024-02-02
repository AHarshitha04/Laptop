// QuizPaper.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import DemoDeleteItsNotImp2 from "./DemoDeleteItsNotImp2";
import logo from "./asserts/egradtutor_logo.png";

const QuizPaper = () => {
  const [questionData, setQuestionData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { testCreationTableId } = useParams();
  const [value, setValue] = useState();
  const [showExamSumary, setShowExamSumary] = useState(false);
  const navigate = useNavigate();
  const [answeredCount, setAnsweredCount] = useState(0);
  const [notAnsweredCount, setNotAnsweredCount] = useState(0);
  const [answeredmarkedForReviewCount, setAnsweredmarkedForReviewCount] =
    useState(0);
  const [markedForReviewCount, setMarkedForReviewCount] = useState(0);
  const [VisitedCount, setVisitedCount] = useState(0);
  const [questionStatus, setQuestionStatus] = useState(
    Array.isArray(questionData)
      ? Array(questionData.questions.length).fill("notAnswered")
      : []
  );
  const [activeQuestion, setActiveQuestion] = useState(0);
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

  const handleNo = () => {
    setShowExamSumary(false);
  };

  const handleQuestionSelect = (questionNumber) => {
    setCurrentQuestionIndex(questionNumber - 1);
    setActiveQuestion(questionNumber - 1);
  };
  const updateQuestionStatus = (index, status) => {
    // Update the question status in the QuestionPaper component
    const updatedQuestionStatus = [...questionStatus];
    updatedQuestionStatus[index] = status;
    setQuestionStatus(updatedQuestionStatus);
  };

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

  const [userData, setUserData] = useState("");
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
          const userId = userData.id;
        } else {
          // Handle errors, e.g., if user data fetch fails
        }
      } catch (error) {
        // Handle other errors
      }
    };

    fetchUserData();
  }, []);

  const NextQuestion = () => {
    if (currentQuestionIndex < questionData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

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

  const handleNextQuestion = async () => {
    if (currentQuestionIndex < questionData.questions.length - 1) {
      // Collect user response based on the question type
      const currentQuestion = questionData.questions[currentQuestionIndex];
      let userResponse;

      if (
        currentQuestion.quesion_type.typeofQuestion ===
          "MCQ4(MCQ with 4 Options)" ||
        currentQuestion.quesion_type.typeofQuestion ===
          "MCQ5(MCQ with 5 Options)" ||
        currentQuestion.quesion_type.typeofQuestion === "TF(True or false)"
      ) {
        // Handle radio button input
        const selector = `input[name="${currentQuestion.quesion_type.typeofQuestion
          .replace(/\(/g, "\\(")
          .replace(/\)/g, "\\)")}"]:checked`;

        const selectedOption = document.querySelector(selector);
        console.log("hello , hiii");
        console.log("User:", userData.id);
        console.log("value", value);
        // console.log("Selected Option:", userResponse);

        userResponse = selectedOption ? selectedOption.value : null;
      } else if (
        currentQuestion.quesion_type.typeofQuestion ===
          "MSQN(MSQ with -ve marking)" ||
        currentQuestion.quesion_type.typeofQuestion ===
          "MSQ(MSQ without -ve marking)"
      ) {
        // Handle checkbox input
        const selector = `input[name="${currentQuestion.quesion_type.typeofQuestion
          .replace(/\(/g, "\\(")
          .replace(/\)/g, "\\)")}"]:checked`;
        // console.log("Selector:", selector);

        const selectedOptions = document.querySelectorAll(selector);
        // console.log("Selected Options:", selectedOptions);

        userResponse = Array.from(selectedOptions).map(
          (option) => option.value
        );
      } else if (
        currentQuestion.quesion_type.typeofQuestion ===
          "NATD( Numeric Answer type of questions with Decimal values)" ||
        currentQuestion.quesion_type.typeofQuestion ===
          "NATI( Numeric Answer type of questions with integer values)"
      ) {
        // Handle numeric input
        userResponse = value; // Assuming value is the user's input
      }

      setValue("");
      // TODO: Send the user response to your server
      // await saveUserResponse(currentQuestion.question_id, userResponse);

      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  console.log("User:", userData.id);
  console.log("value", value);

  const clearResponse = () => {
    setValue("");
  };

  // const saveUserResponse = async (questionId, response) => {
  //   try {
  //     // Make a POST request to your server to save the user's response
  //     const response = await fetch("http://localhost:5001/saveUserResponse", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify({ questionId, response }),
  //     });

  //     if (!response.ok) {
  //       throw new Error(`HTTP error! Status: ${response.status}`);
  //     }

  //     const data = await response.json();
  //     console.log("User response saved successfully:", data);
  //   } catch (error) {
  //     console.error("Error saving user response:", error);
  //   }
  // };

  console.log("value", value);
  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderOptions = () => {
    const currentQuestion = questionData.questions[currentQuestionIndex];

    if (
      currentQuestion.quesion_type.typeofQuestion ===
        "MCQ4(MCQ with 4 Options)" ||
      currentQuestion.quesion_type.typeofQuestion === "MCQ5(MCQ with 5 Options)"
    ) {
      // Display options with radio buttons
      return (
        <ul>
          {currentQuestion.options.map((option, optionIndex) => (
            <li key={optionIndex}>
              <input
                type="radio"
                // name="mcqOptions"
                checked={
                  value === String.fromCharCode("A".charCodeAt(0) + optionIndex)
                }
                name={`mcqOptions-${currentQuestionIndex}`}
                // value={option.option_index}
                value={String.fromCharCode("A".charCodeAt(0) + optionIndex)}
                onChange={(e) => setValue(e.target.value)}
              />
              <label>
                {/* ({option.option_index}) */}(
                {String.fromCharCode("a".charCodeAt(0) + optionIndex)})
              </label>
              <img
                src={`http://localhost:5001/uploads/${questionData.questions[currentQuestionIndex].documen_name}/${option.optionImgName}`}
                alt={`Option ${option.option_id}`}
              />
            </li>
          ))}
        </ul>
      );
    } else if (
      currentQuestion.quesion_type.typeofQuestion ===
        "MSQN(MSQ with -ve marking)" ||
      currentQuestion.quesion_type.typeofQuestion ===
        "MSQ(MSQ without -ve marking)"
    ) {
      // Display options with checkboxes
      return (
        <ul>
          {currentQuestion.options.map((option, optionIndex) => (
            <li key={optionIndex}>
              <input
                type="checkbox"
                // name="msqOptions"
                name={`msqOptions-${currentQuestionIndex}`}
                // value={option.option_index}
                checked={value.includes(
                  String.fromCharCode("A".charCodeAt(0) + optionIndex)
                )}
                value={String.fromCharCode("A".charCodeAt(0) + optionIndex)}
                onChange={(e) => setValue(e.target.value)}
              />
              <label>
                {/* ({option.option_index}) */}(
                {String.fromCharCode("a".charCodeAt(0) + optionIndex)})
              </label>
              <img
                src={`http://localhost:5001/uploads/${questionData.questions[currentQuestionIndex].documen_name}/${option.optionImgName}`}
                alt={`Option ${option.option_id}`}
              />
            </li>
          ))}
        </ul>
      );
    } else if (
      currentQuestion.quesion_type.typeofQuestion ===
        "NATD( Numeric Answer type of questions with Decimal values)" ||
      currentQuestion.quesion_type.typeofQuestion ===
        "NATI( Numeric Answer type of questions with integer values)"
    ) {
      // Display calculator (you need to implement a calculator component)
      return (
        <div>
          <div className="calculator">
            <div className="display">
              <label>Answer:</label>
              <input
                type="text"
                name={`question-${currentQuestionIndex}`}
                value={value}
                // onChange={(e) => onAnswerSelected3(e)}
                onChange={(e) => setValue(e.target.value)}
                placeholder="Enter your answer"
                readOnly
              />
            </div>
            <div>
              <input type="button" value="AC" onClick={(e) => setValue("")} />
              <input
                type="button"
                value="DE"
                onClick={(e) => setValue(value.slice(0, -1))}
              />
              <input
                type="button"
                value="."
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="/"
                onClick={(e) => setValue(value + e.target.value)}
              />
            </div>
            <div>
              <input
                type="button"
                value="7"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="8"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="9"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="*"
                onClick={(e) => setValue(value + e.target.value)}
              />
            </div>
            <div>
              <input
                type="button"
                value="4"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="5"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="6"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="+"
                onClick={(e) => setValue(value + e.target.value)}
              />
            </div>
            <div>
              <input
                type="button"
                value="1"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="2"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="3"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="-"
                onClick={(e) => setValue(value + e.target.value)}
              />
            </div>
            <div>
              <input
                type="button"
                value="00"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="0"
                onClick={(e) => setValue(value + e.target.value)}
              />
              <input
                type="button"
                value="="
                className="equal"
                onClick={(e) => setValue(eval(value))}
              />
            </div>
          </div>
        </div>
      );
    } else if (
      currentQuestion.quesion_type.typeofQuestion === "TF(True or false)"
    ) {
      // Display options with radio buttons for True/False
      return (
        <ul>
          {currentQuestion.options.map((option, optionIndex) => (
            <li key={optionIndex}>
              <input
                type="radio"
                // name="tfOptions"
                name={`tfOptions-${currentQuestionIndex}`}
                // value={option.option_index}
                onChange={(e) => setValue(e.target.value)}
                value={String.fromCharCode("A".charCodeAt(0) + optionIndex)}
              />
              <label>
                ({String.fromCharCode("a".charCodeAt(0) + optionIndex)})
              </label>
              <img
                src={`http://localhost:5001/uploads/${questionData.questions[currentQuestionIndex].documen_name}/${option.optionImgName}`}
                alt={`Option ${option.option_id}`}
              />
            </li>
          ))}
        </ul>
      );
    }
  };

  return (
    <div className="QuestionPaper_-container">
      <div className="quiz_exam_interface_header">
        <div className="quiz_exam_interface_header_LOGO">
          <img src={logo} alt="" />
        </div>
      </div>
      <div>
        {!showExamSumary ? (
          <div className="quiz_exam_interface_body">
            {questionData ? (
              <div>
                <div>
                  <div class="subjects_BTN_container">
                    <li>
                      <h6>Time Left: {WformatTime(wtimer)}</h6>
                    </li>
                  </div>
                  <h3>
                    Question Type:{" "}
                    {
                      questionData.questions[currentQuestionIndex].quesion_type
                        .typeofQuestion
                    }
                  </h3>
                </div>
                <h3>{currentQuestionIndex + 1}</h3>
                <img
                  src={`http://localhost:5001/uploads/${questionData.questions[currentQuestionIndex].documen_name}/${questionData.questions[currentQuestionIndex].questionImgName}`}
                  alt={`Question ${questionData.questions[currentQuestionIndex].question_id}`}
                  style={{ width: "583px" }}
                />
                <div className="quiz_exam_interface_exam_qN_Q_options">
                  {renderOptions()}
                </div>

                <div>
                  <div>
                    <button
                      className="Quiz_Save_MarkforReview"
                      // onClick={markForReview}
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
                      onClick={handleNextQuestion}
                      disabled={
                        currentQuestionIndex ===
                        questionData.questions.length - 1
                      }
                    >
                      Save & Next
                    </button>
                  </div>
                  <div className="quiz_Next_back">
                    <button
                      onClick={handlePreviousQuestion}
                      disabled={currentQuestionIndex === 0}
                    >
                      <i className="fa-solid fa-angles-left"></i>
                      Back
                    </button>
                    <button
                      onClick={NextQuestion}
                      disabled={
                        currentQuestionIndex ===
                        questionData.questions.length - 1
                      }
                    >
                      Next
                    </button>
                    <button
                      style={{ background: "#f0a607da" }}
                      // onClick={handleSubmit}
                      id="resume_btn"
                    >
                      Submit
                    </button>
                  </div>
                </div>
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
                    // selectedSubject={selectedSubject}
                    questionData={questionData}
                    updateQuestionStatus={updateQuestionStatus}
                    // seconds={seconds}
                    seconds={600}
                  />
                </div>
              </div>
            ) : (
              <p>Loading...</p>
            )}
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
                style={{
                  background: "red",
                  fontWeight: "bold",
                  padding: "10px",
                }}
              >
                Yes
              </Link>
              <button onClick={handleNo}>NO</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizPaper;
