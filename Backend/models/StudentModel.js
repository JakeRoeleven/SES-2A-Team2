const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Course Schema Model
const StudentModel = Schema({
    _id: {
        type: String, 
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    major: {
        type: String,
        required: true,
    },
    year: {
        type: Number,
        required: false,
    },
    degree: {
        type: String,
        required: true,
    },
    postgraduate: {
        type: Boolean,
        required: true,
    },
    courses_completed: {
        type: Array,
        required: false,
    },
    interests: {
        type: Array,
        required: false,
    },
    favorite_subjects: {
        type: Array,
        required: false,
    }
});

module.exports = mongoose.model("Student", StudentModel);
