const express = require("express");
const router = express.Router();
const db= require("../databases/db2");



router.get("/examData", async (req, res) => {
    // FetchData
    try {
      const [rows] = await db.query("SELECT * FROM exams");
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  router.get("/feachingcourse/:examId", async (req, res) => {
    const { examId } = req.params;
    try {
      // Fetch exams from the database
      const [rows] = await db.query(
        "SELECT * FROM course_creation_table WHERE examId = ?",
        [examId]
      );
  
  
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
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
