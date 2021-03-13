const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();

router.get('/random', (req, res) => {

    // Keep a track of time it takes for python to execute
    console.time("Spawn Child Script")

    // Looks like env path from python is py on my local machine
    let process = spawn('py',["./recommendation/subject_randomiser.py",  'test',   'work']); 
   
    // Define a variable to write python data to
    let data_out = "";

    try {

        // Node receives data from python
        process.stdout.on('data', function(data) {
            console.log(data) 
            res.send(data.toString('utf8'))
        });

        // Node receives err from python
        process.stderr.on('data', function(data) {
            data_out += data.toString();
        });

        // Send JSON to Python
        process.stdin.write(JSON.stringify(test_json_courses));
        process.stdin.end();

    } catch (error) {
        res.status(500)
    }

    console.timeEnd("Spawn Child Script")
    
});

module.exports = router;
