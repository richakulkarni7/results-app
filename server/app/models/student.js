const mongoose = require('mongoose');

const Student = mongoose.Schema({
    name: String,
    rollno: String,
    cgpa: Number,
    sgpa: [Number],
    class_id: String
});

module.exports = mongoose.model('Student', Student);