const express = require('express');
const {spawn} = require('child_process');
const router = express.Router();

router.get('/test', (req, res) => {

    console.log("test called")
    
    var spawn = require("child_process").spawn
    
    console.log("spawned")
   
    var process = spawn('py',["./api/sample.py",  'test',   'work'] ); 
   
    console.log("called")

    try {

        process.stdout.on('data', function(data) { 
            res.send(data.toString()); 
        });

        process.stderr.on('data', function(data) {
            //Here is where the error output goes
            console.log('stderr: ' + data);
            res.send(data.toString()); 
        });

    } catch (error) {
        
        res.status(500)

    }
});

module.exports = router;
