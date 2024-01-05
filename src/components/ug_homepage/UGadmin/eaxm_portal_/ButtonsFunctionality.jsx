import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { useParams } from "react-router-dom";
import './styles/RightSidebar.css'

const ButtonsFunctionality = ({
  onQuestionSelect,
  questionStatus,
  seconds,
  setQuestionStatus,
  answeredCount,
  notAnsweredCount,
  answeredmarkedForReviewCount,
  markedForReviewCount,
  VisitedCount,
  questionData,
}) => {



  const [wtimer, setWTimer] = useState(0);
 

  const [activeQuestion, setActiveQuestion] = useState(0);
const [answeredQuestions, setAnsweredQuestions] = useState([]);
const [isPaused, setIsPaused] = useState(false);


  const handleButtonClick = (questionNumber,status) => {
 
    
      // Check if the question is already answered, and return early if true
  if (questionStatus[questionNumber - 1] === "answered") {
    // Navigate to the selected question when it's already answered
    onQuestionSelect(questionNumber);
    return;
  }
    setActiveQuestion(questionNumber - 1);

    onQuestionSelect(questionNumber);
    setAnsweredQuestions((prevAnsweredQuestions) => [
      ...prevAnsweredQuestions,
      questionNumber,
    ]);
    setIsPaused(false);

    setQuestionStatus((prevQuestionStatus) => {
      const currentStatus = prevQuestionStatus[questionNumber - 1];

      if (currentStatus === "notVisited") {
        return [
          ...prevQuestionStatus.slice(0, questionNumber - 1),
          "notAnswered",
          ...prevQuestionStatus.slice(questionNumber),
        ];
      }
      // If none of the conditions are met, return the current state
      return prevQuestionStatus;
    });
   

  };


  

  const WformatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = seconds % 60;
    return `${hours > 9 ? hours : "0" + hours}:${
      minutes > 9 ? minutes : "0" + minutes
    }:${remainingSeconds > 9 ? remainingSeconds : "0" + remainingSeconds}`;
  };


  useEffect(() => {
    const interval = setInterval(() => {
      setWTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    // Clear the interval and handle time-up logic when timer reaches 0
    if (wtimer <= 0) {
      clearInterval(interval);
      // Handle time-up logic here (e.g., navigate to a different component)
    }

    // Clean up the interval on component unmount or when navigating away
    return () => {
      clearInterval(interval);
    };
  }, [wtimer]);

  const renderQuestionButtons = Array.isArray( questionData.questions)
  ? questionData.questions.map((question, index) => {
      let className = "right_bar_Buttons ";
      const questionKey = question.id || index;

      if (questionStatus && questionStatus[index] === "answered") {
        className += "instruction-btn1";
      } else if (questionStatus && questionStatus[index] === "notAnswered") {
        className += "instruction-btn2";
      } else if (questionStatus && questionStatus[index] === "marked") {
        className += "instruction-btn3";
      } else if (
        questionStatus &&
        questionStatus[index] === "Answered but marked for review"
      ) {
        className += "instruction-btn4";
      } else if (questionStatus && questionStatus[index] === "Visited") {
        className += "instruction-btn2";
      } else {
        className += "instruction-btn5"; // Default to instruction-btn5 for not visited
      }

      // Highlight the current question being displayed
      if (index === activeQuestion) {
        className += " active-question";
      }

      return (
        <li key={questionKey}>
          <button
            onClick={() => handleButtonClick(index + 1, "Visited")}
            className={className}
          >
            {index + 1}
          </button>
        </li>
      );
    })
  : null;

//user name
const [userData, setUserData] = useState({});
useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch("http://localhost:5001/ughomepage_banner_login/user", {
          headers: {
            Authorization: `Bearer ${token}`, // Attach token to headers for authentication
          },
        });

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

  return (
    <>
      <div className="right-side-bar">
        <div className="rightSidebar-topHeader">
          <p>Name of the person :  {userData.username}</p>
          <p>Time Left: {WformatTime(wtimer)}</p>
        </div>

        <div className="buttons_container">
         

          <div className="ques-btn">
            <ul className="btn-ul quesAns-btn ">{renderQuestionButtons}</ul>
          </div>
        </div>

        <div className="sidebar-footer">
          <h4 className="sidebar-footer-header">Legend</h4>
          <div className="footer-btns">
            <div className="inst-btns">
              <button className="instruction-btn1">{answeredCount}</button>
              <p>Answerd</p>
              <br />
            </div>
            <br />
            <div className="inst-btns">
              <button className="instruction-btn2">{notAnsweredCount}</button>
              <p>Not Answered</p>
              <br />
            </div>
            <br />
            <div className="inst-btns">
              <button className="instruction-btn3">
                {answeredmarkedForReviewCount}
              </button>
              <p>Marked</p>
              <br />
            </div>
            <br />
            <div className="inst-btns">
              <button className="instruction-btn4">
                {markedForReviewCount}
              </button>
              <p>Answered but marked for review</p>
            </div>{" "}
            <br />{" "}
            <div className="inst-btns">
              {" "}
              <button className="instruction-btn5">{VisitedCount}</button>
              <p>Not Visited</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};


ButtonsFunctionality.propTypes = {
  onQuestionSelect: PropTypes.func.isRequired,
  questionStatus: PropTypes.arrayOf(PropTypes.string).isRequired,
  setQuestionStatus: PropTypes.func.isRequired,

};



export default ButtonsFunctionality;















