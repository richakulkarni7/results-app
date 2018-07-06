const mongoose = require('mongoose');

const Subject = mongoose.Schema({
	name: String,
	subject_id: String,
});

module.exports = mongoose.model('Subject', Subject);