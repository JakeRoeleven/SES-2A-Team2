const express = require('express');
const router = express.Router();
const CourseService = require('../lib/CourseService');

router.get('/subjects', async (req, res) => {
    const courseService = new CourseService();
    let course_list = await courseService.getAllCourses();
    res.status(200).json(course_list);
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

router.get('/subject/name/:name', async (req, res) => {
    const name = req.params.name;
    const courseService = new CourseService();
    let course = await courseService.getCoursesFromName(name);
    res.status(200).json(course);
});

module.exports = router;
