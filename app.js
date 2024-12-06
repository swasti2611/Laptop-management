const express = require('express');
const mongoose = require('mongoose');
const Route = require('./Routes');
const cors = require('cors'); // Import CORS middleware
const app = express();

// Middleware to handle CORS
app.use(cors());  // This will allow cross-origin requests from any origin

// Middleware to parse JSON (for API requests)
app.use(express.json());

// Middleware to parse URL-encoded data (for form submissions)
app.use(express.urlencoded({ extended: true }));

mongoose.connect("mongodb+srv://swatijagtap709:u9WaUL1P0jHSoOLQ@cluster0.ktfwn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch((err) => {
    console.log("MongoDB error", err);
  });

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api", Route);

app.listen(3000, () => {
  console.log("Server connected");
});
