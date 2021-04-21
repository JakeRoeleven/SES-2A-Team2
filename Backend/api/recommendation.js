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

    let student_req = req.body.student;
    let student = {}
    
    student.major = student_req.faculty
    student.courses_completed = student_req.courses_completed;

    let interests_json = student_req.interests

    console.time('loops')
    const all_interests = ['Programming', 'Maths', 'Statistics', 'Hospitality', 'Fitness', 'Language', 'Art', 'Humanities',
    'Architecture', 'History', 'Geography', 'Business', 'Economics', 'Education', 'Health', 'Engineering', 'Law', 'Computing',
    'Physics', 'Chemistry', 'Biology', 'Electronics', 'Medicine', 'Data Analytics', 'Mechanics', 'Games', 'Marketing',
    'Accounting', 'Writing', 'Communications', 'Music', 'Design'];
    all_faculties = ['Analytics and Data Science', 'Business', 'Communication', 'Creative Intelligence and Innovation',
    'Design Architecture and Building', 'Education', 'Engineering', 'Health', 'Information Technology', 'International Studies',
    'Law', 'Science', 'Transdisciplinary Innovation']

    console.time('student_loop')
    let interest_array = [];
    all_interests.forEach(interest => {
        if (interests_json.includes(interest)) {
            interest_array.push(1)
        } else {
            interest_array.push(0)
        }
    });
    console.timeEnd('student_loop')
    // all_faculties.forEach(fac => {
    //     if (student.major == fac) {
    //         interest_array.push(1)
    //     } else {
    //         interest_array.push(0)
    //     }
    // })
    student.interests = interest_array;

    console.time('get_students')
    const studentService = new StudentService();
    let student_list = await studentService.getAllStudents();
    console.timeEnd('get_students')
    let new_student_list = {};

    console.time('all-students-transform')
    // Convert array to python format
    Object.keys(student_list).forEach(elem => {
       
        let interest_array = [];
        let interests_json = student_list[elem].interests

        all_interests.forEach(interest => {
            if (interests_json.includes(interest)) {
                interest_array.push(1)
            } else {
                interest_array.push(0)
            }
        });

        // all_faculties.forEach(fac => {
        //     if (student_list[elem].major == fac) {
        //         interest_array.push(1)
        //     } else {
        //         interest_array.push(0)
        //     }
        // })

        student_list[elem].interests = interest_array;
        new_student_list[(student_list[elem]['_id'])] = student_list[elem]
    });
    console.timeEnd('all-students-transform')

    console.time('get-courses')
    const courseService = new CourseService();
    let course_list = await courseService.getAllCourses()
    console.timeEnd('get-courses')

    console.time('courses-transform')
    let new_list = {};
    Object.keys(course_list).forEach((elem, index) => {
        new_list[(course_list[elem]['_id'])] = course_list[elem];
    });
    console.timeEnd('courses-transform')

    python_data = {
        student: student,
        courses: new_list,
        students: new_student_list
    }

    console.log(python_data.student)

    console.timeEnd('loops')
    console.time('python')
    // Python scripts takes arguments in order as main(courses, students, student, k, recommendations)
    try {
        
        let pyshell = new PythonShell('./python/recommendation/knn.py');
        
        
        pyshell.send(JSON.stringify(python_data));
        
        
        pyshell.on('message', function (recommendations) {
            // received a message sent from the Python script (a simple "print" statement)

            recommendations = recommendations.split(",")
            let subject_ids = [];
            recommendations.forEach(elem => {
                subject_ids.push(elem.replace(/\D/g, ''))
            })

            let subjects = [];
            subject_ids.forEach(elem => {
                if (!student.courses_completed.includes(elem)) subjects.push(elem)
            })

            let results = {
                recommendations: subjects
            }

            console.log(results)

            res.status(200).json(results);

        });

        pyshell.end(function (err, code, signal) {
            if (err) throw err;
        }); 
        
        
    } catch (error) {
        console.log(error)
    }
    console.timeEnd('python')
});

module.exports = router;
