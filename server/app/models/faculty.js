const mongoose = require('mongoose');

const Faculty = mongoose.Schema({
	name: String,
	branch: String,
	faculty_id: String,
});

module.exports = mongoose.model('Faculty', Faculty);