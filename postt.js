const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

// Middleware to parse form data
app.use(express.urlencoded({ extended: true }));

// MySQL connection
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "keshav@123",
  database: "keshav_s",   // match your database
  port: 3306
});

connection.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL database presrnt'!");
});

// GET all users
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM ks';  // match your table name
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Query error:", err.message);
      res.status(500).json({ error: 'Database query error' });
    } else {
      res.json(results);
    }
  });
});

// POST to insert user
app.post('/api/submit', (req, res) => {
  const { name, rollno } = req.body;
  if (!name || !rollno) {
    return res.status(400).send('Name and Roll No required');
  }
  
  const sql = 'INSERT INTO ks (name,rollno) VALUES (?,?)';
  connection.query(sql, [name,rollno], (err, result) => {
    if (err) {
      console.error('Insert error:', err);
      return res.status(500).send('Failed to insert data');
    }
    res.send(`Student '${name}' with roll no ${rollno} added successfully!`);
  });
});


app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
