import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import ButtonsFunctionality from "./ButtonsFunctionality";
import "./TestResultPage.css";
import DemoDeleteItsNotImp from "./DemoDeleteItsNotImp";

const TestResultsPage = () => {
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
  const [answer, setAnswer] = useState([]);

  useEffect(() => {
    const fetchAnswer = async () => {
      try {
        const responseAnswer = await fetch(
          `http://localhost:5001/QuestionPaper/answer`
        );
        const answer = await responseAnswer.json();
        setAnswer(answer);
      } catch (error) {
        console.error("Error fetching question types:", error);
      }
    };

    fetchAnswer();
  });

  // const [answer, setAnswer] = useState([]);
  const [questionData, setQuestionData] = useState({});
  const [questionStatus, setQuestionStatus] = useState([]);
  // const [selectedAnswers, setSelectedAnswers] = useState([]);
  // const { testCreationTableId } = useParams();
  const [answeredCount, setAnsweredCount] = useState(0);
  const [notAnsweredCount, setNotAnsweredCount] = useState(0);

  // const data = [
  //   {
  //     name: 'Page A',
  //     uv: 4000,
  //     pv: 2400,
  //     amt: 2400,
  //   },
  //   {
  //     name: 'Page B',
  //     uv: 3000,
  //     pv: 1398,
  //     amt: 2210,
  //   },
  //   {
  //     name: 'Page C',
  //     uv: 2000,
  //     pv: 9800,
  //     amt: 2290,
  //   },
  //   {
  //     name: 'Page D',
  //     uv: 2780,
  //     pv: 3908,
  //     amt: 2000,
  //   },
  //   {
  //     name: 'Page E',
  //     uv: 1890,
  //     pv: 4800,
  //     amt: 2181,
  //   },
  //   {
  //     name: 'Page F',
  //     uv: 2390,
  //     pv: 3800,
  //     amt: 2500,
  //   },
  //   {
  //     name: 'Page G',
  //     uv: 3490,
  //     pv: 4300,
  //     amt: 2100,
  //   },
  // ];
  const { testCreationTableId, user_Id,userId } = useParams();

  const [questionCount, setQuestionCount] = useState(null);

  // useEffect(() => {
  //   const fetchQuestionCount = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5001/QuestionPaper/questionCount`
  //       ); // Update the URL based on your backend API endpoint
  //       const data = await response.json();
  //       setQuestionCount(data);
  //     } catch (error) {
  //       console.error("Error fetching question count:", error);
  //     }
  //   };

  //   fetchQuestionCount();
  // }, []);

  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/questionCount/${testCreationTableId}`
        ); // Replace "yourTestCreationTableId" with the actual testCreationTableId
        const data = await response.json();
        setQuestionCount(data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };

    fetchQuestionCount();
  }, [testCreationTableId]);

  const [attemptCount, setAttemptCount] = useState(null);
  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/attemptCount/${testCreationTableId}/8`
        );
        const data = await response.json();
        setAttemptCount(data);
        console.log(setAttemptCount, data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };

    fetchQuestionCount();
  }, [testCreationTableId, user_Id]);

  const [correctAnswers, setCorrectAnswersCount] = useState(null);
  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/correctAnswers/${testCreationTableId}/8`
        );
        const data = await response.json();
        setCorrectAnswersCount(data);
        console.log(setAttemptCount, data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };

    fetchQuestionCount();
  }, [testCreationTableId, user_Id]);

  const [incorrectAnswers, setIncorrectAnswersCount] = useState(null);
  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/incorrectAnswers/${testCreationTableId}/8`
        );
        const data = await response.json();
        setIncorrectAnswersCount(data);
        console.log(setAttemptCount, data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };

    fetchQuestionCount();
  }, [testCreationTableId, user_Id]);

  // const [score, setScoreCount] = useState(null);
  // useEffect(() => {
  //   const fetchQuestionCount = async () => {
  //     try {
  //       const response = await fetch(
  //         `http://localhost:5001/QuestionPaper/score/2/2`
  //       );
  //       const data = await response.json();
  //       setScoreCount(data);
  //       console.log(setAttemptCount, data);
  //     } catch (error) {
  //       console.error("Error fetching question count:", error);
  //     }
  //   };

  //   fetchQuestionCount();
  // }, [testCreationTableId, user_Id]);

  const [score, setScoreCount] = useState({ totalMarks: 0, netMarks: 0 });

  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/score/${testCreationTableId}/8`
        );
        const data = await response.json();
        setScoreCount(data);
        console.log(setScoreCount, data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };

    fetchQuestionCount();
  }, [testCreationTableId, user_Id]);

  useEffect(() => {
    const fetchEmployeeData = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await fetch(
          "http://localhost:5001/QuestionPaper/getEmployeeData",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.ok) {
          const employeeData = await response.json();
          console.log("Employee Data:", employeeData);
          // Set your state or perform other actions with the employeeData
        } else {
          console.error(
            "Unexpected response from server:",
            response.statusText
          );
        }
      } catch (error) {
        console.error("Error during request:", error);
      }
    };

    fetchEmployeeData();
  }, []);

  // /getTimeLeftSubmissions/:userId/:testCreationTableId

  const [TimeSpent, setTimeSpent] = useState(null);
  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch(
          `http://localhost:5001/QuestionPaper/getTimeLeftSubmissions/${userId}/${testCreationTableId}`
          // `http://localhost:5001/QuestionPaper/getTimeLeftSubmissions/2/1`

        );
        const data = await response.json();
        setTimeSpent(data);
        // console.log(setAttemptCount, data);
      } catch (error) {
        console.error("Error fetching question count:", error);
      }
    };

    fetchQuestionCount();
  }, [testCreationTableId, userId]);
  console.log("hello")
  console.log(TimeSpent);

  return (
    <div className="testResult_-container">
      <h1>Scrore Card</h1>
      <div className="user_-infoFromResult">
        <div>
          <img
            title={userData.username}
            src={userData.imageData}
            alt={`Image ${userData.user_Id}`}
            style={{ borderRadius: "50%", width: "90px" }}
          />
        </div>
        <div>
          <p>Name: {userData.username}</p>
          <p>Email: {userData.email}</p>
        </div>
      </div>

      <div className="testResultTable">
        <table id="customers">
          <tr>
            <td>
              Total Questions: <span></span>
            </td>
            <td>Total Attempted</td>
            <td>Correct Answers</td>
            <td>Incorrect Answers</td>
            <td>Score</td>
            <td>Time Spent</td>
          </tr>
          <tr>
            <td>
              {questionCount && questionCount.length > 0 ? (
                <p>{questionCount[0].total_question_count}</p>
              ) : (
                <span>Loading...</span>
              )}
            </td>
            <td>
              {" "}
              {attemptCount && attemptCount.length > 0 ? (
                <p>{attemptCount[0].total_attempted_questions}</p>
              ) : (
                <span>Loading...</span>
              )}
            </td>
            <td>
              {correctAnswers && correctAnswers.length > 0 ? (
                <p>{correctAnswers[0].total_matching_rows}</p>
              ) : (
                <span>Loading...</span>
              )}
            </td>
            <td>
              {" "}
              {incorrectAnswers && incorrectAnswers.length > 0 ? (
                <p>{incorrectAnswers[0].total_unmatched_rows}</p>
              ) : (
                <span>Loading...</span>
              )}
            </td>
            <td>{score.netMarks}</td>
            {
  TimeSpent ? (
    TimeSpent.map((time, index) => {
      console.log('Time:', time); // Add this line for debugging
      return (
        <tr key={index}>
          <td>{time.time_left}</td>
        </tr>
      );
    })
  ) : (
    <tr>
      <td colSpan="6">Loading...</td>
    </tr>
  )
}
            {/* {
              TimeSpent.map((time, index) => (
                <tr key={index}>
                  <td>{time.time_left}</td>
                </tr>
              ))} */}
            {/* {TimeSpent ? (
              TimeSpent.map((time, index) => (
                <tr key={index}>
                  <td>{time.time_left}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6">Loading...</td>
              </tr>
            )} */}
          </tr>
        </table>
      </div>

      <br />
      
      <div className="testResultTable">
        <table id="customers" >
          <tr>
            <td>Question No.</td>
            <td>Selected Option</td>
            <td>Status</td>
            <td>Correct Option</td>
          </tr>
          {answer.map((answerData, index) => (
            <tr key={index}>
              <td>Question: {answerData.question_id}</td>
              <td></td>
              <td></td>
              <td>{answerData.answer_text}</td>
            </tr>
          ))}
        </table>
      </div>
    </div>
  );
};

export default TestResultsPage;
