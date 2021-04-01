// Required
const express = require('express');
const bodyParser = require('body-parser');

// Set up express app
const app = express()

// Define a port
const PORT = process.env.port || 8080;

// Import API routes
const sample = require("./api/sample");
const recommendation = require("./api/recommendation");
const subjects = require("./api/subjects");
const students = require("./api/students");

// Parse application/x-www-form-urlencoded && application/json input
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Implement API Routing
app.use("/api", sample);
app.use("/api", recommendation);
app.use("/api", subjects);
app.use("/api", students);

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

module.exports = app;

// TODO: Add cors, helmet security ect
// TODO: Define routes
// TODO: Spawn example python process 
// TODO: Nodemon!
// TODO: Mocha test examples!

