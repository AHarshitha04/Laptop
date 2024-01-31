const express = require("express");
const router = express.Router();
const db= require("../databases/db2");


router.get("/coursedataSRP/:courseCreationId", async (req, res) => {
    const { courseCreationId } = req.params;
    try {
      // Fetch exams from the database
      const [rows] = await db.query(
        "SELECT cc.courseName, cc.courseYear, cc.courseCreationId, cs.subjectId, e.examId, s.subjectName, e.examName FROM course_creation_table AS cc LEFT JOIN exams AS e ON cc.examId = e.examId LEFT JOIN course_subjects AS cs ON cc.courseCreationId = cs.courseCreationId LEFT JOIN subjects AS s ON cs.subjectId = s.subjectId WHERE cc.courseCreationId = ?",
        [courseCreationId]
      );
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Internal Server Error" });
    }
  });

  module.exports = router;