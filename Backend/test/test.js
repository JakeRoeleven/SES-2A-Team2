const express = require('express');
const router = express.Router();
const {spawn} = require('child_process');
let {PythonShell} = require('python-shell')

router.get('/py', async (req, res) => {

    try {
        PythonShell.run('./test/test3.py', options, function(err, results) {
            if (err) {
                console.log(err)
                res.status(200).send(err);
            } else {
                let data = results;
                res.status(200).send(data);
            }
        });
    } catch (e) {
        res.status(200).send(e);
    }

});

router.get('/py-test', (req, res) => {

    res.status(200).send("Work");

});

module.exports = router;
