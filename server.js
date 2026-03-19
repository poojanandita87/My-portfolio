require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors({
  origin: "*",
  methods: ["GET", "POST"],
  allowedHeaders: ["Content-Type"]
}));
app.use(express.json());
app.use(express.static("public"));

// Connect to MongoDB
mongoose.connect("mongodb+srv://poojanandita400:Pooja1234@cluster0.xuzo5uq.mongodb.net/portfolioDB?appName=Cluster0")
  .then(() => console.log("✅ MongoDB connected!"))
  .catch(err => {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  });

// Contact Schema
const contactSchema = new mongoose.Schema({
  name:    { type: String, required: true },
  email:   { type: String, required: true },
  message: { type: String, required: true },
  date:    { type: Date, default: Date.now }
});

const Contact = mongoose.model("Contact", contactSchema);

// Contact Route
app.post("/contact", async (req, res) => {
  try {
    const { name, email, message } = req.body;

    // Validate fields
    if (!name || !email || !message) {
      return res.status(400).json({ 
        success: false, 
        error: "All fields are required!" 
      });
    }

    // Save to MongoDB
    const newContact = new Contact({ name, email, message });
    await newContact.save();

    console.log("New message from:", name, email);

    res.json({ 
      success: true, 
      message: "Message saved successfully!" 
    });

  } catch (err) {
    console.error("Error saving contact:", err);
    res.status(500).json({ 
      success: false, 
      error: "Server error. Please try again!" 
    });
  }
});

// Home Route
app.get("/", (req, res) => {
  res.send("✅ Portfolio server is working!");
});

// Start Server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

