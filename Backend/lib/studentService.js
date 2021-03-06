const Student = require('../models/StudentModel');
const getAllInterests = require('../lib/InterestHelper').getAllInterests;

class StudentService {

    constructor() {
    }

    async setStudent(id, student) {

        const studentObject = new Student({
            _id: id, 
            name: student.name,
            major: student.major,
            degree: student.degree,
            postgraduate: student.postgraduate
        });

        console.log(studentObject)

        if (student.year) {
            studentObject.year = student.year;
        }

        if (student.courses_completed && student.courses_completed.length > 0) {
            studentObject.courses_completed = student.courses_completed;
        } 

        if (student.favorite_subjects && student.favorite_subjects.length > 0) {
            studentObject.favorite_subjects = student.favorite_subjects;
        }


        if (student.interests && student.interests.length > 0) {
            let interestsArray = [];
            student.interests.forEach(interest => {
                if (getAllInterests().includes(interest)) {
                    interestsArray.push(interest);
                }
            })
            studentObject.interests = interestsArray;
        }

        console.log(studentObject)

        await studentObject.save();
    }

    async updateStudent(id, student) {

        let studentObject = await Student.findOne({'_id': id});
        studentObject.name = student.name,
        studentObject.major = student.major,
        studentObject.degree = student.degree,
        studentObject.postgraduate =  student.postgraduate

        if (student.year) {
            studentObject.year = student.year;
        }

        if (student.courses_completed && student.courses_completed.length >= 0) {
            studentObject.courses_completed = student.courses_completed;
        }

        if (student.favorite_subjects && student.favorite_subjects.length >= 0) {
            studentObject.favorite_subjects = student.favorite_subjects;
        }


        if (student.interests && student.interests.length >= 0) {
            let interestsArray = [];
            student.interests.forEach(interest => {
                if (getAllInterests().includes(interest)) {
                    interestsArray.push(interest);
                }
            })
            studentObject.interests = interestsArray;
        }

        await studentObject.save();
    }

    async toggleStudentFavorite(id, subject_code) {

        let studentObject = await Student.findOne({'_id': id});
        let favorites = studentObject.favorite_subjects
        let new_favorites = []

        if (!favorites.includes(subject_code)) {
            new_favorites = studentObject.favorite_subjects;
            new_favorites.push(subject_code)
        } else {
            for (let i = 0, length = favorites.length; i < length; i++) {
                if (favorites[i] != subject_code) {
                    new_favorites.push(favorites[i])
                }
            }
        }

        studentObject.favorite_subjects = new_favorites;
        await studentObject.save();
        return(studentObject.favorite_subjects)
    }

    async toggleStudentCoursesCompleted(id, subject_code) {

        let studentObject = await Student.findOne({'_id': id});
        let courses = studentObject.courses_completed
        let new_courses = []

        if (!courses.includes(subject_code)) {
            new_courses = studentObject.courses_completed;
            new_courses.push(subject_code)
        } else {
            for (let i = 0, length = courses.length; i < length; i++) {
                if (courses[i] != subject_code) {
                    new_courses.push(courses[i])
                }
            }
        }

        studentObject.courses_completed = new_courses;
        await studentObject.save();
        return(studentObject.courses_completed)
    }

    async getStudent(id) {
        return await Student.findOne({ _id: id }).lean();
    }

    async signupComplete(id) {
        let student =  await Student.findOne({ _id: id }).lean();
        if (student && student.name && student.major && student.degree) {
            return true;
        } else {
            return false;
        }
    }
    
    async getAllStudents() {
        const studentRef = Student.find().lean();
        return studentRef;
    }

    async getAllStudentsAdmin() {

        const studentRef = Student.find({}, { year: 1, name : 1 , interests : 1 , major : 1, degree: 1, postgraduate: 1, courses_completed: 1} ).lean();
        const privateStudents = [];

        (await studentRef).forEach(elem => {
            const name = elem.name;
            let newName = ''
            for (var i = 0; i < name.length; i++) {
                if (name[i] !== ' ' && name[i] === name[i].toLowerCase() ) {
                    newName = newName.concat('*')
                } else if (name[i] === ' ') {
                    newName = newName.concat(' ')
                } else {
                    newName = newName.concat(name[i])
                }
            }
            elem.name = newName;
            privateStudents.push(elem)
        })

        return privateStudents
        ;
    }

    async getAllKNNStudentsByMajor(major) {
        if (major) {
            const studentRef = await Student.find({ major: major }, { _id: 1 , courses_completed : 1 , interests : 1 , postgraduate : 1, year: 1} ).lean();
            return studentRef;
        } else {
            const studentRef = await Student.find().lean();
            return studentRef;
        }
    }

    async deleteStudent(id) {
        await Student.deleteOne({ _id: id });
        return true;
    }

}

module.exports = StudentService;