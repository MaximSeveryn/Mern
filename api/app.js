const express = require("express");
const bodyParser = require("body-parser");
const colors = require("colors");
const dotenv = require("dotenv");
const cors = require("cors");
const morgan = require("morgan");

// Import Creds
// const mongo = require("./credentials/mongo");

// Imports for Routes
const taskRoutes = require("./app/routes/taskRoutes");

// Handle MongoDB connection
const connectDB = require("./database/db");
connectDB();

// Create an Express App
const app = express();

// Use Cors to avoid annoying CORS Errors
app.use(cors());

// Send basic info about the API
app.use("/api/info", (req, res, next) => {
  res.status(200).json({
    name: "TODO Api",
    version: "1.0",
    description: "RESTful API Designed in Node.js for TODO application.",
    methodsAllowed: "GET, POST, PUT, PATCH, DELETE",
    authType: "None",
    rootEndPoint: req.protocol + "://" + req.get("host") + "/api/v1",
    documentation: "https://github.com/toslimarif/todo-api",
  });
});

// set up routes
app.use("/task", taskRoutes);
module.exports = app;
