const express = require('express');
const {spawn, spawnSync} = require('child_process');
const router = express.Router();

router.get('/random', (req, res) => {
    // Keep a track of time it takes for python to execute
    console.time('Spawn Child Script');

    // Looks like env path from python is py on my local machine
    try {
        let process = spawn('Python3', [
            './recommendation/subject_randomiser.py',
            'test',
            'work',
        ]);
    } catch (e) {
        res.send(e);
    }

    // Define a variable to write python data to
    let data_out = '';

    try {
        // Node receives data from python
        process.stdout.on('data', function (data) {
            data_out = data.toString('utf8');
        });

        // Node receives err from python
        process.stderr.on('data', function (data) {
            data_out += data.toString();
        });

        // When python script ends
        process.stdout.on('end', function () {
            try {
                console.log(typeof data_out);
                let t = JSON.parse(data_out);
                res.json(t);
            } catch (error) {
                console.log(data_out);
                res.status(200).send({error: error});
            }
        });
    } catch (error) {
        res.status(200).send({error: error});
    }

    console.timeEnd('Spawn Child Script');
});

router.get('/path', (req, res) => {
    let path = 'test';

    res.status(200).send(path);
});

router.get('/path2', (req, res) => {
    // Keep a track of time it takes for python to execute
    console.time('Spawn Child Script');

    spawnSync('python3', ['./recommendation/test2.py']);

    res.status(200).send("done")


});

module.exports = router;
