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
}