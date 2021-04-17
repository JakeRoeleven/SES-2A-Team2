const fs = require('fs');
const Course = require('../models/CourseModel');

class CourseService {

    constructor() {
    }

    // TODO: Error handling
    async setCourse(id, course) {
        const courseObject = new Course({
            _id: id, 
            course_name: course.course_name,
            credit_points: course.credit_points,
            faculty: course.faculty,
            postgraduate: course.postgraduate,
            'pre-requisites': course['pre-requisites'],
            'anti-requisites': course['ani-requisites'],
            description: course.description,
            link: course.link
        });
        await courseObject.save();
    }

    async setAllCourses() {
        let courses = await JSON.parse(fs.readFileSync('./json/uts_subjects.json'));
        Object.keys(courses).forEach(elem => {
            this.setCourse(elem, courses[elem]);
        })
    }

    async getCourse(id) {
        await Course.findOne({ _id: id }, async (err, course) => {
            if (err || !course) {
                return ({ err: "Could not find course!" });
            } else {
                return await course;
            }
        });
    }

    async getAllCourses() {
        const courseRef = Course.find().lean();
        return courseRef;
    }

    async getCoursesFromName(name) {
        Course.findOne({ course_name: name }, (err, course) => {
            if (err || !course) {
                return ({ err: "Could not find course!" });
            } else {
                return course;
            }
        });
    }

    async deleteCourse(id) {
        await Course.deleteOne({ _id: id });
    }

}

module.exports = CourseService;