const express = require('express');
const router = express.Router();
let {PythonShell} = require('python-shell');
const process = require('process');
const StudentService = require('../lib/studentService');
const CourseService = require('../lib/courseService');

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

    

    let student = req.body.student;
    console.log(student)
    const all_interests = ['Programming', 'Maths', 'Statistics', 'Hospitality', 'Fitness', 'Language', 'Art', 'Humanities',
    'Architecture', 'History', 'Geography', 'Business', 'Economics', 'Education', 'Health', 'Engineering', 'Law', 'Computing',
    'Physics', 'Chemistry', 'Biology']
    let interests_json = student.interests
    let interest_array = [];
    all_interests.forEach(interest => {
        if (interests_json.includes(interest)) {
            interest_array.push(1)
        } else {
            interest_array.push(0)
        }
    });
    student.interests = interest_array;

    const studentService = new StudentService();
    let student_list = await studentService.getAllStudents();
    let new_student_list = {};

    // Convert array to python format
    Object.keys(student_list).forEach(async elem => {
        let interests_json = student_list[elem].interests
        const all_interests = ['Programming', 'Maths', 'Statistics', 'Hospitality', 'Fitness', 'Language', 'Art', 'Humanities',
        'Architecture', 'History', 'Geography', 'Business', 'Economics', 'Education', 'Health', 'Engineering', 'Law', 'Computing',
        'Physics', 'Chemistry', 'Biology']
        let interest_array = [];
        all_interests.forEach(interest => {
            if (interests_json.includes(interest)) {
                interest_array.push(1)
            } else {
                interest_array.push(0)
            }
        });
        student_list[elem].interests = interest_array;
        new_student_list[(student_list[elem]['_id'])] = student_list[elem]
    })

    const courseService = new CourseService();
    let course_list = await courseService.getAllCourses()

    let new_list = {};
    Object.keys(course_list).forEach((elem, index) => {
        new_list[(course_list[elem]['_id'])] = course_list[elem];
    });

    python_data = {
        student: student,
        courses: new_list,
        students: new_student_list
    }

    // Python scripts takes arguments in order as main(courses, students, student, k, recommendations)
    try {
        
        let pyshell = new PythonShell('./python/recommendation/knn.py');
        
        
        pyshell.send(JSON.stringify(python_data));
        
        
        pyshell.on('message', function (message) {
            // received a message sent from the Python script (a simple "print" statement)
            let results = {
                recommendations: message
            }
            res.status(200).json(results);

        });

        pyshell.end(function (err, code, signal) {
            if (err) throw err;
            console.log('The exit code was: ' + code);
            console.log('The exit signal was: ' + signal);
            console.log('finished');
        }); 
        
        
    } catch (error) {
        console.log(error)
    }

});

module.exports = router;
