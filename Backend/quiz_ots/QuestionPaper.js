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
  //     SELECT 
  //     q.question_id, 
  //     q.questionImgName, 
  //     o.option_id, 
  //     o.optionImgName,
  //     o.option_index,
  //     qt.qtypeId,
  //     qt.qtype_text,
  //     t.testCreationTableId,
  //     doc.document_Id,
  //     doc.documen_name
  // FROM 
  //     questions q 
  // LEFT OUTER JOIN test_creation_table t ON 
  //     q.testCreationTableId = t.testCreationTableId 
  // LEFT OUTER JOIN ots_document doc ON 
  //     t.testCreationTableId = doc.testCreationTableId
  // LEFT OUTER JOIN options o ON 
  //     q.question_id = o.question_id
  // LEFT OUTER JOIN qtype qt ON 
  //     q.question_id = qt.question_id 
  // WHERE 
  //     t.testCreationTableId = ?

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
<<<<<<< HEAD
      
=======
=======

  SELECT 
  q.question_id, 
  q.questionImgName, 
  o.option_id, 
  o.optionImgName,
  o.option_index,
  t.testCreationTableId,
  doc.document_Id,
  doc.documen_name
FROM 
  questions q 
LEFT OUTER JOIN test_creation_table t ON 
  q.testCreationTableId = t.testCreationTableId 
LEFT OUTER JOIN ots_document doc ON 
  t.testCreationTableId = doc.testCreationTableId
LEFT OUTER JOIN options o ON 
  q.question_id = o.question_id
WHERE 
<<<<<<< HEAD
  t.testCreationTableId = ?
=======
  t.testCreationTableId = 1
>>>>>>> af5e2497ef815012e7d9309cf6a14b8e36a9e6a7
>>>>>>> 684be6ba9059143531d9d88c155a17e77452e2b5
>>>>>>> 53dd6ff8bf36e562abc36c4d27b58187d5dc0144
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
  










  
// router.get('/fulldocimages/:testCreationTableId/:subjectId/:sectionId', async (req, res) => {
//   const { testCreationTableId, subjectId, sectionId } = req.params;
//   try {
//     const [rows] = await db.query(`
//       SELECT 
//         q.question_id, q.questionImgName, 
//         o.option_id, o.optionImgName,o.option_index,
//         s.solution_id, s.solutionImgName, 
//         qt.qtypeId,qt.qtype_text,
//         ans.answer_id,ans.answer_text,
//         m.markesId ,m.marks_text,
//         si.sort_id ,si.sortid_text,
//         doc.documen_name, doc.sectionId, 
//         doc.subjectId, doc.testCreationTableId 
//       FROM 
//         questions q 
//         LEFT OUTER JOIN options o ON q.question_id = o.question_id
//         LEFT OUTER JOIN qtype qt ON q.question_id = qt.question_id 
//         LEFT OUTER JOIN answer ans ON q.question_id = ans.question_id 
//         LEFT OUTER JOIN marks m ON q.question_id = m.question_id 
//         LEFT OUTER JOIN sortid si ON q.question_id = si.question_id 
//         LEFT OUTER JOIN solution s ON q.question_id = s.question_id 
//         LEFT OUTER JOIN ots_document doc ON q.testCreationTableId = doc.testCreationTableId 
//       WHERE 
//         doc.testCreationTableId = ? AND doc.subjectId = ? AND doc.sectionId = ?;
//     `, [testCreationTableId, subjectId, sectionId]);

//     // Check if rows is not empty
//     if (rows.length > 0) {
//       const questionData = {
//         questions: [],
//       };

//       // Organize data into an array of questions
//       rows.forEach(row => {
//         const existingQuestion = questionData.questions.find(q => q.question_id === row.question_id);

//         if (existingQuestion) {
//           // Question already exists, add option to the existing question
//           existingQuestion.options.push({
//             option_id: row.option_id,
//             option_index:row.option_index,
//             optionImgName: row.optionImgName,
//           });
//         } else {
//           // Question doesn't exist, create a new question
//           const newQuestion = {
//             question_id: row.question_id,
//             questionImgName: row.questionImgName,
//             documen_name: row.documen_name,
//             options: [
//               {
//                 option_id: row.option_id,
//                 optionImgName: row.optionImgName,
//               },
//             ],
//             solution: {
//               solution_id: row.solution_id,
//               solutionImgName: row.solutionImgName,
//             },
//             qtype:{
//               qtypeId:row.qtypeId,
//               qtype_text:row.qtype_text,
//             },
//             answer:{
//               answer_id :row.answer_id ,
//               answer_text:row.answer_text,
//             },
//             marks:{
//               markesId:row.markesId,
//               marks_text:row.marks_text,
//             },
//             sortid:{
//               sort_id:row.sort_id,
//               sortid_text:row.sortid_text
//             }
//           };

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















  // router.get("/questions/:testCreationTableId", async (req, res) => {
  //   try {
  //     const { testCreationTableId } = req.params;
  
  //     // Execute the SQL query
  //     const [rows] = await db.query(`
  //       SELECT
  //         q.question_id,
  //         q.questionImgName,
  //         o.option_id,
  //         o.optionImgName,
  //         qt.qtypeId,
  //         qt.qtype_text,
  //         q.testCreationTableId
  //       FROM
  //         questions q
  //       JOIN options o ON
  //         q.question_id = o.question_id
  //       JOIN qtype qt ON
  //         q.question_id = qt.question_id
  //       WHERE
  //         q.testCreationTableId = ?;
  //     `, [testCreationTableId]);
  
  //     // Send the result as JSON response
  //     res.json(rows);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });
  // router.get('/questions/:testCreationTableId', async (req, res) => {
  //   try {
  //     const testCreationTableId = req.params.testCreationTableId;
  //     const [results] = await db.query(`
  //     SELECT
  //       q.question_id,
  //       q.questionImgName,
  //       o.option_id,
  //       o.optionImgName,
  //       qt.qtypeId,
  //       qt.qtype_text,
  //       q.testCreationTableId
  //     FROM
  //       questions q
  //     JOIN options o ON
  //       q.question_id = o.question_id
  //     JOIN qtype qt ON
  //       q.question_id = qt.question_id
  //     WHERE
  //       q.testCreationTableId = ?;
  //     `, [testCreationTableId]);
  
  //     res.json(results);
  
  //   } catch (error) {
  //     console.error('Error:', error.message);
  //     res.status(500).send('Internal Server Error');
  //   }
  // });



  // router.get('/questions/:testCreationTableId', (req, res) => {
  //   const testCreationTableId = req.params.testCreationTableId;
  
  //   const sql = `
  //     SELECT
  //       q.question_id,
  //       q.questionImgName,
  //       o.option_id,
  //       o.optionImgName,
  //       qt.qtypeId,
  //       qt.qtype_text,
  //       q.testCreationTableId
  //     FROM
  //       questions q
  //     LEFT OUTER JOIN options o ON
  //       q.question_id = o.question_id
  //     LEFT OUTER JOIN qtype qt ON
  //       q.question_id = qt.question_id
  //     WHERE
  //       q.testCreationTableId = ?;
  //   `;
  
  //   db.query(sql, [testCreationTableId], (err, results) => {
  //     if (err) {
  //       res.status(500).json({ error: 'Internal Server Error' });
  //       throw err;
  //     }
  
  //     res.json(results);
  //   });
  // });
  

  // router.get('/questionOptions/:testCreationTableId', async (req, res) => {
  //   const { testCreationTableId } = req.params;
  
  //   try {
  //     const [rows] = await db.query(`
  //       SELECT
  //         q.question_id,
  //         q.questionImgName,
  //         o.option_id,
  //         o.optionImgName,
  //         qt.qtypeId,
  //         qt.qtype_text,
  //         q.testCreationTableId
  //       FROM
  //         questions q
  //       LEFT OUTER JOIN options o ON
  //         q.question_id = o.question_id
  //       LEFT OUTER JOIN qtype qt ON
  //         q.question_id = qt.question_id
  //       WHERE
  //         q.testCreationTableId = ?;
  //     `, [testCreationTableId]);
  
  //     // Check if rows is not empty
  //     if (rows.length > 0) {
  //       const questionData = {
  //         questions: [],
  //       };
  
  //       // Organize data into an array of questions
  //       rows.forEach(row => {
  //         const existingQuestion = questionData.questions.find(q => q.question_id === row.question_id);
  
  //         if (existingQuestion) {
  //           // Question already exists, add option to the existing question
  //           existingQuestion.options.push({
  //             option_id: row.option_id,
  //             optionImgName: row.optionImgName,
  //           });
  //         } else {
  //           // Question doesn't exist, create a new question
  //           const newQuestion = {
  //             question_id: row.question_id,
  //             questionImgName: row.questionImgName,
  //             options: [
  //               {
  //                 option_id: row.option_id,
  //                 optionImgName: row.optionImgName,
  //               },
  //             ],
  //             qtype: {
  //               qtypeId: row.qtypeId,
  //               qtype_text: row.qtype_text,
  //             },
  //           };
  
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
  
  
 

  // router.get('/questionOptions/:testCreationTableId', async (req, res) => {
  //   const { testCreationTableId } = req.params;
  //   try {
  //     const [rows] = await db.query(`
  //     SELECT
  //     q.question_id,
  //     q.questionImgName,
  //     o.option_id,
  //     o.optionImgName,
  //     qt.qtypeId,
  //     qt.qtype_text,
  //     q.testCreationTableId
  // FROM
  //     questions q
  // LEFT OUTER JOIN OPTIONS o ON
  //     q.question_id = o.question_id
  // LEFT OUTER JOIN qtype qt ON
  //     q.question_id = qt.question_id
  // WHERE
  //     q.testCreationTableId = ? ;
  //     `, [testCreationTableId]);
  
  //     // Check if rows is not empty
  //     if (rows.length > 0) {
  //       const questionData = {
  //         questions: [],
  //       };
  
  //       // Organize data into an array of questions
  //       rows.forEach(row => {
  //         const existingQuestion = questionData.questions.find(q => q.question_id === row.question_id);
  
  //         if (existingQuestion) {
  //           // Question already exists, add option to the existing question
  //           existingQuestion.options.push({
  //             option_id: row.option_id,
  //             // option_index:row.option_index,
  //             optionImgName: row.optionImgName,
  //           });
  //         } else {
  //           // Question doesn't exist, create a new question
  //           const newQuestion = {
  //             question_id: row.question_id,
  //             questionImgName: row.questionImgName,
             
  //             options: [
  //               {
  //                 option_id: row.option_id,
  //                 optionImgName: row.optionImgName,
  //               },
  //             ],
            
  //             qtype:{
  //               qtypeId:row.qtypeId,
  //               qtype_text:row.qtype_text,
  //             },
  //           };
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
  









  //old one
  // router.get("/getPaperData/:testCreationTableId", async (req, res) => {
  //   try {
  //     // const subjectId = req.params.subjectId;
  //     const testCreationTableId = req.params.testCreationTableId;
   
  //     // Fetch data from testCreationTableId table
  //     const testData = await getDataByTestCreationTableId(testCreationTableId);
   
  //     // Fetch question data based on subjectId and document_Id
  //     const questions = await getQuestionsBySubjectAndDocumentId( testCreationTableId);
   
  //     // Fetch option data based on questions and document_Id
  //     const options = await getOptionsByQuestionsAndDocumentId(questions, testCreationTableId);
   
  //     // Fetch solution data based on questions and document_Id
  //     const solutions = await getSolutionsByQuestionsAndDocumentId(questions, testCreationTableId);
   
  //     res.json({
  //       testData,
  //       questions,
  //       options,
  //       solutions,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Error fetching data from the database.');
  //   }
  // });
  // // Reusable function to get data from testCreationTableId table
  // async function getDataByTestCreationTableId(testCreationTableId) {
  //   try {
  //     const query = `
  //       SELECT *
  //       FROM test_creation_table
  //       WHERE testCreationTableId = ?  
  //     `;
  //     const [results] = await db.query(query, [testCreationTableId]);
   
  //     return results; // Adjust this based on your actual table structure
  //   } catch (err) {
  //     console.error(`Error fetching data from test_creation_table: ${err}`);
  //     throw err;
  //   }
  // }
   
   
  // // Reusable function to get questions data based on subjectId and document_Id
  // async function getQuestionsBySubjectAndDocumentId( testCreationTableId) {
  //   try {
  //     const query = `
  //       SELECT question_id, question_img,testCreationTableId
  //       FROM questions
  //       WHERE testCreationTableId = ?  
  //     `;
  //     const [results] = await db.query(query, [ testCreationTableId]);
  //     const optionsWithBase64 = results.map(option => ({
  //       question_id: option.question_id,
  //       question_img: option.question_img.toString('base64'),
  //     }));
  //     return optionsWithBase64;
  //   } catch (err) {
  //     console.error(`Error fetching questions: ${err}`);
  //     throw err;
  //   }
  // }
   
  // // Reusable function to get options data based on questions and document_Id
  // async function getOptionsByQuestionsAndDocumentId(questions, testCreationTableId) {
  //   try {
  //     const questionIds = questions.map(question => question.question_id);
  //     const query = `
  //     SELECT question_id,option_index, option_img
  //     FROM options
  //     WHERE question_id IN (?)
  //     `;
  //     const [results] = await db.query(query, [questionIds, testCreationTableId]);
   
  //     // Convert BLOB data to base64 for sending in the response
  //     const optionsWithBase64 = results.map(option => ({
  //       question_id: option.question_id,
  //       option_img: option.option_img.toString('base64'),
  //     }));
   
  //     return optionsWithBase64;
  //   } catch (err) {
  //     console.error(`Error fetching options: ${err.message}`);
  //     throw err;
  //   }
  // }
   
   
  // // Reusable function to get solutions data based on questions and document_Id
  // async function getSolutionsByQuestionsAndDocumentId(questions, testCreationTableId) {
  //   try {
  //     const questionIds = questions.map(question => question.question_id);
  //     const query = `
  //       SELECT question_id, solution_img
  //       FROM solution
  //       WHERE question_id IN (?)
  //     `;
  //     const [results] = await db.query(query, [questionIds, testCreationTableId]);
   
  //     // Convert BLOB data to base64 for sending in the response
  //     const solutionsWithBase64 = results.map(solution => ({
  //       question_id: solution.question_id,
  //       solution_img: solution.solution_img.toString('base64'),
  //     }));
   
  //     return solutionsWithBase64;
  //   } catch (err) {
  //     console.error(`Error fetching solutions: ${err}`);
  //     throw err;
  //   }
  // }
   
  // function combineImage(questions, options, solutions) {
  //   const combinedImages = [];
   
  //   for (let i = 0; i < questions.length; i++) {
  //     const questionImage = questions[i].question_img;
  //     const optionImages = options
  //       .filter((opt) => opt.question_id === questions[i].question_id)
  //       .map((opt) => opt.option_img);
  //     const solutionImage = solutions.find(
  //       (sol) => sol.question_id === questions[i].question_id
  //     )?.solution_img;
   
  //     combinedImages.push({
  //       questionImage,
  //       optionImages,
  //       solutionImage,
  //     });
  //   }
   
  //   return combinedImages;
  // }
  
  
 
  
  
  
  // ----------------------------------------------------user reponses----------------------------------------------
  

  // router.post('/responses', async (req, res) => {
  //   try {
  //     const { userId, testCreationTableId, questionId, userAnswer } = req.body;
  
  //     // Replace 'your_table_name' with the actual table name for user responses
  //     const query = `
  //     INSERT INTO user_responses (user_Id,	testCreationTableId	,question_id, user_answer)
  //       VALUES ($1, $2, $3, $4)
  //     `;
  
  //     await pool.query(query, [userId, testCreationTableId, questionId, userAnswer]);
  
  //     res.status(200).json({ success: true, message: 'User response saved successfully' });
  //   } catch (error) {
  //     console.error('Error saving user response:', error);
  //     res.status(500).json({ success: false, message: 'Internal server error' });
  //   }
  // });

  // router.post('/response', (req, res) => {
  //   try {
  //     const { responses } = req.body;
  
  //     console.log('Received responses from client:', responses);
  
  //     // Assuming each response has a question_id property
  //     const sql = 'INSERT INTO user_responses (user_Id,	testCreationTableId	,question_id, user_answer) VALUES (?,?,?,?)';
  
  //     // Assuming responses is an object where keys are question_ids
  //     for (const userId in responses) {
  //       const userIdNumber = parseInt(userId, 10);
  
  //       if (responses[userId] && responses[userId].optionIndexes1 && responses[userId].optionIndexes2) {
  //         const userAnswer1 = responses[userId].optionIndexes1.join(',');
  //         const userAnswer2 = responses[userId].optionIndexes2.join(',');
  
  //         console.log(`Processing responses for question ${userId}:`, {
  //           userId: userIdNumber,
  //           userAnswer1,
  //           userAnswer2,
  //         });
  
  //         console.log('Executing SQL query:', sql, [userIdNumber, userAnswer1 + ',' + userAnswer2]);
  
  //         db.query(sql, [userIdNumber, userAnswer1 +"  "+ userAnswer2], (err, result) => {
  //           if (err) {
  //             console.error('Error saving response to database:', err);
  //           } else {
  //             console.log(`Response for question ${userIdNumber} saved to database`);
  //           }
  //         });
  //       } else {
  //         console.error(`Invalid response data for question ${userId}`);
  //       }
  //     }
  
  //     res.json({ success: true, message: 'Responses saved successfully' });
  //   } catch (error) {
  //     console.error('Error handling the request:', error);
  //     res.status(500).json({ success: false, message: 'Internal server error' });
  //   }
  // });
 // In the router.post('/response', ...)
// router.post('/response', (req, res) => {
//   try {
//     const { responses, user_Id, testCreationTableId } = req.body; // Update userId to user_Id

//     // Assuming each response has a question_id property
//     const sql = 'INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer) VALUES (?,?,?,?)';

//     // Assuming responses is an object where keys are question_ids
//     for (const questionId in responses) {
//       const questionIdNumber = parseInt(questionId, 10);
//       const testCreationTableIdNumber = parseInt(testCreationTableId, 10);
//       const userIdNumber = parseInt(user_Id, 10);

     
//       if (responses[questionId] && responses[questionId].optionIndexes1 && responses[questionId].optionIndexes2) {
//         const user_answer = responses[questionId].optionIndexes1.join(',') + ',' + responses[questionId].optionIndexes2.join(',');

//         console.log(`Processing responses for question ${questionId}:`, {
//           user_Id: userIdNumber,
//           testCreationTableId: testCreationTableIdNumber,
//           question_id: questionIdNumber,
//           user_answer,
//         });

//         console.log('Executing SQL query:', sql, [userIdNumber, testCreationTableIdNumber, questionIdNumber, user_answer]);

//         db.query(sql, [userIdNumber, testCreationTableIdNumber, questionIdNumber, user_answer], (err, result) => {
//           if (err) {
//             console.error('Error saving response to the database:', err);
//           } else {
//             console.log(`Response for question ${questionIdNumber} saved to the database`);
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



// In the router.post('/response', ...)
router.post('/response', (req, res) => {
  try {
    const { responses, user_Id, testCreationTableId } = req.body;

    // Assuming each response has a question_id property
    const sql = 'INSERT INTO userquestionsquestions_responses (user_Id, testCreationTableId, question_id, user_answer) VALUES (?,?,?,?)';

    // Assuming responses is an object where keys are question_ids
    for (const questionId in responses) {
      const questionIdNumber = parseInt(questionId, 10);
      const testCreationTableIdNumber = parseInt(testCreationTableId, 10);
      const userIdNumber = parseInt(user_Id, 10);

      if (!isNaN(questionIdNumber) && !isNaN(testCreationTableIdNumber) && !isNaN(userIdNumber)) {
        if (responses[questionId] && responses[questionId].optionIndexes1 && responses[questionId].optionIndexes2) {
          const user_answer = responses[questionId].optionIndexes1.join(',') + ',' + responses[questionId].optionIndexes2.join(',');

          console.log(`Processing responses for question ${questionId}:`, {
            user_Id: userIdNumber,
            testCreationTableId: testCreationTableIdNumber,
            question_id: questionIdNumber,
            user_answer,
          });

          console.log('Executing SQL query:', sql, [userIdNumber, testCreationTableIdNumber, questionIdNumber, user_answer]);

          db.query(sql, [userIdNumber, testCreationTableIdNumber, questionIdNumber, user_answer], (err, result) => {
            if (err) {
              console.error('Error saving response to the database:', err);
            } else {
              console.log(`Response for question ${questionIdNumber} saved to the database`);
            }
          });
        } else {
          console.error(`Invalid response data for question ${questionId}`);
        }
      } else {
        console.error(`Invalid integer value for user_Id, testCreationTableId, or questionId`);
      }
    }

    res.json({ success: true, message: 'Responses saved successfully' });
  } catch (error) {
    console.error('Error handling the request:', error);
    res.status(500).json({ success: false, message: 'Internal server error' });
  }
});



// In the router.post('/response', ...)
// router.post('/response', (req, res) => {
//   try {
//     const { responses, user_Id, testCreationTableId } = req.body; // Update userId to user_Id

//     // Assuming each response has a question_id property
//     const sql = 'INSERT INTO user_responses (user_Id, testCreationTableId, question_id, user_answer) VALUES (?,?,?,?)';

//     // Assuming responses is an object where keys are question_ids
//     for (const questionId in responses) {
//       const questionIdNumber = parseInt(questionId, 10);

//       if (responses[questionId] && responses[questionId].optionIndexes1 && responses[questionId].optionIndexes2) {
//         const userAnswer = responses[questionId].optionIndexes1.join(',') + ',' + responses[questionId].optionIndexes2.join(',');

//         console.log(`Processing responses for question ${questionId}:`, {
//           user_Id,
//           testCreationTableId,
//           questionId: questionIdNumber,
//           userAnswer,
//         });

//         console.log('Executing SQL query:', sql, [user_Id, testCreationTableId, questionIdNumber, userAnswer]);

//         db.query(sql, [user_Id, testCreationTableId, questionIdNumber, userAnswer], (err, result) => {
//           if (err) {
//             console.error('Error saving response to the database:', err);
//           } else {
//             console.log(`Response for question ${questionIdNumber} saved to the database`);
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
