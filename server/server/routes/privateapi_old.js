const express = require('express');
var passport = require('passport');
var mongoose = require('mongoose');
var jwt = require('jsonwebtoken');


const router = express.Router();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost:27017/osar';
/*mongoose.connect(mongoDB, {
  useMongoClient: true
});*/

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

var applications=require('../models/applications.js');
var Advertisements=require('../models/advertisements.js');
var Logins=require('../models/logins.js');
var ctrlAuth = require('../controllers/authentication');
var ctrlAdvertisements = require('../controllers/advertisement');
var ctrlApplication = require('../controllers/application');
var ctrlCourseconfig = require('../controllers/courseconfig');
var ctrlPaymentgateway = require('../controllers/paymentgateway');
// ---------------------------------------------------------
// route middleware to authenticate and check token
// ---------------------------------------------------------
router.use(function(req, res, next) {
	console.log('private api authentication');
	// check header or url parameters or post parameters for token
	var token = req.body.token || req.params.token || req.headers['x-access-token'];

	// decode token
	if (token) {
		console.log('token found');
		// verifies secret and checks exp
		jwt.verify(token, 'MY_SECRET', function(err, decoded) {			
			if (err) {
				console.log('error while verify');
				return res.json({ success: false, message: 'Failed to authenticate token.' });		
			} else {
				console.log('verified');
				// if everything is good, save to request for use in other routes
				//console.log("ID : " + decorded._id);
				//console.log("Decoded : " + decorded);
				req.decoded = decoded;	
				//req=req;
				next();
			}
		});

	} else {
		console.log('token not found');
		// if there is no token
		// return an error
		return res.status(403).send({ 
			success: false, 
			message: 'No token provided.'
		});
		
	}
	
});


/* GET api listing. */
router.get('/', (req, res) => {
  res.send('private api work');
});

router.get('/applications',ctrlApplication.searchapplications);

router.get('/application',ctrlApplication.searchapplication);

router.post('/application',ctrlApplication.saveapplication);

router.put('/application',ctrlApplication.updateapplication);

router.post('/experience',ctrlApplication.saveexperience);

router.put('/experience',ctrlApplication.updateexperience);

router.delete('/experience',ctrlApplication.deleteexperience);

router.post('/qualification',ctrlApplication.savequalification);

router.put('/qualification',ctrlApplication.updatequalification);

router.delete('/qualification',ctrlApplication.deletequalification);

router.get('/courseconfigs/remaining',ctrlCourseconfig.searchremainingcourses);

router.post('/paymentrequest',ctrlPaymentgateway.paymentrequest);

module.exports = router;