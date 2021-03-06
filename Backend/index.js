// Required
const express = require('express');
var bodyParser = require('body-parser')

// Set up express app
const app = express()

// Define a port
const PORT = process.env.port || 8080;

// Import API routes
const sample = require("./api/sample");

// parse application/x-www-form-urlencoded &&  application/json
app.use(bodyParser.urlencoded())
app.use(bodyParser.json())

//Implement API Routing
app.use("/api", sample)

// Start server
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
});

module.exports = app;

// TODO: Add body/json parser?
// TODO: Add cors, helmet security ect
// TODO: Define routes
// TODO: Spawn example python process 
// TODO: Nodemon!
// TODO: Mocha test examples!

