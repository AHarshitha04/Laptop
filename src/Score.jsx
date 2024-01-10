import React, { useState, useEffect } from 'react';

export const Score = () => {
  const [result, setResult] = useState(null);
  const [userAnswers, setUserAnswers] = useState([]);

  // Assume you have a function to fetch user responses
  const fetchUserAnswers = async () => {
    try {
      // Replace with the actual logic to fetch user responses
      const response = await fetch('http://localhost:5001/fetchUserResponses');
      const data = await response.json();
      setUserAnswers(data.userResponses);
    } catch (error) {
      console.error('Error fetching user responses:', error);
    }
  };

  useEffect(() => {
    fetchUserAnswers();
  }, []);

  const handleClick = async () => {
    try {
      const response = await fetch('http://localhost:5001/QuestionPaper/compareAnswers', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          userId: '1',  // Replace with the actual user ID
          testCreationTableId: '1',  // Replace with the actual test ID
          answers: ['a', 'c', 'd', 'a', 'b', 'b', 'c', 'a', 'c', 'd', 'c', 'a', 'b', 'a', 'c'],
        }),
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}, ${response.statusText}`);
    }
      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div>
      <button onClick={handleClick}>Check Answers</button>

      {result && (
        <div>
          <h2>Result:</h2>
          <ul>
            {result.userMarks.map((mark) => (
              <li key={mark.question_id}>
                Question {mark.question_id}: {mark.isCorrect ? 'Correct' : 'Incorrect'}
                {mark.isCorrect && <span>, Marks: {mark.marks}</span>}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
