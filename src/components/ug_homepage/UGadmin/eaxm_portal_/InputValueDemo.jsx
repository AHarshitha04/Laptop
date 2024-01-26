import React, { useState } from "react";
 
const InputValueDemo = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: "What is your favorite color?", answer: "" },
    { id: 2, text: "What is your favorite animal?", answer: "" },
    // Add more questions as needed
  ]);
 
  const [currentQuestion, setCurrentQuestion] = useState(0);
 
  const handleInputChange = (event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].answer = event.target.value;
    setQuestions(newQuestions);
  };
 
  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Handle quiz completion or navigation to result page
      console.log("Quiz completed");
    }
  };
 
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };
 
  return (
    <div>
      <h1>React Quiz App</h1>
      <div>
        <p>{questions[currentQuestion].text}</p>
        <input
          type="text"
          value={questions[currentQuestion].answer}
          onChange={handleInputChange}
        />
      </div>
      <div>
        <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={handleNextQuestion}>
          Next
        </button>
      </div>
    </div>
  );
};
 
export default InputValueDemo;
 