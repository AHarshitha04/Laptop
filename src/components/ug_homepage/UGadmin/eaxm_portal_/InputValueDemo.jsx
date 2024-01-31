
// import React, { useState, useEffect } from "react";
 
// const InputValueDemo = () => {
//   const [questions, setQuestions] = useState([
//     { id: 1, text: "What is your favorite color?", answer: "" },
//     { id: 2, text: "What is your favorite animal?", answer: "" },
//     { id: 3, text: "What is your favorite food?", answer: "" },
//     { id: 4, text: "What is your favorite movie?", answer: "" },
//     // Add more questions as needed
//   ]);
 
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [calculatorInput, setCalculatorInput] = useState("");
 
//   useEffect(() => {
//     // Load answers from localStorage when component mounts
//     const storedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || [];
//     setQuestions(storedAnswers);
//   }, []);
 
//   useEffect(() => {
//     // Save answers to localStorage whenever answers change
//     localStorage.setItem("quizAnswers", JSON.stringify(questions));
//   }, [questions]);
 
//   const handleInputChange = (event) => {
//     const newQuestions = [...questions];
//     newQuestions[currentQuestion].answer = event.target.value;
//     setQuestions(newQuestions);
 
//     // Synchronize calculatorInput with regular input
//     setCalculatorInput(event.target.value);
//   };
 
//   const handleNextQuestion = () => {
//     if (currentQuestion < questions.length - 1) {
//       setCurrentQuestion(currentQuestion + 1);
//       // Set calculator input to the next question's answer
//       setCalculatorInput(questions[currentQuestion + 1].answer || "");
//     } else {
//       // Handle quiz completion or navigation to the result page
//       console.log("Quiz completed");
//     }
//   };
 
//   const handlePreviousQuestion = () => {
//     if (currentQuestion > 0) {
//       setCurrentQuestion(currentQuestion - 1);
//       // Set calculator input to the previous question's answer
//       setCalculatorInput(questions[currentQuestion - 1].answer || "");
//     }
//   };
 
//   const handleCalculatorButtonClick = (value) => {
//     setCalculatorInput((prevInput) => prevInput + value);
//   };
 
//   const handleCalculatorClear = () => {
//     setCalculatorInput("");
//   };
 
//   const handleCalculatorDelete = () => {
//     setCalculatorInput((prevInput) => prevInput.slice(0, -1));
//   };
 
//   const handleCalculatorEqual = () => {
//     const evaluatedValue = eval(calculatorInput);
//     const newQuestions = [...questions];
//     newQuestions[currentQuestion].answer = isNaN(evaluatedValue) ? "" : evaluatedValue;
//     setQuestions(newQuestions);
//     setCalculatorInput("");
//   };
 
//   const handleClearResponse = () => {
//     const newQuestions = [...questions];
//     newQuestions[currentQuestion].answer = "";
//     setQuestions(newQuestions);
//     setCalculatorInput("");
//   };
 
//   return (
//     <div>
//       <h1>React Quiz App</h1>
//       <div>
//         <p>{questions[currentQuestion].text}</p>
//         {/* Controlled input for regular questions */}
//         <input
//           type="text"
//           value={questions[currentQuestion].answer}
//           onChange={handleInputChange}
//         />
//       </div>
//       <div>
//         <h2>Calculator</h2>
//         {/* Separate input for the calculator */}
//         <input
//           type="text"
//           value={calculatorInput}
//           readOnly
//         />
//         <div>
//           <button onClick={() => handleCalculatorButtonClick("7")}>7</button>
//           <button onClick={() => handleCalculatorButtonClick("8")}>8</button>
//           <button onClick={() => handleCalculatorButtonClick("9")}>9</button>
//           <button onClick={handleCalculatorDelete}>DEL</button>
//         </div>
//         <div>
//           <button onClick={() => handleCalculatorButtonClick("4")}>4</button>
//           <button onClick={() => handleCalculatorButtonClick("5")}>5</button>
//           <button onClick={() => handleCalculatorButtonClick("6")}>6</button>
//           <button onClick={() => handleCalculatorButtonClick("*")}>*</button>
//         </div>
//         <div>
//           <button onClick={() => handleCalculatorButtonClick("1")}>1</button>
//           <button onClick={() => handleCalculatorButtonClick("2")}>2</button>
//           <button onClick={() => handleCalculatorButtonClick("3")}>3</button>
//           <button onClick={() => handleCalculatorButtonClick("-")}>-</button>
//         </div>
//         <div>
//           <button onClick={() => handleCalculatorButtonClick("0")}>0</button>
//           <button onClick={handleCalculatorClear}>C</button>
//           <button onClick={handleCalculatorEqual}>=</button>
//           <button onClick={() => handleCalculatorButtonClick("+")}>+</button>
//         </div>
//       </div>
//       <div>
//         <button onClick={handlePreviousQuestion} disabled={currentQuestion === 0}>
//           Previous
//         </button>
//         <button onClick={handleNextQuestion}>
//           Next
//         </button>
//       </div>
//       <div>
//         <button onClick={handleClearResponse}>
//           Clear Response
//         </button>
//       </div>
//     </div>
//   );
// };
 
// export default InputValueDemo;
 
 
 
 
 
 
 
import React, { useState, useEffect } from "react";
 
const InputValueDemo = () => {
  const [questions, setQuestions] = useState([
    { id: 1, text: "What is your favorite color?", answer: "" },
    { id: 2, text: "What is your favorite animal?", answer: "" },
    { id: 3, text: "What is your favorite food?", answer: "" },
    { id: 4, text: "What is your favorite movie?", answer: "" },
  ]);
 
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [calculatorInput, setCalculatorInput] = useState("");
 
  useEffect(() => {
    const storedAnswers = JSON.parse(localStorage.getItem("quizAnswers")) || [];
    setQuestions(storedAnswers);
  }, []);
 
  useEffect(() => {
    localStorage.setItem("quizAnswers", JSON.stringify(questions));
  }, [questions]);
 
  const handleInputChange = (event) => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].answer = event.target.value;
    setQuestions(newQuestions);
    setCalculatorInput(event.target.value);
  };
 
  const handleNavigation = (offset) => {
    const nextQuestion = currentQuestion + offset;
    if (nextQuestion >= 0 && nextQuestion < questions.length) {
      setCurrentQuestion(nextQuestion);
      setCalculatorInput(questions[nextQuestion].answer || "");
    } else {
      console.log("Quiz completed");
    }
  };
 
  const handleCalculatorButtonClick = (value) => {
    setCalculatorInput((prevInput) => prevInput + value);
  };
 
  const handleCalculatorClear = () => {
    setCalculatorInput("");
  };
 
  const handleCalculatorDelete = () => {
    setCalculatorInput((prevInput) => prevInput.slice(0, -1));
  };
 
  const handleCalculatorEqual = () => {
    const evaluatedValue = eval(calculatorInput);
    const newQuestions = [...questions];
    newQuestions[currentQuestion].answer = isNaN(evaluatedValue) ? "" : evaluatedValue;
    setQuestions(newQuestions);
    setCalculatorInput("");
  };
 
  const handleClearResponse = () => {
    const newQuestions = [...questions];
    newQuestions[currentQuestion].answer = "";
    setQuestions(newQuestions);
    setCalculatorInput("");
  };
 
  return (
    <div>
      <h1>React Quiz App</h1>
      <div>
        <p>{questions[currentQuestion].text}</p>
        <input type="text" value={questions[currentQuestion].answer} onChange={handleInputChange} />
      </div>
      <div>
        <h2>Calculator</h2>
        <input type="text" value={calculatorInput} readOnly />
        <div>
          {[7, 8, 9, "DEL"].map((value) => (
            <button key={value} onClick={() => handleCalculatorButtonClick(value)}>
              {value}
            </button>
          ))}
        </div>
        <div>
          {[4, 5, 6, "*"].map((value) => (
            <button key={value} onClick={() => handleCalculatorButtonClick(value)}>
              {value}
            </button>
          ))}
        </div>
        <div>
          {[1, 2, 3, "-"].map((value) => (
            <button key={value} onClick={() => handleCalculatorButtonClick(value)}>
              {value}
            </button>
          ))}
        </div>
        <div>
          {[0, "C", "=", "+"].map((value) => (
            <button key={value} onClick={() => (value === "=" ? handleCalculatorEqual() : handleCalculatorButtonClick(value))}>
              {value}
            </button>
          ))}
        </div>
      </div>
      <div>
        <button onClick={() => handleNavigation(-1)} disabled={currentQuestion === 0}>
          Previous
        </button>
        <button onClick={() => handleNavigation(1)}>
          Next
        </button>
      </div>
      <div>
        <button onClick={handleClearResponse}>
          Clear Response
        </button>
      </div>
    </div>
  );
};
 
export default InputValueDemo;
 