'use strict';

const StudentModel = require('../models/student.js');
const SubjectModel = require('../models/subject.js');
const FacultyModel = require('../models/faculty.js');
const SClassModel = require('../models/sclass.js');
const MarksModel = require('../models/marks.js');
const UserModel = require('../models/user.js');
const AnalysisModel = require('../models/analysis.js')


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

exports.addMarks = (req, res) => {
    MarksModel.create(req.body, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
}

exports.findMarks = (req, res) => {
    MarksModel.find({class_id: req.body.class_id, subject_id: req.body.subject_id}, (err, result) => {
        if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
}

exports.addData = (req, res) => {
    AnalysisModel.create(req.body, (err, result) => {
            if (err) {
            res.send(err);
        }
        else {
            res.send(result);
        }
    })
}

exports.getInsights = (req, res) => {
    AnalysisModel.find()
    .then(AnalysisList => {
        res.send(AnalysisList);
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while retrieving subjects."
        });
    });
}

exports.signUpUser = (req, res) => {
    const { username, password } = req.body
    UserModel.findOne({ username: username }, (err, user) => {
        if (err) {
            console.log('User.js post error: ', err)
        } else if (user) {
            res.json({
                error: `Sorry, already a user with the username: ${username}`
            })
        }
        else {
            const newUser = new UserModel({
                username: username,
                password: password
            })
            newUser.save((err, savedUser) => {
                if (err) return res.json(err)
                res.json(savedUser)
            })
        }
    })
}

exports.checkLogIn = (req, res) => {
    console.log(req.user)
    if (req.user) {
        res.json({ user: req.user })
    } else {
        res.json({ user: null })
    }
}
