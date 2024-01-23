const mysql = require("mysql");




  const db1 = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
<<<<<<< HEAD
    database: 'quiz_app_admin',
=======
    database: 'admin_project',
>>>>>>> bb2c60dc38efb33ceb8dab00f91010984339a143
  
  });

  
db1.connect((err) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
  } else {
    console.log("Connected to MySQL db1");
  }
});
   
  module.exports = db1;