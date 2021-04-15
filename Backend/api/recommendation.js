const express = require('express');
const router = express.Router();
let {PythonShell} = require('python-shell');

router.get('/random', (req, res) => {
    let startTime = process.hrtime();
    try {
        PythonShell.run('./python/recommendation/subject_randomiser.py', null, async function (error, results) {
                if (error) {
                    res.status(400).send(error);
                } else {
                    let json_data = {};
                    json_data['subjects'] = await JSON.parse(results);
                    json_data['run_time'] = await parseHrtimeToSeconds(process.hrtime(startTime));
                    res.status(200).json(json_data);
                }
            }
        );
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
