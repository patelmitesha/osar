const express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');

//Set up mongoose connection
mongoose.Promise = require('bluebird');

var env = process.env.NODE_ENV || 'development';
const config = require('../../config')[env];

const router = express.Router();


var mongoDB = 'mongodb://localhost:27017/osar';
mongoose.connect(mongoDB, {
  useNewUrlParser:true,
  useCreateIndex:true
});

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var applications=require('../models/applications.js');
var Advertisements=require('../models/advertisements.js');
var Logins=require('../models/logins.js');
var ApplicationHistory = require('../models/applicationhistory');

var ctrlAuth = require('../controllers/authentication');
var ctrlAdvertisements = require('../controllers/advertisement');
var ctrlApplication = require('../controllers/application');

var Courses=require('../models/courses.js');
var ctrlCourse = require('../controllers/course');

var Courseconfigs=require('../models/courseconfigs.js');
var ctrlCourseconfig = require('../controllers/courseconfig');

var Universities=require('../models/universities.js');
var ctrlUniversity = require('../controllers/university');

var States=require('../models/states.js');
var ctrlState = require('../controllers/state');

var Subjects=require('../models/subjects.js');
var ctrlSubject = require('../controllers/subject');

var Posts=require('../models/posts.js');
var ctrlPost = require('../controllers/post');

var ctrlUpload = require('../controllers/upload');


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('api work');

});

router.post('/login',  ctrlAuth.login);

router.get('/logout', (req, res) => {
  res.send(true);
});

router.post('/register', ctrlAuth.register);

router.get('/advertisements',ctrlAdvertisements.viewadvertisements);

router.get('/courses',ctrlCourse.findcoursesbycourseconfigid);

router.get('/courseconfigs',ctrlCourseconfig.courseconfig);

router.get('/courseconfig',ctrlCourseconfig.getcourseconfigbyid);

router.get('/universities',ctrlUniversity.universities);

router.get('/states',ctrlState.states);

router.get('/subjects',ctrlSubject.subjects);

router.get('/posts',ctrlPost.posts);

router.post('/verify',ctrlAuth.verifylogin);

router.post('/upload',ctrlUpload.upload);

module.exports = router;