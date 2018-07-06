'use strict';

const StudentModel = require('../models/student.js');
const SubjectModel = require('../models/subject.js');
const FacultyModel = require('../models/faculty.js');
const SClassModel = require('../models/sclass.js');

exports.getFaculties = (req, res) => {
	FacultyModel.find()
	.then(facultyList => {
        res.send(facultyList);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving faculty."
        });
    });
}

exports.addFaculty = (req, res) => {
	FacultyModel.create(req.body, (err, result) => {
		if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
	})
}

exports.getClasses = (req, res) => {
	SClassModel.find()
	.then(classList => {
        res.send(classList);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving classes."
        });
    });
}

exports.addClass = (req, res) => {
	SClassModel.create(req.body, (err, result) => {
		if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
	})
}

exports.getSubjects = (req, res) => {
    SubjectModel.find()
    .then(subjectList => {
        res.send(subjectList);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving subjects."
        });
    });
}

exports.addSubject = (req, res) => {
	SubjectModel.create(req.body, (err, result) => {
		if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
	})
}





