const express = require("express");
const router = express.Router();
const db= require("../databases/db2");


router.get("/examData", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT e.examName, e.startDate, e.endDate, e.examId, ci.cardimeage FROM exams AS e JOIN cardimeageuploadtable AS ci ON e.examId=ci.examId");

    if (rows.length === 0) {
      // If no data is found
      return res.status(404).json({ error: "No data found" });
    }

    // Loop through each row and convert cardimeage to base64
    rows.forEach((row) => {
      const base64CardImage = row.cardimeage.toString("base64");
      row.cardimeage = `data:image/png;base64,${base64CardImage}`;
    });

    // Return the response
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

  // router.get("/feachingcourse/:examId", async (req, res) => {
  //   const { examId } = req.params;
  //   try {
  //     // Fetch exams from the database
  //     const [rows] = await db.query(
  //       "SELECT * FROM course_creation_table WHERE examId = ?",
  //       [examId]
  //     );
  
  
  //     res.json(rows);
  //   } catch (error) {
  //     console.error(error);
  //     res.status(500).json({ error: "Internal Server Error" });
  //   }
  // });


  router.get("/feachingcourse/:examId", async (req, res) => {
    const { examId } = req.params;
    try {
      const [rows] = await db.query(
        "SELECT c.courseName, c.courseYear, c.courseStartDate, c.courseEndDate, ci.cardimeage, c.examId, c.courseCreationId, c.cost, c.Discount, c.totalPrice FROM course_creation_table AS c JOIN cardimeageuploadtable AS ci ON c.courseCreationId = ci.courseCreationId WHERE c.examId = ?",
        [examId]
      );
  
      if (rows.length === 0) {
        // If no data is found
        return res.status(404).json({ error: "No data found" });
      }
  
      // Loop through each row and convert cardimeage to base64
      rows.forEach((row) => {
        const base64CardImage = row.cardimeage.toString("base64");
        row.cardimeage = `data:image/png;base64,${base64CardImage}`;
      });
  
      // Return the response
      res.json(rows);
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

  
router.get("/feachingtest/:courseCreationId/:typeOfTestId", async (req, res) => {
  const { courseCreationId, typeOfTestId } = req.params;
  try {
    // Fetch tests from the database based on courseCreationId and typeOfTestId
    const [testRows] = await db.query(
      "SELECT * FROM test_creation_table WHERE courseCreationId = ? AND courseTypeOfTestId = ?",
      [courseCreationId, typeOfTestId]
    );
    res.json(testRows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/feachingtest/:courseCreationId", async (req, res) => {
  const { courseCreationId } = req.params;
  try {
    // Fetch exams from the database
    const [rows] = await db.query(
      "SELECT * FROM test_creation_table WHERE  courseCreationId  = ?",
      [courseCreationId]
    );


    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/feachingtypeoftest", async (req, res) => {
  try {
    // Fetch type_of_test data from the database
    const [typeOfTestRows] = await db.query("SELECT * FROM type_of_test");
    res.json(typeOfTestRows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


router.get("/fetchinstructions/:testCreationTableId", async (req, res) => {
  const { testCreationTableId } = req.params;
  try {
    // Fetch instructions from the database based on testCreationTableId
    const [instructionsRows] = await db.query(
      "SELECT tc.testCreationTableId,it.instructionHeading, ipt.points, it.instructionId, ipt.id FROM test_creation_table tc JOIN instruction it ON tc.instructionId = it.instructionId JOIN instructions_points ipt ON it.instructionId = ipt.instructionId  WHERE tc.testCreationTableId = ?;",
      [testCreationTableId]
    );
    res.json(instructionsRows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});


module.exports = router;
