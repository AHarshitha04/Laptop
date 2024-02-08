

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
      SELECT q.question_id, q.testCreationTableId ,qt.qtypeId, qt.qtype_text, qts.typeofQuestion, qts.quesionTypeId FROM questions q 
      JOIN qtype qt ON q.question_id = qt.question_id 
      JOIN quesion_type qts ON qt.quesionTypeId = qts.quesionTypeId WHERE q.question_id = ?;
      `,
      [questionId]
    );

    res.json(results);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});

router.get("/fetchSections/:testCreationTableId/:subjectId",
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

router.get("/fetchSections/:testCreationTableId/:subjectId",
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
// SELECT 
//       q.question_id, q.questionImgName, 
//       o.option_id, o.optionImgName, o.option_index,
//       s.solution_id, s.solutionImgName, 
//       qt.qtypeId, qt.qtype_text,
//       ur.user_answer, ur.user_Sno, qts.typeofQuestion,
//       ans.answer_id, ans.answer_text,
//       m.markesId, m.marks_text,
//       si.sort_id, si.sortid_text,
//       doc.documen_name, doc.sectionId, 
//       doc.subjectId, doc.testCreationTableId,
//       P.paragraphImg, p.paragraph_Id,
//       pq.paragraphQNo_Id, pq.paragraphQNo, qts.quesionTypeId
      
//   FROM 
//       questions q 
//       LEFT OUTER JOIN options o ON q.question_id = o.question_id
//       LEFT OUTER JOIN qtype qt ON q.question_id = qt.question_id 
//       LEFT OUTER JOIN quesion_type qts ON qt.quesionTypeId = qts.quesionTypeId 
//       LEFT OUTER JOIN answer ans ON q.question_id = ans.question_id 
//       LEFT OUTER JOIN marks m ON q.question_id = m.question_id 
//       LEFT OUTER JOIN sortid si ON q.question_id = si.question_id 
//       LEFT OUTER JOIN solution s ON q.question_id = s.solution_id 
//       LEFT OUTER JOIN paragraph p ON q.document_Id = p.document_Id
//       LEFT OUTER JOIN paragraphqno pq ON p.paragraph_Id = pq.paragraph_Id AND q.question_id = pq.question_id
//       LEFT OUTER JOIN ots_document doc ON q.document_Id = doc.document_Id
//       LEFT OUTER JOIN user_responses ur ON q.question_id = ur.question_id and o.option_id = ur.option_id
    
//   WHERE 
//       doc.testCreationTableId = ? ORDER BY q.question_id ASC;
router.get("/questionOptions/:testCreationTableId", async (req, res) => {
  const { testCreationTableId } = req.params;
  try {
    const [rows] = await db.query(
      `SELECT 
      q.question_id, q.questionImgName, 
      o.option_id, o.optionImgName, o.option_index,
      s.solution_id, s.solutionImgName, 
      qt.qtypeId, qt.qtype_text,
      ur.user_answer, ur.user_Sno, qts.typeofQuestion,
      ans.answer_id, ans.answer_text,
      m.markesId, m.marks_text,
      si.sort_id, si.sortid_text,
      doc.documen_name, doc.sectionId, 
      doc.subjectId, doc.testCreationTableId,
      P.paragraphImg, p.paragraph_Id,
      pq.paragraphQNo_Id, pq.paragraphQNo, qts.quesionTypeId
        
  FROM 
      questions q 
      LEFT OUTER JOIN options o ON q.question_id = o.question_id
      LEFT OUTER JOIN qtype qt ON q.question_id = qt.question_id 
      LEFT OUTER JOIN quesion_type qts ON qt.quesionTypeId = qts.quesionTypeId 
      LEFT OUTER JOIN answer ans ON q.question_id = ans.question_id 
      LEFT OUTER JOIN marks m ON q.question_id = m.question_id 
      LEFT OUTER JOIN sortid si ON q.question_id = si.question_id 
      LEFT OUTER JOIN solution s ON q.question_id = s.solution_id 
      LEFT OUTER JOIN paragraph p ON q.document_Id = p.document_Id
      LEFT OUTER JOIN paragraphqno pq ON p.paragraph_Id = pq.paragraph_Id AND q.question_id = pq.question_id
      LEFT OUTER JOIN ots_document doc ON q.document_Id = doc.document_Id
      LEFT OUTER JOIN user_responses ur ON q.question_id = ur.question_id and o.option_id = ur.option_id
    
  WHERE 
      doc.testCreationTableId = ? 
  
  ORDER BY q.question_id ASC, o.option_index ASC;
  
  
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
          ans: row.user_answer,
        };
        if (existingQuestion) {
          const existingOption = existingQuestion.options.find(
            (opt) => opt.option_id === option.option_id
          );
  
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
            subjectId: row.subjectId,
            sectionId: row.sectionId,
            qtype: {
              qtypeId: row.qtypeId,
              qtype_text: row.qtype_text,
            },
            quesion_type: {
              quesionTypeId: row.quesionTypeId,
              quesion_type: row.quesion_type,
              typeofQuestion:  row.typeofQuestion,
            },
            answer: {
              answer_id: row.answer_id,
              answer_text: row.answer_text,
            },
            useranswer: {
              urid: row.question_id,
              // ans: row.user_answer,
              urid: row.question_id,
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

// ----------------------------left time submission api's--------------
router.post('/submitTimeLeft', async (req, res) => {
  try {
    const { userId, testCreationTableId, timeLeft } = req.body;

    // Validate data types
    const userIdNumber = parseInt(userId, 10);
    const testCreationTableIdNumber = parseInt(testCreationTableId, 10);

    if (isNaN(userIdNumber) || isNaN(testCreationTableIdNumber) || typeof timeLeft !== 'string') {
      console.error('Invalid data types');
      return res.status(400).json({ success: false, message: 'Invalid data types' });
    }

    // Continue with processing
    const sql = 'INSERT INTO time_left_submission_of_test (user_Id, testCreationTableId, time_left) VALUES (?,?,?)';

    const queryValues = [userIdNumber, testCreationTableIdNumber, timeLeft];

    console.log('Executing SQL query for time left submission:', sql, queryValues);

    await new Promise((resolve, reject) => {
      db.query(sql, queryValues, (err, result) => {
        if (err) {
          console.error('Error saving time left to the database:', err);
          reject(err);
        } else {
          console.log('Time left submission saved to the database');
          resolve(result);
        }
      });
    });

    res.json({ success: true, message: 'Time left submission saved successfully' });
  } catch (error) {
    console.error('Error handling time left submission:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});


// Add a new route to fetch time left
router.get('/getTimeLeftSubmissions/:testCreationTableId/:userId', async (req, res) => {
  try {
    // Your SQL query
    const query = `
      SELECT *
      FROM time_left_submission_of_test ts
      JOIN user_responses ur ON ts.user_Id = ur.user_Id AND ts.testCreationTableId = ur.testCreationTableId
      WHERE ur.user_Id = 2 AND ts.testCreationTableId = 3
      LIMIT 1;
    `;
 
    // Execute the query using promises
    const [rows, fields] = await db.execute(query);
 
    // Send the result as JSON
    res.json(rows);
  } catch (error) {
    console.error('Error executing query:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// router.get("/score/:testCreationTableId/:user_Id", async (req, res) => {
//   const { testCreationTableId, user_Id } = req.params;
 
//   try {
//     if (!testCreationTableId || !user_Id) {
//       // Check if any of the required parameters is missing
//       return res.status(400).json({ error: "Missing required parameters" });
//     }
 
//     const [results, fields] = await db.execute(
//       `
//       (
//         SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             s.subjectId,
//             ur.sectionId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             m.marks_text,
//             0 AS nmarks_text,
//             s.QuestionLimit
//         FROM
//             user_responses ur
//         JOIN answer a ON
//             ur.question_id = a.question_id
//         JOIN marks m ON
//             ur.question_id = m.question_id
//         JOIN sections s ON
//             ur.sectionId = s.sectionId
//         WHERE
//             TRIM(ur.user_answer) = TRIM(a.answer_text) AND ur.user_Id = 2 AND ur.testCreationTableId = 3 AND s.QuestionLimit IS NOT NULL AND s.QuestionLimit > 0
//         LIMIT 25
//     )
//     UNION
//         (
//         SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             s.subjectId,
//             ur.sectionId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             0 AS marks_text,
//             m.nmarks_text,
//             s.QuestionLimit
//         FROM
//             user_responses ur
//         JOIN answer a ON
//             ur.question_id = a.question_id
//         JOIN marks m ON
//             ur.question_id = m.question_id
//         JOIN sections s ON
//             ur.sectionId = s.sectionId
//         WHERE
//             TRIM(ur.user_answer) != TRIM(a.answer_text) AND ur.user_Id = 2 AND ur.testCreationTableId = 3 AND s.QuestionLimit IS NOT NULL AND s.QuestionLimit > 0
//         LIMIT 25
//     )
//       `,
//       [user_Id, testCreationTableId, user_Id, testCreationTableId]
//     );
 
//   // Initialize an object to hold subject-wise scores
// let subjectScores = {};
 
// // Iterate over the results to calculate subject-wise scores
// results.forEach((row) => {
//   const { subjectId, marks_text, nmarks_text, QuestionLimit } = row;
 
//   // If the subjectId is not already in subjectScores, initialize it
//   if (!subjectScores[subjectId]) {
//     subjectScores[subjectId] = {
//       totalMarks: 0,
//       netMarks: 0,
//       correctAnswersCount: 0,
//       questionLimit: 0
//     };
//   }
 
//   // Check if the correct answers count is within the question limit
//   if (QuestionLimit && subjectScores[subjectId].correctAnswersCount < QuestionLimit) {
//     subjectScores[subjectId].totalMarks += marks_text;
//     subjectScores[subjectId].netMarks += marks_text - nmarks_text;
//     subjectScores[subjectId].correctAnswersCount++;
//   }
 
//   // Set the question limit (assuming it's the same for all rows)
//   subjectScores[subjectId].questionLimit = QuestionLimit;
// });
 
// // Calculate total and net marks across all subjects
// let totalMarks = 0;
// let netMarks = 0;
 
// Object.values(subjectScores).forEach((subjectScore) => {
//   totalMarks += subjectScore.totalMarks;
//   netMarks += subjectScore.netMarks;
// });
 
// const overallScore = {
//   totalMarks,
//   netMarks
// };
 
// // Add overallScore to subjectScores
// subjectScores['Overall'] = overallScore;
 
// res.json({ overallScore, subjectScores });
 
 
   
//   } catch (error) {
//     console.error("Error fetching scores:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

// router.get("/score/:testCreationTableId/:user_Id",

// router.get(
//   "/getTimeLeftSubmissions/:testCreationTableId/:userId",
//   (req, res) => {
//     const { user_Id, testCreationTableId } = req.params;

//     // Log the parameters to the console
//     console.log("Received request with user_Id:", user_Id);
//     console.log(
//       "Received request with testCreationTableId:",
//       testCreationTableId
//     );

//     if (!testCreationTableId || !user_Id) {
//       return res.status(400).json({ error: "Missing required parameters" });
//     }

//     const query = `
//        SELECT tlsot.*
//     FROM time_left_submission_of_t\est tlsot
//     JOIN user_responses ur ON tlsot.user_Id = ur.user_Id AND tlsot.testCreationTableId = ur.testCreationTableId
//     WHERE tlsot.user_Id = ? AND tlsot.testCreationTableId = ?
  
//     LIMIT 1;
//     `;

//     db.query(query, [user_Id, testCreationTableId], (err, results) => {
//       if (err) {
//         console.error("Error executing the query:", err);
//         res.status(500).json({ error: "Internal Server Error" });
//       } else {
//         res.json(results);
//       }
//     });
//   }
// );

// router.get('/getTimeLeftSubmissions/:userId/:testCreationTableId', async (req, res) => {
//   try {
//     const { userId, testCreationTableId } = req.params;

 

//     // Retrieve time left submission data from the database
//     const sql = 'SELECT * FROM time_left_submission_of_test WHERE user_Id = ? AND testCreationTableId = ?';
//     const queryValues = [userIdNumber, testCreationTableIdNumber];

//     console.log('Executing SQL query for fetching time left submission:', sql, queryValues);

//     await new Promise((resolve, reject) => {
//       db.query(sql, queryValues, (err, result) => {
//         if (err) {
//           console.error('Error fetching time left submission from the database:', err);
//           reject(err);
//         } else {
//           console.log('Time left submission fetched from the database');
//           resolve(result);
//         }
//       });
//     });

//     res.json({ success: true, message: 'Time left submission fetched successfully' });
//   } catch (error) {
//     console.error('Error handling time left submission retrieval:', error);
//     res.status(500).json({ success: false, message: 'Internal server error' });
//   }
// });
// router.get("/getTimeLeftSubmissions/:userId/:testCreationTableId", async (req, res) => {
//   // FetchData
//   try {
//     const { user_Id,testCreationTableId } = req.params;
//     const [rows] = await db.query(
//       "SELECT * FROM time_left_submission_of_test WHERE user_Id = 2 AND testCreationTableId = 1;",
//       [user_Id,testCreationTableId]
//     );
//     res.json(rows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


// ----------------------------end left time submission api's--------------

//WORKING FOR MARKING POINTS WITH OUT QUESTION LIMIT SECTION QUESTIONS
// router.get("/score/:testCreationTableId/:user_Id", async (req, res) => {
//   const { testCreationTableId, user_Id } = req.params;
 
//   try {
//     if (!testCreationTableId || !user_Id) {
//       // Check if any of the required parameters is missing
//       return res.status(400).json({ error: "Missing required parameters" });
//     }
 
//     const [results, fields] = await db.execute(
//       `(
//             SELECT
//                 ur.user_Sno,
//                 ur.user_Id,
//                 ur.testCreationTableId,
//                 ur.sectionId,
//                 ur.question_id,
//                 ur.user_answer,
//                 a.answer_text,
//                 m.marks_text,
//                 0 AS nmarks_text,
//                 s.QuestionLimit
//             FROM
//                 user_responses ur
//             JOIN
//                 answer a ON ur.question_id = a.question_id
//             JOIN
//                 marks m ON ur.question_id = m.question_id
//             JOIN
//                 sections s ON ur.sectionId = s.sectionId
//             WHERE
//                 TRIM(ur.user_answer) = TRIM(a.answer_text)
//                 AND ur.user_Id = 2
//                 AND ur.testCreationTableId = 3
//                 AND (s.QuestionLimit IS NULL OR s.QuestionLimit = 0)
//         )
//         UNION
//         (
//             SELECT
//                 ur.user_Sno,
//                 ur.user_Id,
//                 ur.testCreationTableId,
//                 ur.sectionId,
//                 ur.question_id,
//                 ur.user_answer,
//                 a.answer_text,
//                 0 AS marks_text,
//                 m.nmarks_text,
//                 s.QuestionLimit
//             FROM
//                 user_responses ur
//             JOIN
//                 answer a ON ur.question_id = a.question_id
//             JOIN
//                 marks m ON ur.question_id = m.question_id
//             JOIN
//                 sections s ON ur.sectionId = s.sectionId
//             WHERE
//                 TRIM(ur.user_answer) != TRIM(a.answer_text)
//                 AND ur.user_Id = 2
//                 AND ur.testCreationTableId = 3
//                 AND (s.QuestionLimit IS NULL OR s.QuestionLimit = 0)
//         );
 
//           `,
//       [user_Id, testCreationTableId, user_Id, testCreationTableId]
//     );
 
//     // Calculate total marks and net marks
//     let totalMarks = 0;
//     let netMarks = 0;
 
//     results.forEach((row) => {
//       totalMarks += row.marks_text;
//       netMarks += row.marks_text - row.nmarks_text;
//     });
 
//     const score = {
//       totalMarks,
//       netMarks,
//     };
 
//     res.json(score);
//   } catch (error) {
//     console.error("Error fetching scores:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



//working for marking points for questions to calculate score for questionslimit section
// router.get("/score/:testCreationTableId/:user_Id", async (req, res) => {
//   const { testCreationTableId, user_Id } = req.params;
 
//   try {
//     if (!testCreationTableId || !user_Id) {
//       // Check if any of the required parameters is missing
//       return res.status(400).json({ error: "Missing required parameters" });
//     }
 
//     const [results, fields] = await db.execute(
//       `(
//             SELECT
//                 ur.user_Sno,
//                 ur.user_Id,
//                 ur.testCreationTableId,
//                 ur.sectionId,
//                 ur.question_id,
//                 ur.user_answer,
//                 a.answer_text,
//                 m.marks_text,
//                 0 AS nmarks_text,
//                 s.QuestionLimit
//             FROM
//                 user_responses ur
//             JOIN
//                 answer a ON ur.question_id = a.question_id
//             JOIN
//                 marks m ON ur.question_id = m.question_id
//             JOIN
//                 sections s ON ur.sectionId = s.sectionId
//             WHERE
//                 TRIM(ur.user_answer) = TRIM(a.answer_text)
//                 AND ur.user_Id = 2
//                 AND ur.testCreationTableId = 3
//                 AND s.QuestionLimit IS NOT NULL
//                 AND s.QuestionLimit > 0
//             LIMIT 25  -- Adjust the limit as needed
//         )
//         UNION
//         (
//             SELECT
//                 ur.user_Sno,
//                 ur.user_Id,
//                 ur.testCreationTableId,
//                 ur.sectionId,
//                 ur.question_id,
//                 ur.user_answer,
//                 a.answer_text,
//                 0 AS marks_text,
//                 m.nmarks_text,
//                 s.QuestionLimit
//             FROM
//                 user_responses ur
//             JOIN
//                 answer a ON ur.question_id = a.question_id
//             JOIN
//                 marks m ON ur.question_id = m.question_id
//             JOIN
//                 sections s ON ur.sectionId = s.sectionId
//             WHERE
//                 TRIM(ur.user_answer) != TRIM(a.answer_text)
//                 AND ur.user_Id = 2
//                 AND ur.testCreationTableId = 3
//                 AND s.QuestionLimit IS NOT NULL
//                 AND s.QuestionLimit > 0
//             LIMIT 25  -- Adjust the limit as needed
//         );
 
//           `,
//       [user_Id, testCreationTableId, user_Id, testCreationTableId]
//     );
 
//     // Calculate total marks and net marks
//     let totalMarks = 0;
//     let netMarks = 0;
//     let correctAnswersCount = 0;
//     let questionLimit = 0;
 
//     results.forEach((row) => {
//       const { marks_text, nmarks_text, QuestionLimit } = row;
 
//       // Check if the correct answers count is within the question limit
//       if (QuestionLimit && correctAnswersCount < QuestionLimit) {
//         totalMarks += marks_text;
//         netMarks += marks_text - nmarks_text;
//         correctAnswersCount++;
//       }
 
//       // Set the question limit (assuming it's the same for all rows)
//       questionLimit = QuestionLimit;
//     });
 
//     // If correctAnswersCount is less than the questionLimit, add remaining from wrong answers
//     if (correctAnswersCount < questionLimit) {
//       for (let i = 0; i < results.length; i++) {
//         // Assume the wrong answer has a marks_text value
//         totalMarks += results[i].marks_text;
//         netMarks += results[i].marks_text - results[i].nmarks_text;
//       }
//     }
 
//     const score = {
//       totalMarks,
//       netMarks,
//     };
 
//     res.json(score);
//   } catch (error) {
//     console.error("Error fetching scores:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });


//COMBINED API CODE FOR SECTION WITH QUESTION LIMIT AND SECTION WITHOUT QUESTION LIMIT








// //main working code for not having question limit questions
// router.get("/score/:testCreationTableId/:user_Id", async (req, res) => {
//   const { testCreationTableId, user_Id } = req.params;
 
//   try {
//     if (!testCreationTableId || !user_Id) {
//       // Check if any of the required parameters is missing
//       return res.status(400).json({ error: "Missing required parameters" });
//     }
 
//     const [results, fields] = await db.execute(
//       `(
//         SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             s.subjectId,
//             ur.sectionId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             m.marks_text,
//             0 AS nmarks_text,
//             s.QuestionLimit
//         FROM
//             user_responses ur
//         JOIN answer a ON
//             ur.question_id = a.question_id
//         JOIN marks m ON
//             ur.question_id = m.question_id
//         JOIN sections s ON
//             ur.sectionId = s.sectionId
//         WHERE
//             TRIM(ur.user_answer) = TRIM(a.answer_text) AND ur.user_Id = ? AND ur.testCreationTableId = ? AND(
//                 s.QuestionLimit IS NULL OR s.QuestionLimit = 0
//             )
//     )
//     UNION
//         (
//         SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             s.subjectId,
//             ur.sectionId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             0 AS marks_text,
//             m.nmarks_text,
//             s.QuestionLimit
//         FROM
//             user_responses ur
//         JOIN answer a ON
//             ur.question_id = a.question_id
//         JOIN marks m ON
//             ur.question_id = m.question_id
//         JOIN sections s ON
//             ur.sectionId = s.sectionId
//         WHERE
//             TRIM(ur.user_answer) != TRIM(a.answer_text) AND ur.user_Id = ? AND ur.testCreationTableId = ? AND(
//                 s.QuestionLimit IS NULL OR s.QuestionLimit = 0
//             )
//     );
 
//           `,
//       [user_Id, testCreationTableId, user_Id, testCreationTableId]
//     );
 
//     // Calculate subject-wise scores
//     let subjectScores = {};
 
//     results.forEach((row) => {
//       const { subjectId, marks_text, nmarks_text } = row;
 
//       // If subjectId doesn't exist in subjectScores, initialize it
//       if (!subjectScores[subjectId]) {
//         subjectScores[subjectId] = {
//           totalMarks: 0,
//           netMarks: 0
//         };
//       }
 
//       // Add marks to subject-wise scores
//       subjectScores[subjectId].totalMarks += marks_text;
//       subjectScores[subjectId].netMarks += marks_text - nmarks_text;
//     });
 
//     // Calculate total marks and net marks across all subjects
//     let totalMarks = 0;
//     let netMarks = 0;
 
//     Object.values(subjectScores).forEach((subjectScore) => {
//       totalMarks += subjectScore.totalMarks;
//       netMarks += subjectScore.netMarks;
//     });
 
//     const score = {
//       totalMarks,
//       netMarks,
//       subjectScores
//     };
 
//     res.json(score);
//   } catch (error) {
//     console.error("Error fetching scores:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });



// // main working code for question limit section questions
// router.get("/score/:testCreationTableId/:user_Id", async (req, res) => {
//   const { testCreationTableId, user_Id } = req.params;
 
//   try {
//     if (!testCreationTableId || !user_Id) {
//       // Check if any of the required parameters is missing
//       return res.status(400).json({ error: "Missing required parameters" });
//     }
 
//     const [results, fields] = await db.execute(
//       `
//       (
//         SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             s.subjectId,
//             ur.sectionId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             m.marks_text,
//             0 AS nmarks_text,
//             s.QuestionLimit
//         FROM
//             user_responses ur
//         JOIN answer a ON
//             ur.question_id = a.question_id
//         JOIN marks m ON
//             ur.question_id = m.question_id
//         JOIN sections s ON
//             ur.sectionId = s.sectionId
//         WHERE
//             TRIM(ur.user_answer) = TRIM(a.answer_text) AND ur.user_Id = 2 AND ur.testCreationTableId = 3 AND s.QuestionLimit IS NOT NULL AND s.QuestionLimit > 0
//         LIMIT 25
//     )
//     UNION
//         (
//         SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             s.subjectId,
//             ur.sectionId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             0 AS marks_text,
//             m.nmarks_text,
//             s.QuestionLimit
//         FROM
//             user_responses ur
//         JOIN answer a ON
//             ur.question_id = a.question_id
//         JOIN marks m ON
//             ur.question_id = m.question_id
//         JOIN sections s ON
//             ur.sectionId = s.sectionId
//         WHERE
//             TRIM(ur.user_answer) != TRIM(a.answer_text) AND ur.user_Id = 2 AND ur.testCreationTableId = 3 AND s.QuestionLimit IS NOT NULL AND s.QuestionLimit > 0
//         LIMIT 25
//     )
//       `,
//       [user_Id, testCreationTableId, user_Id, testCreationTableId]
//     );
 
//   // Initialize an object to hold subject-wise scores
// let subjectScores = {};
 
// // Iterate over the results to calculate subject-wise scores
// results.forEach((row) => {
//   const { subjectId, marks_text, nmarks_text, QuestionLimit } = row;
 
//   // If the subjectId is not already in subjectScores, initialize it
//   if (!subjectScores[subjectId]) {
//     subjectScores[subjectId] = {
//       totalMarks: 0,
//       netMarks: 0,
//       correctAnswersCount: 0,
//       questionLimit: 0
//     };
//   }
 
//   // Check if the correct answers count is within the question limit
//   if (QuestionLimit && subjectScores[subjectId].correctAnswersCount < QuestionLimit) {
//     subjectScores[subjectId].totalMarks += marks_text;
//     subjectScores[subjectId].netMarks += marks_text - nmarks_text;
//     subjectScores[subjectId].correctAnswersCount++;
//   }
 
//   // Set the question limit (assuming it's the same for all rows)
//   subjectScores[subjectId].questionLimit = QuestionLimit;
// });
 
// // Calculate total and net marks across all subjects
// let totalMarks = 0;
// let netMarks = 0;
 
// Object.values(subjectScores).forEach((subjectScore) => {
//   totalMarks += subjectScore.totalMarks;
//   netMarks += subjectScore.netMarks;
// });
 
// const overallScore = {
//   totalMarks,
//   netMarks
// };
 
// // Add overallScore to subjectScores
// subjectScores['Overall'] = overallScore;
 
// res.json({ overallScore, subjectScores });
 
 
   
//   } catch (error) {
//     console.error("Error fetching scores:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });
 


//full score for overall test
// router.get("/score/:testCreationTableId/:user_Id", async (req, res) => {
//   const { testCreationTableId, user_Id } = req.params;
 
//   try {
//     if (!testCreationTableId || !user_Id) {
//       return res.status(400).json({ error: "Missing required parameters" });
//     }
 
//     const [results, fields] = await db.execute(
//       `
//       (
//         SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             s.subjectId,
//             ur.sectionId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             m.marks_text,
//             0 AS nmarks_text,
//             s.QuestionLimit
//         FROM
//             user_responses ur
//         JOIN answer a ON
//             ur.question_id = a.question_id
//         JOIN marks m ON
//             ur.question_id = m.question_id
//         JOIN sections s ON
//             ur.sectionId = s.sectionId
//         WHERE
//             TRIM(ur.user_answer) = TRIM(a.answer_text) AND ur.user_Id = ? AND ur.testCreationTableId = ? AND (
//                 s.QuestionLimit IS NULL OR s.QuestionLimit = 0
//             )
//     )
//     UNION
//     (
//         SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             s.subjectId,
//             ur.sectionId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             0 AS marks_text,
//             m.nmarks_text,
//             s.QuestionLimit
//         FROM
//             user_responses ur
//         JOIN answer a ON
//             ur.question_id = a.question_id
//         JOIN marks m ON
//             ur.question_id = m.question_id
//         JOIN sections s ON
//             ur.sectionId = s.sectionId
//         WHERE
//             TRIM(ur.user_answer) != TRIM(a.answer_text) AND ur.user_Id = ? AND ur.testCreationTableId = ? AND (
//                 s.QuestionLimit IS NULL OR s.QuestionLimit = 0
//             )
//     )
//     UNION
//     (
//         SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             s.subjectId,
//             ur.sectionId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             m.marks_text,
//             0 AS nmarks_text,
//             s.QuestionLimit
//         FROM
//             user_responses ur
//         JOIN answer a ON
//             ur.question_id = a.question_id
//         JOIN marks m ON
//             ur.question_id = m.question_id
//         JOIN sections s ON
//             ur.sectionId = s.sectionId
//         WHERE
//             TRIM(ur.user_answer) = TRIM(a.answer_text) AND ur.user_Id = ? AND ur.testCreationTableId = ? AND s.QuestionLimit IS NOT NULL AND s.QuestionLimit > 0
//         LIMIT 25
//     )
//     UNION
//     (
//         SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             s.subjectId,
//             ur.sectionId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             0 AS marks_text,
//             m.nmarks_text,
//             s.QuestionLimit
//         FROM
//             user_responses ur
//         JOIN answer a ON
//             ur.question_id = a.question_id
//         JOIN marks m ON
//             ur.question_id = m.question_id
//         JOIN sections s ON
//             ur.sectionId = s.sectionId
//         WHERE
//             TRIM(ur.user_answer) != TRIM(a.answer_text) AND ur.user_Id = ? AND ur.testCreationTableId = ? AND s.QuestionLimit IS NOT NULL AND s.QuestionLimit > 0
//         LIMIT 25
//     );
   
//       `,
//       [user_Id, testCreationTableId, user_Id, testCreationTableId, user_Id, testCreationTableId, user_Id, testCreationTableId]
//     );
 
//     // Initialize an object to hold subject-wise scores for sections with question limits
//     let subjectScoresWithLimit = {};
 
//     // Initialize an object to hold subject-wise scores for sections without question limits
//     let subjectScoresWithoutLimit = {};
 
//     results.forEach((row) => {
//       const { subjectId, marks_text, nmarks_text, QuestionLimit } = row;
 
//       // If the section has a QuestionLimit
//       if (QuestionLimit !== null && QuestionLimit > 0) {
//         // If subjectId doesn't exist in subjectScoresWithLimit, initialize it
//         if (!subjectScoresWithLimit[subjectId]) {
//           subjectScoresWithLimit[subjectId] = {
//             totalMarks: 0,
//             netMarks: 0,
//             correctAnswersCount: 0,
//             questionLimit: 0
//           };
//         }
 
//         // Check if the correct answers count is within the question limit
//         if (subjectScoresWithLimit[subjectId].correctAnswersCount < QuestionLimit) {
//           subjectScoresWithLimit[subjectId].totalMarks += marks_text;
//           subjectScoresWithLimit[subjectId].netMarks += marks_text - nmarks_text;
//           subjectScoresWithLimit[subjectId].correctAnswersCount++;
//         }
 
//         // Set the question limit (assuming it's the same for all rows)
//         subjectScoresWithLimit[subjectId].questionLimit = QuestionLimit;
//       } else {
//         // If the section does not have a QuestionLimit
//         // If subjectId doesn't exist in subjectScoresWithoutLimit, initialize it
//         if (!subjectScoresWithoutLimit[subjectId]) {
//           subjectScoresWithoutLimit[subjectId] = {
//             totalMarks: 0,
//             netMarks: 0,
//             correctAnswersCount: 0
//           };
//         }
 
//         subjectScoresWithoutLimit[subjectId].totalMarks += marks_text;
//         subjectScoresWithoutLimit[subjectId].netMarks += marks_text - nmarks_text;
//         subjectScoresWithoutLimit[subjectId].correctAnswersCount++;
//       }
//     });
 
//     // Calculate total and net marks for sections with question limits
//     let totalMarksWithLimit = 0;
//     let netMarksWithLimit = 0;
 
//     Object.values(subjectScoresWithLimit).forEach((subjectScore) => {
//       totalMarksWithLimit += subjectScore.totalMarks;
//       netMarksWithLimit += subjectScore.netMarks;
//     });
 
//     // Calculate total and net marks for sections without question limits
//     let totalMarksWithoutLimit = 0;
//     let netMarksWithoutLimit = 0;
 
//     Object.values(subjectScoresWithoutLimit).forEach((subjectScore) => {
//       totalMarksWithoutLimit += subjectScore.totalMarks;
//       netMarksWithoutLimit += subjectScore.netMarks;
//     });
 
//     // Calculate overall total and net marks
//     const overallTotalMarks = totalMarksWithLimit + totalMarksWithoutLimit;
//     const overallNetMarks = netMarksWithLimit + netMarksWithoutLimit;
 
//     const overallScore = {
//       overallTotalMarks,
//       overallNetMarks,
//       subjectScoresWithLimit,
//       subjectScoresWithoutLimit
//     };
 
//     res.json(overallScore);
//   } catch (error) {
//     console.error("Error fetching scores:", error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });  

router.get("/score/:testCreationTableId/:user_Id", async (req, res) => {
  const { testCreationTableId, user_Id } = req.params;
 
  try {
    if (!testCreationTableId || !user_Id) {
      return res.status(400).json({ error: "Missing required parameters" });
    }
 
    const [results, fields] = await db.execute(
      `
     (
    SELECT
        ur.user_Sno,
        ur.user_Id,
        ur.testCreationTableId,
        s.subjectId,
        s.sectionName,
        ur.sectionId,
        ur.question_id,
        ur.user_answer,
        a.answer_text,
        m.marks_text,
        0 AS nmarks_text,
        s.QuestionLimit
    FROM
        user_responses ur
    JOIN answer a ON
        ur.question_id = a.question_id
    JOIN marks m ON
        ur.question_id = m.question_id
    JOIN sections s ON
        ur.sectionId = s.sectionId
    WHERE
        TRIM(ur.user_answer) = TRIM(a.answer_text) AND ur.user_Id = 2 AND ur.testCreationTableId = 3 AND(
            s.QuestionLimit IS NULL OR s.QuestionLimit = 0
        )
)
UNION
    (
    SELECT
        ur.user_Sno,
        ur.user_Id,
        ur.testCreationTableId,
        s.subjectId,
        ur.sectionId,
        s.sectionName,
        ur.question_id,
        ur.user_answer,
        a.answer_text,
        0 AS marks_text,
        m.nmarks_text,
        s.QuestionLimit
    FROM
        user_responses ur
    JOIN answer a ON
        ur.question_id = a.question_id
    JOIN marks m ON
        ur.question_id = m.question_id
    JOIN sections s ON
        ur.sectionId = s.sectionId
    WHERE
        TRIM(ur.user_answer) != TRIM(a.answer_text) AND ur.user_Id = 2 AND ur.testCreationTableId = 3 AND(
            s.QuestionLimit IS NULL OR s.QuestionLimit = 0
        )
)
UNION
    (
    SELECT
        ur.user_Sno,
        ur.user_Id,
        ur.testCreationTableId,
        s.subjectId,
        ur.sectionId,
        s.sectionName,
        ur.question_id,
        ur.user_answer,
        a.answer_text,
        m.marks_text,
        0 AS nmarks_text,
        s.QuestionLimit
    FROM
        user_responses ur
    JOIN answer a ON
        ur.question_id = a.question_id
    JOIN marks m ON
        ur.question_id = m.question_id
    JOIN sections s ON
        ur.sectionId = s.sectionId
    WHERE
        TRIM(ur.user_answer) = TRIM(a.answer_text) AND ur.user_Id = 2 AND ur.testCreationTableId = 3 AND s.QuestionLimit IS NOT NULL AND s.QuestionLimit > 0
    LIMIT 25
)
UNION
    (
    SELECT
        ur.user_Sno,
        ur.user_Id,
        ur.testCreationTableId,
        s.subjectId,
        ur.sectionId,
        s.sectionName,
        ur.question_id,
        ur.user_answer,
        a.answer_text,
        0 AS marks_text,
        m.nmarks_text,
        s.QuestionLimit
    FROM
        user_responses ur
    JOIN answer a ON
        ur.question_id = a.question_id
    JOIN marks m ON
        ur.question_id = m.question_id
    JOIN sections s ON
        ur.sectionId = s.sectionId
    WHERE
        TRIM(ur.user_answer) != TRIM(a.answer_text) AND ur.user_Id = 2 AND ur.testCreationTableId = 3 AND s.QuestionLimit IS NOT NULL AND s.QuestionLimit > 0
    LIMIT 25
);
      `,
      [user_Id, testCreationTableId, user_Id, testCreationTableId, user_Id, testCreationTableId, user_Id, testCreationTableId]
    );
 
 // Initialize an object to hold subject-wise scores for sections with question limits
 let subjectScoresWithLimit = {};
 
 // Initialize an object to hold subject-wise scores for sections without question limits
 let subjectScoresWithoutLimit = {};
 
 // Iterate over the results and calculate subject-wise scores
 results.forEach((row) => {
     const { subjectId, marks_text, nmarks_text, QuestionLimit } = row;
 
     // Check if the section has a question limit
     if (QuestionLimit !== null && QuestionLimit > 0) {
         // If subjectId doesn't exist in subjectScoresWithLimit, initialize it
         if (!subjectScoresWithLimit[subjectId]) {
             subjectScoresWithLimit[subjectId] = {
                 totalMarks: 0,
                 netMarks: 0,
                 correctAnswersCount: 0,
                 questionLimit: 0
             };
         }
 
         // Update subject-wise scores for sections with question limits
         if (subjectScoresWithLimit[subjectId].correctAnswersCount < QuestionLimit) {
             subjectScoresWithLimit[subjectId].totalMarks += marks_text;
             subjectScoresWithLimit[subjectId].netMarks += marks_text - nmarks_text;
             subjectScoresWithLimit[subjectId].correctAnswersCount++;
         }
 
         // Set the question limit (assuming it's the same for all rows)
         subjectScoresWithLimit[subjectId].questionLimit = QuestionLimit;
     } else {
         // If the section does not have a question limit
         // If subjectId doesn't exist in subjectScoresWithoutLimit, initialize it
         if (!subjectScoresWithoutLimit[subjectId]) {
             subjectScoresWithoutLimit[subjectId] = {
                 totalMarks: 0,
                 netMarks: 0,
                 correctAnswersCount: 0
             };
         }
 
         // Update subject-wise scores for sections without question limits
         subjectScoresWithoutLimit[subjectId].totalMarks += marks_text;
         subjectScoresWithoutLimit[subjectId].netMarks += marks_text - nmarks_text;
         subjectScoresWithoutLimit[subjectId].correctAnswersCount++;
     }
 });
 
 // Calculate overall total and net marks
 let overallTotalMarks = 0;
 let overallNetMarks = 0;
 
 // Calculate total and net marks for sections with question limits
 Object.values(subjectScoresWithLimit).forEach((subjectScore) => {
     overallTotalMarks += subjectScore.totalMarks;
     overallNetMarks += subjectScore.netMarks;
 });
 
 // Calculate total and net marks for sections without question limits
 Object.values(subjectScoresWithoutLimit).forEach((subjectScore) => {
     overallTotalMarks += subjectScore.totalMarks;
     overallNetMarks += subjectScore.netMarks;
 });
 
 // Ensure object properties are defined before iterating
 const subjectsArray = [];
 
//  // Iterate over subjectScoresWithLimit and subjectScoresWithoutLimit
//  Object.entries(subjectScoresWithLimit).forEach(([subjectId, scores]) => {
//      subjectsArray.push({
//          subjectId,
//          sections: [{ sectionName: scores.sectionName, scores }]
//      });
//  });
 
//  Object.entries(subjectScoresWithoutLimit).forEach(([subjectId, scores]) => {
//      subjectsArray.push({
//          subjectId,
//          sections: [{ sectionName: scores.sectionName, scores }]
//      });
//  });
 
 
// Ensure object properties are defined before iterating
// const subjectsArray = [];
 
// Iterate over subjectScoresWithLimit and subjectScoresWithoutLimit
Object.entries(subjectScoresWithLimit).forEach(([subjectId, scores]) => {
    const { sectionId, sectionName } = scores; // Destructuring sectionId and sectionName from scores
    subjectsArray.push({
        subjectId,
        sections: [{ sectionId, sectionName, scores }] // Include both sectionId and sectionName here
    });
});
 
Object.entries(subjectScoresWithoutLimit).forEach(([subjectId, scores]) => {
    const { sectionId, sectionName } = scores; // Destructuring sectionId and sectionName from scores
    subjectsArray.push({
        subjectId,
        sections: [{ sectionId, sectionName, scores }] // Include both sectionId and sectionName here
    });
});
 
 
 
 // Output the result
 res.json({
     overallTotalMarks,
     overallNetMarks,
     subjects: subjectsArray
 });
 
 
  } catch (error) {
    console.error("Error fetching scores:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.post("/response", async (req, res) => {
  try {
      console.log("Request Body:", req.body);
      const { userId,questionId, testCreationTableId, subjectId, sectionId } = req.body;
      console.log(`Response for question ${questionId} saved to the database`);

      // Validate data types
      const userIdNumber = parseInt(userId, 10);
      const testCreationTableIdNumber = parseInt(testCreationTableId, 10);
      const subjectIdNumber = parseInt(subjectId, 10);
      const sectionIdNumber = parseInt(sectionId, 10);

      if (isNaN(userIdNumber) || isNaN(testCreationTableIdNumber) || isNaN(subjectIdNumber) || isNaN(sectionIdNumber)) {
          console.error("Invalid integer value for userId, testCreationTableId, or questionId");
          return res.status(400).json({ success: false, message: "Invalid data types" });
      }

      const sql =
          "INSERT INTO user_responses (user_Id, testCreationTableId, subjectId, sectionId, question_id, user_answer,option_id) " +
          "VALUES (?, ?, ?, ?, ?, ?,?) ";

      const response = req.body[questionId];

      const questionIdNumber = parseInt(questionId, 10);

      if (isNaN(questionIdNumber)) {
          console.error(`Invalid integer value for questionId: ${questionId}`);
          return res.status(400).json({ success: false, message: "Invalid data types for questionId" });
      }

      const optionIndexes1 = response.optionIndexes1.join(",");
      const optionIndexes2 = response.optionIndexes2.join(",");
      
      const optionIndexes1CharCodes = response.optionIndexes1CharCodes.join(",");
      const optionIndexes2CharCodes = response.optionIndexes2CharCodes.join(",");
      const calculatorInputValue = response.calculatorInputValue;

      
      const queryValues = [
          userIdNumber,
          testCreationTableIdNumber,
          subjectIdNumber,
          sectionIdNumber,
          questionIdNumber,
          optionIndexes1CharCodes + optionIndexes2CharCodes + calculatorInputValue,
          optionIndexes1 + optionIndexes2,

      ];
      console.log("optionIndexes2---:", optionIndexes2);
      console.log("Executing SQL query:", sql, queryValues);

      try {
          const result = await db.query(sql, queryValues);

          if (!result) {
              console.error("Error saving response to the database");
              res.status(500).json({ success: false, message: "Internal server error" });
              return;
          }

          console.log(`Response for question ${questionIdNumber} saved to the database`);
          res.json({ success: true, message: "Response saved successfully" });
      } catch (dbError) {
          console.error("Database query error:", dbError);
          res.status(500).json({
              success: false,
              message: "Error saving response to the database",
              dbError: dbError.message,
          });
      }
  } catch (error) {
      console.error("Error handling the request:", error);
      res.status(500).json({ success: false, message: "Internal server error" });
  }
});



// router.post("/response", async (req, res) => {
//   try {
//     console.log("Request Body:", req.body);
//     const { questionId, userId, testCreationTableId, subjectId, sectionId } = req.body;
//     console.log(`Response for question ${questionId} saved to the database`);
 
//     // Validate data types
//     const userIdNumber = parseInt(userId, 10);
//     const testCreationTableIdNumber = parseInt(testCreationTableId, 10);
//     const subjectIdNumber = parseInt(subjectId, 10);
//     const sectionIdNumber = parseInt(sectionId, 10);
 
//     if (isNaN(userIdNumber) || isNaN(testCreationTableIdNumber) || isNaN(subjectIdNumber) || isNaN(sectionIdNumber)) {
//       console.error("Invalid integer value for userId, testCreationTableId, or questionId");
//       return res.status(400).json({ success: false, message: "Invalid data types" });
//     }

//     const sql =
//     "INSERT INTO user_responses (user_Id, testCreationTableId, subjectId, sectionId, question_id, user_answer) " +
//     "VALUES (?, ?, ?, ?, ?, ?) " +
//     "ON DUPLICATE KEY UPDATE user_answer = IF(VALUES(user_answer) <> '', VALUES(user_answer), user_answer)";
  

//     // const sql =
//     //   "INSERT INTO user_responses (user_Id, testCreationTableId, subject_id,section_id, question_id, user_answer) VALUES (?, ?, ?, ?, ?, ?)";
 
//     const response = req.body[questionId];
 
//     const questionIdNumber = parseInt(questionId, 10);
 
//     if (isNaN(questionIdNumber)) {
//       console.error(`Invalid integer value for questionId: ${questionId}`);
//       return res.status(400).json({ success: false, message: "Invalid data types for questionId" });
//     }
 
//     const optionIndexes1 = response.optionIndexes1;
//     const optionIndexes2 = response.optionIndexes2.join(",");
//     const calculatorInputValue = response.calculatorInputValue;
 
//     const queryValues = [
//       userIdNumber,
//       testCreationTableIdNumber,
//       subjectIdNumber,
//       sectionIdNumber,
//       questionIdNumber,
//       optionIndexes1 + optionIndexes2 + " " + calculatorInputValue,
//     ];
 
//     console.log("Executing SQL query:", sql, queryValues);
 
//     try {
//       const result = await db.query(sql, queryValues);
 
//       if (!result) {
//         console.error("Error saving response to the database");
//         res.status(500).json({ success: false, message: "Internal server error" });
//         return;
//       }
 
//       console.log(`Response for question ${questionIdNumber} saved to the database`);
//       res.json({ success: true, message: "Response saved successfully" });
//     } catch (dbError) {
//       console.error("Database query error:", dbError);
//       res.status(500).json({
//         success: false,
//         message: "Error saving response to the database",
//         dbError: dbError.message,
//       });
//     }
//   } catch (error) {
//     console.error("Error handling the request:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });

// router.post("/response", async (req, res) => {
//   try {
//     const { responses, userId, testCreationTableId, subjectId, sectionId } = req.body;
//     console.log("Received data:", { responses, userId, testCreationTableId, subjectId, sectionId });

//     // Validate data types
//     const userIdNumber = parseInt(userId, 10);
//     const testCreationTableIdNumber = parseInt(testCreationTableId, 10);

//     if (isNaN(userIdNumber) || isNaN(testCreationTableIdNumber)) {
//       console.error("Invalid integer value for userId or testCreationTableId");
//       return res.status(400).json({ success: false, message: "Invalid data types" });
//     }

//     const sql =
//       "INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer) VALUES (?,?,?,?)";

//     const questionIds = Object.keys(responses);

//     for (const questionId of questionIds) {
//       const questionIdNumber = parseInt(questionId, 10);

//       if (isNaN(questionIdNumber)) {
//         console.error(`Invalid integer value for questionId: ${questionId}`);
//         continue; // Skip processing this iteration
//       }

//       const optionIndexes1 = responses[questionId].optionIndexes1.join(",");
//       const optionIndexes2 = responses[questionId].optionIndexes2.join(",");
//       const calculatorInputValue = responses[questionId].calculatorInputValue;

//       console.log(`Processing responses for question ${questionId}:`, {
//         userId: userIdNumber,
//         testCreationTableId: testCreationTableIdNumber,
//         question_id: questionIdNumber,
//         user_answer: optionIndexes1 + optionIndexes2 + " " + calculatorInputValue,
//       });

//       const queryValues = [
//         userIdNumber,
//         testCreationTableIdNumber,
//         questionIdNumber,
//         optionIndexes1 + optionIndexes2 + " " + calculatorInputValue,
//       ];

//       console.log("Executing SQL query:", sql, queryValues);

//       await new Promise((resolve, reject) => {
//         db.query(sql, queryValues, (err, result) => {
//           if (err) {
//             console.error("Error saving response to the database:", err);
//             reject(err);
//           } else {
//             console.log(`Response for question ${questionIdNumber} saved to the database`);
//             resolve(result);
//           }
//         });
//       });
//     }

//     res.json({ success: true, message: "Responses saved successfully" });
//   } catch (error) {
//     console.error("Error handling the request:", error);
//     res.status(500).json({ success: false, message: "Internal server error" });
//   }
// });


router.put('/updateResponse/:user_Id/:testCreationTableId/:question_id', async (req, res) => {
  try {
    const { user_Id, testCreationTableId, question_id } = req.params;

    const userIdNumber = parseInt(user_Id, 10);
    const testCreationTableIdNumber = parseInt(testCreationTableId, 10);
    const questionId = parseInt(question_id, 10);

    if (isNaN(userIdNumber) || isNaN(testCreationTableIdNumber) || isNaN(questionId)) {
      console.error("Invalid integer value for user_Id, testCreationTableId, or question_id");
      return res.status(400).json({ success: false, message: "Invalid data types" });
    }

    const optionIndexes1 = req.body.updatedResponse.optionIndexes1.join(",");
    const optionIndexes2 = req.body.updatedResponse.optionIndexes2.join(",");
    const calculatorInputValue = req.body.updatedResponse.calculatorInputValue;

    // Check if the record exists
    const recordExistsQuery = `
      SELECT * FROM user_responses
      WHERE user_Id = ? AND testCreationTableId = ? AND question_id = ?
    `;

    const recordExistsValues = [userIdNumber, testCreationTableIdNumber, questionId];

    const recordExists = await new Promise((resolve, reject) => {
      db.query(recordExistsQuery, recordExistsValues, (err, result) => {
        if (err) {
          console.error("Error checking if record exists:", err);
          reject(err);
        } else {
          resolve(result.length > 0);
        }
      });
    });

    if (recordExists) {
      // Update the existing record
      const updateQuery = `
        UPDATE user_responses
        SET user_answer = CONCAT(?, ',', ?, ' ', ?)
        WHERE user_Id = ? AND testCreationTableId = ? AND question_id = ?
      `;

      const updateValues = [
        optionIndexes1,
        optionIndexes2,
        calculatorInputValue,
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
            res.json({ success: true, message: "Response updated successfully" });
            resolve(result);
          }
        });
      });
    } else {
      // Insert a new record since it doesn't exist
      const insertQuery = `
        INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer)
        VALUES (?, ?, ?, CONCAT(?, ',', ?, ' ', ?))
      `;

      const insertValues = [
        userIdNumber,
        testCreationTableIdNumber,
        questionId,
        optionIndexes1,
        optionIndexes2,
        calculatorInputValue
      ];

      await new Promise((resolve, reject) => {
        db.query(insertQuery, insertValues, (err, result) => {
          if (err) {
            console.error("Error inserting new response in the database:", err);
            reject(err);
          } else {
            console.log(`New response for question ${questionId} inserted in the database`);
            res.json({ success: true, message: "Response inserted successfully" });
            resolve(result);
          }
        });
      });
    }
  } catch (error) {
    console.error("Error handling update request:", error);
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

    const optionIndexes1 = req.body.updatedResponse.optionIndexes1.join(",");
    const optionIndexes2 = req.body.updatedResponse.optionIndexes2.join(",");
    const calculatorInputValue = req.body.updatedResponse.calculatorInputValue;

    const updateQuery = `
      UPDATE user_responses
      SET user_answer = CONCAT(?, ',', ?, ' ', ?)
      WHERE user_Id = ? AND testCreationTableId = ? AND question_id = ?
    `;

    const updateValues = [
      optionIndexes1,
      optionIndexes2,
      calculatorInputValue,
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
          if (result.affectedRows > 0) {
            console.log(`Response for question ${questionId} updated in the database`);
            res.json({ success: true, message: "Response updated successfully" });
          } else {
            // If no rows were affected, it means the specified combination of
            // user_Id, testCreationTableId, and question_id was not found.
            // You might want to consider inserting a new record in this case.
            res.status(404).json({ success: false, message: "Response not found" });
          }
          resolve(result);
        }
      });
    });
  } catch (error) {
    console.error("Error handling update request:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
});
// UPDATE user_responses
//       SET user_answer = CONCAT(?, ',', ?, ' ', ?)
//       WHERE user_Id = ? AND testCreationTableId = ? AND question_id = ?


// router.put('/updateResponse/:questionId', async (req, res) => {
//   try {
//     const questionId = parseInt(req.params.questionId, 10);
//     const { updatedResponse, userId, testCreationTableId } = req.body;

//     if (
//       updatedResponse &&
//       updatedResponse.optionIndexes1 &&
//       updatedResponse.optionIndexes2
//     ) {
//       const userAnswer1 = updatedResponse.optionIndexes1;
//       const userAnswer2 = updatedResponse.optionIndexes2.join(',');

//       const sql = 'UPDATE user_responses SET user_answer = ? WHERE question_id = ?';

//       db.query(sql, [userAnswer1 + userAnswer2, questionId], (err, result) => {
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

router.put('/updateResponse/:questionId', async (req, res) => {
  try {
    const questionId = parseInt(req.params.questionId, 10);
    const { updatedResponse, userId, testCreationTableId } = req.body;

    if (
      updatedResponse &&
      (updatedResponse.optionIndexes1 || updatedResponse.optionIndexes2)
    ) {
      let userAnswer = '';
     

      if (updatedResponse.optionIndexes1) {
        userAnswer += updatedResponse.optionIndexes1.join('');
      }

      if (updatedResponse.optionIndexes2) {
        userAnswer += updatedResponse.optionIndexes2.join(',');
      }

      if (updatedResponse.calculatorInputValue) {
        userAnswer += updatedResponse.calculatorInputValue;
      }

      const sql = 'UPDATE user_responses SET user_answer = ? WHERE question_id = ?';

      db.query(sql, [userAnswer, questionId], (err, result) => {
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


// router.get("/answer", async (req, res) => {
//   try {
//     // const { questionId } = req.params;
//     const [results] = await db.query(`
//     SELECT question_id,answer_text FROM answer;
//     `);

//     res.json(results);
//   } catch (error) {
//     console.error("Error:", error.message);
//     res.status(500).send("Internal Server Error");
//   }
// });

router.get("/answer", async (req, res) => {
  try {
    // const { questionId } = req.params;
    const [results] = await db.query(`
SELECT a.question_id, a.answer_text, ur.user_answer, TRIM(COALESCE(ur.user_answer, '--')) AS trimmed_user_answer, TRIM(a.answer_text) AS trimmed_answer_text, LENGTH(TRIM(COALESCE(ur.user_answer, '--'))) AS user_answer_length, LENGTH(TRIM(a.answer_text)) AS answer_text_length, CASE WHEN TRIM(BINARY ur.user_answer) = TRIM(BINARY a.answer_text) AND ur.user_answer IS NOT NULL AND ur.user_answer != '' THEN 'correct' WHEN ur.user_answer IS NULL THEN 'N/A' ELSE 'incorrect' END AS status FROM answer a LEFT JOIN user_responses ur ON a.question_id = ur.question_id;



    `);

    res.json(results);
  } catch (error) {
    console.error("Error:", error.message);
    res.status(500).send("Internal Server Error");
  }
});


router.get("/questionCount", async (req, res) => {
  const { testCreationTableId, subjectId, sectionId } = req.params;
  try {
    const [results, fields] = await db.execute(
      `SELECT t.testCreationTableId, COUNT(q.question_id) AS total_question_count 
      FROM 
      test_creation_table t 
      LEFT JOIN questions q ON t.testCreationTableId = q.testCreationTableId 
      WHERE t.testCreationTableId = 2;`
    );
    res.json(results);
  } catch (error) {
    console.error("Error fetching course count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});
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

router.get("/correctAnswers/:testCreationTableId/:user_Id",
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

router.get("/incorrectAnswers/:testCreationTableId/:user_Id",
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
//main
// router.get("/score/:testCreationTableId/:user_Id",
//   async (req, res) => {
//     const { testCreationTableId, user_Id } = req.params;

//     try {
//       if (!testCreationTableId || !user_Id) {
//         // Check if any of the required parameters is missing
//         return res.status(400).json({ error: "Missing required parameters" });
//       }

//       const [results, fields] = await db.execute(
//         `SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             m.marks_text,
//             0 AS nmarks_text
//         FROM
//             user_responses ur
//         JOIN
//             answer a ON ur.question_id = a.question_id
//         JOIN
//             marks m ON ur.question_id = m.question_id
//         WHERE
//             TRIM(ur.user_answer) = TRIM(a.answer_text)
//             AND ur.user_Id = ?
//             AND ur.testCreationTableId = ?
        
//         UNION
        
//         SELECT
//             ur.user_Sno,
//             ur.user_Id,
//             ur.testCreationTableId,
//             ur.question_id,
//             ur.user_answer,
//             a.answer_text,
//             0 AS marks_text,
//             m.nmarks_text
//         FROM
//             user_responses ur
//         JOIN
//             answer a ON ur.question_id = a.question_id
//         JOIN
//             marks m ON ur.question_id = m.question_id
//         WHERE
//             TRIM(ur.user_answer) != TRIM(a.answer_text)
//             AND ur.user_Id = ?
//             AND ur.testCreationTableId = ?;
//     `,
//         [user_Id, testCreationTableId, user_Id, testCreationTableId]
//       );

//       // Calculate total marks and net marks
//       let totalMarks = 0;
//       let netMarks = 0;

//       results.forEach((row) => {
//         totalMarks += row.marks_text;
//         netMarks += row.marks_text - row.nmarks_text;
//       });

//       const score = {
//         totalMarks,
//         netMarks,
//       };

//       res.json(score);
//     } catch (error) {
//       console.error("Error fetching scores:", error);
//       res.status(500).json({ error: "Internal Server Error" });
//     }
//   }
// );




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




// Example route to get test details and responses
router.get("/getTestDetails/:userId/:testCreationTableId", async (req, res) => {
  const { userId, testCreationTableId } = req.params;

  try {
    // Fetch test details and responses from the database based on userId and testCreationTableId
    // Replace the following with your actual database queries
    const testDetails = await fetchTestDetails(userId, testCreationTableId);
    const userResponses = await fetchUserResponses(userId, testCreationTableId);

    res.json({ testDetails, userResponses });
  } catch (error) {
    console.error("Error fetching test details and responses:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

module.exports = router;
