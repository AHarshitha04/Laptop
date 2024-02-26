import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
// import ButtonsFunctionality from "./ButtonsFunctionality";
 
const TestResultsPage = () => {
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


 

  const [questionCount, setQuestionCount] = useState(null);
 
  useEffect(() => {
    const fetchQuestionCount = async () => {
      try {
        const response = await fetch('http://localhost:5001/QuestionPaper/questionCount'); // Update the URL based on your backend API endpoint
        const data = await response.json();
        setQuestionCount(data);
      } catch (error) {
        console.error('Error fetching question count:', error);
      }
    };
 
    fetchQuestionCount();
  }, []);
 
  return (
    <div>
      <h2>Score Card</h2>
      <div>
        <div>
          <h1>Your Test Performance</h1>
          <p>Your Score</p>
          <p>Attempted Questions</p>
          <p>Correct</p>
          <p>Top Score</p>
          <p>Live Rank</p>
        </div>
 
 
        <div>
     
        </div>
 
      </div>
      <table id="customers">
        <tr>
          <td>Total Questions: <span>
     
            </span></td>
          <td>Total Attempted</td>
          <td>Correct Answers</td>
          <td>Incorrect Answers</td>
          <td>Score</td>
        </tr>
        <tr>
          <td>  
          {questionCount && questionCount.length > 0 ? (
      <p>{questionCount[0].total_question_count}</p>
    ) : (
      <p>Loading...</p>
    )}
    </td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
          <td>0</td>
        </tr>
      </table>
      <br />
      <table id="customers">
        <tr>
          <td>Question No.</td>
          <td>Selected Option</td>
          <td>Status</td>
          <td>Correct Option</td>
        </tr>
        {answer.map((answerData, index) => (
          <tr key={index}>
            <td>Question: {answerData.question_id}</td>
            <td>{/* Add selected option logic here */}</td>
            <td>{/* Add status logic here */}</td>
            <td>{answerData.answer_text}</td>
          </tr>
        ))}
      </table>
    </div>
  );
};
 
export default TestResultsPage;












