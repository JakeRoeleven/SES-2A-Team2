const express = require('express');
const router = express.Router();
const getAllFaculties = require('../lib/FacultyHelper').getAllFaculties;

router.get('/faculties', async (req, res) => {
    let faculties_list = getAllFaculties();
    res.status(200).json(faculties_list);
});

router.get('/majors', async (req, res) => {
    let faculties_list = getAllFaculties();
    res.status(200).json(faculties_list);
});

module.exports = router;
