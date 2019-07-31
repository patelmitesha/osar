var mongoose = require('mongoose');
var moment = require('moment');
var Applications = mongoose.model('Applications');
var Advertisement = mongoose.model('Advertisements');
var OSARError = require('../validators/OSARError')

var methods = {
	validateSemesterwiseMarks: function(semesterwisemarks){
		return new Promise(
			function (resolve,reject){

				console.log('Inside SemesterwiseMarks validations');

				var errorList=JSON.parse('{"errors":{}}');

				var advt={};

			//	EX SERVICEMAN VALIDATION STARTS HERE
				
				
				console.log('error length : '+Object.keys(errorList.errors).length);
				if(Object.keys(errorList.errors).length>0){
					reject(new OSARError(errorList));
				}

				/*console.log('Search param : '+application.advertisementno+ ' - ' + application.postcode + ' - ' + application.subjectcode)*/

				resolve(semesterwisemarks);


			});

	}
};

module.exports=methods;