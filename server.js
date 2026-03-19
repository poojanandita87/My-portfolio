

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MySQL connection
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Nandita19@!",
  database: "portfolio"
});

// API to receive form data
app.post("/contact", (req, res) => {
  const { name, email, message } = req.body;

  const sql = "INSERT INTO messages (name, email, message) VALUES (?, ?, ?)";
  db.query(sql, [name, email, message], (err, result) => {
    if (err) {
      res.send("Error");
    } else {
      res.send("Message saved");
    }
  });
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});