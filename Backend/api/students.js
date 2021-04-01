const express = require('express');
const router = express.Router();
const StudentService = require('../lib/StudentService');

router.get('/students', async (req, res) => {
    const studentService = new StudentService();
    let student_list = await studentService.getAllStudents();
    res.status(200).json(student_list);
});

module.exports = router;
