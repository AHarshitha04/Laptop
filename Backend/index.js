// const express = require("express");
// const multer = require("multer");
// const cors = require("cors");
// const mysql = require("mysql");
// const bcrypt = require('bcrypt');
// const fs = require("fs");
// const app = express();
// const path = require("path");
// const jwt = require('jsonwebtoken');
// const sizeOf = require("image-size");
// // const diskusage = require("diskusage");
// app.use(express.static("public"));
// const bodyParser = require("body-parser");
// const { register } = require("module");
// const port = 5001;
// app.use(cors());

// // ------------------------------------------------------------------- databse Connection  ------------------------------------------------------------------------

// const db1 = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "admin_project",
// });
// app.use(bodyParser.json());
// // app.use(cors(corsOptions));
// app.use(cors({ origin: "*" }));

// db1.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//   } else {
//     console.log("Connected to MySQL");
//   }
// });

// // ------------------------------------------------------------------- databse Connection finish ------------------------------------------------------------------------

// app.get("/courses", (req, res) => {
//   const query = "SELECT course_name,course_id FROM courses";
//   db1.query(query, (error, results) => {
//     if (error) {
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error retrieving data from the database.");
//       return;
//     }
//     console.log("Retrieved data from test table:");
//     console.log(results);
//     res.json(results);
//   });
// });

// app.get("/quiz_exams/:course_id", (req, res) => {
//   const course_id = req.params.course_id;
//   // const section_id = req.params.section_id;
//   const sql = "SELECT * FROM exams WHERE course_id = ?";
//   db1.query(sql, [course_id], (err, result) => {
//     if (err) {
//       console.error("Error querying the database: " + err.message);
//       res.status(500).json({ error: "Error fetching exams" });
//       return;
//     }
//     res.json(result);
//   });
// });

// app.get("/sections/:course_id", (req, res) => {
//   const course_id = req.params.course_id;
//   const sql = "SELECT * FROM sections WHERE course_id = ? ";
//   db1.query(sql, [course_id], (err, result) => {
//     if (err) {
//       console.error("Error querying the database: " + err.message);
//       res.status(500).json({ error: "Error fetching exams" });
//       return;
//     }
//     res.json(result);
//   });
// });

// // const storage = multer.memoryStorage(); // Store the image in memory as a Buffer
// // const upload = multer({ storage: storage });

// // main original code
// // app.post("/upload", upload.single("image"), (req, res) => {
// //   const image = req.file.buffer;
// //   const courseId = req.body.course_id; // Assuming you are sending the course_id in the request body
// //   const sectionId = req.body.section_id;

// //   if (!courseId || !sectionId) {
// //     return res.status(400).json({ message: "Course ID is required" });
// //   }

// //   // Modify the query to include course_id
// //   const query =
// //     "INSERT INTO main_page_images (image_data, course_id, section_id ) VALUES (?, ?,?)";
// //   const values = [image, courseId, sectionId];

// //   db1.query(query, values, (err, result) => {
// //     if (err) {
// //       console.error("Error uploading image:", err);
// //       res.status(500).json({ message: "Error uploading image" });
// //     } else {
// //       res.json({ message: "Image uploaded successfully" });
// //     }
// //   });
// // });

// // main original code
// // app.post("/upload", upload.single("image"), (req, res) => {
// //   const image = req.file.buffer;
// //   const courseId = req.body.course_id; // Assuming you are sending the course_id in the request body
// //   const sectionId = req.body.section_id;
// //   const examId = req.body.exam_id; // Assuming you are sending the exam_id in the request body

// //   if (!courseId || !sectionId) {
// //     return res.status(400).json({ message: "Course ID and Section ID are required" });
// //   }

// //   // Modify the query to include course_id and section_id
// //   let query;
// //   let values;

// //   if (examId) {
// //     // If exam_id is present, include it in the query
// //     query =
// //       "INSERT INTO main_page_images (image_data, course_id, section_id, exam_id) VALUES (?, ?, ?, ?)";
// //     values = [image, courseId, sectionId, examId];
// //   } else {
// //     // If exam_id is not present, exclude it from the query
// //     query =
// //       "INSERT INTO main_page_images (image_data, course_id, section_id) VALUES (?, ?, ?)";
// //     values = [image, courseId, sectionId];
// //   }

// //   db1.query(query, values, (err, result) => {
// //     if (err) {
// //       console.error("Error uploading image:", err);
// //       res.status(500).json({ message: "Error uploading image" });
// //     } else {
// //       res.json({ message: "Image uploaded successfully" });
// //     }
// //   });
// // });

// // app.post("/upload", upload.single("image"), (req, res) => {
// //   const image = req.file.buffer;
// //   const courseId = req.body.course_id;
// //   const sectionId = req.body.section_id;
// //   const examId = req.body.exam_id;

// //   if (!courseId || !sectionId) {
// //     return res.status(400).json({ message: "Course ID and Section ID are required" });
// //   }

// //   const isUGMainPage = courseId === "UG" && sectionId === "UG Main Page";
// //   const isUGExploreExam = courseId === "UG" && sectionId === "UG Explore Exam";
// //   const isPGMainPage = courseId === "PG" && sectionId === "PG Main Page";
// //   const isPGExploreExam = courseId === "PG" && sectionId === "PG Explore Exam";
// //   const isUGCourseExam = courseId === "UG" && sectionId === "UG Course Exam";
// //   const isPGCourseExam = courseId === "PG" && sectionId === "PG Course Exam";

// //   if ((isUGMainPage || isUGExploreExam || isPGMainPage || isPGExploreExam) && !examId) {
// //     // Modify the query to include course_id and section_id
// //     const query =
// //       "INSERT INTO main_page_images (image_data, course_id, section_id) VALUES (?, ?, ?)";
// //     const values = [image, courseId, sectionId];

// //     db1.query(query, values, (err, result) => {
// //       if (err) {
// //         console.error("Error uploading image:", err);
// //         res.status(500).json({ message: "Error uploading image" });
// //       } else {
// //         res.json({ message: "Image uploaded successfully" });
// //       }
// //     });
// //   } else if ((isUGCourseExam || isPGCourseExam) && examId) {
// //     // Modify the query to include course_id, section_id, and exam_id
// //     const query =
// //       "INSERT INTO course_exam_images (image_data, course_id, section_id, exam_id) VALUES (?, ?, ?, ?)";
// //     const values = [image, courseId, sectionId, examId];

// //     db1.query(query, values, (err, result) => {
// //       if (err) {
// //         console.error("Error uploading image:", err);
// //         res.status(500).json({ message: "Error uploading image" });
// //       } else {
// //         res.json({ message: "Image uploaded successfully" });
// //       }
// //     });
// //   } else {
// //     res.status(403).json({ message: "Image upload is only allowed for specified sections" });
// //   }
// // });

// //ORIGINAL CODE
// // app.get("/images", (req, res) => {
// //   const query = "SELECT * FROM main_page_images";

// //   db1.query(query, (error, results) => {
// //     if (error) {
// //       console.error("Error fetching images:", error);
// //       res.status(500).send("Internal Server Error");
// //     } else {
// //       const imageDataList = results.map((result) => {
// //         // Use the correct column name based on your table structure
// //         const base64 = result.image_data.toString("base64");
// //         return `data:image/png;base64,${base64}`;
// //       });
// //       res.json(imageDataList);
// //     }
// //   });
// // });
// // app.delete("/HomeImages/:images_id", (req, res) => {
// //   const idToDelete = parseInt(req.params.images_id);

// //   // Fetch the image data from the database to get the image title
// //   const query = "SELECT image_title FROM images WHERE images_id = ?";
// //   db1.query(query, [idToDelete], (err, result) => {
// //     if (err) {
// //       console.error("Error fetching image data:", err);
// //       res.status(500).send("Internal Server Error");
// //       return;
// //     }

// //     if (result.length === 0) {
// //       res.status(404).send("Image not found");
// //       return;
// //     }

// //     const imageTitle = result[0].image_title;

// //     // Delete the image record from the database
// //     const deleteQuery = "DELETE FROM images WHERE images_id = ?";
// //     db1.query(deleteQuery, [idToDelete], (deleteErr, deleteResult) => {
// //       if (deleteErr) {
// //         console.error("Error deleting image:", deleteErr);
// //         res.status(500).send("Internal Server Error");
// //         return;
// //       }

// //       if (deleteResult.affectedRows > 0) {
// //         // Delete the corresponding file from the server's uploadFiles directory
// //         const filePath = path.join(__dirname, "uploadFiles", imageTitle);
// //         fs.unlink(filePath, (unlinkErr) => {
// //           if (unlinkErr) {
// //             console.error("Error deleting file:", unlinkErr);
// //             res.status(500).send("Error deleting file");
// //           } else {
// //             console.log("File deleted successfully");
// //             res.status(200).send("Image and file deleted successfully");
// //           }
// //         });
// //       } else {
// //         res.status(404).send("Image not found");
// //       }
// //     });
// //   });
// // });

// app.delete("/HomeImages/:images_id", (req, res) => {
//   const imageId = req.params.images_id;
//   const q = "DELETE FROM images WHERE images_id = ?";

//   db1.query(q, [imageId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });

// app.get("/HomeImagesadmin", (req, res) => {
//   const query = "SELECT images_id, image_data FROM images";
//   db1.query(query, (err, results) => {
//     if (err) {
//       console.error("Error fetching images:", err);
//       res.status(500).send("Internal Server Error");
//     } else {
//       const imageArray = results.map((result) => {
//         const base64 = result.image_data.toString("base64");
//         return {
//           id: result.images_id,
//           imageData: `data:image/png;base64,${base64}`,
//         };
//       });

//       res.json(imageArray);
//     }
//   });
// });

// app.get("/HomeImages", (req, res) => {
//   const query = "SELECT * FROM images WHERE section_id=1 ;";

//   db1.query(query, (error, results) => {
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

// app.get("/ExploreExam", (req, res) => {
//   const query = "SELECT * FROM images WHERE section_id=2;";

//   db1.query(query, (error, results) => {
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

// app.get("/ExamBanners", (req, res) => {
//   const query = "SELECT * FROM images WHERE exam_id=201;";

//   db1.query(query, (error, results) => {
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

// app.get("/NeetExamBanners", (req, res) => {
//   const query = "SELECT * FROM images WHERE exam_id=202;";

//   db1.query(query, (error, results) => {
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

// app.get("/BitsatExamBanners", (req, res) => {
//   const query = "SELECT * FROM images WHERE exam_id=203;";

//   db1.query(query, (error, results) => {
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

// app.get("/ApEapcetBanners", (req, res) => {
//   const query = "SELECT * FROM images WHERE exam_id=205;";

//   db1.query(query, (error, results) => {
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

// app.get("/TsEamcetBanners", (req, res) => {
//   const query = "SELECT * FROM images WHERE exam_id=211;";

//   db1.query(query, (error, results) => {
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

// // ----------------------------------------------------------================================  courses ug function by sra1 ========================================--------------------------------------------------------

// app.get("/examsug", (req, res) => {
//   const course_id = req.params.course_id;
//   // const sql = "SELECT exam_name FROM 2egquiz_exam WHERE exam_name=UG";
//   const sql =
//     "SELECT exam_name FROM 2egquiz_exam WHERE course_id = ( SELECT Min(course_id)  FROM 2egquiz_exam  );";
//   db1.query(sql, [course_id], (err, result) => {
//     if (err) {
//       console.error("Error querying the database: " + err.message);
//       res.status(500).json({ error: "Error fetching exams" });
//       return;
//     }
//     res.json(result);
//   });
// });

// app.get("/examspg", (req, res) => {
//   const course_id = req.params.course_id;
//   // const sql = "SELECT exam_name FROM 2egquiz_exam WHERE exam_name=UG";
//   const sql =
//     "SELECT exam_name FROM 2egquiz_exam WHERE course_id = ( SELECT Min(course_id+1)  FROM 2egquiz_exam  );";
//   db1.query(sql, [course_id], (err, result) => {
//     if (err) {
//       console.error("Error querying the database: " + err.message);
//       res.status(500).json({ error: "Error fetching exams" });
//       return;
//     }
//     res.json(result);
//   });
// });
// app.get("/examsmba", (req, res) => {
//   const course_id = req.params.course_id;
//   // const sql = "SELECT exam_name FROM 2egquiz_exam WHERE exam_name=UG";
//   const sql =
//     "SELECT exam_name FROM 2egquiz_exam WHERE course_id = ( SELECT Min(course_id+2)  FROM 2egquiz_exam  );";
//   db1.query(sql, [course_id], (err, result) => {
//     if (err) {
//       console.error("Error querying the database: " + err.message);
//       res.status(500).json({ error: "Error fetching exams" });
//       return;
//     }
//     res.json(result);
//   });
// });
// app.get("/examsca", (req, res) => {
//   const course_id = req.params.course_id;
//   // const sql = "SELECT exam_name FROM 2egquiz_exam WHERE exam_name=UG";
//   const sql =
//     "SELECT exam_name FROM 2egquiz_exam WHERE course_id = ( SELECT Min(course_id+3)  FROM 2egquiz_exam  );";
//   db1.query(sql, [course_id], (err, result) => {
//     if (err) {
//       console.error("Error querying the database: " + err.message);
//       res.status(500).json({ error: "Error fetching exams" });
//       return;
//     }
//     res.json(result);
//   });
// });

// app.get("/coursesug", (req, res) => {
//   // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
//   const query =
//     "SELECT course_name FROM 1egquiz_courses WHERE course_id = ( SELECT Min(course_id)  FROM 1egquiz_courses  );";

//   db1.query(query, (error, results) => {
//     if (error) {
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error retrieving data from database.");
//       return;
//     }
//     console.log("Retrieved data from test table:");
//     console.log(results);
//     // Send the retrieved data as JSON response
//     res.json(results);
//   });
// });

// app.get("/coursescurrentug", (req, res) => {
//   // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
//   const query =
//     "SELECT course_name FROM 1egquiz_courses WHERE course_id = ( SELECT Max(course_id)  FROM 1egquiz_courses  );";

//   db1.query(query, (error, results) => {
//     if (error) {
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error retrieving data from database.");
//       return;
//     }
//     console.log("Retrieved data from test table:");
//     console.log(results);
//     // Send the retrieved data as JSON response
//     res.json(results);
//   });
// });

// app.get("/coursespg", (req, res) => {
//   // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
//   const query =
//     "SELECT course_name FROM 1egquiz_courses WHERE course_id = ( SELECT Min(course_id+1)  FROM 1egquiz_courses  );";

//   db1.query(query, (error, results) => {
//     if (error) {
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error retrieving data from database.");
//       return;
//     }
//     console.log("Retrieved data from test table:");
//     console.log(results);
//     // Send the retrieved data as JSON response
//     res.json(results);
//   });
// });

// app.get("/coursesmba", (req, res) => {
//   // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
//   const query =
//     "SELECT course_name FROM 1egquiz_courses WHERE course_id = ( SELECT max(course_id-1)  FROM 1egquiz_courses  );";

//   db1.query(query, (error, results) => {
//     if (error) {
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error retrieving data from database.");
//       return;
//     }
//     console.log("Retrieved data from test table:");
//     console.log(results);
//     // Send the retrieved data as JSON response
//     res.json(results);
//   });
// });
// app.get("/coursesca", (req, res) => {
//   // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
//   const query =
//     "SELECT course_name FROM 1egquiz_courses WHERE course_id = ( SELECT max(course_id)  FROM 1egquiz_courses  );";

//   db1.query(query, (error, results) => {
//     if (error) {
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error retrieving data from database.");
//       return;
//     }
//     console.log("Retrieved data from test table:");
//     console.log(results);
//     // Send the retrieved data as JSON response
//     res.json(results);
//   });
// });

// // --------------------------------------login -----------------------------------------------------

// app.post('/register', async (req, res) => {
//   const { username, email, password } = req.body;

//   try {
//     // Check if the email already exists in the database
//     const checkEmailQuery = 'SELECT * FROM log WHERE email = ?';
//     db1.query(checkEmailQuery, [email], async (error, results) => {
//       if (error) {
//         res.status(500).json({ error: 'Internal server error' });
//         return;
//       }

//       if (results.length > 0) {
//         res.status(400).json({ error: 'User already exists with this email' });
//         return;
//       }

//       const hashedPassword = await bcrypt.hash(password, 10); // Hash password
//       const defaultRole = 'viewer';

//       const insertQuery = 'INSERT INTO log (username, email, password, role) VALUES (?, ?, ?, ?)';
//       db1.query(insertQuery, [username, email, hashedPassword, defaultRole], (err, result) => {
//         if (err) {
//           res.status(500).json({ error: 'Failed to register user' });
//           return;
//         }
//         res.status(201).json({ message: 'User registered successfully' });
//       });
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// app.post('/login', async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const sql = 'SELECT * FROM log WHERE email = ?';
//     db1.query(sql, [email], async (error, results) => {
//       if (error || results.length === 0) {
//         res.status(401).json({ error: 'Invalid credentials' });
//         return;
//       }

//       const user = results[0];
//       const passwordMatch = await bcrypt.compare(password, user.password);

//       if (!passwordMatch) {
//         res.status(401).json({ error: 'Invalid credentials' });
//         return;
//       }

//       const token = jwt.sign({ id: user.id }, 'your_secret_key', { expiresIn: '1h' });
//       const { id, email, role } = user;
//       res.status(200).json({ token, user: { id, email, role } });
//     });
//     console.log(`${email}`)
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // Profile endpoint
// app.get('/profile/:userId', async (req, res) => {
//   const userId = req.params.userId;

//   try {
//     const sql = 'SELECT * FROM log WHERE id = ?';
//     db1.query(sql, [userId], (error, results) => {
//       if (error || results.length === 0) {
//         res.status(404).json({ error: 'User not found' });
//         return;
//       }

//       const user = results[0];
//       // Send user profile details
//       res.status(200).json(user);
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // user details by ID
// app.get("/userdetails/:id", (req, res) => {
//   const id = req.params.id;
//   db1.query("SELECT * FROM log WHERE id = ?", id, (err, result) => {
//     if (err) {
//       console.log(err);
//     } else {
//       res.send(result);
//     }
//   });
// });

// app.get('/user', async (req, res) => {
//   try {
//     const authHeader = req.headers.authorization;
//     if (!authHeader || !authHeader.startsWith('Bearer ')) {
//       res.status(401).json({ error: 'Unauthorized' });
//       return;
//     }

//     const token = authHeader.split(' ')[1]; // Extract token from Authorization header
//     const decodedToken = jwt.verify(token, 'your_secret_key'); // Verify and decode the token

//     const userId = decodedToken.id; // Get user ID from decoded token
//     const sql = 'SELECT id, username, email FROM log WHERE id = ?';
//     db1.query(sql, [userId], (error, results) => {
//       if (error || results.length === 0) {
//         res.status(404).json({ error: 'User not found' });
//         return;
//       }

//       const userData = results[0];
//       res.status(200).json(userData); // Send user data as JSON response
//     });
//   } catch (error) {
//     res.status(500).json({ error: 'Internal server error' });
//   }
// });

// // ----------------------------------------------------------------------------------

// // ----------------------------------------------------------------------------------

// // app.get("/sigleuserdetails/:id", (req, res) => {
// //   const id = req.params.id;
// //   const sql="SELECT * FROM users WHERE id = ?"

// //   db1.query(sql,[id],(err,result)=>{
// //     if(err)return res.json({status:false});
// //     return res.json(result)
// //   })

// // });

// app.get('/sigleuserdetails/:id', (req, res) => {
//   const { id } = req.params;

//   const query = 'SELECT * FROM users WHERE id = ?'; // Replace 'users' with your table name

//   db1.query(query, [id], (error, results) => {
//     if (error) {
//       console.error('Error fetching user details:', error);
//       res.status(500).json({ message: 'Error fetching user details' });
//       return;
//     }

//     if (results.length === 0) {
//       res.status(404).json({ message: 'User not found' });
//       return;
//     }

//     res.status(200).json(results[0]);
//   });
// });

// app.put('/users/:id', async (req, res) => {
//   const id = req.params.id; // Extract the userId from request params
//   const { email, username, password, role } = req.body;

//   try {
//     // Hash the password if a new password is provided
//     let hashedPassword = password; // Use the provided password as default

//     if (password) {
//       hashedPassword = await bcrypt.hash(password, 10);
//     }

//     // Update user details with hashed password
//     db1.query('UPDATE users SET email = ?, username = ?, password = ?, role = ? WHERE id = ?', [email, username, hashedPassword, role, id], (err, result) => {
//       if (err) {
//         console.error('Error updating user:', err);
//         res.status(500).send('Error updating user');
//       } else {
//         console.log('User updated successfully');
//         res.status(200).send('User updated successfully');
//       }
//     });
//   } catch (error) {
//     console.error('Error during user update:', error);
//     res.status(500).send('Error updating user');
//   }
// });

// app.delete("/users/:id", (req, res) => {
//   const userId = req.params.id;
//   const q = " DELETE FROM log WHERE id = ? ";

//   db1.query(q, [userId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });
// app.get("/act_info", (req, res) => {
//   // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
//   const query =
//     "SELECT  * FROM log ";

//   db1.query(query, (error, results) => {
//     if (error) {
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error retrieving data from database.");
//       return;
//     }
//     console.log("Retrieved data from test table:");
//     console.log(results);
//     // Send the retrieved data as JSON response
//     res.json(results);
//   });
// });

// // --------------------------------------login end -----------------------------------------------------

// // ----------------------------------------------------------================================  courses ug function by sra1 ========================================--------------------------------------------------------

// // ---------------------------------- R------------------
// app.get("/UGhomepageadimcourses", (req, res) => {
//   const query = "SELECT course_name, course_id FROM courses";
//   db1.query(query, (error, results) => {
//     if (error) {
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error retrieving data from the database.");
//       return;
//     }
//     console.log("Retrieved data from test table:");
//     console.log(results);
//     res.json(results);
//   });
// });

// // ---------section ---
// app.get("/UGhomepageadimsections/:course_id", (req, res) => {
//   const course_id = req.params.course_id;
//   const sql = "SELECT * FROM  sections_admin WHERE course_id = ? ";
//   db1.query(sql, [course_id], (err, result) => {
//     if (err) {
//       console.error("Error querying the database: " + err.message);
//       res.status(500).json({ error: "Error fetching exams" });
//       return;
//     }
//     res.json(result);
//   });
// });

// //----------------exams

// app.get("/UGhomepageadimexams/:course_id", (req, res) => {
//   const course_id = req.params.course_id;
//   const sql = "SELECT * FROM  2egquiz_exam WHERE course_id = ?";
//   db1.query(sql, [course_id], (err, result) => {
//     if (err) {
//       console.error("Error querying the database: " + err.message);
//       res.status(500).json({ error: "Error fetching exams" });
//       return;
//     }
//     res.json(result);
//   });
// });

// // ----------------upload api

// async function getAvailableDiskSpace() {
//   const drive = path.parse(__dirname).root;
//   const info = await diskusage.check(drive);
//   return info.available;
// }

// db1.connect((err) => {
//   if (err) {
//     console.error("Error connecting to MySQL:", err);
//   } else {
//     console.log("Connected to MySQL");
//   }
// });
// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploadFiles");
//   },
//   filename: (req, file, cb) => {
//     cb(
//       null,
//       file.fieldname + "_" + Date.now() + path.extname(file.originalname)
//     );
//   },
// });

// const upload = multer({
//   storage: storage,
// });

// app.post("/upload", upload.single("image"), (req, res) => {
//   const uploadedFile = req.file;
//   // Retrieve values from req.body
//   const courseId = req.body.course_id;
//   const sectionId = req.body.section_id;
//   const examId = req.body.exam_id;
//   // Read the file content using fs
//   fs.readFile(uploadedFile.path, (err, data) => {
//     if (err) {
//       console.error("Error reading file:", err);
//       return res.status(500).json({ message: "Error reading file" });
//     }

//     // Use the file content as a Buffer for image-size
//     const dimensions = sizeOf(data);

//     // Rename the file to the original name
//     const newPath = path.join(
//       uploadedFile.destination,
//       uploadedFile.originalname
//     );

//     fs.rename(uploadedFile.path, newPath, (err) => {
//       if (err) {
//         console.error("Error renaming file:", err);
//         return res.status(500).json({ message: "Error renaming file" });
//       }

//       const imageBuffer = Buffer.from(data);

//       // Modify the query to include the original filename in image_title
//       let query;
//       let values;

//       if (examId) {
//         query =
//           "INSERT INTO images (image_title, image_data, course_id, section_id, exam_id) VALUES (?, ?, ?, ?,?)";
//         values = [
//           uploadedFile.originalname,
//           imageBuffer,
//           courseId,
//           sectionId,
//           examId,
//         ];
//       } else {
//         query =
//           "INSERT INTO images (image_title, image_data, course_id, section_id) VALUES (?, ?, ?,?)";
//         values = [uploadedFile.originalname, imageBuffer, courseId, sectionId];
//       }

//       db1.query(query, values, (err, result) => {
//         if (err) {
//           console.error("Error uploading image:", err);
//           return res.status(500).json({ message: "Error uploading image" });
//         }

//         console.log("File uploaded and renamed successfully");
//         res.json({ message: "Image uploaded successfully" });
//       });
//     });
//   });
// });

// // main working code
// app.delete("/HomeImages/:images_id", (req, res) => {
//   const idToDelete = parseInt(req.params.images_id);

//   // Fetch the image data from the database to get the image title
//   const query = "SELECT image_title FROM images WHERE images_id = ?";
//   db1.query(query, [idToDelete], (err, result) => {
//     if (err) {
//       console.error("Error fetching image data:", err);
//       res.status(500).send("Internal Server Error");
//       return;
//     }

//     if (result.length === 0) {
//       res.status(404).send("Image not found");
//       return;
//     }

//     const imageTitle = result[0].image_title;

//     // Delete the image record from the database
//     const deleteQuery = "DELETE FROM images WHERE images_id = ?";
//     db1.query(deleteQuery, [idToDelete], (deleteErr, deleteResult) => {
//       if (deleteErr) {
//         console.error("Error deleting image:", deleteErr);
//         res.status(500).send("Internal Server Error");
//         return;
//       }

//       if (deleteResult.affectedRows > 0) {
//         // Delete the corresponding file from the server's uploadFiles directory
//         const filePath = path.join(__dirname, "uploadFiles", imageTitle);
//         fs.unlink(filePath, (unlinkErr) => {
//           if (unlinkErr) {
//             console.error("Error deleting file:", unlinkErr);
//             res.status(500).send("Error deleting file");
//           } else {
//             console.log("File deleted successfully");
//             res.status(200).send("Image and file deleted successfully");
//           }
//         });
//       } else {
//         res.status(404).send("Image not found");
//       }
//     });
//   });
// });

// app.get("/ImageTitle", (req, res) => {
//   const query = "SELECT images_id, image_title FROM images";
//   db1.query(query, (error, results) => {
//     if (error) {
//       console.error("Error executing query: " + error.stack);
//       res.status(500).send("Error retrieving data from the database.");
//       return;
//     }
//     console.log("Retrieved data from test table:");
//     console.log(results);
//     res.json(results);
//   });
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });

// traile code

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
app.use(cors());

// --------------------------------------------------- databse connection ug admin  ------------------------------------

// const db1 = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "admin_project",
// });
app.use(bodyParser.json());
// app.use(cors(corsOptions));
app.use(cors({ origin: "*" }));

db1.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL db1");
  }
});

// --------------------------------------------------- databse connection finish ------------------------------------

// --------------------------------------------------- ug admin for banners page------------------------------------

// ----------------------------------UGhomepageadimcourses
app.get("/UGhomepageadimcourses", (req, res) => {
  const query = "SELECT course_name, course_id FROM courses";
  db1.query(query, (error, results) => {
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

// ---------UGhomepageadimsections
app.get("/UGhomepageadimsections/:course_id", (req, res) => {
  const course_id = req.params.course_id;
  const sql = "SELECT * FROM  sections_admin WHERE course_id = ? ";
  db1.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error("Error querying the database: " + err.message);
      res.status(500).json({ error: "Error fetching exams" });
      return;
    }
    res.json(result);
  });
});

//---------------- UGhomepageadimexams

app.get("/UGhomepageadimexams/:course_id", (req, res) => {
  const course_id = req.params.course_id;
  const sql = "SELECT * FROM  2egquiz_exam WHERE course_id = ?";
  db1.query(sql, [course_id], (err, result) => {
    if (err) {
      console.error("Error querying the database: " + err.message);
      res.status(500).json({ error: "Error fetching exams" });
      return;
    }
    res.json(result);
  });
});

// ---------------- for upload upload api

async function getAvailableDiskSpace() {
  const drive = path.parse(__dirname).root;
  const info = await diskusage.check(drive);
  return info.available;
}

db1.connect((err) => {
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

      db1.query(query, values, (err, result) => {
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

// for delete uploaded images
app.delete("/HomeImages/:images_id", (req, res) => {
  const idToDelete = parseInt(req.params.images_id);

  // Fetch the image data from the database to get the image title
  const query = "SELECT image_title FROM images WHERE images_id = ?";
  db1.query(query, [idToDelete], (err, result) => {
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
    db1.query(deleteQuery, [idToDelete], (deleteErr, deleteResult) => {
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

// for ImageTitle for uploaded images

app.get("/ImageTitle", (req, res) => {
  const query = "SELECT images_id, image_title FROM images";
  db1.query(query, (error, results) => {
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

app.get("/courses", (req, res) => {
  const query = "SELECT course_name,course_id FROM courses";
  db1.query(query, (error, results) => {
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
  db1.query(sql, [course_id], (err, result) => {
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
  db1.query(sql, [course_id], (err, result) => {
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

  db1.query(q, [imageId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/HomeImagesadmin", (req, res) => {
  const query = "SELECT images_id, image_data FROM images";
  db1.query(query, (err, results) => {
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

  db1.query(query, (error, results) => {
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

  db1.query(query, (error, results) => {
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

  db1.query(query, (error, results) => {
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

  db1.query(query, (error, results) => {
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

  db1.query(query, (error, results) => {
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

  db1.query(query, (error, results) => {
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

  db1.query(query, (error, results) => {
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

// --------------------------------------------------- ug admin for banners finshed ------------------------------------

// --------------------------------------------------- ug quiz home page ------------------------------------

// ------------------------------------- courses ug function by sra1  ------------------------------------

app.get("/examsug", (req, res) => {
  const course_id = req.params.course_id;
  // const sql = "SELECT exam_name FROM 2egquiz_exam WHERE exam_name=UG";
  const sql =
    "SELECT exam_name FROM 2egquiz_exam WHERE course_id = ( SELECT Min(course_id)  FROM 2egquiz_exam  );";
  db1.query(sql, [course_id], (err, result) => {
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
  db1.query(sql, [course_id], (err, result) => {
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
  db1.query(sql, [course_id], (err, result) => {
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
  db1.query(sql, [course_id], (err, result) => {
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

  db1.query(query, (error, results) => {
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

  db1.query(query, (error, results) => {
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

  db1.query(query, (error, results) => {
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

  db1.query(query, (error, results) => {
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

  db1.query(query, (error, results) => {
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

// -------------------------------------- login for ug admin and user -----------------------------------------------------

//------------------- registeration for user
app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the email already exists in the database
    const checkEmailQuery = "SELECT * FROM log WHERE email = ?";
    db1.query(checkEmailQuery, [email], async (error, results) => {
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
      db1.query(
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

//------------------- login for user

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const sql = "SELECT * FROM log WHERE email = ?";
    db1.query(sql, [email], async (error, results) => {
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

//------------------- Profile for user to get logined user data

app.get("/profile/:userId", async (req, res) => {
  const userId = req.params.userId;

  try {
    const sql = "SELECT * FROM log WHERE id = ?";
    db1.query(sql, [userId], (error, results) => {
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

//------------------- userdetails for user to get logined user data
app.get("/userdetails/:id", (req, res) => {
  const id = req.params.id;
  db1.query("SELECT * FROM log WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

//------------------- user for user to get logined user data

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
    db1.query(sql, [userId], (error, results) => {
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

//------------------- sigleuserdetails for user to get logined user data

app.get("/sigleuserdetails/:id", (req, res) => {
  const { id } = req.params;

  const query = "SELECT * FROM users WHERE id = ?"; // Replace 'users' with your table name

  db1.query(query, [id], (error, results) => {
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

//------------------- user to get and update  register detaile by admin

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
    db1.query(
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

//------------------- user to get and delete  register detaile by admin

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM log WHERE id = ? ";

  db1.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

//------------------- user to get and all  register  user detail by admin

app.get("/act_info", (req, res) => {
  // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
  const query = "SELECT  * FROM log ";

  db1.query(query, (error, results) => {
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

// --------------------------------------login end ----------------------------------------------------

// -------------------------------------- this is for ug quiz app admin page ----------------------------------------------------

const db2 = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "admin_project1",
});
app.use(bodyParser.json());
// app.use(cors(corsOptions));
app.use(cors({ origin: "*" }));

db2.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL db2");
  }
});

app.get("/courses/count", async (req, res) => {
  try {
    const query =
      "SELECT COUNT(courseCreationId) AS count FROM course_creation_table";

    db2.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching course count:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching course count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/exam/count", async (req, res) => {
  try {
    const query = "SELECT COUNT(examId) AS count FROM exams";

    db2.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching course count:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching course count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/test/count", async (req, res) => {
  try {
    const query =
      "SELECT COUNT(testCreationTableId) AS count FROM test_creation_table";

    db2.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching course count:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching course count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/question/count", async (req, res) => {
  try {
    const query = "SELECT COUNT(question_id) AS count FROM questions";

    db2.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching course count:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching course count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/subjects", async (req, res) => {
  try {
    const query = "SELECT * FROM subjects";

    db2.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching course count:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching course count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.post("/exams", async (req, res) => {
  // Create exams
  const { examName, startDate, endDate, selectedSubjects } = req.body;

  try {
    const [examResult] = await db2.query(
      "INSERT INTO exams (examName, startDate, endDate) VALUES (?, ?, ?)",
      [examName, startDate, endDate]
    );

    const insertedExamId = examResult.insertId;
    for (const subjectId of selectedSubjects) {
      await db.query(
        "INSERT INTO exam_creation_table (examId, subjectId) VALUES (?, ?)",
        [insertedExamId, subjectId]
      );
    }
    res.json({ message: "Exam created successfully", examId: insertedExamId });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.get("/exams-with-subjects", async (req, res) => {
  try {
    const query =
      "    SELECT e.examId, e.examName, e.startDate, e.endDate, GROUP_CONCAT(s.subjectName) AS subjects    FROM exams AS e    JOIN exam_creation_table AS ec ON e.examId = ec.examId    JOIN subjects AS s ON ec.subjectId = s.subjectId    GROUP BY e.examId";
    db2.query(query, (error, results) => {
      if (error) {
        console.error("Error fetching course count:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }

      res.json(results);
    });
  } catch (error) {
    console.error("Error fetching course count:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

app.put('/exams/:examId/subjects', async (req, res) => {
  const { examId } = req.params;
  const { subjects } = req.body;

  try {
    // First, you can delete the existing subjects associated with the exam.
    await db.query('DELETE FROM exam_creation_table WHERE examId = ?', [examId]);

    // Then, insert the updated subjects into the exam_creation_table.
    for (const subjectId of subjects) {
      await db.query(
        'INSERT INTO exam_creation_table (examId, subjectId) VALUES (?, ?)',
        [examId, subjectId]
      );
    }

    res.json({ message: 'Subjects updated successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
