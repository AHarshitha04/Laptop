const express = require("express");
const router = express.Router();
const db = require("../databases/db2");
// const db1= require("../databases/db1");
const jwt = require("jsonwebtoken");
const { useParams } = require("react-router-dom");

router.get("/subjects/:testCreationTableId", async (req, res) => {
  const { testCreationTableId } = req.params;
  try {
    const [subjects] = await db.query(
      "SELECT subjects.subjectName,subjects.subjectId FROM test_creation_table JOIN course_creation_table ON test_creation_table.courseCreationId = course_creation_table.courseCreationId JOIN course_subjects ON course_creation_table.courseCreationId = course_subjects.courseCreationId JOIN subjects ON course_subjects.subjectId = Subjects.subjectId WHERE test_creation_table.testCreationTableId = ?",
      [testCreationTableId]
    );
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/subjectData1/:courseCreationId", async (req, res) => {
  // FetchData
  try {
    const { courseCreationId } = req.params;
    const [rows] = await db.query(
      "SELECT DISTINCT subjectId FROM course_subjects JOIN test_creation_table ON course_subjects.courseCreationId = test_creation_table.courseCreationId WHERE test_creation_table.courseCreationId = ?;",
      [courseCreationId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/subjectData2/:testCreationTableId", async (req, res) => {
  // FetchData
  try {
    const { testCreationTableId } = req.params;
    const [rows] = await db.query(
      "SELECT DISTINCT subjectId FROM course_subjects JOIN test_creation_table ON course_subjects.courseCreationId = test_creation_table.courseCreationId WHERE test_creation_table.testCreationTableId  = ?;",
      [testCreationTableId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/sections/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const [results] = await db.query(
      `
        SELECT s.sectionId, s.sectionName
        FROM sections s
        JOIN questions q ON s.sectionId = q.sectionId AND s.subjectId = q.subjectId
        WHERE q.question_id = ?;
      `,
      [questionId]
    );

    res.json(results);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/questionType/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const [results] = await db.query(
      `
      SELECT q.question_id, q.testCreationTableId ,qt.qtypeId, qt.qtype_text, qts.typeofQuestion, qts.quesionTypeId FROM questions q JOIN qtype qt ON q.question_id = qt.question_id JOIN quesion_type qts ON qt.quesionTypeId = qts.quesionTypeId WHERE q.question_id = ?;
      `,
      [questionId]
    );

    res.json(results);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get(
  "/fetchSections/:testCreationTableId/:subjectId",
  async (req, res) => {
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
  }
);

router.get(
  "/fetchSections/:testCreationTableId/:subjectId",
  async (req, res) => {
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
  }
);

router.get("/courses/count", async (req, res) => {
  try {
    const [results, fields] = await db.execute(
      "SELECT examId, COUNT(*) AS numberOfCourses FROM course_creation_table GROUP BY examId;"
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching course count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/Test/count", async (req, res) => {
  try {
    const [results, fields] = await db.execute(
      "SELECT courseCreationId, COUNT(*) AS numberOfTests FROM test_creation_table GROUP BY courseCreationId;"
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching course count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get("/questionType/:questionId", async (req, res) => {
  try {
    const { questionId } = req.params;
    const [results] = await db.query(
      `
      SELECT q.question_id, qt.qtypeId, qt.qtype_text, qts.typeofQuestion, qts.quesionTypeId FROM questions q JOIN qtype qt ON q.question_id = qt.question_id JOIN quesion_type qts ON qt.quesionTypeId = qts.quesionTypeId WHERE q.question_id = ?;
      `,
      [questionId]
    );

    res.json(results);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/questionOptions/:testCreationTableId", async (req, res) => {
  const { testCreationTableId } = req.params;
  try {
    const [rows] = await db.query(
      `
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

      `,
      [testCreationTableId]
    );

    // Check if rows is not empty
    if (rows.length > 0) {
      const questionData = {
        questions: [],
      };

      // Organize data into an array of questions
      rows.forEach((row) => {
        const existingQuestion = questionData.questions.find(
          (q) => q.question_id === row.question_id
        );
        const option = {
          option_id: row.option_id,
          option_index: row.option_index,
          optionImgName: row.optionImgName,
        };
        if (existingQuestion) {
          const existingOption = existingQuestion.options.find(
            (opt) => opt.option_id === option.option_id
          );
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
      res.status(404).json({ error: "No data found" });
    }
  } catch (error) {
    console.error("Error fetching question data:", error);
    res.status(500).json({ error: "Internal Server Error" });
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
// router.post('/response', async (req, res) => {
//   try {
//     const { responses, userId, testCreationTableId } = req.body;
//     console.log('Received data::', { responses, userId, testCreationTableId });
//     // Validate data types
//     const userIdNumber = parseInt(userId, 10);
//     const testCreationTableIdNumber = parseInt(testCreationTableId, 10);

//     if (isNaN(userIdNumber) || isNaN(testCreationTableIdNumber)) {
//       console.error('Invalid integer value for user_Id, testCreationTableId, or questionId');
//       return res.status(400).json({ success: false, message: 'Invalid data types' });
//     }

//     // Continue with processing
//     const sql = 'INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer) VALUES (?,?,?,?)';

//     for (const questionId in responses) {
//       const questionIdNumber = parseInt(questionId, 10);

//       if (isNaN(questionIdNumber)) {
//         console.error(`Invalid integer value for questionId: ${questionId}`);
//         continue;  // Skip processing this iteration
//       }

//       const optionIndexes1 = responses[questionId].optionIndexes1.join(',');
//       const optionIndexes2 = responses[questionId].optionIndexes2.join(',');

//       console.log(`Processing responses for question ${questionId}:`, {
//         user_Id: userIdNumber,
//         testCreationTableId: testCreationTableIdNumber,
//         question_id: questionIdNumber,
//         user_answer: optionIndexes1 + ' ' + optionIndexes2,
//       });

//       const queryValues = [userIdNumber, testCreationTableIdNumber, questionIdNumber, optionIndexes1 + ',' + optionIndexes2];

//       console.log('Executing SQL query:', sql, queryValues);

//       await new Promise((resolve, reject) => {
//         db.query(sql, queryValues, (err, result) => {
//           if (err) {
//             console.error('Error saving response to the database:', err);
//             reject(err);
//           } else {
//             console.log(`Response for question ${questionIdNumber} saved to the database`);
//             resolve(result);
//           }
//         });
//       });
//     }

//     res.json({ success: true, message: 'Responses saved successfully' });

//   } catch (error) {
//     console.error('Error handling the request:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

router.post("/response", async (req, res) => {
  try {
    const { responses, userId, testCreationTableId } = req.body;
    console.log("Received data::", { responses, userId, testCreationTableId });
    // Validate data types
    const userIdNumber = parseInt(userId, 10);
    const testCreationTableIdNumber = parseInt(testCreationTableId, 10);

    if (isNaN(userIdNumber) || isNaN(testCreationTableIdNumber)) {
      console.error(
        "Invalid integer value for user_Id, testCreationTableId, or questionId"
      );
      return res
        .status(400)
        .json({ success: false, message: "Invalid data types" });
    }

    // Continue with processing
    const sql =
      "INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer) VALUES (?,?,?,?)";

    for (const questionId in responses) {
      const questionIdNumber = parseInt(questionId, 10);

      if (isNaN(questionIdNumber)) {
        console.error(`Invalid integer value for questionId: ${questionId}`);
        continue; // Skip processing this iteration
      }

      const optionIndexes1 = responses[questionId].optionIndexes1.join(",");
      const optionIndexes2 = responses[questionId].optionIndexes2.join(",");
      const calculatorInputValue = responses[questionId].calculatorInputValue;

      console.log(`Processing responses for question ${questionId}:`, {
        user_Id: userIdNumber,
        testCreationTableId: testCreationTableIdNumber,
        question_id: questionIdNumber,
        user_answer:
          optionIndexes1 + " " + optionIndexes2 + " " + calculatorInputValue,
      });

      const queryValues = [
        userIdNumber,
        testCreationTableIdNumber,
        questionIdNumber,
        optionIndexes1 + "," + optionIndexes2 + " " + calculatorInputValue,
      ];

      console.log("Executing SQL query:", sql, queryValues);

      await new Promise((resolve, reject) => {
        db.query(sql, queryValues, (err, result) => {
          if (err) {
            console.error("Error saving response to the database:", err);
            reject(err);
          } else {
            console.log(
              `Response for question ${questionIdNumber} saved to the database`
            );
            resolve(result);
          }
        });
      });
    }

    res.json({ success: true, message: "Responses saved successfully" });
  } catch (error) {
    console.error("Error handling the request:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});

router.put('/updateResponse/:user_Id/:testCreationTableId/:question_id', async (req, res) => {
  try {
    const { user_Id, testCreationTableId, question_id } = req.params;

    // Validate data types
    const userIdNumber = parseInt(user_Id, 10);
    const testCreationTableIdNumber = parseInt(testCreationTableId, 10);
    const questionId = parseInt(question_id, 10);

    if (isNaN(userIdNumber) || isNaN(testCreationTableIdNumber) || isNaN(questionId)) {
      console.error("Invalid integer value for user_Id, testCreationTableId, or question_id");
      return res.status(400).json({ success: false, message: "Invalid data types" });
    }

    // Continue with processing
    const optionIndexes1 = req.body.updatedResponse.optionIndexes1.join(",");
    const optionIndexes2 = req.body.updatedResponse.optionIndexes2.join(",");
    const calculatorInputValue = req.body.updatedResponse.calculatorInputValue;

    const existingResponseQuery = `
      SELECT * FROM user_responses
      WHERE user_Id = ? AND testCreationTableId = ? AND question_id = ?
    `;

    const existingResponseValues = [
      userIdNumber,
      testCreationTableIdNumber,
      questionId
    ];

    const existingResponseResult = await new Promise((resolve, reject) => {
      db.query(existingResponseQuery, existingResponseValues, (err, result) => {
        if (err) {
          console.error("Error checking existing response in the database:", err);
          reject(err);
        } else {
          resolve(result);
        }
      });
    });

    if (existingResponseResult.length > 0) {
      const updateQuery = `
        UPDATE user_responses
        SET user_answer = ?
        WHERE user_Id = ? AND testCreationTableId = ? AND question_id = ?
      `;

      const updateValues = [
        optionIndexes1 + "," + optionIndexes2 + " " + calculatorInputValue,
        userIdNumber,
        testCreationTableIdNumber,
        questionId
      ];

      await new Promise((resolve, reject) => {
        db.query(updateQuery, updateValues, (err, result) => {
          if (err) {
            console.error("Error updating response in the database:", err);
            reject(err);
          } else {
            console.log(`Response for question ${questionId} updated in the database`);
            resolve(result);
          }
        });
      });

      res.json({ success: true, message: "Response updated successfully" });
    } else {
      // Handle the case where the response does not exist
      res.status(404).json({ success: false, message: "Response not found" });
    }
  } catch (error) {
    console.error("Error handling update request:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});



router.delete('/clearResponse/:questionId', async (req, res) => {
  try {
    const { questionId } = req.params;

    // Validate that questionId is a valid integer
    const questionIdNumber = parseInt(questionId, 10);
    if (isNaN(questionIdNumber)) {
      console.error(`Invalid integer value for questionId: ${questionId}`);
      return res.status(400).json({ success: false, message: 'Invalid questionId' });
    }

    // Execute SQL query to delete the user's response for the specified question
    const deleteQuery = 'DELETE FROM user_responses WHERE question_id = ?';
    await new Promise((resolve, reject) => {
      db.query(deleteQuery, [questionIdNumber], (err, result) => {
        if (err) {
          console.error('Error deleting user response:', err);
          reject(err);
        } else {
          console.log(`User response for question ${questionIdNumber} deleted`);
          resolve(result);
        }
      });
    });

    res.status(200).json({ success: true, message: 'User response cleared successfully' });
  } catch (error) {
    console.error('Error clearing user response:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


router.get("/answer", async (req, res) => {
  try {
    // const { questionId } = req.params;
    const [results] = await db.query(`
    SELECT question_id,answer_text FROM answer;
    `);

    res.json(results);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

// router.get("/questionCount", async (req, res) => {
//   const { testCreationTableId, subjectId, sectionId } = req.params;
//   try {
//     const [results, fields] = await db.execute(
//       `SELECT t.testCreationTableId, COUNT(q.question_id) AS total_question_count 
//       FROM 
//       test_creation_table t 
//       LEFT JOIN questions q ON t.testCreationTableId = q.testCreationTableId 
//       WHERE t.testCreationTableId = 2;`
//     );
//     res.json(results);
//   } catch (error) {
//     console.error("Error fetching course count:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
router.get("/questionCount/:testCreationTableId", async (req, res) => {
  const { testCreationTableId } = req.params;
  try {
    const [results, fields] = await db.execute(
      `SELECT t.testCreationTableId, COUNT(q.question_id) AS total_question_count 
      FROM 
      test_creation_table t 
      LEFT JOIN questions q ON t.testCreationTableId = q.testCreationTableId 
      WHERE t.testCreationTableId = ?;`,
      [testCreationTableId]
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching question count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
// router.get('/attemptCount/:testCreationTableId/:user_Id', async (req, res) => {
//   const { testCreationTableId, user_Id} = req.params;
//     try {
//       const [results, fields] = await db.execute(
//       `SELECT COUNT(*) AS total_attempted_questions
//       FROM user_responses
//       WHERE user_Id = 2 AND testCreationTableId = 2;`
//       );
//       res.json(results);
//     } catch (error) {
//       console.error('Error fetching course count:', error);
//       res.status(500).json({ error: 'Internal Server Error' });
//     }
//   });

// SELECT ur.user_Sno, ur.user_Id, ur.testCreationTableId, ur.question_id, ur.user_answer
// FROM user_responses ur
// JOIN answer a ON ur.question_id = a.question_id
// WHERE TRIM(ur.user_answer) = TRIM(a.answer_text)

//       SELECT COUNT(*) AS total_matching_rows
// FROM user_responses ur
// JOIN answer a ON ur.question_id = a.question_id
// WHERE TRIM(ur.user_answer) = TRIM(a.answer_text);

router.get("/attemptCount/:testCreationTableId/:user_Id", async (req, res) => {
  const { testCreationTableId, user_Id } = req.params;

  try {
    if (!testCreationTableId || !user_Id) {
      // Check if any of the required parameters is missing
      return res.status(400).json({ error: "Missing required parameters" });
    }

    const [results, fields] = await db.execute(
      `SELECT COUNT(*) AS total_attempted_questions
       FROM user_responses
       WHERE user_Id = ? AND testCreationTableId = ?`,
      [user_Id, testCreationTableId]
    );

    res.json(results);
  } catch (error) {
    console.error("Error fetching attempted question count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

router.get(
  "/correctAnswers/:testCreationTableId/:user_Id",
  async (req, res) => {
    const { testCreationTableId, user_Id } = req.params;

    try {
      if (!testCreationTableId || !user_Id) {
        // Check if any of the required parameters is missing
        return res.status(400).json({ error: "Missing required parameters" });
      }

      const [results, fields] = await db.execute(
        `SELECT COUNT(*) AS total_matching_rows
        FROM user_responses ur
        JOIN answer a ON ur.question_id = a.question_id
        WHERE TRIM(ur.user_answer) = TRIM(a.answer_text)
        AND ur.user_Id = ? AND ur.testCreationTableId = ?`,
        [user_Id, testCreationTableId]
      );

      res.json(results);
    } catch (error) {
      console.error("Error fetching correct answers count:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get(
  "/incorrectAnswers/:testCreationTableId/:user_Id",
  async (req, res) => {
    const { testCreationTableId, user_Id } = req.params;

    try {
      if (!testCreationTableId || !user_Id) {
        // Check if any of the required parameters is missing
        return res.status(400).json({ error: "Missing required parameters" });
      }

      const [results, fields] = await db.execute(
        `SELECT COUNT(*) AS total_unmatched_rows
        FROM user_responses ur
        JOIN answer a ON ur.question_id = a.question_id
        WHERE TRIM(ur.user_answer) != TRIM(a.answer_text)
        AND ur.user_Id = ? AND ur.testCreationTableId = ?`,
        [user_Id, testCreationTableId]
      );

      res.json(results);
    } catch (error) {
      console.error("Error fetching correct answers count:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);

router.get(
  "/score/:testCreationTableId/:user_Id",
  async (req, res) => {
    const { testCreationTableId, user_Id } = req.params;

    try {
      if (!testCreationTableId || !user_Id) {
        // Check if any of the required parameters is missing
        return res.status(400).json({ error: "Missing required parameters" });
      }

      const [results, fields] = await db.execute(
        `SELECT
            ur.user_Sno,
            ur.user_Id,
            ur.testCreationTableId,
            ur.question_id,
            ur.user_answer,
            a.answer_text,
            m.marks_text,
            0 AS nmarks_text
        FROM
            user_responses ur
        JOIN
            answer a ON ur.question_id = a.question_id
        JOIN
            marks m ON ur.question_id = m.question_id
        WHERE
            TRIM(ur.user_answer) = TRIM(a.answer_text)
            AND ur.user_Id = ?
            AND ur.testCreationTableId = ?
        
        UNION
        
        SELECT
            ur.user_Sno,
            ur.user_Id,
            ur.testCreationTableId,
            ur.question_id,
            ur.user_answer,
            a.answer_text,
            0 AS marks_text,
            m.nmarks_text
        FROM
            user_responses ur
        JOIN
            answer a ON ur.question_id = a.question_id
        JOIN
            marks m ON ur.question_id = m.question_id
        WHERE
            TRIM(ur.user_answer) != TRIM(a.answer_text)
            AND ur.user_Id = ?
            AND ur.testCreationTableId = ?;
    `,
        [user_Id, testCreationTableId, user_Id, testCreationTableId]
      );

      // Calculate total marks and net marks
      let totalMarks = 0;
      let netMarks = 0;

      results.forEach((row) => {
        totalMarks += row.marks_text;
        netMarks += row.marks_text - row.nmarks_text;
      });

      const score = {
        totalMarks,
        netMarks,
      };

      res.json(score);
    } catch (error) {
      console.error("Error fetching scores:", error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
);




// router.get(
//   "/score/:testCreationTableId/:user_Id",
//   async (req, res) => {
//     const { testCreationTableId, user_Id } = req.params;

//     try {
//       if (!testCreationTableId || !user_Id) {
//         // Check if any of the required parameters is missing
//         return res.status(400).json({ error: "Missing required parameters" });
//       }

//       const [results, fields] = await db.execute(
//         `SELECT
//         ur.user_Sno,
//         ur.user_Id,
//         ur.testCreationTableId,
//         ur.question_id,
//         ur.user_answer,
//         a.answer_text,
//         m.marks_text,
//         0 AS nmarks_text
//     FROM
//         user_responses ur
//     JOIN
//         answer a ON ur.question_id = a.question_id
//     JOIN
//         marks m ON ur.question_id = m.question_id
//     WHERE
//         TRIM(ur.user_answer) = TRIM(a.answer_text)
//         AND ur.user_Id = 2
//         AND ur.testCreationTableId = 2
    
//     UNION
    
//     SELECT
//         ur.user_Sno,
//         ur.user_Id,
//         ur.testCreationTableId,
//         ur.question_id,
//         ur.user_answer,
//         a.answer_text,
//         0 marks_text,
//         m.nmarks_text
//     FROM
//         user_responses ur
//     JOIN
//         answer a ON ur.question_id = a.question_id
//     JOIN
//         marks m ON ur.question_id = m.question_id
//     WHERE
//         TRIM(ur.user_answer) != TRIM(a.answer_text)
//         AND ur.user_Id = 2
//         AND ur.testCreationTableId = 2;
//     `,
//         [user_Id, testCreationTableId]
//       );

//       res.json(results);
//     } catch (error) {
//       console.error("Error fetching correct answers count:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );

// router.get('/questionCount/:testCreationTableId', async (req, res) => {
//   const { testCreationTableId } = req.params;
//   try {
//     const [results, fields] = await db.execute(
//       `SELECT t.testCreationTableId, COUNT(q.question_id) AS total_question_count FROM test_creation_table t LEFT JOIN questions q ON t.testCreationTableId = q.testCreationTableId WHERE t.testCreationTableId = ?;`,
//       [testCreationTableId]
//     );
//     res.json(results);
//   } catch (error) {
//     console.error('Error fetching question count:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

router.get("/getEmployeeData", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decodedToken = jwt.verify(
    token.replace("Bearer ", ""),
    "your_secret_key"
  );

  if (!decodedToken) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const employeeId = decodedToken.id;

  const fetchEmployeeSql = "SELECT * FROM user_responses e  WHERE user_Id = ?";

  db.query(fetchEmployeeSql, [employeeId], (error, results) => {
    if (error || results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const employee = results[0];

    // You may want to filter out sensitive information before sending it to the client
    const sanitizedEmployee = {
      Empoye_ID: employee.user_Id,
      EmpoyeeEmail: employee.EmpoyeeEmail,
      EmpoyeeName: employee.EmpoyeeName,
      // Add other fields as needed
    };

    res.status(200).json(sanitizedEmployee);
  });
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

// router.put('/updateResponse/:user_Id/:testCreationTableId/:questionId', (req, res) => {
//   try {
//     const user_Id = parseInt(req.params.user_Id, 10);
//     const testCreationTableId = parseInt(req.params.testCreationTableId, 10);
//     const questionId = parseInt(req.params.questionId, 10);
//     const { updatedResponse } = req.body;

//     if (updatedResponse && updatedResponse.optionIndexes1 && updatedResponse.optionIndexes2) {
//       const userAnswer1 = updatedResponse.optionIndexes1.join(',');
//       const userAnswer2 = updatedResponse.optionIndexes2.join(',');

//       const sql = 'UPDATE user_responses SET user_answer = ? WHERE user_Id = ? AND testCreationTableId = ? AND question_id = ?';

//       db.query(sql, [userAnswer1 + ',' + userAnswer2, user_Id, testCreationTableId, questionId], (err, result) => {
//         if (err) {
//           console.error('Error updating response in the database:', err);
//           res.status(500).json({ success: false, message: 'Internal server error' });
//         } else {
//           if (result.affectedRows > 0) {
//             console.log(`Response for question ${questionId} updated successfully`);
//             res.json({ success: true, message: 'Response updated successfully' });
//           } else {
//             console.error(`No records found for question ${questionId}`);
//             res.status(404).json({ success: false, message: 'Response not found' });
//           }
//         }
//       });
//     } else {
//       console.error(`Invalid updated response data for question ${questionId}`);
//       res.status(400).json({ success: false, message: 'Invalid updated response data' });
//     }
//   } catch (error) {
//     console.error('Error handling the request:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });

router.get("/:userId", async (req, res) => {
  const userId = req.params.userId;

  // Query to fetch data from user_responses based on user_Id
  const fetchUserDataSql = "SELECT * FROM user_responses WHERE user_Id = 2";

  db.query(fetchUserDataSql, [userId], (error, results) => {
    if (error) {
      return res.status(500).json({ error: "Internal Server Error" });
    }

    if (results.length === 0) {
      return res.status(404).json({ error: "User responses not found" });
    }

    const userResponses = results;

    // You may want to filter out sensitive information before sending it to the client
    const sanitizedUserResponses = userResponses.map((response) => ({
      // Add fields as needed
      // Example: field1: response.field1,
      //          field2: response.field2,
    }));

    res.status(200).json(sanitizedUserResponses);
  });
});

module.exports = router;
