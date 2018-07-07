const mongoose = require('mongoose');

const Marks = mongoose.Schema({
	class_id: String,
	subject_id: String,
	faculty_id: String,
	mid1: Number,
	mid2: Number,
	asst: Number,
	avg_mids: Number,
	ext: Number,
	total: Number
});

module.exports = mongoose.model('SClass', SClass);