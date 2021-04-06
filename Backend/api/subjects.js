const express = require('express');
const router = express.Router();
const fs = require('fs');

router.get('/subjects', async (req, res) => {
    try {
        let file_data = fs.readFileSync('./json/uts_subjects.json');
        let subject_list = await JSON.parse(file_data);
        res.status(200).json(subject_list);
    } catch (error) {
        console.log(error)
        res.status(401).send(error);
    }
});

module.exports = router;
