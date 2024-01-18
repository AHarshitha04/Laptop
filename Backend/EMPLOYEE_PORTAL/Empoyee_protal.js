const express = require("express");
const router = express.Router();
const db1 = require("../databases/db1");
// const db2 = require('../databases/
// const bcrypt = require("bcrypt");
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
  const { Empoye_ID } = req.body;

  try {
    // Fetch employee name based on Empoye_ID
    const fetchEmployeeSql =
      "SELECT Empoyeename FROM egardtutor_employees_registration WHERE Empoye_ID = ?";
    db1.query(fetchEmployeeSql, [Empoye_ID], (fetchError, fetchResult) => {
      if (fetchError || fetchResult.length === 0) {
        console.error("Error fetching employee name:", fetchError);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      const employee_name = fetchResult[0].Empoyeename;

      // Now you have the employee_name, proceed with inserting into login_history
      const currentDate = new Date();
      const dayName = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(currentDate);
      const monthName = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(currentDate);

      const loginInsertSql =
        "INSERT INTO login_history (employee_id, login_time, employee_name, day_name, month_name, logout_time) VALUES (?, NOW(), ?, ?, ?, null)";
      
      db1.query(
        loginInsertSql,
        [Empoye_ID, employee_name, dayName, monthName],
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
    });
  } catch (error) {
    console.error("Error recording login history:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

router.post("/logout_history", async (req, res) => {
  const { Empoye_ID } = req.body;

  try {
    const logoutInsertSql =
      "UPDATE login_history SET logout_time = NOW() WHERE employee_id = ? AND logout_time IS NULL";

    db1.query(logoutInsertSql, [Empoye_ID], (logoutError, logoutResult) => {
      if (logoutError) {
        console.error("Error updating logout time:", logoutError);
        res.status(500).json({ error: "Internal server error" });
        return;
      }

      res.status(200).json({ message: "Logout history updated successfully" });
    });
  } catch (error) {
    console.error("Error updating logout history:", error);
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
