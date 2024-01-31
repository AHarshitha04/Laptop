

// QuizPaper.js
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

const QuizPaper = () => {
  const [questionData, setQuestionData] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const { testCreationTableId } = useParams();
  const [value, setValue] = useState();

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

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questionData.questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const renderOptions = () => {
    const currentQuestion = questionData.questions[currentQuestionIndex];
    // console.log(currentQuestion.quesion_type.typeofQuestion)
    // console.log(currentQuestion.quesion_type.typeofQuestion)
    if (
      currentQuestion.quesion_type.typeofQuestion ===
        "MCQ4(MCQ with 4 Options)" ||
      currentQuestion.quesion_type.typeofQuestion === "MCQ5(MCQ with 5 Options)"
    ) {
      // Display options with radio buttons
      return (
        <ul>
        
          {currentQuestion.options.map((option) => (
            <li key={option.option_id}>
              <input
                type="radio"
                name="mcqOptions"
                value={option.option_index}
              />
              <label>
                ({option.option_index})
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
          {currentQuestion.options.map((option) => (
            <li key={option.option_id}>
              <input
                type="checkbox"
                name="msqOptions"
                value={option.option_index}
              />
              <label>
                ({option.option_index})
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
          Implement calculator here
          <div className="calculator">
            <div className="display">
              <label>Answer:</label>
              <input
                type="text"
                name={`question-${currentQuestionIndex}`}
                value={value}
                //   onChange={(e) => onAnswerSelected3(e)}
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
          {currentQuestion.options.map((option) => (
            <li key={option.option_id}>
              <input
                type="radio"
                name="tfOptions"
                value={option.option_index}
              />
              <label>
                ({option.option_index})
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
    <div>
      {questionData ? (
        <div>
          <p>
            Question ID:{" "}
            {questionData.questions[currentQuestionIndex].question_id}
          </p>
          {/* <p>Question Img: {questionData.questions[currentQuestionIndex].questionImgName}</p> */}
          <img
            src={`http://localhost:5001/uploads/${questionData.questions[currentQuestionIndex].documen_name}/${questionData.questions[currentQuestionIndex].questionImgName}`}
            alt={`Question ${questionData.questions[currentQuestionIndex].question_id}`}
            style={{ width: "583px" }}
          />
          {/* Add more details as needed */}
          {renderOptions()}
          <p>
            Question Type:{" "}
            {
              questionData.questions[currentQuestionIndex].quesion_type
                .typeofQuestion
            }
          </p>
          <button
            onClick={handlePreviousQuestion}
            disabled={currentQuestionIndex === 0}
          >
            Previous
          </button>
          <button
            onClick={handleNextQuestion}
            disabled={
              currentQuestionIndex === questionData.questions.length - 1
            }
          >
            Next
          </button>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default QuizPaper;
