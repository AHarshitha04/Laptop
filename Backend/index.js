const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const fs = require("fs");
const app = express();
const path = require("path");
app.use(express.static("public"));
const bodyParser = require("body-parser");
const port = 5001;
// const cors = require('cors');



// const corsOptions = {
//   origin: "*",
//   optionsSuccessStatus: 200,
// };

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "egrad_tutor_main_admin",
});
app.use(bodyParser.json());
// app.use(cors(corsOptions));
app.use(cors({ origin: "*" }));


db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});

app.use(cors());

app.get("/courses", (req, res) => {
  const query = "SELECT course_name,course_id FROM courses";
  db.query(query, (error, results) => {
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

app.get("/quiz_exams/:course_id", (req, res) => {
  const course_id = req.params.course_id;
  // const section_id = req.params.section_id;
  const sql = "SELECT * FROM exams WHERE course_id = ?";
  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error("Error querying the database: " + err.message);
      res.status(500).json({ error: "Error fetching exams" });
      return;
    }
    res.json(result);
  });
});

app.get("/sections/:course_id", (req, res) => {
  const course_id = req.params.course_id;
  const sql = "SELECT * FROM sections WHERE course_id = ? ";
  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error("Error querying the database: " + err.message);
      res.status(500).json({ error: "Error fetching exams" });
      return;
    }
    res.json(result);
  });
});

const storage = multer.memoryStorage(); // Store the image in memory as a Buffer
const upload = multer({ storage: storage });


// main original code
// app.post("/upload", upload.single("image"), (req, res) => {
//   const image = req.file.buffer;
//   const courseId = req.body.course_id; // Assuming you are sending the course_id in the request body
//   const sectionId = req.body.section_id;

//   if (!courseId || !sectionId) {
//     return res.status(400).json({ message: "Course ID is required" });
//   }
  

//   // Modify the query to include course_id
//   const query =
//     "INSERT INTO main_page_images (image_data, course_id, section_id ) VALUES (?, ?,?)";
//   const values = [image, courseId, sectionId];

//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error("Error uploading image:", err);
//       res.status(500).json({ message: "Error uploading image" });
//     } else {
//       res.json({ message: "Image uploaded successfully" });
//     }
//   });
// });



// main original code
app.post("/upload", upload.single("image"), (req, res) => {
  const image = req.file.buffer;
  const courseId = req.body.course_id; // Assuming you are sending the course_id in the request body
  const sectionId = req.body.section_id;
  const examId = req.body.exam_id; // Assuming you are sending the exam_id in the request body

  if (!courseId || !sectionId) {
    return res.status(400).json({ message: "Course ID and Section ID are required" });
  }

  // Modify the query to include course_id and section_id
  let query;
  let values;

  if (examId) {
    // If exam_id is present, include it in the query
    query =
      "INSERT INTO main_page_images (image_data, course_id, section_id, exam_id) VALUES (?, ?, ?, ?)";
    values = [image, courseId, sectionId, examId];
  } else {
    // If exam_id is not present, exclude it from the query
    query =
      "INSERT INTO main_page_images (image_data, course_id, section_id) VALUES (?, ?, ?)";
    values = [image, courseId, sectionId];
  }

  db.query(query, values, (err, result) => {
    if (err) {
      console.error("Error uploading image:", err);
      res.status(500).json({ message: "Error uploading image" });
    } else {
      res.json({ message: "Image uploaded successfully" });
    }
  });
});



// app.post("/upload", upload.single("image"), (req, res) => {
//   const image = req.file.buffer;
//   const courseId = req.body.course_id;
//   const sectionId = req.body.section_id;
//   const examId = req.body.exam_id;

//   if (!courseId || !sectionId) {
//     return res.status(400).json({ message: "Course ID and Section ID are required" });
//   }

//   const isUGMainPage = courseId === "UG" && sectionId === "UG Main Page";
//   const isUGExploreExam = courseId === "UG" && sectionId === "UG Explore Exam";
//   const isPGMainPage = courseId === "PG" && sectionId === "PG Main Page";
//   const isPGExploreExam = courseId === "PG" && sectionId === "PG Explore Exam";
//   const isUGCourseExam = courseId === "UG" && sectionId === "UG Course Exam";
//   const isPGCourseExam = courseId === "PG" && sectionId === "PG Course Exam";

//   if ((isUGMainPage || isUGExploreExam || isPGMainPage || isPGExploreExam) && !examId) {
//     // Modify the query to include course_id and section_id
//     const query =
//       "INSERT INTO main_page_images (image_data, course_id, section_id) VALUES (?, ?, ?)";
//     const values = [image, courseId, sectionId];

//     db.query(query, values, (err, result) => {
//       if (err) {
//         console.error("Error uploading image:", err);
//         res.status(500).json({ message: "Error uploading image" });
//       } else {
//         res.json({ message: "Image uploaded successfully" });
//       }
//     });
//   } else if ((isUGCourseExam || isPGCourseExam) && examId) {
//     // Modify the query to include course_id, section_id, and exam_id
//     const query =
//       "INSERT INTO course_exam_images (image_data, course_id, section_id, exam_id) VALUES (?, ?, ?, ?)";
//     const values = [image, courseId, sectionId, examId];

//     db.query(query, values, (err, result) => {
//       if (err) {
//         console.error("Error uploading image:", err);
//         res.status(500).json({ message: "Error uploading image" });
//       } else {
//         res.json({ message: "Image uploaded successfully" });
//       }
//     });
//   } else {
//     res.status(403).json({ message: "Image upload is only allowed for specified sections" });
//   }
// });



//ORIGINAL CODE
// app.get("/images", (req, res) => {
//   const query = "SELECT * FROM main_page_images";

//   db.query(query, (error, results) => {
//     if (error) {
//       console.error("Error fetching images:", error);
//       res.status(500).send("Internal Server Error");
//     } else {
//       const imageDataList = results.map((result) => {
//         // Use the correct column name based on your table structure
//         const base64 = result.image_data.toString("base64");
//         return `data:image/png;base64,${base64}`;
//       });
//       res.json(imageDataList);
//     }
//   });
// });



app.get("/HomeImages", (req, res) => {
  const query = "SELECT * FROM images WHERE section_id=1 ;";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching images:", error);
      res.status(500).send("Internal Server Error");
    } else {
      const imageDataList = results.map((result) => {
        // Use the correct column name based on your table structure
        const base64 = result.image_data.toString("base64");
        return `data:image/png;base64,${base64}`;
      });
      res.json(imageDataList);
    }
  });
});


app.get("/ExploreExam", (req, res) => {
  const query = "SELECT * FROM images WHERE section_id=2;";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching images:", error);
      res.status(500).send("Internal Server Error");
    } else {
      const imageDataList = results.map((result) => {
        // Use the correct column name based on your table structure
        const base64 = result.image_data.toString("base64");
        return `data:image/png;base64,${base64}`;
      });
      res.json(imageDataList);
    }
  });
});

app.get("/ExamBanners", (req, res) => {
  const query = "SELECT * FROM images WHERE exam_id=201;";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching images:", error);
      res.status(500).send("Internal Server Error");
    } else {
      const imageDataList = results.map((result) => {
        // Use the correct column name based on your table structure
        const base64 = result.image_data.toString("base64");
        return `data:image/png;base64,${base64}`;
      });
      res.json(imageDataList);
    }
  });
});

app.get("/NeetExamBanners", (req, res) => {
  const query = "SELECT * FROM images WHERE exam_id=202;";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching images:", error);
      res.status(500).send("Internal Server Error");
    } else {
      const imageDataList = results.map((result) => {
        // Use the correct column name based on your table structure
        const base64 = result.image_data.toString("base64");
        return `data:image/png;base64,${base64}`;
      });
      res.json(imageDataList);
    }
  });
});


app.get("/BitsatExamBanners", (req, res) => {
  const query = "SELECT * FROM images WHERE exam_id=203;";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching images:", error);
      res.status(500).send("Internal Server Error");
    } else {
      const imageDataList = results.map((result) => {
        // Use the correct column name based on your table structure
        const base64 = result.image_data.toString("base64");
        return `data:image/png;base64,${base64}`;
      });
      res.json(imageDataList);
    }
  });
});

app.get("/ApEapcetBanners", (req, res) => {
  const query = "SELECT * FROM images WHERE exam_id=205;";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching images:", error);
      res.status(500).send("Internal Server Error");
    } else {
      const imageDataList = results.map((result) => {
        // Use the correct column name based on your table structure
        const base64 = result.image_data.toString("base64");
        return `data:image/png;base64,${base64}`;
      });
      res.json(imageDataList);
    }
  });
});

app.get("/TsEamcetBanners", (req, res) => {
  const query = "SELECT * FROM images WHERE exam_id=211;";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error fetching images:", error);
      res.status(500).send("Internal Server Error");
    } else {
      const imageDataList = results.map((result) => {
        // Use the correct column name based on your table structure
        const base64 = result.image_data.toString("base64");
        return `data:image/png;base64,${base64}`;
      });
      res.json(imageDataList);
    }
  });
});



// ---------------------------------------------------------------------------------------- login --------------------------------------------------------------------------


// --------------------------------------login -----------------------------------------------------
 
 
app.post('/register', async (req, res) => {
  const { username, password } = req.body;
 
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
 
  // Set the default role to 'viewer'
  const defaultRole = 'viewer';
 
  // Insert user into the database with a default role
  db.query('INSERT INTO users (username, password, role) VALUES (?, ?, ?)', [username, hashedPassword, defaultRole], (err, result) => {
    if (err) {
      console.error('Error registering user:', err);
      res.status(500).send('Error registering user');
    } else {
      console.log('User registered successfully');
      res.status(200).send('User registered successfully');
    }
  });
});
 
 
app.post('/login', (req, res) => {
  const { username, password } = req.body;
 
  // Retrieve user from the database
  db.query('SELECT id, username, password, role FROM users WHERE username = ?', [username], async (err, result) => {
    if (err) {
      res.status(500).send('Error during login');
    } else if (result.length > 0) {
      // Compare hashed password
      const match = await bcrypt.compare(password, result[0].password);
 
      if (match) {
        // Send the role along with the login success response
        const { id, username, role } = result[0];
        res.status(200).json({
          message: 'Login successful',
          user: { id, username, role },
        });
      } else {
        res.status(401).send('Incorrect password');
      }
    } else {
      res.status(404).send('User not found');
    }
  });
});


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
