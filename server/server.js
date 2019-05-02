const express = require('express');
const bodyParser = require('body-parser');
const app = express();
// const passport = require('passport');

// app.use(require('serve-static')(__dirname + '/../../public'));
// app.use(require('cookie-parser')());
app.use(require('express-session')({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));
// app.use(passport.initialize());
// app.use(passport.session());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
});
const dbConfig = require('./config/database.config.js');
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect(dbConfig.url)
.then(() => {
    console.log("Successfully connected to the database");    
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...');
    process.exit();
});
require('./app/routes/results.routes.js')(app);
app.get('/', (req, res) => {
    res.json({"message": "Welcome to results-app"});
});
app.listen(4000, () => {
    console.log("Server is listening on port 4000");
});