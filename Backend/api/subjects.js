const express = require('express');
const router = express.Router();
const CourseService = require('../lib/CourseService');

router.get('/subjects', async (req, res) => {
    console.log("requested subjects")
    const courseService = new CourseService();
    try {
        let course_list = await courseService.getAllCourses();
        console.log("Sending subjects")
        res.status(200).json(course_list);
    } catch (e) {
        console.log(e)
        res.status(400);
    }

});

router.get('/subject/:id', async (req, res) => {
    const id = req.params.id;
    const courseService = new CourseService();
    let course = await courseService.getCourse(id);
    res.status(200).json(course);
});

router.get('/subject/name/:name', async (req, res) => {
    const name = req.params.name;
    const courseService = new CourseService();
    let course = await courseService.getCoursesFromName(name);
    res.status(200).json(course);
});

router.get('/set_all_subjects', async (req, res) => {
    const courseService = new CourseService();
    await courseService.setAllCourses();
    res.status(200).json();
});

module.exports = router;
