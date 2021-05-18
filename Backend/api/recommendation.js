const express = require('express');
const router = express.Router();
let {PythonShell} = require('python-shell');
const process = require('process');
const StudentService = require('../lib/studentService');
const CourseService = require('../lib/courseService');
const getAllInterests = require('../lib/InterestHelper').getAllInterests;

function parseHrtimeToSeconds(hrtime) {
    var seconds = (hrtime[0] + (hrtime[1] / 1e9)).toFixed(3);
    return seconds;
}

router.get('/random', (req, res) => {
    let startTime = process.hrtime();
    try {
        PythonShell.run(
            './python/recommendation/subject_randomiser.py',
            null,
            async function (error, results) {
                if (error) {
                    res.status(400).send(error);
                } else {
                    let json_data = {};
                    json_data['subjects'] = await JSON.parse(results);
                    json_data['run_time'] = await parseHrtimeToSeconds(
                        process.hrtime(startTime)
                    );
                    res.status(200).json(json_data);
                }
            }
        );
    } catch (error) {
        res.status(400).send(error);
    }
});

router.post('/recommendation', async (req, res) => {

    // Begin recording time
    let startTime = process.hrtime();

    const all_interests = getAllInterests();

    // Get request contents
    let student_req = req.body.student;

    console.log(student_req)
    
    // Set candidate student
    let student = {}
    student.major = student_req.faculty
    student.courses_completed = student_req.courses_completed;

    // Format candidate student
    let interest_array = [];
    let interests_json = student_req.interests
    for (var i = 0, len = all_interests.length; i < len; i++) {    
        if (interests_json.indexOf(all_interests[i]) > -1) {
            interest_array.push(1)
        } else {
            interest_array.push(0)
        }
    }
    student.interests = interest_array;

    // Get and format students
    const studentService = new StudentService();
    let student_list = await studentService.getAllKNNStudentsByMajor(student.major);
    let formatted_student_list = {};

    for (var i = 0, len = Object.keys(student_list).length; i < len; i++) {   

        let interest_array = [];
        if (student_list[i]) {
            let interests_json = student_list[i].interests
        
            // Loop through interests and transform
            for (var j = 0, len = all_interests.length; j < len; j++) {    
                if (interests_json.indexOf(all_interests[j]) > -1) {
                    interest_array.push(1)
                } else {
                    interest_array.push(0)
                }
            }

             
            // Add new student with interest as matrix
            formatted_student_list[(student_list[i]['_id'])] = {
                courses_completed: student_list[i]['courses_completed'],
                interests: interest_array
            }
        } else {
            console.log(i)
        }
 


    }

    // Get and format courses
    const courseService = new CourseService();
    let course_list = await courseService.getAllKNNCourses(false)
    let formatted_course_list = {};
    for (var i = 0, len = Object.keys(course_list).length; i < len; i++) {   
        formatted_course_list[(course_list[i]['_id'])] = course_list[i];
    }

    python_data = {
        student: student,
        courses: formatted_course_list,
        students: formatted_student_list
    }

    // Python scripts takes arguments in order as main(courses, students, student, k, recommendations)
    try {
        
        let pyshell = new PythonShell('./python/recommendation/knn.py');
        
        
        pyshell.send(JSON.stringify(python_data));
        
        
        pyshell.on('message', async function (recommendations) {
            // received a message sent from the Python script (a simple "print" statement)

            recommendations = recommendations.split(",")
            let subject_ids = [];
            for (var i = 0, len = recommendations.length; i < len; i++) {   
                subject_ids.push(recommendations[i].replace(/\D/g, ''));
            }

            let subjects = [];
            for (var i = 0, len = subject_ids.length; i < len; i++) {   
                if (student.courses_completed.indexOf(subject_ids[i]) == -1) subjects.push(subject_ids[i])
            }

            let endTime = await parseHrtimeToSeconds(
                process.hrtime(startTime)
            );

            let results = {
                recommendations: subjects,
                time: endTime
            }

            res.status(200).json(results);

        });

        pyshell.end(function (err, code, signal) {
            res.status(500);
        }); 
        
        
    } catch (error) {
        console.log(error)
        res.status(500);
    }

});

module.exports = router;
