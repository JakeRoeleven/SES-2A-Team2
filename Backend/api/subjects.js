const express = require('express');
const router = express.Router();
const CourseService = require('../lib/courseService');

router.get('/subjects', async (req, res) => {
    const courseService = new CourseService();
    try {
        let course_list = await courseService.getAllCourses();
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

router.get('/subject/delete/:id', async (req, res) => {
    const id = req.params.id;
    const courseService = new CourseService();
    let course = await courseService.deleteCourse(id);
    res.status(200).json(course);
});

router.get('/set_all_subjects', async (req, res) => {
    const courseService = new CourseService();
    await courseService.setAllCourses();
    res.status(200).json();
});

router.post('/new-subject', async (req, res) => {
    const course = req.body.course_data;
    const id = req.body.id;
    try {
        const courseService = new courseService();
        await courseService.setCourse(id, course);
        res.status(200).send("Done");
    } catch (e) {
        console.log(e)
        res.status(401).send(e);
    }
});

router.post('/update-course', async (req, res) => {
    const course = req.body.course_data;
    const id = req.body.id;
    try {
        const courseService = new courseService();
        await courseService.updateCourse(id, course);
        res.status(200).send("Done");
    } catch (e) {
        console.log(e)
        res.status(401).send(e);
    }
});

module.exports = router;
