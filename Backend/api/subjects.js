const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/subjects', async (req, res) => {
    let startTime = process.hrtime();
    try {
        let file_data = fs.readFileSync('./json/uts_subjects.json');
        let subject_list = await JSON.parse(file_data);
        res.status(400).json(subject_list);
    } catch (error) {
        res.status(400).send(error);
    }
});

module.exports = router;
