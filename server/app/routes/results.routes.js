const passport = require('../../passport')

module.exports = (app) => {
    const results = require('../controllers/results.controller.js');

    app.get('/api/results/getsubjects', results.getSubjects);
    app.post('/api/results/addsubject', results.addSubject);

    app.get('/api/results/getfaculties', results.getFaculties);
    app.post('/api/results/addfaculty', results.addFaculty);

    app.get('/api/results/getclasses', results.getClasses);
    app.post('/api/results/addclass', results.addClass);

    app.post('/api/results/addmarks', results.addMarks);
    app.post('/api/results/findmarks', results.findMarks);

    app.post('/api/results/adduser', results.signUpUser);

    app.post('/api/results/adddata', results.addData);
    app.get('/api/results/getinsights', results.getInsights);

    // app.get('/api/results/checklogin', results.checkLogIn);
    // app.post('/api/results/login',
    // function (req, res, next) {
    //     console.log('routes/user.js, login, req.body: ');
    //     console.log(req.body)
    //     next()
    // },
    // passport.authenticate('local'),
    // (req, res) => {
    //     console.log('logged in', req.user);
    //     var userInfo = {
    //         username: req.user.username
    //     };
    //     res.send(userInfo);
    // });
}