const express = require("express");
const mysql = require("mysql2");
const bodyParser = require("body-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(express.static("public"));
app.get("/", (req, res) => {
  res.send("My server is working!");
});

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Nandita19@!",
    database: "portfolio"
});

db.connect(err => {
    if(err) throw err;
    console.log("Database connected!");
});

app.post("/contact", (req,res)=>{

    const {name,email,message} = req.body;

    const sql = "INSERT INTO contacts (name,email,message) VALUES (?,?,?)";

    db.query(sql,[name,email,message],(err,result)=>{
        if(err) throw err;
        res.send("Message Saved!");
    });

});

app.listen(3000,()=>{
    console.log("Server running on port 3000");
});
