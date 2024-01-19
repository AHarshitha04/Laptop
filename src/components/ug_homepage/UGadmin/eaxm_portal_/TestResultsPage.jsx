// import React ,{useState} from 'react'
// import { useParams, useNavigate } from "react-router-dom";
// import { BarChart, Bar, Rectangle, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import ButtonsFunctionality from './ButtonsFunctionality';

// const TestResultsPage = () => {

//   const data = [
//     {
//       name: 'Page A',
//       uv: 4000,
//       pv: 2400,
//       amt: 2400,
//     },
//     {
//       name: 'Page B',
//       uv: 3000,
//       pv: 1398,
//       amt: 2210,
//     },
//     {
//       name: 'Page C',
//       uv: 2000,
//       pv: 9800,
//       amt: 2290,
//     },
//     {
//       name: 'Page D',
//       uv: 2780,
//       pv: 3908,
//       amt: 2000,
//     },
//     {
//       name: 'Page E',
//       uv: 1890,
//       pv: 4800,
//       amt: 2181,
//     },
//     {
//       name: 'Page F',
//       uv: 2390,
//       pv: 3800,
//       amt: 2500,
//     },
//     {
//       name: 'Page G',
//       uv: 3490,
//       pv: 4300,
//       amt: 2100,
//     },
//   ];

//   const [answeredCount] = useState(0);

//     return (
//       <div>
//         <div>
//         <ButtonsFunctionality
//           answeredCount={answeredCount}
//           // onAnsweredCountChange={handleAnsweredCountChange}
//         />
//         </div>
//         <div>
//           <h1>Your Test Performance</h1>
//           <p>Your Score</p>
//           <p>Attempted Questions:{answeredCount}</p>
//           <p>Correct</p>
//           <p>Top Score</p>
//           <p>Live Rank</p>
//         </div>

//         <div>
//         <BarChart
//           width={500}
//           height={300}
//           data={data}
//           margin={{
//             top: 5,
//             right: 30,
//             left: 20,
//             bottom: 5,
//           }}
//         >
//           <CartesianGrid strokeDasharray="3 3" />
//           <XAxis dataKey="name" />
//           <YAxis />
//           <Tooltip />
//           <Legend />
//           <Bar dataKey="pv" fill="#8884d8" activeBar={<Rectangle fill="pink" stroke="blue" />} />
//           <Bar dataKey="uv" fill="#82ca9d" activeBar={<Rectangle fill="gold" stroke="purple" />} />
//         </BarChart>
//         </div>
//       </div>
//     );
//   };

//   export default TestResultsPage;






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
