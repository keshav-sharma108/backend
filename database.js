const mysql = require('mysql2');
const express = require('express');
const app = express();
const port = 3000;

// MySQL connection settings
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "keshav@123",
  database: "employee",
  port: 3306
});

// Connect to MySQL
connection.connect((err) => {
  if (err) {
    console.error("❌ Error connecting to MySQL:", err.message);
    return;
  }
  console.log("✅ Connected to MySQL database 'employee'!");
});

// Define GET API route
app.get('/api/users', (req, res) => {
  const sql = 'SELECT * FROM ed';
  connection.query(sql, (err, results) => {
    if (err) {
      console.error("❌ Query error:", err.message);
      res.status(500).json({ error: 'Database query error' });
    } else {
      res.json(results);
    }
  });
});

// Start server
app.listen(port, () => {
  console.log(`🚀 Server running at http://localhost:${port}`);
});
