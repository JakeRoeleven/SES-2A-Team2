const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
let {PythonShell} = require('python-shell')

function parseHrtimeToSeconds(hrtime) {
    var seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
}

router.get('/py', async (req, res) => {

    try {
        let startTime = process.hrtime();
        PythonShell.run('./recommendation/subject_randomiser.py', null, async function(err, results) {
            if (err) {
                console.log(err)
                res.status(200).send(err);
            } else {
                let data = results;
                json_data = await JSON.parse(data);
                let time = await parseHrtimeToSeconds(process.hrtime(startTime));
                json_data["run_time"] = await time;
                res.status(200).json(json_data);
            }
        });
    } catch (e) {
        console.log(e)
        res.status(200).send(e);
    }

});

router.get('/py-test', (req, res) => {

    res.status(200).send("Work");

});

module.exports = router;
