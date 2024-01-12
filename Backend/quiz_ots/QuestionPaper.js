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
    q.question_id, q.questionImgName, 
    o.option_id, o.optionImgName,o.option_index,
    s.solution_id, s.solutionImgName, 
    qt.qtypeId, qt.qtype_text,
    ans.answer_id, ans.answer_text,
    m.markesId, m.marks_text,
    si.sort_id, si.sortid_text,
    doc.documen_name, doc.sectionId, 
    doc.subjectId, doc.testCreationTableId,
    P.paragraphImg, p.paragraph_Id,
    pq.paragraphQNo_Id, pq.paragraphQNo
FROM 
    questions q 
    LEFT OUTER JOIN options o ON q.question_id = o.question_id
    LEFT OUTER JOIN qtype qt ON q.question_id = qt.question_id 
    LEFT OUTER JOIN answer ans ON q.question_id = ans.question_id 
    LEFT OUTER JOIN marks m ON q.question_id = m.question_id 
    LEFT OUTER JOIN sortid si ON q.question_id = si.question_id 
    LEFT OUTER JOIN solution s ON q.question_id = s.solution_id 
    LEFT OUTER JOIN paragraph p ON q.document_Id = p.document_Id
    LEFT OUTER JOIN paragraphqno pq ON p.paragraph_Id = pq.paragraph_Id AND q.question_id = pq.question_id
    LEFT OUTER JOIN ots_document doc ON q.document_Id = doc.document_Id  
WHERE 
    doc.testCreationTableId = ?
ORDER BY q.question_id ASC;

      `, [testCreationTableId]);
  
      // Check if rows is not empty
      if (rows.length > 0) {
        const questionData = {
          questions: [],
        };
  
        // Organize data into an array of questions
        rows.forEach(row => {
          const existingQuestion = questionData.questions.find(q => q.question_id === row.question_id);
          const option = {
            option_id: row.option_id,
            option_index: row.option_index,
            optionImgName: row.optionImgName,
          };
          if (existingQuestion) {
            const existingOption = existingQuestion.options.find(opt => opt.option_id === option.option_id);
            // Question already exists, add option to the existing question
            // existingQuestion.options.push({
            //   option_id: row.option_id,
            //   option_index:row.option_index,
            //   optionImgName: row.optionImgName,
            // });

            if (!existingOption) {
              existingQuestion.options.push(option);
            }

          } else {
            // Question doesn't exist, create a new question
            const newQuestion = {
              question_id: row.question_id,
              questionImgName: row.questionImgName,
              documen_name: row.documen_name,
              options: [option],
              
              qtype: {
                qtypeId: row.qtypeId,
                qtype_text: row.qtype_text,
              },
              answer: {
                answer_id: row.answer_id,
                answer_text: row.answer_text,
              },
              marks: {
                markesId: row.markesId,
                marks_text: row.marks_text,
              },
              sortid: {
                sort_id: row.sort_id,
                sortid_text: row.sortid_text,
              },
              paragraph: {},
              paragraphqno: {},
            };

            if (row.paragraph_Id && row.paragraphQNo) {
              newQuestion.paragraph = {
                paragraph_Id: row.paragraph_Id,
                paragraphImg: row.paragraphImg,
              };
       
              newQuestion.paragraphqno = {
                paragraphQNo_Id: row.paragraphQNo_Id,
                paragraphQNo: row.paragraphQNo,
              };
            }
  
            questionData.questions.push(newQuestion);
          }
        });
  
  
        res.json(questionData);
      } else {
        res.status(404).json({ error: 'No data found' });
      }
    } catch (error) {
      console.error('Error fetching question data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });



  // router.get('/fulldocimages/:testCreationTableId/:subjectId/:sectionId', async (req, res) => {
  //   const { testCreationTableId, subjectId, sectionId } = req.params;
  //   try {
  //     const [rows] = await db.query(`
  //     SELECT DISTINCT
  //     q.question_id, q.questionImgName,
  //     o.option_id, o.optionImgName, o.option_index,
  //     s.solution_id, s.solutionImgName,
  //     qt.qtypeId, qt.qtype_text,
  //     ans.answer_id, ans.answer_text,
  //     m.markesId, m.marks_text,
  //     si.sort_id, si.sortid_text,
  //     doc.documen_name, doc.sectionId,
  //     doc.subjectId, doc.testCreationTableId,
  //     P.paragraphImg, p.paragraph_Id,
  //     pq.paragraphQNo_Id, pq.paragraphQNo
  // FROM
  //     questions q
  //     LEFT OUTER JOIN options o ON q.question_id = o.question_id
  //     LEFT OUTER JOIN qtype qt ON q.question_id = qt.question_id
  //     LEFT OUTER JOIN answer ans ON q.question_id = ans.question_id
  //     LEFT OUTER JOIN marks m ON q.question_id = m.question_id
  //     LEFT OUTER JOIN sortid si ON q.question_id = si.question_id
  //     LEFT OUTER JOIN solution s ON q.question_id = s.question_id
  //     LEFT OUTER JOIN paragraph p ON q.document_Id = p.document_Id
  //     LEFT OUTER JOIN paragraphqno pq ON p.paragraph_Id = pq.paragraph_Id AND q.question_id = pq.question_id
  //     LEFT OUTER JOIN ots_document doc ON q.document_Id = doc.document_Id  
  // WHERE
  //     doc.testCreationTableId = ? AND doc.subjectId = ? AND doc.sectionId = ?;
 
  //     `, [testCreationTableId, subjectId, sectionId]);
 
  //     // Check if rows is not empty
  //     if (rows.length > 0) {
  //       const questionData = {
  //         questions: [],
  //       };
 
  //       // Organize data into an array of questions
  //       rows.forEach(row => {
  //         const existingQuestion = questionData.questions.find(q => q.question_id === row.question_id);
         
  //         const option = {
  //           option_id: row.option_id,
  //           option_index: row.option_index,
  //           optionImgName: row.optionImgName,
  //         };
       
  //         if (existingQuestion) {
  //           const existingOption = existingQuestion.options.find(opt => opt.option_id === option.option_id);
       
  //           if (!existingOption) {
  //             existingQuestion.options.push(option);
  //           }
  //         } else {
  //           const newQuestion = {
  //             question_id: row.question_id,
  //             questionImgName: row.questionImgName,
  //             documen_name: row.documen_name,
  //             options: [option],
  //             solution: {
  //               solution_id: row.solution_id,
  //               solutionImgName: row.solutionImgName,
  //             },
  //             qtype: {
  //               qtypeId: row.qtypeId,
  //               qtype_text: row.qtype_text,
  //             },
  //             answer: {
  //               answer_id: row.answer_id,
  //               answer_text: row.answer_text,
  //             },
  //             marks: {
  //               markesId: row.markesId,
  //               marks_text: row.marks_text,
  //             },
  //             sortid: {
  //               sort_id: row.sort_id,
  //               sortid_text: row.sortid_text,
  //             },
  //             paragraph: {},
  //             paragraphqno: {},
  //           };
       
  //           // Check if paragraphqno data exists for the question
  //           if (row.paragraph_Id && row.paragraphQNo) {
  //             newQuestion.paragraph = {
  //               paragraph_Id: row.paragraph_Id,
  //               paragraphImg: row.paragraphImg,
  //             };
       
  //             newQuestion.paragraphqno = {
  //               paragraphQNo_Id: row.paragraphQNo_Id,
  //               paragraphQNo: row.paragraphQNo,
  //             };
  //           }
       
  //           questionData.questions.push(newQuestion);
  //         }
  //       });
 
  //       res.json(questionData);
  //     } else {
  //       // Handle the case where no rows are returned (empty result set)
  //       res.status(404).json({ error: 'No data found' });
  //     }
  //   } catch (error) {
  //     console.error('Error fetching question data:', error);
  //     res.status(500).json({ error: 'Internal Server Error' });
  //   }
  // });
  // SELECT 
  //     q.question_id, 
  //     q.questionImgName, 
  //     o.option_id, 
  //     o.optionImgName,
  //     o.option_index,
  //     qt.qtypeId,
  //     qt.qtype_text,
  //     t.testCreationTableId,
  //     doc.document_Id,
  //     doc.documen_name,
  //     s.sort_id,
  //     s.sortid_text
  // FROM 
  //     questions q 
  // LEFT OUTER JOIN test_creation_table t ON 
  //     q.testCreationTableId = t.testCreationTableId 
  //     LEFT OUTER JOIN sortid s ON 
  //     q.question_id = s.question_id
  // LEFT OUTER JOIN ots_document doc ON 
  //     t.testCreationTableId = doc.testCreationTableId
  // LEFT OUTER JOIN options o ON 
  //     q.question_id = o.question_id
  // LEFT OUTER JOIN qtype qt ON 
  //     q.question_id = qt.question_id 
  // WHERE 
  //     t.testCreationTableId = ?

  
  
  // ----------------------------------------------------user reponses----------------------------------------------
  
//main working code
router.post('/response', async (req, res) => {
  try {
    const { responses, userId, testCreationTableId } = req.body;
    console.log('Received data::', { responses, userId, testCreationTableId });
    // Validate data types
    const userIdNumber = parseInt(userId, 10);
    const testCreationTableIdNumber = parseInt(testCreationTableId, 10);
    
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



// router.post('/storeUserResponse', (req, res) => {
//   try {
//     const { userId, testCreationTableId, responses, answeredTime } = req.body;

//     console.log('Received responses from client:', responses);

//     // Assuming each response has a question_id property and userAnswer as an object with optionIndexes1 and optionIndexes2
//     const sql = 'INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer, answered_time) VALUES (?, ?, ?, ?, ?)';

//     // Iterate over the keys of the responses object (question IDs)
//     for (const questionId in responses) {
//       if (responses.hasOwnProperty(questionId)) {
//         const userAnswer = responses[questionId];

//         if (userAnswer.optionIndexes1 && userAnswer.optionIndexes2) {
//           const userAnswer1 = userAnswer.optionIndexes1.join(',');
//           const userAnswer2 = userAnswer.optionIndexes2.join(',');

//           const userAnswerJSON = {
//             optionIndexes1: userAnswer1,
//             optionIndexes2: userAnswer2,
//             // Add other input types as needed
//           };

//           console.log(`Processing response for question ${questionId}:`, {
//             userId,
//             testCreationTableId,
//             questionId,
//             userAnswer: userAnswerJSON,
//             answeredTime,
//           });

//           console.log('Executing SQL query:', sql, [userId, testCreationTableId, questionId, userAnswerJSON, answeredTime]);

//           db.query(sql, [userId, testCreationTableId, questionId, userAnswerJSON, answeredTime], (err, result) => {
//             if (err) {
//               console.error('Error saving response to database:', err);
//             } else {
//               console.log(`Response for question ${questionId} saved to database`);
//             }
//           });
//         } else {
//           console.error(`Invalid response data for question ${questionId}`);
//         }
//       }
//     }

//     res.json({ success: true, message: 'Responses saved successfully' });
//   } catch (error) {
//     console.error('Error handling the request:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// router.post('/storeUserResponse', (req, res) => {
//   try {
//     const { userId, testCreationTableId, responses, answeredTime } = req.body;

//     console.log('Received responses from client:', responses);

//     // Assuming each response has a question_id property and userAnswer as an object with optionIndexes1 and optionIndexes2
//     const sql = 'INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer, answered_time) VALUES (?, ?, ?, ?, ?)';

//     // Iterate over the keys of the responses object (question IDs)
//     for (const questionId in responses) {
//       if (responses.hasOwnProperty(questionId)) {
//         const userAnswer = responses[questionId];

//         if (userAnswer.optionIndexes1 && userAnswer.optionIndexes2) {
//           const userAnswer1 = userAnswer.optionIndexes1.join(',');
//           const userAnswer2 = userAnswer.optionIndexes2.join(',');

//           const userAnswerJSON = {
//             optionIndexes1: userAnswer1,
//             optionIndexes2: userAnswer2,
//             // Add other input types as needed
//           };

//           const userAnswerStringified = JSON.stringify(userAnswerJSON);

//           console.log(`Processing response for question ${questionId}:`, {
//             userId,
//             testCreationTableId,
//             questionId,
//             userAnswer: userAnswerJSON,
//             answeredTime,
//           });

//           console.log('Executing SQL query:', sql, [userId, testCreationTableId, questionId, userAnswerStringified, answeredTime]);

//           db.query(sql, [userId, testCreationTableId, questionId, userAnswerStringified, answeredTime], (err, result) => {
//             if (err) {
//               console.error('Error saving response to database:', err);
//             } else {
//               console.log(`Response for question ${questionId} saved to the database`);
//             }
//           });
//         } else {
//           console.error(`Invalid response data for question ${questionId}`);
//         }
//       }
//     }

//     res.json({ success: true, message: 'Responses saved successfully' });
//   } catch (error) {
//     console.error('Error handling the request:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// router.post('/storeUserResponse', (req, res) => {
//   try {
//     const { userId, testCreationTableId, responses } = req.body;

//     console.log('Received responses from client:', responses);

//     // Assuming each response has a question_id property and userAnswer as an object with optionIndexes1 and optionIndexes2
//     const sql = 'INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer, answered_time) VALUES (?, ?, ?, ?, ?)';

//     // Iterate over the keys of the responses object (question IDs)
//     for (const questionId in responses) {
//       if (responses.hasOwnProperty(questionId)) {
//         const userAnswer = responses[questionId];

//         if (userAnswer.optionIndexes1 && userAnswer.optionIndexes2) {
//           const userAnswer1 = userAnswer.optionIndexes1.join(',');
//           const userAnswer2 = userAnswer.optionIndexes2.join(',');

//           const userAnswerJSON = {
//             optionIndexes1: userAnswer1,
//             optionIndexes2: userAnswer2,
//             // Add other input types as needed
//           };

//           const userAnswerStringified = JSON.stringify(userAnswerJSON);
//           const answeredTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'


//           console.log(`Processing response for question ${questionId}:`, {
//             userId,
//             testCreationTableId,
//             questionId,
//             userAnswer: userAnswerJSON,
//             answeredTime,
//           });

//           console.log('Executing SQL query:', sql, [userId, testCreationTableId, questionId, userAnswerStringified, answeredTime]);

//           db.query(sql, [userId, testCreationTableId, questionId, userAnswerStringified, answeredTime], (err, result) => {
//             if (err) {
//               console.error('Error saving response to database:', err);
//             } else {
//               console.log(`Response for question ${questionId} saved to the database`);
//             }
//           });
//         } else {
//           console.error(`Invalid response data for question ${questionId}`);
//         }
//       }
//     }

//     res.json({ success: true, message: 'Responses saved successfully' });
//   } catch (error) {
//     console.error('Error handling the request:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// router.post('/storeUserResponse', (req, res) => {
//   try {
//     const { userId, testCreationTableId, responses, timer } = req.body;

//     console.log('Received responses and timer from client:', responses, timer);

//     // Assuming each response has a question_id property and userAnswer as an object with optionIndexes1 and optionIndexes2
//     const sql = 'INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer, answered_time) VALUES (?, ?, ?, ?, ?)';

//     // Iterate over the keys of the responses object (question IDs)
//     for (const questionId in responses) {
//       if (responses.hasOwnProperty(questionId)) {
//         const userAnswer = responses[questionId];

//         if (userAnswer.optionIndexes1 && userAnswer.optionIndexes2) {
//           const userAnswer1 = userAnswer.optionIndexes1.join(',');
//           const userAnswer2 = userAnswer.optionIndexes2.join(',');

//           const userAnswerJSON = {
//             optionIndexes1: userAnswer1,
//             optionIndexes2: userAnswer2,
//             // Add other input types as needed
//           };

//           const userAnswerStringified = JSON.stringify(userAnswerJSON);
//           const answeredTime = new Date().toISOString().slice(0, 19).replace('T', ' '); // Format as 'YYYY-MM-DD HH:MM:SS'

//           console.log(`Processing response for question ${questionId}:`, {
//             userId,
//             testCreationTableId,
//             questionId,
//             userAnswer: userAnswerJSON,
//             answeredTime,
           
//           });

//           console.log('Executing SQL query:', sql, [userId, testCreationTableId, questionId, userAnswerStringified, answeredTime, timer]);

//           db.query(sql, [userId, testCreationTableId, questionId, userAnswerStringified, answeredTime, timer], (err, result) => {
//             if (err) {
//               console.error('Error saving response to the database:', err);
//             } else {
//               console.log(`Response for question ${questionId} saved to the database`);
//             }
//           });
//         } else {
//           console.error(`Invalid response data for question ${questionId}`);
//         }
//       }
//     }

//     res.json({ success: true, message: 'Responses saved successfully' });
//   } catch (error) {
//     console.error('Error handling the request:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

// router.post('/response', (req, res) => {
//   try {
//     const { userId, testCreationTableId, responses } = req.body;

//     console.log('Received responses from client:', responses);

//     // Assuming each response has a question_id property
//     const sql = 'INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer, answered_time) VALUES (?, ?, ?, ?, ?)';

//     // Assuming responses is an object where keys are question_ids
//     for (const questionId in responses) {
//       const questionIdNumber = parseInt(questionId, 10);

//       if (responses[questionId] && responses[questionId].optionIndexes1 && responses[questionId].optionIndexes2) {
//         const userAnswer1 = responses[questionId].optionIndexes1.join(',');
//         const userAnswer2 = responses[questionId].optionIndexes2.join(',');

//         console.log(`Processing responses for question ${questionId}:`, {
//           userId,
//           testCreationTableId,
//           questionId: questionIdNumber,
//           userAnswer1,
//           userAnswer2,
//         });

//         console.log('Executing SQL query:', sql, [userId, testCreationTableId, questionIdNumber, userAnswer1 + ',' + userAnswer2]);

//         db.query(sql, [userId, testCreationTableId, questionIdNumber, userAnswer1 + ',' + userAnswer2], (err, result) => {
//           if (err) {
//             console.error('Error saving response to database:', err);
//           } else {
//             console.log(`Response for question ${questionIdNumber} saved to database`);
//           }
//         });
//       } else {
//         console.error(`Invalid response data for question ${questionId}`);
//       }
//     }

//     res.json({ success: true, message: 'Responses saved successfully' });
//   } catch (error) {
//     console.error('Error handling the request:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });











router.get('/answer', async (req, res) => {
  try {
    // const { questionId } = req.params;
    const [results] = await db.query(`
    SELECT question_id,answer_text FROM answer;
    `,);

    res.json(results);

  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Internal Server Error');
  }
});

router.get('/questionCount', async (req, res) => {
  try {
    const [results, fields] = await db.execute(
      `SELECT t.testCreationTableId, COUNT(q.question_id) AS total_question_count FROM test_creation_table t LEFT JOIN questions q ON t.testCreationTableId = q.testCreationTableId WHERE t.testCreationTableId = 1;`
    );
    res.json(results);
  } catch (error) {
    console.error('Error fetching course count:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// router.put('/updateResponse/:userId/:testCreationTableId/:questionId', (req, res) => {
//   const userId = req.params.userId;
//   const testCreationTableId = req.params.testCreationTableId;
//   const questionId = req.params.questionId;
//   const { updatedResponse, user_Id } = req.body;

//   // Replace this query with your logic to update the user response in the database
//   const sql = 'UPDATE user_responses SET user_answer=? WHERE user_Id = ? AND testCreationTableId = ? AND question_id = ?';
//   const userAnswer1 = updatedResponse.optionIndexes1.join(',');
//   const userAnswer2 = updatedResponse.optionIndexes2.join(',');
//   const userAnswer = `${userAnswer1},${userAnswer2}`;

//   db.query(sql, [userAnswer, userId, testCreationTableId, questionId], (err, result) => {
//     if (err) {
//       console.error('Error updating user response:', err);
//       res.status(500).json({ success: false, message: 'Internal server error' });
//     } else {
//       if (result.affectedRows > 0) {
//         console.log('User response updated successfully');
//         res.json({ success: true, message: 'User response updated successfully' });
//       } else {
//         console.error('No matching row found for the given user, test creation table, and question IDs');
//         res.status(404).json({ success: false, message: 'No matching row found for the given user, test creation table, and question IDs' });
//       }
//     }
//   });
// });

// ... Your other configurations

// router.put('/updateResponse/:userId/:testCreationTableId/:questionId', async (req, res) => {
//   try {
//     const { updatedResponse } = req.body;

//     // Validate data types
//     const userIdNumber = parseInt(req.params.userId, 10);
//     const testCreationTableIdNumber = parseInt(req.params.testCreationTableId, 10);
//     const questionIdNumber = parseInt(req.params.questionId, 10);

//     if (isNaN(userIdNumber) || isNaN(testCreationTableIdNumber) || isNaN(questionIdNumber)) {
//       console.error('Invalid integer value for userId, testCreationTableId, or questionId');
//       return res.status(400).json({ success: false, message: 'Invalid data types' });
//     }

//     // Continue with processing
//     const sql = 'UPDATE user_responses SET user_answer=? WHERE user_Id = ? AND testCreationTableId = ? AND question_id = ?';

//     if (updatedResponse && updatedResponse.optionIndexes1 && updatedResponse.optionIndexes2) {
//       const userAnswer1 = updatedResponse.optionIndexes1.join(',');
//       const userAnswer2 = updatedResponse.optionIndexes2.join(',');
//       const userAnswer = `${userAnswer1},${userAnswer2}`;

//       db.query(sql, [userAnswer, userIdNumber, testCreationTableIdNumber, questionIdNumber], (err, result) => {
//         if (err) {
//           console.error('Error updating response in the database:', err);
//           res.status(500).json({ success: false, message: 'Internal server error' });
//         } else {
//           if (result.affectedRows > 0) {
//             console.log(`Response for user ${userIdNumber}, testCreationTableId ${testCreationTableIdNumber}, and questionId ${questionIdNumber} updated successfully`);
//             res.json({ success: true, message: 'Response updated successfully' });
//           } else {
//             console.error(`No records found for user ${userIdNumber}, testCreationTableId ${testCreationTableIdNumber}, and questionId ${questionIdNumber}`);
//             res.status(404).json({ success: false, message: 'Response not found' });
//           }
//         }
//       });
//     } else {
//       console.error('Invalid or missing data in updatedResponse');
//       res.status(400).json({ success: false, message: 'Invalid or missing data in updatedResponse' });
//     }

//   } catch (error) {
//     console.error('Error handling the request:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });






router.put('/updateResponse/:user_Id/:testCreationTableId/:questionId', (req, res) => {
  try {
    const user_Id = parseInt(req.params.user_Id, 10);
    const testCreationTableId = parseInt(req.params.testCreationTableId, 10);
    const questionId = parseInt(req.params.questionId, 10);
    const { updatedResponse } = req.body;

    if (updatedResponse && updatedResponse.optionIndexes1 && updatedResponse.optionIndexes2) {
      const userAnswer1 = updatedResponse.optionIndexes1.join(',');
      const userAnswer2 = updatedResponse.optionIndexes2.join(',');

      const sql = 'UPDATE user_responses SET user_answer = ? WHERE user_Id = ? AND testCreationTableId = ? AND question_id = ?';

      db.query(sql, [userAnswer1 + ',' + userAnswer2, user_Id, testCreationTableId, questionId], (err, result) => {
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




















  



module.exports = router;
