const mongoose = require('mongoose');

const SClass = mongoose.Schema({
	branch: String,
	year: Number,
	section: Number,
	subjects: [{subject_id: String, faculty_id: String}],
	class_id: String
});

module.exports = mongoose.model('SClass', SClass);