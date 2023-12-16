const express = require("express");
const mysql = require("mysql2/promise");
const cors = require("cors");
const multer = require("multer");
const mammoth = require("mammoth");
const cheerio = require("cheerio");
const path = require("path");
const fs = require("fs").promises;
const app = express();
const port = 5001;
 
app.use(express.json());
app.use(cors()); 
 
const db = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin_project",
});
 
const storage = multer.diskStorage({
  destination: async (req, file, cb) => {
    const uploadDir = "uploads/";
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
 
 
//_________________________________________________FRONT END_______________________________________

app.get("/examData", async (req, res) => {
  // FetchData
  try {
    const [rows] = await db.query("SELECT * FROM exams");
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/feachingcourse/:examId", async (req, res) => {
  const { examId } = req.params;
  try {
    // Fetch exams from the database
    const [rows] = await db.query(
      "SELECT * FROM course_creation_table WHERE examId = ?",
      [examId]
    );
    console.log("Query Result:", rows);

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/feachingtest/:courseCreationId/:typeOfTestId", async (req, res) => {
  const { courseCreationId, typeOfTestId } = req.params;
  const query = "SELECT * FROM test_creation_table WHERE courseCreationId = ? AND courseTypeOfTestId = ?";
  db.query(query,[courseCreationId],[typeOfTestId] ,(error, results) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res.status(500).send("Error retrieving data from the database.");
      return;
    }
    console.log("Retrieved data from test table:");
    console.log(results);
    res.json(results);
  });
});

app.get("/feachingtest/:courseCreationId", async (req, res) => {
  const { courseCreationId } = req.params;
  try {
    // Fetch exams from the database
    const [rows] = await db.query(
      "SELECT * FROM test_creation_table WHERE 	courseCreationId  = ?",
      [courseCreationId]
    );

    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/feachingtypeoftest", async (req, res) => {
  try {
    // Fetch type_of_test data from the database
    const [typeOfTestRows] = await db.query("SELECT * FROM type_of_test");
    res.json(typeOfTestRows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// app.get("/feachingtestbytype/:typeOfTestId", async (req, res) => {
//   const { typeOfTestId } = req.params;
//   try {
//     // Fetch tests from the database based on typeOfTestId
//     const [testRows] = await db.query(
//       "SELECT * FROM test_creation_table WHERE courseTypeOfTestId = ?",
//       [typeOfTestId]
//     );
//     res.json(testRows);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Internal Server Error" });
//   }
// });

app.get("/fetchinstructions/:testCreationTableId", async (req, res) => {
  const { testCreationTableId } = req.params;
  try {
    // Fetch instructions from the database based on testCreationTableId
    const [instructionsRows] = await db.query(
      "SELECT instruction.instructionId, instructionHeading, points, id FROM instructions_points " +
        "JOIN instruction ON instructions_points.instructionId = instruction.instructionId " +
        "JOIN test_creation_table ON instruction.instructionId = test_creation_table.instructionId " +
        "WHERE test_creation_table.testCreationTableId = ?",
      [testCreationTableId]
    );
    res.json(instructionsRows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/fetchinstructions/:testCreationTableId", async (req, res) => {
  const { testCreationTableId } = req.params;
  try {
    // Fetch instructions from the database based on testCreationTableId
    const [instructionsRows] = await db.query(
      "SELECT instruction.instructionId, instructionHeading, points, id, test_creation_table.testCreationTableId, course_subjects.subjectId " +
        "FROM instructions_points " +
        "JOIN instruction ON instructions_points.instructionId = instruction.instructionId " +
        "JOIN test_creation_table ON instruction.instructionId = test_creation_table.instructionId " +
        "JOIN course_creation_table ON test_creation_table.courseCreationId = course_creation_table.courseCreationId " +
        "JOIN course_subjects ON course_creation_table.courseCreationId = course_subjects.courseCreationId " +
        "WHERE test_creation_table.testCreationTableId = ?",
      [testCreationTableId]
    );
    res.json(instructionsRows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


// SELECT t1.instructionheading, t2.points, cct.examid, tct.courseCreationId
// FROM instruction t1
// JOIN instructions_points t2 ON t1.examid = t2.examid
// JOIN course_creation_table cct ON t1.examid = cct.examid
// JOIN test_creation_table tct ON cct.courseCreationId = tct.courseCreationId
// WHERE t1.examid = 8;

app.get("/fetchinstructions/:examid", async (req, res) => {
  const { examid } = req.params;
  try {
    // Fetch instructions from the database based on testCreationTableId
    const [instructionsRows] = await db.query(
      "SELECT t2.instructionHeading, t2.points, cct.examid, tct.courseCreationId FROM instruction t1 JOIN instructions_points t2 ON t1.instructionid = t2.instructionid JOIN course_creation_table cct ON t1.examid = cct.examid JOIN test_creation_table tct ON cct.courseCreationId = tct.courseCreationId WHERE t1.examid = ?;", [examid]
    );
    res.json(instructionsRows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get('/subjects/:testCreationTableId', async (req, res) => {
  const { testCreationTableId } = req.params;
  try {
    // Fetch instructions from the database based on testCreationTableId
    // const [subjects] = await db.query(
    //   'SELECT subjects.subjectName,subjects.subjectId FROM test_creation_table JOIN course_creation_table ON test_creation_table.courseCreationId = course_creation_table.courseCreationId JOIN course_subjects ON course_creation_table.courseCreationId = course_subjects.courseCreationId JOIN Subjects ON course_subjects.subjectId = Subjects.subjectId WHERE test_creation_table.testCreationTableId = ?',
    //   [testCreationTableId]
    // );


    const [subjects] = await db.query(
      'SELECT subjects.subjectName,subjects.subjectId FROM test_creation_table JOIN course_creation_table ON test_creation_table.courseCreationId = course_creation_table.courseCreationId JOIN course_subjects ON course_creation_table.courseCreationId = course_subjects.courseCreationId JOIN Subjects ON course_subjects.subjectId = Subjects.subjectId WHERE test_creation_table.testCreationTableId = ?',
      [testCreationTableId]
    );
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get("/fetchSections/:testCreationTableId", async (req, res) => {
  const { testCreationTableId } = req.params;
  try {
    const [rows] = await db.query(
      "SELECT * FROM sections WHERE testCreationTableId = ?",
      [testCreationTableId]
    );
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/upload", upload.single("document"), async (req, res) => {
  const docxFilePath = `uploads/${req.file.filename}`;
  const outputDir = `uploads/${req.file.originalname}_images`;

  const docName = `${req.file.originalname}`;
  try {
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
    });
    const document_Id = documentResult.insertId;

    // Get all images in the order they appear in the HTML
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
app.get("/documentName", async (req, res) => {
  try {
    const query =
      "SELECT document_Id, testCreationTableId, documen_name, subjectId FROM ots_document";
    const [rows] = await db.query(query);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// end ----------



app.get("/subjectData/:subjectId", async (req, res) => {
  // FetchData
  try {
    const {subjectId } = req.params;
    const [rows] = await db.query("SELECT * FROM subjects WHERE subjectId=?",[subjectId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/subjectData/:courseCreationId", async (req, res) => {
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



app.get("/subjectData/:testCreationTableId", async (req, res) => {
  // FetchData
  try {
    const {testCreationTableId } = req.params;
    const [rows] = await db.query(" SELECT DISTINCT subjectId FROM course_subjects JOIN test_creation_table ON course_subjects.courseCreationId = test_creation_table.courseCreationId WHERE test_creation_table.testCreationTableId  = ?;",[testCreationTableId]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


app.get("/getPaperData/:testCreationTableId/:subjectId", async (req, res) => {
  try {
    const subjectId = req.params.subjectId;
    const testCreationTableId = req.params.testCreationTableId;
 
    // Fetch data from testCreationTableId table
    const testData =  getDataByTestCreationTableId(testCreationTableId);
 
    // Fetch question data based on subjectId and document_Id
    const questions =  getQuestionsBySubjectAndDocumentId(subjectId, testCreationTableId);
 
    // Fetch option data based on questions and document_Id
    const options =  getOptionsByQuestionsAndDocumentId(questions, testCreationTableId);
 
    // Fetch solution data based on questions and document_Id
    const solutions =  getSolutionsByQuestionsAndDocumentId(questions, testCreationTableId);
 
    res.json({
      testData,
      questions,
      options,
      solutions,
    }); 
  } catch (error) {
    console.error(error);
    res.status(500).send('Error fetching data from the database.');
  }
});

async function getDataByTestCreationTableId(testCreationTableId) {
  try {
    const query = `
      SELECT *
      FROM test_creation_table
      WHERE testCreationTableId = ?  
    `;
    const [results] =await  db.query(query, [testCreationTableId]);
 
    return results; // Adjust this based on your actual table structure
  } catch (err) {
    console.error(`Error fetching data from test_creation_table: ${err}`);
    throw err;
  }
}
 
// Reusable function to get questions data based on subjectId and document_Id
async function getQuestionsBySubjectAndDocumentId(subjectId, testCreationTableId) {
  try {
    const query = `
      SELECT question_id, question_img
      FROM questions
      WHERE subjectId = ? AND testCreationTableId = ?  
    `;
    const [results] =  db.query(query, [subjectId, testCreationTableId]);
    const optionsWithBase64 = results.map(option => ({
      question_id: option.question_id,
      question_img: option.question_img.toString('base64'),
    }));
    return optionsWithBase64;
  } catch (err) {
    console.error(`Error fetching questions: ${err}`);
    throw err;
  }
}

// Reusable function to get options data based on questions and document_Id
async function getOptionsByQuestionsAndDocumentId(questions, testCreationTableId) {
  try {
    const questionIds = questions.map(question => question.question_id);
    const query = `
    SELECT question_id, option_img
    FROM options
    WHERE question_id IN (?)
    `;
    const [results] =  db.query(query, [questionIds, testCreationTableId]);
 
    // Convert BLOB data to base64 for sending in the response
    const optionsWithBase64 = results.map(option => ({
      question_id: option.question_id,
      option_img: option.option_img.toString('base64'),
    }));
 
    return optionsWithBase64;
  } catch (err) {
    console.error(`Error fetching options: ${err.message}`);
    throw err;
  }
}

async function getSolutionsByQuestionsAndDocumentId(questions, testCreationTableId) {
  try {
    const questionIds = questions.map(question => question.question_id);
    const query = `
      SELECT question_id, solution_img
      FROM solution
      WHERE question_id IN (?)
    `;
    const [results] =  db.query(query, [questionIds, testCreationTableId]);
 
    // Convert BLOB data to base64 for sending in the response
    const solutionsWithBase64 = results.map(solution => ({
      question_id: solution.question_id,
      solution_img: solution.solution_img.toString('base64'),
    }));
 
    return solutionsWithBase64;
  } catch (err) {
    console.error(`Error fetching solutions: ${err}`);
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






// -----------------------------------h------------------------------------


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});