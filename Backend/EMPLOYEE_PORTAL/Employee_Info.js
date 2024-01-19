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



module.exports = router;