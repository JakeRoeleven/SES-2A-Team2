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

    
    async addFavoriteToStudent(id, subject_code) {

        let studentObject = await Student.findOne({'_id': id});
        let favorites = studentObject.favorite_subjects

        if (!favorites.includes(subject_code)) favorites.push(subject_code)
        studentObject.favorite_subjects = favorites;
  
        await studentObject.save();

    }

    async removeFavoriteFromStudent(id, subject_code) {

        let studentObject = await Student.findOne({'_id': id});
        let favorites = studentObject.favorite_subjects
        let new_favorites = []

        for (let i = 0, length = favorites.length; i < length; i++) {
            if (favorites[i] != subject_code) {
                new_favorites.push(favorites[i])
            }
        }

        studentObject.favorite_subjects = new_favorites;
        await studentObject.save();

    }

    async getStudent(id) {
        return await Student.findOne({ _id: id }).lean();
    }

    async signupComplete(id) {
        let student =  await Student.findOne({ _id: id }).lean();
        console.log(student)
        console.log(id)
        if (student == null) {
            return false;
        } else {
            return true
        }
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