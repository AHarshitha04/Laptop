const express = require("express");
const multer = require("multer");
const cors = require("cors");
const mysql = require("mysql");
const bcrypt = require('bcrypt');
const fs = require("fs");
const app = express();
const path = require("path");
const sizeOf = require("image-size");
// const diskusage = require("diskusage");
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
  database: "egrad_quiz",
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




app.get('/helo/:userId', (req, res) => {
  const userId = req.params.userId;

  const query = 'SELECT id, email, username FROM users WHERE id = ?';
  db.query(query, [userId], (error, results) => {
    if (error) {
      console.error('Error fetching user details:', error);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }

    if (results.length === 0) {
      res.status(404).json({ error: 'User not found' });
      return;
    }

    const userData = results[0];
    res.status(200).json(userData);
  });
});




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

// const storage = multer.memoryStorage(); // Store the image in memory as a Buffer
// const upload = multer({ storage: storage });


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
// app.post("/upload", upload.single("image"), (req, res) => {
//   const image = req.file.buffer;
//   const courseId = req.body.course_id; // Assuming you are sending the course_id in the request body
//   const sectionId = req.body.section_id;
//   const examId = req.body.exam_id; // Assuming you are sending the exam_id in the request body

//   if (!courseId || !sectionId) {
//     return res.status(400).json({ message: "Course ID and Section ID are required" });
//   }

//   // Modify the query to include course_id and section_id
//   let query;
//   let values;

//   if (examId) {
//     // If exam_id is present, include it in the query
//     query =
//       "INSERT INTO main_page_images (image_data, course_id, section_id, exam_id) VALUES (?, ?, ?, ?)";
//     values = [image, courseId, sectionId, examId];
//   } else {
//     // If exam_id is not present, exclude it from the query
//     query =
//       "INSERT INTO main_page_images (image_data, course_id, section_id) VALUES (?, ?, ?)";
//     values = [image, courseId, sectionId];
//   }

//   db.query(query, values, (err, result) => {
//     if (err) {
//       console.error("Error uploading image:", err);
//       res.status(500).json({ message: "Error uploading image" });
//     } else {
//       res.json({ message: "Image uploaded successfully" });
//     }
//   });
// });



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
 

 
app.post('/register', async (req, res) => {
  const { email, username, password } = req.body;
 
  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);
 
  // Set the default role to 'viewer'
  const defaultRole = 'viewer';
 
  // Insert user into the database with a default role
  db.query('INSERT INTO users (email, username, password, role) VALUES (?, ?, ?, ?)', [email, username, hashedPassword, defaultRole], (err, result) => {
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
  const { email, password } = req.body;
 
  // Retrieve user from the database
  db.query('SELECT id, email, password, role FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) {
      res.status(500).send('Error during login');
    } else if (result.length > 0) {
      // Compare hashed password
      const match = await bcrypt.compare(password, result[0].password);
 
      if (match) {
        // Send the role along with the login success response
        const { id, email, role } = result[0];
        res.status(200).json({
          message: 'Login successful',
          user: { id, email, role },
        });
        console.log(`${email} ${id}`)
      } else {
        res.status(401).send('Incorrect password');
      }
    } else {
      res.status(404).send('User not found');
    }
  });
});

//extra fro login 
// app.post('/login', (req, res) => {
//   const { email, password } = req.body;
 
//   // Retrieve user from the database
//   db.query('SELECT * FROM users WHERE email = ? AND password= ?', [email,password], async (err, result) => {
//     if (err) {
//       res.status(500).send('Error during login');
//     } else if (result.length > 0) {
//       // Compare hashed password
//       const match = await bcrypt.compare(password, result[0].password);
 
//       if (match) {
//         // Send the role along with the login success response
//         const { id, email, role } = result[0];
//         res.status(200).json({
//           message: 'Login successful',
//           user: { id, email, role },
//         });
//         console.log(`${email} ${id}`)
//       } else {
//         res.status(401).send('Incorrect password');
//       }
//     } else {
//       res.status(404).send('User not found');
//       res.send('User not found');

//     }
//   });
// });

// app.post('/login', (req, res) => {
//   const { email, password } = req.body;

//   // Query to authenticate user from MySQL database
//   const query = `SELECT * FROM users WHERE email = ?`;
//   db.query(query, [email], async (err, results) => {
//     if (err) {
//       console.error('Error executing query:', err);
//       return res.status(500).json({ message: 'Internal Server Error' });
//     }

//     if (results.length === 0) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }

//     const user = results[0];
//     // Compare hashed password with user's provided password
//     const passwordMatch = await bcrypt.compare(password, user.password);

//     if (!passwordMatch) {
//       return res.status(401).json({ message: 'Invalid email or password' });
//     }
//     else if (passwordMatch) {
//               // Send the role along with the login success response
//               const { id, email, role } = result[0];
//               res.status(200).json({
//                 message: 'Login successful',
//                 user: { id, email, role },
//               });
//               console.log(`${email} ${id}`)
//             } 

//     // If authentication is successful, return user data
//     res.status(200).json({ message: 'Login successful', user });
//   });
// });




//-------------------------------



app.get("/users", (req, res) => {
  const q = "SELECT * FROM users";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });

  
});
// ----------------------------------------------------------------------------------



app.get('/login', (req, res) => {
  const { email, password } = req.query; // Assuming email and password are passed as query parameters

  // Validate inputs (email and password)
  // if (!email || !password) {
  //   return res.status(400).send('Email and password are required');
  // }

  // Retrieve user from the database
  db.query('SELECT id, email, password, role FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) {
      res.status(500).send('Error during login');
    } else if (result.length > 0) {
      // Compare hashed password
      const match = await bcrypt.compare(password, result[0].password);

      if (match) {
        // Send the role along with the login success response
        const { id, email, role } = result[0];
        res.status(200).json({
          message: 'Login successful',
          user: { id, email, role },
        });
        console.log(`${email} ${id}`);
      } else {
        res.status(401).send('Incorrect password');
      }
    } else {
      res.status(404).send('User not found');
    }
  });
});

// ----------------------------------------------------------------------------------

app.get("/userdetails/:id", (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM users WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});





app.get('/user/:id', (req, res) => {
  const userId = req.params.id;
  const query = 'SELECT * FROM users WHERE id = ?';
  db.query(query, userId, (err, result) => {
    if (err) {
      console.log(err);
      res.status(500).send('Error retrieving user details');
    } else {
      if (result.length > 0) {
        res.status(200).json(result[0]);
      } else {
        res.status(404).send('User not found');
      }
    }
  });
});
// app.get("/sigleuserdetails/:id", (req, res) => {
//   const id = req.params.id;
//   const sql="SELECT * FROM users WHERE id = ?"

//   db.query(sql,[id],(err,result)=>{
//     if(err)return res.json({status:false});
//     return res.json(result)
//   })
  
  
// });

// app.get('/sigleuserdetails/:id', (req, res) => {
//   const { id } = req.params;

//   const query = 'SELECT * FROM users WHERE id = ?'; // Replace 'users' with your table name

//   db.query(query, [id], (error, results) => {
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


app.put('/users/:id', async (req, res) => {
  const id = req.params.id; // Extract the userId from request params
  const { email, username, password, role } = req.body;

  try {
    // Hash the password if a new password is provided
    let hashedPassword = password; // Use the provided password as default

    if (password) {
      hashedPassword = await bcrypt.hash(password, 10);
    }

    // Update user details with hashed password
    db.query('UPDATE users SET email = ?, username = ?, password = ?, role = ? WHERE id = ?', [email, username, hashedPassword, role, id], (err, result) => {
      if (err) {
        console.error('Error updating user:', err);
        res.status(500).send('Error updating user');
      } else {
        console.log('User updated successfully');
        res.status(200).send('User updated successfully');
      }
    });
  } catch (error) {
    console.error('Error during user update:', error);
    res.status(500).send('Error updating user');
  }
});


// app.put("/users/:id", (req, res) => {
//   const userId = req.params.id;
//   // email, username, password, role
//   const q = "UPDATE users SET `username`= ?, `email`= ?, `password`= ? `role`= ?  WHERE id = ?";
 
//   const values = [
//     req.body.username,
//     req.body.email,
//     req.body.password,
//     req.body.role,

//   ];
 
//   db.query(q, [...values,userId], (err, data) => {
//     if (err) return res.send(err);
//     return res.json(data);
//   });
// });
 

app.delete("/users/:id", (req, res) => {
  const userId = req.params.id;
  const q = " DELETE FROM users WHERE id = ? ";
 
  db.query(q, [userId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});
// app.get("/act_info", (req, res) => {
//   // const query = 'SELECT course_name,course_id FROM 1egquiz_courses';
//   const query =
//     "SELECT  * FROM users ";
 
//   db.query(query, (error, results) => {
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
 

// --------------------------------------login end -----------------------------------------------------

// ----------------------------------------------------------================================  courses ug function by sra1 ========================================--------------------------------------------------------






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






app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
