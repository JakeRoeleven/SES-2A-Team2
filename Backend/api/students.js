const express = require('express');
const router = express.Router();
const StudentService = require('../lib/studentService');

router.get('/students', async (req, res) => {
    const studentService = new StudentService();
    let student_list = await studentService.getAllStudents();
    res.status(200).json(student_list);
});

router.get('/student/:id', async (req, res) => {
    
    let id = req.params.id;
    
    const studentService = new StudentService();
    let student = await studentService.getStudent(id);
    console.log(await student)
    
    res.status(200).json(student);
    console.log("done")

});

router.get('/student/signup_complete/:id', async (req, res) => {
    
    let id = req.params.id;
    
    const studentService = new StudentService();
    let student = await studentService.signupComplete(id);
    res.status(200).json(student);

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

router.post('/student/favorites', async (req, res) => {
    const id = req.body.id;
    const code = req.body.subject_code;
    try {
        const studentService = new StudentService();
        let favorites  = await studentService.toggleStudentFavorite(id, code);
        res.status(200).send(favorites);
    } catch (e) {
        console.log(e)
        res.status(401).send(e);
    }
});

router.post('/student/completed', async (req, res) => {
    const id = req.body.id;
    const code = req.body.subject_code;
    
    try {
        const studentService = new StudentService();
        let favorites  = await studentService.toggleStudentCoursesCompleted(id, code);
        res.status(200).send(favorites);
    } catch (e) {
        console.log(e)
        res.status(401).send(e);
    }
});


router.post('/update-student', async (req, res) => {
    const student = req.body.student_data;
    const id = req.body.id;
    try {
        const studentService = new StudentService();
        await studentService.updateStudent(id, student);
        res.status(200).send("Done");
    } catch (e) {
        console.log(e)
        res.status(401).send(e);
    }
});

module.exports = router;
