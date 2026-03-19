require("dotenv").config();

const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));

app.use(bodyParser.json());
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.send("My server is working!");
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: process.env.DB_PASSWORD,
    database: "portfolio"
});

db.connect(err => {
    if(err) {
        console.error("Database connection failed:", err);
        process.exit(1);
    }
    console.log("Database connected!");
});

app.post("/contact", (req, res) => {
    const { name, email, message } = req.body;

    if(!name || !email || !message) {
        return res.status(400).send("All fields are required!");
    }

    const sql = "INSERT INTO contacts (name, email, message) VALUES (?, ?, ?)";

    db.query(sql, [name, email, message], (err, result) => {
        if(err) {
            console.error("Database error:", err);
            return res.status(500).send("Database error!");
        }
        res.send("Message Saved!");
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});