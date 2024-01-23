const db = require("../databases/db2");
const express = require("express");
const router = express.Router();



router.get('/getGenderOptions', async (req, res) => {
    
    try {
      const [rows] = await db.query('SELECT * FROM empgender');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.get('/getRelationshipStatus', async (req, res) => {
    
    try {
      const [rows] = await db.query('SELECT * FROM emprelationshipstatus');
      res.json(rows);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

  router.post('/empinfo', async (req, res) => {
    
    const { login, password,firstName,lastName,motherName,fatherName,dateOfBirth,motherTongue,bloodGroup } = req.body;
  
    try {
      const [empinfo] = await db.query(
        'INSERT INTO egardtutor_employees_registration (EmpoyeeEmail, EmpoyeePassword) VALUES (?, ?)',
        [login, password]
      );

      const insertedempinfo = empinfo.insertId;
     {
        await db.query(
          'INSERT INTO ed_basicinfo (Empoye_ID, empFirstName,empLastName,empMotherName,empFatherName,empDOB,empMoterTongue,empbloodGroup) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
          [insertedempinfo,firstName,lastName,motherName,fatherName,dateOfBirth,motherTongue,bloodGroup]
        );
      }
      res.json({ message: 'Emp created successfully', empinfo });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

module.exports = router;