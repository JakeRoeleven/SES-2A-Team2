// Required
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

// Set up express app
const app = express()

// Define a port
const PORT = process.env.port || 8080;

// Import API routes
const sample = require("./api/sample");
const recommendation = require("./api/recommendation");
const subjects = require("./api/subjects");
const students = require("./api/students");
const interests = require("./api/interests");

//Connect to Mongo Database
mongoose.connect('mongodb://root:password@165.232.165.231:27017', {useNewUrlParser: true, useUnifiedTopology: true, 
    useCreateIndex: true, useFindAndModify: false}).then(() => console.log("Successfully connected to the database"))
    .catch(error => console.log("Failed to connect to database: ", error));


// Parse application/x-www-form-urlencoded && application/json input
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Implement API Routing
app.use("/api", sample);
app.use("/api", recommendation);
app.use("/api", subjects);
app.use("/api", students);
app.use("/api", interests);

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

