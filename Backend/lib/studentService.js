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
            console.log(interestsArray)
            studentObject.interests = interestsArray;
        }

        await studentObject.save();
    }

    async getStudent(id) {
        Student.findOne({ _id: id }, (err, student) => {
            if (err || !student) {
                return ({ err: "Could not find course!" });
            } else {
                return student;
            }
        });
    }

    async getAllStudents() {
        const studentRef = Student.find().lean();
        return studentRef;
    }

    async deleteStudent(id) {
        await Student.deleteOne({ _id: id });
    }

}

module.exports = StudentService;