const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Course Schema Model
const CourseSchema = Schema({
    _id: {
        type: String, 
        required: true
    },
    course_name: {
        type: String,
        required: true,
    },
    credit_points: {
        type: String,
        required: true,
    },
    faculty: {
        type: String,
        required: true,
    },
    postgraduate: {
        type: Boolean,
        required: true,
    },
    'pre-requisites': {
        type: Array,
        required: false,
    },
    'anti-requisites': {
        type: Array,
        required: false,
    },
    description: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model("Course", CourseSchema);
