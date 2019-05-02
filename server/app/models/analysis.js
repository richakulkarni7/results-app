const mongoose = require('mongoose');

const Analysis = mongoose.Schema({
    class_id: String,
    no_subjects: Number,
    no_students: Number,
    grades: [{student_id: String, sgpa: Number, cgpa: Number, sub1: String, sub2: String, sub3: String, sub4: String, sub5: String, sub6: String, sub7: String, sub8: String, sub9: String, sub10: String}],
    subjects_list: {sub1: String, sub2: String, sub3: String, sub4: String, sub5: String, sub6: String, sub7: String, sub8: String, sub9: String, sub10: String}
});

module.exports = mongoose.model('Analysis', Analysis);