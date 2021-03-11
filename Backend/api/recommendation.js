const express = require('express');
const { spawn } = require('child_process');
const router = express.Router();

router.get('/test', (req, res) => {

    // Keep a track of time it takes for python to execute
    console.time("Spawn Child Script")

    // Testing data
    let test_json_courses = {
        "engineering": {
            "interests": ["math", "science"],
            "note": "Build Shit"
        },
        "engineering a": {
            "interests": ["math", "science"],
            "note": "Build Shit"
        },
        "engineering v": {
            "interests": ["math", "science"],
            "note": "Build Shit"
        },
        "engineering 1": {
            "interests": ["math", "science"],
            "note": "Build Shit"
        },
        "maths": {
            "interests": ["math", "science"],
            "note": "Build Shit"
        },
        "programming": {
            "interests": ["math", "science"],
            "note": "Build Shit"
        },
    }

    // Looks like env path from python is py on my local machine
    let process = spawn('py',["./api/sample.py",  'test',   'work']); 
   
    // Define a variable to write python data to
    let data_out = "";

    try {

        // Node receives data from python
        process.stdout.on('data', function(data) {
            console.log(data) 
            data_out = data.toString('utf8')
        });

        // Node receives err from python
        // process.stderr.on('data', function(data) {
        //     data_out += data.toString();
        // });

        // When python script ends
        process.stdout.on('end', function(){

            let python_data = data_out
            console.log("Python Data");
            console.log(python_data)
            res.send(python_data);
            console.log("-------------");
        
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
