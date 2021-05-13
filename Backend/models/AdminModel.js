const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Course Schema Model
const AdminModel = Schema({
    _id: {
        type: String, 
        required: true
    },
    email: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model("Admin", AdminModel);