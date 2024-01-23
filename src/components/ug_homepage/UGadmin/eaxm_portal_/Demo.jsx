const handleNextClick = async () => {
    console.log("Before state update", currentQuestionIndex);
    setCurrentQuestionIndex((prevIndex) => {
      if (prevIndex < data.questions.length - 1) {
        return prevIndex + 1;
      }
    });
    
    try {
      if (!data || !data.questions) {
        console.error("Data or questions are null or undefined");
        return;
      }

      const currentQuestion = data.questions[currentQuestionIndex];
      const selectedOption1 = selectedAnswersMap1[currentQuestion.question_id];
      const selectedOption2 = selectedAnswersMap2[currentQuestion.question_id];

      const optionIndexes1 =
        selectedOption1 !== undefined ? [selectedOption1] : [];
      const optionIndexes2 =
        selectedOption2 !== undefined ? selectedOption2 : [];

      const questionId = currentQuestion.question_id;

      if (answeredQuestionsMap[questionId]) {
        const updatedResponse = {
          optionIndexes1: optionIndexes1.map((index) =>
            String.fromCharCode("a".charCodeAt(0) + index)
          ),
          optionIndexes2: optionIndexes2.map((index) =>
            String.fromCharCode("a".charCodeAt(0) + index)
          ),
        };

        const updateResponse = await axios.put(
          `http://localhost:4009/updateResponse/${questionId}`,
          {
            updatedResponse,
          }
        );

        console.log(updateResponse.data);
        console.log("Handle Next Click - Response Updated");
      } else {
        const responses = {
          [questionId]: {
            optionIndexes1: optionIndexes1.map((index) =>
              String.fromCharCode("a".charCodeAt(0) + index)
            ),
            optionIndexes2: optionIndexes2.map((index) =>
              String.fromCharCode("a".charCodeAt(0) + index)
            ),
          },
        };

        const saveResponse = await axios.post(
          "http://localhost:4009/response",
          {
            responses,
          }
        );

        console.log(saveResponse.data);
        console.log("Handle Next Click - New Response Saved");

        setAnsweredQuestionsMap((prevMap) => ({
          ...prevMap,
          [questionId]: true,
        }));
      }

      setClickCount((prevCount) => prevCount + 1);
    } catch (error) {
      console.error("Error handling next click:", error);
    }

    if (currentQuestionIndex < data.length - 1) {
      // setCurrentQuestionIndex((prevActiveQuestion) => prevActiveQuestion + 1);
    } else {
      // setShowResult(true);
      calculateResult();
    }
  };











  

app.put('/updateResponse/:questionId', (req, res) => {
    try {
      const questionId = parseInt(req.params.questionId, 10);
      const { updatedResponse } = req.body;
  
      if (updatedResponse && updatedResponse.optionIndexes1 && updatedResponse.optionIndexes2) {
        const userAnswer1 = updatedResponse.optionIndexes1.join(',');
        const userAnswer2 = updatedResponse.optionIndexes2.join(',');
  
        const sql = 'UPDATE user_responses SET user_answer = ? WHERE question_id = ?';
  
        db.query(sql, [userAnswer1 + ',' + userAnswer2, questionId], (err, result) => {
          if (err) {
            console.error('Error updating response in the database:', err);
            res.status(500).json({ success: false, message: 'Internal server error' });
          } else {
            if (result.affectedRows > 0) {
              console.log(`Response for question ${questionId} updated successfully`);
              res.json({ success: true, message: 'Response updated successfully' });
            } else {
              console.error(`No records found for question ${questionId}`);
              res.status(404).json({ success: false, message: 'Response not found' });
            }
          }
        });
      } else {
        console.error(`Invalid updated response data for question ${questionId}`);
        res.status(400).json({ success: false, message: 'Invalid updated response data' });
      }
    } catch (error) {
      console.error('Error handling the request:', error);
      res.status(500).json({ success: false, message: 'Internal server error' });
    }
  });