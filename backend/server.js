const express = require('express');
const mysql = require('mysql');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json()); // To parse JSON bodies
app.use(cors());
// MySQL Connection
const con = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Your MySQL username
  password: '', // Your MySQL password
  database: 'restro' // Your MySQL database name
});

con.connect(function (err) {
  if (err) throw err;
  console.log('Connected to MySQL');
});

// Signup Route - Create a new user
// const signupRoutes = require('./routes/signupRoutes');


// app.use('/api/signup', signupRoutes);


// Signup Route - Create a new user
app.post('/signup', (req, res) => {
  const { username, email, password, role } = req.body;

  // Validate that the role is one of the allowed values
  const allowedRoles = ['customer', 'waiter', 'kitchen', 'accountant'];
  if (!allowedRoles.includes(role)) {
    return res.status(400).json({ message: "Invalid role" });
  }

  const sql = "INSERT INTO users (username, email, password, role) VALUES (?, ?, ?, ?)";
  
  con.query(sql, [username, email, password, role], (err, result) => {
    if (err) {
      console.error('Error inserting user:', err);
      return res.status(500).json({ message: 'Error inserting user' });
    }
    res.status(201).json({ message: 'User created successfully' });
  });
});



// Login Route - Authenticate user
// const bcrypt = require('bcryptjs');

app.post('/login', (req, res) => {
  const { username, password } = req.body;

  const query = `SELECT * FROM users WHERE username = ?`;
  con.query(query, [username], (err, result) => {
    if (err) {
      return res.status(500).json({ status: 'error', message: 'Server error' });
    }

    if (result.length > 0) {
      const user = result[0];

      // Compare the entered password with the hashed password in the database
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) {
          return res.status(500).json({ status: 'error', message: 'Server error' });
        }

        if (isMatch) {
          res.json({ status: 'success', message: 'Login successful' });
        } else {
          res.json({ status: 'error', message: 'Invalid password' });
        }
      });
    } else {
      res.json({ status: 'error', message: 'User not found' });
    }
  });
});


// Protected Route (Requires JWT)
app.get('/profile', (req, res) => {
  const token = req.headers['authorization'];

  if (!token) return res.status(403).send('No token provided');

  // Verify the JWT token
  jwt.verify(token, '12rj', (err, decoded) => {
    if (err) return res.status(500).send('Invalid token');

    // Fetch user profile using decoded userId
    const sql = 'SELECT * FROM users WHERE id = ?';
    con.query(sql, [decoded.userId], (err, results) => {
      if (err) return res.status(500).send('Error retrieving user data');
      res.json(results[0]); // Send user profile data
    });
  });
});

// Start the server
app.listen(3000, () => {
  console.log('Server running on port 3000');
});
