const express = require('express');
const router = express.Router();
let {PythonShell} = require('python-shell')

router.get('/random', (req, res) => {
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

module.exports = router;
