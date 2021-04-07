const express = require('express');
const router = express.Router();
const StudentService = require('../lib/StudentService');

router.get('/students', async (req, res) => {
    const studentService = new StudentService();
    let student_list = await studentService.getAllStudents();
    res.status(200).json(student_list);
});

router.post('/new-student', async (req, res) => {
    
    const student = req.body.student_data;
    const id = req.body.id;

    try {
        const studentService = new StudentService();
        await studentService.setStudent(id, student);
        res.status(200).send("Done");
    } catch (e) {
        console.log(e)
        res.status(401).send(e);
    }

});

module.exports = router;
