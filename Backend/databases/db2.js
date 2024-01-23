const mysql = require('mysql2/promise');

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
<<<<<<< HEAD
  database: 'quiz_app_admin',
=======
  database: 'admin_project',
>>>>>>> bb2c60dc38efb33ceb8dab00f91010984339a143
  waitForConnections: true,
  connectionLimit: 1000,
  queueLimit: 0
});

// Attempt to get a connection from the pool
pool.getConnection()
  .then(connection => {
    console.log('Connected to MySQL db2');
    connection.release(); // Release the connection back to the pool
  })
  .catch(err => {
    console.error('Error connecting to MySQL:', err);
  });

module.exports = pool;
