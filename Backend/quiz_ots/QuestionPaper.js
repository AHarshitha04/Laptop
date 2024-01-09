const express = require("express");
const router = express.Router();
const db= require("../databases/db2");
// const db1= require("../databases/db1");



router.get('/subjects/:testCreationTableId', async (req, res) => {
    const { testCreationTableId } = req.params;
    try {
      const [subjects] = await db.query(
        'SELECT subjects.subjectName,subjects.subjectId FROM test_creation_table JOIN course_creation_table ON test_creation_table.courseCreationId = course_creation_table.courseCreationId JOIN course_subjects ON course_creation_table.courseCreationId = course_subjects.courseCreationId JOIN subjects ON course_subjects.subjectId = Subjects.subjectId WHERE test_creation_table.testCreationTableId = ?',
        [testCreationTableId]
      );
      res.json(subjects);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
 
  
  router.get("/subjectData1/:courseCreationId", async (req, res) => {
    // FetchData
    try {
      const {courseCreationId } = req.params;
      const [rows] = await db.query("SELECT DISTINCT subjectId FROM course_subjects JOIN test_creation_table ON course_subjects.courseCreationId = test_creation_table.courseCreationId WHERE test_creation_table.courseCreationId = ?;",[courseCreationId]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  
  router.get("/subjectData2/:testCreationTableId", async (req, res) => {
    // FetchData
    try {
      const {testCreationTableId } = req.params;
      const [rows] = await db.query("SELECT DISTINCT subjectId FROM course_subjects JOIN test_creation_table ON course_subjects.courseCreationId = test_creation_table.courseCreationId WHERE test_creation_table.testCreationTableId  = ?;",[testCreationTableId]);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  
  router.get('/sections/:questionId', async (req, res) => {
    try {
      const { questionId } = req.params;
      const [results] = await db.query(`
        SELECT s.sectionId, s.sectionName
        FROM sections s
        JOIN questions q ON s.sectionId = q.sectionId AND s.subjectId = q.subjectId
        WHERE q.question_id = ?;
      `, [questionId]);
  
  
      res.json(results);
  
  
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
 
  router.get('/questionType/:questionId', async (req, res) => {
    try {
      const { questionId } = req.params;
      const [results] = await db.query(`
      SELECT q.question_id, q.testCreationTableId ,qt.qtypeId, qt.qtype_text, qts.typeofQuestion, qts.quesionTypeId FROM questions q JOIN qtype qt ON q.question_id = qt.question_id JOIN quesion_type qts ON qt.quesionTypeId = qts.quesionTypeId WHERE q.question_id = ?;
      `, [questionId]);
  
      res.json(results);
  
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });
  
  
  router.get("/fetchSections/:testCreationTableId/:subjectId", async (req, res) => {
    const { testCreationTableId, subjectId } = req.params;
    try {
      // Use a connection from the pool
      const connection = await db.getConnection();
  
  
      // Fetch sections for the specified testCreationTableId and selected subjectId
      const [rows] = await connection.execute(
        "SELECT sectionName, noOfQuestions, sectionId FROM sections WHERE testCreationTableId = ? AND subjectId = ?",
        [testCreationTableId, subjectId]
      );
  
  
      // Release the connection back to the pool
      connection.release();
  
  
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  
  
  router.get("/fetchSections/:testCreationTableId/:subjectId", async (req, res) => {
    const { testCreationTableId, subjectId } = req.params;
    try {
      const [rows] = await db.query(
        "SELECT sectionName, noOfQuestions, sectionId FROM sections WHERE testCreationTableId = ? AND subjectId = ?",
        [testCreationTableId, subjectId]
      );
  
  
      // Calculate question length for each section and include it in the response
      const sectionsWithQuestionLength = rows.map((section) => {
        const questionLength = calculateQuestionLength(section.sectionId); // Replace with your logic
        return { ...section, questionLength };
      });
  
  
      res.json(sectionsWithQuestionLength);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  
  
  router.get('/courses/count', async (req, res) => {
    try {
      const [results, fields] = await db.execute(
        'SELECT examId, COUNT(*) AS numberOfCourses FROM course_creation_table GROUP BY examId;'
      );
      res.json(results);
    } catch (error) {
      console.error('Error fetching course count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  
  router.get('/Test/count', async (req, res) => {
    try {
      const [results, fields] = await db.execute(
        'SELECT courseCreationId, COUNT(*) AS numberOfTests FROM test_creation_table GROUP BY courseCreationId;'
      );
      res.json(results);
    } catch (error) {
      console.error('Error fetching course count:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  

  router.get('/questionType/:questionId', async (req, res) => {
    try {
      const { questionId } = req.params;
      const [results] = await db.query(`
      SELECT q.question_id, qt.qtypeId, qt.qtype_text, qts.typeofQuestion, qts.quesionTypeId FROM questions q JOIN qtype qt ON q.question_id = qt.question_id JOIN quesion_type qts ON qt.quesionTypeId = qts.quesionTypeId WHERE q.question_id = ?;
      `, [questionId]);
  
      res.json(results);
  
    } catch (error) {
      console.error('Error:', error.message);
      res.status(500).send('Internal Server Error');
    }
  });


  router.get('/questionOptions/:testCreationTableId', async (req, res) => {
    const { testCreationTableId } = req.params;
    try {
      const [rows] = await db.query(`

      SELECT 
      q.question_id, 
      q.questionImgName, 
      o.option_id, 
      o.optionImgName,
      o.option_index,
      qt.qtypeId,
      qt.qtype_text,
      t.testCreationTableId,
      doc.document_Id,
      doc.documen_name,
      s.sort_id,
      s.sortid_text
  FROM 
      questions q 
  LEFT OUTER JOIN test_creation_table t ON 
      q.testCreationTableId = t.testCreationTableId 
      LEFT OUTER JOIN sortid s ON 
      q.question_id = s.question_id
  LEFT OUTER JOIN ots_document doc ON 
      t.testCreationTableId = doc.testCreationTableId
  LEFT OUTER JOIN options o ON 
      q.question_id = o.question_id
  LEFT OUTER JOIN qtype qt ON 
      q.question_id = qt.question_id 
  WHERE 
      t.testCreationTableId = ?






      `, [testCreationTableId]);
  
      // Check if rows is not empty
      if (rows.length > 0) {
        const questionData = {
          questions: [],
        };
  
        // Organize data into an array of questions
        rows.forEach(row => {
          const existingQuestion = questionData.questions.find(q => q.question_id === row.question_id);
  
          if (existingQuestion) {
            // Question already exists, add option to the existing question
            existingQuestion.options.push({
              option_id: row.option_id,
              option_index:row.option_index,
              optionImgName: row.optionImgName,
            });
          } else {
            // Question doesn't exist, create a new question
            const newQuestion = {
              question_id: row.question_id,
              questionImgName: row.questionImgName,
              documen_name: row.documen_name,
              options: [
                {
                  option_id: row.option_id,
                  optionImgName: row.optionImgName,
                },
              ],
             
              qtype:{
                qtypeId:row.qtypeId,
                qtype_text:row.qtype_text,
              },
              sortid:{
                sort_id:row.sort_id,
                sortid_text:row.sortid_text,
              },
             
            };
  
            questionData.questions.push(newQuestion);
          }
        });
  
  
        res.json(questionData);
      } else {
        // Handle the case where no rows are returned (empty result set)
        res.status(404).json({ error: 'No data found' });
      }
    } catch (error) {
      console.error('Error fetching question data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  






  
  
  
  // ----------------------------------------------------user reponses----------------------------------------------
  

router.post('/response', async (req, res) => {
  try {
    const { responses, user_Id, testCreationTableId } = req.body;

    // Validate data types
    const userIdNumber = parseInt(user_Id, 10);
const testCreationTableIdNumber = parseInt(testCreationTableId, 10);
// const questionIdNumber = parseInt(questionId, 10);


    if (isNaN(userIdNumber) || isNaN(testCreationTableIdNumber)) {
      console.error('Invalid integer value for user_Id, testCreationTableId, or questionId');
      return res.status(400).json({ success: false, message: 'Invalid data types' });
    }

    // Continue with processing
    const sql = 'INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer) VALUES (?,?,?,?)';

    for (const questionId in responses) {
      const questionIdNumber = parseInt(questionId, 10);

      if (isNaN(questionIdNumber)) {
        console.error(`Invalid integer value for questionId: ${questionId}`);
        continue;  // Skip processing this iteration
      }

      const optionIndexes1 = responses[questionId].optionIndexes1.join(',');
      const optionIndexes2 = responses[questionId].optionIndexes2.join(',');

      console.log(`Processing responses for question ${questionId}:`, {
        user_Id: userIdNumber,
        testCreationTableId: testCreationTableIdNumber,
        question_id: questionIdNumber,
        user_answer: optionIndexes1 + ' ' + optionIndexes2,
      });

      const queryValues = [userIdNumber, testCreationTableIdNumber, questionIdNumber, optionIndexes1 + ',' + optionIndexes2];

      console.log('Executing SQL query:', sql, queryValues);

      await new Promise((resolve, reject) => {
        db.query(sql, queryValues, (err, result) => {
          if (err) {
            console.error('Error saving response to the database:', err);
            reject(err);
          } else {
            console.log(`Response for question ${questionIdNumber} saved to the database`);
            resolve(result);
          }
        });
      });
    }

    res.json({ success: true, message: 'Responses saved successfully' });

  } catch (error) {
    console.error('Error handling the request:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


//   try {
//     const userId = parseInt(req.params.userId, 10);
//     const { updatedResponse } = req.body;

//     if (updatedResponse && updatedResponse.optionIndexes1 && updatedResponse.optionIndexes2) {
//       const userAnswer1 = updatedResponse.optionIndexes1.join(',');
//       const userAnswer2 = updatedResponse.optionIndexes2.join(',');

//       const sql = 'UPDATE user_responses SET user_answer1 = ?, user_answer2 = ? WHERE user_Id = ?';

//       db.query(sql, [userAnswer1, userAnswer2, userId], (err, result) => {
//         if (err) {
//           console.error('Error updating response in the database:', err);
//           res.status(500).json({ success: false, message: 'Internal server error' });
//         } else {
//           if (result.affectedRows > 0) {
//             console.log(`Response for question ${userId} updated successfully`);
//             res.json({ success: true, message: 'Response updated successfully' });
//           } else {
//             console.error(`No records found for question ${userId}`);
//             res.status(404).json({ success: false, message: 'Response not found' });
//           }
//         }

//       });
//     } else {
//       console.error(`Invalid updated response data for question ${userId}`);
//       res.status(400).json({ success: false, message: 'Invalid updated response data' });
//     }
//   } catch (error) {
//     console.error('Error handling the request:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

router.put('/updateResponse/:userId', (req, res) => {
  try {
    const userId = parseInt(req.params.userId, 10);
    const { updatedResponse } = req.body;

    // Checking if the expected properties exist in the request body
    if (updatedResponse && updatedResponse.optionIndexes1 && updatedResponse.optionIndexes2) {
      // Joining option indexes into strings
      const userAnswer1 = updatedResponse.optionIndexes1.join(',');
      const userAnswer2 = updatedResponse.optionIndexes2.join(',');

      // SQL query to update user response in the database
      const sql = 'UPDATE user_responses SET user_answer1 = ?, user_answer2 = ? WHERE user_Id = ?';

      // Execute the SQL query
      db.query(sql, [userAnswer1, userAnswer2, userId], (err, result) => {
        if (err) {
          console.error('Error updating response in the database:', err);
          res.status(500).json({ success: false, message: 'Internal server error' });
        } else {
          if (result.affectedRows > 0) {
            console.log(`Response for question ${userId} updated successfully`);
            res.json({ success: true, message: 'Response updated successfully' });
          } else {
            console.error(`No records found for question ${userId}`);
            res.status(404).json({ success: false, message: 'Response not found' });
          }
        }
      });
    } else {
      console.error(`Invalid updated response data for question ${userId}`);
      res.status(400).json({ success: false, message: 'Invalid updated response data' });
    }
  } catch (error) {
    console.error('Error handling the request:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});





  
  // router.put('/updateResponse/:userId', (req, res) => {
  //   try {
  //     const userId = parseInt(req.params.userId, 10);
  //     const { updatedResponse } = req.body;
  
  //     if (updatedResponse && updatedResponse.optionIndexes1 && updatedResponse.optionIndexes2) {
  //       const userAnswer1 = updatedResponse.optionIndexes1.join(',');
  //       const userAnswer2 = updatedResponse.optionIndexes2.join(',');
  
  //       const sql = 'UPDATE user_responses SET user_answer = ? WHERE user_Id = ?';
  
  //       db.query(sql, [userAnswer1 + ',' + userAnswer2, userId], (err, result) => {
  //         if (err) {
  //           console.error('Error updating response in the database:', err);
  //           res.status(500).json({ success: false, message: 'Internal server error' });
  //         } else {
  //           if (result.affectedRows > 0) {
  //             console.log(`Response for question ${userId} updated successfully`);
  //             res.json({ success: true, message: 'Response updated successfully' });
  //           } else {
  //             console.error(`No records found for question ${userId}`);
  //             res.status(404).json({ success: false, message: 'Response not found' });
  //           }
  //         }
  //       });
  //     } else {
  //       console.error(`Invalid updated response data for question ${userId}`);
  //       res.status(400).json({ success: false, message: 'Invalid updated response data' });
  //     }
  //   } catch (error) {
  //     console.error('Error handling the request:', error);
  //     res.status(500).json({ success: false, message: 'Internal server error' });
  //   }
  // });
  
  
  
  // router.delete('/clearResponse/:userId', (req, res) => {
  //   const userId = req.params.userId;
  
  //   // Assuming you have a 'responses' table in your database
  //   const sql = 'DELETE FROM user_responses WHERE user_Id = ?';
  
  //   db.query(sql, [userId], (error, results) => {
  //     if (error) {
  //       console.error('Error clearing response:', error);
  //       res.status(500).json({ error: 'Internal Server Error' });
  //     } else {
  //       console.log(`Response for question ${userId} cleared successfully`);
  //       res.status(200).json({ message: 'Response cleared successfully' });
  //     }
  //   });
  // });
  
  // router.get('/get_answers', async (req, res) => {
  //   try {
  //     // const { questionId } = req.params;
  //     const [results] = await db.query(`
  //     SELECT 
  //     ur.question_id,
  //     ur.user_answer,
  //     ans.answer_text,
  //     mt.marks_text
  // FROM 
  //     user_responses ur
  // JOIN 
  //     answer ans ON LOWER(TRIM(ur.user_answer)) = LOWER(TRIM(ans.answer_text))
  // JOIN 
  //     marks mt ON ans.question_id = mt.question_id;
  //     `, );
  
  //     res.json(results);
  
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });
  




module.exports = router;
