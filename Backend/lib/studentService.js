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

        await studentObject.save();
    }

    async updateStudent(id, student) {

        console.log(student)

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

        console.log(studentObject)

        await studentObject.save();
    }

    async getStudent(id) {
        return await Student.findOne({ _id: id }).lean();;
    }

    async getAllStudents() {
        const studentRef = Student.find().lean();
        return studentRef;
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
    }

}

module.exports = StudentService;