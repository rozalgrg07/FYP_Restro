// config/db.js
const mysql = require('mysql');

// Create a connection to the database
const con = mysql.createConnection({
  host : 'localhost',
  user : 'root',
  password : '',
  database : 'restro'
});

// Connect to the database
con.connect((err) => {
  if (err) {
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database as id ' + db.threadId);
});

module.exports = db;
