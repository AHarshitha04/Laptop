const express = require("express");
const router = express.Router();
const db1 = require("../databases/db1");
// const db2 = require('../databases/
const bcrypt = require("bcrypt");
const fs = require("fs");
const app = express();
const path = require("path");
const jwt = require("jsonwebtoken");
const sizeOf = require("image-size");
const bodyParser = require("body-parser");
const multer = require("multer");
const { register } = require("module");
const nodemailer = require("nodemailer");
const logoPath = path.resolve(__dirname, "../logo/logo.png");


app.use(bodyParser.json());


// ----------------------------------- Employee Register --------------------------------

router.post("/Employeeportal_register", (req, res) => {
  const { Empoyeename, EmpoyeeEmail, EmpoyeePassword } = req.body;

  // Check if the email already exists
  const checkEmailExistsSql =
    "SELECT * FROM egardtutor_employees_registration WHERE EmpoyeeEmail = ?";
  db1.query(checkEmailExistsSql, [EmpoyeeEmail], (error, results) => {
    if (error) {
      console.error("Error checking email existence:", error);
      res.status(500).json({ error: "Internal server error" });
      return;
    }

    if (results.length > 0) {
      // Email already exists, send a response indicating that
      res.status(400).json({ error: "Email already exists" });
    } else {
      // Email does not exist, proceed with registration
      const insertEmployeeSql =
        "INSERT INTO egardtutor_employees_registration (Empoyeename, EmpoyeeEmail, EmpoyeePassword) VALUES (?, ?, ?)";
      db1.query(
        insertEmployeeSql,
        [Empoyeename, EmpoyeeEmail, EmpoyeePassword],
        (err, result) => {
          if (err) {
            console.error("Error executing MySQL query:", err);
            res.status(500).json({ error: "Internal server error" });
            return;
          }
          console.log("Employee registered successfully");
          res.status(200).json({ message: "Employee registered successfully" });
        }
      );
    }
  });
});


// Employee Login


// Employeeportal_login API
router.post("/Employeeportal_login", async (req, res) => {
  const { EmpoyeeEmail, EmpoyeePassword } = req.body;

  try {
    const sql =
      "SELECT * FROM egardtutor_employees_registration WHERE EmpoyeeEmail = ?";
    db1.query(sql, [EmpoyeeEmail], async (error, results) => {
      if (error || results.length === 0) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      const employee = results[0];

      // Check if the provided password matches the stored password
      if (EmpoyeePassword !== employee.EmpoyeePassword) {
        res.status(401).json({ error: "Invalid credentials" });
        return;
      }

      // At this point, the credentials are valid

      const token = jwt.sign({ id: employee.Empoye_ID }, "your_secret_key", {
        expiresIn: "1hr",
      });

      const { Empoye_ID, EmpoyeeEmail } = employee;
      res
        .status(200)
        .json({ token, employee: { Empoye_ID, EmpoyeeEmail } });
    });
  } catch (error) {
    console.error("Error during login:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



// login_history API
router.post("/login_history", async (req, res) => {
  const { Empoye_ID, employee_name } = req.body;

  try {
    const loginInsertSql =
      "INSERT INTO login_history (employee_id, login_time, employee_name) VALUES (?, NOW(), ?)";
    db1.query(
      loginInsertSql,
      [Empoye_ID, employee_name],
      (loginError, loginResult) => {
        if (loginError) {
          console.error("Error inserting login data:", loginError);
          res.status(500).json({ error: "Internal server error" });
          return;
        }

        res
          .status(200)
          .json({ message: "Login history recorded successfully" });
      }
    );
  } catch (error) {
    console.error("Error recording login history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});



router.get("/getEmployeeData", (req, res) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  const decodedToken = jwt.verify(
    token.replace("Bearer ", ""),
    "your_secret_key"
  );

  if (!decodedToken) {
    return res.status(401).json({ error: "Invalid token" });
  }

  const employeeId = decodedToken.id;

  const fetchEmployeeSql =
    "SELECT * FROM egardtutor_employees_registration e  WHERE Empoye_ID = ?";

  db1.query(fetchEmployeeSql, [employeeId], (error, results) => {
    if (error || results.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const employee = results[0];

    // You may want to filter out sensitive information before sending it to the client
    const sanitizedEmployee = {
      Empoye_ID: employee.Empoye_ID,
      EmpoyeeEmail: employee.EmpoyeeEmail,
      EmpoyeeName: employee.EmpoyeeName,
      // Add other fields as needed
    };

    res.status(200).json(sanitizedEmployee);
  });
});






module.exports = router;
