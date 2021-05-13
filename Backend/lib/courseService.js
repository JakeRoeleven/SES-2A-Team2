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

    async updateCourse(id, course) {

        let course_object = await Course.findOne({'_id': id});

        course_object['course_name'] = course.course_name
        course_object['credit_points'] = course.credit_points
        course_object['faculty'] = course.faculty
        course_object['postgraduate'] = course.postgraduate
        course_object['pre-requisite'] = course['pre-requisites']
        course_object['anti-requisites'] = course['ani-requisites']
        course_object['description'] = course.description
        course_object['link'] = course.link
       
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

    async getAllKNNCourses(postgraduate) {
        const courseRef = await Course.find({ postgraduate: postgraduate }, { _id: 1, faculty: 1 }).lean();
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