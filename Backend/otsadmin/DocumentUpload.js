const express = require('express');
const router = express.Router();
const db = require('../databases/db2');
// const dbHelper = require('../dbHelper');

const multer = require('multer');
const mammoth = require('mammoth');
const cheerio = require('cheerio');
const path = require('path');
const fs = require('fs').promises;


const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = 'uploads/';
    await fs.mkdir(uploadDir, { recursive: true });
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    // const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    // cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
    cb(null, Date.now() + path.extname(file.originalname));
    // cb(null, file.originalname);
  },
});

const upload = multer({ storage });

router.get('/tests', async (req, res) => {
    try {
        const [rows] = await db.query('SELECT testCreationTableId, TestName FROM test_creation_table');
        res.json(rows);
    } catch (error) {
        console.error('Error fetching test data:', error);
        res.status(500).send('Internal Server Error');
    }
  });
  
   
  router.get('/subjects/:testCreationTableId', async (req, res) => {
    const { testCreationTableId } = req.params;
   
    try {
      const [subjects] = await db.query(`
        SELECT s.subjectName,s.subjectId
        FROM test_creation_table tt
        INNER JOIN course_subjects AS cs ON tt.courseCreationId = cs.courseCreationId
        INNER JOIN subjects AS s ON cs.subjectId = s.subjectId
        WHERE tt.testCreationTableId = ?
      `, [testCreationTableId]);
   
      res.json(subjects);
    } catch (error) {
      console.error('Error fetching subjects:', error);
      res.status(500).send('Error fetching subjects.');
    }
  });
   
  router.get('/sections/:subjectId/:testCreationTableId', async (req, res) => {
    const { subjectId, testCreationTableId } = req.params;
    try {
      const [rows] = await db.query(
        'SELECT s.sectionName, s.sectionId, s.testCreationTableId, s.subjectId FROM sections s JOIN test_creation_table tt ON s.testCreationTableId = tt.testCreationTableId WHERE s.subjectId = ? AND s.testCreationTableId = ?',
        [subjectId, testCreationTableId]
      );
      res.json(rows);
    } catch (error) {
      console.error('Error fetching sections data:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  
  
  // doc upload code -----------------
  // router.post("/upload", upload.single("document"), async (req, res) => {
  //   const docxFilePath = `uploads/${req.file.filename}`;
  //   const outputDir = `uploads/${req.file.originalname}_images`;
  
  //   const docName = `${req.file.originalname}`;
  //   try {
  //     await fs.mkdir(outputDir, { recursive: true });
  //     const result = await mammoth.convertToHtml({ path: docxFilePath });
  //     const htmlContent = result.value;
  //     const $ = cheerio.load(htmlContent);
  //     const textResult = await mammoth.extractRawText({ path: docxFilePath });
  //     const textContent = textResult.value;
  //     const textSections = textContent.split("\n\n");
  
  //     // Insert documentName and get documentId
  //     const [documentResult] = await db.query("INSERT INTO ots_document SET ?", {
  //       documen_name: docName,
  //       testCreationTableId: req.body.testCreationTableId,
  //       subjectId: req.body.subjectId,
  //     });
  //     const document_Id = documentResult.insertId;
  
  //     // Get all images in the order they routerear in the HTML
  //     const images = [];
  //     $("img").each(function (i, element) {
  //       const base64Data = $(this)
  //         .attr("src")
  //         .replace(/^data:image\/\w+;base64,/, "");
  //       const imageBuffer = Buffer.from(base64Data, "base64");
  //       images.push(imageBuffer);
  //     });
  
  //     let j = 0;
  //     let Question_id;
  //     for (let i = 0; i < images.length; i++) {
  //       if (j == 0) {
  //         const questionRecord = {
  //           question_img: images[i],
  //           testCreationTableId: req.body.testCreationTableId,
  //           sectionId: req.body.sectionId,
  //           document_Id: document_Id,
  //           subjectId: req.body.subjectId,
  //         };
  //         console.log(j);
  //         Question_id = await insertRecord("questions", questionRecord);
  //         j++;
  //       } else if (j > 0 && j < 5) {
  //         const optionRecord = {
  //           option_img: images[i],
  //           question_id: Question_id,
  //         };
  //         console.log(j);
  //         await insertRecord("options", optionRecord);
  //         j++;
  //       } else if (j == 5) {
  //         const solutionRecord = {
  //           solution_img: images[i],
  //           question_id: Question_id,
  //         };
  //         console.log(j);
  //         await insertRecord("solution", solutionRecord);
  //         j = 0;
  //       }
  //     }
  //     res.send(
  //       "Text content and images extracted and saved to the database with the selected topic ID successfully."
  //     );
  //   } catch (error) {
  //     console.error(error);
  //     res
  //       .status(500)
  //       .send("Error extracting content and saving it to the database.");
  //   }
  // });
  
  router.post("/upload", upload.single("document"), async (req, res) => {
    const docxFilePath = `uploads/${req.file.filename}`;
    const outputDir = `uploads/${req.file.originalname}_images`;
  
    const docName = `${req.file.originalname}`;
    try {
      // Check if a document with the same name already exists
      const [existingDoc] = await db.query(
        "SELECT document_Id FROM ots_document WHERE documen_name = ?",
        [docName]
      );
    
      if (existingDoc.length > 0) {
        return res.status(409).send("Document with the same name already exists.");
      }
    
      let existingTestSubjectDoc;
    
      // Check if a section is specified
      if (req.body.sectionId) {
        // Check if a document with the same test, subject, and section already exists
        [existingTestSubjectDoc] = await db.query(
          "SELECT document_Id FROM ots_document WHERE testCreationTableId = ? AND subjectId = ? AND sectionId = ?",
          [req.body.testCreationTableId, req.body.subjectId, req.body.sectionId]
        );
      } else {
        // Check if a document with the same test and subject already exists
        [existingTestSubjectDoc] = await db.query(
          "SELECT document_Id FROM ots_document WHERE testCreationTableId = ? AND subjectId = ? AND sectionId IS NULL",
          [req.body.testCreationTableId, req.body.subjectId]
        );
      }
    
      if (existingTestSubjectDoc.length > 0) {
        return res.status(409).send("Document with the same test, subject, and section already exists.");
      }
      await fs.mkdir(outputDir, { recursive: true });
          const result = await mammoth.convertToHtml({ path: docxFilePath });
          const htmlContent = result.value;
          const $ = cheerio.load(htmlContent);
          const textResult = await mammoth.extractRawText({ path: docxFilePath });
          const textContent = textResult.value;
          const textSections = textContent.split("\n\n");
      
          // Insert documentName and get documentId
          const [documentResult] = await db.query("INSERT INTO ots_document SET ?", {
            documen_name: docName,
            testCreationTableId: req.body.testCreationTableId,
            subjectId: req.body.subjectId,
            sectionId:req.body.sectionId
          });
          const document_Id = documentResult.insertId;
      
          // Get all images in the order they routerear in the HTML
          const images = [];
          $("img").each(function (i, element) {
            const base64Data = $(this)
              .attr("src")
              .replace(/^data:image\/\w+;base64,/, "");
            const imageBuffer = Buffer.from(base64Data, "base64");
            images.push(imageBuffer);
          });
      
          let j = 0;
          let Question_id;
          let question_id=[];
          for (let i = 0; i < images.length; i++) {
            if (j == 0) {
              const questionRecord = {
                question_img: images[i],
                testCreationTableId: req.body.testCreationTableId,
                sectionId: req.body.sectionId,
                document_Id: document_Id,
                subjectId: req.body.subjectId,
              };
              console.log(j);
              Question_id = await insertRecord("questions", questionRecord);
              question_id.push(Question_id)
              j++;
            } else if (j > 0 && j < 5) {
              const optionRecord = {
                option_img: images[i],
                question_id: Question_id,
              };
              console.log(j);
              await insertRecord("options", optionRecord);
              j++;
            } else if (j == 5) {
              const solutionRecord = {
                solution_img: images[i],
                question_id: Question_id,
              };
              console.log(j);
              await insertRecord("solution", solutionRecord);
              j = 0;
            }
          }
          let que_id;
          let qtypeMrouterings = {
            mcq: 1,
            msq: 2,
            nsq: 3,
            'True/False Questions': 4,
          };
  
          for (let i = 0; i < textSections.length; i++) {
            if (textSections[i].startsWith('[qtype]')) {
              que_id=question_id[j];
              j++;
              const qtypeText = textSections[i].replace('[qtype]', '').trim().toLowerCase();
              // Save in the qtype table
              if (qtypeMrouterings.hasOwnProperty(qtypeText)) {
                // Save in the qtype table
                const qtypeRecord = {
                  qtype_text: textSections[i].replace('[qtype]', ''),
                  question_id: que_id,
                  quesionTypeId: qtypeMrouterings[qtypeText],
                };
                await insertRecord('qtype', qtypeRecord);
              } else {
                // Handle invalid qtypeText
                console.error(`Invalid qtype text: ${qtypeText}`);
                // You can choose to throw an error, skip the record, or handle it in any other way.
              }
            } else if (textSections[i].startsWith('[ans]')) {
              // Save in the answer table
              const answerRecord = {
                answer_text: textSections[i].replace('[ans]', ''),
                question_id: que_id
              };
              await insertRecord('answer', answerRecord);
            } else if (textSections[i].startsWith('[Marks]')) {
              // Save in the marks table
              const marksRecord = {
                marks_text: textSections[i].replace('[Marks]', ''),
                question_id: que_id
              };
              await insertRecord('marks', marksRecord);
            }
          }
          res.send(
            "Text content and images extracted and saved to the database with the selected topic ID successfully."
          );
        } catch (error) {
          console.error(error);
          res
            .status(500)
            .send("Error extracting content and saving it to the database.");
        }
      });
  
  
  
  async function insertRecord(table, record) {
    try {
      const [result] = await db.query(`INSERT INTO ${table} SET ?`, record);
      console.log(`${table} id: ${result.insertId}`);
      return result.insertId;
    } catch (err) {
      console.error(`Error inserting data into ${table}: ${err}`);
      throw err;
    }
  }
  // end -------------------
  
  
  // doc name getting 
  router.get("/documentName", async (req, res) => {
    try {
      const query =
        "SELECT o.document_Id,o.documen_name,o.testCreationTableId,o.subjectId,o.sectionId ,tt.TestName,s.subjectName FROM ots_document AS o INNER JOIN test_creation_table AS tt ON o.testCreationTableId=tt.testCreationTableId INNER JOIN subjects AS s ON s.subjectId=o.subjectId ";
      const [rows] = await db.query(query);
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });
  
  // end ----------
  
  // get doc upload iamges ---------------
  // router.get("/getSubjectData/:subjectId/:testCreationTableId", async (req, res) => {
  //   try {
  //     const subjectId = req.params.subjectId;
  //     const testCreationTableId = req.params.testCreationTableId;
  
  //     // Fetch document data based on subjectId and testCreationTableId
  //     const documentData = await getDocumentBySubjectAndTestCreationId(subjectId, testCreationTableId);
  
  //     if (!documentData) {
  //       return res.status(404).send("Document not found");
  //     }
  
  //     const document_Id = documentData.document_Id;
  
  //     // Fetch question data based on subjectId and document_Id
  //     const questions = await getQuestionsBySubjectAndDocumentId(subjectId, document_Id);
  
  //     // Fetch option data based on questions and document_Id
  //     const options = await getOptionsByQuestionsAndDocumentId(questions, document_Id);
  
  //     // Fetch solution data based on questions and document_Id
  //     const solutions = await getSolutionsByQuestionsAndDocumentId(questions, document_Id);
  //     const answers = await getAnswersByQuestionsAndDocumentId(questions, document_Id);
  
  //     // Fetch marks data based on questions and document_Id
  //     const marks = await getMarksByQuestionsAndDocumentId(questions, document_Id);
  
  //     // Fetch qtypes data based on questions and document_Id
  //     const qtypes = await getQTypesByQuestionsAndDocumentId(questions, document_Id);
  //     res.json({
  //       document: documentData,
  //       questions,
  //       options,
  //       solutions,
  //       answers,
  //       marks,
  //       qtypes,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send('Error fetching data from the database.');
  //   }
  // });
  
  
  // async function getDocumentBySubjectAndTestCreationId(subjectId, testCreationTableId) {
  //   try {
  //     const query = `
  //       SELECT document_Id, testCreationTableId, documen_name
  //       FROM ots_document
  //       WHERE subjectId = ? AND testCreationTableId = ?
  //     `;
  //     const [result] = await db.query(query, [subjectId, testCreationTableId]);
  //     return result[0];
  //   } catch (err) {
  //     console.error(`Error fetching document details: ${err}`);
  //     throw err;
  //   }
  // }
  
  
  // // Reusable function to get questions data based on subjectId and document_Id
  // async function getQuestionsBySubjectAndDocumentId(subjectId, document_Id) {
  //   try {
  //     const query = `
  //       SELECT question_id, question_img
  //       FROM questions
  //       WHERE subjectId = ? AND document_Id = ?  
  //     `;
  //     const [results] = await db.query(query, [subjectId, document_Id]);
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
  // async function getOptionsByQuestionsAndDocumentId(questions, document_Id) {
  //   try {
  //     const questionIds = questions.map(question => question.question_id);
  //     const query = `
  //     SELECT question_id, option_img
  //     FROM options
  //     WHERE question_id IN (?) 
  //     `;
  //     const [results] = await db.query(query, [questionIds, document_Id]);
  
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
  // async function getSolutionsByQuestionsAndDocumentId(questions, document_Id) {
  //   try {
  //     const questionIds = questions.map(question => question.question_id);
  //     const query = `
  //       SELECT question_id, solution_img
  //       FROM solution
  //       WHERE question_id IN (?) 
  //     `;
  //     const [results] = await db.query(query, [questionIds, document_Id]);
  
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
  // async function getAnswersByQuestionsAndDocumentId(questions, document_Id) {
  //   try {
  //     const questionIds = questions.map(question => question.question_id);
  //     const query = `
  //       SELECT answer_id, question_id, answer_text
  //       FROM answer
  //       WHERE question_id IN (?) 
  //     `;
  //     const [results] = await db.query(query, [questionIds, document_Id]);
  
  //     const answers = results.map(answer => ({
  //       answer_id: answer.answer_id,
  //       question_id: answer.question_id,
  //       answer_text: answer.answer_text,
  //     }));
  
  //     return answers;
  //   } catch (err) {
  //     console.error(`Error fetching answers: ${err.message}`);
  //     throw err;
  //   }
  // }
  // async function getMarksByQuestionsAndDocumentId(questions, document_Id) {
  //   try {
  //     const questionIds = questions.map(question => question.question_id);
  //     const query = `
  //       SELECT 	markesId, marks_text, question_id
  //       FROM marks
  //       WHERE question_id IN (?) 
  //     `;
  //     const [results] = await db.query(query, [questionIds, document_Id]);
  
  //     const marks = results.map(mark => ({
  //       markesId: mark.	markesId,
  //       marks_text: mark.marks_text,
  //       question_id: mark.question_id,
  //     }));
  
  //     return marks;
  //   } catch (err) {
  //     console.error(`Error fetching marks: ${err.message}`);
  //     throw err;
  //   }
  // }
  // async function getQTypesByQuestionsAndDocumentId(questions, document_Id) {
  //   try {
  //     const questionIds = questions.map(question => question.question_id);
  //     const query = `
  //       SELECT qtypeId, qtype_text, question_id
  //       FROM qtype
  //       WHERE question_id IN (?) 
  //     `;
  //     const [results] = await db.query(query, [questionIds, document_Id]);
  
  //     const qtypes = results.map(qtype => ({
  //       qtypeId: qtype.qtypeId,
  //       qtype_text: qtype.qtype_text,
  //       question_id: qtype.question_id,
  //     }));
  
  //     return qtypes;
  //   } catch (err) {
  //     console.error(`Error fetching qtypes: ${err.message}`);
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















  router.get("/getSubjectData/:subjectId/:testCreationTableId/:sectionId", async (req, res) => {
    try {
      const subjectId = req.params.subjectId;
      const testCreationTableId = req.params.testCreationTableId;
      const sectionId = req.params.sectionId;
   
      // Fetch document data based on subjectId, testCreationTableId, and sectionId
      const documentData = await getDocumentBySubjectAndTestCreationIdSectionId(
        subjectId,
        testCreationTableId,
        sectionId
      );
   
      if (!documentData) {
        return res.status(404).send("Document not found");
      }
   
      const document_Id = documentData.document_Id;
   
      // Fetch question data based on subjectId, document_Id, and sectionId
      const questions = await getQuestionsBySubjectAndDocumentId(
        subjectId,
        document_Id
      );
   
      // Fetch option data based on questions and document_Id
      const options = await getOptionsByQuestionsAndDocumentId(
        questions,
        document_Id
      );
   
      // Fetch solution data based on questions and document_Id
      const solutions = await getSolutionsByQuestionsAndDocumentId(
        questions,
        document_Id
      );
   
      // Fetch answers data based on questions and document_Id
      const answers = await getAnswersByQuestionsAndDocumentId(
        questions,
        document_Id
      );
   
      // Fetch marks data based on questions and document_Id
      const marks = await getMarksByQuestionsAndDocumentId(
        questions,
        document_Id
      );
   
      // Fetch qtypes data based on questions and document_Id
      const qtypes = await getQTypesByQuestionsAndDocumentId(
        questions,
        document_Id
      );
   
      // Combine images
      const combinedImages = combineImage(questions, options, solutions);
   
      // Respond with the fetched data
      res.json({
        document: documentData,
        questions,
        options,
        solutions,
        answers,
        marks,
        qtypes,
        combinedImages,
      });
    } catch (error) {
      console.error(error);
      res.status(500).send("Error fetching data from the database.");
    }
  });
   
  async function getDocumentBySubjectAndTestCreationIdSectionId(subjectId, testCreationTableId, sectionId) {
    try {
      const query = `
        SELECT document_Id, testCreationTableId, documen_name
        FROM ots_document
        WHERE subjectId = ? AND testCreationTableId = ? AND sectionId = ?
      `;
      const [result] = await db.query(query, [subjectId, testCreationTableId, sectionId]);
      return result[0];
    } catch (err) {
      console.error(`Error fetching document details: ${err}`);
      throw err;
    }
  }
   
  async function getQuestionsBySubjectAndDocumentId(subjectId, document_Id) {
    try {
      const query = `
        SELECT question_id, question_img
        FROM questions
        WHERE subjectId = ? AND document_Id = ?  
      `;
      const [results] = await db.query(query, [subjectId, document_Id]);
      const questionsWithBase64 = results.map((question) => ({
        question_id: question.question_id,
        question_img: question.question_img.toString("base64"),
      }));
      return questionsWithBase64;
    } catch (err) {
      console.error(`Error fetching questions: ${err}`);
      throw err;
    }
  }
   
  async function getOptionsByQuestionsAndDocumentId(questions, document_Id) {
    try {
      const questionIds = questions.map((question) => question.question_id);
      const query = `
        SELECT question_id, option_img
        FROM options
        WHERE question_id IN (?)
      `;
      const [results] = await db.query(query, [questionIds, document_Id]);
   
      const optionsWithBase64 = results.map((option) => ({
        question_id: option.question_id,
        option_img: option.option_img.toString("base64"),
      }));
   
      return optionsWithBase64;
    } catch (err) {
      console.error(`Error fetching options: ${err.message}`);
      throw err;
    }
  }
   
  async function getSolutionsByQuestionsAndDocumentId(questions, document_Id) {
    try {
      const questionIds = questions.map((question) => question.question_id);
      const query = `
        SELECT question_id, solution_img
        FROM solution
        WHERE question_id IN (?)
      `;
      const [results] = await db.query(query, [questionIds, document_Id]);
   
      // Convert BLOB data to base64 for sending in the response
      const solutionsWithBase64 = results.map((solution) => ({
        question_id: solution.question_id,
        solution_img: solution.solution_img.toString("base64"),
      }));
   
      return solutionsWithBase64;
    } catch (err) {
      console.error(`Error fetching solutions: ${err}`);
      throw err;
    }
  }
   
  async function getAnswersByQuestionsAndDocumentId(questions, document_Id) {
    try {
      const questionIds = questions.map((question) => question.question_id);
      const query = `
        SELECT answer_id, question_id, answer_text
        FROM answer
        WHERE question_id IN (?)
      `;
      const [results] = await db.query(query, [questionIds, document_Id]);
      const answers = results.map((answer) => ({
        answer_id: answer.answer_id,
        question_id: answer.question_id,
        answer_text: answer.answer_text,
      }));
   
      return answers;
    } catch (err) {
      console.error(`Error fetching answers: ${err.message}`);
      throw err;
    }
  }
   
  async function getMarksByQuestionsAndDocumentId(questions, document_Id) {
    try {
      const questionIds = questions.map((question) => question.question_id);
      const query = `
        SELECT markesId, marks_text, question_id
        FROM marks
        WHERE question_id IN (?)
      `;
      const [results] = await db.query(query, [questionIds, document_Id]);
   
      const marks = results.map((mark) => ({
        markesId: mark.markesId,
        marks_text: mark.marks_text,
        question_id: mark.question_id,
      }));
   
      return marks;
    } catch (err) {
      console.error(`Error fetching marks: ${err.message}`);
      throw err;
    }
  }
   
  async function getQTypesByQuestionsAndDocumentId(questions, document_Id) {
    try {
      const questionIds = questions.map((question) => question.question_id);
      const query = `
        SELECT qtypeId, qtype_text, question_id
        FROM qtype
        WHERE question_id IN (?)
      `;
      const [results] = await db.query(query, [questionIds, document_Id]);
   
      const qtypes = results.map((qtype) => ({
        qtypeId: qtype.qtypeId,
        qtype_text: qtype.qtype_text,
        question_id: qtype.question_id,
      }));
   
      return qtypes;
    } catch (err) {
      console.error(`Error fetching qtypes: ${err.message}`);
      throw err;
    }
  }
   
  function combineImage(questions, options, solutions) {
    const combinedImages = [];
   
    for (let i = 0; i < questions.length; i++) {
      const questionImage = questions[i].question_img;
      const optionImages = options
        .filter((opt) => opt.question_id === questions[i].question_id)
        .map((opt) => opt.option_img);
      const solutionImage = solutions.find(
        (sol) => sol.question_id === questions[i].question_id
      )?.solution_img;
      combinedImages.push({
        questionImage,
        optionImages,
        solutionImage,
      });
    }
    return combinedImages;
  }







  
  // // const dbHelper = new DatabaseHelper(db);
  
  // router.get("/getSubjectData/:subjectId/:testCreationTableId/:sectionId", async (req, res) => {
  //   try {
  //     const subjectId = req.params.subjectId;
  //     const testCreationTableId = req.params.testCreationTableId;
  //     const sectionId = req.params.sectionId;
  
  //     // Fetch document data based on subjectId, testCreationTableId, and sectionId
  //     const documentData = await dbHelper.getDocumentBySubjectAndTestCreationIdSectionId(
  //       subjectId,
  //       testCreationTableId,
  //       sectionId
  //     );
  
  //     if (!documentData) {
  //       return res.status(404).send("Document not found");
  //     }
  
  //     const document_Id = documentData.document_Id;
  
  //     // Fetch question data based on subjectId, document_Id, and sectionId
  //     const questions = await dbHelper.getQuestionsBySubjectAndDocumentId(
  //       subjectId,
  //       document_Id,
  //       sectionId
  //     );
  
  //     // Fetch option data based on questions and document_Id
  //     const options = await dbHelper.getOptionsByQuestionsAndDocumentId(
  //       questions,
  //       document_Id
  //     );
  
  //     // Fetch solution data based on questions and document_Id
  //     const solutions = await dbHelper.getSolutionsByQuestionsAndDocumentId(
  //       questions,
  //       document_Id
  //     );
  
  //     // Fetch answers data based on questions and document_Id
  //     const answers = await dbHelper.getAnswersByQuestionsAndDocumentId(
  //       questions,
  //       document_Id
  //     );
  
  //     // Fetch marks data based on questions and document_Id
  //     const marks = await dbHelper.getMarksByQuestionsAndDocumentId(
  //       questions,
  //       document_Id
  //     );
  
  //     // Fetch qtypes data based on questions and document_Id
  //     const qtypes = await dbHelper.getQTypesByQuestionsAndDocumentId(
  //       questions,
  //       document_Id
  //     );
  
  //     // Combine images
  //     const combinedImages = dbHelper.combineImage(questions, options, solutions);
  
  //     // Respond with the fetched data
  //     res.json({
  //       document: documentData,
  //       questions,
  //       options,
  //       solutions,
  //       answers,
  //       marks,
  //       qtypes,
  //       combinedImages,
  //     });
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).send("Error fetching data from the database.");
  //   }
  // });
  
  // class DatabaseHelper {
  //   constructor(pool) {
  //     this.pool = pool;
  //   }
  
  // async getDocumentBySubjectAndTestCreationIdSectionId(subjectId, testCreationTableId, sectionId) {
  //   try {
  //     const query = `
  //       SELECT document_Id, testCreationTableId, documen_name
  //       FROM ots_document
  //       WHERE subjectId = ? AND testCreationTableId = ? AND sectionId = ?
  //     `;
  //     const [result] = await this.db.query(query, [subjectId, testCreationTableId, sectionId]);
  //     return result[0];
  //   } catch (err) {
  //     console.error(`Error fetching document details: ${err}`);
  //     throw err;
  //   }
  // }
  
  // // Reusable function to get questions data based on subjectId and document_Id
  // async getQuestionsBySubjectAndDocumentId(subjectId, document_Id) {
  //   try {
  //     const query = `
  //       SELECT question_id, question_img
  //       FROM questions
  //       WHERE subjectId = ? AND document_Id = ?  
  //     `;
  //     const [results] = await this.db.query(query, [subjectId, document_Id]);
  //     const questionsWithBase64 = results.map((question) => ({
  //       question_id: question.question_id,
  //       question_img: question.question_img.toString("base64"),
  //     }));
  //     return questionsWithBase64;
  //   } catch (err) {
  //     console.error(`Error fetching questions: ${err}`);
  //     throw err;
  //   }
  // }
  
  // // Reusable function to get options data based on questions and document_Id
  // async getOptionsByQuestionsAndDocumentId(questions, document_Id) {
  //   try {
  //     const questionIds = questions.map((question) => question.question_id);
  //     const query = `
  //       SELECT question_id, option_img
  //       FROM options
  //       WHERE question_id IN (?) 
  //     `;
  //     const [results] = await this.db.query(query, [questionIds, document_Id]);
  
  //     const optionsWithBase64 = results.map((option) => ({
  //       question_id: option.question_id,
  //       option_img: option.option_img.toString("base64"),
  //     }));
  
  //     return optionsWithBase64;
  //   } catch (err) {
  //     console.error(`Error fetching options: ${err.message}`);
  //     throw err;
  //   }
  // }
  
  // // Reusable function to get solutions data based on questions and document_Id
  // async  getSolutionsByQuestionsAndDocumentId(questions, document_Id) {
  //   try {
  //     const questionIds = questions.map((question) => question.question_id);
  //     const query = `
  //       SELECT question_id, solution_img
  //       FROM solution
  //       WHERE question_id IN (?) 
  //     `;
  //     const [results] = await db.query(query, [questionIds, document_Id]);
  
  //     // Convert BLOB data to base64 for sending in the response
  //     const solutionsWithBase64 = results.map((solution) => ({
  //       question_id: solution.question_id,
  //       solution_img: solution.solution_img.toString("base64"),
  //     }));
  
  //     return solutionsWithBase64;
  //   } catch (err) {
  //     console.error(`Error fetching solutions: ${err}`);
  //     throw err;
  //   }
  // }
  
  // async  getAnswersByQuestionsAndDocumentId(questions, document_Id) {
  //   try {
  //     const questionIds = questions.map((question) => question.question_id);
  //     const query = `
  //       SELECT answer_id, question_id, answer_text
  //       FROM answer
  //       WHERE question_id IN (?) 
  //     `;
  //     const [results] = await db.query(query, [questionIds, document_Id]);
  //     const answers = results.map((answer) => ({
  //       answer_id: answer.answer_id,
  //       question_id: answer.question_id,
  //       answer_text: answer.answer_text,
  //     }));
  
  //     return answers;
  //   } catch (err) {
  //     console.error(`Error fetching answers: ${err.message}`);
  //     throw err;
  //   }
  // }
  // async  getMarksByQuestionsAndDocumentId(questions, document_Id) {
  //   try {
  //     const questionIds = questions.map((question) => question.question_id);
  //     const query = `
  //       SELECT 	markesId, marks_text, question_id
  //       FROM marks
  //       WHERE question_id IN (?) 
  //     `;
  //     const [results] = await db.query(query, [questionIds, document_Id]);
  
  //     const marks = results.map((mark) => ({
  //       markesId: mark.markesId,
  //       marks_text: mark.marks_text,
  //       question_id: mark.question_id,
  //     }));
  
  //     return marks;
  //   } catch (err) {
  //     console.error(`Error fetching marks: ${err.message}`);
  //     throw err;
  //   }
  // }
  // async  getQTypesByQuestionsAndDocumentId(questions, document_Id) {
  //   try {
  //     const questionIds = questions.map((question) => question.question_id);
  //     const query = `
  //       SELECT qtypeId, qtype_text, question_id
  //       FROM qtype
  //       WHERE question_id IN (?) 
  //     `;
  //     const [results] = await db.query(query, [questionIds, document_Id]);
  
  //     const qtypes = results.map((qtype) => ({
  //       qtypeId: qtype.qtypeId,
  //       qtype_text: qtype.qtype_text,
  //       question_id: qtype.question_id,
  //     }));
  
  //     return qtypes;
  //   } catch (err) {
  //     console.error(`Error fetching qtypes: ${err.message}`);
  //     throw err;
  //   }
  // }
  // combineImage(questions, options, solutions) {
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
  // }
 
  // end-------- 
  // const dbHelper = new DatabaseHelper(pool);
  //doc delete 
  router.delete('/DocumentDelete/:document_Id', async (req, res) => {
    const document_Id = req.params.document_Id;
   
    try {
      await db.query('DELETE questions, ots_document, options , solution,answer,marks,qtype  FROM ots_document LEFT JOIN questions ON questions.document_Id = ots_document.document_Id LEFT JOIN options ON options.question_id = questions.question_id LEFT JOIN solution ON solution.question_id = questions.question_id LEFT JOIN answer ON answer.question_id = questions.question_id LEFT JOIN marks ON marks.question_id = questions.question_id  LEFT JOIN qtype ON qtype.question_id = questions.question_id   WHERE ots_document.document_Id = ? ', [document_Id]);
      res.json({ message: `course with ID ${document_Id} deleted from the database` });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });
  //  end for document section code ------------------------------------------/
  
  module.exports = router;