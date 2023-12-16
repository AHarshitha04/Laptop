const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require("bcrypt");
const fs = require("fs");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const sizeOf = require("image-size");
// const diskusage = require("diskusage");
app.use(express.static("public"));
const bodyParser = require("body-parser");
const { register } = require("module");
const port = 5001;

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin_project",
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

// -----------------------------------sravan----------------------------

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

// app.get("/quiz_exams/:course_id", (req, res) => {
//   const course_id = req.params.course_id;
//   // const section_id = req.params.section_id;
//   const sql = "SELECT * FROM exams WHERE course_id = ?";
//   db.query(sql, [course_id], (err, result) => {
//     if (err) {
//       console.error("Error querying the database: " + err.message);
//       res.status(500).json({ error: "Error fetching exams" });
//       return;
//     }
//     res.json(result);
//   });
// });

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

app.delete("/HomeImages/:images_id", (req, res) => {
  const imageId = req.params.images_id;
  const q = "DELETE FROM images WHERE images_id = ?";

  db.query(q, [imageId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/HomeImagesadmin", (req, res) => {
  const query = "SELECT images_id, image_data FROM images";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching images:", err);
      res.status(500).send("Internal Server Error");
    } else {
      const imageArray = results.map((result) => {
        const base64 = result.image_data.toString("base64");
        return {
          id: result.images_id,
          imageData: `data:image/png;base64,${base64}`,
        };
      });

      res.json(imageArray);
    }
  });
});

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

// ----------------------------------------------------------================================  courses ug function by sra1 ========================================--------------------------------------------------------

app.get("/examsug", (req, res) => {
  const course_id = req.params.course_id;
  // const sql = "SELECT exam_name FROM 2egquiz_exam WHERE exam_name=UG";
  const sql =
    "SELECT exam_name FROM 2egquiz_exam WHERE course_id = ( SELECT Min(course_id)  FROM 2egquiz_exam  );";
  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error("Error querying the database: " + err.message);
      res.status(500).json({ error: "Error fetching exams" });
      return;
    }
    res.json(result);
  });
});

app.get("/examspg", (req, res) => {
  const course_id = req.params.course_id;
  // const sql = "SELECT exam_name FROM 2egquiz_exam WHERE exam_name=UG";
  const sql =
    "SELECT exam_name FROM 2egquiz_exam WHERE course_id = ( SELECT Min(course_id+1)  FROM 2egquiz_exam  );";
  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error("Error querying the database: " + err.message);
      res.status(500).json({ error: "Error fetching exams" });
      return;
    }
    res.json(result);
  });
});
app.get("/examsmba", (req, res) => {
  const course_id = req.params.course_id;
  // const sql = "SELECT exam_name FROM 2egquiz_exam WHERE exam_name=UG";
  const sql =
    "SELECT exam_name FROM 2egquiz_exam WHERE course_id = ( SELECT Min(course_id+2)  FROM 2egquiz_exam  );";
  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error("Error querying the database: " + err.message);
      res.status(500).json({ error: "Error fetching exams" });
      return;
    }
    res.json(result);
  });
});
app.get("/examsca", (req, res) => {
  const course_id = req.params.course_id;
  // const sql = "SELECT exam_name FROM 2egquiz_exam WHERE exam_name=UG";
  const sql =
    "SELECT exam_name FROM 2egquiz_exam WHERE course_id = ( SELECT Min(course_id+3)  FROM 2egquiz_exam  );";
  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error("Error querying the database: " + err.message);
      res.status(500).json({ error: "Error fetching exams" });
      return;
    }
    res.json(result);
  });
});

app.get("/coursesug", (req, res) => {
  // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
  const query =
    "SELECT course_name FROM 1egquiz_courses WHERE course_id = ( SELECT Min(course_id)  FROM 1egquiz_courses  );";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res.status(500).send("Error retrieving data from database.");
      return;
    }
    console.log("Retrieved data from test table:");
    console.log(results);
    // Send the retrieved data as JSON response
    res.json(results);
  });
});

app.get("/coursescurrentug", (req, res) => {
  // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
  const query =
    "SELECT course_name FROM 1egquiz_courses WHERE course_id = ( SELECT Max(course_id)  FROM 1egquiz_courses  );";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res.status(500).send("Error retrieving data from database.");
      return;
    }
    console.log("Retrieved data from test table:");
    console.log(results);
    // Send the retrieved data as JSON response
    res.json(results);
  });
});

app.get("/coursespg", (req, res) => {
  // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
  const query =
    "SELECT course_name FROM 1egquiz_courses WHERE course_id = ( SELECT Min(course_id+1)  FROM 1egquiz_courses  );";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res.status(500).send("Error retrieving data from database.");
      return;
    }
    console.log("Retrieved data from test table:");
    console.log(results);
    // Send the retrieved data as JSON response
    res.json(results);
  });
});

app.get("/coursesmba", (req, res) => {
  // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
  const query =
    "SELECT course_name FROM 1egquiz_courses WHERE course_id = ( SELECT max(course_id-1)  FROM 1egquiz_courses  );";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res.status(500).send("Error retrieving data from database.");
      return;
    }
    console.log("Retrieved data from test table:");
    console.log(results);
    // Send the retrieved data as JSON response
    res.json(results);
  });
});
app.get("/coursesca", (req, res) => {
  // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
  const query =
    "SELECT course_name FROM 1egquiz_courses WHERE course_id = ( SELECT max(course_id)  FROM 1egquiz_courses  );";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res.status(500).send("Error retrieving data from database.");
      return;
    }
    console.log("Retrieved data from test table:");
    console.log(results);
    // Send the retrieved data as JSON response
    res.json(results);
  });
});

// --------------------------------------login -----------------------------------------------------

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const checkEmailQuery = "SELECT * FROM log WHERE email = ?";
    db.query(checkEmailQuery, [email], async (error, results) => {
      if (error) {
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      if (results.length > 0) {
        res.status(400).json({ error: "User already exists with this email" });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10); // Hash password
      const defaultRole = "viewer";

      const insertQuery =
        "INSERT INTO log (username, email, password, role) VALUES (?, ?, ?, ?)";
      db.query(
        insertQuery,
        [username, email, hashedPassword, defaultRole],
        (err, result) => {
          if (err) {
            res.status(500).json({ error: "Failed to register user" });
            return;
          }
          res.status(201).json({ message: "User registered successfully" });
        }
      );
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = "SELECT * FROM log WHERE email = ?";
    db.query(sql, [email], async (error, results) => {
      if (error || results.length === 0) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const user = results[0];
      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const token = jwt.sign({ id: user.id }, "your_secret_key", {
        expiresIn: "1h",
      });
      const { id, email, role } = user;
      res.status(200).json({ token, user: { id, email, role } });
    });
    console.log(`${email}`);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Profile endpoint
app.get("/profile/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const sql = "SELECT * FROM log WHERE id = ?";
    db.query(sql, [userId], (error, results) => {
      if (error || results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const user = results[0];
      // Send user profile details
      res.status(200).json(user);
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// user details by ID
app.get("/userdetails/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM log WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.get("/user", async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      res.status(401).json({ error: "Unauthorized" });
      return;
    }

    const token = authHeader.split(" ")[1]; // Extract token from Authorization header
    const decodedToken = jwt.verify(token, "your_secret_key"); // Verify and decode the token

    const userId = decodedToken.id; // Get user ID from decoded token
    const sql = "SELECT id, username, email FROM log WHERE id = ?";
    db.query(sql, [userId], (error, results) => {
      if (error || results.length === 0) {
        res.status(404).json({ error: "User not found" });
        return;
      }

      const userData = results[0];
      res.status(200).json(userData); // Send user data as JSON response
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// ----------------------------------------------------------------------------------

// ----------------------------------------------------------------------------------

app.get("/sigleuserdetails/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM users WHERE id = ?"; // Replace 'users' with your table name

  db.query(query, [id], (error, results) => {
    if (error) {
      console.error("Error fetching user details:", error);
      res.status(500).json({ message: "Error fetching user details" });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    res.status(200).json(results[0]);
  });
});

app.put("/users/:id", async (req, res) => {
  const id = req.params.id; // Extract the userId from request params
  const { email, username, password, role } = req.body;

  try {
    // Hash the password if a new password is provided
    let hashedPassword = password; // Use the provided password as default

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user details with hashed password
    db.query(
      "UPDATE users SET email = ?, username = ?, password = ?, role = ? WHERE id = ?",
      [email, username, hashedPassword, role, id],
      (err, result) => {
        if (err) {
          console.error("Error updating user:", err);
          res.status(500).send("Error updating user");
        } else {
          console.log("User updated successfully");
          res.status(200).send("User updated successfully");
        }
      }
    );
  } catch (error) {
    console.error("Error during user update:", error);
    res.status(500).send("Error updating user");
  }
});

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM log WHERE id = ? ";

  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
app.get("/act_info", (req, res) => {
  // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
  const query = "SELECT  * FROM log ";

  db.query(query, (error, results) => {
    if (error) {
      console.error("Error executing query: " + error.stack);
      res.status(500).send("Error retrieving data from database.");
      return;
    }
    console.log("Retrieved data from test table:");
    console.log(results);
    // Send the retrieved data as JSON response
    res.json(results);
  });
});

// --------------------------------------login end -----------------------------------------------------

// ----------------------------------------------------------================================  courses ug function by sra1 ========================================--------------------------------------------------------

// ----------------------------------------EGRAD WEBSITE ADMIN IMAGES UPLOADER--------------------

// ---------------------------------- R------------------
app.get("/UGhomepageadimcourses", (req, res) => {
  const query = "SELECT course_name, course_id FROM courses";
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
// ---------section ---
app.get("/UGhomepageadimsections/:course_id", (req, res) => {
  const course_id = req.params.course_id;
  const sql = "SELECT * FROM  sections_admin WHERE course_id = ? ";
  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error("Error querying the database: " + err.message);
      res.status(500).json({ error: "Error fetching exams" });
      return;
    }
    res.json(result);
  });
});


//----------------exams

app.get("/UGhomepageadimexams/:course_id", (req, res) => {
  const course_id = req.params.course_id;
  const sql = "SELECT * FROM  2egquiz_exam WHERE course_id = ?";
  db.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error("Error querying the database: " + err.message);
      res.status(500).json({ error: "Error fetching exams" });
      return;
    }
    res.json(result);
  });
});

// ----------------upload api

async function getAvailableDiskSpace() {
  const drive = path.parse(__dirname).root;
  const info = await diskusage.check(drive);
  return info.available;
}

db.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL");
  }
});
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploadFiles");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      file.fieldname + "_" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});


app.post("/upload", upload.single("image"), (req, res) => {
  const uploadedFile = req.file;
  // Retrieve values from req.body
  const courseId = req.body.course_id;
  const sectionId = req.body.section_id;
  const examId = req.body.exam_id;
  // Read the file content using fs
  fs.readFile(uploadedFile.path, (err, data) => {
    if (err) {
      console.error("Error reading file:", err);
      return res.status(500).json({ message: "Error reading file" });
    }

    // Use the file content as a Buffer for image-size
    const dimensions = sizeOf(data);

    // Rename the file to the original name
    const newPath = path.join(
      uploadedFile.destination,
      uploadedFile.originalname
    );

    fs.rename(uploadedFile.path, newPath, (err) => {
      if (err) {
        console.error("Error renaming file:", err);
        return res.status(500).json({ message: "Error renaming file" });
      }

      const imageBuffer = Buffer.from(data);

      // Modify the query to include the original filename in image_title
      let query;
      let values;

      if (examId) {
        query =
          "INSERT INTO images (image_title, image_data, course_id, section_id, exam_id) VALUES (?, ?, ?, ?,?)";
        values = [
          uploadedFile.originalname,
          imageBuffer,
          courseId,
          sectionId,
          examId,
        ];
      } else {
        query =
          "INSERT INTO images (image_title, image_data, course_id, section_id) VALUES (?, ?, ?,?)";
        values = [uploadedFile.originalname, imageBuffer, courseId, sectionId];
      }

      db.query(query, values, (err, result) => {
        if (err) {
          console.error("Error uploading image:", err);
          return res.status(500).json({ message: "Error uploading image" });
        }

        console.log("File uploaded and renamed successfully");
        res.json({ message: "Image uploaded successfully" });
      });
    });
  });
});


// main working code
app.delete("/HomeImages/:images_id", (req, res) => {
  const idToDelete = parseInt(req.params.images_id);

  // Fetch the image data from the database to get the image title
  const query = "SELECT image_title FROM images WHERE images_id = ?";
  db.query(query, [idToDelete], (err, result) => {
    if (err) {
      console.error("Error fetching image data:", err);
      res.status(500).send("Internal Server Error");
      return;
    }

    if (result.length === 0) {
      res.status(404).send("Image not found");
      return;
    }

    const imageTitle = result[0].image_title;

    // Delete the image record from the database
    const deleteQuery = "DELETE FROM images WHERE images_id = ?";
    db.query(deleteQuery, [idToDelete], (deleteErr, deleteResult) => {
      if (deleteErr) {
        console.error("Error deleting image:", deleteErr);
        res.status(500).send("Internal Server Error");
        return;
      }

      if (deleteResult.affectedRows > 0) {
        // Delete the corresponding file from the server's uploadFiles directory
        const filePath = path.join(__dirname, "uploadFiles", imageTitle);
        fs.unlink(filePath, (unlinkErr) => {
          if (unlinkErr) {
            console.error("Error deleting file:", unlinkErr);
            res.status(500).send("Error deleting file");
          } else {
            console.log("File deleted successfully");
            res.status(200).send("Image and file deleted successfully");
          }
        });
      } else {
        res.status(404).send("Image not found");
      }
    });
  });
});

app.get("/ImageTitle", (req, res) => {
  const query = "SELECT images_id, image_title FROM images";
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
// ----------------------------------------EGRAD WEBSITE ADMIN IMAGES UPLOADER--------------------

// -----------------------------------end sravan----------------------------

// -----------------------------------h------------------------------------

//_________________________________________________FRONT END_______________________________________

app.get("/examData", async (req, res) => {
  // FetchData
  try {
    const [rows] = db.query("SELECT * FROM exams");
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
      "SELECT t2.instructionHeading, t2.points, cct.examid, tct.courseCreationId FROM instruction t1 JOIN instructions_points t2 ON t1.instructionid = t2.instructionid JOIN course_creation_table cct ON t1.examid = cct.examid JOIN test_creation_table tct ON cct.courseCreationId = tct.courseCreationId WHERE t1.examid = ?;",
      [examid]
    );
    res.json(instructionsRows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/subjects/:testCreationTableId", async (req, res) => {
  const { testCreationTableId } = req.params;
  try {
    // Fetch instructions from the database based on testCreationTableId
    // const [subjects] = await db.query(
    //   'SELECT subjects.subjectName,subjects.subjectId FROM test_creation_table JOIN course_creation_table ON test_creation_table.courseCreationId = course_creation_table.courseCreationId JOIN course_subjects ON course_creation_table.courseCreationId = course_subjects.courseCreationId JOIN Subjects ON course_subjects.subjectId = Subjects.subjectId WHERE test_creation_table.testCreationTableId = ?',
    //   [testCreationTableId]
    // );

    const [subjects] = await db.query(
      "SELECT subjects.subjectName,subjects.subjectId FROM test_creation_table JOIN course_creation_table ON test_creation_table.courseCreationId = course_creation_table.courseCreationId JOIN course_subjects ON course_creation_table.courseCreationId = course_subjects.courseCreationId JOIN Subjects ON course_subjects.subjectId = Subjects.subjectId WHERE test_creation_table.testCreationTableId = ?",
      [testCreationTableId]
    );
    res.json(subjects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
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
    const { subjectId } = req.params;
    const [rows] = await db.query("SELECT * FROM subjects WHERE subjectId=?", [
      subjectId,
    ]);
    res.json(rows);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/subjectData/:courseCreationId", async (req, res) => {
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

app.get("/subjectData/:testCreationTableId", async (req, res) => {
  // FetchData
  try {
    const { testCreationTableId } = req.params;
    const [rows] = await db.query(
      " SELECT DISTINCT subjectId FROM course_subjects JOIN test_creation_table ON course_subjects.courseCreationId = test_creation_table.courseCreationId WHERE test_creation_table.testCreationTableId  = ?;",
      [testCreationTableId]
    );
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
    const testData = await getDataByTestCreationTableId(testCreationTableId);

    // Fetch question data based on subjectId and document_Id
    const questions = await getQuestionsBySubjectAndDocumentId(
      subjectId,
      testCreationTableId
    );

    // Fetch option data based on questions and document_Id
    const options = await getOptionsByQuestionsAndDocumentId(
      questions,
      testCreationTableId
    );

    // Fetch solution data based on questions and document_Id
    const solutions = await getSolutionsByQuestionsAndDocumentId(
      questions,
      testCreationTableId
    );

    res.json({
      testData,
      questions,
      options,
      solutions,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("Error fetching data from the database.");
  }
});
// Reusable function to get data from testCreationTableId table
async function getDataByTestCreationTableId(testCreationTableId) {
  try {
    const query = `
      SELECT *
      FROM test_creation_table
      WHERE testCreationTableId = ?  
    `;
    const [results] = await db.query(query, [testCreationTableId]);

    return results; // Adjust this based on your actual table structure
  } catch (err) {
    console.error(`Error fetching data from test_creation_table: ${err}`);
    throw err;
  }
}

// Reusable function to get questions data based on subjectId and document_Id
async function getQuestionsBySubjectAndDocumentId(
  subjectId,
  testCreationTableId
) {
  try {
    const query = `
      SELECT question_id, question_img
      FROM questions
      WHERE subjectId = ? AND testCreationTableId = ?  
    `;
    const [results] = await db.query(query, [subjectId, testCreationTableId]);
    const optionsWithBase64 = results.map((option) => ({
      question_id: option.question_id,
      question_img: option.question_img.toString("base64"),
    }));
    return optionsWithBase64;
  } catch (err) {
    console.error(`Error fetching questions: ${err}`);
    throw err;
  }
}

// Reusable function to get options data based on questions and document_Id
async function getOptionsByQuestionsAndDocumentId(
  questions,
  testCreationTableId
) {
  try {
    const questionIds = questions.map((question) => question.question_id);
    const query = `
    SELECT question_id, option_img
    FROM options
    WHERE question_id IN (?)
    `;
    const [results] = await db.query(query, [questionIds, testCreationTableId]);

    // Convert BLOB data to base64 for sending in the response
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

// Reusable function to get solutions data based on questions and document_Id
async function getSolutionsByQuestionsAndDocumentId(
  questions,
  testCreationTableId
) {
  try {
    const questionIds = questions.map((question) => question.question_id);
    const query = `
      SELECT question_id, solution_img
      FROM solution
      WHERE question_id IN (?)
    `;
    const [results] = await db.query(query, [questionIds, testCreationTableId]);

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
