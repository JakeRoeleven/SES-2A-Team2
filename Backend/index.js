// Required
const express = require('express');
var bodyParser = require('body-parser')

// Set up express app
const app = express()

// Define a port
const PORT = process.env.port || 8080;

// Import API routes
const sample = require("./api/sample");
const recommendation = require("./api/recommendation");
const testing = require("./test/test");

// TODO: Fix up cors
const cors = require('cors');
app.use(cors())

// Parse application/x-www-form-urlencoded && application/json input
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Implement API Routing
app.use("/api", sample)
app.use("/api", recommendation)
app.use("/api", testing)

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

